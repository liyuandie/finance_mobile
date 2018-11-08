import axios from 'axios';
import { parse } from 'url';
import querystring from 'querystring';
import { API_BASE_URL } from '../config';
import { ApiHttpError, ApiResultError } from '../error';
import logger from '../logger';

export let client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  responseType: 'json',
  paramsSerializer: params => querystring.stringify(params),
  maxContentLength: Math.pow(1024, 2)
});

client.interceptors.request.use(
  config => {
    let { method, url, params, data, background } = config;
    console.log('req config', config);

    logger.debug(method, url, params || data);
    if (!background) {
    }
    return config;
  },
  error => {
    logger.debug(error);
    return Promise.reject(new ApiHttpError(400, error.message));
  }
);
client.interceptors.response.use(
  response => {
    console.log('response', response);
    let {
      status,
      data,
      config: { url, background }
    } = response;
    let { path } = parse(url);

    logger.debug(status, path, data);
    if (!background) {
    }
    return response;
  },
  error => {
    logger.debug(error);
    if (error.response) {
      let { status, statusText } = error.response;
      if (statusText === undefined) {
        if (status === 200) {
          statusText = '成功';
        } else if (status === 400) {
          statusText = '请求不正确';
        } else if (status === 401) {
          statusText = '没有权限';
        } else if (status === 413) {
          statusText = '发送内容过大';
        } else if (status === 500) {
          statusText = '服务器内部错误';
        } else if (status === 502) {
          statusText = '服务暂时不可用';
        } else if (status === 504) {
          statusText = '服务器处理超时';
        } else {
          statusText = '请求服务出错';
        }
      }
      return Promise.reject(new ApiHttpError(status, statusText));
    } else {
      if (error.message.startsWith('timeout of ')) {
        return Promise.reject(new ApiHttpError(408, '请求超时'));
      } else {
        return Promise.reject(new ApiHttpError(500, error.message));
      }
    }
  }
);

export function getApi(
  url,
  params = {},
  { headers = {}, timeout = 3000, background = false, onDownloadProgress, ...rest } = {}
) {
  return requestApi({
    ...rest,
    url,
    method: 'GET',
    params,
    headers,
    timeout,
    background,
    onDownloadProgress
  });
}

export function postApi(
  url,
  data = {},
  { headers = {}, json = false, urlencoded = true, timeout = 5000, background = false, onUploadProgress, ...rest } = {}
) {
  let postData = serializeBody(data, { json, urlencoded, headers });
  return requestApi({
    ...rest,
    url,
    method: 'POST',
    data: postData,
    headers,
    timeout,
    background,
    onUploadProgress
  });
}

function requestApi(cfg) {
  return client.request(cfg).then(response => {
    if (cfg.responseType === 'text') {
      return response.data;
    }
    if (response.data.code === 0) {
      return response.data;
    } else {
      let { code, message, data } = response.data;
      return Promise.reject(new ApiResultError(code, message, data));
    }
  });
}

function serializeBody(data = {}, options) {
  let { urlencoded = true, json = false, body = {}, headers = {} } = options || {};

  if (urlencoded) {
    body = querystring.stringify(data);
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else if (json) {
    body = data;
    headers['Content-Type'] = 'application/json';
  } else {
    let formData = new FormData();
    for (let [k, v] of Object.entries(data)) {
      formData.append(k, v);
    }

    body = formData;
  }

  return body;
}

import MD5 from 'crypto-js/md5';

export function pzh_getBasicForm(gateway, jsonstringifedDataToSign, service, cfg) {
  return {
    gateway,
    version: '3.0',
    service,
    partner: cfg.partner,
    sign: MD5(jsonstringifedDataToSign).toString(),
    signType: '0',
    reqData: ''
  };
}

export function pzh_getStrToSign(data, cfg) {
  return JSON.stringify(data) + cfg.key;
}

export function pzh_getStrForReqData(data) {
  return JSON.stringify(data);
}

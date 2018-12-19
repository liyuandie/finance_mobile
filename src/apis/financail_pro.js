import { postApi } from './';

// 获取所有标的
export function getAllTenders(params) {
  const { limit, offset, ftype } = params || {};
  return postApi('/apis/tender/all', {
    limit,
    offset,
    ftype
  });
}

//查询单个标的信息
export function querySingleTender(params) {
  const { finance_id } = params || {};
  return postApi('/apis/tender/detail', {
    finance_id
  });
}

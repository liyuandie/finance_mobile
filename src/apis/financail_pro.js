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

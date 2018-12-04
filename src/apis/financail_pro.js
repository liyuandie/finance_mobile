import { postApi } from './';

// 获取所有标的
export function getAllTenders(params) {
  const { limit, offset, type } = params || {};
  return postApi('/apis/tender/all', {
    limit,
    offset,
    type
  });
}

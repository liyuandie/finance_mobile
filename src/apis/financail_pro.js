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

//购买标的
export function invest(params) {
  const { mobile, ticket, user_id, user_mobile, amount, finance_id } = params || {};
  return postApi('/apis/user/tender/invest', {
    mobile,
    ticket,
    user_id, //签约协议号
    user_mobile,
    finance_id,
    amount
  });
}

import { postApi } from './';

// 查询银行卡信息
export function getCardInfo(params) {
  const { mobile, ticket, contract } = params || {};
  return postApi('apis/user/card/query', {
    mobile,
    ticket,
    contract
  });
}

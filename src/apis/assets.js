import { postApi } from './';

// 获取用户交易记录
export function getUserTradingRecord(params) {
  const { mobile, ticket, user_id, limit, offset, assets_type } = params || {};
  return postApi('/apis/user/assets/list', {
    mobile,
    ticket,
    user_id,
    limit,
    offset,
    assets_type // number: 0:充值， 1:提现， 2：购买， 3：结息， 4：购买失败， 5：取消购买， 6：还款， 7：全部
  });
}

//获取用户出借记录
export function getUserInvestRecord(params) {
  const { mobile, ticket, user_id, limit, offset } = params || {};
  return postApi('/apis/user/tender/mine/investing', {
    mobile,
    ticket,
    user_id,
    limit,
    offset
  });
}

//获取用户投资的产品及详情
export function getUserInvestSummary(params) {
  const { mobile, ticket, user_id } = params || {};
  return postApi('/apis/user/tender/mine/investing/summary', {
    mobile,
    ticket,
    user_id
  });
}

import { postApi } from './';
//登录
export function login(params) {
  const { mobile, password } = params || {};
  return postApi('/user/account/login', {
    mobile,
    password
  });
}
//获取用户信息
export function getAccountInfo(params) {
  const { mobile, ticket } = params || {};
  return postApi('/user/account/info', {
    mobile,
    ticket
  });
}
//根据签约号查询余额
export function queryBalance(params) {
  const { mobile, ticket, contracts } = params || {};
  return postApi('/user/contract/user/balance', {
    mobile,
    ticket,
    contracts
  });
}
//退出登录
export function logout(params) {
  const { mobile, ticket } = params || {};
  return postApi('/user/account/logout', {
    mobile,
    ticket
  });
}

//修改用户名
export function modifyUserName(params) {
  const { mobile, ticket, name } = params || {};
  return postApi('/user/account/update', {
    mobile,
    ticket,
    name
  });
}

//修改、绑定邮箱
export function modifyEmail(params) {
  const { mobile, ticket, email } = params || {};
  return postApi('/user/account/update', {
    mobile,
    ticket,
    email
  });
}

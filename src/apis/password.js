import { postApi } from './';

// 修改登录密码
export function modifyLoginPwd(params) {
  const { mobile, ticket, new_password, auth_code } = params;
  return postApi('/user/account/reset_pwd', {
    mobile,
    ticket,
    new_password,
    auth_code
  });
}
// 重置密码验证手机登录
export function SmsLogin(params) {
  const { mobile, code } = params;
  return postApi('/user/account/loginWithCode', {
    mobile,
    code
  });
}

//重置登录密码

export function resetLoginPwd(params) {
  const { mobile, ticket, new_password } = params;
  return postApi('/user/account/reset_pwd_without_code', {
    mobile,
    ticket,
    new_password
  });
}

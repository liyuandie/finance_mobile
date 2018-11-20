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

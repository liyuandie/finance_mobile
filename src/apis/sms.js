import { postApi } from './';

// 修改登录密码获取验证码
export function loginPwdSms(params) {
  const { mobile } = params;
  return postApi('/utils/change_pwd', { mobile });
}

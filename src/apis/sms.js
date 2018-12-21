import { postApi } from './';

// 修改登录密码获取验证码
export function loginPwdSms(params) {
  const { mobile } = params;
  return postApi('/utils/sms/change_pwd', { mobile });
}

//通用验证手机验证码
export function CommonSms(params) {
  const { mobile } = params;
  return postApi('/utils/sms/verify_phone', { mobile });
}

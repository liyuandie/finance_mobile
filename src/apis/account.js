import { postApi } from './';

export function login(params) {
  const { mobile, password } = params || {};
  return postApi('/user/account/login', {
    mobile,
    password
  });
}

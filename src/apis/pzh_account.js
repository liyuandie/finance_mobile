import { postApi } from './';

//个人用户签约
export function personalSignContract(params) {
  const { mobile, ticket, user_id, user_type, user_mobile, user_name, remark, busway, apply_time } = params || {};
  return postApi('/user/contract/user/apply', {
    mobile,
    ticket,
    user_id,
    user_type,
    user_mobile,
    user_name,
    remark,
    busway,
    apply_time
  });
}

import * as UserApis from '../apis/account';

const login = ({ mobile, password }) => async dispatch => {
  try {
    const res = await UserApis.login({
      mobile,
      password
    });
    dispatch({
      type: 'LOGIN',
      auth: {
        user: res.user,
        ticket: res.ticket
      }
    });
    return res;
  } catch (error) {
    __DEV__ && console.log('LOGIN ERROR:', error);
    return error;
  }
};

export { login };

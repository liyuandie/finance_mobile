import * as UserApis from '../apis/account';

const login = ({ mobile, password }) => async dispatch => {
  try {
    const res = await UserApis.login({
      mobile,
      password
    });
    dispatch({
      type: 'LOGIN',
      user: res.user,
      ticket: res.ticket
    });
    return res;
  } catch (error) {
    __DEV__ && console.log('LOGIN ERROR:', error);
    return error;
  }
};

const accountInfo = ({ mobile, ticket }) => async dispatch => {
  try {
    const res = await UserApis.getAccountInfo({
      mobile,
      ticket
    });
    dispatch({
      type: 'ACCOUNT_INFO',
      user_contracts: res.user_contracts,
      balance: res.user_balances,
      user_settings: res.user_settings
    });
    return res;
  } catch (error) {
    return error;
  }
};

const queryBalanceByContract = ({ mobile, ticket, contracts }) => async dispatch => {
  try {
    const res = await UserApis.getAccountInfo({
      mobile,
      ticket,
      contracts
    });
    dispatch({
      type: 'ACCOUNT_BALANCE',
      balance: res.balances
    });
    return res;
  } catch (error) {
    return error;
  }
};

const logout = ({ mobile, ticket }) => async dispatch => {
  try {
    const res = await UserApis.getAccountInfo({
      mobile,
      ticket
    });
    dispatch({
      type: 'LOGOUT'
    });
    return res;
  } catch (error) {
    return error;
  }
};

const clearAuth = () => dispatch => {
  dispatch({
    type: 'CLEAR_AUTH'
  });
};

export { login, accountInfo, queryBalanceByContract, logout, clearAuth };

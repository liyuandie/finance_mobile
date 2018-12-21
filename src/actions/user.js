import * as UserApis from '../apis/account';
import * as cardApis from '../apis/card';
import * as passwordApis from '../apis/password';

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

const SmsLogin = ({ mobile, code }) => async dispatch => {
  try {
    const res = await passwordApis.SmsLogin({
      mobile,
      code
    });
    dispatch({
      type: 'SMS_LOGIN',
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
      user_settings: res.user_settings,
      user: res.user
    });
    return res;
  } catch (error) {
    return error;
  }
};

const queryBalanceByContract = ({ mobile, ticket, contracts }) => async dispatch => {
  try {
    const res = await UserApis.queryBalance({
      mobile,
      ticket,
      contracts
    });
    dispatch({
      type: 'ACCOUNT_BALANCE',
      balance: res.balance
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

const cardInfo = ({ mobile, ticket, contract }) => async dispatch => {
  try {
    const res = await cardApis.getCardInfo({
      mobile,
      ticket,
      contract
    });
    dispatch({
      type: 'CARD_INFO',
      card_info: res.user_card
    });
    return res;
  } catch (error) {
    return error;
  }
};

export { login, accountInfo, queryBalanceByContract, logout, clearAuth, cardInfo, SmsLogin };

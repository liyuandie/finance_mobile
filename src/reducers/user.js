const userAccount = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        ticket: action.ticket,
        mobile: action.user.mobile
      };
    case 'SMS_LOGIN':
      return {
        ...state,
        ticket: action.ticket,
        mobile: action.user.mobile
      };
    case 'ACCOUNT_INFO':
      return {
        ...state,
        lender_contract: action.user_contracts.find(x => x.user_type === '01'),
        borrower_contract: action.user_contracts.find(x => x.user_type === '02'),
        balance: action.balance,
        user_settings: action.user_settings,
        user: action.user
      };
    case 'ACCOUNT_BALANCE':
      return {
        ...state,
        balance: action.balance
      };
    case 'LOGOUT':
      return {
        ...state
      };
    case 'CARD_INFO':
      return {
        ...state,
        card_info: action.card_info
      };
    case 'CLEAR_AUTH':
      return {
        ...state,
        mobile: '',
        ticket: '',
        user: null,
        lender_contract: null,
        borrower_contract: null
      };
    default:
      return state;
  }
};

export default userAccount;

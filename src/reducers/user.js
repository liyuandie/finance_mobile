const userAccount = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.auth.user,
        ticket: action.auth.ticket
      };
    default:
      return state;
  }
};

export default userAccount;

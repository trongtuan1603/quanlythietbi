const INITIAL_STATE = {
  userInfo: {
    id: null,
    username: '',
    name: '',
    phone: '',
    chucvu: '',
  },
};

export default userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.user;
    }
    case 'LOGOUT': {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

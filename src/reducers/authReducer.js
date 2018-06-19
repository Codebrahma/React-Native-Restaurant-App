const initialState = {
  loginError: null,
  registerError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH_LOGIN_ERROR':
      return {
        ...state,
        loginError: payload,
      };
    case 'AUTH_REGISTER_ERROR':
      return {
        ...state,
        registerError: payload,
      };
    default:
      return state;
  }
};

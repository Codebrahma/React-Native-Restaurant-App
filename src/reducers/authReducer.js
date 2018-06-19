const initialState = {
  loginError: null,
  loginLoading: false,
  registerError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH_LOGIN_LOADING':
      return {
        ...state,
        loginLoading: true,
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        loginLoading: false,
        loginError: payload,
      };
    case 'AUTH_LOGIN_ERROR':
      return {
        ...state,
        loginLoading: false,
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

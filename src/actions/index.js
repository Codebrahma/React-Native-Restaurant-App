export const myAction = () => ({
  type: 'ACTION_CODE',
  payload: 'aa',
});

export const authHydrateTokenFromStorage = token => ({
  type: 'AUTH_HYDRATE_TOKEN',
  payload: {
    token,
  },
});

export const authLogin = (email, password) => ({
  type: 'AUTH_LOGIN',
  payload: {
    email,
    password,
  },
});

export const authRegister = (email, password) => ({
  type: 'AUTH_REGISTER',
  payload: {
    email,
    password,
  },
});
export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const fetchRestaurant = (id = null) => ({
  type: 'FETCH_RESTAURANT',
  payload: {
    id,
  },
});

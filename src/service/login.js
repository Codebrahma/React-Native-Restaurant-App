import request from './request';
import { LOGIN_URL, REGISTER_URL } from './api_constants';

function doLogin(email, password) {
  const data = {
    email,
    password,
  };
  return request({ url: LOGIN_URL, method: 'POST', data });
}

function doRegister(email, password) {
  const data = {
    email,
    password,
  };
  return request({ url: REGISTER_URL, method: 'POST', data });
}

export default {
  doLogin,
  doRegister,
};

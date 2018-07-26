import axios from 'axios';
import { API_BASE } from './api_constants';

const client = axios.create({
  baseURL: API_BASE,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) => {
    console.debug('Request Successful!', response);
    return response;
  };

  const onError = (error) => {
    console.log('Request Failed:', error.config);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;

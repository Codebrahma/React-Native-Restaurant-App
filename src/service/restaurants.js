import request from './request';
import { RESTAURANT_URL } from './api_constants';

function getRestaurant(id = null) {
  let params = {};
  if (id != null) {
    params = {
      id,
    };
  }
  return request({ url: RESTAURANT_URL, method: 'GET', params });
}

export default {
  getRestaurant,
};

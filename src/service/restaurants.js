import request from './request';
import { RESTAURANT_URL } from './api_constants';

function getRestaurant(id = null, headers = null) {
  let params = {};
  if (id != null) {
    params = {
      id,
    };
  }
  return request({
    url: RESTAURANT_URL, method: 'GET', params, headers,
  });
}

export default {
  getRestaurant,
};

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

function getRestaurantByType(type, headers = null) {
  return request({
    url: `${RESTAURANT_URL}/${type}`, method: 'GET', headers,
  });
}

export default {
  getRestaurant,
  getRestaurantByType,
};

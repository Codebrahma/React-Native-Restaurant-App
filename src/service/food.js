import request from './request';
import { FOOD_INFO_URL, RESTAURANT_URL } from './api_constants';

function getFood(id = null, headers = null) {
  let params = {};
  if (id != null) {
    params = {
      id,
    };
  }
  return request({
    url: FOOD_INFO_URL, method: 'GET', params, headers,
  });
}

export default {
  getFood,
};

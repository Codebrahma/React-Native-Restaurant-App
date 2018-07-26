import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/restaurants';

const authTokenSelector = state => state.auth.loginMessage.token;

function* restaurantTask(action) {
  const { payload } = action;
  const actionType = payload.isFromCuisine ? 'FETCH_CUISINE_RESTAURANT_' : 'FETCH_RESTAURANT_TYPE_';

  try {
    const authToken = yield select(authTokenSelector);

    const res = yield call(API.getRestaurantByType, payload.type, {
      Authorization: `Bearer ${authToken}`,
    });


    if (res.status === 200) {
      yield put({
        type: `${actionType}SUCCESS`,
        payload: res.data,
      });
    } else {
      yield put({
        type: `${actionType}ERROR`,
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: `${actionType}ERROR`,
      payload: e.data,
    });
  }
}

function* restaurantByTypeSaga() {
  yield takeLatest('FETCH_RESTAURANT_TYPE', restaurantTask);
}

export default restaurantByTypeSaga;

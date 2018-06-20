import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../service/restaurants';

function* restaurantTask(action) {
  try {
    const { payload } = action;

    const res = yield call(API.getRestaurant, payload.id);


    if (res.status === 200) {
      if (payload.id === null) {
        yield put({
          type: 'FETCH_RESTAURANT_SUCCESS',
          payload: res.data,
        });
      } else {
        yield put({
          type: 'FETCH_RESTAURANT_INFO_SUCCESS',
          payload: res.data,
        });
      }
    } else {
      yield put({
        type: 'FETCH_RESTAURANT_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_RESTAURANT_ERROR',
      payload: e.data,
    });
  }
}

function* restaurantSaga() {
  yield takeLatest('FETCH_RESTAURANT', restaurantTask);
}

export default restaurantSaga;

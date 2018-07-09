import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/restaurants';

const authTokenSelector = state => state.auth.loginMessage.token;

function* restaurantTask(action) {
  try {
    const { payload } = action;

    const authToken = yield select(authTokenSelector);

    const res = yield call(API.getRestaurant, payload.id, {
      Authorization: `Bearer ${authToken}`,
    });


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

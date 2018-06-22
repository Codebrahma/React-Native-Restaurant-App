import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/food';


const authTokenSelector = state => state.auth.loginMessage.token;

function* cuisineTypeTask(action) {
  try {
    const { payload } = action;

    const authToken = yield select(authTokenSelector);

    const res = yield call(API.getAllCuisineTypes, {
      Authorization: `Bearer ${authToken}`,
    });


    if (res.status === 200) {
      yield put({
        type: 'FETCH_CUISINE_TYPE_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_CUISINE_TYPE_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_CUISINE_TYPE_ERROR',
      payload: e.data,
    });
  }
}

function* cuisineTypeSaga() {
  yield takeLatest('FETCH_CUISINE_TYPES', cuisineTypeTask);
}

export default cuisineTypeSaga;

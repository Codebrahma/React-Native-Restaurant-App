import { put, call, select, takeLatest } from 'redux-saga/effects';
import Auth from '../service/login';

function* loginTask(action) {
  try {
    const { payload } = action;

    const res = yield call(Auth.doLogin, payload.email, payload.password);
    console.log(res);

    if (res.status === 200) {
      yield put({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'AUTH_LOGIN_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'AUTH_LOGIN_ERROR',
      payload: e.data,
    });
  }
}

function* registerTask(action) {
  try {
    const { payload } = action;

    const res = yield call(Auth.doRegister, payload.email, payload.password);
    console.log(res);

    if (res.status === 200) {
      yield put({
        type: 'AUTH_REGISTER_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'AUTH_REGISTER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'AUTH_REGISTER_ERROR',
      payload: e.data,
    });
  }
}

function* authSaga() {
  yield takeLatest('AUTH_LOGIN', loginTask);
  yield takeLatest('AUTH_REGISTER', registerTask);
}

export default authSaga;

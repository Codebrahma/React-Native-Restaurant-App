import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import authSaga from './authSaga';

function* rootSaga() {
  yield fork(mySaga);
  yield fork(authSaga);
}

export default rootSaga;

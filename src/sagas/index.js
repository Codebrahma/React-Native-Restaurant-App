import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import authSaga from './authSaga';
import restaurantSaga from './restaurantSaga';

function* rootSaga() {
  yield fork(mySaga);
  yield fork(authSaga);
  yield fork(restaurantSaga);
}

export default rootSaga;

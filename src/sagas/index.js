import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import authSaga from './authSaga';
import restaurantSaga from './restaurantSaga';
import restaurantByTypeSaga from './restaurantByTypeSaga';

function* rootSaga() {
  yield fork(mySaga);
  yield fork(authSaga);
  yield fork(restaurantSaga);
  yield fork(restaurantByTypeSaga);
}

export default rootSaga;

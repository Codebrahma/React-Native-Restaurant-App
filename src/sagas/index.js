import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import authSaga from './authSaga';
import restaurantSaga from './restaurantSaga';
import restaurantByTypeSaga from './restaurantByTypeSaga';
import cuisineTypeSaga from './cuisineTypeSaga';

function* rootSaga() {
  yield fork(mySaga);
  yield fork(authSaga);
  yield fork(restaurantSaga);
  yield fork(restaurantByTypeSaga);
  yield fork(cuisineTypeSaga);
}

export default rootSaga;

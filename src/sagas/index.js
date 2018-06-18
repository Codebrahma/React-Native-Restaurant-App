import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';

function* rootSaga() {
  yield fork(mySaga);
}

export default rootSaga;

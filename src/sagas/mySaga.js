import { put, call, select, takeLatest } from 'redux-saga/effects';

function* myTask(action) {
  try {
    // action=> type, payload
    // Do task
    yield put({
      type: 'ACTION',
      payload: 'xxxxxxxx',
    });
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest('ACTION_CODE', myTask);
}

export default mySaga;

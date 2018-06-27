import { call, put, takeLatest } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';

function* cartItemsFetch(action) {
  yield put({
    type: 'IN_PROGRESS',
  });

  try {
    const response = yield call(storage.getItem, 'userCart');

    yield put({
      type: 'SAVE_NEW_CART',
      payload: JSON.parse(response) || [],
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: 'SAVE_NEW_CART',
      payload: {
        cartData: [],
      },
    });
  }
}

function* cartItemsFetchSaga() {
  yield takeLatest('FETCH_CART_ITEMS', cartItemsFetch);
}

export default cartItemsFetchSaga;

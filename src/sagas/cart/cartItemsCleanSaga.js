import { call, put, takeLatest } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';

function* cartItemsClean(action) {
  try {
    const newCart = [];

    yield call(storage.removeItem, 'userCart');

    yield put({ type: 'SAVE_NEW_CART', payload: newCart });
  } catch (e) {
    console.log(e);
  }
}

/**
 * Saga to handle action CLEAN_CART_ITEMS
 */
function* cartItemsCleanSaga() {
  yield takeLatest('CLEAN_CART_ITEMS', cartItemsClean);
}

export default cartItemsCleanSaga;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';

import { deDupeItems } from '../../utils/array';

/**
 * Get current cart items from the store
 */
const cartItemsSelector = state => state.cart.cartData || [];

/**
 * saga called on action
 */
function* cartItemsAdd(action) {
  try {
    const currentCart = yield select(cartItemsSelector);

    const newCart = deDupeItems([...currentCart, ...[action.payload]]) || [];
    yield call(storage.setItem, 'userCart', JSON.stringify(newCart));

    yield put({ type: 'SAVE_NEW_CART', payload: newCart });
  } catch (e) {
    console.log(e);
  }
}

/**
 * Saga which handles the action UPDATE_CART_ITEMS
 */
function* cartItemsAddSaga() {
  yield takeLatest('UPDATE_CART_ITEMS', cartItemsAdd);
}

export default cartItemsAddSaga;

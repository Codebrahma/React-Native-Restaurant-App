import { call, put, select, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

/**
 * Get Cart Items from redux store
 */
const cartItemsSelector = state => state.cart.cartData || [];

function* cartItemDelete(action) {
  try {
    const currentCart = yield select(cartItemsSelector);

    const newCart = currentCart.filter(obj => obj._id !== action.payload);

    yield call(AsyncStorage.setItem, 'userCart', JSON.stringify(newCart));

    yield put({ type: 'SAVE_NEW_CART', payload: newCart });
  } catch (e) {
    console.log(e);
  }
}

/**
 * Saga to handle the action of deleting a cart item
 */
function* cartItemsDeleteSaga() {
  yield takeLatest('DELETE_CART_ITEM', cartItemDelete);
}

export default cartItemsDeleteSaga;

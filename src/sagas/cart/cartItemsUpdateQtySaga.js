import { call, put, select, takeLatest } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';

/**
 * Get cart items value from store
 */
const cartItemsSelector = state => state.cart.cartData;

function* cartItemUpdateQty(action) {
  try {
    const currentCart = yield select(cartItemsSelector);

    const newCart = currentCart.map((obj) => {
      if (obj._id === action.payload.foodId) {
        const newObj = obj;
        newObj.qty = action.payload.qty;
        return newObj;
      }
      return obj;
    });

    yield call(storage.setItem, 'userCart', JSON.stringify(newCart));
    yield put({ type: 'SAVE_NEW_CART', payload: newCart });
  } catch (e) {
    console.log(e);
  }
}

/**
 *  Saga to handle cart item quantity change
 */
function* cartItemUpdateQtySaga() {
  yield takeLatest('UPDATE_CART_ITEM_QTY', cartItemUpdateQty);
}

export default cartItemUpdateQtySaga;

import { fork } from 'redux-saga/effects';
import mySaga from './mySaga';
import authSaga from './authSaga';
import restaurantSaga from './restaurantSaga';
import restaurantByTypeSaga from './restaurantByTypeSaga';
import cuisineTypeSaga from './cuisineTypeSaga';
import cartItemsAddSaga from './cart/cartItemsAddSaga';
import cartItemsCleanSaga from './cart/cartItemsCleanSaga';
import cartItemsDeleteSaga from './cart/cartItemsDeleteSaga';
import cartItemsFetchSaga from './cart/cartItemsFetchSaga';
import cartItemUpdateQtySaga from './cart/cartItemsUpdateQtySaga';

function* rootSaga() {
  yield fork(mySaga);
  yield fork(authSaga);
  yield fork(restaurantSaga);
  yield fork(restaurantByTypeSaga);
  yield fork(cuisineTypeSaga);
  yield fork(cartItemsAddSaga);
  yield fork(cartItemsCleanSaga);
  yield fork(cartItemsDeleteSaga);
  yield fork(cartItemsFetchSaga);
  yield fork(cartItemUpdateQtySaga);
}

export default rootSaga;

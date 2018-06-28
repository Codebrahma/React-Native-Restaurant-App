import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authReducer from './authReducer';
import restaurantReducer from './restaurantReducer';
import foodsReducer from './foodsReducer';
import cartReducer from './cart';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['loginMessage'],
  stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartData'],
  stateReconciler: autoMergeLevel2,
};

const foodPersistConfig = {
  key: 'food',
  storage,
  blacklist: ['cuisineTypesError'],
  stateReconciler: autoMergeLevel2,
};

const restaPersistConfig = {
  key: 'restaurant',
  storage,
  blacklist: ['cuisineRestaurantError', 'error', 'cuisineRestaurants', 'restaurantInfo'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  restaurant: persistReducer(restaPersistConfig, restaurantReducer),
  food: persistReducer(foodPersistConfig, foodsReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export default rootReducer;

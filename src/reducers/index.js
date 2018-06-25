import { combineReducers } from 'redux';
import authReducer from './authReducer';
import restaurantReducer from './restaurantReducer';
import foodsReducer from './foodsReducer';
import cartReducer from './cart';

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  food: foodsReducer,
  cart: cartReducer,
});

export default rootReducer;

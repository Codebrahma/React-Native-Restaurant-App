import { combineReducers } from 'redux';
import authReducer from './authReducer';
import restaurantReducer from './restaurantReducer';
import foodsReducer from './foodsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  food: foodsReducer,
});

export default rootReducer;

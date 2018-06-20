import { combineReducers } from 'redux';
import authReducer from './authReducer';
import restaurantReducer from './restaurantReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
});

export default rootReducer;

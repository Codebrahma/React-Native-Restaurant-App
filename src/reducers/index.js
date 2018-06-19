import { combineReducers } from 'redux';
import myReducer from './myReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  myReducer,
  auth: authReducer,
});

export default rootReducer;

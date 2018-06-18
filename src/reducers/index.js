import { combineReducers } from 'redux';
import myReducer from './myReducer';

const rootReducer = combineReducers({
  myReducer,
});

export default rootReducer;

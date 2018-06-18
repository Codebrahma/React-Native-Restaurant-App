import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/index';
import rootSagas from '../sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create a redux store with our reducer above and middleware
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

// run the saga
sagaMiddleware.run(rootSagas);

export default store;

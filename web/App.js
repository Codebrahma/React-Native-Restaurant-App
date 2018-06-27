import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/store/index';
import styles from './index.scss';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className={styles.cb}>
        <Routes />
      </div>
    </PersistGate>
  </Provider>
);


export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import AppRouter from './router';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}


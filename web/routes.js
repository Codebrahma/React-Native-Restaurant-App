import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import CuisineGrid from './components/CuisineGrid';

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={LoginScreen} />
    <Route path="/allCuisines" component={CuisineGrid} />
  </BrowserRouter>
);

export default Routes;

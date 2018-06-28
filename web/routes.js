import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import CuisineGrid from './components/cuisinesAndRestaurants/CuisineGrid';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginScreen} />
      <Route path="/allCuisinesAndRestaurants" component={CuisineGrid} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

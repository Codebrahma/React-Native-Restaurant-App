import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginScreen} />
      <Route path="/allCuisinesAndRestaurants" component={HomeScreen} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

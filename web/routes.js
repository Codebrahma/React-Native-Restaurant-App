import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantInfo from './screens/RestaurantInfoScreen';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginScreen} />
      <Route path="/allCuisinesAndRestaurants" component={HomeScreen} />
      <Route path="/restaurantInfo/:id" component={RestaurantInfo} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

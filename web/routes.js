import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantInfo from './screens/RestaurantInfoScreen';
import CartDetails from './screens/CartScreen';
import OrdersList from './screens/OrdersList';
import PaymentHome from './screens/payment/Home';
import PaymentFailure from './screens/payment/Failure';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginScreen} />
      <Route path="/allCuisinesAndRestaurants" component={HomeScreen} />
      <Route path="/restaurantInfo/:id" component={RestaurantInfo} />
      <Route path="/cart" component={CartDetails} />
      <Route path="/paymentsuccess" component={PaymentHome} />
      <Route path="/paymentfail" component={PaymentFailure} />
      <Route path="/allOrders" component={OrdersList} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

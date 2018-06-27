/* eslint-disable react/prop-types */
import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import Colors from '../src/constants/colors';
import SignupScreen from '../src/screens/SignupScreen';
import RestaurantInfoScreen from '../src/screens/RestaurantInfoScreen';
import CuisineRestaurantsScreen from '../src/screens/CuisineRestaurantsScreen';
import CartScreen from '../src/screens/CartScreen';


const AppRouter = () => (
  <Router>
    <Scene key="root" title="">
      <Scene key="loginScreen" component={LoginScreen} initial hideNavBar />
      <Scene key="signupScreen" component={SignupScreen} />
      <Scene
        key="homeScreen"
        component={HomeScreen}
        title="Restaurant App"
        titleStyle={{
          fontFamily: 'Roboto Slab',
          color: Colors.primaryColor,
        }}
      />
      <Scene
        key="cuisineRestaurants"
        component={CuisineRestaurantsScreen}
        titleStyle={{
          fontFamily: 'Roboto Slab',
          color: Colors.primaryColor,
        }}
      />
      <Scene key="restaurantScreen" component={RestaurantInfoScreen} />
      <Scene
        key="cartScreen"
        component={CartScreen}
        navigationBarStyle={{
          backgroundColor: '#fff',
          elevation: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
        titleStyle={{
          fontFamily: 'Roboto Slab',
          color: Colors.primaryColor,
        }}
        title="Cart"
      />
    </Scene>
  </Router>
);

export default AppRouter;

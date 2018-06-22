/* eslint-disable react/prop-types */
import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Colors from './constants/colors';
import SignupScreen from './screens/SignupScreen';
import RestaurantInfoScreen from './screens/RestaurantInfoScreen';
import CuisineRestaurantsScreen from './screens/CuisineRestaurantsScreen';


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
    </Scene>
  </Router>
);

export default AppRouter;

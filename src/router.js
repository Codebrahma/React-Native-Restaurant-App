/* eslint-disable react/prop-types */
import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Colors from './constants/colors';
import SignupScreen from './screens/SignupScreen';
import RestaurantInfoScreen from './screens/RestaurantInfoScreen';

const CustomScene = ({ component, key, title }) => (
  <Scene
    key={key}
    component={component}
    title={title}
    titleStyle={{
      fontFamily: 'Roboto Slab',
      color: Colors.primaryColor,
    }}
  />
);

const AppRouter = () => (
  <Router>
    <Scene key="root">
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
      <CustomScene key="restaurantScreen" component={RestaurantInfoScreen} title="" />
    </Scene>
  </Router>
);

export default AppRouter;

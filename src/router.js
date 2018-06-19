import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Colors from './constants/colors';
import SignupScreen from './screens/SignupScreen';

const AppRouter = () => (
  <Router>
    <Scene key="root">
      <Scene key="loginScreen" component={LoginScreen} initial hideNavBar />
      <Scene key="signupScreen" component={SignupScreen} />
      <Scene
        key="homeScreen"
        component={HomeScreen}
        title="Restaurant App"
        backButtonTintColor="#fff"
        titleStyle={{
          color: Colors.primaryColor,
        }}
      />
    </Scene>
  </Router>
);

export default AppRouter;

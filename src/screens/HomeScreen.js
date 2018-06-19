import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';

class HomeScreen extends Component {
  handleSignOut = async () => {
    await AsyncStorage.removeItem('authToken');
    Actions.reset('loginScreen');
  };

  render() {
    return (
      <AppBase>
        <PrimaryText bold size={26}>Home Screen</PrimaryText>
        <TextButton title="Sign Out" onPress={this.handleSignOut} />
      </AppBase>
    );
  }
}

HomeScreen.propTypes = {};

export default HomeScreen;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import SecondaryText from '../base_components/SecondaryText';
import RoundButton from '../base_components/RoundButton';

class LoginComponent extends Component {
  render() {
    return (
      <AppBase
        style={{
          justifyContent: 'center',
        }}
      >
        <PrimaryText bold size={26}>Restaurant App</PrimaryText>
        <BR size={100} />
        <TextInput
          onChangeText={(text) => {
          }}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          placeholder="Username"
        />
        <BR />
        <TextInput
          onChangeText={(text) => {
          }}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          value=""
          placeholder="Password"
        />
        <BR />
        <SecondaryText
          style={{
            width: '80%',
          }}
          align="right"
        >
          Forgot Password?
        </SecondaryText>
        <BR size={50} />
        <RoundButton
          title="Sign In"
          onPress={() => Actions.homeScreen()}
        />
      </AppBase>
    );
  }
}

LoginComponent.propTypes = {};

export default LoginComponent;

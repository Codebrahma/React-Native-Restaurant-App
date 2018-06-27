/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Actions } from 'react-native-router-flux';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';
import Colors from '../../src/constants/colors';

class LoginComponent extends Component {
  render() {
    const {
      loading, onLoginSubmit, onEmailChange, onPasswordChange, loginError, disableLogin,
    } = this.props;

    return (
      <AppBase
        image
        style={{
          justifyContent: 'center',
        }}
      >
        <PrimaryText bold size={26}>Restaurant App</PrimaryText>
        <BR size={50} />
        {loginError && <PrimaryText>{loginError.message}</PrimaryText>}
        <BR size={50} />

        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onEmailChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue="Test@gmail.com"
          underlineColorAndroid="#B9B9B9"
          placeholder="Email Address"
        />
        <BR />
        <TextInput
          autoCorrect={false}
          onChangeText={debounce(onPasswordChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue="test123"
          underlineColorAndroid="#B9B9B9"
          secureTextEntry
          placeholder="Password"
        />
        <BR />
        <TextButton
          onPress={() => {
          }}
          title="Forgot Password?"
        />
        <BR />
        <RoundButton
          title="Sign In"
          disabled={disableLogin}
          loading={loading}
          onPress={onLoginSubmit}
        />
        <BR size={10} />
        <RoundButton
          primary
          buttonColor={Colors.blue}
          title="Sign Up"
          onPress={() => Actions.signupScreen()}
        />
        <BR size={20} />
        <TextButton
          primary
          title="Skip Login"
          onPress={() => Actions.homeScreen()}
        />
      </AppBase>
    );
  }
}

LoginComponent.defaultProps = {
  loginError: null,
};

LoginComponent.propTypes = {
  disableLogin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
};

export default LoginComponent;

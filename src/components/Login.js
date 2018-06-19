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

class LoginComponent extends Component {
  render() {
    const {
      loading, onLoginSubmit, onEmailChange, onPasswordChange, loginError, disableLogin,
    } = this.props;

    return (
      <AppBase
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
          underlineColorAndroid="#B9B9B9"
          placeholder="Username"
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
          underlineColorAndroid="#B9B9B9"
          value=""
          secureTextEntry
          placeholder="Password"
        />
        <BR />
        <TextButton
          onPress={() => {
          }}
          title="Forgot Password?"
        />
        <BR size={50} />
        <RoundButton
          title="Sign In"
          disabled={disableLogin}
          loading={loading}
          onPress={onLoginSubmit}
        />
        <BR size={50} />
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

/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import { authLogin } from '../actions';
import LoginComponent from '../components/Login';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  handleLoginSubmit = () => {
    const { email, password } = this.state;
    this.props.authLogin(email, password);
  };

  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password,
    });
  };

  render() {
    const { loginLoading, loginError } = this.props;
    const { email, password } = this.state;
    const disableLogin = (!email || email.length === 0 || !password || password.length === 0);
    console.log('disableLogin', disableLogin);
    return (
      <LoginComponent
        loading={loginLoading}
        loginError={loginError}
        disableLogin={disableLogin}
        onLoginSubmit={this.handleLoginSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
      />);
  }
}

LoginScreen.defaultProps = {
  loginError: null,
};

LoginScreen.propTypes = {
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  authLogin: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    loginLoading: state.auth.loginLoading,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authLogin,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);

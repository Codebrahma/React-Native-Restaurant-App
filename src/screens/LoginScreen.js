/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import { authHydrateTokenFromStorage, authLogin } from '../actions';
import LoginComponent from '../components/Login';
import LoadingView from '../base_components/LoadingView';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoadingToken: true,
    };
  }


  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null && token !== undefined && token.length > 10) {
      this.props.authHydrateTokenFromStorage(token);
      Actions.reset('homeScreen');
    } else {
      this.setState({
        isLoadingToken: false,
      });
    }
  };


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

  handleRedirect = async (loginMessage) => {
    try {
      const value = await AsyncStorage.setItem('authToken', loginMessage.token);
      Actions.reset('homeScreen');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { loginLoading, loginMessage } = this.props;
    const { isLoadingToken } = this.state;

    if (isLoadingToken) {
      return (<LoadingView />);
    }

    if (loginMessage !== null && loginMessage.success && loginMessage.token) {
      this.handleRedirect(loginMessage);
      return null;
    }

    let { loginError } = this.props;

    const { email, password } = this.state;

    // eslint-disable-next-line react/prop-types
    loginError = loginError || this.props.navigation.state.params.loginError;

    const disableLogin = (!email || email.length === 0 || !password || password.length === 0);

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
  loginMessage: null,
};

LoginScreen.propTypes = {
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  loginMessage: PropTypes.object,
  authLogin: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    loginLoading: state.auth.loginLoading,
    loginMessage: state.auth.loginMessage,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authLogin,
    authHydrateTokenFromStorage,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);

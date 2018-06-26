/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import { authLogin, authRegister } from '../actions';
import LoginComponent from '../../app/components/Login';
import SignupComponent from '../../app/components/Signup';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  handleSignUpSubmit = () => {
    const { email, password } = this.state;
    this.props.authRegister(email, password);
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
    const { registerLoading, registerError, registerMessage } = this.props;
    const { email, password } = this.state;
    const disableSignUp = (!email || email.length === 0 || !password || password.length === 0);

    return (
      <SignupComponent
        loading={registerLoading}
        registerMessage={registerMessage}
        registerError={registerError}
        disableSignUp={disableSignUp}
        onSignupSubmit={this.handleSignUpSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
      />);
  }
}

SignupScreen.defaultProps = {
  registerError: null,
  registerMessage: null,
  registerLoading: false,
};

SignupScreen.propTypes = {
  registerMessage: PropTypes.object,
  registerLoading: PropTypes.bool,
  registerError: PropTypes.object,
  authRegister: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    registerMessage: state.auth.registerMessage,
    registerError: state.auth.registerError,
    registerLoading: state.auth.registerLoading,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authRegister,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(SignupScreen);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authLogin } from '../actions';
import LoginComponent from '../components/Login';

class LoginScreen extends Component {
  componentDidMount() {
    this.props.authLogin('test', 'tata');
  }

  render() {
    return (<LoginComponent />);
  }
}

LoginScreen.propTypes = {};

function initMapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authLogin,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);

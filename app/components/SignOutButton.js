/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { authLogout } from '../../src/actions/index';
import TextButton from '../base_components/TextButton';

class SignOutButton extends Component {
  componentWillReceiveProps(nexProps, nextContext) {
    const { loginMessage } = nexProps;
    if (!loginMessage || loginMessage.token) {
      Actions.reset('loginScreen');
    }
  }


  handleSignOut = () => {
    this.props.authLogout();
    Actions.reset('loginScreen');
  };

  render() {
    const { loginMessage } = this.props;

    if (loginMessage === null || !loginMessage.token) {
      return null;
    }
    return (
      <TextButton
        style={{
          marginRight: 20,
          color: '#000061',
        }}
        primary
        title="Sign Out"
        onPress={this.handleSignOut}
      />
    );
  }
}

SignOutButton.defaultProps = {
  loginMessage: {},
};

SignOutButton.propTypes = {
  loginMessage: PropTypes.object,
  authLogout: PropTypes.func.isRequired,
};


function initMapStateToProps(state) {
  return {
    loginMessage: state.auth.loginMessage,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authLogout,
  }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(SignOutButton);

/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { authLogout } from '../../src/actions/index';
import ViewRow from '../base_components/ViewRow';
import RippleIcon from '../base_components/RippleIcon';
import PrimaryText from '../base_components/PrimaryText';

class RightHeaderButtons extends Component {
  componentWillReceiveProps(nexProps, nextContext) {
    const { loginMessage } = nexProps;
    if (!loginMessage || !loginMessage.token) {
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
      <ViewRow
        jc="flex-end"
        ai="center"
      >
        <RippleIcon
          name="ios-cart-outline"
          dark
          size={20}
          onPress={() => Actions.cartScreen()}
        >
          <View
            style={{
              position: 'absolute',
              right: 25,
              top: 0,
              width: 25,
              height: 25,
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: '#888',
            }}
          >
            <PrimaryText style={{
              color: '#fff',
              fontSize: 14,
            }}
            >
              {this.props.cartData.length}
            </PrimaryText>
          </View>
        </RippleIcon>

        <RippleIcon
          dark
          size={20
          }
          name="ios-log-out"
          onPress={this.handleSignOut}
        />
      </ViewRow>
    );
  }
}

RightHeaderButtons.defaultProps = {
  loginMessage: {},
  cartData: [],
};

RightHeaderButtons.propTypes = {
  loginMessage: PropTypes.object,
  cartData: PropTypes.array,
  authLogout: PropTypes.func.isRequired,
};


function initMapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    loginMessage: state.auth.loginMessage,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authLogout,
  }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(RightHeaderButtons);

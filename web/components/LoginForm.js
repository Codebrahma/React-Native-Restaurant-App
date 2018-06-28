import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route, Redirect, withRouter } from 'react-router-dom';

import styled from 'styled-components';
import Colors from '../../src/constants/colors';
import { PrimaryText, FormField, FormContainer, BR } from '../base_components/sharedComponents';
import Button from '../base_components/Button';
import { authLogin } from '../../src/actions';
import Loader from '../base_components/Loader';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {
    if (this.props.loginMessage) {
      this.props.history.push('/allCuisinesAndRestaurants');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginMessage) {
      nextProps.history.push('/allCuisinesAndRestaurants');
    } else {
      nextProps.history.push('/');
    }
  }

  login = () => {
    this.props.authLogin(this.state.email, this.state.password);
  }

  render() {
    const { email, password } = this.state;
    const disableLogin = (!email || email.length === 0 || !password || password.length === 0);

    if (this.props.loginLoading) { return <Loader />; }
    return (
      <FormContainer>
        <BR />
        <FormField
          type="text"
          name="username"
          placeholder="Test@example.com"
          value={this.state.username}
          onChange={event => this.setState({ email: event.target.value })}
        />
        <BR />
        <FormField
          type="text"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />
        <BR />
        <PrimaryText>Forgot Password?</PrimaryText>
        <BR />
        <Button
          onClick={this.login}
          disabled={disableLogin}
          text="Sign In"
          textColor={disableLogin ? '' : Colors.white}
          buttonColor={Colors.primaryColor}
        />
        <BR />
        <Button
          text="Sign Up"
          textColor={Colors.white}
          buttonColor={Colors.blue}
          disabled={false}
        />
        <BR />
      </FormContainer>
    );
  }
}

const mapDispatchToProps = {
  authLogin,
};

const mapStateToProps = ({ auth }) => ({
  loginLoading: auth.loginLoading,
  loginError: auth.loginError,
  loginMessage: auth.loginMessage,
});

LoginForm.propTypes = {
  authLogin: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  loginMessage: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
};

LoginForm.defaultProps = {
  loginMessage: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));

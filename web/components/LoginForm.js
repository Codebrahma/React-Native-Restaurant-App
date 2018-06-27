import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Colors from '../../src/constants/colors';
import { PrimaryText, Button } from '../base_components/sharedComponents';
import { authLogin } from '../../src/actions';

const FormContainer = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-self: center;
  align-items: center;
`;

const FormField = styled.input`
  width: 40%;
  margin: auto;
  padding: 1%;
`;

const LoginButton = styled.button`
  background-color: ${Colors.blue};
  width: 40%;
  margin: auto;
  padding: 2%;
  border-radius: 25px;
  border: none;
`;

const SignupButton = styled.button`
  width: 40%;
  margin: auto;
  padding: 2%;
  border-radius: 25px;
  border: none;
`;

const BR = styled.div`
  height: 20px;
`;

const Signin = styled.div`
  color: ${Colors.white};
`;

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  login = () => {
    // this.props.authLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <FormContainer>
        <BR />
        <FormField
          type="text"
          name="username"
          placeholder="Test@example.com"
          value={this.state.username}
          onChange={username => this.setState({ username })}
        />
        <BR />
        <FormField
          type="text"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={password => this.setState({ password })}
        />
        <BR />
        <PrimaryText>Forgot Password?</PrimaryText>
        <BR />
        <LoginButton onPress={this.login}>
          <Signin>Sign In</Signin>
        </LoginButton>
        <BR />
        <SignupButton>Sign Up</SignupButton>
        <BR />
      </FormContainer>
    );
  }
}

const mapDispatchToProps = {
  authLogin,
};

LoginForm.propTypes = {
  authLogin: PropTypes.func.isRequired,
};

export default LoginForm;

// export default connect(null, mapDispatchToProps)(LoginForm);

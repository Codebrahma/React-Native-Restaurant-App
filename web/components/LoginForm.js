import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import Colors from '../../src/constants/colors';
import { PrimaryText } from '../base_components/sharedComponents';
import { authLogin } from '../../src/actions';
import Loader from '../base_components/Loader';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      'Roboto',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

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
    const { classes } = this.props;
    if (this.props.loginLoading) { return <Loader />; }

    return (
      <div className={classes.container}>
        <FormControl className={classes.margin}>
          <TextField
            className={classes.margin}
            label="Username"
            id="bootstrap-input"
            InputProps={{
             disableUnderline: false,
             classes: {
               root: classes.bootstrapRoot,
               input: classes.bootstrapInput,
             },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.bootstrapFormLabel,
            }}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <TextField
            label="Password"
            id="input"
            className={classes.margin}
            InputProps={{
             disableUnderline: false,
             classes: {
               root: classes.bootstrapRoot,
               input: classes.bootstrapInput,
             },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.bootstrapFormLabel,
            }}
            onChange={event => this.setState({ password: event.target.value })}
            type="password"
          />
          <PrimaryText>Forgot Password?</PrimaryText>
          <Button
            variant="contained"
            disabled={disableLogin}
            className={classes.margin}
            color="primary"
            onClick={this.login}
          >Sign In
          </Button>
          <Button
            variant="contained"
            className={classes.margin}
            color="secondary"
          >Sign Up
          </Button>
        </FormControl>
      </div>
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
  classes: PropTypes.instanceOf(Object),
};

LoginForm.defaultProps = {
  loginMessage: null,
  classes: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(LoginForm)));//eslint-disable-line

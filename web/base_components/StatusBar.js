import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import { StatusBarView, PrimaryText, CartQuantity } from './sharedComponents';
import { authLogout, fetchOrders } from '../../src/actions';
import Colors from '../../src/constants/colors';
import CartDetails from '../screens/CartScreen';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    color: Colors.primaryColor,
  },
};

class StatusBar extends React.Component {
  state={
    anchorEl: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginMessage === null) {
      this.props.history.push('/');
    }
    if (nextProps.ordersList.length !== 0) {
      this.props.history.push('/allOrders');
    }
  }
  openCart = () => {
    this.props.history.push('/cart');
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (type) => {
    this.setState({ anchorEl: null });
    switch (type) {
      case 'cart':
        this.openCart();
        break;
      case 'orders':
        this.props.fetchOrders();
        break;
      case 'sign-out':
        this.props.authLogout();
        break;
      default:
        break;
    }
  };

  render() {
    const { quantity = 0, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Restaurant App
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >{quantity !== 0 ?
              <Badge color="primary" badgeContent={quantity}>
                <AccountCircle />
              </Badge>
            :
              <AccountCircle />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
              transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => this.handleClose('cart')}>
                {`My cart (${quantity})`}
              </MenuItem>
              <MenuItem onClick={() => this.handleClose('orders')}>
                My orders
              </MenuItem>
              <MenuItem onClick={() => this.handleClose('sign-out')}>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

StatusBar.propTypes = {
  quantity: PropTypes.number,
  history: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object),
  loginMessage: PropTypes.instanceOf(Object).isRequired,
  authLogout: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
  ordersList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

StatusBar.defaultProps = {
  quantity: 0,
  classes: null,
};

const mapStateToProps = ({ cart, auth, orders }) =>
  ({
    quantity: (isEmpty(cart.cartData) ? 0 :
      (cart.cartData).reduce((sum, current) => sum + current.qty, 0)),
    loginMessage: auth.loginMessage,
    ordersList: orders.ordersList,
  });

export default connect(
  mapStateToProps,
  { authLogout, fetchOrders },
)(withRouter(withStyles(styles)(StatusBar)));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { StatusBarView, PrimaryText, CartQuantity } from './sharedComponents';
import colors from '../../src/constants/colors';
import CartDetails from '../screens/CartScreen';

class StatusBar extends React.Component {
  openCart = () => {
    this.props.history.push('/cart');
  }

  render() {
    const { quantity = 0 } = this.props;

    return (
      <StatusBarView>
        <PrimaryText width="0%">RestaurantApp</PrimaryText>
        <div style={{ padding: '1%' }} onClick={this.openCart}>
          <i className="material-icons md-24 md-light" >add_shopping_cart</i>
          {
          (quantity > 0) &&
          <CartQuantity>{quantity}</CartQuantity>
        }
        </div>
      </StatusBarView>
    );
  }
}

StatusBar.propTypes = {
  quantity: PropTypes.number,
  history: PropTypes.instanceOf(Object).isRequired,
};

StatusBar.defaultProps = {
  quantity: 0,
};

const mapStateToProps = ({ cart }) =>
  ({
    quantity: (cart.cartData || {}).reduce((sum, current) => sum + current.qty, 0),

  });

export default connect(mapStateToProps, {})(withRouter(StatusBar));

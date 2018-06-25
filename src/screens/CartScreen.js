/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import Item from '../components/Checkout/Item';
import Footer from '../components/Checkout/Footer';
import { deleteCartItem, fetchCartItems, updateCartItemQty } from '../actions/cart';
import AppBase from '../base_components/AppBase';
import BillReceipt from '../components/Checkout/BillReceipt';

const SectionGap = styled.View`
  margin-top: 2%;
`;

const BillReceiptContainer = styled.View`
  margin-bottom: 10%;
`;

class CartScreen extends Component {
  componentDidMount() {
    this.props.fetchCartItems();
  }

  _renderItem = ({ item }) => (
    <Item
      key={item._id}
      name={item.food.name}
      price={`₹${item.price * item.qty}`}
      qty={item.qty}
      onChange={value => this.props.updateCartItemQty(item._id, value)}
    />
  );

  render() {
    const billInfo = [
      {
        name: 'Items Total',
        total: 480,
      },
      {
        name: 'Offer Discount',
        total: 18,
      },
      {
        name: 'Taxes',
        total: 12,
      },
      {
        name: 'Delivery Charges',
        total: 30,
      },
    ];

    return (
      <AppBase
        style={{
          alignItems: 'stretch',
        }}
      >
        <ScrollView>
          <SectionGap />
          {
            this.props.cartData.map((item, index) => (
              this._renderItem({ item })
            ))
          }
          <SectionGap />
          <BillReceiptContainer>
            <BillReceipt
              billInfo={billInfo}
            />
          </BillReceiptContainer>
        </ScrollView>
        <Footer totalAmount="184 ₹" />
      </AppBase>
    );
  }
}

CartScreen.propTypes = {
  cartData: PropTypes.array.isRequired,
  fetchCartItems: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
};


function initMapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
  };
}

function initMapDispatchToProps(dipatch) {
  return bindActionCreators({
    deleteCartItem,
    fetchCartItems,
    updateCartItemQty,
  }, dipatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CartScreen);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { fetchCartItems, deleteCartItem, updateCartItemQty } from '../../src/actions/cart';
import CounterButton from '../base_components/checkout/CounterButton';
import Colors from '../../src/constants/colors';
import BillReceipt from '../base_components/checkout/BillReceipt';
import AppBase from '../base_components/AppBase';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2%;
  border-style: solid;
  border-color: ${Colors.lightGrey};
  border-width: 2px;
  box-shadow: 2px 2px ${Colors.lightGrey};
  margin: 1%;
  width: 80%;
  background-color: ${Colors.white};
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100vw;
`;

const customStyles = { backgroundColor: Colors.baseColor };

class CartDetails extends React.Component {
  componentDidMount() {
    this.props.fetchCartItems();
  }

  calculatePrice = (quantity, price) => (quantity * price).toFixed(2);

  handleQuantity = (id, quantity) => {
    if (quantity === 0) {
      this.props.deleteCartItem(id);
    } else {
      this.props.updateCartItemQty(id, quantity);
    }
  }

  displayItems = () => this.props.cartData.map(cartItem => (
    <Container>
      <div>{cartItem.food.name}</div>
      <CounterButton
        quantity={cartItem.qty}
        onClick={qty => this.handleQuantity(cartItem._id, qty)}
        id={cartItem._id}
      />
      <div>{`Rs ${this.calculatePrice(cartItem.qty, cartItem.price)}`}</div>
    </Container>
  ))

  renderBillReceipt = (billInfo, totalBill) => (
    <BillReceipt
      billInfo={billInfo}
      total={totalBill}
    />
  )

  render() {
    let totalBill = parseFloat(this.props.cartData.reduce(
      (total, item) => total + (item.price * item.qty),
      0,
    ));
    const taxPercent = 8;

    const tax = +(totalBill * (taxPercent / 100)).toFixed(2);
    const billInfo = [
      {
        name: 'Items Total',
        total: totalBill,
      },
      {
        name: 'Offer Discount',
        total: -18,
      },
      {
        name: `Taxes (${taxPercent}%)`,
        total: tax,
      },
      {
        name: 'Delivery Charges',
        total: 30,
      },
    ];
    totalBill += (tax + 30) - 18;

    return (
      <AppBase>
        <MainContainer>
          {this.displayItems()}
          {this.renderBillReceipt(billInfo, totalBill)}
        </MainContainer>
      </AppBase >
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cartData: cart.cartData });

const mapDispatchToProps = { fetchCartItems, updateCartItemQty, deleteCartItem };

CartDetails.propTypes = {
  fetchCartItems: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  cartData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

import { fetchCartItems, deleteCartItem, updateCartItemQty, cleanCart } from '../../src/actions/cart';
import { createOrder } from '../../src/actions';
import CounterButton from '../base_components/checkout/CounterButton';
import Colors from '../../src/constants/colors';
import BillReceipt from '../base_components/checkout/BillReceipt';
import AppBase from '../base_components/AppBase';
import displayPaymentModal from '../../src/utils/displayPaymentModal';

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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin: 2%;
`;

const Buttons = styled.button`
  background-color: ${props => props.backgroundColor && props.backgroundColor};
  display: flex;
  flex: 0.5;
  color: ${props => props.color && props.color};
  justify-content: center;
  height: 8vh;
  font-weight: bold;
  font-size: 1.2em;
  &:hover{
    cursor: pointer
  }
`;

const NoItemFoundText = styled.div`
  width: 100vw;
  text-align: center;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 4%;
  color:${Colors.slateGrey};
`;

const customStyles = { backgroundColor: Colors.baseColor };

class CartDetails extends React.Component {
  componentDidMount() {
    this.props.fetchCartItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders.createdOrder !== null) {
      this.doPayment(nextProps.orders.createdOrder);
    }
    // TODO: else condition
  }

  onSubmit = (token) => {
    if (token.tokenId) {
      this.props.history.push('/paymentsuccess');
      // this.props.cleanCart();
    }
    // TODO: else condition
  }

  calculatePrice = (quantity, price) => (quantity * price).toFixed(2);

  doPayment = (props) => {
    const order = { orderTotal: props.totalCost, orderId: props._id };
    displayPaymentModal(order, this.onSubmit);
  }

  handlePayment = (totalAmount) => {
    const { cartData } = this.props;

    if (cartData.length > 0) {
      const postData = cartData.map(item => ({
        id: item.food._id,
        quantity: item.qty,
        price: item.price,
      }));

      this.props.createOrder(postData, totalAmount);
    }
  }

  handleQuantity = (id, quantity) => {
    if (quantity === 0) {
      this.props.deleteCartItem(id);
    } else {
      this.props.updateCartItemQty(id, quantity);
    }
  }

  displayItems = () => (this.props.cartData.map(cartItem => (
    <Container>
      <div>{cartItem.food.name}</div>
      <CounterButton
        quantity={cartItem.qty}
        onClick={qty => this.handleQuantity(cartItem._id, qty)}
        id={cartItem._id}
      />
      <div>{`Rs ${this.calculatePrice(cartItem.qty, cartItem.price)}`}</div>
    </Container>
  )))

  renderBillReceipt = (billInfo, totalBill) => (
    <BillReceipt
      billInfo={billInfo}
      total={totalBill}
    />
  )

  renderPaymentButton = totalBill => (
    <ButtonsContainer>
      <Buttons
        color={Colors.primaryColor}
        backgroundColor={Colors.lightGrey}
        disabled
      >
        {totalBill}
      </Buttons>
      <Buttons
        color={Colors.white}
        backgroundColor={Colors.green}
        onClick={() => this.handlePayment(totalBill)}
      >
        Proceed To Pay
      </Buttons>
    </ButtonsContainer>
  )

  render() {
    if (this.props.cartData.length === 0) {
      return (
        <AppBase>
          <NoItemFoundText>No items found in cart.</NoItemFoundText>
        </AppBase>
      );
    }
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
          {this.renderPaymentButton(totalBill)}
        </MainContainer>
      </AppBase >
    );
  }
}

const mapStateToProps = ({ cart, orders }) => ({ cartData: cart.cartData, orders });

const mapDispatchToProps = {
  fetchCartItems, updateCartItemQty, deleteCartItem, createOrder, cleanCart,
};

CartDetails.propTypes = {
  fetchCartItems: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  cartData: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  history: PropTypes.instanceOf(Object).isRequired,
  createOrder: PropTypes.func.isRequired,
  orders: PropTypes.instanceOf(Object).isRequired,
};

CartDetails.defaultProps = {
  cartData: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDetails));

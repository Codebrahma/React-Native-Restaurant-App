const publishKey = 'pk_test_o1tiebpOj9CuG7gR4PpTT1Ez';
/**
  Open Stripe payment modal for the payment
*/
const displayPaymentModal = (props, onSubmit) => {
  const checkoutHandler = window.StripeCheckout.configure({
    key: publishKey,
    locale: 'auto',
  });
  checkoutHandler.open({
    name: `Pay Rs.${props.orderTotal}`,
    description: `Order: ${props.orderId}`,
    token: (token) => {
      console.log(token);
      if (token && token.id) {
        onSubmit && onSubmit({
          tokenId: token.id,
          orderId: props.orderId,
          email: token.email,
          userId: props.username,
        });
      } else {
        // to do
      }
    },
  });
};

export default displayPaymentModal;

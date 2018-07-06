const initialState = {
  ordersList: [],
  ordersListError: null,
  createdOrder: null,
  createdOrderError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ordersList: payload,
        ordersListError: null,
      };
    case 'FETCH_ORDERS_ERROR':
      return {
        ordersList: null,
        ordersListError: payload,
      };
    case 'CREATE_ORDER_SUCCESS':
      return {
        createdOrder: payload,
        createdOrderError: null,
      };
    case 'CREATE_ORDER_ERROR':
      return {
        createdOrder: null,
        createdOrderError: payload,
      };
    case 'CANCEL_ORDER':
      return {
        createdOrder: null,
        createdOrderError: null,
      };
    default:
      return state;
  }
};

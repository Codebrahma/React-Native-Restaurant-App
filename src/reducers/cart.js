const initialState = {
  cartData: [],
  inProgress: false,
};

/**
 Store the data for the cart and its details
 */

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case 'SAVE_NEW_CART':
      return {
        ...state,
        cartData: payload,
      };
    case 'IN_PROGRESS':
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
};

const initialState = {
  someKey: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ACTION':
      return {
        someKey: payload,
      };
    default:
      return state;
  }
};

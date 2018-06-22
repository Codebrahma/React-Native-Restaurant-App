const initialState = {
  cuisineTypes: [],
  cuisineTypesError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_CUISINE_TYPE_SUCCESS':
      return {
        ...state,
        cuisineTypes: payload,
        error: null,
      };
    case 'FETCH_CUISINE_TYPE_ERROR':
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

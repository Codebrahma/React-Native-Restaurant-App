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
        cuisineTypesError: null,
      };
    case 'FETCH_CUISINE_TYPE_ERROR':
      return {
        ...state,
        cuisineTypesError: payload,
      };
    default:
      return state;
  }
};

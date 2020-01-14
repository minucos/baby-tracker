
const _initialState = null;

const FilterReducer = (state = _initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case value:
      return action.filter;
  
    default:
      return state;
  }
}
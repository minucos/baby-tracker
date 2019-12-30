const UIReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    default:
      return oldState;
  }
};

export default UIReducer;
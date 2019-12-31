import { RECEIVE_CHILDREN } from "../actions/child_actions";

const ChildReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  let newState = {};
  switch (action.type) {
    case RECEIVE_CHILDREN:
      action.children.data.forEach(child => {
        newState[child._id] = child;
      })
      return newState;

    default:
      return oldState;
  }
};

export default ChildReducer;
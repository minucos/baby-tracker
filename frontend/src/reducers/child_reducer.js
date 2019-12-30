import { RECEIVE_CHILDREN } from "../actions/child_actions";

const ChildReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CHILDREN:
      debugger
      return Object.assign({},action.children);

    default:
      return oldState;
  }
};

export default ChildReducer;
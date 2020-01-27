import { RECEIVE_CHILDREN, RECEIVE_CHILD } from "../actions/child_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const ChildReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  let newState = {};
  switch (action.type) {
    case RECEIVE_CHILDREN:
      action.children.forEach(child => {
        newState[child._id] = child;
      })
      return newState;

    case RECEIVE_CHILD:
      return Object.assign({},oldState,{ [action.child._id]: action.child });
      
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return oldState;
  }
};

export default ChildReducer;
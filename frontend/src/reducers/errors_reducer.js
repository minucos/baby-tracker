import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS, RECEIVE_USER_LOGOUT } from "../actions/session_actions";
import { RECEIVE_CHILD_ERRORS } from "../actions/child_actions";

const ErrorsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return Object.assign({},action.errors);
    case CLEAR_SESSION_ERRORS:
      return {};
    case RECEIVE_CHILD_ERRORS:
      return oldState

    case RECEIVE_USER_LOGOUT:
      return {};
      
    default:
      return oldState;
  }
};

export default ErrorsReducer;
import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {}
}

const SessionsReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...oldState,
        isAuthenticated: !!action.user,
        user: action.user
      }

    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      }

    default:
      return oldState;
  };
};

export default SessionsReducer;
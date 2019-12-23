import { RECEIVE_CURRENT_USER } from "../actions/users_actions";


const SessionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user;
    default:
      return oldState;
  };
};

export default SessionsReducer;
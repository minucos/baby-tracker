import { RECEIVE_FILTERED_EVENTS } from "../actions/event_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const CountReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FILTERED_EVENTS:
      return action.count;

    case RECEIVE_USER_LOGOUT:
      return null;
      
    default:
      return state;
  }
};

export default CountReducer;
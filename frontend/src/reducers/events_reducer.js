import { 
  RECEIVE_ALL_EVENTS, 
  RECEIVE_EVENT, 
  CLEAR_EVENTS, 
  RECEIVE_FILTERED_EVENTS,
  REMOVE_EVENT
} from "../actions/event_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const EventReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      action.events.forEach(event => {
        newState[event._id] = event;
      })
      return newState;
    
    case RECEIVE_FILTERED_EVENTS:
      action.events.forEach(event => {
        newState[event._id] = event;
      })
      return newState;
      
    case RECEIVE_EVENT:
      return Object.assign({},oldState,{ [action.event._id]: action.event });

    case REMOVE_EVENT:
      newState = Object.assign({},oldState);
      delete newState[action.event._id];
      return newState;

    case CLEAR_EVENTS:
      return {};

    case RECEIVE_USER_LOGOUT:
      return {};

    default:
      return oldState;
  }
};

export default EventReducer;
import { RECEIVE_ALL_EVENTS, RECEIVE_EVENT, CLEAR_EVENTS, RECEIVE_FILTERED_EVENTS } from "../actions/event_actions";

const EventReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      debugger
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

    case CLEAR_EVENTS:
      return {};

    default:
      return oldState;
  }
};

export default EventReducer;
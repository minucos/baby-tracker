import { RECEIVE_FILTERED_EVENTS } from "../actions/event_actions";

const CountReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FILTERED_EVENTS:
      return action.count;
    default:
      return state;
  }
};

export default CountReducer;
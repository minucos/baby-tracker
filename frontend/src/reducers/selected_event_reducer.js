import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ui_actions";

const initialState = null;

const SelectedEventReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case OPEN_MODAL:
      if (action.eventId !== undefined) return action.eventId;
      return oldState;

    case CLOSE_MODAL:
      return initialState;
    default:
      return oldState;
  }
};

export default SelectedEventReducer;
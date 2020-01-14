import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ui_actions";

const initialState = null;

const FormReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case OPEN_MODAL:
      return action.childId;
    case CLOSE_MODAL:
      return initialState;
    default:
      return oldState;
  }
};

export default FormReducer;
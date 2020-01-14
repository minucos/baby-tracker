import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ui_actions";

const initialState = false;

const ModalReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return initialState;
    default:
      return oldState;
  }
};

export default ModalReducer;
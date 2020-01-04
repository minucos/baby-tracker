import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";

const initialState = { modal: false };

const UIReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case OPEN_MODAL:
      return { modal: action.modal };
    case CLOSE_MODAL:
      return initialState;
    default:
      return oldState;
  }
};

export default UIReducer;
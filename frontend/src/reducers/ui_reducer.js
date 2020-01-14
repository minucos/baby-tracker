import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';
import FormReducer from './form_reducer';

const UIReducer = combineReducers({
  modal: ModalReducer,
  selectedChild: FormReducer
});

export default UIReducer;
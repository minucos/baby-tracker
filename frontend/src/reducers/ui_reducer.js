import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';
import FormReducer from './form_reducer';
import CountReducer from './count_reducer';

const UIReducer = combineReducers({
  modal: ModalReducer,
  selectedChild: FormReducer,
  count: CountReducer
});

export default UIReducer;
import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';
import FormReducer from './form_reducer';
import CountReducer from './count_reducer';
import SelectedEventReducer from './selected_event_reducer'

const UIReducer = combineReducers({
  modal: ModalReducer,
  selectedChild: FormReducer,
  selectedEvent: SelectedEventReducer,
  count: CountReducer
});

export default UIReducer;
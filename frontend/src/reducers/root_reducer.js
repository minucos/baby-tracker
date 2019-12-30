import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';
import SessionsReducer from './sessions_reducer';
import ErrorsReducer from './errors_reducer';
import UIReducer from './ui_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  errors: ErrorsReducer,
  session: SessionsReducer,
  ui: UIReducer
});

export default RootReducer;
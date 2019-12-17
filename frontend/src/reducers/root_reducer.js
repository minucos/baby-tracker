import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  errors: () => ({}),
  session: () => ({}),
  ui: () => ({})
});

export default RootReducer;
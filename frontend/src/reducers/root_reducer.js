import { combineReducers } from 'redux';

const RootReducer = combineReducers({
  entities: () => ({}),
  errors: () => ({}),
  session: () => ({}),
  ui: () => ({})
});

export default RootReducer;
import { combineReducers } from 'redux';

const EntitiesReducer = combineReducers({
  users: () => ({}),
  children: () => ({}),
  events: () => ({})
});

export default EntitiesReducer;
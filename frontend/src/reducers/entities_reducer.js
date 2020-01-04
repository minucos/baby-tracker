import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import ChildReducer from './child_reducer';
import EventReducer from './events_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  children: ChildReducer,
  events: EventReducer
});

export default EntitiesReducer;
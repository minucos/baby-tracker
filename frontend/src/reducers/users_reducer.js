import { RECEIVE_USERS } from '../actions/users_actions.js'
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions.js';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({},state,action.users);
    
    case RECEIVE_USER_LOGOUT:
    return {};

    default:
      return state;
  }
};

export default UsersReducer;
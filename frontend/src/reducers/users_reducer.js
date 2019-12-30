import { RECEIVE_USERS } from '../actions/users_actions.js'

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({},state,action.users);
    default:
      return state;
  }
};

export default UsersReducer;
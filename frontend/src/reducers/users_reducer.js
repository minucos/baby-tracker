import { RECEIVE_USERS, CLEAR_USERS } from '../actions/users_actions.js'
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions.js';
import { RECEIVE_CHILD, RECEIVE_CHILDREN } from '../actions/child_actions.js';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USERS:
      nextState = {};
      action.users.forEach(user => {
        nextState[user._id] = user
      })
      return nextState;
    
    case RECEIVE_CHILDREN:
      Object.values(action.children).forEach(child => {
        child.carers.forEach(carer => {
          nextState[carer._id] = carer;
        })
      })

      return nextState;

    case RECEIVE_CHILD:
      action.child.carers.forEach(carer => {
        nextState[carer._id] = carer;
      })

      return nextState;

    case CLEAR_USERS:
        return {};

    case RECEIVE_USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export default UsersReducer;
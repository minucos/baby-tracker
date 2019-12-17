import {} from '../actions/users_actions.js'

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({},state,action.user);
    default:
      return state;
  }
}
import * as UserAPIUtils from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const CLEAR_USERS = "CLEAR_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
})

export const clearUsers = () => ({
  type: CLEAR_USERS
})

export const searchUsers = searchTerm => dispatch => {
  return UserAPIUtils.searchUsers(searchTerm)
    .then(
      users => dispatch(receiveUsers(users.data)),
      errors => dispatch(receiveErrors(errors))
    )
};
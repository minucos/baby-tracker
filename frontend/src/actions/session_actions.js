import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = user => {
  return({
    type: RECEIVE_CURRENT_USER,
    user
  })
}

const receiveErrors = errors => {
  return({
    type: RECEIVE_SESSION_ERRORS,
    errors
  })
}

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user)
    .then( user => dispatch(receiveCurrentUser(user)) )
    .catch( err => dispatch(receiveErrors(err.response.data)) )
};

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user)
    .then( user => dispatch(receiveCurrentUser(user)) )
    .catch( err => dispatch(receiveErrors(err.response.data)) )
};


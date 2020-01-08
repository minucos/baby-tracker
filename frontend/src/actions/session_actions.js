import * as SessionAPIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

const receiveCurrentUser = user => {
  return({
    type: RECEIVE_CURRENT_USER,
    user
  })
}

const receiveUserLogout = () => ({
  type: RECEIVE_USER_LOGOUT,
});

const receiveErrors = (errors) => {
  return({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  })
}

export const clearErrors = () => ({
  type: CLEAR_SESSION_ERRORS
})

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  SessionAPIUtil.setAuthToken(false);
  dispatch(receiveUserLogout());
};

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      SessionAPIUtil.setAuthToken(token);

      const decodedUser = jwt_decode(token);
      dispatch(receiveCurrentUser(decodedUser));
    })
    .catch( err => dispatch(receiveErrors(err.response.data)) )
};

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user)
    .then( res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      SessionAPIUtil.setAuthToken(token);

      const decodedUser = jwt_decode(token);
      dispatch(receiveCurrentUser(decodedUser));
    })
    .catch( err => dispatch(receiveErrors(err.response.data)) )
};


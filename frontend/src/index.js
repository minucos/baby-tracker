import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../src/util/session_api_util';
import { logout } from './actions/session_actions';
import Root from './Root';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    };
  } else {
    store = configureStore({})
  };

  const root = document.getElementById('root');

  // testing
  window.store = store;
  // end testing

  ReactDOM.render(<Root store={store}/>, root);
});

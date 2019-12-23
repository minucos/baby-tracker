import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../src/util/session_api_util';
import Root from './Root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  // testing
  window.axios = axios;
  window.getState = store.getState;
  // end testing

  ReactDOM.render(<Root store={store}/>, root);
});

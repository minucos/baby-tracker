import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'; 
import App from './App.jsx';

const Root = ({store}) => (
  <Provider store={store} >
    <HashRouter>
      <App testProp='this is a test' />
    </HashRouter>
  </Provider>
);

export default Root;
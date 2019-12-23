import React from 'react';
import './stylesheets/App.scss'
import { AuthRoute, ProtectedRoute } from './util/route_utils';
import { Switch, Route, Redirect } from 'react-router';
import Navbar from './components/navbars/navbar';
import HomePage from './components/homepage';
import SignupFormContainer from './components/signup_login/signup_form_container';
import LoginFormContainer from './components/signup_login/login_form_container';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/login" component={LoginFormContainer} />
        <Route path="/signup" component={SignupFormContainer} />
        <Route path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;

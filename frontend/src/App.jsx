import React from 'react';
import './stylesheets/App.scss'
import { AuthRoute, ProtectedRoute } from './util/route_utils';
import { Switch, Redirect } from 'react-router-dom';
import Navbar from './components/navbars/navbar';
import HomePage from './components/homepage';
import SignupFormContainer from './components/signup_login/signup_form_container';
import LoginFormContainer from './components/signup_login/login_form_container';
import ChildShowContainer from './components/children/child_show';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer}/>
        <AuthRoute path="/signup" component={SignupFormContainer}/>
        <ProtectedRoute exact path="/child/:id" component={ChildShowContainer}/>
        <ProtectedRoute exact path="/" component={HomePage}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import './stylesheets/App.scss'
import { AuthRoute, ProtectedRoute } from './util/route_utils';
import { Switch, Redirect } from 'react-router-dom';
import ModalContainer from './components/modals/modal';
import Navbar from './components/navbars/navbar';
import HomePage from './components/homepage';
import SignupFormContainer from './components/signup_login/signup_form_container';
import LoginFormContainer from './components/signup_login/login_form_container';
import ChildShowContainer from './components/children/child_show';
import NewChildContainer from './components/children/new_child_form';
import EventsIndexContainer from './components/events/events_index';

function App() {
  return (
    <div className="App">
      <ModalContainer />
      <Navbar/>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer}/>
        <AuthRoute path="/signup" component={SignupFormContainer}/>
        <ProtectedRoute exact path="/child/new" component={NewChildContainer}/>
        <ProtectedRoute exact path="/child/:id" component={ChildShowContainer}/>
        <ProtectedRoute exact path="/child/:id/events" component={EventsIndexContainer}/>
        <ProtectedRoute exact path="/" component={HomePage}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;

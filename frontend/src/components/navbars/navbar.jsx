import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faBars } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../actions/session_actions';

const Navbar = (props) => {
  let { loggedIn, logout, user } = props;

  let options = [
    <Link key='1' to="/signup"><li>Register</li></Link>,
    <Link key='2' to="/login"><li>Login</li></Link>
  ]
  
  if (loggedIn) {
  options = [
    <li key='1'>{user.fName} {user.lName}</li>,
    <Link key='2' to="/child/new"><li>Add Child</li></Link>,
    <li key='3' onClick={() => logout()}>Logout</li>
  ];
  } 

  return(
    <div className="navbar">
      <div className="leftbar">
        <Link to="/"><FontAwesomeIcon icon={faBaby}/></Link> 
        
      </div>
      <div className="center">
        Baby Tracker
      </div>
      <div className="rightbar">
        <FontAwesomeIcon icon={faBars}/>
        <ul className="dropdown">
          {options}
        </ul>
      </div>
    </div>
  )
}

const MSP = state => {
  return({
    loggedIn: state.session.isAuthenticated,
    user: state.session.user
  })
}

const MDP = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(MSP, MDP)(Navbar);
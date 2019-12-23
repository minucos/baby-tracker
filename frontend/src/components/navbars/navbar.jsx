import React from 'react';
import { Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
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
          <Link to="/signup"><li>Register</li></Link>
          <Link to="/login"><li>Login</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
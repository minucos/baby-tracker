import React from 'react';

const Navbar = (props) => {
  return(
    <div className="navbar">
      <div className="rightbar">

      </div>
      <div className="leftbar">
        <ul className="dropdown">
          <li>Register</li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
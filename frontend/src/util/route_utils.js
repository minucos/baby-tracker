import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return { loggedIn: state.session.isAuthenticated };
};

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={(props) => {
      if (!loggedIn) {
        return (<Component {...props} />)
      } else {
        return (<Redirect to="/" />)
      }
    }
    }
    />
  );
}

const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return(
    <Route path={path} exact={exact} render={(props) => {
          if (loggedIn) {
            return(<Component {...props} />)
          } else {
            return (<Redirect to="/login" />)
          }
        }
      }
    />
  );
}


export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
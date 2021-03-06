import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Login from './login_form';

const mDTP = dispatch => ({
  login: (user) => dispatch(login(user))
})

export default connect(null, mDTP)(Login);
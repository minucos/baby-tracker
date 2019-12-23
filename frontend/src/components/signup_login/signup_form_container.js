import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignUp from './signup_form';

const mDTP = dispatch => ({
  signup: (user) => dispatch(signup(user))
})

export default connect(null, mDTP)(SignUp);
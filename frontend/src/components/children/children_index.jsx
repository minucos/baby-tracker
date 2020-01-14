import React from 'react';
import { connect } from 'react-redux';
import { fetchChildren } from '../../actions/child_actions';
import ChildContainer from './child_show';
 
class ChildIndex extends React.Component {

  componentDidMount() {
    this.props.fetchChildren(this.props.currentUser.id);
  }


  render() {
    let { children } = this.props;
    
    if (!children) return null;

    let indexItems = Object.values(children).map( child => (
      <ChildContainer
        key={child._id}
        child={child}
      />
    ))

    return(
      <ul>
        {indexItems}
      </ul>
    )
  }
}

const MSP = state => ({
  children: state.entities.children,
  users: state.entities.users,
  currentUser: state.session.user
});

const MDP = dispatch => ({
  fetchChildren: (id) => dispatch(fetchChildren(id))
})

export default connect(MSP, MDP)(ChildIndex);
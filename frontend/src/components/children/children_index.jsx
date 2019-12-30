import React from 'react';
import { connect } from 'react-redux';
import { fetchChildren } from '../../actions/child_actions';

class ChildIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchChildren(this.props.currentUser.id);
  }

  render() {
    if (!this.props.currentUser) return null;

    return(
      <div>
        This is the Child Index
      </div>
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
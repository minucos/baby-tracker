import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchChildren } from '../actions/child_actions';
import ChildIndexContainer from './children/children_index';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.props.fetchChildren(this.props.userId)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) return null;
    
    let { children } = this.props;
    let childCount = Object.keys(children).length;

    switch (childCount) {
    case 0:
      return(
        <Redirect to="/child/new" />
      )
    // case 1:
      
    default:
      return(
        <div>
          <ChildIndexContainer />
        </div>
      );
    };
  };
};

const MSP = state => ({
  children: state.entities.children,
  userId: state.session.user.id
});

const MDP = dispatch => ({
  fetchChildren: (id) => dispatch(fetchChildren(id))
})

export default connect(MSP,MDP)(HomePage);
import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { fetchAllEvents } from '../../actions/event_actions';
import { openModal } from '../../actions/modal_actions';

class EventsIndex extends React.Component {
  componentDidMount() {
    let { userId, childId } = this.props;
    this.props.fetchChild(userId, childId);
    this.props.fetchAllEvents(userId, childId);
  }



  render() {
    return(
      <div>
        <h1>THIS IS THE EVENTS INDEX PAGE</h1>
      </div>
    )
  }
}

const MSP = (state, ownProps) => {
  let childId = ownProps.match.params.id;
  return ({
    child: state.entities.children[childId],
    userId: state.session.user.id,
    events: Object.values(state.entities.events),
    childId
  })
};

const MDP = dispatch => ({
  fetchChild: (userId, childId) => dispatch(fetchChild(userId, childId)),
  fetchAllEvents: (userId, childId) => dispatch(fetchAllEvents(userId, childId)),
  openModal: (modal) => dispatch(openModal(modal))
})

export default connect(MSP,MDP)(EventsIndex);
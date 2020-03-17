import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { openModal } from '../../actions/ui_actions';
import { fetchAllEvents, clearEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faUtensils, faBed } from '@fortawesome/free-solid-svg-icons';
import { filterEvents, calcTime, applyOffset } from '../../reducers/selectors';

class EventStats extends React.Component {
  componentDidMount() {
    let { userId, childId, fetchChild, fetchAllEvents } = this.props;
    fetchChild(userId, childId);
    fetchAllEvents({ userId, childId })
      .then(() => this.setState({ loading: false }));
  }

  render() {
    return(
      <div className="event-stats">
        
      </div>
    )
  }
};

const MSP = (state, ownProps) => {
  let childId = ownProps.match.params.id;

  return ({
    child: state.entities.children[childId],
    userId: state.session.user.id,
    feeds: filterEvents(state, 'feed', childId),
    changes: filterEvents(state, 'change', childId),
    sleeps: filterEvents(state, 'sleep', childId),
    childId
  })
};

const MDP = dispatch => ({
  fetchChild: (userId, childId) => dispatch(fetchChild(userId, childId)),
  fetchAllEvents: (payload) => dispatch(fetchAllEvents(payload)),
  openModal: (modal, childId) => dispatch(openModal(modal, childId)),
  clearEvents: () => dispatch(clearEvents())
})

export default connect(MSP,MDP)(EventStats);
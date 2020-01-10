import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { fetchAllEvents } from '../../actions/event_actions';
import { openModal } from '../../actions/modal_actions';
import { sortEvents } from '../../reducers/selectors';
import EventIndexItem from './event_index_item';

class EventsIndex extends React.Component {
  componentDidMount() {
    let { userId, childId } = this.props;
    this.props.fetchChild(userId, childId);
    this.props.fetchAllEvents(userId, childId);
  }

  render() {
    let { events, child } = this.props;

    if (!child) return null;

    let allEvents = events.map(event => {
      return(
        <EventIndexItem event={event} key={event._id} carers={child.carers}/>
      )
    })

    return(
      <ul className="event-index">
        {allEvents}
      </ul>
    )
  }
}

const MSP = (state, ownProps) => {
  let childId = ownProps.match.params.id;
  return ({
    child: state.entities.children[childId],
    userId: state.session.user.id,
    events: sortEvents(state),
    childId
  })
};

const MDP = dispatch => ({
  fetchChild: (userId, childId) => dispatch(fetchChild(userId, childId)),
  fetchAllEvents: (userId, childId) => dispatch(fetchAllEvents(userId, childId)),
  openModal: (modal) => dispatch(openModal(modal))
})

export default connect(MSP,MDP)(EventsIndex);
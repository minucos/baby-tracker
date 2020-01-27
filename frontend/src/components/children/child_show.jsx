import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChild } from '../../actions/child_actions';
import { openModal } from '../../actions/ui_actions';
import { fetchAllEvents, clearEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { filterEvents, calcTime, applyOffset } from '../../reducers/selectors';

class Child extends React.Component {


  componentDidMount() {
    let { userId,childId } = this.props;
    this.props.fetchChild(userId,childId);
    this.props.fetchAllEvents({userId,childId});
  }

  componentWillUnmount() {
    this.props.clearEvents();
  }

  calcAge() {
    let { child } = this.props;
    let diff = ((Date.now() - new Date(child.dob)) / 86400000 / 365).toFixed(1);

    if (diff < 1) {
      return `${Math.round(12 * diff)} months`;
    }

    return `${diff} years`;
  }

  calcTimeAgo(type) {
    let events = this.props[type];

    if (events.length === 0) return "";
    
    let eventDate;
    if (type === 'changes') {
      eventDate = events[0].eventDetails.startTime;
    } else {
      eventDate = events[0].eventDetails.endTime;
    }

    return(
      <div>
        {calcTime(eventDate).toFixed(1)} hrs
      </div>
    ) 
  }

  calcDailyTotal(type) {
    let events = this.props[type];
    let today = new Date().toLocaleDateString();
    console.log(today)

    return events.filter(event => {
      return new Date(event.startTime).toLocaleDateString() === today
    }).length;
  }

  render() {
    let { child,
          childId,
          openModal
        } = this.props;

    if (!child) return null;

    return(
      <div className="child-show">
        <div className="profile-pic">
          <FontAwesomeIcon icon={faBaby} />
        </div>
        <div className="child-details">
          <h1>{child.name}</h1>
          <h2>({this.calcAge()})</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th className="first-col">Event</th>
              <th>Since Last</th>
              <th>Daily Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="first-col">Feed</td>
              <td>{this.calcTimeAgo('feeds')}</td>
              <td>{this.calcDailyTotal('feeds')}</td>
            </tr>
            <tr>
              <td className="first-col">Change</td>
              <td>{this.calcTimeAgo('changes')}</td>
              <td>{this.calcDailyTotal('changes')}</td>
            </tr>
          </tbody>
        </table>
        <h3>Log Event:</h3>
        <ul className='event-options'>
          <li onClick={() => openModal('feed',childId)}>Feed</li>
          <li onClick={() => openModal('change',childId)}>Change</li>
          <li onClick={() => openModal('sleep',childId)}>Sleep</li>
        </ul>
        <Link to={`/child/${childId}/events`}>See All Events</Link>
      </div>
    )
  }
}

const MSP = (state, ownProps) => {
  // let childId = ownProps.match.params.id;

  return({
    child: ownProps.child,
    userId: state.session.user.id,
    feeds: filterEvents(state, 'feed'),
    changes: filterEvents(state, 'change'),
    sleeps: filterEvents(state, 'sleep'),
    childId: ownProps.child._id
  })
};

const MDP = dispatch => ({
  fetchChild: (userId,childId) => dispatch(fetchChild(userId,childId)),
  fetchAllEvents: (payload) => dispatch(fetchAllEvents(payload)),
  openModal: (modal,childId) => dispatch(openModal(modal,childId)),
  clearEvents: () => dispatch(clearEvents())
})

export default connect(MSP,MDP)(Child);
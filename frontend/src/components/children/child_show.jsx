import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChild } from '../../actions/child_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchAllEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { filterEvents } from '../../reducers/selectors';

class Child extends React.Component {


  componentDidMount() {
    let { userId,childId } = this.props;
    this.props.fetchChild(userId,childId);
    this.props.fetchAllEvents(userId,childId);
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
      eventDate = events[events.length - 1].eventDetails.startTime;
    } else {
      eventDate = events[events.length - 1].eventDetails.endTime;
    }

    let time = ((Date.now() - new Date(eventDate)) / (1000 * 60 * 60));

    return(
      <div>
        {time.toFixed(1)} hrs
      </div>
    ) 
  }

  render() {
    let { child,
          userId,
          childId,
          openModal
        } = this.props;

    if (!child) return null;

    let carers = child.carers.filter(carer => carer._id !== userId);
    carers = carers.map(carer => {
      return(
        <li key={carer._id}>{carer.fName} {carer.lName}</li>
      )
    })
    
    return(
      <div className="child-show">
        <div className="profile-pic">
          <FontAwesomeIcon icon={faBaby} />
        </div>
        <div className="child-details">
          <h1>{child.name}</h1>
          <h2>({this.calcAge()})</h2>
        </div>
        <h3>Time since last</h3>
        <div className="stats">
          <div className="stat-details">
            <div>Feed:</div>
            {this.calcTimeAgo('feeds')}
          </div>
          <div className="stat-details">
            <div>Change:</div>
            {this.calcTimeAgo('changes')}
          </div>
          <div className="stat-details">
            <div>Sleep:</div>
            {this.calcTimeAgo('sleeps')}
          </div>
        </div>
        <h3>Log Event:</h3>
        <ul className='event-options'>
          <li onClick={() => openModal('feed')}>Feed</li>
          <li onClick={() => openModal('change')}>Change</li>
          <li onClick={() => openModal('sleep')}>Sleep</li>
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
  fetchAllEvents: (userId,childId) => dispatch(fetchAllEvents(userId,childId)),
  openModal: (modal) => dispatch(openModal(modal))
})

export default connect(MSP,MDP)(Child);
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChild, deleteChild } from '../../actions/child_actions';
import { openModal } from '../../actions/ui_actions';
import { fetchAllEvents, clearEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBaby, faSyncAlt, faTrashAlt, faUsers 
} from '@fortawesome/free-solid-svg-icons';
import { filterEvents, calcTime, applyOffset } from '../../reducers/selectors';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.refreshPage = this.refreshPage.bind(this);
  }

  componentDidMount() {
    let { userId,childId, fetchChild, fetchAllEvents } = this.props;
    fetchChild(userId,childId);
    fetchAllEvents({userId,childId})
      .then(() => this.setState({ loading: false }));
  }

  refreshPage() {
    let { userId, childId } = this.props;
    this.setState(
      { loading: true },
      () => setTimeout(() => {
        this.props.fetchAllEvents({ userId, childId })
          .then(() => this.setState({ loading: false }))
      }, 500)
    )
  }

  componentWillUnmount() {
    this.props.clearEvents();
  }

  calcAge() {
    let { child } = this.props;
    let diff = ((Date.now() - new Date(child.dob)) / 86400000 / 365);

    if (diff < 1) {
      let age = Math.floor(12 * diff)

      if (age === 0) {
        return `${Math.floor(52 * diff)} weeks`;
      } else {
        return `${age} months`;
      }
    }

    return `${diff.toFixed(1)} years`;
  }

  calcTimeAgo(type) {
    let events = this.props[type];

    if (events.length === 0) return "";
  
    let eventDate = events[0].eventDetails.startTime;

    return(
      <div>
        {calcTime(eventDate).toFixed(1)} hrs
      </div>
    ) 
  }

  calcDailyTotal(type) {
    let events = this.props[type];
    let date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    let today = date.toISOString().split('T')[0];

    return events.filter(event => {
      return event.startTime.split('T')[0] === today
    }).length;
  }

  calcContentsTotal(type) {
    let events = this.props['changes'];
    let date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    let today = date.toISOString().split('T')[0];

    return events.filter(event => {
      let includesType = event.eventDetails.contents.includes(type)
      let isToday = event.startTime.split('T')[0] === today;
      return  isToday && includesType;
    }).length;
  }

  deleteButton() {
    const { childId, openModal } = this.props;
    return(
      <div onClick={(e) => {
        e.stopPropagation();
        openModal('deleteChild', childId);
      }}
      >
        <FontAwesomeIcon className='refresh' icon={faTrashAlt} />
      </div>
    )
  }

  inviteButton() {
    const { childId, openModal } = this.props;
    return(
      <div onClick={(e) => {
        e.stopPropagation();
        openModal('inviteCarer', childId);
      }}
      >
        <FontAwesomeIcon className='refresh' icon={faUsers} />
      </div>
    )
  }

  render() {
    let { child,
          childId,
          openModal
        } = this.props;
    let { loading } = this.state;
    if (!child) return null;

    return(
      <div className="child-show">
        <div className="icons">
          <FontAwesomeIcon
            className="refresh"
            icon={faSyncAlt}
            onClick={this.refreshPage}
            spin={loading ? true : false}
          />
          {this.deleteButton()}
          {this.inviteButton()}
        </div>
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
              <td className="first-col">Feeds</td>
              <td>{this.calcTimeAgo('feeds')}</td>
              <td>{this.calcDailyTotal('feeds')}</td>
            </tr>
            <tr className="changes-row">
              <td className="first-col">Changes</td>
              <td>{this.calcTimeAgo('changes')}</td>
              <td>
                <div>{this.calcDailyTotal('changes')}</div>
              </td>
            </tr>
            <tr className="contents-row">
              <td></td>
              <td></td>
              <td>
                ({this.calcContentsTotal('poo')} poos, {this.calcContentsTotal('pee')} pees)
              </td>
            </tr>
          </tbody>
        </table>
        <h3>Log Event:</h3>
        <ul className='event-options'>
          <li onClick={() => openModal('feed',childId)}>Feed</li>
          <li onClick={() => openModal('change',childId)}>Change</li>
          <li onClick={() => openModal('sleep',childId)}>Sleep</li>
        </ul>
        <div className="links">
          <Link to={`/child/${childId}/stats`}>Statistics</Link>
          <Link to={`/child/${childId}/events`}>All Events</Link>
        </div>
      </div>
    )
  }
}

const MSP = (state, ownProps) => {

  return({
    child: ownProps.child,
    userId: state.session.user.id,
    feeds: filterEvents(state, 'feed', ownProps.child._id),
    changes: filterEvents(state, 'change', ownProps.child._id),
    sleeps: filterEvents(state, 'sleep', ownProps.child._id),
    childId: ownProps.child._id
  })
};

const MDP = dispatch => ({
  fetchChild: (userId,childId) => dispatch(fetchChild(userId,childId)),
  deleteChild: (userId,childId) => dispatch(deleteChild(userId,childId)),
  fetchAllEvents: (payload) => dispatch(fetchAllEvents(payload)),
  openModal: (modal,childId) => dispatch(openModal(modal,childId)),
  clearEvents: () => dispatch(clearEvents())
})

export default connect(MSP,MDP)(Child);
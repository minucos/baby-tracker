import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { fetchFilteredEvents } from '../../actions/event_actions';
import { openModal } from '../../actions/ui_actions';
import { sortEvents } from '../../reducers/selectors';
import EventIndexItem from './event_index_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faForward, faBackward, faSpinner } from '@fortawesome/free-solid-svg-icons';

class EventsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      filter: ''
    }
  }

  componentDidMount() {
    let { userId, childId } = this.props;
    let { page, limit, filter } = this.state;

    this.props.fetchChild(userId, childId);
    this.props.fetchFilteredEvents({userId, childId,page,limit,filter});
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.filter !== this.state.filter) {
      let { userId, childId } = this.props;
      let { page, limit, filter } = this.state;
      this.props.fetchFilteredEvents({userId, childId,page,limit,filter});
    }
  }

  revealOptions(e) {
    e.currentTarget.classList.toggle('show');
  }

  applyFilter(filter) {
    return (e) => {
      filter = filter === this.state.filter ? '' : filter;
      this.setState({
        filter: filter
      })
    }
  }

  render() {
    let { events, child } = this.props;
    let { filter } = this.state;

    if (events.length === 0) {
      return(
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )
    };

    let allEvents = events.map(event => {
      return(
        <EventIndexItem event={event} key={event._id} carers={child.carers}/>
      )
    })

    return(
      <div>
        <ul className="event-index">
          {allEvents}
        </ul>
        <div className='pages'>
          <div className='page-turn'><FontAwesomeIcon icon={faBackward}/></div>
          <div className='page-turn'><FontAwesomeIcon icon={faForward}/></div>
        </div>
        <div className='filter-container' onClick={this.revealOptions}>
          <div>
            <FontAwesomeIcon icon={faMinus}/>
          </div>
          <ul>
            <li 
              onClick={this.applyFilter('feed')}
              className={ filter === 'feed' ? 'selected' : ''}
            >
                Feed
            </li>
            <li 
              onClick={this.applyFilter('change')}
              className={ filter === 'change' ? 'selected' : ''}
            >
                Change
            </li>
            <li 
              onClick={this.applyFilter('sleep')}
              className={ filter === 'sleep' ? 'selected' : ''}
            >
                Sleep
            </li>
          </ul>
        </div>
      </div>
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
  fetchFilteredEvents: (payload) => dispatch(fetchFilteredEvents(payload)),
  openModal: (modal) => dispatch(openModal(modal))
})

export default connect(MSP,MDP)(EventsIndex);
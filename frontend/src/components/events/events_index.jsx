import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { deleteEvent } from '../../actions/event_actions';
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
    let { filter, page, limit } = this.state;
    if (prevState.filter !== filter || prevState.page !== page ) {
      let { userId, childId } = this.props;
      this.props.fetchFilteredEvents({userId, childId,page,limit,filter})
        .then(() => {
          if (prevState.filter !== filter ) {
            this.setState({
            page: 0
            })
          }
        });
    }
  }

  revealOptions(e) {
    e.currentTarget.parentElement.classList.toggle('show');
  }

  applyFilter(filter) {
    return (e) => {
      filter = filter === this.state.filter ? '' : filter;
      this.setState({
        filter: filter
      })
    }
  }

  turnPage(n) {
    let nextPage = this.state.page + n;

    this.setState({
      page: nextPage
    })
  }

  render() {
    let { events, child, totalEvents, childId, userId, deleteEvent } = this.props;
    let { filter, page, limit } = this.state;
    let lastPage = totalEvents === (page+1) * limit || events.length < limit;
    if (events.length === 0) {
      return(
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )
    };

    let allEvents = events.map(event => {
      return(
        <EventIndexItem 
          key={event._id} 
          event={event} 
          carers={child.carers}
          userId={userId}
          childId={childId}
          deleteEvent={deleteEvent}
        />
      )
    })

    return(
      <div>
        <ul className="event-index">
          {allEvents}
        </ul>
        <div className='pages'>
          <div 
            className={page === 0 ? 'page-turn disabled' : 'page-turn'}
            onClick={page === 0 ? null : () => this.turnPage(-1)}
          >
            <FontAwesomeIcon icon={faBackward}/>
            <span>prev</span>
          </div>
          <div 
            className={lastPage ? 'page-turn disabled' : 'page-turn'}
            onClick={lastPage? null : () => this.turnPage(1)}
          >
            <span>next</span>
            <FontAwesomeIcon icon={faForward}/>
          </div>
        </div>
        <div className='filter-container'>
          <div onClick={this.revealOptions}>
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
    totalEvents: state.ui.count,
    childId
  })
};

const MDP = dispatch => ({
  fetchChild: (userId, childId) => dispatch(fetchChild(userId, childId)),
  fetchFilteredEvents: (payload) => dispatch(fetchFilteredEvents(payload)),
  openModal: (modal) => dispatch(openModal(modal)),
  deleteEvent: (userId, childId, eventId) => dispatch(deleteEvent(userId, childId, eventId))
})

export default connect(MSP,MDP)(EventsIndex);
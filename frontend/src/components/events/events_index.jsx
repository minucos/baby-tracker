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
    let { filter, page, limit } = this.state;
    if (prevState.filter !== filter || prevState.page !== page ) {
      let { userId, childId } = this.props;
      this.props.fetchFilteredEvents({userId, childId,page,limit,filter});
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
    if ( n > 0 && this.props.events.length < this.state.limit) return null;

    let page = this.state.page + n;
    page = page < 0 ? 0 : page;
    this.setState({
      page: page
    })
  }

  render() {
    let { events, child, totalEvents } = this.props;
    let { filter, page, limit } = this.state;

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
          <div 
            className={page === 0 ? 'page-turn disabled' : 'page-turn'}
            onClick={() => this.turnPage(-1)}
          >
            <FontAwesomeIcon icon={faBackward}/>
            <span>prev</span>
          </div>
          <div 
            className={events.length < limit ? 'page-turn disabled' : 'page-turn'}
            onClick={() => this.turnPage(1)}
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
  openModal: (modal) => dispatch(openModal(modal))
})

export default connect(MSP,MDP)(EventsIndex);
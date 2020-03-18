import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { openModal } from '../../actions/ui_actions';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend
} from 'recharts';
import { fetchAllEvents, clearEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faUtensils, faBed } from '@fortawesome/free-solid-svg-icons';
import { 
  countEvents,
  eventsByWeek,
  eventsByMonth,
  eventsByYear
} from '../../reducers/selectors';

class EventStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      range: 'week',
      date: new Date()
    }
  }

  componentDidMount() {
    let { userId, childId, fetchChild, fetchAllEvents } = this.props;
    fetchChild(userId, childId);
    fetchAllEvents({ userId, childId })
      .then(() => this.setState({ loading: false }));
  }

  eventData() {
    let { range, date } = this.state;
    let { events } = this.props

    switch (range) {
      case 'month':
        return eventsByMonth(events,date)
      case 'year':
        return eventsByYear(events,date)
      default:
      return eventsByWeek(events,date)
    }
  }

  render() {
    let { events } = this.props;

    return(
      <div className="event-stats">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart 
            data={events}
            margin={{ top: 25, right: 0, left: -25, bottom: 0 }}
          >
            <Bar dataKey="feed" fill="#006d9c"/>
            <Bar dataKey="change" fill="#fea02f"/>
            <XAxis dataKey="date" stroke="#728088"/>
            <YAxis allowDecimals={false} stroke="#728088"/>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
};

const MSP = (state, ownProps) => {
  let childId = ownProps.match.params.id;

  return ({
    child: state.entities.children[childId],
    userId: state.session.user.id,
    events: countEvents(state.entities.events),
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
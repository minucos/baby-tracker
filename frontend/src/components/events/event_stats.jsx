import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { openModal } from '../../actions/ui_actions';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, Brush, ReferenceLine, Label
} from 'recharts';
import { fetchAllEvents, clearEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faUtensils, faBed, faSpinner 
} from '@fortawesome/free-solid-svg-icons';
import { countEvents, eventsByRange } from '../../reducers/selectors';

const RANGES = {
  'week': 7,
  'month': 30,
  'year': 365
}
class EventStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      range: 'week',
      date: new Date(),
      loading: true
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

    return eventsByRange(events,RANGES[range],date)
  }

  avgEvent(type) {
    let counts = this.eventData().map(event => event[type]);
    return counts.reduce((acc,el) => acc + el) / counts.length;
  }

  updateRange(newRange, e) {
    this.setState({
      range: newRange
    })
  }

  brush() {
    switch (this.state.range) {
      case 'year':
        return(
          <Brush dataKey='date' height={30} stroke="#8884d8" endIndex={30} />
        );
      default:
        return null;
    }
  }

  render() {
    let { loading, range } = this.state;
    if (loading) {
      return (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )
    };

    return(
      <div className="event-stats">
        <ResponsiveContainer width="95%" height={500}>
          <BarChart 
            data={this.eventData()}
            margin={{ top: 25, right: 0, left: -25, bottom: 0 }}
          >
            <Bar dataKey="feed" fill="#006d9c"/>
            <Bar dataKey="change" fill="#fea02f"/>
            <XAxis dataKey="date" stroke="#728088"/>
            <YAxis allowDecimals={false} stroke="#728088"/>
            {this.brush()}
            <Legend stroke="#728088" formatter={(value) => {
              return <span style={{ color: '#728088' }}>{value}</span>
            }}/>
            <ReferenceLine 
              y={this.avgEvent('feed')} 
              stroke="#006d9c"
              strokeDasharray="5"
            />
            <ReferenceLine 
              y={this.avgEvent('change')} 
              stroke="#fea02f"
              strokeDasharray="5"
            />
          </BarChart>
        </ResponsiveContainer>
        <ul className="range-buttons">
          <li
            className={ range === 'week' ? 'selected' : null}
            onClick={() => this.updateRange("week")}>
              Week
          </li>
          <li
            className={ range === 'month' ? 'selected' : null}
          onClick={() => this.updateRange("month")}
          >
            Month
          </li>
          <li
            className={ range === 'year' ? 'selected' : null}
          onClick={() => this.updateRange("year")}
          >
            Year
          </li>
        </ul>
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
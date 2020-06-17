import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { openModal } from '../../actions/ui_actions';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, Brush, ReferenceLine, Label
} from 'recharts';
import { fetchCompleteEvents, clearEvents } from '../../actions/event_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faUtensils, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { countEvents, eventsByRange, eventsByRange2, countByUser } from '../../reducers/selectors';

const RANGES = {
  'week': 7,
  'month': 30,
  'year': 365
};

class EventStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      range: 'week',
      date: new Date(),
      loading: true,
      chartHeight: window.innerHeight - 170,
      currHeight: window.innerHeight
    }
  }

  componentDidMount() {
    let { userId, childId, fetchChild, fetchCompleteEvents } = this.props;
    fetchChild(userId, childId);
    fetchCompleteEvents({ userId, childId })
      .then(() => this.setState({ loading: false }));
  }

  eventData() {
    let { range, date } = this.state;
    let { eventCount } = this.props

    return eventsByRange(eventCount,RANGES[range],date)
  }

  carerData() {
    let { range, date } = this.state;
    let { events } = this.props

    return eventsByRange2(events, RANGES[range], date);
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
          <Brush dataKey='date' height={30} stroke="#002f44" endIndex={30} />
        );
      default:
        return null;
    }
  }

  carerStats() {
    let events = this.carerData();

    return countByUser(events, this.props.users).map(carer => {
      let { user } = carer;

      return(
        <tr>
            <td>{user.fName}</td>
            <td>{carer.feed}</td>
            <td>{carer.change}</td>
        </tr>
      )
    });
  }

  render() {
    let { loading, range, chartHeight } = this.state;
    if (loading) {
      return (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )
    };

    return(
      <div className="event-stats">
        <ResponsiveContainer width="95%" height={chartHeight} >
          <BarChart 
            data={this.eventData()}
            margin={{ top: 25, right: 0, left: -25, bottom: 0 }}
            barGap={0}
            barCategoryGap="5%"

          >
            <Bar dataKey="feed" fill="#006d9c"/>
            <Bar dataKey="change" fill="#fea02f"/>
            <XAxis 
              dataKey="date" 
              stroke="#728088" 
            />
            <YAxis allowDecimals={false} stroke="#728088" interval={0} />
            {this.brush()}
            <Legend stroke="#728088" formatter={(value) => {
              return <span style={{ color: '#728088' }}>{value}</span>
            }}/>
            <ReferenceLine 
              y={this.avgEvent('feed')} 
              stroke="#024564"
              strokeWidth={3}
              strokeDasharray="5"
            />
            <ReferenceLine 
              y={this.avgEvent('change')} 
              stroke="#ad6b1b"
              strokeWidth={3}
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
          <h3>Carer Stats</h3>  
          <table>
            <tr>
              <th></th>
              <th><FontAwesomeIcon icon={faUtensils} /></th>
              <th><FontAwesomeIcon icon={faBaby} rotation={90} /></th>
            </tr>
            {this.carerStats()}
          </table>
      </div>
    )
  }
};

const MSP = (state, ownProps) => {
  let childId = ownProps.match.params.id;
  let { events, users } = state.entities;

  return ({
    child: state.entities.children[childId],
    userId: state.session.user.id,
    eventCount: countEvents(events),
    events: Object.values(events),
    users,
    childId
  })
};

const MDP = dispatch => ({
  fetchChild: (userId, childId) => dispatch(fetchChild(userId, childId)),
  fetchCompleteEvents: (payload) => dispatch(fetchCompleteEvents(payload)),
  openModal: (modal, childId) => dispatch(openModal(modal, childId)),
  clearEvents: () => dispatch(clearEvents())
})

export default connect(MSP,MDP)(EventStats);
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { createEvent } from '../../actions/event_actions';
import { selectCarers } from '../../reducers/selectors';

class FeedForm extends React.Component {
  constructor(props) {
    super(props);
    let startDate = Date.now();
    let endDate = startDate + (60000 * 30);
    this.state = {
      eventType: 'feed',
      foodFrom: '',
      foodType: '',
      options: [],
      notes: '',
      fedBy: this.props.user,
      startTime: this.formatDate(new Date(startDate)),
      endTime: this.formatDate(new Date(endDate)),
    };
    this.fromOptions = ['breast','bottle','other'];
    this.typeOptions = ['milk','formula','solids'];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {
      e.preventDefault();
      console.log(e.target.value)

      this.setState({
        [field]: e.target.value
      })
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let { userId, childId } = this.props;
    let feed = this.state;
    feed.fedBy = feed.fedBy.id;
    this.props.createFeed(userId,childId,feed);
  }

  formatDate(date) {
    let day = date.getDate();
    let month = (parseInt(date.getMonth()) + 1).toString();
    let year = date.getFullYear();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hrs = hrs < 10 ? '0' + hrs : hrs;
    mins = mins < 10 ? '0' + mins : mins;

    return `${year}-${month}-${day}T${hrs}:${mins}`;
  }

  foodFromOptions() {
    let { foodFrom } = this.state;
    return this.fromOptions.map((option,idx) => (
      <button
        key={idx}
        onClick={this.updateField('foodFrom')}
        value={option}
        className={ option === foodFrom ? 'selected' : '' }
      >
        {option[0].toUpperCase() + option.slice(1)}
      </button>
    ))
  }

  foodTypeOptions() {
    let { foodType } = this.state;
    return this.typeOptions.map((option,idx) => (
      <button
        key={idx}
        onClick={this.updateField('foodType')}
        value={option}
        className={ option === foodType ? 'selected' : '' }
      >
        {option[0].toUpperCase() + option.slice(1)}
      </button>
    ))
  }

  showList(e) {
    e.currentTarget.firstElementChild.classList.add('displayed');
  }

  hideList(e) {
    e.currentTarget.classList.remove('displayed');
  }

  carers() {
    return this.props.carers.map((carer,idx) =>(
      <li key={idx} value={carer._id}>
        {carer.fName} {carer.lName}
      </li>
    ))
  }

  render() {
    let { 
      notes,
      fedBy,
      startTime,
      endTime
    } = this.state;
    let { child, closeModal } = this.props;

    if (!child) return null;

    return(
      <div className="modal-container" onClick={closeModal}>
        <div className="form" onClick={(e) => e.stopPropagation()}>
          <div className="form-header">
            How did you feed {child.name}?
          </div>
          <div className="form-options">
            {this.foodFromOptions()}
          </div>
          <div className="form-header">
            What did {child.name} eat?
          </div>
          <div className="form-options">
            {this.foodTypeOptions()}
          </div>
          <div className="form-header">
            Who fed {child.name}?
          </div>
          <div 
            className='dropdown' 
            onChange={this.updateField('fedBy')}
            onClick={this.showList}
          >
            {fedBy.fName} {fedBy.lName}
            <ul  
              onClick={this.hideList}
            >
              {this.carers()}
            </ul>
          </div>
          <div className="form-header">
            Any other notes?
          </div>
          <textarea 
            type="text" 
            value={notes}
            placeholder="Add Notes..." 
            onChange={this.updateField('notes')}
          />
          <div className="time-header">
            <span>Start</span>
            <input 
              type="datetime-local"
              value={startTime}
              onChange={this.updateField('startTime')}
            />
          </div>
          <div className="time-header">
            <span>End</span>
            <input 
              type="datetime-local"
              value={endTime}
              onChange={this.updateField('endTime')}
              min={startTime}
            />
          </div>
          <button 
            className="submit-button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
};

const MSP = (state,ownProps) => {
  let childId = ownProps.location.pathname.split('/').reverse()[0];

  return ({
    userId: state.session.user.id,
    child: state.entities.children[childId],
    user: state.session.user,
    carers: selectCarers(state),
    childId
  })
}


const MDP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createFeed: (userId, childId, feed) => dispatch(createEvent(userId, childId,feed))
});

export default withRouter(connect(MSP,MDP)(FeedForm));
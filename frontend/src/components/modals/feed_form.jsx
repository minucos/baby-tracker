import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/ui_actions';
import { createEvent } from '../../actions/event_actions';
import { selectCarers } from '../../reducers/selectors';

class FeedForm extends React.Component {
  constructor(props) {
    super(props);
    let endDate = Date.now();
    let startDate = endDate - (60000 * 30);
    this.state = {
      eventType: 'feed',
      foodFrom: '',
      foodType: '',
      startingSide: 'n/a',
      notes: '',
      fedBy: this.props.user.id,
      startTime: this.formatLocalDate(new Date(startDate)),
      endTime: this.formatLocalDate(new Date(endDate)),
    };
    this.fromOptions = ['breast','bottle','other'];
    this.typeOptions = ['milk','formula','solids'];
    this.sideOptions = ['left', 'right'];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {

      let value = e.target.value;
      if (field === 'foodFrom' && value !== this.state.foodFrom) {
        this.setState({
          [field]: value,
          startingSide: 'n/a',
          foodType: ''
        })
      } else if (field === 'fedBy') {
        this.setState({
          [field]: e.target.dataset["value"]
        })
      } else {
        this.setState({
          [field]: value
        })
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let { userId, childId } = this.props;
    let feed = this.state;

    feed.startDate = this.formatUTCDate(new Date(feed.startDate));
    feed.endDate = this.formatUTCDate(new Date(feed.endDate));

    this.props.createFeed(userId,childId,feed)
      .then(
        () => this.props.closeModal(),
      );
  }

  formatLocalDate(date) {
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

  formatUTCDate(date) {
    let day = date.getUTCDate();
    let month = (parseInt(date.getUTCMonth()) + 1).toString();
    let year = date.getUTCFullYear();
    let hrs = date.getUTCHours();
    let mins = date.getUTCMinutes();
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

  startingSideOptions() {
    let { startingSide, foodFrom } = this.state;
    let { child } = this.props;
    let isSelected = foodFrom === 'breast';

    return(
      <div className={ isSelected ? 'displayed' : 'hidden' }>
        <div className="form-header">
          What side did {child.name} start?
        </div>
        <div className="form-options">
          {this.sideOptions.map((option, idx) => (
            <button
            key={idx}
            onClick={this.updateField('startingSide')}
            value={option}
            className={option === startingSide ? 'selected' : ''}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
    ) 
  }

  showList(e) {
    e.currentTarget.firstElementChild.classList.add('displayed');
  }

  hideList(e) {
    e.stopPropagation();
    e.currentTarget.classList.remove('displayed');
  }

  carers() {
    return Object.values(this.props.carers).map((carer,idx) =>(
      <li key={idx} data-value={carer._id} onClick={this.updateField('fedBy')}>
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
    let { child, closeModal, carers } = this.props;

    let carer = carers[fedBy];
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
            {this.startingSideOptions()}
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
            onClick={this.showList}
          >
            {carer.fName} {carer.lName}
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

const MSP = state => {
  let childId = state.ui.selectedChild;
  let child = state.entities.children[childId];
  return ({
    userId: state.session.user.id,
    user: state.session.user,
    carers: selectCarers(child.carers),
    child,
    childId
  })
}


const MDP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createFeed: (userId, childId, feed) => dispatch(createEvent(userId, childId,feed))
});

export default withRouter(connect(MSP,MDP)(FeedForm));
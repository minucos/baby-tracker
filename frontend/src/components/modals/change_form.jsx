import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { closeModal } from '../../actions/ui_actions';
import { createEvent } from '../../actions/event_actions';
import { selectCarers } from '../../reducers/selectors';

class ChangeForm extends React.Component {
  constructor(props) {
    super(props);
    let changeDate = Date.now();
    this.state = {
      eventType: 'change',
      contents: [],
      options: [],
      notes: '',
      changedBy: this.props.user,
      startTime: this.formatDate(new Date(changeDate)),
    };
    this.contents = ['pee','poo'];
    this.peeOptions = ['light', 'dark', 'pink'];
    this.pooOptions = ['yellow', 'sticky', 'black', 'green', 'hard', 'loose'];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {
      e.preventDefault();

      this.setState({
        [field]: e.target.value
      })
    }
  };

  updateArrayField(field) {
    return (e) => {
      e.preventDefault();

      let { options } = this.state;
      let ele = e.target.value;
      let idx = options.indexOf(ele);

      if (idx >= 0) {
        options.splice(idx,1);
        if (this.contents.includes(ele)) {
          this.removeOptions(ele);
        }
        this.setState({
          [field]: options.slice()
        })
      } else {
        options.push(ele);
        this.setState({
          [field]: options.slice()
        })
      }
    }
  };

  removeOptions(type) {
    let { options } = this.state;
    let optionstoRemove = type === 'pee' ? this.peeOptions : this.pooOptions;

    optionstoRemove.forEach(option => {
      let idx = options.indexOf(option);
      if (idx !== -1) {
        options.splice(idx,1);
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let { userId, childId } = this.props;
    let change = this.state;
    change.changedBy = change.changedBy.id

    change.startDate = this.formatUTCDate(new Date(change.startDate));

    this.props.createChange(userId, childId, change)
      .then(
        () => this.props.closeModal(),
      );
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

  showContents() {
    let { options } = this.state;
    let list = this.contents;

    return list.map((item, idx) => (
      <button
        key={idx}
        onClick={this.updateArrayField('contents')}
        value={item}
        className={options.includes(item) ? 'selected' : ''}
      >
        {item[0].toUpperCase() + item.slice(1)}
      </button>
    ))
  }

  changeOptions(contents) {
    return(
      <>
        { this.changeList('pee') }
        { this.changeList('poo') }
      </>
    )
  }

  changeList(type, hide) {
    let { options } = this.state;
    let { child } = this.props;
    let list = type === 'pee' ? this.peeOptions : this.pooOptions;
    list = list.map((item, idx) => (
      <button
        key={idx}
        onClick={this.updateArrayField(type)}
        value={item}
        className={options.includes(item) ? 'selected' : ''}
      >
        {item[0].toUpperCase() + item.slice(1)}
      </button>
    ));

    return(
      <div className={ options.includes(type) ? 'displayed' : 'hidden' }>
        <div className="form-header">
          What was {child.name}'s {type} like?
        </div>
        <div className="form-options">
          {list}
        </div>
      </div>
    )
  }

  showList(e) {
    e.currentTarget.firstElementChild.classList.add('displayed');
  }

  hideList(e) {
    e.currentTarget.classList.remove('displayed');
  }

  carers() {
    return this.props.carers.map((carer, idx) => (
      <li key={idx} value={carer._id}>
        {carer.fName} {carer.lName}
      </li>
    ))
  }

  render() {
    let {
      contents,
      notes,
      changedBy,
      startTime,
    } = this.state;
    let { child, closeModal } = this.props;

    if (!child) return null;

    return (
      <div className="modal-container" onClick={closeModal}>
        <div className="form" onClick={(e) => e.stopPropagation()}>
          <div className="form-header">
            What was in {child.name}'s nappy?
          </div>
          <div className="form-options">
            {this.showContents()}
          </div>
          {this.changeOptions(contents)}
          <div className="form-header">
            Who changed {child.name}?
          </div>
          <div
            className='dropdown'
            onChange={this.updateField('changedBy')}
            onClick={this.showList}
          >
            {changedBy.fName} {changedBy.lName}
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
            <span>Time</span>
            <input
              type="datetime-local"
              value={startTime}
              onChange={this.updateField('startTime')}
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
  createChange: (userId,childId,change) => dispatch(createEvent(userId,childId,change))
});

export default withRouter(connect(MSP, MDP)(ChangeForm));
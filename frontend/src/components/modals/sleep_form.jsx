import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/ui_actions';
import { createEvent } from '../../actions/event_actions';

class SleepForm extends React.Component {
  constructor(props) {
    super(props);
    let endDate = Date.now();
    let startDate = endDate - (60000 * 120);
    this.state = {
      eventType: 'sleep',
      notes: '',
      startTime: new Date(startDate),
      endTime: new Date(endDate),
    };

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

  handleSubmit(e) {
    e.preventDefault();
    let { userId, childId } = this.props;
    let sleep = this.state;
    sleep.startTime = new Date(sleep.startTime).toISOString();
    sleep.endTime = new Date(sleep.endTime).toISOString();
    this.props.createSleep(userId, childId, this.state)
      .then(
        () => this.props.closeModal(),
      );
  }

  render() {
    let {
      notes,
      startTime,
      endTime
    } = this.state;
    let { child, closeModal } = this.props;

    if (!child) return null;

    return (
      <div className="modal-container" onClick={closeModal}>
        <div className="form" onClick={(e) => e.stopPropagation()}>
          <div className="form-header">
            When did {child.name} go to sleep?
          </div>
          <input
            type="datetime-local"
            value={startTime}
            onChange={this.updateField('startTime')}
          />
          <div className="form-header">
            When did {child.name} wake up?
          </div>
          <input
            type="datetime-local"
            value={endTime}
            onChange={this.updateField('endTime')}
            min={startTime}
          />
          <div className="form-header">
            Any notes?
          </div>
          <textarea
            type="text"
            value={notes}
            placeholder="Add Notes..."
            onChange={this.updateField('notes')}
          />
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
    childId
  })
}

const MDP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createSleep: (userId,childId,sleep) => dispatch(createEvent(userId,childId,sleep))
});

export default withRouter(connect(MSP, MDP)(SleepForm));
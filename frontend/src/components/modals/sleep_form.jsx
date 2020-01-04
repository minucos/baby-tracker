import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { createEvent } from '../../actions/event_actions';

const SleepForm = props => {

  return (
    <div className="modal-container">
      <h1 onClick={() => props.closeModal()}>SLEEP FORM</h1>
    </div>
  )
};

const MSP = (state, ownProps) => ({
  userId: state.session.id,
  childId: ownProps.match.params.childId
})

const MDP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createSleep: (sleep) => dispatch(createEvent(sleep))
});

export default withRouter(connect(MSP, MDP)(SleepForm));
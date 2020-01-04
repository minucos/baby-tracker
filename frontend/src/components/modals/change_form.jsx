import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { createEvent } from '../../actions/event_actions';

const ChangeForm = props => {

  return (
    <h1 onClick={() => props.closeModal()}>CHANGE FORM</h1>
  )
};

const MSP = (state, ownProps) => ({
  userId: state.session.id,
  childId: ownProps.match.params.childId
})

const MDP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createChange: (change) => dispatch(createEvent(change))
});

export default withRouter(connect(MSP, MDP)(ChangeForm));
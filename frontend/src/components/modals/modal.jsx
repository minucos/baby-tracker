import React from 'react';
import { connect } from 'react-redux';
import FeedFormContainer from './feed_form';
import ChangeFormContainer from './change_form';
import SleepFormContainer from './sleep_form';
import DeleteConfirmationContainer from './delete_confirmation';
import DeleteChildConfirmationContainer from './delete_child_confirmation';
import InviteCarerContainer from './invite_carer';

const Modal = (props) => {
  switch (props.modal) {
    case 'feed':
      return (
        <FeedFormContainer />
      )
    case 'change':
      return(
        <ChangeFormContainer />
      )
    case 'sleep':
      return(
        <SleepFormContainer />
      )
    case 'delete':
        return(
          <DeleteConfirmationContainer />
        )
    case 'deleteChild':
        return(
          <DeleteChildConfirmationContainer />
        )

    case 'inviteCarer':
      return(
        <InviteCarerContainer />
      )
    default:
      return null;
  }
};

const MSP = state => ({
  modal: state.ui.modal
})

export default connect(MSP,null)(Modal);

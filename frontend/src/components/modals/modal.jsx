import React from 'react';
import { connect } from 'react-redux';
import FeedFormContainer from './feed_form';
import ChangeFormContainer from './change_form';
import SleepFormContainer from './sleep_form';

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
    default:
      return null;
  }
};

const MSP = state => ({
  modal: state.ui.modal
})

export default connect(MSP,null)(Modal);

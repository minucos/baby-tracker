import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteEvent } from '../../actions/event_actions';
import { closeModal } from '../../actions/ui_actions';


const DeleteConfirmation = (props) => {
  let { deleteEvent, userId, childId, eventId, closeModal } = props;

  return(
    <div className="modal-container" onClick={closeModal}>
      <div className="form" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-h1">Are you sure?</h1>
        <button 
          className="delete-button"
          onClick={() => {
            deleteEvent(userId,childId,eventId);
            closeModal();
          }}
        ><FontAwesomeIcon icon={faTrashAlt}/><span>Remove</span>
        </button>
      </div>
    </div>
  )
};

const MSP = state => ({
  userId: state.session.user.id,
  childId: state.ui.selectedChild,
  eventId: state.ui.selectedEvent
});

const MDP = dispatch => ({
  deleteEvent: (userId,childId,eventId) => dispatch(deleteEvent(userId,childId,eventId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(MSP,MDP)(DeleteConfirmation);

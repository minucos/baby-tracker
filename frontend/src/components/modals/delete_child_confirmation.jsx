import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteChild } from '../../actions/child_actions';
import { closeModal } from '../../actions/ui_actions';


const DeleteConfirmation = (props) => {
  let { deleteChild, userId, childId, closeModal } = props;
  debugger
  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="form" onClick={(e) => e.stopPropagation()}>
        <h1 className="delete-h1">Are you sure?</h1>
        <button
          className="delete-button"
          onClick={() => {
            deleteChild(userId, childId);
            closeModal();
          }}
        ><FontAwesomeIcon icon={faTrashAlt} /><span>Remove</span>
        </button>
      </div>
    </div>
  )
};

const MSP = state => ({
  userId: state.session.user.id,
});

const MDP = dispatch => ({
  deleteChild: (userId, childId) => dispatch(deleteChild(userId, childId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(MSP, MDP)(DeleteConfirmation);
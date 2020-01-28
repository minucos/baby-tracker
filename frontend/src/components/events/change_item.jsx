import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { applyOffset } from '../../reducers/selectors';
import { openModal } from '../../actions/ui_actions';

const ChangeItem = (props) => {
  let {
    eventDetails,
    carer,
    toggleDetails,
    userId,
    childId,
    eventId,
    openModal } = props;
  let { startTime, contents, options, notes } = eventDetails;

  const deleteButton = (
    <li onClick={(e) => {
      e.stopPropagation();

      // deleteEvent(userId,childId,eventId);
      openModal(childId, eventId);
    }}
    >
      <FontAwesomeIcon className='event-icon' icon={faTrashAlt} />
      <span>Remove</span>
    </li>
  )
  return (
    <div className="event-index-item" onClick={toggleDetails}>
      <div className='item-header'>
        <div>
          <FontAwesomeIcon className='event-icon' icon={faBaby} rotation={90} />
          <span>Changing</span>
        </div>
        <span>{applyOffset(startTime).toLocaleDateString()}</span>
      </div>
      <ul>
        <li>Time: {applyOffset(startTime).toLocaleTimeString()}</li>
        <li>Type: {contents.join(', ')}</li>
        <li>Details: {options.join(', ')}</li>
        <li>Changed by: {carer.fName}</li>
        <li>Notes: {notes}</li>
        {userId === carer._id ? deleteButton : null}
      </ul>
    </div>
  )
}

const MDP = dispatch => ({
  openModal: (childId, eventId) => dispatch(openModal('delete', childId, eventId))
})

export default connect(null,MDP)(ChangeItem);
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { applyOffset, calcDuration } from '../../reducers/selectors';
import { openModal } from '../../actions/ui_actions';

const SleepItem = (props) => {
  let {
    eventDetails,
    carer,
    toggleDetails,
    userId,
    childId,
    eventId,
    openModal } = props;
  let { startTime, endTime, notes } = eventDetails;

  const deleteButton = (
    <li onClick={(e) => {
      e.stopPropagation();
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
          <FontAwesomeIcon className='event-icon' icon={faBed} />
          <span>Sleep</span>
        </div>
        <span>{applyOffset(startTime).toLocaleDateString()}</span>
      </div>
      <ul>
        <li>Went Down: {applyOffset(startTime).toLocaleTimeString()}</li>
        <li>Woke Up: {applyOffset(endTime).toLocaleTimeString()}</li>
        <li>Time Slept: {calcDuration(startTime,endTime).toFixed(1)} hours</li>
        <li>Notes: {notes}</li>
        {userId === carer._id ? deleteButton : null}
      </ul>
    </div>
  )
}

const MDP = dispatch => ({
  openModal: (childId, eventId) => dispatch(openModal('delete', childId, eventId))
})

export default connect(null,MDP)(SleepItem);
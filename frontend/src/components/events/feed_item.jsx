import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { applyOffset, calcDuration } from '../../reducers/selectors';
import { openModal } from '../../actions/ui_actions';


const FeedItem = (props) => {
  let { 
    eventDetails, 
    carer, 
    showDelete,
    toggleDetails, 
    childId, 
    eventId, 
    openModal } = props;
  let { startTime, endTime } = eventDetails;

  const deleteButton = (
    <li onClick={(e) => {
        e.stopPropagation();
        openModal(childId,eventId);
      }}
    >
      <FontAwesomeIcon className='event-icon' icon={faTrashAlt} />
      <span>Remove</span>
    </li>
  )
  return(
    <div className="event-index-item" onClick={toggleDetails}>
      <div className='item-header'>
        <div>
          <FontAwesomeIcon className='event-icon' icon={faUtensils} />
          <span>Feeding</span>
        </div>
        <span>{applyOffset(startTime).toLocaleDateString()}</span>
      </div>
      <ul>
        <li>Start Time: {applyOffset(startTime).toLocaleTimeString()}</li>
        <li>Feeding Time: {(calcDuration(startTime, endTime) * 60).toFixed(0)} mins</li>
        <li>Food: {eventDetails.foodFrom} {eventDetails.foodType}</li>
        {eventDetails.startingSide === 'n/a' ? null : <li>Starting Side: {eventDetails.startingSide}</li> }
        <li>Fed by: {carer.fName}</li>
        <li>Notes: {eventDetails.notes}</li>
        { showDelete ? deleteButton : null }
      </ul>
    </div>
  )
};

const MDP = dispatch => ({
  openModal: (childId,eventId) => dispatch(openModal('delete',childId,eventId))
})

export default connect(null,MDP)(FeedItem);
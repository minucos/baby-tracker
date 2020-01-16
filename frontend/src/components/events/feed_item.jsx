import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { applyOffset, calcDuration } from '../../reducers/selectors';

const FeedItem = ({eventDetails, carer, toggleDetails}) => {
  let { startTime, endTime } = eventDetails;

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
      </ul>
    </div>
  )
};

export default FeedItem;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const FeedItem = ({eventDetails, carer, toggleDetails}) => {
  return(
    <div className="event-index-item" onClick={toggleDetails}>
      <div className='item-header'>
        <div>
          <FontAwesomeIcon className='event-icon' icon={faUtensils} />
          <span>Feeding</span>
        </div>
        <span>{new Date(eventDetails.startTime).toLocaleDateString()}</span>
      </div>
      <ul>
        <li>Time: {new Date(eventDetails.startTime).toLocaleTimeString()}</li>
        <li>Food: {eventDetails.foodFrom} {eventDetails.foodType}</li>
        { eventDetails.startingSide ? <li>Starting Side: {eventDetails.startingSide}</li>: null }
        <li>Fed by: {carer.fName}</li>
        <li>Notes: {eventDetails.notes}</li>
      </ul>
    </div>
  )
};

export default FeedItem;
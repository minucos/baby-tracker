import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

const ChangeItem = ({ eventDetails, carer, toggleDetails }) => {
  return (
    <div className="event-index-item" onClick={toggleDetails}>
      <div className='item-header'>
        <div>
          <FontAwesomeIcon className='event-icon' icon={faBaby} rotation={90} />
          <span>Changing</span>
        </div>
        <span>{new Date(eventDetails.startTime).toDateString()}</span>
      </div>
      <ul>
        <li>Type: {eventDetails.contents.join(', ')}</li>
        <li>Details: {eventDetails.options.join(', ')}</li>
        <li>Changed by: {carer.fName}</li>
        <li>Notes: {eventDetails.notes}</li>
      </ul>
    </div>
  )
}

export default ChangeItem;
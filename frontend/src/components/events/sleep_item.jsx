import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

const calcDuration = (start, end) => {
  let startTime = new Date(start);
  let endTime = new Date(end);

  return ((endTime - startTime) / 1000 / 3600).toFixed(1);
}

const SleepItem = ({ eventDetails, carer, toggleDetails }) => {
  let { startTime, endTime } = eventDetails;
  return (
    <div className="event-index-item" onClick={toggleDetails}>
      <div className='item-header'>
        <div>
          <FontAwesomeIcon className='event-icon' icon={faBed} />
          <span>Sleep</span>
        </div>
        <span>{new Date(startTime).toDateString()}</span>
      </div>
      <ul>
        <li>Time Slept: {calcDuration(startTime,endTime)} hours</li>
        <li>Notes: {eventDetails.notes}</li>
      </ul>
    </div>
  )
}

export default SleepItem;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { applyOffset, calcDuration } from '../../reducers/selectors';

const SleepItem = ({ eventDetails, carer, toggleDetails }) => {
  let { startTime, endTime, notes } = eventDetails;
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
      </ul>
    </div>
  )
}

export default SleepItem;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { applyOffset } from '../../reducers/selectors';

const ChangeItem = ({ eventDetails, carer, toggleDetails }) => {
  let { startTime, contents, options, notes } = eventDetails;
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
      </ul>
    </div>
  )
}

export default ChangeItem;
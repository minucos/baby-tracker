import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBaby } from '@fortawesome/free-solid-svg-icons';
import FeedItem from './feed_item';

const toggleDetails = (e) => {
  e.stopPropagation();

  e.currentTarget.querySelector('ul').classList.toggle('show-details')
}

const EventIndexItem = props => {
  let { event } = props;
  let eventDetails = event.eventDetails;

  let carer;
  switch (event.eventType) {
    case 'feed':
      carer = props.carers.find(carer => carer._id === eventDetails.fedBy);

      return(
        <FeedItem carer={carer} eventDetails={eventDetails} toggleDetails={toggleDetails}/>
      )
    case 'change':
      carer = props.carers.find(carer => carer._id === eventDetails.changedBy);

      return (
        <div className="event-index-item" onClick={toggleDetails}>
          <div className='item-header'>
            <div>
              <FontAwesomeIcon className='event-icon' icon={faBaby}/>
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
    case 'sleep':
      return (
        <div className="event-index-item" onClick={toggleDetails}>
          <div className='item-header'>
            <div>
              <FontAwesomeIcon className='event-icon' icon={faBed}/>
              <span>Sleep</span>
            </div>
            <span>{new Date(eventDetails.startTime).toDateString()}</span>
          </div>
          <ul>
            <li>Notes: {eventDetails.notes}</li>
          </ul>
        </div>
      )
  }
};

export default EventIndexItem;
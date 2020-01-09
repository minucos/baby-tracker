import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBaby, faUtensils } from '@fortawesome/free-solid-svg-icons';

const EventIndexItem = props => {
  let { event } = props;
  let eventDetails = event.eventDetails;

  switch (event.eventType) {
    case 'feed':
      return(
        <div>
          <Link 
            to={`/child/${event.child._id}/events/${event._id}`}
          >
            <FontAwesomeIcon icon={faUtensils}/>
            <span>Feeding</span>
          </Link>
          <div>
            {new Date(eventDetails.startTime).toDateString()}
          </div>
        </div>
      )
    case 'change':
      return (
        <div>
          <Link
            to={`/child/${event.child._id}/events/${event._id}`}
          >
            <FontAwesomeIcon icon={faBaby}/>
            <span>Changing</span>
          </Link>
          <div>
            {new Date(eventDetails.startTime).toDateString()}
          </div>
        </div>
      )
    case 'sleep':
      return (
        <div>
          <Link
            to={`/child/${event.child._id}/events/${event._id}`}
          >
            <FontAwesomeIcon icon={faBed}/>
            <span>Sleep</span>
          </Link>
          <div>
            {new Date(eventDetails.startTime).toDateString()}
          </div>
        </div>
      )
  }
};

export default EventIndexItem;
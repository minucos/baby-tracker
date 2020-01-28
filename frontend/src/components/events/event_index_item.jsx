import React from 'react';
import FeedItem from './feed_item';
import ChangeItem from './change_item';
import SleepItem from './sleep_item';

const toggleDetails = (e) => {
  e.stopPropagation();

  e.currentTarget.querySelector('ul').classList.toggle('show-details')
}

const EventIndexItem = props => {
  let { event, childId, userId, deleteEvent } = props;
  let eventDetails = event.eventDetails;

  let carer;
  switch (event.eventType) {
    case 'feed':
      carer = props.carers.find(carer => carer._id === eventDetails.fedBy);

      return(
        <FeedItem 
          carer={carer} 
          eventDetails={eventDetails} 
          toggleDetails={toggleDetails} 
          childId={childId}
          userId={userId}
          deleteEvent={deleteEvent}
          eventId={event._id}  
        />
      )
    case 'change':
      carer = props.carers.find(carer => carer._id === eventDetails.changedBy);

      return (
        <ChangeItem 
          carer={carer} 
          eventDetails={eventDetails} 
          toggleDetails={toggleDetails} 
          childId={childId}
          userId={userId}
          deleteEvent={deleteEvent}
          eventId={event._id}  
        />
      )
    case 'sleep':
      return(
        <SleepItem 
          carer={carer} 
          eventDetails={eventDetails} 
          toggleDetails={toggleDetails} 
          childId={childId}
          userId={userId}
          deleteEvent={deleteEvent}
          eventId={event._id}  
        />
      )
    default:
      return null;
  }
};

export default EventIndexItem;
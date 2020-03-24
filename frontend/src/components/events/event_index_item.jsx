import React from 'react';
import FeedItem from './feed_item';
import ChangeItem from './change_item';
import SleepItem from './sleep_item';

const toggleDetails = (e) => {
  e.stopPropagation();

  e.currentTarget.querySelector('ul').classList.toggle('show-details')
}

const ownedEvent = (recorder, carer, id) => {
  return recorder._id === id || carer._id === id;
}

const EventIndexItem = props => {
  let { event, childId, userId, deleteEvent } = props;
  let eventDetails = event.eventDetails;
  
  let carer;
  let showDelete;
  switch (event.eventType) {
    case 'feed':
      carer = props.carers.find(carer => carer._id === eventDetails.fedBy);
      showDelete = ownedEvent(event.recorder, carer, userId);

      return(
        <FeedItem 
          carer={carer} 
          eventDetails={eventDetails} 
          toggleDetails={toggleDetails} 
          childId={childId}
          userId={userId}
          deleteEvent={deleteEvent}
          eventId={event._id}  
          showDelete={showDelete}
        />
      )
    case 'change':
      carer = props.carers.find(carer => carer._id === eventDetails.changedBy);
      showDelete = ownedEvent(event.recorder, carer, userId);

      return (
        <ChangeItem 
          carer={carer} 
          eventDetails={eventDetails} 
          toggleDetails={toggleDetails} 
          childId={childId}
          userId={userId}
          deleteEvent={deleteEvent}
          eventId={event._id}  
          showDelete={showDelete}
        />
      )
    case 'sleep':
      carer = props.carers.find(carer => carer._id === event.recorder._id);
      showDelete = ownedEvent(event.recorder, carer, userId);

      return(
        <SleepItem 
          carer={carer} 
          eventDetails={eventDetails} 
          toggleDetails={toggleDetails} 
          childId={childId}
          userId={userId}
          deleteEvent={deleteEvent}
          eventId={event._id}  
          showDelete={showDelete}
        />
      )
    default:
      return null;
  }
};

export default EventIndexItem;
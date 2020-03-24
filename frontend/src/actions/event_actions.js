import * as EventAPIUtil from '../util/event_api_utiil';

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const RECEIVE_FILTERED_EVENTS = 'RECEIVE_FILTERED_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export const CLEAR_USER_EVENTS = 'CLEAR_USER_EVENTS';

const receiveAllEvents = events => {
  return({
    type: RECEIVE_ALL_EVENTS,
    events
  });
}
const receiveFilteredEvents = ({events,count}) => {
  return({
    type: RECEIVE_FILTERED_EVENTS,
    events,
    count
  });
}

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

const removeEvent = event => ({
  type: REMOVE_EVENT,
  event
});

export const clearEvents = () => ({
  type: CLEAR_EVENTS
})

export const clearUserEvents = id => ({
  type: CLEAR_USER_EVENTS,
  id
})

const receiveErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
})

export const fetchAllEvents = (payload) => dispatch => {
  return EventAPIUtil.fetchAllEvents(payload)
    .then(
      events => dispatch(receiveAllEvents(events.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const fetchCompleteEvents = (payload) => dispatch => {
  return EventAPIUtil.fetchCompleteEvents(payload)
    .then(
      events => dispatch(receiveAllEvents(events.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const fetchFilteredEvents = (payload) => dispatch => {
  return EventAPIUtil.fetchFilteredEvents(payload)
    .then(
      events => dispatch(receiveFilteredEvents(events.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const fetchEvent = (userId,childId, eventId) => dispatch => {
  return EventAPIUtil.fetchEvent(userId,childId, eventId)
    .then(
      event => dispatch(receiveEvent(event.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const createEvent = (userId,childId, event) => dispatch => {
  return EventAPIUtil.createEvent(userId,childId, event)
    .then(
      event => dispatch(receiveEvent(event.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const deleteEvent = (userId,childId, eventId) => dispatch => {
  return EventAPIUtil.deleteEvent(userId,childId, eventId)
    .then(
      event => dispatch(removeEvent(event.data)),
      errors => dispatch(receiveErrors(errors))
    )
};
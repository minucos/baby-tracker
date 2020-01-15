import * as EventAPIUtil from '../util/event_api_utiil';

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

const receiveAllEvents = ({events,count}) => {
  return({
    type: RECEIVE_ALL_EVENTS,
    events,
    count
  });
}

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

export const clearEvents = () => ({
  type: CLEAR_EVENTS
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

export const fetchFilteredEvents = (payload) => dispatch => {
  return EventAPIUtil.fetchFilteredEvents(payload)
    .then(
      events => dispatch(receiveAllEvents(events.data)),
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
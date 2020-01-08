import * as EventAPIUtil from '../util/event_api_utiil';

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';

const receiveAllEvents = events => {
  return({
    type: RECEIVE_ALL_EVENTS,
    events
  });
}

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

const receiveErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
})

export const fetchAllEvents = (userId,childId) => dispatch => {
  return EventAPIUtil.fetchAllEvents(userId,childId)
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
import axios from 'axios';

export const fetchAllEvents = (userId, childId) => {
  return axios.get(`/api/users/${userId}/children/${childId}/events`);
};

export const fetchEvent = (userId, childId, eventId) => (
  axios.get(`/api/users/${userId}/children/${childId}/events/${eventId}`)
);

export const createEvent = (userId, childId, event) => (
  axios.post(`/api/users/${userId}/children/${childId}/events`, event)
);
import axios from 'axios';

export const fetchAllEvents = (userId, childId,page,limit) => {
  return axios.get(`/api/users/${userId}/children/${childId}/events?page=${page}&limit=${limit}`);
};

export const fetchEvent = (userId, childId, eventId) => (
  axios.get(`/api/users/${userId}/children/${childId}/events/${eventId}`)
);

export const createEvent = (userId, childId, event) => (
  axios.post(`/api/users/${userId}/children/${childId}/events`, event)
);
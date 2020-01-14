import axios from 'axios';

export const fetchAllEvents = ({userId, childId, page, limit, filter}) => {
  return axios.get(
    `/api/users/${userId}/children/${childId}/events?page=${page}&limit=${limit}&filter=${filter}`
  );
};

export const fetchEvent = (userId, childId, eventId) => (
  axios.get(`/api/users/${userId}/children/${childId}/events/${eventId}`)
);

export const createEvent = (userId, childId, event) => (
  axios.post(`/api/users/${userId}/children/${childId}/events`, event)
);
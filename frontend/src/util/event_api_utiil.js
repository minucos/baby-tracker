import axios from 'axios';

export const fetchAllEvents = ({userId, childId}) => {
  return axios.get(
    `/api/users/${userId}/children/${childId}/events`
  );
};

export const fetchCompleteEvents = ({userId, childId}) => {
  return axios.get(
    `/api/users/${userId}/children/${childId}/events/all`
  );
};

export const fetchFilteredEvents = ({userId, childId, page, limit, filter}) => {
  return axios.get(
    `/api/users/${userId}/children/${childId}/events/filtered?page=${page}&limit=${limit}&filter=${filter}`
  );
};

export const fetchEvent = (userId, childId, eventId) => (
  axios.get(`/api/users/${userId}/children/${childId}/events/${eventId}`)
);

export const createEvent = (userId, childId, event) => (
  axios.post(`/api/users/${userId}/children/${childId}/events`, event)
);

export const deleteEvent = (userId, childId, eventId) => (
  axios.delete(`/api/users/${userId}/children/${childId}/events/${eventId}`)
);
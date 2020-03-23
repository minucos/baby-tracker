import axios from 'axios';

export const fetchChildren = id => {
  return axios.get(`/api/users/${id}/children`)
};

export const fetchChild = (userId, childId) => {
  return axios.get(`/api/users/${userId}/children/${childId}`)
};

export const createChild = (userId, child) => {
  return axios.post(`/api/users/${userId}/children`, child)
};

export const deleteChild = (userId, childId) => {
  return axios.delete(`api/users/${userId}/children/${childId}/delete`)
};

export const addCarer = (userId, childId, carerId) => {
  return axios.put(`api/users/${userId}/children/${childId}/addCarer`, carerId)
};
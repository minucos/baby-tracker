import axios from 'axios';

export const fetchChildren = id => {
  return axios.get(`/api/users/${id}/children`)
};

export const fetchChild = (userId, childId) => {
  return axios.get(`/api/users/${userId}/children/${childId}`)
}
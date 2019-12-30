import axios from 'axios';

export const fetchChildren = id => {
  return axios.get(`/api/users/${id}/children`)
};
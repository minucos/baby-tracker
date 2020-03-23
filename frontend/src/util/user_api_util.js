import axios from 'axios';

export const fetchParents = (id) => {
  return axios.get(`/api/users/parents?id=${id}`);
}

export const searchUsers = (searchTerm) => {
  return axios.get(`/api/users?searchTerm=${searchTerm}`)
}
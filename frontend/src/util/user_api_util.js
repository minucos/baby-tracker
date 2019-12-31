import axios from 'axios';

export const fetchParents = (id) => {
  return axios.get(`/api/users/parents?id=${id}`);
}
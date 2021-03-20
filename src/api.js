import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use(
  config => {
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => res,
  error => {
    return Promise.reject(error);
  },
);

export default instance;
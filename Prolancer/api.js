import axios from 'axios';

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use((config) => {
  config.baseURL = process.env.VUE_APP_API_URL;
  return config;
});

export default instance;
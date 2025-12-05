import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://unsaathi-backend.onrender.com/api'
  : 'http://localhost:5000/api';

console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add Authorization header with JWT token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

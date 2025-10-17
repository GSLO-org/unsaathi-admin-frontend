import axios from 'axios';

// HARDCODED FOR TESTING - Production
const API_URL = 'https://unsaathi-backend.onrender.com/api';

console.log('Environment:', process.env.NODE_ENV);
console.log('Hardcoded API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

export default api;

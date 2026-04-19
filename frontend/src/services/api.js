import axios from 'axios';

// Safely parse the base API URL to ensure it always ends with /api
let baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (baseApiUrl && !baseApiUrl.endsWith('/api')) {
  // Strip trailing slash if any, then add /api
  baseApiUrl = baseApiUrl.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL: baseApiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

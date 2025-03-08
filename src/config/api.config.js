export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
};

// Configure axios defaults
import axios from 'axios';
axios.defaults.baseURL = API_CONFIG.BASE_URL;

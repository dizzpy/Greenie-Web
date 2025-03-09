export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',

    // Shop endpoints
    PRODUCTS: {
      ALL: '/api/products/all',
      SINGLE: (id) => `/api/products/${id}`,
    },
    USER: {
      GET_BY_ID: (id) => `/api/users/${id}`,
      GET_POINTS: (id) => `/api/users/${id}/points`,
    },
  },
};

// Configure axios defaults
import axios from 'axios';
axios.defaults.baseURL = API_CONFIG.BASE_URL;

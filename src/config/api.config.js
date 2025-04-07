export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',

    // Feed Post endpoints
    POSTS: {
      CREATE: '/api/posts/create',
      GET_ALL: '/api/posts/all',
    },

    // Shop endpoints
    PRODUCTS: {
      ALL: '/api/products/all',
      SINGLE: (id) => `/api/products/${id}`,
    },
    USER: {
      GET_BY_ID: (id) => `/api/users/${id}`,
      GET_POINTS: (id) => `/api/users/${id}/points`,
    },
    ORDER: {
      PLACE: '/api/order/place',
    },
    LEADERBOARD: {
      GET_ALL: '/api/leaderboard',
    },

    //Challenge endpoints
    CHALLENGES: {
      CREATE: '/api/challenges/create',
      GET_ALL: '/api/challenges/all',
      GET_BY_ID: (challengeId) => `/api/challenges/${challengeId}`,
    },

    // Proof Submission endpoint
    PROOF: {
      SUBMIT: '/api/proof/submit',
      GET_ALL: '/api/proof/all',
      GET_BY_ID: (id) => `/api/proof/${id}`,
    },
  },
};

// Configure axios defaults
import axios from 'axios';
axios.defaults.baseURL = API_CONFIG.BASE_URL;

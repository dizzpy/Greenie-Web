export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  SOCKET_URL: 'http://localhost:8080/ws-feed', // ✅ Add this

  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',

    // Feed Post endpoints
    POSTS: {
      CREATE: '/api/posts/create',
      GET_ALL: '/api/posts/all',
      USER_DETAILS: '/api/posts/user-details', // getting user details
      LIKE: (postId) => `/api/posts/${postId}/like`, // ✅ like post
      UNLIKE: (postId) => `/api/posts/${postId}/unlike`, // ✅ unlike post
      GET_LIKES: (postId) => `/api/posts/${postId}/likes/all`, // ✅ get like count
      REACT: (postId) => `/api/posts/${postId}/react`,
      GET_REACTIONS: (postId) => `/api/posts/${postId}/reactions`,
      GET_LIKE_COUNT: (postId) => `/api/posts/${postId}/likes/count`,

      //  Comment-related endpoints
      COMMENTS: {
        CREATE: (postId) => `/api/posts/${postId}/comments/create`,
        GET_ALL: (postId) => `/api/posts/${postId}/comments/all`,
        DELETE: (postId, commentId) =>
          `/api/posts/${postId}/${commentId}/comments/delete`,
        COUNT: (postId) => `/api/posts/${postId}/comments/count`,
      },

      // save post related endpoints
      SAVED_POSTS: {
        SAVE: '/api/saved-posts/save',
        UNSAVE: '/api/saved-posts/unsave',
        GET_USER_SAVED: (userId) => `/api/saved-posts/${userId}`,
      },
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

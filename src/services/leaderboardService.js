import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(API_CONFIG.ENDPOINTS.LEADERBOARD.GET_ALL);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

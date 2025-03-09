import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(
      API_CONFIG.ENDPOINTS.ORDER.PLACE,
      orderData,
    );
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

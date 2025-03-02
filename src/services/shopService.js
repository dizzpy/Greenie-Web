import axios from 'axios';

const API_BASE_URL = 'http://52.90.77.36:8080/api';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

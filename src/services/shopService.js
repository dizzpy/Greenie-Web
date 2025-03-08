import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_CONFIG.ENDPOINTS.PRODUCTS.ALL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const allProducts = await getAllProducts();
    const numericId = parseInt(id);
    const product = allProducts.find((p) => p.productID === numericId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

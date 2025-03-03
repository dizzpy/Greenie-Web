import axios from 'axios';

// Use environment variable with fallback
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://16.170.224.209:8080/api';

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

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
    const allProducts = await getAllProducts();
    // Convert id to number since productID is numeric
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

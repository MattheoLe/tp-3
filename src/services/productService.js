import { apiCall } from './api';

export const productService = {
  // Get all products
  getProducts: async () => {
    return apiCall('/products');
  },

  // Get a single product
  getProduct: async (id) => {
    return apiCall(`/products/${id}`);
  },

  // Create a new product
  createProduct: async (product) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  // Update a product
  updateProduct: async (id, product) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },

  // Delete a product
  deleteProduct: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Update product quantity
  updateProductQuantity: async (id, quantity) => {
    const product = await apiCall(`/products/${id}`);
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...product, quantity }),
    });
  },
};

import { apiCall } from './api';

export const orderService = {
  // Get all orders
  getOrders: async () => {
    return apiCall('/orders');
  },

  // Get a single order
  getOrder: async (id) => {
    return apiCall(`/orders/${id}`);
  },

  // Create a new order
  createOrder: async (order) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  // Update an order
  updateOrder: async (id, order) => {
    return apiCall(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const order = await apiCall(`/orders/${id}`);
    return apiCall(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...order, status }),
    });
  },

  // Delete an order
  deleteOrder: async (id) => {
    return apiCall(`/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

import { apiCall } from './api';

export const userService = {
  // Get all users
  getUsers: async () => {
    return apiCall('/users');
  },

  // Get a single user
  getUser: async (id) => {
    return apiCall(`/users/${id}`);
  },

  // Login user
  login: async (email, password) => {
    const users = await apiCall('/users');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  },

  // Create a new user
  createUser: async (user) => {
    return apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  // Update a user
  updateUser: async (id, user) => {
    return apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  },

  // Delete a user
  deleteUser: async (id) => {
    return apiCall(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

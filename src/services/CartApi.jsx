import axios from "axios";

const BASE_URL = "http://localhost:8080/cart";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Add item to cart
export const addToCartApi = (item) => 
  api.post(`${BASE_URL}/add`, item).then(res => res.data);

// Get cart items
export const getCartItems = (userId) => 
  api.get(`${BASE_URL}/items/${userId}`).then(res => res.data);

// Clear cart
export const clearCartApi = (userId) => 
  api.delete(`${BASE_URL}/clear/${userId}`).then(res => res.data);

// Remove single item from cart
export const removeFromCart = (itemId) => 
  api.delete(`${BASE_URL}/remove/${itemId}`).then(res => res.data);

// Get cart total
export const getCartTotal = (userId) => 
  api.get(`${BASE_URL}/total/${userId}`).then(res => res.data);
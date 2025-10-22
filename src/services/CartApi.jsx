import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cart";

// Add item to cart
export const addToCartApi = (userId, item) => axios.post(`${BASE_URL}/add/${userId}`, item).then(res => res.data);

// Get cart items
export const getCartItems = (userId) => axios.get(`${BASE_URL}/items/${userId}`).then(res => res.data);

// Clear cart
export const clearCartApi = (userId) => axios.delete(`${BASE_URL}/clear/${userId}`).then(res => res.data);

// **Remove single item from cart**
export const removeFromCart = (itemId) => axios.delete(`${BASE_URL}/remove/${itemId}`).then(res => res.data);

// Get cart total
export const getCartTotal = (userId) => axios.get(`${BASE_URL}/total/${userId}`).then(res => res.data);

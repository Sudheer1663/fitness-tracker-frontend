import React, { createContext, useContext, useState, useEffect } from "react";
import { addToCartApi, getCartItems, clearCartApi, removeFromCart } from "../services/CartApi";

const CartContext = createContext();

export const CartProvider = ({ userId, children }) => {
  const [cart, setCart] = useState([]);

  // Load cart items from backend on mount
  useEffect(() => {
    if (userId) {
      getCartItems(userId)
        .then(setCart)
        .catch((err) => console.error("Error loading cart:", err));
    }
  }, [userId]);

  const addToCart = async (item) => {
    try {
      await addToCartApi(userId, item);
      setCart((prev) => [...prev, item]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi(userId);
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.id === action.payload.product.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.product.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      }
      return [...state, { ...action.payload.product, quantity: action.payload.quantity }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorage('ecommerce-cart', []);
  const [cart, dispatch] = useReducer(cartReducer, storedCart);

  useEffect(() => {
    setStoredCart(cart);
  }, [cart, setStoredCart]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

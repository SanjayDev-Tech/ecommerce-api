import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const { user, addOrderToUser } = useAuth();
  
  // Directly extract orders from the authenticated user session mapped to localStorage
  const orders = user?.orders || [];

  const addOrder = (order) => {
    if (user) {
      addOrderToUser(order);
    } else {
      console.warn("Attempting to place an order without an active authenticated user session.");
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

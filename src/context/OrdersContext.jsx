import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const [storedOrders, setStoredOrders] = useLocalStorage('ecommerce-orders', []);
  const [orders, setOrders] = useState(storedOrders);

  useEffect(() => {
    setStoredOrders(orders);
  }, [orders, setStoredOrders]);

  const addOrder = (order) => {
    setOrders([order, ...orders]); // Add new order to the beginning of the list
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

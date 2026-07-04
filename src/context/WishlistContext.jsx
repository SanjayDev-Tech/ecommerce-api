import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [storedWishlist, setStoredWishlist] = useLocalStorage('ecommerce-wishlist', []);
  const [wishlist, setWishlist] = useState(storedWishlist);

  useEffect(() => {
    setStoredWishlist(wishlist);
  }, [wishlist, setStoredWishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };
  
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

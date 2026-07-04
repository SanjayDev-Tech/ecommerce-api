import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const login = (userData) => {
    setUser({
      ...userData,
      loginTime: new Date().toISOString()
    });
    setShowProfileModal(true);
  };

  const logout = () => {
    setUser(null);
    setShowProfileModal(false);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showProfileModal, openProfileModal, closeProfileModal }}>
      {children}
    </AuthContext.Provider>
  );
};

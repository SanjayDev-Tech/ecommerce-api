import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('current_user_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registered_users');
    return users ? JSON.parse(users) : [];
  };

  const saveRegisteredUsers = (users) => {
    localStorage.setItem('registered_users', JSON.stringify(users));
  };

  const signup = (userData) => {
    const users = getRegisteredUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('UserAlreadyExists');
    }

    const newUser = {
      ...userData,
      orders: [],
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveRegisteredUsers(users);
    
    setUser(newUser);
    localStorage.setItem('current_user_session', JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const users = getRegisteredUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (!existingUser) {
      throw new Error('UserNotFound');
    }
    
    if (existingUser.password !== password) {
      throw new Error('InvalidPassword');
    }

    const sessionUser = {
      ...existingUser,
      lastLogin: new Date().toISOString()
    };

    setUser(sessionUser);
    localStorage.setItem('current_user_session', JSON.stringify(sessionUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user_session');
  };

  const addOrderToUser = (order) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      orders: [order, ...(user.orders || [])]
    };
    
    setUser(updatedUser);
    localStorage.setItem('current_user_session', JSON.stringify(updatedUser));
    
    const users = getRegisteredUsers();
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    saveRegisteredUsers(updatedUsers);
  };

  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signup, 
      login, 
      logout, 
      addOrderToUser,
      showProfileModal, 
      openProfileModal, 
      closeProfileModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

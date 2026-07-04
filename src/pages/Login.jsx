import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { addToast } = useToast();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    // In login mode, derive name from email. In signup, use the provided name.
    const rawName = isLogin ? email.split('@')[0] : formData.get('name');
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    
    // Simulate login and trigger the Profile Modal
    const simulatedUser = {
      name: name,
      email: email,
      role: 'Premium Member',
      avatar: '' // uses UI-avatars fallback in ProfileModal
    };
    
    login(simulatedUser);
    addToast(isLogin ? 'Successfully logged in!' : 'Account created successfully!', 'success');
  };

  return (
    <div className="container page-container flex items-center justify-center animate-fade-in">
      <div className="login-card card glass">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
          <p className="text-secondary">
            {isLogin ? 'Enter your credentials to access your account.' : 'Sign up to get started with FakeStore.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="form-label">Full Name</label>
              <input required type="text" name="name" placeholder="John Doe" className="input" />
            </div>
          )}
          
          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input required type="email" name="email" placeholder="john@example.com" className="input" />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              {isLogin && <a href="#" className="text-sm text-primary-color hover:underline">Forgot password?</a>}
            </div>
            <input 
              required 
              type="text" 
              placeholder="••••••••" 
              className="input" 
              style={{ WebkitTextSecurity: 'disc' }} 
              autoComplete="off" 
            />
          </div>
          
          <Button type="submit" variant="primary" className="w-full">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            className="text-primary-color font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

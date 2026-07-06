import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { addToast } = useToast();
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    try {
      if (isLogin) {
        login(email, password);
        addToast('Successfully logged in!', 'success');
        navigate('/');
      } else {
        signup({ name, email, password });
        addToast('Account created successfully!', 'success');
        navigate('/');
      }
    } catch (error) {
      if (error.message === 'UserNotFound') {
        alert('Account not found. Redirecting to registration...');
        setIsLogin(false);
      } else if (error.message === 'InvalidPassword') {
        addToast('Invalid password. Please try again.', 'error');
      } else if (error.message === 'UserAlreadyExists') {
        addToast('An account with this email already exists.', 'error');
      } else {
        addToast(error.message, 'error');
      }
    }
  };

  return (
    <div className="container page-container flex items-center justify-center animate-fade-in">
      <div className="auth-card card glass">
        <div className="auth-header text-center">
          <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
          <p className="text-secondary">
            {isLogin ? 'Enter your credentials to access your account.' : 'Sign up to get started with FakeStore.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-form-group">
              <label className="form-label">Full Name</label>
              <input required type="text" name="name" placeholder="John Doe" className="input" />
            </div>
          )}
          
          <div className="auth-form-group">
            <label className="form-label">Email Address</label>
            <input required type="email" name="email" placeholder="john@example.com" className="input" />
          </div>
          
          <div className="auth-form-group">
            <div className="flex justify-between items-center">
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              {isLogin && <a href="#" className="text-sm text-primary-color hover:underline">Forgot password?</a>}
            </div>
            <input 
              required 
              type="text" 
              name="password"
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
        
        <div className="auth-footer">
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

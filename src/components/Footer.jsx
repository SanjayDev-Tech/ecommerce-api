import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo">
            Fake<span className="text-primary-color">Store</span>
          </Link>
          <p className="text-secondary text-sm mt-4">
            A modern, responsive e-commerce frontend built with React, Vite, and CSS.
          </p>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=electronics">Electronics</Link></li>
            <li><Link to="/products?category=jewelery">Jewelery</Link></li>
            <li><Link to="/products?category=men's clothing">Men's Clothing</Link></li>
            <li><Link to="/products?category=women's clothing">Women's Clothing</Link></li>
          </ul>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-title">Account</h4>
          <ul className="footer-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container text-center text-sm text-secondary">
          &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

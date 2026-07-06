import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './ProfileDropdown.css';

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGiftClick = (e) => {
    e.preventDefault();
    setShowGiftModal(true);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setShowContactModal(true);
  };

  const handleGiftSubmit = (e) => {
    e.preventDefault();
    alert("System Balance Checked. Hydrating dummy payment flow...");
    setShowGiftModal(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Support ticket successfully logged. We will reach out shortly.");
    setShowContactModal(false);
  };

  return (
    <div className="profile-menu-container action-item-container desktop-only">
      <button className="action-item">
        <User size={20} strokeWidth={2} />
        <span className="action-text">Profile</span>
      </button>

      <div className="profile-dropdown-card">
        {user ? (
          <>
            <div className="profile-dropdown-header">
              <h4>Hello, {user.name}!</h4>
              <p>{user.email}</p>
            </div>
            <div className="profile-dropdown-actions">
              <button className="login-signup-btn w-full font-bold" style={{ backgroundColor: '#fff', cursor: 'pointer' }} onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="profile-dropdown-header">
              <h4>Welcome</h4>
              <p>To access account and manage orders</p>
            </div>
            <div className="profile-dropdown-actions">
              <Link to="/login" className="login-signup-btn">
                LOGIN / SIGNUP
              </Link>
            </div>
          </>
        )}
        <div className="profile-dropdown-links">
          <Link to="/orders">Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
          <a href="#" onClick={handleGiftClick}>Gift Cards</a>
          <a href="#" onClick={handleContactClick}>Contact Us</a>
        </div>
      </div>

      {showGiftModal && (
        <div className="pd-modal-overlay" onClick={() => setShowGiftModal(false)}>
          <div className="pd-modal-content gift-cards-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="pd-close-btn" onClick={() => setShowGiftModal(false)}>
              <X size={20} />
            </button>
            <h3>Gift Cards</h3>
            <p>Enter claim code to check active balance</p>
            <form onSubmit={handleGiftSubmit}>
              <div className="gift-promo-matrix">
                <input type="text" className="gift-input" placeholder="Enter Claim Code (e.g., GC-2026-XYZ)" required />
                <div className="gift-pill-options">
                  <button type="button" className="gift-pill" onClick={() => alert("Mock checkout: $50")}>$50 Preset</button>
                  <button type="button" className="gift-pill" onClick={() => alert("Mock checkout: $100")}>$100 Preset</button>
                </div>
              </div>
              <button type="submit" className="pd-submit-btn">Check Balance & Pay</button>
            </form>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="pd-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="pd-modal-content contact-us-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="pd-close-btn" onClick={() => setShowContactModal(false)}>
              <X size={20} />
            </button>
            <h3>Contact Support</h3>
            <p>How can we help you today?</p>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <select className="contact-select" required defaultValue="">
                <option value="" disabled>Select an inquiry topic...</option>
                <option value="order">Order Inquiry</option>
                <option value="refund">Refund Status</option>
                <option value="tech">Technical Support</option>
                <option value="other">Other</option>
              </select>
              <textarea className="contact-textarea" placeholder="Describe your issue in detail..." required></textarea>
              <button type="submit" className="pd-submit-btn">Submit Ticket</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

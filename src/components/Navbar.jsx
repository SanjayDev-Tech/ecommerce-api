import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();



  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'MEN', path: "/products?category=men's clothing" },
    { name: 'WOMEN', path: "/products?category=women's clothing" },
    { name: 'KIDS', path: '/products?category=kids' },
    { name: 'HOME', path: '/' },
    { name: 'BEAUTY', path: '/products?category=beauty' },
    { name: 'GENZ', path: '/products?category=genz' }
  ];

  return (
    <header className="navbar-container">
      <div className="navbar">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn mobile-only" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="navbar-logo" aria-label="Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ff3f6c 0%, #fb56c1 100%)',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '22px',
            letterSpacing: '-1px',
            lineHeight: 1,
            boxShadow: '0 2px 4px rgba(255, 63, 108, 0.3)'
          }}>
            <span style={{ color: '#ffffff' }}>f</span>
            <span style={{ color: '#ffffff', opacity: 0.9 }}>s</span>
          </div>
          <span className="logo-text" style={{ marginLeft: '8px', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#282c3f' }}>fake</span>
            <span style={{ color: '#ff3f6c' }}>store</span>
          </span>
        </Link>



        {/* Desktop Navigation */}
        <nav className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
              {link.isNew && <span className="badge-new">NEW</span>}
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="navbar-search desktop-only">
          <div className="search-icon-wrapper">
            <Search size={18} color="#696e79" />
          </div>
          <input 
            type="text" 
            placeholder="Search for products, brands and more" 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Actions (Profile, Wishlist, Bag) */}
        <div className="navbar-actions">
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
                <Link to="/giftcards">Gift Cards</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
          
          <Link to="/wishlist" className="action-item">
            <div className="icon-wrapper">
              <Heart size={20} strokeWidth={2} />
              {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
            </div>
            <span className="action-text">Wishlist</span>
          </Link>
          
          <Link to="/cart" className="action-item">
            <div className="icon-wrapper">
              <ShoppingBag size={20} strokeWidth={2} />
              {getCartCount() > 0 && <span className="count-badge">{getCartCount()}</span>}
            </div>
            <span className="action-text">Bag</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu animate-fade-in mobile-only">
          <form onSubmit={handleSearch} className="mobile-search">
            <Search size={18} color="#696e79" className="mobile-search-icon" />
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              className="mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                {link.isNew && <span className="mobile-badge-new">NEW</span>}
              </NavLink>
            ))}
            <button 
              className="mobile-nav-link text-left" 
              onClick={() => {
                setIsMenuOpen(false);
                openProfileModal();
              }}
            >
              Profile
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

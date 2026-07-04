import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon, Package, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const { user, openProfileModal, logout } = useAuth();
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <header className="navbar-container glass">
      <div className="container navbar">
        <Link to="/" className="navbar-logo">
          Fake<span className="text-primary-color">Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="navbar-search desktop-only">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="input search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <Search size={18} />
          </button>
        </form>

        {/* Icons */}
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="action-btn" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/wishlist" className="action-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          
          <Link to="/orders" className="action-btn" aria-label="Orders">
            <Package size={20} />
          </Link>
          
          <Link to="/cart" className="action-btn" aria-label="Cart">
            <ShoppingCart size={20} />
            {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
          </Link>
          
          {user ? (
            <>
              <button className="action-btn desktop-only" onClick={openProfileModal} aria-label="Profile">
                <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
              </button>
              <button 
                className="action-btn desktop-only" 
                onClick={() => { logout(); navigate('/login'); }} 
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="action-btn desktop-only" aria-label="Login">
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}

          <button 
            className="action-btn mobile-only menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <form onSubmit={handleSearch} className="mobile-search">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="input search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <Search size={18} />
            </button>
          </form>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/orders" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Orders
            </Link>
            
            {user ? (
              <>
                <button 
                  className="mobile-nav-link text-left w-full" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openProfileModal();
                  }}
                >
                  Profile ({user.name.split(' ')[0]})
                </button>
                <button 
                  className="mobile-nav-link text-left w-full" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/Button';
import './Cart.css';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container page-container cart-empty">
        <div className="cart-empty-icon">
          <ShoppingBag size={64} className="text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-secondary mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container page-container animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button className="text-danger-color font-medium hover:underline" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-container">
          {cart.map(item => (
            <div key={item.id} className="cart-item card">
              <Link to={`/products/${item.id}`} className="cart-item-img-container">
                <img src={item.image} alt={item.title} className="cart-item-img" />
              </Link>
              
              <div className="cart-item-details">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="cart-item-title">
                      <Link to={`/products/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-sm text-secondary uppercase tracking-wider">{item.category}</p>
                  </div>
                  <div className="cart-item-price font-bold text-lg">
                    {formatCurrency(item.price)}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="quantity-selector-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  
                  <button 
                    className="cart-item-remove" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary card">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="summary-row">
            <span className="text-secondary">Subtotal</span>
            <span className="font-medium">{formatCurrency(getCartTotal())}</span>
          </div>
          
          <div className="summary-row">
            <span className="text-secondary">Shipping</span>
            <span className="text-success-color font-medium">Free</span>
          </div>
          
          <div className="summary-row">
            <span className="text-secondary">Tax</span>
            <span className="font-medium">{formatCurrency(getCartTotal() * 0.08)}</span>
          </div>
          
          <hr className="summary-divider" />
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="text-primary-color">{formatCurrency(getCartTotal() * 1.08)}</span>
          </div>
          
          <Button 
            className="w-full mt-6" 
            variant="primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
          
          <p className="text-xs text-center text-secondary mt-4">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

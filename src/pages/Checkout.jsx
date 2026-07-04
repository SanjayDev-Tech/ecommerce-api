import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/Button';
import './Checkout.css';

export const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate order processing
    setTimeout(() => {
      const newOrder = {
        id: Math.floor(100000 + Math.random() * 900000), // Generate a random 6 digit order ID
        date: new Date().toISOString(),
        items: [...cart],
        total: getCartTotal() * 1.08 // Include tax
      };
      
      addOrder(newOrder);
      clearCart();
      addToast('Order placed successfully!', 'success');
      navigate('/orders');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container page-container text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="mb-8">You need items in your cart to checkout.</p>
        <Button onClick={() => navigate('/products')}>Go to Products</Button>
      </div>
    );
  }

  return (
    <div className="container page-container animate-fade-in">
      <h1 className="section-title text-left">Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form-container card">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">First Name</label>
                <input required type="text" name="firstName" className="input" value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input required type="text" name="lastName" className="input" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input required type="email" name="email" className="input" value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="mb-4">
              <label className="form-label">Address</label>
              <input required type="text" name="address" className="input" value={formData.address} onChange={handleChange} />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div>
                <label className="form-label">City</label>
                <input required type="text" name="city" className="input" value={formData.city} onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">ZIP Code</label>
                <input required type="text" name="zipCode" className="input" value={formData.zipCode} onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">Country</label>
                <input required type="text" name="country" className="input" value={formData.country} onChange={handleChange} />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6">Payment Information</h2>
            
            <div className="mb-4">
              <label className="form-label">Card Number</label>
              <input required type="text" name="cardNumber" placeholder="0000 0000 0000 0000" className="input" value={formData.cardNumber} onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="form-label">Expiry Date</label>
                <input required type="text" name="expiryDate" placeholder="MM/YY" className="input" value={formData.expiryDate} onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input required type="text" name="cvv" placeholder="123" className="input" value={formData.cvv} onChange={handleChange} />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Place Order
            </Button>
          </form>
        </div>

        <div className="checkout-summary card">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="checkout-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-img-container">
                  <img src={item.image} alt={item.title} />
                  <span className="checkout-item-qty">{item.quantity}</span>
                </div>
                <div className="checkout-item-title">{item.title}</div>
                <div className="checkout-item-price">{formatCurrency(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          
          <hr className="summary-divider" />
          
          <div className="summary-row">
            <span className="text-secondary">Subtotal</span>
            <span>{formatCurrency(getCartTotal())}</span>
          </div>
          <div className="summary-row">
            <span className="text-secondary">Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span className="text-secondary">Tax</span>
            <span>{formatCurrency(getCartTotal() * 0.08)}</span>
          </div>
          
          <hr className="summary-divider" />
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="text-primary-color">{formatCurrency(getCartTotal() * 1.08)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

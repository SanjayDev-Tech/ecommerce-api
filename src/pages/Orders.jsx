import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Calendar } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/Button';
import './Orders.css';

export const Orders = () => {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="container page-container cart-empty">
        <div className="cart-empty-icon">
          <Package size={64} className="text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
        <p className="text-secondary mb-8">You haven't placed any orders with us yet.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container page-container animate-fade-in">
      <h1 className="section-title text-left mb-8">Order History</h1>
      
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card card">
            <div className="order-header">
              <div>
                <span className="order-id">Order #{order.id}</span>
                <div className="order-date flex items-center gap-1 text-secondary text-sm mt-1">
                  <Calendar size={14} /> {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                </div>
              </div>
              <div className="order-total-block text-right">
                <span className="text-secondary text-sm block">Total Amount</span>
                <span className="order-total-price text-primary-color font-bold text-xl">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <Link to={`/products/${item.id}`} className="order-item-img-container">
                    <img src={item.image} alt={item.title} className="order-item-img" />
                    <span className="checkout-item-qty">{item.quantity}</span>
                  </Link>
                  <div className="order-item-details">
                    <Link to={`/products/${item.id}`} className="order-item-title hover:text-primary-color transition-colors">
                      {item.title}
                    </Link>
                    <div className="order-item-price text-sm font-medium mt-1">
                      {formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

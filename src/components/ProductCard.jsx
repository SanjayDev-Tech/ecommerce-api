import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from './Button';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatCurrency';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast('Added to cart', 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      addToast('Removed from wishlist', 'info');
    } else {
      addToast('Added to wishlist', 'success');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="card product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        <button 
          className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label="Toggle Wishlist"
        >
          <Heart fill={isInWishlist(product.id) ? 'currentColor' : 'none'} size={20} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        
        <div className="product-rating">
          <Star size={16} fill="var(--warning-color)" color="var(--warning-color)" />
          <span>{product.rating?.rate}</span>
          <span className="text-secondary text-sm">({product.rating?.count} reviews)</span>
        </div>
        
        <div className="product-footer">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <Button onClick={handleAddToCart} className="btn-icon" variant="primary" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="card product-card">
      <div className="product-image-container skeleton"></div>
      <div className="product-info">
        <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '8px' }}></div>
        <div className="skeleton" style={{ height: '20px', width: '90%', marginBottom: '16px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '60%', marginBottom: '16px' }}></div>
        <div className="product-footer">
          <div className="skeleton" style={{ height: '24px', width: '30%' }}></div>
          <div className="skeleton" style={{ height: '36px', width: '36px', borderRadius: '50%' }}></div>
        </div>
      </div>
    </div>
  );
};

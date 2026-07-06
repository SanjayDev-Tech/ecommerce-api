import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatCurrency';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

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
    <Link to={`/products/${product.id}`} className="myntra-product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        <div className="product-rating-overlay">
          <span className="rating-val">{product.rating?.rate || '4.0'}</span>
          <Star size={10} fill="#14b8a6" color="#14b8a6" className="rating-star" />
          <span className="rating-sep">|</span>
          <span className="rating-count">{product.rating?.count || 0}</span>
        </div>
        <button 
          className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label="Toggle Wishlist"
        >
          <Heart fill={isInWishlist(product.id) ? 'currentColor' : 'none'} size={16} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-brand">{product.category}</div>
        <div className="product-title" title={product.title}>{product.title}</div>
        <div className="product-price-row">
          <span className="product-price-current">{formatCurrency(product.price)}</span>
          <span className="product-price-old">{formatCurrency(product.price * 1.3)}</span>
          <span className="product-discount">(30% OFF)</span>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="myntra-product-card">
      <div className="product-image-container skeleton"></div>
      <div className="product-info">
        <div className="skeleton" style={{ height: '14px', width: '60%', marginBottom: '6px' }}></div>
        <div className="skeleton" style={{ height: '14px', width: '90%', marginBottom: '10px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '70%' }}></div>
      </div>
    </div>
  );
};

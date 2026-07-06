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

  const getMappedImage = (title, originalImage) => {
    if (!title) return originalImage;
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('turtleneck')) {
      return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop";
    }
    if (lowerTitle.includes('oxford shirt')) {
      return "/images/striped-oxford-shirt.png";
    }
    if (lowerTitle.includes('cargo trousers') || lowerTitle.includes('cargo work trousers') || lowerTitle.includes('parachute pants')) {
      return "/images/cargo-work-trousers.png";
    }
    return originalImage;
  };

  const displayImage = getMappedImage(product.title, product.image);

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
        <img 
          src={displayImage} 
          alt={product.title} 
          className="product-image" 
          loading="lazy" 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop"; 
          }}
        />
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

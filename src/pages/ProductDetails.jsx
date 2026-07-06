import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { fetchProductById, fetchProductsByCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import { ProductCard } from '../components/ProductCard';
import { ProductMetadata } from '../components/ProductMetadata';
import { DynamicInventoryAlert } from '../components/CROFeatures';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        
        // Fetch related products
        const related = await fetchProductsByCategory(data.category);
        setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Added ${quantity} to cart`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      addToast('Removed from wishlist', 'info');
    } else {
      addToast('Added to wishlist', 'success');
    }
  };

  if (loading) {
    return (
      <div className="container page-container">
        <div className="product-details-layout">
          <div className="product-main-content-left">
            <div className="product-image-frame">
              <Skeleton style={{ height: '100%' }} />
            </div>
          </div>
          <div className="product-details-info">
            <Skeleton style={{ height: '36px', width: '80%', marginBottom: '1rem' }} />
            <Skeleton style={{ height: '24px', width: '30%', marginBottom: '2rem' }} />
            <Skeleton style={{ height: '100px', width: '100%', marginBottom: '2rem' }} />
            <Skeleton style={{ height: '48px', width: '50%', marginBottom: '2rem' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page-container text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="container page-container animate-fade-in">
      <Link to="/products" className="back-link">
        <ArrowLeft size={20} /> Back to Products
      </Link>
      
      <div className="product-view-wrapper">
        <div className="product-main-content">
          <div className="product-details-layout">
            {/* Left Column */}
            <div className="product-main-content-left">
              <div className="product-image-frame">
                <img src={product.image} alt={product.title} />
              </div>
              
              <div className="product-benefits">
                <div className="benefit-item">
                  <Truck size={24} className="text-primary-color" />
                  <div>
                    <h4 className="font-semibold">Free Delivery</h4>
                    <p className="text-sm text-secondary">Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <RotateCcw size={24} className="text-primary-color" />
                  <div>
                    <h4 className="font-semibold">Return Delivery</h4>
                    <p className="text-sm text-secondary">Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <ShieldCheck size={24} className="text-primary-color" />
                  <div>
                    <h4 className="font-semibold">1 Year Warranty</h4>
                    <p className="text-sm text-secondary">Guaranteed 100% authentic</p>
                  </div>
                </div>
              </div>
            </div>
        
            {/* Product Info */}
            <div className="product-details-info">
          <div className="product-category text-primary-color uppercase tracking-wider font-semibold text-sm mb-2">
            {product.category}
          </div>
          <h1 className="product-details-title">{product.title}</h1>
          
          <div className="product-details-rating">
            <div className="flex items-center text-warning-color">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill={product.rating.rate >= 4.5 ? "currentColor" : "none"} />
            </div>
            <span className="rating-value">{product.rating.rate}</span>
            <span className="rating-count text-secondary">({product.rating.count} reviews)</span>
          </div>
          
          <div className="product-details-price">
            {formatCurrency(product.price)}
          </div>
          
          <p className="product-details-description">
            {product.description}
          </p>
          
          <div className="product-actions-section">
            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
            
            <div className="w-full mt-4">
              <DynamicInventoryAlert />
            </div>
            <div className="action-buttons">
              <Button onClick={handleAddToCart} className="add-to-cart-btn flex-grow">
                <ShoppingCart size={20} /> Add to Cart
              </Button>
              <button 
                className={`wishlist-toggle-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                aria-label="Toggle Wishlist"
              >
                <Heart size={24} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
          {/* Unified Metadata Engine */}
          <ProductMetadata product={product} />
          
        </div>
        
        {/* Related Products Sidebar */}
        {relatedProducts.length > 0 && (
          <div className="related-products-sidebar">
            <h2 className="sidebar-title">Related Products</h2>
            <div className="related-products-list">
              {relatedProducts.map(rp => (
                <Link to={`/products/${rp.id}`} key={rp.id} className="related-product-compact-card">
                  <div className="rp-img-wrapper">
                    <img src={rp.image} alt={rp.title} />
                  </div>
                  <div className="rp-info">
                    <h4 className="rp-title">{rp.title}</h4>
                    <div className="rp-price">${rp.price.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

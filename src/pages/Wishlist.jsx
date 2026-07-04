import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container page-container cart-empty">
        <div className="cart-empty-icon">
          <Heart size={64} className="text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-secondary mb-8">Save items you love here to buy them later.</p>
        <Link to="/products" className="btn btn-primary">
          Explore Products <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container page-container animate-fade-in">
      <h1 className="section-title text-left mb-8">My Wishlist</h1>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard, ProductCardSkeleton } from './ProductCard';
import './FeaturedProductsFeed.css';

export const FeaturedProductsFeed = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
        setLoading(false);
      }
    };
    
    fetchFeatured();
  }, []);

  return (
    <section className="featured-feed-section container">
      <div className="section-header">
        <h2 className="section-title text-black">TRENDING NOW</h2>
        <Link to="/products" className="view-all-link">View All &rarr;</Link>
      </div>
      
      <div className="featured-grid">
        {loading 
          ? Array.from({ length: 8 }).map((_, idx) => (
              <ProductCardSkeleton key={`skeleton-${idx}`} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </section>
  );
};

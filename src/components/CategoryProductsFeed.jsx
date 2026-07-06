import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard, ProductCardSkeleton } from './ProductCard';
import { fetchProductsByCategory } from '../services/api';
import './CategoryProductsFeed.css';

export const CategoryProductsFeed = ({ category, title, limit = 4 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchProductsByCategory(category);
        setProducts(data.slice(0, limit));
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch products for category ${category}:`, error);
        setLoading(false);
      }
    };
    
    fetchItems();
  }, [category, limit]);

  if (!loading && products.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <section className="category-feed-section container">
      <div className="section-header">
        <h2 className="section-title text-black">{title}</h2>
        <Link to={`/products?category=${encodeURIComponent(category)}`} className="view-all-link">
          View All &rarr;
        </Link>
      </div>
      
      <div className="category-feed-grid">
        {loading 
          ? Array.from({ length: limit }).map((_, idx) => (
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

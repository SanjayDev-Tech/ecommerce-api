import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Truck } from 'lucide-react';
import { fetchProducts } from '../services/api';
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard';
import './Home.css';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const products = await fetchProducts();
        // Just get 4 random products or the first 4 for featured
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const features = [
    { icon: <Truck size={32} />, title: "Free Shipping", desc: "On all orders over $50" },
    { icon: <ShieldCheck size={32} />, title: "Secure Payment", desc: "100% secure payment" },
    { icon: <TrendingUp size={32} />, title: "Best Quality", desc: "Top products guaranteed" }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text animate-fade-in">
            <h1 className="hero-title">
              Discover the Newest Trends in <span className="text-primary-color">Fashion & Electronics</span>
            </h1>
            <p className="hero-subtitle">
              Explore our premium collection of high-quality products. Upgrade your style and tech today.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary hero-btn">
                Shop Now <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-surface">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon text-primary-color">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="text-primary-color flex items-center gap-2 font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading 
              ? Array.from({ length: 4 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
              : featuredProducts.map(product => <ProductCard key={product.id} product={product} />)
            }
          </div>
        </div>
      </section>
      
      {/* Categories Banner */}
      <section className="categories-banner section-padding bg-surface">
        <div className="container">
          <div className="banner-content glass animate-fade-in">
            <h2>Explore Our Categories</h2>
            <p>From latest electronics to trendy fashion clothing.</p>
            <div className="flex gap-4 justify-center mt-6 flex-wrap">
              <Link to="/products?category=electronics" className="btn btn-outline">Electronics</Link>
              <Link to="/products?category=jewelery" className="btn btn-outline">Jewelry</Link>
              <Link to="/products?category=men's clothing" className="btn btn-outline">Men's Clothing</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

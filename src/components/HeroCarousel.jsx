import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroCarousel.css';

const carouselData = [
  {
    id: 1,
    title: "Elevated Essentials",
    subtitle: "Premium Menswear",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop", 
    link: "/products?category=men's%20clothing",
    position: "center 50%"
  },
  {
    id: 2,
    title: "Effortless Elegance",
    subtitle: "Women's Collection",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    link: "/products?category=women's%20clothing",
    position: "center 20%"
  },
  {
    id: 6,
    title: "Modern Heritage",
    subtitle: "Classic Tailoring",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
    link: "/products?category=men's%20clothing",
    position: "center 15%"
  },
  {
    id: 4,
    title: "Refined Tech",
    subtitle: "State-of-the-art",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    link: "/products?category=electronics",
    position: "center"
  },
  {
    id: 3,
    title: "Urban Utility",
    subtitle: "Outerwear & Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    link: "/products",
    position: "center"
  },
  {
    id: 5,
    title: "Timeless Accessories",
    subtitle: "Jewelry & Watches",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    link: "/products?category=jewelery",
    position: "center"
  }
];

export const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel-wrapper">
      <div className="luxury-split-container">
        
        {/* 60% Left: Structural Focus Layout */}
        <div className="slider-left-focus">
          {carouselData.map((card, index) => (
            <img 
              key={`img-${card.id}`}
              src={card.image} 
              alt={card.title} 
              className={`focus-image ${index === activeIndex ? 'active' : ''}`}
              style={{ objectPosition: card.position || 'center' }}
            />
          ))}
        </div>

        {/* 40% Right: Sliding List Module */}
        <div className="slider-right-list">
          {carouselData.map((card, index) => (
            <div 
              key={`block-${card.id}`}
              className={`grid-block-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="block-content">
                <h3 className="serif-title">{card.title}</h3>
                <p className="sans-subtitle">{card.subtitle}</p>
                
                <div className={`block-expansion ${index === activeIndex ? 'expanded' : ''}`}>
                  <Link to={card.link} className="explore-btn">
                    Explore Collection <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

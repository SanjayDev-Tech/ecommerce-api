import React from 'react';
import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel';
import { FeaturedProductsFeed } from '../components/FeaturedProductsFeed';
import { CategoryProductsFeed } from '../components/CategoryProductsFeed';
import { BudgetBargains } from '../components/BudgetBargains';
import { BankOffers } from '../components/BankOffers';
import { LiveSalesTicker } from '../components/CROFeatures';
import './Home.css';

export const Home = () => {
  const wowDeals = [
    { brand: "TOMMY HILFIGER", subtitle: "MIN. 50% OFF", desc: "Effortless Styles", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", link: "/products?category=men's%20clothing" },
    { brand: "FRENCH CONNECTION", subtitle: "MIN. 55% OFF", desc: "Casual-Day Picks", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", link: "/products?category=women's%20clothing" },
    { brand: "U.S. POLO ASSN.", subtitle: "MIN. 50% OFF", desc: "Daily Comfort", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80", link: "/products" },
    { brand: "BIRKENSTOCK", subtitle: "UPTO 40% OFF", desc: "Premium Comfort", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", link: "/products" },
    { brand: "FLYING MACHINE", subtitle: "MIN. 55% OFF", desc: "Refined Edge", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80", link: "/products" },
  ];

  const shopByCategory = [
    { title: "Ethnic Wear", offer: "50-80% OFF", img: "/images/ethnic_wear.png", link: "/products?category=women's%20clothing" },
    { title: "Kids Wear", offer: "40-70% OFF", img: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=400&q=80", link: "/products?category=kids" },
    { title: "Men's Footwear", offer: "50-70% OFF", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80", link: "/products" },
    { title: "Bags & Belts", offer: "40-80% OFF", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80", link: "/products" },
    { title: "Headphones & Speakers", offer: "UP TO 70% OFF", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", link: "/products" },
    { title: "Home Decor", offer: "40-70% OFF", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80", link: "/products" },
    { title: "Casual Wear", offer: "40-80% OFF", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80", link: "/products?category=men's%20clothing" },
    { title: "Men's Activewear", offer: "30-70% OFF", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80", link: "/products?category=men's%20clothing" },
    { title: "Women's Activewear", offer: "30-70% OFF", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80", link: "/products?category=women's%20clothing" },
    { title: "Western Wear", offer: "40-80% OFF", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80", link: "/products?category=women's%20clothing" },
    { title: "Watches", offer: "Upto 80% OFF", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80", link: "/products?category=jewelery" },
    { title: "Grooming", offer: "Upto 60% OFF", img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&q=80", link: "/products?category=beauty" },
  ];

  return (
    <div className="home-container">
      
      {/* Top Header Buffer: Hero Carousel */}
      <HeroCarousel />

      <div className="container">
        {/* Main Sale Banner: Split Layout Architecture */}
      <div className="main-sale-banner-wrapper">
        
        {/* Overlay Accents: Floating Badge Layer */}
        <div className="floating-coupon-badge">
          <span className="badge-text">FLAT ₹300 OFF</span>
          <span className="badge-subtext">LIVE NOW</span>
        </div>

        <div className="main-sale-banner-css split-layout">
          
          {/* Left Column: Text Matrix */}
          <div className="banner-left-col">
            <h2 className="mega-sale-text">MEGA SAVINGS SALE</h2>
            <h1 className="discount-text">50-80% OFF</h1>
            <p className="offers-text">Offers You Can't Resist!</p>
            <Link to="/products" className="shop-now-link">
              <button className="shop-now-btn">SHOP NOW</button>
            </Link>
          </div>

          {/* Right Column: Vacant Space Optimization */}
          <div className="banner-right-col">
             {/* Male Model Group */}
             <div className="model-group">
                <img src="/images/male_model.png" alt="Male Model" className="model-img" />
                <Link to="/products?category=men's%20clothing" className="gender-pill">Him ❯</Link>
             </div>
             
             {/* Female Model Group */}
             <div className="model-group">
                <img src="/images/female_model.png" alt="Female Model" className="model-img" />
                <Link to="/products?category=women's%20clothing" className="gender-pill">Her ❯</Link>
             </div>
          </div>

          {/* Animated Text Ticker Marquee */}
          <div className="banner-marquee">
            <div className="marquee-content">
              <span>SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ </span>
              <span>SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ SHOP NOW ❯ </span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Dynamic Bank Promotions Banner Strip */}
      <BankOffers />

      {/* BUDGET BARGAINS */}
      <BudgetBargains />


      {/* SHOP BY CATEGORY */}
      <section className="home-section">
        <h2 className="section-title text-black">SHOP BY CATEGORY</h2>
        <div className="category-grid">
          {shopByCategory.map((cat, index) => (
            <Link to={cat.link} key={index} className="category-card">
              <div className="cat-img-wrapper">
                <img src={cat.img} alt={cat.title} />
              </div>
              <div className="cat-info">
                <span className="cat-title">{cat.title}</span>
                <span className="cat-offer">{cat.offer}</span>
                <span className="cat-shop-btn">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <FeaturedProductsFeed />

      {/* MULTI-CATEGORY CONTENT DENSITY EXPANSION */}
      <CategoryProductsFeed category="men's clothing" title="MEN'S ESSENTIALS" limit={4} />
      <CategoryProductsFeed category="women's clothing" title="WOMEN'S TRENDS" limit={4} />
      <CategoryProductsFeed category="genz" title="GENZ AESTHETIC" limit={4} />
      <CategoryProductsFeed category="beauty" title="BEAUTY & GROOMING" limit={4} />
      <CategoryProductsFeed category="kids" title="KIDS COLLECTION" limit={4} />

      <LiveSalesTicker />
      </div>
    </div>
  );
};

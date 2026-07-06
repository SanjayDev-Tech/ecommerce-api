import React from 'react';
import { Link } from 'react-router-dom';
import './BudgetBargains.css';

export const BudgetBargains = () => {
  const budgetBargains = [
    { title: "Premium Sneakers", subtitle: "UNDER ₹1499", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", link: "/products" },
    { title: "Casual Winter Hoodies", subtitle: "STARTING ₹799", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", link: "/products?category=men's%20clothing" },
    { title: "Minimalist Wallets", subtitle: "UNDER ₹499", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", link: "/products" },
    { title: "Tech Wear Bands", subtitle: "STARTING ₹899", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", link: "/products" },
    { title: "T-Shirts", subtitle: "UNDER ₹999", img: "/images/tshirt.png", link: "/products?category=men's%20clothing" },
    { title: "Workout-Ready Tops", subtitle: "UNDER ₹999", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80", link: "/products?category=women's%20clothing" },
    { title: "Tote Handbags", subtitle: "STARTING ₹699", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80", link: "/products" },
    { title: "Bold Sunglasses", subtitle: "UNDER ₹1299", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80", link: "/products" }
  ];

  const cloneArray = [...budgetBargains, ...budgetBargains];

  return (
    <section className="budget-bargains-section">
      <h2 className="section-title colored-title">BUDGET BARGAINS</h2>
      <div className="marquee-viewport">
        <div className="marquee-track">
          {cloneArray.map((item, index) => (
            <Link to={item.link} key={index} className="bargain-card">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="card-overlay">
                <span className="card-subtitle">{item.subtitle}</span>
                <span className="card-title">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

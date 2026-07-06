import React, { useState, useEffect } from 'react';
import './BankOffers.css';

export const BankOffers = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const offers = [
    {
      id: 1,
      banks: [
        { name: 'BOBCARD', color: '#ea580c' },
        { name: 'HSBC', color: '#dc2626' },
        { name: 'SBI Card', color: '#0284c7' }
      ],
      text: "10% Instant Discount*",
      subtext: ""
    },
    {
      id: 2,
      banks: [
        { name: 'Axis Bank', color: '#7c3aed' },
        { name: 'SBI Card', color: '#0284c7' }
      ],
      text: "Get 10% Savings*",
      subtext: "With Flipkart Axis Bank & SBI Credit Cards"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % offers.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <div className="bank-offers-wrapper">
      <div className="bank-strip-container">
        <div className="bank-offers-ticket bank-strip-parent">
          <div className="bank-offers-content">
          {offers.map((offer, idx) => (
            <div 
              key={offer.id} 
              className={`bank-offer-slide ${idx === activeIndex ? 'active' : ''}`}
            >
              <div className="bank-badges-row">
                {offer.banks.map((bank, i) => (
                  <span 
                    key={i} 
                    className="bank-badge" 
                    style={{ backgroundColor: bank.color }}
                  >
                    {bank.name}
                  </span>
                ))}
              </div>
              
              <div className="bank-offer-text-block">
                <span className="bank-offer-main-text">{offer.text}</span>
                {offer.subtext && <span className="bank-offer-subtext">{offer.subtext}</span>}
              </div>
            </div>
          ))}
          </div>
        </div>
        
        <div className="tc-label-node">
          *T&C Apply
        </div>
      </div>
    </div>
  );
};

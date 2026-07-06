import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import './ProductMetadata.css';

export const ProductMetadata = ({ product }) => {
  // Dummy data for customer photos
  const customerPhotos = [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=150&q=80",
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star 
        key={idx} 
        size={14} 
        className={idx < rating ? "star-active" : "star-inactive"} 
        fill={idx < rating ? "currentColor" : "none"} 
      />
    ));
  };

  return (
    <div className="product-metadata-engine">
      
      {/* 1. Product Specs Section */}
      <section className="metadata-section specs-section">
        <h3 className="section-title">PRODUCT DETAILS</h3>
        <p className="specs-description">
          Premium quality {product?.category || "product"} featuring comfortable fit and durable materials.
        </p>
        
        <h4 className="subsection-title">Material & Care</h4>
        <p className="specs-description">
          Upper material: Synthetic<br />
          Sole material: EVA<br />
          Wipe with a clean, dry cloth to remove dust.
        </p>

        <h4 className="subsection-title">Specifications</h4>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-key">Materials</span>
            <span className="spec-value">Synthetic</span>
          </div>
          <div className="spec-item">
            <span className="spec-key">Net Quantity</span>
            <span className="spec-value">2 Pieces</span>
          </div>
          <div className="spec-item">
            <span className="spec-key">Occasions</span>
            <span className="spec-value">Casual</span>
          </div>
          <div className="spec-item">
            <span className="spec-key">Sole Material</span>
            <span className="spec-value">EVA</span>
          </div>
          <div className="spec-item">
            <span className="spec-key">Patterns</span>
            <span className="spec-value">Solid/Printed</span>
          </div>
          <div className="spec-item">
            <span className="spec-key">Type</span>
            <span className="spec-value">Premium</span>
          </div>
        </div>
        <button className="see-more-link">See More</button>
      </section>

      <hr className="metadata-divider" />

      {/* 2. Ratings Audit Section */}
      <section className="metadata-section ratings-section">
        <h3 className="section-title">
          RATINGS <Star size={18} />
        </h3>
        
        <div className="ratings-audit-container">
          {/* Left Block: Oversized Number */}
          <div className="ratings-left-block">
            <div className="overall-rating">
              <span className="rating-number">{product?.rating?.rate || '4.2'}</span>
              <Star size={32} className="rating-star-icon" fill="currentColor" />
            </div>
            <div className="verified-buyers">
              {product?.rating?.count || '250'} Verified Buyers
            </div>
          </div>

          {/* Right Block: Breakdown Matrix */}
          <div className="ratings-right-block">
            {[
              { stars: 5, count: 155, percent: '62%' },
              { stars: 4, count: 45, percent: '18%' },
              { stars: 3, count: 15, percent: '6%' },
              { stars: 2, count: 11, percent: '4%' },
              { stars: 1, count: 24, percent: '10%' },
            ].map((row) => (
              <div key={row.stars} className="rating-bar-row">
                <span className="bar-star-label">{row.stars} <Star size={10} fill="currentColor" /></span>
                <div className="bar-track">
                  <div 
                    className={`bar-fill ${row.stars <= 2 ? 'bar-fill-low' : ''}`} 
                    style={{ width: row.percent }}
                  ></div>
                </div>
                <span className="bar-count">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="metadata-divider" />

      {/* 3. Customer Verification Ledgers */}
      <section className="metadata-section customer-verification-section">
        <h3 className="section-title">Customer Photos (22)</h3>
        
        {/* Customer Photos Row */}
        <div className="customer-photos-grid">
          {customerPhotos.map((photo, idx) => (
            <img key={idx} src={photo} alt={`Customer upload ${idx + 1}`} className="customer-photo-thumb" />
          ))}
        </div>

        <h3 className="section-title mt-8">Customer Reviews (39)</h3>
        
        {/* Individual Review Elements */}
        <div className="reviews-list">
          
          {/* Review 1 */}
          <div className="review-element">
            <div className="review-header">
              <div className="review-badge">
                5 <Star size={12} fill="currentColor" />
              </div>
              <p className="review-text">
                These very comfortable and classy slides... the colour is so classic and goes on any outfit. Budget friendly and durable. I was using this from 6 months and the stitching quality and the sole quality is still very good.
              </p>
            </div>
            <div className="review-photos">
              <img src={customerPhotos[0]} alt="Review visual" className="review-photo-thumb" />
            </div>
            <div className="review-footer">
              <span className="review-author">Atharv Patil | 5 Apr 2026</span>
              <div className="review-actions">
                <button className="action-btn"><ThumbsUp size={16} /> 0</button>
                <button className="action-btn"><ThumbsDown size={16} /> 0</button>
              </div>
            </div>
          </div>

          <hr className="review-divider" />

          {/* Review 2 */}
          <div className="review-element">
            <div className="review-header">
              <div className="review-badge">
                5 <Star size={12} fill="currentColor" />
              </div>
              <p className="review-text">
                Awesome quality! Exactly as shown in the picture. The fit is perfect and the material feels premium.
              </p>
            </div>
            <div className="review-photos">
              {customerPhotos.slice(1, 4).map((photo, idx) => (
                <img key={idx} src={photo} alt={`Review visual ${idx}`} className="review-photo-thumb" />
              ))}
            </div>
            <div className="review-footer">
              <span className="review-author">Deepika Vishnoi | 9 Feb 2026</span>
              <div className="review-actions">
                <button className="action-btn"><ThumbsUp size={16} /> 2</button>
                <button className="action-btn"><ThumbsDown size={16} /> 0</button>
              </div>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
};

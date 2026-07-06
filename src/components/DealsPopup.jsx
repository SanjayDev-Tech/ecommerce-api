import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DealsPopup.css';

export const DealsPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState('23:59:59');
    const navigate = useNavigate();
    
    // Store timeouts to ensure strict cleanup and prevent memory leaks
    const timeoutRef = useRef(null);

    // 1. State-Driven Session Limit & Delay Trigger
    useEffect(() => {
        // Initialize or fetch the impressions count from sessionStorage
        // Using sessionStorage as requested (localStorage is also fine, but session fits 'Session Limit' well)
        // Wait, prompt said "Use sessionStorage or localStorage". We'll use localStorage to persist across tabs.
        let impressions = parseInt(localStorage.getItem('deals_popup_impressions') || '0', 10);
        
        if (impressions === 0) {
            // Trigger 1 (First Visit): Instantly set visibility and increment
            setIsOpen(true);
            localStorage.setItem('deals_popup_impressions', '1');
        }

        return () => {
            // Strict cleanup on unmount
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // 2. Monospace Countdown Timer Engine
    useEffect(() => {
        let target = localStorage.getItem('deals_countdown_end');
        if (!target) {
            // Futuristic timestamp exactly 23 hours, 59 minutes, and 59 seconds ahead
            const timeToSet = 23 * 3600 * 1000 + 59 * 60 * 1000 + 59 * 1000;
            target = Date.now() + timeToSet;
            localStorage.setItem('deals_countdown_end', target.toString());
        } else {
            target = parseInt(target, 10);
        }

        const updateTimer = () => {
            const now = Date.now();
            const distance = target - now;

            if (distance <= 0) {
                setTimeLeft('00:00:00');
                return;
            }

            const h = Math.floor(distance / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            const hh = h.toString().padStart(2, '0');
            const mm = m.toString().padStart(2, '0');
            const ss = s.toString().padStart(2, '0');

            setTimeLeft(`${hh}:${mm}:${ss}`);
        };

        // Initial paint
        updateTimer();
        
        // 1-second interval loop
        const intervalId = setInterval(updateTimer, 1000);

        // Strict cleanup
        return () => clearInterval(intervalId);
    }, []);

    // Close Interface logic
    const handleClose = () => {
        setIsOpen(false);
        
        let impressions = parseInt(localStorage.getItem('deals_popup_impressions') || '0', 10);
        
        // Trigger 2 (Delayed Re-trigger)
        if (impressions === 1) {
            // Inject a setTimeout macro-task
            timeoutRef.current = setTimeout(() => {
                let currentImpressions = parseInt(localStorage.getItem('deals_popup_impressions') || '0', 10);
                // Check if deals_popup_impressions equals 1
                if (currentImpressions === 1) {
                    setIsOpen(true);
                    localStorage.setItem('deals_popup_impressions', '2');
                }
            }, 4000); // exactly 4 seconds
        }
    };

    const handleClaimOffer = () => {
        setIsOpen(false);
        navigate('/products/120');
    };

    if (!isOpen) return null;

    return (
        <div className="cro-popup-overlay">
            <div className="cro-popup-card">
                <button 
                    className="cro-popup-close" 
                    onClick={handleClose}
                    aria-label="Close modal"
                >
                    X
                </button>
                
                <div className="cro-popup-header">
                    <h2 className="cro-popup-title">Deals of the Day</h2>
                    <div className="cro-popup-timer">
                        {timeLeft}
                    </div>
                </div>
                
                <div className="cro-popup-body">
                    {/* High-quality mock product attributes */}
                    <div className="cro-popup-product">
                        <div className="cro-popup-image">
                            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200" alt="Oversized Graphic Hoodie" />
                        </div>
                        <div className="cro-popup-product-info">
                            <span className="cro-popup-product-title">Oversized Graphic Hoodie</span>
                            <div className="cro-popup-price-row">
                                <span className="cro-popup-price-current">$35.99</span>
                                <span className="cro-popup-price-old">$59.99</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        className="cro-popup-cta"
                        onClick={handleClaimOffer}
                    >
                        CLAIM OFFER ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

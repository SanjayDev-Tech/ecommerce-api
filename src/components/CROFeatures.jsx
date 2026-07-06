import React, { useState, useEffect } from 'react';
import './CROFeatures.css';

// 1. "DEALS OF THE DAY" Component
export const DealsOfTheDay = () => {
    const [timeLeft, setTimeLeft] = useState('23:59:59');

    useEffect(() => {
        let target = localStorage.getItem('deals_countdown_target');
        if (!target) {
            // 23 hours, 59 minutes, and 59 seconds in milliseconds
            const timeToSet = 23 * 3600 * 1000 + 59 * 60 * 1000 + 59 * 1000;
            target = Date.now() + timeToSet;
            localStorage.setItem('deals_countdown_target', target.toString());
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

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="cro-deals-container">
            <div className="cro-deals-header">
                <h2 className="cro-deals-title">Deals of the Day</h2>
                <div className="cro-deals-timer">
                    {timeLeft}
                </div>
            </div>
            <div className="cro-deals-body">
                {/* Sample Product Grid item inside the Deals container */}
                <div className="cro-deals-product">
                    <div className="cro-deals-image">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200" alt="Nike Air Max 270" />
                    </div>
                    <div className="cro-deals-product-info">
                        <span className="cro-deals-product-title">Nike Air Max 270</span>
                        <div className="cro-deals-price-row">
                            <span className="cro-deals-price-current">$129.99</span>
                            <span className="cro-deals-price-old">$160.00</span>
                        </div>
                    </div>
                </div>
                
                <div className="cro-deals-product">
                    <div className="cro-deals-image">
                        <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=200" alt="Urban Explorer Backpack" />
                    </div>
                    <div className="cro-deals-product-info">
                        <span className="cro-deals-product-title">Urban Explorer Backpack</span>
                        <div className="cro-deals-price-row">
                            <span className="cro-deals-price-current">$45.00</span>
                            <span className="cro-deals-price-old">$85.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Dynamic Product Inventory & Traffic Alert Engine
export const DynamicInventoryAlert = () => {
    const [isConditionA, setIsConditionA] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsConditionA((prev) => !prev);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="cro-inventory-wrapper">
            {/* The micro-badge / text overlay wrapper */}
            <div className="cro-inventory-badge-container">
                <div className={`cro-badge ${isConditionA ? 'active-a' : 'inactive-a'}`}>
                    <span className="cro-badge-text-a">
                        <span style={{ fontSize: '1rem', animation: 'pulse 2s infinite' }}>🔥</span> Only 3 items left in stock!
                    </span>
                </div>
                <div className={`cro-badge ${!isConditionA ? 'active-b' : 'inactive-b'}`}>
                    <span className="cro-badge-text-b">
                        <span style={{ fontSize: '1rem' }}>👁️</span> 14 people are viewing this right now
                    </span>
                </div>
            </div>
        </div>
    );
};

// 3. Live Sales Ticker Pop-up (Social Proof Toast)
const MOCK_SALES_DATA = [
    "Rahul from Mumbai recently purchased Oversized Graphic Hoodie (2 min ago)",
    "Amit from Delhi recently bought Cargo Parachute Pants (5 min ago)",
    "Sanjay from Kota recently added Vintage Wash Tee to bag (1 min ago)",
    "Priya from Bangalore recently purchased Cropped Denim Jacket (4 min ago)"
];

export const LiveSalesTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState('hidden'); // 'hidden', 'ingress', 'rest', 'egress'

    useEffect(() => {
        let timeout1, timeout2, timeout3;

        const runCycle = () => {
            setPhase('ingress');
            
            timeout1 = setTimeout(() => {
                setPhase('rest');
            }, 500);
            
            timeout2 = setTimeout(() => {
                setPhase('egress');
            }, 4500);
            
            timeout3 = setTimeout(() => {
                setPhase('hidden');
                setCurrentIndex((prev) => (prev + 1) % MOCK_SALES_DATA.length);
            }, 5000); 
        };

        runCycle();
        const intervalId = setInterval(runCycle, 8000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    return (
        <div className={`cro-ticker-popup phase-${phase}`} aria-live="polite">
            <div className="cro-ticker-capsule">
                <div className="cro-ticker-dot-wrapper">
                    <span className="cro-ticker-dot-ping"></span>
                    <span className="cro-ticker-dot-core"></span>
                </div>
                <p className="cro-ticker-text">
                    {MOCK_SALES_DATA[currentIndex]}
                </p>
            </div>
        </div>
    );
};

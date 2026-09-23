import React from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';

export default function CulinaryBackground() {
  const { theme } = useFoodCompare();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* 1. Fast Food Takeout Delivery Flatlay Image Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('/fastfood_bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        filter: isDark ? 'brightness(0.28) contrast(1.15)' : 'brightness(0.85) contrast(0.95)',
        transform: 'scale(1.02)',
        transition: 'filter 0.4s ease'
      }} />

      {/* 2. Dark Rustic Kitchen Vignette Tint to guarantee 100% text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark
          ? 'radial-gradient(ellipse at 50% 30%, rgba(18, 14, 11, 0.82) 0%, rgba(12, 9, 6, 0.94) 80%)'
          : 'radial-gradient(ellipse at 50% 30%, rgba(250, 246, 239, 0.85) 0%, rgba(243, 235, 224, 0.93) 80%)',
        transition: 'background 0.4s ease'
      }} />

      {/* 3. Subtle Animated Steam & Sizzle Wisps */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '6%',
        width: '180px',
        height: '180px',
        opacity: isDark ? 0.35 : 0.25
      }}>
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          {/* Steam wisps from hot fresh burgers */}
          <path
            d="M 60 120 Q 45 80 65 40 Q 75 20 70 0"
            fill="none"
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ animation: 'potSteamRise 3.6s infinite ease-out' }}
          />
          <path
            d="M 100 130 Q 120 90 95 50 Q 85 25 105 5"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ animation: 'potSteamRise 4s infinite 1s ease-out' }}
          />
          <path
            d="M 140 120 Q 160 85 135 45"
            fill="none"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animation: 'potSteamRise 3.4s infinite 1.8s ease-out' }}
          />
        </svg>
      </div>

      {/* 4. Drifting Golden Sesame Seeds & Herb Leaves */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '40px',
        height: '40px',
        animation: 'herbDrift 9s infinite ease-in-out',
        opacity: 0.3
      }}>
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <ellipse cx="20" cy="20" rx="4" ry="7" fill="#F59E0B" transform="rotate(30 20 20)" />
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '60%',
        left: '12%',
        width: '32px',
        height: '32px',
        animation: 'herbDrift 11s infinite 2.5s ease-in-out',
        opacity: 0.3
      }}>
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <path d="M 10 30 C 10 15, 30 10, 35 22 C 38 35, 18 38, 10 30 Z" fill="#2D6A4F" />
        </svg>
      </div>
    </div>
  );
}

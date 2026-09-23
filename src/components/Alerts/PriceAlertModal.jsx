import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  Bell,
  X,
  IndianRupee,
  ShieldCheck,
  CheckCircle,
  TrendingDown
} from 'lucide-react';

export default function PriceAlertModal() {
  const {
    showPriceAlertModal,
    setShowPriceAlertModal,
    activeComparison,
    setPriceAlerts,
    showToast
  } = useFoodCompare();

  const dish = activeComparison.dish;
  const currentBestPrice = dish?.platformPricing?.zomato?.basePrice || 249;
  const [targetPrice, setTargetPrice] = useState(Math.round(currentBestPrice * 0.85)); // 15% lower default

  if (!showPriceAlertModal || !dish) return null;

  const handleCreateAlert = (e) => {
    e.preventDefault();
    const newAlert = {
      id: `alert-${Date.now()}`,
      dishName: dish.name,
      restaurantName: activeComparison.restaurant.name,
      currentPrice: currentBestPrice,
      targetPrice: Number(targetPrice),
      active: true,
      createdDate: 'Just now'
    };

    setPriceAlerts(prev => [newAlert, ...prev]);
    setShowPriceAlertModal(false);
    showToast(`Price drop alert set for ${dish.name} at ₹${targetPrice}!`, 'success');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '28px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-glass-bright)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Set Price Drop Alert</h3>
          </div>

          <button
            onClick={() => setShowPriceAlertModal(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dish Info */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          padding: '12px',
          background: 'var(--bg-glass)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px'
        }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{dish.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Current Best Payable: <strong style={{ color: 'var(--deal-green)' }}>₹{currentBestPrice}</strong>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateAlert}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Notify me when final payable drops to or below:
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass-bright)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px'
            }}>
              <span style={{ fontWeight: 800, color: 'var(--deal-green)', fontSize: '1.1rem' }}>₹</span>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                min="50"
                max={currentBestPrice}
                required
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '6px' }}>
              You'll save ₹{currentBestPrice - targetPrice} when this target is reached across Swiggy, Zomato, or EatClub.
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            <TrendingDown size={16} /> Set Price Alert
          </button>
        </form>
      </div>
    </div>
  );
}

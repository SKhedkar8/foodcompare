import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  Tag,
  Copy,
  Check,
  Percent,
  Clock,
  ShieldCheck,
  Sparkles,
  Filter
} from 'lucide-react';

export default function DiscountVault() {
  const { couponsData, platformsData, showToast } = useFoodCompare();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  const filteredCoupons = selectedPlatform === 'all'
    ? couponsData
    : couponsData.filter(c => c.platformId === selectedPlatform);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Copied coupon code "${code}"!`, 'success');
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Banner */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="best-deal-badge" style={{ textTransform: 'none', fontSize: '0.8rem' }}>
            <Sparkles size={13} /> Live Coupon Engine
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>
          Discounts & Platform Offers
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Verified promotional codes, minimum order requirements, and maximum savings breakdown across delivery apps.
        </p>
      </div>

      {/* Platform Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`choice-chip ${selectedPlatform === 'all' ? 'active' : ''}`}
        >
          All Platforms ({couponsData.length})
        </button>
        {platformsData.map(plat => (
          <button
            key={plat.id}
            onClick={() => setSelectedPlatform(plat.id)}
            className={`choice-chip ${selectedPlatform === plat.id ? 'active' : ''}`}
          >
            {plat.name}
          </button>
        ))}
      </div>

      {/* Coupons Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredCoupons.map((coupon) => {
          const platform = platformsData.find(p => p.id === coupon.platformId);
          const isCopied = copiedCode === coupon.code;

          return (
            <div
              key={coupon.id}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Platform Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: platform?.brandColor || 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem'
                    }}>
                      {platform?.logoText[0] || 'P'}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{platform?.name}</span>
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--deal-green)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>

                {/* Coupon Value & Title */}
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
                  {coupon.title}
                </div>

                <div style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginBottom: '16px'
                }}>
                  <div>Minimum Order: <strong style={{ color: 'var(--text-main)' }}>₹{coupon.minOrder}</strong></div>
                  <div>Max Discount: <strong style={{ color: 'var(--text-main)' }}>₹{coupon.maxDiscount}</strong></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                    <Clock size={13} /> {coupon.expiry}
                  </div>
                </div>

                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-subtle)',
                  marginBottom: '20px',
                  background: 'var(--bg-glass)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  Terms: {coupon.terms}
                </p>
              </div>

              {/* Coupon Code Pill & Copy Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'var(--bg-glass)',
                border: '1px dashed var(--border-glass-bright)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag size={16} color="var(--primary-light)" />
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: 'var(--primary-light)'
                  }}>
                    {coupon.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="btn-secondary btn-sm"
                  style={{
                    padding: '4px 10px',
                    borderColor: isCopied ? 'var(--deal-green)' : 'var(--border-glass-bright)',
                    color: isCopied ? 'var(--deal-green)' : 'var(--text-main)'
                  }}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  {isCopied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

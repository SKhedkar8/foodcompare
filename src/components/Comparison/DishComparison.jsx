import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  Scale,
  Award,
  Clock,
  ShieldCheck,
  Tag,
  ExternalLink,
  Plus,
  Minus,
  Bell,
  ShoppingCart,
  Share2,
  Info,
  CheckCircle,
  TrendingDown
} from 'lucide-react';

export default function DishComparison() {
  const {
    activeComparison,
    computeDishComparison,
    addToCart,
    redirectToPlatform,
    setShowPriceAlertModal,
    showToast
  } = useFoodCompare();

  const [qty, setQty] = useState(activeComparison.quantity || 1);
  const [redirectingPlatform, setRedirectingPlatform] = useState(null);

  const dish = activeComparison.dish;
  const restaurant = activeComparison.restaurant;

  if (!dish || !restaurant) {
    return (
      <div style={{ maxWidth: '960px', margin: '40px auto', textAlign: 'center', padding: '30px' }}>
        <div className="glass-panel" style={{ padding: '40px 20px' }}>
          <h3>No Dish Selected for Comparison</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Please select a dish from the Food Companion or Restaurant Explorer to see side-by-side pricing across all 5 delivery platforms.
          </p>
        </div>
      </div>
    );
  }

  // Compute live breakdown for all 5 platforms
  const comparisonResults = computeDishComparison(dish, qty);

  const bestDeal = comparisonResults.find(r => r.isBestDeal) || comparisonResults[0];
  const worstDeal = comparisonResults[comparisonResults.length - 1];
  const maxSavings = worstDeal ? worstDeal.finalPayable - bestDeal.finalPayable : 0;

  const handleOrderPlatform = (platId, platName) => {
    setRedirectingPlatform(platName);
    redirectToPlatform(platId, dish, restaurant);
    setTimeout(() => {
      setRedirectingPlatform(null);
    }, 3500);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px', position: 'relative', zIndex: 1 }}>
      {/* Top Banner: Dish Details & Controls */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '16px',
              objectFit: 'cover',
              boxShadow: '0 8px 20px rgba(0,0,0,0.35)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`food-type-icon ${dish.isVeg ? 'veg' : 'non-veg'}`}></span>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                {dish.portion} • {restaurant.name}
              </span>
            </div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
              {dish.name}
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '580px' }}>
              {dish.description}
            </p>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px'
        }}>
          {/* Quantity Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-glass)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Qty:</span>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: '1px solid var(--border-glass-bright)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Minus size={14} />
            </button>
            <span style={{ fontWeight: 800, minWidth: '18px', textAlign: 'center', fontSize: '1.05rem' }}>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: '1px solid var(--border-glass-bright)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Plus size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => addToCart(dish, restaurant)}
              className="btn-secondary btn-sm"
              title="Add this dish to whole-cart comparison"
            >
              <ShoppingCart size={15} /> Add to Cart
            </button>

            <button
              onClick={() => setShowPriceAlertModal(true)}
              className="btn-secondary btn-sm"
              title="Alert me when price drops"
            >
              <Bell size={15} /> Price Alert
            </button>
          </div>
        </div>
      </div>

      {/* Best Deal Highlights Callout */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(45, 106, 79, 0.22) 0%, rgba(217, 119, 6, 0.18) 100%)',
        border: '1px solid var(--deal-green-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--deal-green-bright)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(45, 106, 79, 0.5)'
          }}>
            <Award size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>
                Cheapest Deal: {bestDeal.platform.name}
              </span>
              <span className="best-deal-badge">Lowest Payable</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Final Out-of-Pocket: <strong style={{ color: 'var(--deal-green-bright)', fontSize: '1.1rem' }}>₹{bestDeal.finalPayable}</strong> • 
              Save <strong style={{ color: 'var(--deal-green-bright)' }}>₹{maxSavings}</strong> compared to {worstDeal?.platform?.name} for the exact same dish!
            </div>
          </div>
        </div>

        <button
          onClick={() => handleOrderPlatform(bestDeal.platform.id, bestDeal.platform.name)}
          className="btn-primary"
          style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)' }}
        >
          <span>Direct Order on {bestDeal.platform.name}</span>
          <ExternalLink size={16} />
        </button>
      </div>

      {/* Side-by-Side 5-Platform Comparison Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {comparisonResults.map((item) => {
          const plat = item.platform;
          const brk = item.breakdown;
          const isBest = item.isBestDeal;

          return (
            <div
              key={plat.id}
              className={`glass-panel ${isBest ? 'best-deal-glow' : 'glass-panel-hover'}`}
              style={{
                padding: '20px 16px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {/* Best Deal Crown Badge */}
              {isBest && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '14px'
                }}>
                  <span className="best-deal-badge">
                    <Award size={12} /> Best Deal
                  </span>
                </div>
              )}

              <div>
                {/* Platform Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-glass)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: plat.brandColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem'
                    }}>
                      {plat.logoText[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{plat.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                        {plat.trustBadge}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-muted)'
                  }}>
                    {item.pricing.status || 'Verified'}
                  </span>
                </div>

                {/* Final Payable Box */}
                <div style={{
                  textAlign: 'center',
                  padding: '12px 8px',
                  background: isBest ? 'rgba(45, 106, 79, 0.12)' : 'var(--bg-glass)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '14px',
                  border: isBest ? '1px solid var(--deal-green-border)' : '1px solid var(--border-glass)'
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Final Payable
                  </div>
                  <div style={{
                    fontSize: '2.1rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: isBest ? 'var(--deal-green-bright)' : 'var(--text-main)',
                    lineHeight: 1.1,
                    margin: '3px 0'
                  }}>
                    ₹{item.finalPayable}
                  </div>
                  {isBest ? (
                    <div style={{ fontSize: '0.78rem', color: 'var(--deal-green-bright)', fontWeight: 700 }}>
                      ⚡ Lowest price across all apps
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                      +₹{item.finalPayable - bestDeal.finalPayable} vs best deal
                    </div>
                  )}
                </div>

                {/* Itemized Transparent Breakdown */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.82rem',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Base Menu ({qty}x)</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>₹{brk.subtotal}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Delivery Charge</span>
                    <span style={{ color: brk.delivery === 0 ? 'var(--deal-green-bright)' : 'var(--text-main)', fontWeight: 600 }}>
                      {brk.delivery === 0 ? 'FREE' : `₹${brk.delivery}`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Platform Fee</span>
                    <span style={{ color: brk.platform === 0 ? 'var(--deal-green-bright)' : 'var(--text-main)', fontWeight: 600 }}>
                      {brk.platform === 0 ? '₹0' : `₹${brk.platform}`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>GST (5%)</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>₹{brk.tax}</span>
                  </div>

                  {brk.discount > 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'var(--deal-green-bright)',
                      fontWeight: 700,
                      padding: '4px 0',
                      borderTop: '1px dashed var(--border-glass)'
                    }}>
                      <span>Discount</span>
                      <span>-₹{brk.discount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Deep-Link Action Button */}
              <div>
                <button
                  onClick={() => handleOrderPlatform(plat.id, plat.name)}
                  className={isBest ? 'btn-primary' : 'btn-secondary'}
                  style={{
                    width: '100%',
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem'
                  }}
                >
                  <span>Open on {plat.name}</span>
                  <ExternalLink size={14} />
                </button>

                <div style={{
                  textAlign: 'center',
                  fontSize: '0.7rem',
                  color: 'var(--text-subtle)',
                  marginTop: '6px'
                }}>
                  Direct link via FoodCompare API
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Calculation Breakdown Explanation */}
      <div className="glass-panel" style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} color="var(--secondary)" />
          Best Deal Calculator — Transparent Price Formula
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Unlike single-app aggregators that hide delivery surcharges until the checkout page, FoodCompare itemizes the exact payable total:
        </p>

        <div style={{
          background: 'var(--bg-glass)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'monospace',
          fontSize: '0.92rem',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          color: 'var(--text-main)'
        }}>
          <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>Final Out-Of-Pocket</span>
          <span>=</span>
          <span>Base Price</span>
          <span style={{ color: 'var(--text-muted)' }}>+</span>
          <span>Delivery Fee</span>
          <span style={{ color: 'var(--text-muted)' }}>+</span>
          <span>Platform Fee</span>
          <span style={{ color: 'var(--text-muted)' }}>+</span>
          <span>5% GST</span>
          <span style={{ color: 'var(--deal-green-bright)', fontWeight: 700 }}>− Valid Coupon Discount</span>
        </div>
      </div>
    </div>
  );
}

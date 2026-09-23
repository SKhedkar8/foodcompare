import React from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Award,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function CartComparison() {
  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    computeCartComparison,
    restaurantsData,
    addToCart,
    setActiveTab,
    showToast
  } = useFoodCompare();

  const cartCalculations = computeCartComparison();
  const bestCartDeal = cartCalculations[0];
  const worstCartDeal = cartCalculations[cartCalculations.length - 1];
  const totalCartSavings = worstCartDeal ? worstCartDeal.finalPayable - bestCartDeal.finalPayable : 0;

  // Sample quick add-ons (fries, drinks, desserts)
  const bk = restaurantsData.find(r => r.id === 'rest-4') || restaurantsData[1] || {};
  const behrouz = restaurantsData.find(r => r.id === 'rest-1') || restaurantsData[0] || {};
  const quickAddons = [
    {
      dish: bk.dishes?.find(d => d.id === 'dish-402') || bk.dishes?.[1],
      restaurant: bk
    },
    {
      dish: bk.dishes?.find(d => d.id === 'dish-403') || bk.dishes?.[2],
      restaurant: bk
    },
    {
      dish: behrouz.dishes?.find(d => d.id === 'dish-104') || behrouz.dishes?.[3] || behrouz.dishes?.[0],
      restaurant: behrouz
    }
  ].filter(item => item.dish && item.restaurant);

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '960px', margin: '40px auto', padding: '24px 16px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '60px 20px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'var(--bg-glass)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px'
          }}>
            <ShoppingCart size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Your Whole-Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 24px' }}>
            Add multiple dishes from any restaurant menu to see how platform fees, free-delivery thresholds, and bundle discounts compare across Swiggy, Zomato, and EatClub!
          </p>
          <button
            onClick={() => setActiveTab('restaurants')}
            className="btn-primary"
          >
            Explore Restaurants & Menus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Title Banner */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <span className="best-deal-badge" style={{ textTransform: 'none', fontSize: '0.8rem' }}>
            <Sparkles size={13} /> Multi-Item Cart Optimizer
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem' }}>
          Whole-Cart Price Comparison
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '680px' }}>
          Platform A might be cheaper on a single dish, but once drinks & sides are bundled, Platform B's free delivery threshold or capped platform fee can win. See the total order difference below:
        </p>
      </div>

      {/* Cart Items List + Whole Cart Platforms Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Left Column: Cart Items List */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-glass)'
          }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingCart size={18} color="var(--primary-light)" />
              Items in Cart ({cartItems.length})
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Cross-Platform Synced
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={`food-type-icon ${item.isVeg ? 'veg' : 'non-veg'}`}></span>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.name}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.portion} • {item.restaurantName}
                  </div>
                </div>

                {/* Qty Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => updateCartQty(item.id, -1)}
                    style={{
                      width: '26px',
                      height: '26px',
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
                    <Minus size={13} />
                  </button>
                  <span style={{ fontWeight: 700, minWidth: '16px', textAlign: 'center', fontSize: '0.95rem' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateCartQty(item.id, 1)}
                    style={{
                      width: '26px',
                      height: '26px',
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
                    <Plus size={13} />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-subtle)',
                      cursor: 'pointer',
                      padding: '4px',
                      marginLeft: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Suggestions */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Add Popular Sides to Test Free Delivery Thresholds:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quickAddons.map(({ dish, restaurant }) => (
                <div
                  key={dish.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-glass)',
                    fontSize: '0.82rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={`food-type-icon ${dish.isVeg ? 'veg' : 'non-veg'}`}></span>
                    <span>{dish.name}</span>
                  </div>
                  <button
                    onClick={() => addToCart(dish, restaurant)}
                    className="btn-secondary btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Whole-Cart Winner Callout & Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Best Cart Deal Callout */}
          <div className="glass-panel best-deal-glow" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="best-deal-badge">
                <Award size={14} /> Overall Cart Winner
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--deal-green)', fontWeight: 700 }}>
                Save ₹{totalCartSavings} on this full order!
              </span>
            </div>

            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              Order this cart on {bestCartDeal.platform.name}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Due to {bestCartDeal.platform.name}'s discounted platform fee and cart-level promotion, it delivers your whole meal for the lowest total out-of-pocket price.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              padding: '12px 16px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Payable:</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--deal-green)' }}>
                ₹{bestCartDeal.finalPayable}
              </span>
            </div>

            <button
              onClick={() => showToast(`Redirecting to ${bestCartDeal.platform.name} with full cart!`, 'success')}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <span>Order Full Cart on {bestCartDeal.platform.name}</span>
              <ExternalLink size={16} />
            </button>
          </div>

          {/* Quick Comparison Cards across all 3 platforms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cartCalculations.map((calc, idx) => {
              const isBest = idx === 0;
              return (
                <div
                  key={calc.platform.id}
                  className="glass-panel"
                  style={{
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderLeft: isBest ? '4px solid var(--deal-green)' : '1px solid var(--border-glass)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: calc.platform.brandColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem'
                    }}>
                      {calc.platform.logoText[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{calc.platform.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Delivery: {calc.deliveryFee === 0 ? 'FREE' : `₹${calc.deliveryFee}`} • Platform: ₹{calc.platformFee}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: isBest ? 'var(--deal-green)' : 'var(--text-main)'
                    }}>
                      ₹{calc.finalPayable}
                    </div>
                    {isBest ? (
                      <span style={{ fontSize: '0.72rem', color: 'var(--deal-green)', fontWeight: 700 }}>
                        Best Deal
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                        +₹{calc.finalPayable - bestCartDeal.finalPayable}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

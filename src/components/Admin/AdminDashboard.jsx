import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  SlidersHorizontal,
  Edit3,
  CheckCircle,
  RefreshCw,
  Plus,
  ShieldCheck,
  Building,
  Utensils,
  Percent,
  Database,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    restaurantsData,
    updateDishPrice,
    platformsData,
    activeComparison,
    selectDishForComparison,
    showToast
  } = useFoodCompare();

  const [selectedRestId, setSelectedRestId] = useState(restaurantsData[0].id);
  const currentRestaurant = restaurantsData.find(r => r.id === selectedRestId) || restaurantsData[0];
  const [selectedDishId, setSelectedDishId] = useState(currentRestaurant.dishes[0].id);
  const currentDish = currentRestaurant.dishes.find(d => d.id === selectedDishId) || currentRestaurant.dishes[0];

  const handlePriceChange = (platformId, field, value) => {
    updateDishPrice(currentRestaurant.id, currentDish.id, platformId, field, value);
  };

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Banner */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(99, 102, 241, 0.2)',
            color: 'var(--primary-light)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            Admin Control Panel
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>
          Platform Pricing & Verification Manager
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage restaurant menu dishes, simulate fee fluctuations (Platform fee, Delivery surge, Discounts), and observe real-time Best-Deal recalculations.
        </p>
      </div>

      {/* Main Admin Editor Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Left Column: Selectors */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="var(--primary-light)" />
            Select Restaurant & Dish
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Restaurant:
            </label>
            <select
              value={selectedRestId}
              onChange={(e) => {
                setSelectedRestId(e.target.value);
                const rest = restaurantsData.find(r => r.id === e.target.value);
                if (rest && rest.dishes.length > 0) {
                  setSelectedDishId(rest.dishes[0].id);
                }
              }}
              style={{
                width: '100%',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass-bright)',
                color: 'var(--text-main)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              {restaurantsData.map(r => (
                <option key={r.id} value={r.id} style={{ background: '#111827' }}>
                  {r.name} ({r.cityId.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Dish / Item:
            </label>
            <select
              value={selectedDishId}
              onChange={(e) => setSelectedDishId(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass-bright)',
                color: 'var(--text-main)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              {currentRestaurant.dishes.map(d => (
                <option key={d.id} value={d.id} style={{ background: '#111827' }}>
                  {d.name} ({d.portion})
                </option>
              ))}
            </select>
          </div>

          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
              Quick Preview of Selected Dish:
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img
                src={currentDish.image}
                alt={currentDish.name}
                style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{currentDish.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Category: {currentDish.category} • {currentDish.portion}
                </div>
              </div>
            </div>

            <button
              onClick={() => selectDishForComparison(currentDish, currentRestaurant)}
              className="btn-primary btn-sm"
              style={{ width: '100%', marginTop: '12px' }}
            >
              <Eye size={14} /> View in Side-by-Side Comparison
            </button>
          </div>
        </div>

        {/* Right Columns: Platform Fee Editors */}
        <div style={{ gridColumn: 'span 2' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit3 size={18} color="var(--primary-light)" />
              Live Price & Fee Matrix for "{currentDish.name}"
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {platformsData.map(plat => {
                const pricing = currentDish.platformPricing[plat.id] || {
                  basePrice: 249,
                  deliveryFee: 30,
                  platformFee: 5,
                  discount: 40,
                  status: 'Verified'
                };

                return (
                  <div
                    key={plat.id}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: plat.brandColor,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.75rem'
                      }}>
                        {plat.logoText[0]}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{plat.name}</span>
                    </div>

                    {/* Inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Base Dish Price (₹)
                        </label>
                        <input
                          type="number"
                          value={pricing.basePrice}
                          onChange={(e) => handlePriceChange(plat.id, 'basePrice', e.target.value)}
                          style={{
                            width: '100%',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-glass-bright)',
                            color: 'var(--text-main)',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Delivery Charge (₹)
                        </label>
                        <input
                          type="number"
                          value={pricing.deliveryFee}
                          onChange={(e) => handlePriceChange(plat.id, 'deliveryFee', e.target.value)}
                          style={{
                            width: '100%',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-glass-bright)',
                            color: 'var(--text-main)',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Platform Fee (₹)
                        </label>
                        <input
                          type="number"
                          value={pricing.platformFee}
                          onChange={(e) => handlePriceChange(plat.id, 'platformFee', e.target.value)}
                          style={{
                            width: '100%',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-glass-bright)',
                            color: 'var(--text-main)',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--deal-green)' }}>
                          Active Discount (₹)
                        </label>
                        <input
                          type="number"
                          value={pricing.discount}
                          onChange={(e) => handlePriceChange(plat.id, 'discount', e.target.value)}
                          style={{
                            width: '100%',
                            background: 'var(--bg-card)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            color: 'var(--deal-green)',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 700
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Verification Badge
                        </label>
                        <select
                          value={pricing.status || 'Verified'}
                          onChange={(e) => handlePriceChange(plat.id, 'status', e.target.value)}
                          style={{
                            width: '100%',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-glass-bright)',
                            color: 'var(--text-main)',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                          }}
                        >
                          <option value="Verified">Verified Live</option>
                          <option value="Estimated">Estimated</option>
                          <option value="Demo">Sample / Demo</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

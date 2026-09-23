import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  X,
  Scale,
  ShoppingCart,
  Star,
  Clock,
  MapPin,
  Tag,
  Check,
  Award
} from 'lucide-react';

export default function RestaurantMenu({ restaurant, onClose }) {
  const { selectDishForComparison, addToCart } = useFoodCompare();
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', ...new Set(restaurant.dishes.map(d => d.category))];

  const filteredDishes = selectedCat === 'All'
    ? restaurant.dishes
    : restaurant.dishes.filter(d => d.category === selectedCat);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 90,
      padding: '16px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid var(--border-glass-bright)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: 'var(--bg-card-hover)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>
              {restaurant.name}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⭐ {restaurant.rating} • {restaurant.cuisine.join(', ')} • {restaurant.deliveryTime}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 24px',
          borderBottom: '1px solid var(--border-glass)',
          overflowX: 'auto',
          background: 'var(--bg-glass)'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`choice-chip ${selectedCat === cat ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes List */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {filteredDishes.map(dish => {
            const minPrice = Math.min(
              dish.platformPricing.swiggy?.basePrice || 999,
              dish.platformPricing.zomato?.basePrice || 999,
              dish.platformPricing.eatclub?.basePrice || 999
            );

            return (
              <div
                key={dish.id}
                className="glass-panel"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  borderRadius: 'var(--radius-md)',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1, minWidth: '260px' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span className={`food-type-icon ${dish.isVeg ? 'veg' : 'non-veg'}`}></span>
                      <span style={{ fontWeight: 700, fontSize: '1rem' }}>{dish.name}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {dish.portion} • Spice: {dish.spiceLevel}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', maxWidth: '440px', lineHeight: 1.3 }}>
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '10px'
                }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Starts from</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--deal-green)' }}>
                      ₹{minPrice}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        selectDishForComparison(dish, restaurant);
                        onClose();
                      }}
                      className="btn-primary btn-sm"
                      style={{ padding: '7px 14px' }}
                    >
                      <Scale size={14} /> Compare Apps
                    </button>

                    <button
                      onClick={() => addToCart(dish, restaurant)}
                      className="btn-secondary btn-sm"
                      title="Add to Whole-Cart comparison"
                      style={{ padding: '7px 10px' }}
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

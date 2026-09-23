import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  MapPin,
  UtensilsCrossed,
  Filter,
  CheckCircle2,
  Scale
} from 'lucide-react';
import RestaurantMenu from './RestaurantMenu';

export default function RestaurantList() {
  const {
    restaurantsData,
    userLocation,
    selectDishForComparison,
    showMenuModal,
    setShowMenuModal,
    setActiveTab
  } = useFoodCompare();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'deliveryTime' | 'distance'

  const cuisines = ['All', 'Biryani', 'Pizza', 'Burgers', 'North Indian', 'Healthy', 'Italian'];

  // Filter restaurants
  const filteredRestaurants = restaurantsData.filter(rest => {
    const matchesSearch = rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'All' || rest.cuisine.includes(selectedCuisine);
    const matchesVeg = !pureVegOnly || rest.isPureVeg;
    return matchesSearch && matchesCuisine && matchesVeg;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
  });

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Explorer Banner */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>
          Explore Restaurants in {userLocation.zoneName}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Select any restaurant to view verified dishes and instantly compare live prices across Swiggy, Zomato, and EatClub.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 14px',
          minWidth: '280px',
          flex: 1
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants, cuisines, dishes..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Cuisine Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`choice-chip ${selectedCuisine === c ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Veg toggle & Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setPureVegOnly(!pureVegOnly)}
            className={`btn-secondary btn-sm ${pureVegOnly ? 'active' : ''}`}
            style={{
              borderColor: pureVegOnly ? 'var(--deal-green)' : 'var(--border-glass)',
              color: pureVegOnly ? 'var(--deal-green)' : 'var(--text-main)',
              background: pureVegOnly ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
            }}
          >
            <span className="food-type-icon veg"></span> Pure Veg
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-main)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="rating">Sort: Highest Rated</option>
            <option value="distance">Sort: Nearest First</option>
            <option value="deliveryTime">Sort: Fastest Delivery</option>
          </select>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {filteredRestaurants.map(rest => (
          <div
            key={rest.id}
            className="glass-panel glass-panel-hover"
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Restaurant Image Header */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={rest.image}
                  alt={rest.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 13, 22, 0.9) 0%, transparent 60%)'
                }}></div>

                {/* Rating Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(9, 13, 22, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#FBBF24'
                }}>
                  <Star size={14} fill="#FBBF24" /> {rest.rating}
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({rest.ratingCount})</span>
                </div>

                {/* Tagline / Special Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '14px',
                  fontSize: '0.75rem',
                  color: 'white',
                  background: 'rgba(99, 102, 241, 0.85)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  {rest.featuredTag}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '18px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>
                  {rest.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {rest.cuisine.join(' • ')}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {rest.deliveryTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {rest.distanceKm} km
                  </span>
                  <span>From ₹{rest.startingPrice}</span>
                </div>

                {/* Available Delivery Platforms */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '14px'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Platforms Compared:
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {rest.availablePlatforms.map(p => (
                      <span
                        key={p}
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          background: p === 'swiggy' ? 'rgba(252, 128, 25, 0.15)' : (p === 'zomato' ? 'rgba(226, 55, 68, 0.15)' : 'rgba(139, 92, 246, 0.15)'),
                          color: p === 'swiggy' ? 'var(--color-swiggy)' : (p === 'zomato' ? 'var(--color-zomato)' : 'var(--color-eatclub)')
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div style={{ padding: '0 18px 18px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowMenuModal(rest)}
                className="btn-primary"
                style={{ flex: 1, padding: '10px' }}
              >
                <UtensilsCrossed size={16} /> View Menu ({rest.dishes.length})
              </button>

              <button
                onClick={() => selectDishForComparison(rest.dishes[0], rest)}
                className="btn-secondary"
                title="Quick compare top dish"
                style={{ padding: '10px 14px' }}
              >
                <Scale size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Restaurant Menu Drawer Modal */}
      {showMenuModal && (
        <RestaurantMenu
          restaurant={showMenuModal}
          onClose={() => setShowMenuModal(null)}
        />
      )}
    </div>
  );
}

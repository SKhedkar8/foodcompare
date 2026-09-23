import React from 'react';
import { useFoodCompare } from '../context/FoodCompareContext';
import {
  Sparkles,
  Search,
  Scale,
  ShoppingCart,
  Tag,
  ShieldAlert,
  Moon,
  Sun,
  MapPin,
  User,
  SlidersHorizontal,
  Flame,
  Utensils
} from 'lucide-react';

export default function Header() {
  const {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    userLocation,
    userProfile,
    cartItems,
    setShowUserModal,
    activeComparison
  } = useFoodCompare();

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <header className="sticky-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: theme === 'dark' ? 'rgba(20, 17, 14, 0.88)' : 'rgba(250, 246, 239, 0.9)',
      borderBottom: '1px solid var(--border-glass)',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Natural Kitchen Live Ticker */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(194, 65, 12, 0.12), rgba(217, 119, 6, 0.14))',
        borderBottom: '1px solid var(--border-glass)',
        padding: '6px 16px',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--deal-green-bright)',
            boxShadow: '0 0 8px var(--deal-green-bright)'
          }}></span>
          <span><strong>Live Tracker:</strong> Comparing 5 apps (Swiggy, Zomato, EatClub, Magicpin, EatSure) in {userLocation.cityName}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--deal-green-bright)', fontWeight: 700 }}>
            <Flame size={14} /> Avg. User Savings: ₹46 / order
          </span>
          <span style={{ color: 'var(--text-subtle)' }}>Updated: Just now</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 15px rgba(194, 65, 12, 0.4)'
          }}>
            <Scale size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'var(--gradient-brand)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                FoodCompare
              </span>
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'rgba(217, 119, 6, 0.15)',
                color: 'var(--secondary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                border: '1px solid rgba(217, 119, 6, 0.3)'
              }}>
                Natural
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1 }}>
              One dish. Multiple platforms. Best price.
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-glass)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-glass)'
        }}>
          <button
            onClick={() => setActiveTab('companion')}
            className={`btn-secondary btn-sm ${activeTab === 'companion' ? 'active' : ''}`}
            style={{
              background: activeTab === 'companion' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'companion' ? '#FFFDF9' : 'var(--text-main)',
              borderColor: activeTab === 'companion' ? 'var(--primary)' : 'transparent'
            }}
          >
            <Sparkles size={16} /> Companion
          </button>

          <button
            onClick={() => setActiveTab('restaurants')}
            className={`btn-secondary btn-sm ${activeTab === 'restaurants' ? 'active' : ''}`}
            style={{
              background: activeTab === 'restaurants' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'restaurants' ? '#FFFDF9' : 'var(--text-main)',
              borderColor: activeTab === 'restaurants' ? 'var(--primary)' : 'transparent'
            }}
          >
            <Search size={16} /> Restaurants
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`btn-secondary btn-sm ${activeTab === 'comparison' ? 'active' : ''}`}
            style={{
              background: activeTab === 'comparison' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'comparison' ? '#FFFDF9' : 'var(--text-main)',
              borderColor: activeTab === 'comparison' ? 'var(--primary)' : 'transparent',
              position: 'relative'
            }}
          >
            <Scale size={16} /> Compare Apps
            {activeComparison && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--deal-green-bright)',
                position: 'absolute',
                top: '5px',
                right: '5px'
              }}></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`btn-secondary btn-sm ${activeTab === 'cart' ? 'active' : ''}`}
            style={{
              background: activeTab === 'cart' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'cart' ? '#FFFDF9' : 'var(--text-main)',
              borderColor: activeTab === 'cart' ? 'var(--primary)' : 'transparent',
              position: 'relative'
            }}
          >
            <ShoppingCart size={16} /> Cart
            {totalCartCount > 0 && (
              <span style={{
                background: 'var(--secondary)',
                color: 'white',
                borderRadius: '999px',
                padding: '1px 6px',
                fontSize: '0.7rem',
                fontWeight: 700,
                marginLeft: '3px'
              }}>
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`btn-secondary btn-sm ${activeTab === 'vault' ? 'active' : ''}`}
            style={{
              background: activeTab === 'vault' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'vault' ? '#FFFDF9' : 'var(--text-main)',
              borderColor: activeTab === 'vault' ? 'var(--primary)' : 'transparent'
            }}
          >
            <Tag size={16} /> Offers
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`btn-secondary btn-sm ${activeTab === 'admin' ? 'active' : ''}`}
            style={{
              background: activeTab === 'admin' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'admin' ? '#FFFDF9' : 'var(--text-main)',
              borderColor: activeTab === 'admin' ? 'var(--primary)' : 'transparent'
            }}
          >
            <SlidersHorizontal size={16} /> Admin
          </button>
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Location Badge */}
          <div
            onClick={() => setActiveTab('companion')}
            title="Click to change location in Companion"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <MapPin size={14} color="var(--primary-light)" />
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{userLocation.zoneName}</span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.75rem' }}>({userLocation.cityName})</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Warm Linen Light Mode' : 'Switch to Warm Obsidian Dark Mode'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User Account / Profile Modal Button */}
          <button
            onClick={() => setShowUserModal(true)}
            title="Edit Profile, Saved Deals & Alerts"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass-bright)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <User size={16} /> {userProfile.name}
          </button>
        </div>
      </div>
    </header>
  );
}

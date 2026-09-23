import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import { CITIES_AND_ZONES, PLATFORMS } from '../../data/mockData';
import {
  User,
  X,
  Scale,
  Bell,
  Trash2,
  CheckCircle,
  MapPin,
  ExternalLink,
  Sparkles,
  Edit3,
  Save,
  Phone,
  Mail,
  Flame
} from 'lucide-react';

export default function UserProfileModal() {
  const {
    showUserModal,
    setShowUserModal,
    userProfile,
    updateUserProfile,
    userLocation,
    setUserLocation,
    savedComparisons,
    setSavedComparisons,
    priceAlerts,
    setPriceAlerts,
    setActiveTab,
    showToast
  } = useFoodCompare();

  const [activeTab, setActiveModalTab] = useState('edit'); // 'edit' | 'comparisons' | 'alerts'

  // Editable Profile Form State
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    city: userProfile.city,
    zone: userProfile.zone,
    dietaryPreference: userProfile.dietaryPreference || 'all',
    spiceTolerance: userProfile.spiceTolerance || 'Medium',
    favoritePlatform: userProfile.favoritePlatform || 'zomato'
  });

  if (!showUserModal) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(formData);

    // If city or zone changed, update global location as well
    const matchedCity = CITIES_AND_ZONES.find(c => c.name.toLowerCase() === formData.city.toLowerCase());
    if (matchedCity) {
      const matchedZone = matchedCity.zones.find(z => z.name.toLowerCase() === formData.zone.toLowerCase()) || matchedCity.zones[0];
      setUserLocation({
        cityId: matchedCity.id,
        cityName: matchedCity.name,
        zoneId: matchedZone.id,
        zoneName: matchedZone.name,
        region: matchedZone.region
      });
    }
  };

  const removeAlert = (id) => {
    setPriceAlerts(prev => prev.filter(a => a.id !== id));
    showToast('Removed price alert', 'info');
  };

  const removeComparison = (id) => {
    setSavedComparisons(prev => prev.filter(s => s.id !== id));
    showToast('Removed saved comparison', 'info');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '620px',
        width: '100%',
        maxHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid var(--border-glass-bright)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'var(--bg-card-hover)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--gradient-brand)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{userProfile.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {userProfile.city} • {userProfile.dietaryPreference.toUpperCase()} Preference
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowUserModal(false)}
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

        {/* Modal Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-glass)',
          background: 'var(--bg-glass)'
        }}>
          <button
            onClick={() => setActiveModalTab('edit')}
            style={{
              flex: 1,
              padding: '12px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'edit' ? '2.5px solid var(--primary)' : 'none',
              color: activeTab === 'edit' ? 'var(--primary-light)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Edit3 size={15} /> Edit Profile
          </button>

          <button
            onClick={() => setActiveModalTab('comparisons')}
            style={{
              flex: 1,
              padding: '12px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'comparisons' ? '2.5px solid var(--primary)' : 'none',
              color: activeTab === 'comparisons' ? 'var(--primary-light)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Scale size={15} /> Saved Deals ({savedComparisons.length})
          </button>

          <button
            onClick={() => setActiveModalTab('alerts')}
            style={{
              flex: 1,
              padding: '12px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'alerts' ? '2.5px solid var(--primary)' : 'none',
              color: activeTab === 'alerts' ? 'var(--primary-light)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Bell size={15} /> Price Alerts ({priceAlerts.length})
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* TAB 1: EDIT PROFILE */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Full Name:
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '9px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '9px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  Email Address:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass-bright)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '9px 12px',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Default City:
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '9px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Default Area / Zone:
                  </label>
                  <input
                    type="text"
                    value={formData.zone}
                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '9px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  Dietary Food Preference:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'All Cuisines' },
                    { id: 'veg', label: '🌱 Pure Veg' },
                    { id: 'non-veg', label: '🍗 Non-Vegetarian' },
                    { id: 'vegan', label: '🥑 Vegan' }
                  ].map(d => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setFormData({ ...formData, dietaryPreference: d.id })}
                      className={`choice-chip ${formData.dietaryPreference === d.id ? 'active' : ''}`}
                      style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Preferred Spice Level:
                  </label>
                  <select
                    value={formData.spiceTolerance}
                    onChange={(e) => setFormData({ ...formData, spiceTolerance: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '9px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Mild">Mild (Kids & Gentle)</option>
                    <option value="Medium">Medium (Balanced)</option>
                    <option value="Fiery">Fiery & Spicy 🌶️</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    Favorite Delivery App:
                  </label>
                  <select
                    value={formData.favoritePlatform}
                    onChange={(e) => setFormData({ ...formData, favoritePlatform: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '9px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    {PLATFORMS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '12px', marginTop: '6px' }}
              >
                <Save size={16} /> Save Changes
              </button>
            </form>
          )}

          {/* TAB 2: SAVED DEALS */}
          {activeTab === 'comparisons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savedComparisons.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.dishName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.restaurantName} • Best on {item.platform} for <strong style={{ color: 'var(--deal-green-bright)' }}>₹{item.savedPrice}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setShowUserModal(false);
                        setActiveTab('comparison');
                      }}
                      className="btn-secondary btn-sm"
                      style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => removeComparison(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-subtle)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PRICE ALERTS */}
          {activeTab === 'alerts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {priceAlerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{alert.dishName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Target: <strong style={{ color: 'var(--deal-green-bright)' }}>₹{alert.targetPrice}</strong> (Current: ₹{alert.currentPrice})
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: 'var(--deal-green-bg)',
                      color: 'var(--deal-green-bright)',
                      fontWeight: 600
                    }}>
                      Tracking
                    </span>
                    <button
                      onClick={() => removeAlert(alert.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-subtle)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

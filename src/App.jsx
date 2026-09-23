import React from 'react';
import { useFoodCompare } from './context/FoodCompareContext';
import Header from './components/Header';
import CulinaryBackground from './components/Common/CulinaryBackground';
import LandingHero from './components/Home/LandingHero';
import FoodCompanion from './components/Companion/FoodCompanion';
import RestaurantList from './components/Restaurants/RestaurantList';
import DishComparison from './components/Comparison/DishComparison';
import CartComparison from './components/Comparison/CartComparison';
import DiscountVault from './components/Offers/DiscountVault';
import AdminDashboard from './components/Admin/AdminDashboard';
import PriceAlertModal from './components/Alerts/PriceAlertModal';
import UserProfileModal from './components/User/UserProfileModal';
import { Scale, Heart, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const {
    activeTab,
    toastNotification,
    setActiveTab
  } = useFoodCompare();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Animated Culinary Background (Sizzling Egg, Simmering Pot, Chopping Vegetables, Floating Herbs) */}
      <CulinaryBackground />

      {/* Header Navigation */}
      <Header />

      {/* Dynamic View Body */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {activeTab === 'home' && <LandingHero />}
        {activeTab === 'companion' && <FoodCompanion />}
        {activeTab === 'restaurants' && <RestaurantList />}
        {activeTab === 'comparison' && <DishComparison />}
        {activeTab === 'cart' && <CartComparison />}
        {activeTab === 'vault' && <DiscountVault />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      <PriceAlertModal />
      <UserProfileModal />

      {/* Global Toast Notification */}
      {toastNotification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 200,
          background: 'var(--bg-card)',
          border: '1px solid var(--deal-green-border)',
          boxShadow: 'var(--shadow-floating)',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '420px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{ color: 'var(--deal-green-bright)', display: 'flex', alignItems: 'center' }}>
            <CheckCircle2 size={20} />
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
            {toastNotification.message}
          </div>
        </div>
      )}

      {/* Natural Kitchen Footer */}
      <footer style={{
        marginTop: '60px',
        borderTop: '1px solid var(--border-glass)',
        background: 'var(--bg-card)',
        padding: '40px 20px 30px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Scale size={16} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                FoodCompare
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '460px' }}>
              Real-time transparent food delivery price comparison. Calculating base menu costs, platform fees, delivery surcharges, and active promo discounts across Swiggy, Zomato, EatClub, Magicpin, and EatSure.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('companion')} className="btn-secondary btn-sm">
              <Sparkles size={14} /> Companion
            </button>
            <button onClick={() => setActiveTab('comparison')} className="btn-secondary btn-sm">
              <Scale size={14} /> Compare 5 Apps
            </button>
            <button onClick={() => setActiveTab('cart')} className="btn-secondary btn-sm">
              Cart Optimizer
            </button>
            <button onClick={() => setActiveTab('vault')} className="btn-secondary btn-sm">
              Coupon Vault
            </button>
            <button onClick={() => setActiveTab('admin')} className="btn-secondary btn-sm">
              Admin Portal
            </button>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '24px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontSize: '0.78rem',
          color: 'var(--text-subtle)'
        }}>
          <div>
            © 2026 FoodCompare Inc. “One dish. Multiple platforms. Best price.”
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="var(--deal-green-bright)" />
            <span>Fair price transparency engine • Mumbai • Bengaluru • Delhi NCR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

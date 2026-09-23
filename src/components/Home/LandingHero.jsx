import React, { useState } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import {
  Sparkles,
  Scale,
  Search,
  ShoppingCart,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Award,
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function LandingHero() {
  const {
    setActiveTab,
    selectDishForComparison,
    restaurantsData,
    setSelectedCategory,
    setBudgetLimit,
    setDishPreference,
    showToast
  } = useFoodCompare();

  const [heroSearch, setHeroSearch] = useState('');

  // Default featured comparison dish from Behrouz
  const featuredRestaurant = restaurantsData[0];
  const featuredDish = featuredRestaurant.dishes[1]; // Lazeez Bhuna Murgh Biryani

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (!heroSearch.trim()) return;

    const lower = heroSearch.toLowerCase();
    if (lower.includes('biryani')) {
      setSelectedCategory('biryani');
      selectDishForComparison(featuredRestaurant.dishes[1], featuredRestaurant);
    } else if (lower.includes('pizza')) {
      setSelectedCategory('pizza');
      selectDishForComparison(restaurantsData[2].dishes[0], restaurantsData[2]);
    } else if (lower.includes('burger') || lower.includes('fries')) {
      setSelectedCategory('burgers');
      selectDishForComparison(restaurantsData[3].dishes[0], restaurantsData[3]);
    } else if (lower.includes('chole') || lower.includes('thali')) {
      setSelectedCategory('north-indian');
      selectDishForComparison(restaurantsData[5].dishes[0], restaurantsData[5]);
    } else if (lower.includes('waffle')) {
      setSelectedCategory('desserts');
      selectDishForComparison(restaurantsData[6].dishes[0], restaurantsData[6]);
    } else if (lower.includes('momo') || lower.includes('chinese')) {
      setSelectedCategory('chinese');
      selectDishForComparison(restaurantsData[7].dishes[0], restaurantsData[7]);
    } else {
      setActiveTab('companion');
    }
  };

  const handleChipClick = (query, cat, dishIdx, restIdx) => {
    setHeroSearch(query);
    setSelectedCategory(cat);
    selectDishForComparison(restaurantsData[restIdx].dishes[dishIdx], restaurantsData[restIdx]);
    showToast(`Loaded comparison for "${query}"`, 'info');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px 60px', position: 'relative', zIndex: 1 }}>
      {/* Main Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          background: 'rgba(217, 119, 6, 0.14)',
          border: '1px solid rgba(217, 119, 6, 0.3)',
          marginBottom: '20px'
        }}>
          <Sparkles size={15} color="var(--secondary)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--secondary)' }}>
            Comparing 5 Platforms: Swiggy • Zomato • EatClub • Magicpin • EatSure
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          lineHeight: 1.1,
          marginBottom: '18px',
          fontWeight: 800,
          letterSpacing: '-0.03em'
        }}>
          One dish. Multiple platforms.{' '}
          <span style={{
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Best price.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          Stop juggling apps just to compare delivery charges, platform surcharges, and discount codes. FoodCompare reveals the true out-of-pocket payable price and links you directly to the dish.
        </p>

        {/* Hero Natural Language Search Form */}
        <form
          onSubmit={handleQuickSearchSubmit}
          style={{
            maxWidth: '680px',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            padding: '8px 10px',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-floating)'
          }}
        >
          <div style={{ padding: '0 12px', color: 'var(--primary-light)' }}>
            <Search size={22} />
          </div>
          <input
            type="text"
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
            placeholder="Try: 'Chicken biryani under ₹300 near Andheri' or 'Chole Bhature'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '1.05rem',
              fontFamily: 'inherit'
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '12px 24px', borderRadius: 'var(--radius-lg)' }}
          >
            Compare Now
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '28px'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', alignSelf: 'center' }}>
            Popular:
          </span>
          <button
            onClick={() => handleChipClick('Lazeez Chicken Biryani under ₹300', 'biryani', 1, 0)}
            className="choice-chip"
            style={{ fontSize: '0.8rem' }}
          >
            🍗 Chicken Biryani
          </button>
          <button
            onClick={() => handleChipClick('Delhi Chole Bhature', 'north-indian', 0, 5)}
            className="choice-chip"
            style={{ fontSize: '0.8rem' }}
          >
            🥘 Chole Bhature
          </button>
          <button
            onClick={() => handleChipClick('Triple Chocolate Belgian Waffle', 'desserts', 0, 6)}
            className="choice-chip"
            style={{ fontSize: '0.8rem' }}
          >
            🧇 Belgian Waffle
          </button>
          <button
            onClick={() => handleChipClick('Darjeeling Steamed Momos', 'chinese', 0, 7)}
            className="choice-chip"
            style={{ fontSize: '0.8rem' }}
          >
            🥟 Darjeeling Momos
          </button>
          <button
            onClick={() => handleChipClick('Peri Peri Gourmet Pizza', 'pizza', 0, 2)}
            className="choice-chip"
            style={{ fontSize: '0.8rem' }}
          >
            🍕 Gourmet Pizza
          </button>
        </div>

        {/* Main CTA Dual Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('companion')}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1.05rem', borderRadius: 'var(--radius-lg)' }}
          >
            <Sparkles size={20} />
            <span>Start Food Companion</span>
          </button>

          <button
            onClick={() => {
              selectDishForComparison(featuredDish, featuredRestaurant);
              setActiveTab('comparison');
            }}
            className="btn-secondary"
            style={{ padding: '14px 24px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}
          >
            <Scale size={18} />
            <span>View Live Comparison Example</span>
          </button>
        </div>
      </div>

      {/* Flagship Comparison Spotlight Showcase (5 Platforms!) */}
      <div className="glass-panel" style={{
        padding: '30px',
        borderRadius: 'var(--radius-xl)',
        marginBottom: '60px',
        border: '1px solid var(--border-glass-bright)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="best-deal-badge">Live Case Study</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Andheri West, Mumbai • 5 Delivery Apps Analyzed
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              {featuredDish.name} ({featuredRestaurant.name})
            </h2>
          </div>

          <button
            onClick={() => {
              selectDishForComparison(featuredDish, featuredRestaurant);
              setActiveTab('comparison');
            }}
            className="btn-secondary btn-sm"
          >
            Open Side-by-Side View <ArrowRight size={14} />
          </button>
        </div>

        {/* 5-Platform Quick Comparison Preview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px'
        }}>
          {/* Swiggy */}
          <div className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: 'var(--color-swiggy)', marginBottom: '8px' }}>SWIGGY</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div>Base: ₹249</div>
              <div>Discount: -₹50</div>
              <div>Delivery: ₹30</div>
              <div>Platform: ₹5</div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Final:</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>₹249</span>
            </div>
          </div>

          {/* Zomato (Best Deal) */}
          <div className="glass-panel best-deal-glow" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, color: 'var(--color-zomato)' }}>ZOMATO</span>
              <span className="best-deal-badge" style={{ fontSize: '0.65rem' }}>Winner</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div>Base: ₹249</div>
              <div style={{ color: 'var(--deal-green-bright)', fontWeight: 700 }}>Discount: -₹80</div>
              <div>Delivery: ₹20</div>
              <div>Platform: ₹10</div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--deal-green-border)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--deal-green-bright)', fontWeight: 700 }}>Final:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--deal-green-bright)' }}>₹214</span>
            </div>
          </div>

          {/* EatClub */}
          <div className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: 'var(--color-eatclub)', marginBottom: '8px' }}>EATCLUB</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div>Base: ₹249</div>
              <div>Discount: -₹40</div>
              <div>Delivery: ₹25</div>
              <div>Platform: ₹5</div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Final:</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>₹254</span>
            </div>
          </div>

          {/* Magicpin */}
          <div className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: 'var(--color-magicpin)', marginBottom: '8px' }}>MAGICPIN</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div>Base: ₹240</div>
              <div>Discount: -₹55</div>
              <div>Delivery: ₹20</div>
              <div>Platform: ₹4</div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Final:</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>₹223</span>
            </div>
          </div>

          {/* EatSure */}
          <div className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 800, color: 'var(--color-eatsure)', marginBottom: '8px' }}>EATSURE</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div>Base: ₹239</div>
              <div>Discount: -₹45</div>
              <div>Delivery: ₹20</div>
              <div>Platform: ₹0</div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Final:</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>₹228</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Value Props Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(45, 106, 79, 0.18)',
            color: 'var(--deal-green-bright)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Award size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            Transparent Final Price
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Never fall for fake discounts or hidden platform surcharges. We compute Base + Delivery + Platform fee + Taxes − Coupons across 5 apps so you see what leaves your wallet.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(217, 119, 6, 0.15)',
            color: 'var(--secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ShoppingCart size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            Multi-Item Cart Optimizer
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Ordering a full meal with fries, drinks and waffles? Different apps have different free delivery thresholds (₹199 vs ₹299). Our cart comparator finds the true whole-order winner.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(194, 65, 12, 0.15)',
            color: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ExternalLink size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            1-Click Platform Redirection
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Found your best deal? Click any platform to open the exact dish and restaurant directly on Swiggy, Zomato, EatClub, Magicpin, or EatSure with coupons ready to apply.
          </p>
        </div>
      </div>
    </div>
  );
}

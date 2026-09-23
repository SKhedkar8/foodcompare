import React, { useState, useRef, useEffect } from 'react';
import { useFoodCompare } from '../../context/FoodCompareContext';
import { CITIES_AND_ZONES, CATEGORIES } from '../../data/mockData';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronLeft,
  CheckCircle2,
  Utensils,
  MapPin,
  IndianRupee,
  Search,
  Scale,
  Send
} from 'lucide-react';

export default function FoodCompanion() {
  const {
    userLocation,
    setUserLocation,
    selectedCategory,
    setSelectedCategory,
    dishPreference,
    setDishPreference,
    budgetLimit,
    setBudgetLimit,
    quantity,
    setQuantity,
    quietMode,
    setQuietMode,
    restaurantsData,
    selectDishForComparison,
    setActiveTab,
    showToast
  } = useFoodCompare();

  // Steps: 0: Welcome/Location, 1: Zone/Area, 2: Category, 3: Dish Preference, 4: Budget, 5: Results Ready
  const [currentStep, setCurrentStep] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [customBudgetInput, setCustomBudgetInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentStep]);

  // Current selected city object
  const currentCityObj = CITIES_AND_ZONES.find(c => c.id === userLocation.cityId) || CITIES_AND_ZONES[0];

  // Common dish suggestions based on category
  const getDishSuggestions = (cat) => {
    switch (cat) {
      case 'biryani':
        return ['Lazeez Bhuna Murgh Biryani (Chicken)', 'Dum Gosht Mutton Biryani', 'Shahi Paneer Biryani', 'Hyderabadi Handi Biryani'];
      case 'pizza':
        return ['Peri Peri Chicken Pizza', 'Margherita Classic', 'Stuffed Garlic Breadsticks', 'Farmhouse Supreme'];
      case 'burgers':
        return ['Crispy Chicken Double Patty', 'Peri Peri King Fries', 'Veg Makhani Burst', 'Whopper Deluxe'];
      case 'healthy':
        return ['Crispy Chicken Fiesta Bowl', 'Avocado Protein Salad', 'Quinoa Veggie Bowl'];
      default:
        return ['Chef Special Platter', 'Popular Combo Meal', 'Crispy Appetizer'];
    }
  };

  const budgetOptions = [
    { label: 'Under ₹150 (Snacks & Quick Bites)', value: 150 },
    { label: '₹150 – ₹300 (Standard Single Meal)', value: 300 },
    { label: '₹300 – ₹500 (Gourmet / Premium Handi)', value: 500 },
    { label: '₹500 – ₹1000 (Family Feast / Combo)', value: 1000 }
  ];

  // Natural Language Fast Parser
  const handleQuickNLP = (text) => {
    const lower = text.toLowerCase();
    let detectedCat = selectedCategory;
    let detectedBudget = budgetLimit;
    let detectedZone = userLocation.zoneId;

    // Detect category
    if (lower.includes('biryani')) detectedCat = 'biryani';
    else if (lower.includes('pizza')) detectedCat = 'pizza';
    else if (lower.includes('burger') || lower.includes('fries')) detectedCat = 'burgers';
    else if (lower.includes('healthy') || lower.includes('salad') || lower.includes('bowl')) detectedCat = 'healthy';

    // Detect budget numbers like 300, 250, 500
    const matchBudget = lower.match(/(under|below|budget|within)?\s*(?:₹|rs\.?|inr)?\s*(\d{2,4})/i);
    if (matchBudget && matchBudget[2]) {
      detectedBudget = parseInt(matchBudget[2], 10);
    }

    // Detect location keywords
    if (lower.includes('andheri')) detectedZone = 'andheri-west';
    else if (lower.includes('bandra')) detectedZone = 'bandra-west';
    else if (lower.includes('indiranagar')) {
      setUserLocation({
        cityId: 'bengaluru',
        cityName: 'Bengaluru',
        zoneId: 'indiranagar',
        zoneName: 'Indiranagar',
        region: 'East Bengaluru'
      });
      detectedZone = 'indiranagar';
    }

    setSelectedCategory(detectedCat);
    setBudgetLimit(detectedBudget);
    setDishPreference(text);
    setCurrentStep(5); // jump to matching results
    showToast(`Understood: "${text}" -> Found best match!`, 'success');
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    if (currentStep === 0) {
      // Freeform location search
      handleQuickNLP(customInput);
    } else if (currentStep === 3) {
      setDishPreference(customInput);
      setCurrentStep(4);
    } else {
      handleQuickNLP(customInput);
    }
    setCustomInput('');
  };

  const restartFlow = () => {
    setCurrentStep(0);
    showToast('Conversation reset. Ready to assist!', 'info');
  };

  // Matching restaurants based on selections
  const matchingRestaurants = restaurantsData.filter(r => {
    const matchesCity = r.cityId === userLocation.cityId;
    const hasCategory = r.dishes.some(d => d.category === selectedCategory);
    return matchesCity && hasCategory;
  });

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Companion Header Bar */}
      <div className="glass-panel" style={{
        padding: '16px 24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Food Ordering Companion
              <span style={{
                fontSize: '0.7rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--deal-green)',
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 600
              }}>
                Active Assistant
              </span>
            </h2>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
              Like texting a friend who has Swiggy, Zomato & EatClub open at the same time.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setQuietMode(!quietMode)}
            className="btn-secondary btn-sm"
            title={quietMode ? 'Enable friendly chatty mode' : 'Enable quiet / non-intrusive mode'}
          >
            {quietMode ? <VolumeX size={15} /> : <Volume2 size={15} />}
            {quietMode ? 'Quiet Mode' : 'Friendly Mode'}
          </button>

          <button
            onClick={restartFlow}
            className="btn-secondary btn-sm"
            title="Start search over"
          >
            <RotateCcw size={15} /> Restart
          </button>
        </div>
      </div>

      {/* Progress Stepper Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '0 8px'
      }}>
        {['City', 'Zone', 'Category', 'Preference', 'Budget', 'Deals'].map((stepName, idx) => (
          <div
            key={stepName}
            onClick={() => idx <= currentStep && setCurrentStep(idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: idx <= currentStep ? 'pointer' : 'default',
              opacity: idx <= currentStep ? 1 : 0.45,
              fontSize: '0.8rem',
              fontWeight: 600,
              color: idx === currentStep ? 'var(--primary-light)' : 'var(--text-muted)'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: idx < currentStep ? 'var(--deal-green)' : (idx === currentStep ? 'var(--primary)' : 'var(--bg-glass)'),
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {idx < currentStep ? '✓' : idx + 1}
            </div>
            <span>{stepName}</span>
          </div>
        ))}
      </div>

      {/* Interactive Chat Stream */}
      <div className="glass-panel" style={{
        padding: '24px',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        {/* Intro Message */}
        <div className="chat-bubble-bot animate-fade-in">
          <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--primary-light)' }}>
            Companion
          </div>
          {!quietMode ? (
            <p>
              Hey! Tell me what you're craving, or follow the quick steps below. I will calculate the live payable price across Swiggy, Zomato, and EatClub so you never overpay.
            </p>
          ) : (
            <p>Select your delivery location to compare live prices:</p>
          )}
        </div>

        {/* Step 0: City Selection */}
        <div className="animate-fade-in" style={{ paddingLeft: '8px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={15} color="var(--primary-light)" /> <strong>Step 1:</strong> Which city are you in?
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {CITIES_AND_ZONES.map(city => (
              <button
                key={city.id}
                onClick={() => {
                  setUserLocation(prev => ({
                    ...prev,
                    cityId: city.id,
                    cityName: city.name,
                    zoneId: city.zones[0].id,
                    zoneName: city.zones[0].name,
                    region: city.zones[0].region
                  }));
                  setCurrentStep(1);
                }}
                className={`choice-chip ${userLocation.cityId === city.id ? 'active' : ''}`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Zone Selection */}
        {currentStep >= 1 && (
          <div className="animate-fade-in" style={{ paddingLeft: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="var(--primary-light)" /> <strong>Step 2:</strong> Select your area/zone in {userLocation.cityName}:
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {currentCityObj.zones.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => {
                    setUserLocation(prev => ({
                      ...prev,
                      zoneId: zone.id,
                      zoneName: zone.name,
                      region: zone.region
                    }));
                    setCurrentStep(2);
                  }}
                  className={`choice-chip ${userLocation.zoneId === zone.id ? 'active' : ''}`}
                >
                  {zone.name} <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({zone.region})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Food Category Selection */}
        {currentStep >= 2 && (
          <div className="animate-fade-in" style={{ paddingLeft: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Utensils size={15} color="var(--primary-light)" /> <strong>Step 3:</strong> What food category are you craving?
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentStep(3);
                  }}
                  className={`choice-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Dish Preference */}
        {currentStep >= 3 && (
          <div className="animate-fade-in" style={{ paddingLeft: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} color="var(--primary-light)" /> <strong>Step 4:</strong> Pick a dish or style:
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {getDishSuggestions(selectedCategory).map(dishName => (
                <button
                  key={dishName}
                  onClick={() => {
                    setDishPreference(dishName);
                    setCurrentStep(4);
                  }}
                  className={`choice-chip ${dishPreference === dishName ? 'active' : ''}`}
                >
                  {dishName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Budget Range */}
        {currentStep >= 4 && (
          <div className="animate-fade-in" style={{ paddingLeft: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IndianRupee size={15} color="var(--deal-green)" /> <strong>Step 5:</strong> What is your max budget? (We filter by final payable amount, not just menu price):
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {budgetOptions.map(b => (
                <button
                  key={b.value}
                  onClick={() => {
                    setBudgetLimit(b.value);
                    setCurrentStep(5);
                  }}
                  className={`choice-chip ${budgetLimit === b.value ? 'active' : ''}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Matching Restaurants & Instant Comparison Launch */}
        {currentStep >= 5 && (
          <div className="animate-fade-in" style={{
            marginTop: '12px',
            padding: '18px',
            background: 'var(--bg-card-hover)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass-bright)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--deal-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} /> Matches Found Near {userLocation.zoneName}!
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Selected: <strong>{dishPreference}</strong> • Budget limit: <strong>₹{budgetLimit}</strong>
                </p>
              </div>
              <button
                onClick={() => setActiveTab('restaurants')}
                className="btn-secondary btn-sm"
              >
                Browse All Menus
              </button>
            </div>

            {/* Restaurant Quick Match Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {matchingRestaurants.map(rest => {
                const targetDish = rest.dishes.find(d => d.category === selectedCategory) || rest.dishes[0];
                return (
                  <div
                    key={rest.id}
                    className="glass-panel"
                    style={{
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img
                        src={rest.image}
                        alt={rest.name}
                        style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{rest.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          ⭐ {rest.rating} • {rest.deliveryTime} • {rest.distanceKm} km
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--bg-glass)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{targetDish.name}</div>
                        <div style={{ color: 'var(--deal-green)', fontWeight: 700 }}>
                          Starting ₹{targetDish.platformPricing.zomato.finalPayable || 214}
                        </div>
                      </div>

                      <button
                        onClick={() => selectDishForComparison(targetDish, rest)}
                        className="btn-primary btn-sm"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        <Scale size={14} /> Compare Prices
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Search & NLP Input Box */}
      <form
        onSubmit={handleInputSubmit}
        style={{
          marginTop: '16px',
          display: 'flex',
          gap: '10px',
          background: 'var(--bg-card)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-glass-bright)',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px', color: 'var(--primary)' }}>
          <Search size={20} />
        </div>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Try: 'Spicy chicken biryani near Andheri under ₹300' or ask a craving..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontSize: '0.92rem',
            fontFamily: 'inherit'
          }}
        />
        <button
          type="submit"
          className="btn-primary"
          style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)' }}
        >
          <span>Ask</span>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}

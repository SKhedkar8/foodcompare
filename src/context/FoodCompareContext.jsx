import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANTS, PLATFORMS, PLATFORM_COUPONS, CITIES_AND_ZONES, calculateFinalPrice } from '../data/mockData';

const FoodCompareContext = createContext();

export function FoodCompareProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState('dark');

  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'companion' | 'restaurants' | 'comparison' | 'cart' | 'vault' | 'admin'

  // Modals & Drawers
  const [showPriceAlertModal, setShowPriceAlertModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(null); // restaurant object or null
  const [toastNotification, setToastNotification] = useState(null);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Shreyas',
    email: 'shreyas@foodcompare.local',
    phone: '+91 98200 12345',
    city: 'Mumbai',
    zone: 'Andheri West',
    dietaryPreference: 'all', // 'all' | 'veg' | 'non-veg' | 'eggetarian' | 'vegan'
    spiceTolerance: 'Medium', // 'Mild' | 'Medium' | 'Fiery'
    favoritePlatform: 'zomato'
  });

  // Companion / User Requirements
  const [userLocation, setUserLocation] = useState({
    cityId: 'mumbai',
    cityName: 'Mumbai',
    zoneId: 'andheri-west',
    zoneName: 'Andheri West',
    region: 'Western Suburbs'
  });
  const [selectedCategory, setSelectedCategory] = useState('biryani');
  const [dishPreference, setDishPreference] = useState('Lazeez Bhuna Murgh Biryani (Chicken)');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [budgetLimit, setBudgetLimit] = useState(300);
  const [quantity, setQuantity] = useState(1);
  const [quietMode, setQuietMode] = useState(false);

  // Live Restaurants, Platforms & Coupons
  const [restaurantsData, setRestaurantsData] = useState(RESTAURANTS);
  const [platformsData, setPlatformsData] = useState(PLATFORMS);
  const [couponsData, setCouponsData] = useState(PLATFORM_COUPONS);

  // Default active comparison dish from Behrouz
  const defaultRestaurant = RESTAURANTS[0] || {};
  const defaultDish = defaultRestaurant.dishes?.[1] || defaultRestaurant.dishes?.[0] || {};
  const burgerKing = RESTAURANTS.find(r => r.id === 'rest-4') || RESTAURANTS[1] || {};
  const friesDish = burgerKing.dishes?.find(d => d.id === 'dish-402') || burgerKing.dishes?.[1] || {};
  const drinkDish = burgerKing.dishes?.find(d => d.id === 'dish-403') || burgerKing.dishes?.[2] || {};

  const [activeComparison, setActiveComparison] = useState({
    restaurant: defaultRestaurant,
    dish: defaultDish,
    quantity: 1,
    customAddons: []
  });

  // Whole-Cart Comparison Items
  const [cartItems, setCartItems] = useState([
    {
      id: 'cart-1',
      restaurantId: defaultRestaurant.id || 'rest-1',
      restaurantName: 'Behrouz Biryani',
      name: defaultDish.name || 'Lazeez Bhuna Murgh Biryani (Chicken)',
      portion: 'Serves 1-2',
      qty: 1,
      isVeg: false,
      platformPricing: defaultDish.platformPricing || {}
    },
    {
      id: 'cart-2',
      restaurantId: burgerKing.id || 'rest-4',
      restaurantName: 'Burger King',
      name: friesDish.name || 'Peri Peri King Fries (Large)',
      portion: 'Large (140g)',
      qty: 1,
      isVeg: true,
      platformPricing: friesDish.platformPricing || {}
    },
    {
      id: 'cart-3',
      restaurantId: burgerKing.id || 'rest-4',
      restaurantName: 'Burger King',
      name: drinkDish.name || 'Chilled Thums Up / Coke Can',
      portion: '300ml Can',
      qty: 1,
      isVeg: true,
      platformPricing: drinkDish.platformPricing || {}
    }
  ]);

  // Saved Comparisons
  const [savedComparisons, setSavedComparisons] = useState([
    {
      id: 'sc-1',
      dishName: 'Lazeez Bhuna Murgh Biryani',
      restaurantName: 'Behrouz Biryani',
      savedPrice: 214,
      platform: 'Zomato',
      savedAt: 'Today, 1:15 PM'
    },
    {
      id: 'sc-2',
      dishName: 'Delhi Style Chole Bhature',
      restaurantName: "Haldiram's",
      savedPrice: 195,
      platform: 'Magicpin',
      savedAt: 'Yesterday, 3:30 PM'
    }
  ]);

  // Price Drop Alerts
  const [priceAlerts, setPriceAlerts] = useState([
    {
      id: 'alert-1',
      dishName: 'Dum Gosht Mutton Biryani',
      restaurantName: 'Behrouz Biryani',
      currentPrice: 429,
      targetPrice: 380,
      active: true,
      createdDate: '16 Sep 2026'
    }
  ]);

  // Sync profile from backend on mount
  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.profile) {
          setUserProfile(prev => ({ ...prev, ...data.profile }));
        }
      })
      .catch(() => {
        // Fallback to local state if backend is still initializing
      });
  }, []);

  // Update Profile function
  const updateUserProfile = (updatedFields) => {
    const newProfile = { ...userProfile, ...updatedFields };
    setUserProfile(newProfile);

    // Save to backend
    fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile)
    }).catch(err => console.log('Profile sync error:', err));

    showToast('Profile updated successfully!', 'success');
  };

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToastNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastNotification(null);
    }, 4500);
  };

  // Direct Platform Redirection Deeplink Handler
  const redirectToPlatform = async (platformId, dish, restaurant) => {
    const dishName = dish?.name || activeComparison.dish?.name || '';
    const restaurantName = restaurant?.name || activeComparison.restaurant?.name || '';
    const city = userLocation.cityName || 'Mumbai';

    try {
      // Call backend API for tracking & deeplink generation
      const res = await fetch(`/api/redirect?platform=${platformId}&dishName=${encodeURIComponent(dishName)}&restaurantName=${encodeURIComponent(restaurantName)}&city=${encodeURIComponent(city)}`);
      const data = await res.json();

      const targetUrl = data.redirectUrl || `https://www.google.com/search?q=${encodeURIComponent(dishName + ' ' + restaurantName + ' ' + platformId)}`;

      showToast(`Opening "${dishName}" directly on ${platformId.toUpperCase()}...`, 'success');
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      // Direct client fallback if offline
      const directUrl = `https://www.google.com/search?q=${encodeURIComponent(dishName + ' ' + restaurantName + ' on ' + platformId)}`;
      window.open(directUrl, '_blank', 'noopener,noreferrer');
      showToast(`Redirecting to ${platformId}...`, 'info');
    }
  };

  // Compare helper for the active dish
  const computeDishComparison = (dish, currentQty = 1) => {
    if (!dish || !dish.platformPricing) return [];

    const results = platformsData.map((plat) => {
      const pricing = dish.platformPricing[plat.id] || {
        basePrice: dish.platformPricing.swiggy?.basePrice || 250,
        deliveryFee: plat.baseDeliveryFee,
        platformFee: plat.basePlatformFee,
        taxes: 15,
        otherCharges: 0,
        discount: 30,
        status: 'Estimated'
      };

      const baseCalculated = pricing.basePrice * currentQty;
      const taxesCalculated = Math.round(baseCalculated * 0.05);

      let effectiveDelivery = pricing.deliveryFee;
      if (plat.freeDeliveryThreshold && baseCalculated >= plat.freeDeliveryThreshold) {
        effectiveDelivery = 0;
      }

      const breakdown = calculateFinalPrice({
        basePrice: baseCalculated,
        deliveryFee: effectiveDelivery,
        platformFee: pricing.platformFee,
        taxes: taxesCalculated,
        otherCharges: pricing.otherCharges,
        discount: pricing.discount
      });

      return {
        platform: plat,
        pricing: {
          ...pricing,
          deliveryFee: effectiveDelivery,
          taxes: taxesCalculated,
          basePrice: baseCalculated
        },
        breakdown,
        finalPayable: breakdown.finalPayable
      };
    });

    results.sort((a, b) => a.finalPayable - b.finalPayable);

    return results.map((item, idx) => ({
      ...item,
      isBestDeal: idx === 0,
      savingsVsWorst: results[results.length - 1].finalPayable - item.finalPayable
    }));
  };

  // Whole cart comparison across platforms
  const computeCartComparison = () => {
    return platformsData.map((plat) => {
      let subtotal = 0;
      let totalDiscount = 0;
      let totalTax = 0;

      cartItems.forEach((item) => {
        const itemPricing = item.platformPricing?.[plat.id] || item.platformPricing?.swiggy || {
          basePrice: 150,
          discount: 10
        };
        const itemBase = (itemPricing.basePrice || 0) * (item.qty || 1);
        subtotal += itemBase;
        totalDiscount += (itemPricing.discount || 0);
      });

      totalTax = Math.round(subtotal * 0.05);

      let deliveryFee = plat.baseDeliveryFee;
      if (subtotal >= plat.freeDeliveryThreshold) {
        deliveryFee = 0;
      }

      const platformFee = plat.basePlatformFee;

      let couponBonus = 0;
      if (plat.id === 'zomato' && subtotal >= 299) couponBonus = 35;
      if (plat.id === 'swiggy' && subtotal >= 399) couponBonus = 40;
      if (plat.id === 'eatclub') couponBonus = 25;
      if (plat.id === 'magicpin' && subtotal >= 249) couponBonus = 50;
      if (plat.id === 'eatsure' && subtotal >= 199) couponBonus = 30;

      const finalPayable = Math.max(0, (subtotal + deliveryFee + platformFee + totalTax) - (totalDiscount + couponBonus));

      return {
        platform: plat,
        subtotal,
        deliveryFee,
        platformFee,
        totalTax,
        totalDiscount: totalDiscount + couponBonus,
        finalPayable
      };
    }).sort((a, b) => a.finalPayable - b.finalPayable);
  };

  const addToCart = (dish, restaurant) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === dish.name);
      if (existing) {
        return prev.map(i => i.name === dish.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        id: `cart-${Date.now()}`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        name: dish.name,
        portion: dish.portion,
        qty: 1,
        isVeg: dish.isVeg,
        platformPricing: dish.platformPricing
      }];
    });
    showToast(`Added ${dish.name} to Cart Comparison!`, 'success');
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    showToast('Removed item from cart comparison', 'info');
  };

  const updateCartQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const selectDishForComparison = (dish, restaurant) => {
    setActiveComparison({
      restaurant,
      dish,
      quantity: 1,
      customAddons: []
    });
    setActiveTab('comparison');
    showToast(`Comparing 5 platforms for "${dish.name}"`, 'info');
  };

  const updateDishPrice = (restaurantId, dishId, platformId, field, value) => {
    setRestaurantsData(prev => prev.map(r => {
      if (r.id !== restaurantId) return r;
      return {
        ...r,
        dishes: r.dishes.map(d => {
          if (d.id !== dishId) return d;
          return {
            ...d,
            platformPricing: {
              ...d.platformPricing,
              [platformId]: {
                ...d.platformPricing[platformId],
                [field]: Number(value) || value
              }
            }
          };
        })
      };
    }));

    if (activeComparison.dish?.id === dishId) {
      setActiveComparison(prev => ({
        ...prev,
        dish: {
          ...prev.dish,
          platformPricing: {
            ...prev.dish.platformPricing,
            [platformId]: {
              ...prev.dish.platformPricing[platformId],
              [field]: Number(value) || value
            }
          }
        }
      }));
    }
    showToast(`Updated ${platformId.toUpperCase()} ${field} to ${value}`, 'success');
  };

  return (
    <FoodCompareContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        userProfile,
        updateUserProfile,
        userLocation,
        setUserLocation,
        selectedCategory,
        setSelectedCategory,
        dishPreference,
        setDishPreference,
        dietaryFilter,
        setDietaryFilter,
        budgetLimit,
        setBudgetLimit,
        quantity,
        setQuantity,
        quietMode,
        setQuietMode,
        restaurantsData,
        platformsData,
        couponsData,
        activeComparison,
        setActiveComparison,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        selectDishForComparison,
        computeDishComparison,
        computeCartComparison,
        updateDishPrice,
        redirectToPlatform,
        showPriceAlertModal,
        setShowPriceAlertModal,
        showUserModal,
        setShowUserModal,
        showMenuModal,
        setShowMenuModal,
        savedComparisons,
        setSavedComparisons,
        priceAlerts,
        setPriceAlerts,
        toastNotification,
        showToast
      }}
    >
      {children}
    </FoodCompareContext.Provider>
  );
}

export function useFoodCompare() {
  const context = useContext(FoodCompareContext);
  if (!context) {
    throw new Error('useFoodCompare must be used within a FoodCompareProvider');
  }
  return context;
}

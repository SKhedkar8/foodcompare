// Expanded Mock Data for FoodCompare Platform with 5 Cities, 30+ Zones, GPS Coordinates, 5 Delivery Platforms, 9 Restaurants

export const CITIES_AND_ZONES = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    zones: [
      { id: 'andheri-west', name: 'Andheri West', region: 'Western Suburbs', lat: 19.1363, lng: 72.8277 },
      { id: 'andheri-east', name: 'Andheri East', region: 'Western Suburbs', lat: 19.1136, lng: 72.8697 },
      { id: 'bandra-west', name: 'Bandra West', region: 'Western Suburbs', lat: 19.0596, lng: 72.8295 },
      { id: 'juhu', name: 'Juhu', region: 'Western Suburbs', lat: 19.1075, lng: 72.8263 },
      { id: 'powai', name: 'Powai', region: 'Central Suburbs', lat: 19.1176, lng: 72.9060 },
      { id: 'lower-parel', name: 'Lower Parel', region: 'South Mumbai', lat: 19.0006, lng: 72.8302 },
      { id: 'dadar', name: 'Dadar', region: 'Central Mumbai', lat: 19.0178, lng: 72.8478 },
      { id: 'malad-west', name: 'Malad West', region: 'Western Suburbs', lat: 19.1860, lng: 72.8485 },
      { id: 'borivali-west', name: 'Borivali West', region: 'Western Suburbs', lat: 19.2307, lng: 72.8567 },
      { id: 'thane-west', name: 'Thane West', region: 'Extended Suburbs', lat: 19.2183, lng: 72.9781 }
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    zones: [
      { id: 'koramangala', name: 'Koramangala', region: 'South Bengaluru', lat: 12.9352, lng: 77.6245 },
      { id: 'indiranagar', name: 'Indiranagar', region: 'East Bengaluru', lat: 12.9784, lng: 77.6408 },
      { id: 'hsr-layout', name: 'HSR Layout', region: 'South Bengaluru', lat: 12.9121, lng: 77.6446 },
      { id: 'whitefield', name: 'Whitefield', region: 'East Bengaluru', lat: 12.9698, lng: 77.7500 },
      { id: 'jp-nagar', name: 'JP Nagar', region: 'South Bengaluru', lat: 12.9063, lng: 77.5857 },
      { id: 'bellandur', name: 'Bellandur', region: 'South-East Bengaluru', lat: 12.9304, lng: 77.6784 },
      { id: 'jayanagar', name: 'Jayanagar', region: 'South Bengaluru', lat: 12.9308, lng: 77.5838 },
      { id: 'electronic-city', name: 'Electronic City', region: 'South Bengaluru', lat: 12.8452, lng: 77.6602 }
    ]
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    lat: 28.6139,
    lng: 77.2090,
    zones: [
      { id: 'connaught-place', name: 'Connaught Place', region: 'Central Delhi', lat: 28.6315, lng: 77.2167 },
      { id: 'cyber-city', name: 'Cyber City, Gurgaon', region: 'NCR West', lat: 28.4950, lng: 77.0895 },
      { id: 'hauz-khas', name: 'Hauz Khas', region: 'South Delhi', lat: 28.5494, lng: 77.2001 },
      { id: 'noida-sec18', name: 'Noida Sector 18', region: 'NCR East', lat: 28.5708, lng: 77.3260 },
      { id: 'south-ex', name: 'South Extension', region: 'South Delhi', lat: 28.5726, lng: 77.2222 },
      { id: 'dwarka', name: 'Dwarka', region: 'South West Delhi', lat: 28.5921, lng: 77.0460 }
    ]
  },
  {
    id: 'pune',
    name: 'Pune',
    lat: 18.5204,
    lng: 73.8567,
    zones: [
      { id: 'koregaon-park', name: 'Koregaon Park', region: 'East Pune', lat: 18.5362, lng: 73.8940 },
      { id: 'kothrud', name: 'Kothrud', region: 'West Pune', lat: 18.5074, lng: 73.8077 },
      { id: 'viman-nagar', name: 'Viman Nagar', region: 'North-East Pune', lat: 18.5679, lng: 73.9143 },
      { id: 'baner', name: 'Baner', region: 'North-West Pune', lat: 18.5590, lng: 73.7868 },
      { id: 'hinjewadi', name: 'Hinjewadi Infotech Park', region: 'West Pune', lat: 18.5913, lng: 73.7389 }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
    zones: [
      { id: 'hitec-city', name: 'Hitec City (Cyberabad)', region: 'West Hyderabad', lat: 17.4435, lng: 78.3772 },
      { id: 'jubilee-hills', name: 'Jubilee Hills', region: 'Central-West Hyderabad', lat: 17.4319, lng: 78.4073 },
      { id: 'banjara-hills', name: 'Banjara Hills', region: 'Central Hyderabad', lat: 17.4156, lng: 78.4350 },
      { id: 'gachibowli', name: 'Gachibowli', region: 'West Hyderabad', lat: 17.4401, lng: 78.3489 },
      { id: 'madhapur', name: 'Madhapur', region: 'West Hyderabad', lat: 17.4483, lng: 78.3915 }
    ]
  }
];

export const CATEGORIES = [
  { id: 'burgers', name: 'Burgers & Fast Food', icon: '🍔', description: 'Crispy Double Patties, Fries & Shakes' },
  { id: 'biryani', name: 'Biryani & Kebabs', icon: '🍚', description: 'Hyderabadi, Dum, Kolkata & Lucknowi' },
  { id: 'pizza', name: 'Pizza & Breads', icon: '🍕', description: 'Woodfired, Pan & Sourdough Slices' },
  { id: 'north-indian', name: 'North Indian & Thalis', icon: '🥘', description: 'Chole Bhature, Paneer & Naans' },
  { id: 'chinese', name: 'Momos & Chinese', icon: '🥟', description: 'Darjeeling Momos, Hakka Noodles & Manchurian' },
  { id: 'healthy', name: 'Healthy Bowls & Subs', icon: '🥗', description: 'Fresh Subs, Protein Bowls & Salads' },
  { id: 'desserts', name: 'Waffles & Desserts', icon: '🧇', description: 'Belgian Waffles, Gulab Jamun & Shakes' },
  { id: 'beverages', name: 'Beverages & Coolers', icon: '🥤', description: 'Chilled Colas, Mocktails & Chai' }
];

export const PLATFORMS = [
  {
    id: 'swiggy',
    name: 'Swiggy',
    brandColor: '#FC8019',
    tagline: 'Lightning fast 25-35 min delivery',
    logoText: 'SWIGGY',
    basePlatformFee: 7,
    freeDeliveryThreshold: 299,
    baseDeliveryFee: 35,
    surgeFee: 25, // Active during rain / peak dinner
    surgePolicy: 'Dynamic demand & rain surge applies',
    rating: 4.6,
    trustBadge: 'Verified Live API'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    brandColor: '#E23744',
    tagline: 'Deep discounts & Gold member perks',
    logoText: 'ZOMATO',
    basePlatformFee: 8,
    freeDeliveryThreshold: 349,
    baseDeliveryFee: 30,
    surgeFee: 20, // Active during rain / peak dinner
    surgePolicy: 'Surge applies during bad weather & high traffic',
    rating: 4.7,
    trustBadge: 'Official Pricing Feed'
  },
  {
    id: 'eatclub',
    name: 'EatClub',
    brandColor: '#7C3AED',
    tagline: 'Zero Platform Fee + Flat Member Rates',
    logoText: 'EATCLUB',
    basePlatformFee: 0,
    freeDeliveryThreshold: 199,
    baseDeliveryFee: 20,
    surgeFee: 0, // Zero surge guarantee!
    surgePolicy: 'Zero Surge Fee Guarantee — Always Flat',
    rating: 4.8,
    trustBadge: 'Zero Surge Guarantee'
  },
  {
    id: 'magicpin',
    name: 'Magicpin',
    brandColor: '#10B981',
    tagline: 'Local hyper-savings with Magic Coins',
    logoText: 'MAGICPIN',
    basePlatformFee: 4,
    freeDeliveryThreshold: 249,
    baseDeliveryFee: 25,
    surgeFee: 0,
    surgePolicy: 'Merchant direct savings — No hidden rain fees',
    rating: 4.5,
    trustBadge: 'Merchant Direct Savings'
  },
  {
    id: 'eatsure',
    name: 'EatSure',
    brandColor: '#D97706',
    tagline: 'Zero artificial colors & Multi-Brand cart',
    logoText: 'EATSURE',
    basePlatformFee: 0,
    freeDeliveryThreshold: 249,
    baseDeliveryFee: 25,
    surgeFee: 0,
    surgePolicy: 'Zero surge & zero packaging guarantee',
    rating: 4.7,
    trustBadge: 'Clean Food Guarantee'
  }
];

export const RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Behrouz Biryani - The Royal Heritage',
    cuisine: ['Biryani', 'Mughlai', 'North Indian'],
    rating: 4.4,
    ratingCount: '12.4k+',
    deliveryTime: '28-35 mins',
    distanceKm: 2.3,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1345,
    lng: 72.8310,
    address: 'Shop 4, Greenfield Plaza, Near Infinity Mall, Andheri West, Mumbai',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin', 'eatsure'],
    startingPrice: 249,
    isPureVeg: false,
    featuredTag: 'Royal Recipe & Fragrant Spices',
    dishes: [
      {
        id: 'dish-101',
        name: 'Dum Gosht Mutton Biryani',
        description: 'Succulent pieces of spiced mutton layered with fragrant long-grain basmati rice and royal saffron aroma.',
        category: 'biryani',
        portion: 'Serves 1-2 (500g)',
        isVeg: false,
        spiceLevel: 'Medium',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 429, deliveryFee: 35, platformFee: 7, taxes: 24, otherCharges: 10, discount: 60, status: 'Verified' },
          zomato: { basePrice: 429, deliveryFee: 25, platformFee: 9, taxes: 24, otherCharges: 12, discount: 85, status: 'Verified' },
          eatclub: { basePrice: 399, deliveryFee: 0, platformFee: 0, taxes: 20, otherCharges: 0, discount: 40, status: 'Verified' },
          magicpin: { basePrice: 410, deliveryFee: 25, platformFee: 4, taxes: 21, otherCharges: 0, discount: 70, status: 'Verified' },
          eatsure: { basePrice: 399, deliveryFee: 20, platformFee: 0, taxes: 20, otherCharges: 0, discount: 50, status: 'Verified' }
        }
      },
      {
        id: 'dish-102',
        name: 'Lazeez Bhuna Murgh Biryani (Chicken)',
        description: 'Tender marinated chicken cooked in delicate bhuna spices, nestled in aromatic basmati rice.',
        category: 'biryani',
        portion: 'Serves 1-2 (500g)',
        isVeg: false,
        spiceLevel: 'Spicy',
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 249, deliveryFee: 30, platformFee: 5, taxes: 15, otherCharges: 0, discount: 50, status: 'Verified' },
          zomato: { basePrice: 249, deliveryFee: 20, platformFee: 10, taxes: 15, otherCharges: 0, discount: 80, status: 'Verified' },
          eatclub: { basePrice: 249, deliveryFee: 25, platformFee: 5, taxes: 15, otherCharges: 0, discount: 40, status: 'Verified' },
          magicpin: { basePrice: 240, deliveryFee: 20, platformFee: 4, taxes: 14, otherCharges: 0, discount: 55, status: 'Verified' },
          eatsure: { basePrice: 239, deliveryFee: 20, platformFee: 0, taxes: 14, otherCharges: 0, discount: 45, status: 'Verified' }
        }
      },
      {
        id: 'dish-103',
        name: 'Shahi Paneer Dum Biryani',
        description: 'Fresh royal paneer cubes steeped in saffron marinade and slow cooked with basmati rice and roasted cashews.',
        category: 'biryani',
        portion: 'Serves 1-2 (480g)',
        isVeg: true,
        spiceLevel: 'Mild',
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 289, deliveryFee: 35, platformFee: 7, taxes: 16, otherCharges: 5, discount: 50, status: 'Verified' },
          zomato: { basePrice: 289, deliveryFee: 30, platformFee: 8, taxes: 16, otherCharges: 5, discount: 65, status: 'Verified' },
          eatclub: { basePrice: 279, deliveryFee: 0, platformFee: 0, taxes: 14, otherCharges: 0, discount: 30, status: 'Verified' },
          magicpin: { basePrice: 275, deliveryFee: 25, platformFee: 4, taxes: 14, otherCharges: 0, discount: 45, status: 'Verified' },
          eatsure: { basePrice: 269, deliveryFee: 20, platformFee: 0, taxes: 14, otherCharges: 0, discount: 35, status: 'Verified' }
        }
      },
      {
        id: 'dish-104',
        name: 'Angoori Gulab Jamun (4 Pcs)',
        description: 'Melt-in-mouth milk dumplings soaked in cardamom infused warm rose sugar syrup.',
        category: 'desserts',
        portion: '4 Pcs',
        isVeg: true,
        spiceLevel: 'Sweet',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 119, deliveryFee: 25, platformFee: 7, taxes: 7, otherCharges: 0, discount: 20, status: 'Verified' },
          zomato: { basePrice: 119, deliveryFee: 20, platformFee: 8, taxes: 7, otherCharges: 0, discount: 25, status: 'Verified' },
          eatclub: { basePrice: 99, deliveryFee: 0, platformFee: 0, taxes: 5, otherCharges: 0, discount: 10, status: 'Verified' },
          magicpin: { basePrice: 105, deliveryFee: 20, platformFee: 4, taxes: 6, otherCharges: 0, discount: 15, status: 'Verified' },
          eatsure: { basePrice: 99, deliveryFee: 15, platformFee: 0, taxes: 5, otherCharges: 0, discount: 10, status: 'Verified' }
        }
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Burger King - Flame Grilled Delights',
    cuisine: ['Burgers', 'Fast Food', 'Beverages'],
    rating: 4.2,
    ratingCount: '19.5k+',
    deliveryTime: '20-25 mins',
    distanceKm: 1.2,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1412,
    lng: 72.8290,
    address: 'Citi Mall Ground Floor, New Link Rd, Andheri West, Mumbai',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin'],
    startingPrice: 129,
    isPureVeg: false,
    featuredTag: 'Flame-grilled 100% juicy patties',
    dishes: [
      {
        id: 'dish-401',
        name: 'Crispy Chicken Double Patty Burger',
        description: 'Two golden fried chicken patties layered with creamy mayo, fresh lettuce, and toasted sesame buns.',
        category: 'burgers',
        portion: 'Regular 1 Pc',
        isVeg: false,
        spiceLevel: 'Medium',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 179, deliveryFee: 25, platformFee: 6, taxes: 10, otherCharges: 0, discount: 30, status: 'Verified' },
          zomato: { basePrice: 179, deliveryFee: 20, platformFee: 8, taxes: 10, otherCharges: 0, discount: 45, status: 'Verified' },
          eatclub: { basePrice: 169, deliveryFee: 0, platformFee: 0, taxes: 9, otherCharges: 0, discount: 20, status: 'Verified' },
          magicpin: { basePrice: 170, deliveryFee: 20, platformFee: 4, taxes: 9, otherCharges: 0, discount: 35, status: 'Verified' },
          eatsure: { basePrice: 175, deliveryFee: 20, platformFee: 0, taxes: 9, otherCharges: 0, discount: 25, status: 'Estimated' }
        }
      },
      {
        id: 'dish-402',
        name: 'Peri Peri King Fries (Large)',
        description: 'Crispy crinkle golden fries dusted with fiery African bird-eye chili peri peri shaker seasoning.',
        category: 'burgers',
        portion: 'Large (140g)',
        isVeg: true,
        spiceLevel: 'Spicy',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 129, deliveryFee: 25, platformFee: 6, taxes: 7, otherCharges: 0, discount: 15, status: 'Verified' },
          zomato: { basePrice: 129, deliveryFee: 20, platformFee: 8, taxes: 7, otherCharges: 0, discount: 20, status: 'Verified' },
          eatclub: { basePrice: 119, deliveryFee: 0, platformFee: 0, taxes: 6, otherCharges: 0, discount: 15, status: 'Verified' },
          magicpin: { basePrice: 119, deliveryFee: 20, platformFee: 4, taxes: 6, otherCharges: 0, discount: 20, status: 'Verified' },
          eatsure: { basePrice: 125, deliveryFee: 20, platformFee: 0, taxes: 6, otherCharges: 0, discount: 15, status: 'Estimated' }
        }
      },
      {
        id: 'dish-403',
        name: 'Chilled Thums Up / Coke Can (300ml)',
        description: 'Ice cold carbonated cola refreshing beverage to complete your meal.',
        category: 'beverages',
        portion: '300ml Can',
        isVeg: true,
        spiceLevel: 'None',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 45, deliveryFee: 20, platformFee: 6, taxes: 3, otherCharges: 0, discount: 0, status: 'Verified' },
          zomato: { basePrice: 45, deliveryFee: 20, platformFee: 8, taxes: 3, otherCharges: 0, discount: 0, status: 'Verified' },
          eatclub: { basePrice: 40, deliveryFee: 0, platformFee: 0, taxes: 2, otherCharges: 0, discount: 0, status: 'Verified' },
          magicpin: { basePrice: 40, deliveryFee: 15, platformFee: 4, taxes: 2, otherCharges: 0, discount: 0, status: 'Verified' },
          eatsure: { basePrice: 40, deliveryFee: 15, platformFee: 0, taxes: 2, otherCharges: 0, discount: 0, status: 'Verified' }
        }
      }
    ]
  },
  {
    id: 'rest-6',
    name: "Haldiram's - Sweets, Chaat & Royal Thali",
    cuisine: ['North Indian', 'Chaat', 'Desserts'],
    rating: 4.5,
    ratingCount: '24.8k+',
    deliveryTime: '20-30 mins',
    distanceKm: 1.5,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1302,
    lng: 72.8350,
    address: 'Laxmi Industrial Estate, New Link Road, Andheri West, Mumbai',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'magicpin', 'eatsure'],
    startingPrice: 140,
    isPureVeg: true,
    featuredTag: '100% Pure Desi Ghee & Heritage Sweets',
    dishes: [
      {
        id: 'dish-601',
        name: 'Delhi Style Chole Bhature (2 Pcs)',
        description: 'Puffy golden bhature served with piquant Punjabi spiced chickpea curry, pickled onions, and tangy mint chutney.',
        category: 'north-indian',
        portion: 'Serves 1 (2 Bhature + Curry)',
        isVeg: true,
        spiceLevel: 'Medium',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 210, deliveryFee: 30, platformFee: 7, taxes: 12, otherCharges: 5, discount: 40, status: 'Verified' },
          zomato: { basePrice: 210, deliveryFee: 25, platformFee: 8, taxes: 12, otherCharges: 5, discount: 55, status: 'Verified' },
          eatclub: { basePrice: 199, deliveryFee: 0, platformFee: 0, taxes: 10, otherCharges: 0, discount: 20, status: 'Estimated' },
          magicpin: { basePrice: 195, deliveryFee: 20, platformFee: 4, taxes: 10, otherCharges: 0, discount: 50, status: 'Verified' },
          eatsure: { basePrice: 200, deliveryFee: 20, platformFee: 0, taxes: 10, otherCharges: 0, discount: 30, status: 'Verified' }
        }
      }
    ]
  },
  {
    id: 'rest-7',
    name: 'The Belgian Waffle Co. - Warm Gourmet Slices',
    cuisine: ['Desserts', 'Waffles', 'Shakes'],
    rating: 4.6,
    ratingCount: '16.3k+',
    deliveryTime: '15-25 mins',
    distanceKm: 1.1,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1388,
    lng: 72.8335,
    address: 'Shop 2, Crystal Plaza, New Link Rd, Andheri West',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin'],
    startingPrice: 140,
    isPureVeg: true,
    featuredTag: 'Crispy Warm Waff-wiches & Nutella Drizzle',
    dishes: [
      {
        id: 'dish-701',
        name: 'Triple Chocolate Belgian Waffle',
        description: 'Crispy dark cocoa waffle smothered with melted Belgian dark, milk, and white chocolate ganache.',
        category: 'desserts',
        portion: '1 Waff-wich (Serves 1)',
        isVeg: true,
        spiceLevel: 'Sweet',
        image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 175, deliveryFee: 25, platformFee: 6, taxes: 9, otherCharges: 5, discount: 30, status: 'Verified' },
          zomato: { basePrice: 175, deliveryFee: 20, platformFee: 8, taxes: 9, otherCharges: 5, discount: 40, status: 'Verified' },
          eatclub: { basePrice: 160, deliveryFee: 0, platformFee: 0, taxes: 8, otherCharges: 0, discount: 20, status: 'Verified' },
          magicpin: { basePrice: 165, deliveryFee: 15, platformFee: 4, taxes: 8, otherCharges: 0, discount: 35, status: 'Verified' },
          eatsure: { basePrice: 170, deliveryFee: 20, platformFee: 0, taxes: 8, otherCharges: 0, discount: 25, status: 'Estimated' }
        }
      }
    ]
  },
  {
    id: 'rest-8',
    name: 'Wow! Momo & Chinese Kitchen',
    cuisine: ['Chinese', 'Momos', 'Asian'],
    rating: 4.3,
    ratingCount: '11.8k+',
    deliveryTime: '20-28 mins',
    distanceKm: 2.0,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1205,
    lng: 72.8420,
    address: 'Near Andheri Station West, Swami Vivekananda Rd, Mumbai',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin'],
    startingPrice: 130,
    isPureVeg: false,
    featuredTag: 'Darjeeling Handcrafted Steamed & Pan-fried',
    dishes: [
      {
        id: 'dish-801',
        name: 'Darjeeling Steamed Chicken Momos (6 Pcs)',
        description: 'Thin-skinned juicy chicken momos stuffed with mountain herbs and served with fiery red chili chutney and soup.',
        category: 'chinese',
        portion: '6 Pcs + Spicy Dip',
        isVeg: false,
        spiceLevel: 'Spicy',
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 180, deliveryFee: 25, platformFee: 6, taxes: 9, otherCharges: 0, discount: 35, status: 'Verified' },
          zomato: { basePrice: 180, deliveryFee: 20, platformFee: 8, taxes: 9, otherCharges: 0, discount: 45, status: 'Verified' },
          eatclub: { basePrice: 165, deliveryFee: 0, platformFee: 0, taxes: 8, otherCharges: 0, discount: 25, status: 'Verified' },
          magicpin: { basePrice: 165, deliveryFee: 15, platformFee: 4, taxes: 8, otherCharges: 0, discount: 35, status: 'Verified' },
          eatsure: { basePrice: 170, deliveryFee: 20, platformFee: 0, taxes: 8, otherCharges: 0, discount: 30, status: 'Estimated' }
        }
      }
    ]
  },
  {
    id: 'rest-9',
    name: 'Subway - Fresh Forward Subs & Wraps',
    cuisine: ['Healthy', 'Fast Food', 'Wraps'],
    rating: 4.4,
    ratingCount: '14.1k+',
    deliveryTime: '18-25 mins',
    distanceKm: 1.4,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1350,
    lng: 72.8240,
    address: 'Opposite Fame Adlabs, Off New Link Road, Andheri West',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin'],
    startingPrice: 160,
    isPureVeg: false,
    featuredTag: 'Fresh Baked Artisan Breads & Crisp Greens',
    dishes: [
      {
        id: 'dish-901',
        name: 'Roasted Chicken Breast Sub (15cm / 6-inch)',
        description: 'Tender roasted chicken slices tucked into freshly baked honey oat bread with crisp lettuce, olives, and southwest sauce.',
        category: 'healthy',
        portion: '15 cm Sub (6-inch)',
        isVeg: false,
        spiceLevel: 'Medium',
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 245, deliveryFee: 25, platformFee: 6, taxes: 12, otherCharges: 0, discount: 40, status: 'Verified' },
          zomato: { basePrice: 245, deliveryFee: 20, platformFee: 8, taxes: 12, otherCharges: 0, discount: 55, status: 'Verified' },
          eatclub: { basePrice: 230, deliveryFee: 0, platformFee: 0, taxes: 11, otherCharges: 0, discount: 30, status: 'Verified' },
          magicpin: { basePrice: 230, deliveryFee: 15, platformFee: 4, taxes: 11, otherCharges: 0, discount: 45, status: 'Verified' },
          eatsure: { basePrice: 235, deliveryFee: 20, platformFee: 0, taxes: 11, otherCharges: 0, discount: 30, status: 'Estimated' }
        }
      }
    ]
  },
  {
    id: 'rest-3',
    name: "Tossin Pizza - Gourmet Artisan Crusts",
    cuisine: ['Pizza', 'Italian', 'Garlic Breads'],
    rating: 4.5,
    ratingCount: '6.2k+',
    deliveryTime: '25-30 mins',
    distanceKm: 1.8,
    cityId: 'mumbai',
    zoneId: 'andheri-west',
    lat: 19.1390,
    lng: 72.8360,
    address: 'Veera Desai Industrial Estate, Near Fun Republic, Andheri West',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin'],
    startingPrice: 299,
    isPureVeg: false,
    featuredTag: 'Hand-stretched sourdough & bocconcini',
    dishes: [
      {
        id: 'dish-301',
        name: 'Peri Peri Chicken Gourmet Pizza (11-inch)',
        description: 'Spicy peri peri marinated chicken chunks, bell peppers, mozzarella and fresh jalapenos on hand-stretched crust.',
        category: 'pizza',
        portion: 'Medium (11 inch, 6 Slices)',
        isVeg: false,
        spiceLevel: 'Spicy',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 480, deliveryFee: 30, platformFee: 7, taxes: 26, otherCharges: 10, discount: 80, status: 'Verified' },
          zomato: { basePrice: 480, deliveryFee: 20, platformFee: 9, taxes: 26, otherCharges: 10, discount: 110, status: 'Verified' },
          eatclub: { basePrice: 440, deliveryFee: 0, platformFee: 0, taxes: 22, otherCharges: 0, discount: 50, status: 'Verified' },
          magicpin: { basePrice: 460, deliveryFee: 20, platformFee: 4, taxes: 24, otherCharges: 5, discount: 90, status: 'Verified' },
          eatsure: { basePrice: 450, deliveryFee: 25, platformFee: 0, taxes: 23, otherCharges: 0, discount: 60, status: 'Estimated' }
        }
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'California Burrito - Fresh Mexican Grill',
    cuisine: ['Healthy', 'Mexican', 'Bowls'],
    rating: 4.6,
    ratingCount: '15.1k+',
    deliveryTime: '22-28 mins',
    distanceKm: 2.1,
    cityId: 'bengaluru',
    zoneId: 'indiranagar',
    lat: 12.9780,
    lng: 77.6410,
    address: '100ft Road, Opposite To Starbucks, Indiranagar, Bengaluru',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=700&auto=format&fit=crop&q=80',
    availablePlatforms: ['swiggy', 'zomato', 'eatclub', 'magicpin'],
    startingPrice: 199,
    isPureVeg: false,
    featuredTag: 'No Preservatives, Farm Fresh Avocados',
    dishes: [
      {
        id: 'dish-501',
        name: 'Crispy Chicken Protein Fiesta Rice Bowl',
        description: 'Seasoned brown rice, pinto beans, spiced crispy chicken, pico de gallo salsa, sour cream, and fresh guacamole.',
        category: 'healthy',
        portion: 'Full Bowl (450g)',
        isVeg: false,
        spiceLevel: 'Medium',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=700&auto=format&fit=crop&q=80',
        platformPricing: {
          swiggy: { basePrice: 329, deliveryFee: 35, platformFee: 7, taxes: 18, otherCharges: 0, discount: 50, status: 'Verified' },
          zomato: { basePrice: 329, deliveryFee: 25, platformFee: 8, taxes: 18, otherCharges: 0, discount: 75, status: 'Verified' },
          eatclub: { basePrice: 310, deliveryFee: 0, platformFee: 0, taxes: 16, otherCharges: 0, discount: 35, status: 'Verified' },
          magicpin: { basePrice: 315, deliveryFee: 20, platformFee: 4, taxes: 16, otherCharges: 0, discount: 60, status: 'Verified' },
          eatsure: { basePrice: 320, deliveryFee: 25, platformFee: 0, taxes: 16, otherCharges: 0, discount: 40, status: 'Estimated' }
        }
      }
    ]
  }
];

export const PLATFORM_COUPONS = [
  {
    id: 'c-1',
    code: 'ZOMATOFEAST',
    platformId: 'zomato',
    title: 'Flat ₹80 OFF on Best Fast Food',
    discountAmount: 80,
    minOrder: 249,
    maxDiscount: 80,
    expiry: 'Valid today till 11:59 PM',
    terms: 'Applicable on select partner restaurants including Behrouz & Tossin.'
  },
  {
    id: 'c-2',
    code: 'SWIGGYIT',
    platformId: 'swiggy',
    title: '50% OFF up to ₹100',
    discountAmount: null,
    discountPercent: 50,
    minOrder: 199,
    maxDiscount: 100,
    expiry: 'Expires in 3 days',
    terms: 'Valid on first 3 orders this week.'
  },
  {
    id: 'c-3',
    code: 'EATCLUBZERO',
    platformId: 'eatclub',
    title: 'Zero Platform Fee + Flat ₹50 OFF',
    discountAmount: 50,
    minOrder: 199,
    maxDiscount: 50,
    expiry: 'No expiry - Permanent club benefit',
    terms: 'Always 0 platform fee + free delivery above ₹199.'
  },
  {
    id: 'c-4',
    code: 'MAGICDEAL90',
    platformId: 'magicpin',
    title: 'Save up to ₹90 using Magic Points',
    discountAmount: 90,
    minOrder: 299,
    maxDiscount: 90,
    expiry: 'Ongoing Hyperlocal Offer',
    terms: 'Use points for instant bill discount.'
  },
  {
    id: 'c-5',
    code: 'EATSUREFREE',
    platformId: 'eatsure',
    title: 'Free Delivery + ₹50 Welcome Discount',
    discountAmount: 50,
    minOrder: 199,
    maxDiscount: 50,
    expiry: 'Valid for all registered users',
    terms: 'Zero packaging charges, zero platform fee.'
  }
];

// Haversine distance calculator between two GPS coordinates in kilometers
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Helper formula to compute transparent final price including optional weather surge fee
export function calculateFinalPrice({ basePrice, deliveryFee, platformFee, taxes, otherCharges = 0, discount = 0, surgeFee = 0 }) {
  const subtotal = Number(basePrice) || 0;
  const delivery = Number(deliveryFee) || 0;
  const platform = Number(platformFee) || 0;
  const surge = Number(surgeFee) || 0;
  const tax = Number(taxes) || Math.round(subtotal * 0.05); // 5% GST
  const others = Number(otherCharges) || 0;
  const disc = Number(discount) || 0;

  const finalPayable = Math.max(0, (subtotal + delivery + platform + surge + tax + others) - disc);
  return {
    subtotal,
    delivery,
    platform,
    surge,
    tax,
    others,
    discount: disc,
    finalPayable
  };
}

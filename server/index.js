import http from 'http';
import { URL } from 'url';

const PORT = 5000;

// In-memory user profile store
let userProfile = {
  name: 'Shreyas',
  email: 'shreyas@foodcompare.local',
  phone: '+91 98200 12345',
  city: 'Mumbai',
  zone: 'Andheri West',
  dietaryPreference: 'all', // 'all' | 'veg' | 'non-veg' | 'eggetarian' | 'vegan'
  spiceTolerance: 'Medium', // 'Mild' | 'Medium' | 'Fiery'
  favoritePlatform: 'zomato',
  updatedAt: new Date().toISOString()
};

// Platform URL Deeplink Generator
function generatePlatformUrl(platform, dishName = '', restaurantName = '', city = 'mumbai') {
  const query = `${dishName} ${restaurantName}`.trim();
  const safeCity = encodeURIComponent(city.toLowerCase());

  switch (platform?.toLowerCase()) {
    case 'swiggy':
      return `https://www.swiggy.com/search?query=${encodeURIComponent(query)}`;
    case 'zomato':
      return `https://www.zomato.com/${safeCity}/restaurants?q=${encodeURIComponent(query)}`;
    case 'eatclub':
      return `https://eatclub.in/search?q=${encodeURIComponent(dishName || query)}`;
    case 'magicpin':
      return `https://magicpin.in/search/?q=${encodeURIComponent(query)}`;
    case 'eatsure':
      return `https://eatsure.com/search?query=${encodeURIComponent(dishName || query)}`;
    default:
      return `https://www.google.com/search?q=${encodeURIComponent(query + ' order online ' + platform)}`;
  }
}

const server = http.createServer((req, res) => {
  // Setup CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // 1. Health Check
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', serverTime: new Date().toISOString() }));
    return;
  }

  // 2. Platform Redirection Deeplink API
  if (pathname === '/api/redirect') {
    const platform = parsedUrl.searchParams.get('platform') || 'swiggy';
    const dishName = parsedUrl.searchParams.get('dishName') || '';
    const restaurantName = parsedUrl.searchParams.get('restaurantName') || '';
    const city = parsedUrl.searchParams.get('city') || 'mumbai';
    const doRedirect = parsedUrl.searchParams.get('redirect') === 'true';

    const redirectUrl = generatePlatformUrl(platform, dishName, restaurantName, city);

    console.log(`[FoodCompare Backend] Redirection requested for "${dishName}" at "${restaurantName}" on platform "${platform}" -> ${redirectUrl}`);

    if (doRedirect) {
      res.writeHead(302, { Location: redirectUrl });
      res.end();
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      platform,
      dishName,
      restaurantName,
      city,
      redirectUrl,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 3. User Profile API (GET & PUT)
  if (pathname === '/api/profile') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, profile: userProfile }));
      return;
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const updates = JSON.parse(body || '{}');
          userProfile = {
            ...userProfile,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          console.log('[FoodCompare Backend] User Profile Updated:', userProfile);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, profile: userProfile }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
        }
      });
      return;
    }
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', pathname }));
});

server.listen(PORT, () => {
  console.log(`[FoodCompare Backend] Running on http://localhost:${PORT}`);
});

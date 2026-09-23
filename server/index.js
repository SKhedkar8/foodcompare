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

  // Root & API Info Handlers
  if (pathname === '/' || pathname === '/api' || pathname === '/api/') {
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    if (isHtml) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FoodCompare Backend API</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #14110E; color: #FDFBF7; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .card { background: #1F1A15; border: 1px solid rgba(217, 119, 6, 0.3); border-radius: 16px; padding: 36px; max-width: 540px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(64, 145, 108, 0.2); color: #40916C; padding: 4px 12px; border-radius: 999px; font-weight: 700; font-size: 0.85rem; border: 1px solid rgba(64, 145, 108, 0.4); margin-bottom: 16px; }
    .badge-dot { width: 8px; height: 8px; background: #40916C; border-radius: 50%; box-shadow: 0 0 8px #40916C; }
    h1 { margin: 0 0 10px; font-size: 1.8rem; color: #FDFBF7; }
    p { margin: 0 0 24px; color: #B8ADA0; line-height: 1.5; font-size: 0.95rem; }
    .btn { display: inline-block; background: linear-gradient(135deg, #C2410C, #D97706); color: #FFF; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 1rem; box-shadow: 0 8px 20px rgba(194, 65, 12, 0.3); transition: transform 0.2s; }
    .btn:hover { transform: translateY(-2px); }
    .endpoints { margin-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }
    .endpoint-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.85rem; font-family: monospace; color: #D97706; }
    .endpoint-label { color: #85796E; font-family: sans-serif; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge"><div class="badge-dot"></div> API Server Active (Port 5000)</div>
    <h1>FoodCompare Backend</h1>
    <p>The backend microservice is fully operational and ready to serve live platform deeplinks, user preferences, and real-time fee calculations.</p>
    <a href="http://localhost:5173" class="btn">🚀 Open Web Application (Port 5173)</a>
    <div class="endpoints">
      <div style="font-size: 0.8rem; text-transform: uppercase; color: #85796E; font-weight: 700; margin-bottom: 8px;">Available API Endpoints:</div>
      <div class="endpoint-item"><span>GET /api/health</span><span class="endpoint-label">Status check</span></div>
      <div class="endpoint-item"><span>GET /api/profile</span><span class="endpoint-label">User profile</span></div>
      <div class="endpoint-item"><span>POST /api/profile</span><span class="endpoint-label">Update settings</span></div>
      <div class="endpoint-item"><span>GET /api/redirect</span><span class="endpoint-label">Platform deeplink</span></div>
    </div>
  </div>
</body>
</html>`);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'FoodCompare Backend API',
      status: 'online',
      port: PORT,
      frontendUrl: 'http://localhost:5173',
      endpoints: ['/api/health', '/api/profile', '/api/redirect'],
      serverTime: new Date().toISOString()
    }));
    return;
  }

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

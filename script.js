/* =====================================================
   CropMart — Frontend Logic
   API-connected version with real backend integration
   ===================================================== */

// -------------------- API LAYER --------------------
const API_BASE = '/api/v1';

const api = {
  _token: localStorage.getItem('cm_token') || null,

  setToken(token) {
    this._token = token;
    if (token) localStorage.setItem('cm_token', token);
    else localStorage.removeItem('cm_token');
  },

  getToken() {
    return this._token;
  },

  async request(endpoint, options = {}) {
    const url = API_BASE + endpoint;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this._token) {
      headers['Authorization'] = 'Bearer ' + this._token;
    }
    try {
      const resp = await fetch(url, { ...options, headers });
      if (resp.status === 401) {
        // Token expired or invalid
        this.setToken(null);
        localStorage.removeItem('cm_user');
        currentUser = null;
      }
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.detail || 'API error');
      }
      return data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },

  patch(endpoint, body) {
    return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

// -------------------- DEMO DATA (Fallback if API unavailable) --------------------
const PRODUCTS_FALLBACK = [
  { id:1, name:'Tomato', category:'Vegetables', farmer_name:'Ramesh Patil', fpo_name:'Nashik Farmers FPO', location:'Nashik', quantity_kg:500, price_per_kg:28, grade:'A', harvest_date:'2026-09-02', image_url:'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80', availability:'2-3 days' },
  { id:2, name:'Potato', category:'Vegetables', farmer_name:'Suresh Jadhav', fpo_name:'Pune Agro FPO', location:'Pune', quantity_kg:800, price_per_kg:18, grade:'A', harvest_date:'2026-08-28', image_url:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80', availability:'1-2 days' },
  { id:3, name:'Onion', category:'Vegetables', farmer_name:'Anita Deshmukh', fpo_name:'Lasalgaon Onion FPO', location:'Nashik', quantity_kg:1200, price_per_kg:22, grade:'B', harvest_date:'2026-08-20', image_url:'https://images.unsplash.com/photo-1592924357228-91b4b5c7d0b0?w=400&q=80', availability:'2-4 days' },
  { id:4, name:'Wheat', category:'Grains', farmer_name:'Vijay Shinde', fpo_name:'Marathwada Grain FPO', location:'Aurangabad', quantity_kg:2000, price_per_kg:24, grade:'A', harvest_date:'2026-04-15', image_url:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', availability:'3-5 days' },
  { id:5, name:'Rice', category:'Grains', farmer_name:'Kavita More', fpo_name:'Konkan Rice Collective', location:'Kolhapur', quantity_kg:1500, price_per_kg:42, grade:'A', harvest_date:'2026-05-10', image_url:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', availability:'3-5 days' },
  { id:6, name:'Mango', category:'Fruits', farmer_name:'Prakash Pawar', fpo_name:'Ratnagiri Mango FPO', location:'Kolhapur', quantity_kg:300, price_per_kg:65, grade:'A', harvest_date:'2026-05-25', image_url:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', availability:'1-2 days' },
  { id:7, name:'Cauliflower', category:'Vegetables', farmer_name:'Meena Kale', fpo_name:'Pune Fresh FPO', location:'Pune', quantity_kg:250, price_per_kg:30, grade:'A', harvest_date:'2026-09-01', image_url:'https://images.unsplash.com/photo-1568584711075-3d9217d9e5e0?w=400&q=80', availability:'1-2 days' },
  { id:8, name:'Mustard', category:'Pulses', farmer_name:'Ravi Chavan', fpo_name:'Vidarbha Oilseed FPO', location:'Nagpur', quantity_kg:900, price_per_kg:55, grade:'B', harvest_date:'2026-03-20', image_url:'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80', availability:'4-6 days' },
];

const ORDER_STATUSES = [
  'Order Placed',
  'Farmer Confirmed',
  'Produce Aggregated',
  'Picked Up',
  'In Transit',
  'Delivered'
];

const I18N = {
  en: {
    nav_home: 'Home', nav_marketplace: 'Marketplace', nav_how: 'How It Works',
    nav_ai: 'AI Insights', nav_about: 'About', nav_contact: 'Contact',
    nav_login: 'Login', nav_get_started: 'Get Started',
    hero_title: 'From Farm to Market,<br>Without the Middlemen.',
    hero_sub: 'AI-powered direct marketplace connecting farmers, FPOs, bulk buyers and consumers.',
    hero_explore: 'Explore Marketplace', hero_join: 'Join as Farmer',
    stat_direct: 'Direct Market Access', stat_price: 'Better Price Discovery',
    stat_match: 'Smart Buyer Matching', stat_delivery: 'Optimized Delivery',
    problem_title: 'The Broken Supply Chain',
    problem_sub: 'Too many hands, too little value for farmers and consumers.',
    market_title: 'Marketplace', market_sub: 'Fresh produce directly from farmers & FPOs',
    search_placeholder: 'Search products...',
    how_title: 'How It Works', how_sub: 'Predict → Match → Aggregate → Deliver',
    ai_title: 'AI Insights', ai_sub: 'Prototype AI predictions for demand, price & matching'
  },
  hi: {
    nav_home: 'होम', nav_marketplace: 'बाज़ार', nav_how: 'कैसे काम करता है',
    nav_ai: 'एआई इनसाइट्स', nav_about: 'हमारे बारे में', nav_contact: 'संपर्क',
    nav_login: 'लॉगिन', nav_get_started: 'शुरू करें',
    hero_title: 'खेत से बाज़ार तक,<br>बिना बिचौलियों के।',
    hero_sub: 'किसानों, एफपीओ, थोक खरीदारों और उपभोक्ताओं को जोड़ने वाला एआई-संचालित बाज़ार।',
    hero_explore: 'बाज़ार देखें', hero_join: 'किसान के रूप में जुड़ें',
    stat_direct: 'सीधी बाज़ार पहुँच', stat_price: 'बेहतर मूल्य खोज',
    stat_match: 'स्मार्ट खरीदार मैचिंग', stat_delivery: 'अनुकूलित डिलीवरी',
    problem_title: 'टूटी हुई आपूर्ति श्रृंखला',
    problem_sub: 'बहुत ज़्यादा हाथ, किसानों और उपभोक्ताओं के लिए बहुत कम मूल्य।',
    market_title: 'बाज़ार', market_sub: 'किसानों और एफपीओ से सीधे ताज़ी उपज',
    search_placeholder: 'उत्पाद खोजें...',
    how_title: 'कैसे काम करता है', how_sub: 'पूर्वानुमान → मैच → एकत्रीकरण → डिलीवरी',
    ai_title: 'एआई इनसाइट्स', ai_sub: 'माँग, मूल्य और मैचिंग के लिए प्रोटोटाइप एआई पूर्वानुमान'
  }
};

// -------------------- STATE --------------------
let cart = JSON.parse(localStorage.getItem('cm_cart') || '[]');
let currentUser = JSON.parse(localStorage.getItem('cm_user') || 'null');
let currentOrderStatus = 0;
let demandChart = null;
let priceChart = null;
let allProducts = [];       // loaded from API
let filteredProducts = [];
let myProduce = [];
let apiAvailable = false;   // track if backend is up

// -------------------- UTILITIES --------------------
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function toast(msg, duration = 2800) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

function saveCart() {
  localStorage.setItem('cm_cart', JSON.stringify(cart));
  updateCartUI();
}

function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

// -------------------- LOAD PRODUCTS (API or Fallback) --------------------
async function loadProducts() {
  try {
    const products = await api.get('/products');
    allProducts = products;
    apiAvailable = true;
  } catch (e) {
    console.warn('API not available, using fallback data:', e.message);
    allProducts = [...PRODUCTS_FALLBACK];
    apiAvailable = false;
  }
  filteredProducts = [...allProducts];
  renderProducts();
}

// -------------------- RENDER PRODUCTS --------------------
function renderProducts(list = filteredProducts) {
  const grid = $('#productGrid');
  if (!list.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">No products match your filters.</p>';
    return;
  }
  grid.innerHTML = list.map(p => {
    const name = p.name;
    const farmer = p.farmer_name || p.farmer || 'Unknown';
    const location = p.location;
    const qty = p.quantity_kg || p.quantity;
    const price = p.price_per_kg || p.price;
    const grade = p.grade;
    const image = p.image_url || p.image;
    return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-img">
        ${image ? `<img src="${image}" alt="${name}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\\'placeholder\\'><i class=\\'fas fa-leaf\\'></i></span>'" />` : `<span class="placeholder"><i class="fas fa-leaf"></i></span>`}
      </div>
      <div class="product-body">
        <h3>${name}</h3>
        <div class="product-meta">
          <span><i class="fas fa-user"></i> ${farmer}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
        </div>
        <div class="product-meta">
          <span>Qty: ${qty} kg</span>
          <span>Grade: ${grade}</span>
        </div>
        <div class="product-price">${formatINR(price)} <small>/ kg</small></div>
        <div class="product-actions">
          <button class="btn btn-outline btn-sm view-btn" data-id="${p.id}">View Details</button>
          <button class="btn btn-primary btn-sm buy-btn" data-id="${p.id}">Buy Now</button>
        </div>
      </div>
    </article>
  `;
  }).join('');

  $$('.view-btn').forEach(btn => btn.addEventListener('click', () => openProductModal(+btn.dataset.id)));
  $$('.buy-btn').forEach(btn => btn.addEventListener('click', () => {
    addToCart(+btn.dataset.id);
    toast('Added to cart');
  }));
}

function filterProducts() {
  const q = ($('#productSearch').value || '').toLowerCase();
  const cat = $('#categoryFilter').value;
  const loc = $('#locationFilter').value;
  const maxPrice = +$('#priceRange').value;
  const sort = $('#sortFilter').value;

  filteredProducts = allProducts.filter(p => {
    const name = (p.name || '').toLowerCase();
    const farmer = (p.farmer_name || p.farmer || '').toLowerCase();
    const price = p.price_per_kg || p.price;
    const category = p.category;
    const location = p.location;
    const matchQ = !q || name.includes(q) || farmer.includes(q);
    const matchC = !cat || category === cat;
    const matchL = !loc || location === loc;
    const matchP = price <= maxPrice;
    return matchQ && matchC && matchL && matchP;
  });

  if (sort === 'price-asc') filteredProducts.sort((a, b) => (a.price_per_kg||a.price) - (b.price_per_kg||b.price));
  else if (sort === 'price-desc') filteredProducts.sort((a, b) => (b.price_per_kg||b.price) - (a.price_per_kg||a.price));
  else if (sort === 'qty-desc') filteredProducts.sort((a, b) => (b.quantity_kg||b.quantity) - (a.quantity_kg||a.quantity));

  renderProducts();
}

// -------------------- PRODUCT MODAL --------------------
function openProductModal(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const farmer = p.farmer_name || p.farmer || 'Unknown';
  const fpo = p.fpo_name || p.fpo || '';
  const price = p.price_per_kg || p.price;
  const qty = p.quantity_kg || p.quantity;
  const image = p.image_url || p.image;
  const body = $('#productModalBody');
  body.innerHTML = `
    <div class="pm-img">
      ${image ? `<img src="${image}" alt="${p.name}" />` : `<span class="placeholder" style="font-size:4rem;color:var(--accent)"><i class="fas fa-leaf"></i></span>`}
    </div>
    <h2>${p.name}</h2>
    <div class="pm-details">
      <div><span>Farmer / FPO</span><strong>${farmer}${fpo ? ' · ' + fpo : ''}</strong></div>
      <div><span>Location</span><strong>${p.location}</strong></div>
      <div><span>Available</span><strong>${qty} kg</strong></div>
      <div><span>Price</span><strong>${formatINR(price)} / kg</strong></div>
      <div><span>Quality Grade</span><strong>${p.grade}</strong></div>
      <div><span>Harvest Date</span><strong>${p.harvest_date || p.harvest || 'N/A'}</strong></div>
      <div><span>Expected Delivery</span><strong>${p.availability || p.delivery || '2-4 days'}</strong></div>
    </div>
    <div class="pm-ai"><i class="fas fa-brain"></i> <strong>AI Price Insight:</strong> Prototype prediction available in AI Insights.</div>
    <div class="pm-actions">
      <button class="btn btn-outline" id="modalAddCart" data-id="${p.id}">Add to Cart</button>
      <button class="btn btn-primary" id="modalBuyNow" data-id="${p.id}">Buy Now</button>
    </div>
  `;
  $('#productModal').classList.add('open');
  $('#modalAddCart').onclick = () => { addToCart(p.id); toast('Added to cart'); };
  $('#modalBuyNow').onclick = () => { addToCart(p.id); openCart(); $('#productModal').classList.remove('open'); };
}

// -------------------- CART --------------------
function addToCart(id, qty = 1) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const price = p.price_per_kg || p.price;
  const image = p.image_url || p.image;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id: p.id, name: p.name, price, qty, image });
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
}

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  $('#cartCount').textContent = count;
  $('#fabBadge').textContent = count;

  const itemsEl = $('#cartItems');
  if (!cart.length) {
    itemsEl.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0">Your cart is empty</p>';
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${c.name}</h4>
          <p>${formatINR(c.price)} / kg</p>
          <div class="cart-qty">
            <button data-action="dec" data-id="${c.id}">−</button>
            <span>${c.qty}</span>
            <button data-action="inc" data-id="${c.id}">+</button>
          </div>
        </div>
        <div>
          <strong>${formatINR(c.price * c.qty)}</strong>
          <button class="cart-remove" data-id="${c.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');

    itemsEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.onclick = () => updateQty(+btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
    });
    itemsEl.querySelectorAll('.cart-remove').forEach(btn => {
      btn.onclick = () => { removeFromCart(+btn.dataset.id); toast('Removed from cart'); };
    });
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const logistics = cart.length ? Math.max(50, Math.round(subtotal * 0.04)) : 0;
  $('#cartSubtotal').textContent = formatINR(subtotal);
  $('#cartLogistics').textContent = formatINR(logistics);
  $('#cartTotal').textContent = formatINR(subtotal + logistics);
}

function openCart() { $('#cartDrawer').classList.add('open'); }
function closeCart() { $('#cartDrawer').classList.remove('open'); }

// -------------------- AI INSIGHTS (API-connected) --------------------
async function renderDemand(crop = 'tomato') {
  let d;
  try {
    d = await api.get(`/ai/demand?crop=${encodeURIComponent(crop)}`);
  } catch (e) {
    // Fallback
    d = { current_demand: 820, predicted_demand: 1050, trend_pct: 27, recommendation: 'Increase supply', confidence: 87, chart_data: {} };
  }

  $('#demandCards').innerHTML = `
    <div class="demand-stat"><div class="label">Current Demand</div><div class="value">${d.current_demand} kg</div></div>
    <div class="demand-stat"><div class="label">Predicted Demand</div><div class="value">${d.predicted_demand} kg</div></div>
    <div class="demand-stat"><div class="label">Trend</div><div class="value ${d.trend_pct >= 0 ? 'trend-up' : 'trend-down'}">${d.trend_pct >= 0 ? '↑' : '↓'} ${Math.abs(d.trend_pct)}%</div></div>
    <div class="demand-stat"><div class="label">Recommendation</div><div class="value" style="font-size:1rem">${d.recommendation}</div></div>
    <div class="demand-stat"><div class="label">Confidence</div><div class="value">${d.confidence}%</div></div>
  `;

  const ctx = $('#demandChart').getContext('2d');
  if (demandChart) demandChart.destroy();

  const chartLabels = d.chart_data?.labels || ['Current', 'Predicted'];
  const chartValues = d.chart_data?.values || [d.current_demand, d.predicted_demand];

  demandChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Demand (kg)',
        data: chartValues,
        backgroundColor: chartLabels.map((_, i) => i < chartLabels.length - 1 ? '#66bb6a' : '#1b5e20'),
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, title: { display: true, text: 'Prototype AI Prediction' } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

async function renderPrice(crop = 'tomato') {
  let p;
  try {
    p = await api.get(`/ai/price?crop=${encodeURIComponent(crop)}`);
  } catch (e) {
    p = { market_price: 28, local_average: 26, suggested_price: 29, trend: 'up', chart_data: {} };
  }

  const ind = p.trend === 'up' ? '↑ Price increasing' : p.trend === 'down' ? '↓ Price decreasing' : '→ Stable';
  const cls = p.trend === 'up' ? 'up' : p.trend === 'down' ? 'down' : 'stable';
  $('#priceIntel').innerHTML = `
    <div class="price-box"><div class="label">Current Market Price</div><div class="value">${formatINR(p.market_price)}/kg</div></div>
    <div class="price-box"><div class="label">Local Average</div><div class="value">${formatINR(p.local_average)}/kg</div></div>
    <div class="price-box"><div class="label">AI Suggested Price</div><div class="value">${formatINR(p.suggested_price)}/kg</div></div>
    <div class="price-box"><div class="label">Price Trend</div><div class="indicator ${cls}">${ind}</div></div>
  `;

  const ctx = $('#priceChart').getContext('2d');
  if (priceChart) priceChart.destroy();

  const chartLabels = p.chart_data?.labels || ['W1', 'W2', 'W3', 'W4', 'Now', 'Forecast'];
  const chartValues = p.chart_data?.values || [p.market_price - 3, p.market_price - 1, p.market_price + 1, p.market_price - 0.5, p.market_price, p.suggested_price];

  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Price ₹/kg',
        data: chartValues,
        borderColor: '#1b5e20',
        backgroundColor: 'rgba(27,94,32,0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Prototype Price Trend' } }
    }
  });
}

async function renderBuyerMatches(product = 'tomato', sortBy = 'score') {
  let data;
  try {
    data = await api.get(`/ai/match?product=${encodeURIComponent(product)}&sort=${sortBy}`);
  } catch (e) {
    data = { matches: [
      { name: 'FreshMart Wholesale', score: 96, required_qty: 400, distance_km: 18, offer_price: 29 },
      { name: 'GreenBasket', score: 91, required_qty: 300, distance_km: 25, offer_price: 28 },
      { name: 'CityFresh Retail', score: 84, required_qty: 200, distance_km: 32, offer_price: 27 }
    ]};
  }

  const list = data.matches || [];
  $('#buyerMatches').innerHTML = list.map((b, i) => `
    <div class="match-card">
      <h4>${i + 1}. ${b.name}</h4>
      <div class="match-info">
        <span>Match Score: <strong>${b.score}%</strong></span>
        <span>Requirement: ${b.required_qty} kg</span>
        <span>Distance: ${b.distance_km} km</span>
        <span>Offer: ${formatINR(b.offer_price)}/kg</span>
      </div>
      <div class="match-score-bar"><div class="match-score-fill" style="width:0%" data-score="${b.score}"></div></div>
      <div class="match-actions">
        <button class="btn btn-outline btn-sm">View Buyer</button>
        <button class="btn btn-primary btn-sm accept-offer">Accept Offer</button>
      </div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    $$('.match-score-fill').forEach(el => { el.style.width = el.dataset.score + '%'; });
  });

  $$('.accept-offer').forEach(btn => {
    btn.onclick = () => toast('Offer accepted! (Prototype)');
  });
}

// -------------------- ORDER TRACKING --------------------
function renderOrder() {
  const panel = $('#orderPanel');
  panel.innerHTML = `
    <div class="order-info">
      <div><span>Order ID</span><strong>#CM-2026-0842</strong></div>
      <div><span>Product</span><strong>Tomato</strong></div>
      <div><span>Quantity</span><strong>400 kg</strong></div>
      <div><span>Farmer</span><strong>Ramesh Patil</strong></div>
      <div><span>Buyer</span><strong>FreshMart Wholesale</strong></div>
      <div><span>Price</span><strong>₹28/kg</strong></div>
      <div><span>Delivery</span><strong>10 Sep 2026</strong></div>
      <div><span>Status</span><strong>${ORDER_STATUSES[currentOrderStatus]}</strong></div>
    </div>
    <div class="timeline">
      ${ORDER_STATUSES.map((s, i) => `
        <div class="timeline-step ${i < currentOrderStatus ? 'done' : ''} ${i === currentOrderStatus ? 'active' : ''}">
          <div class="timeline-dot">${i < currentOrderStatus ? '✓' : i + 1}</div>
          <span>${s}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// -------------------- LOGISTICS (API-connected) --------------------
async function optimizeRoute() {
  try {
    const route = await api.post('/ai/route/optimize');
    $('#routeDistance').textContent = route.distance_km + ' km';
    $('#routeTime').textContent = route.eta_display;
    $('#routeCost').textContent = formatINR(route.cost);
    toast('Route optimized by AI (Prototype)');
  } catch (e) {
    // Fallback
    const distances = [38, 35, 42, 31, 29];
    const times = ['1h 05m', '58m', '1h 15m', '52m', '48m'];
    const costs = [780, 720, 850, 690, 650];
    const i = Math.floor(Math.random() * distances.length);
    $('#routeDistance').textContent = distances[i] + ' km';
    $('#routeTime').textContent = times[i];
    $('#routeCost').textContent = formatINR(costs[i]);
    toast('Route optimized by AI (Prototype)');
  }
}

// -------------------- AUTH (API-connected) --------------------
function openAuth(tab = 'login') {
  $('#authModal').classList.add('open');
  switchAuthTab(tab);
}

function switchAuthTab(tab) {
  $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $('#loginForm').classList.toggle('hidden', tab !== 'login');
  $('#signupForm').classList.toggle('hidden', tab !== 'signup');
}

async function handleLogin(e) {
  e.preventDefault();
  const type = $('#loginType').value;
  const email = $('#loginEmail').value;
  const password = $('#loginPassword').value;
  if (!type || !email || !password) return;

  try {
    const data = await api.post('/auth/login', { email, password, role: type });
    api.setToken(data.access_token);
    currentUser = data.user;
    currentUser.type = currentUser.role; // backward compat
    localStorage.setItem('cm_user', JSON.stringify(currentUser));
    localStorage.setItem('cm_refresh_token', data.refresh_token);
    $('#authModal').classList.remove('open');
    toast(`Welcome back! Logged in as ${currentUser.role}`);
    showDashboard(currentUser.role);
    updateAuthUI();
  } catch (err) {
    toast(err.message || 'Login failed');
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const type = $('#signupType').value;
  const name = $('#signupName').value;
  const email = $('#signupEmail').value;
  const phone = $('#signupPhone').value;
  const password = $('#signupPassword').value;
  const location = $('#signupLocation').value;
  if (!type || !name || !email || !password) return;

  try {
    const data = await api.post('/auth/register', { name, email, phone, password, role: type, location });
    api.setToken(data.access_token);
    currentUser = data.user;
    currentUser.type = currentUser.role;
    localStorage.setItem('cm_user', JSON.stringify(currentUser));
    localStorage.setItem('cm_refresh_token', data.refresh_token);
    $('#authModal').classList.remove('open');
    toast(`Account created! Welcome, ${name}`);
    showDashboard(currentUser.role);
    updateAuthUI();
  } catch (err) {
    toast(err.message || 'Signup failed');
  }
}

function updateAuthUI() {
  if (currentUser) {
    $('#loginBtn').textContent = currentUser.name || 'Account';
    $('#loginBtn').onclick = () => showDashboard(currentUser.role || currentUser.type);
    $('#getStartedBtn').textContent = 'Dashboard';
    $('#getStartedBtn').onclick = () => showDashboard(currentUser.role || currentUser.type);
  } else {
    $('#loginBtn').textContent = 'Login';
    $('#loginBtn').onclick = () => openAuth('login');
    $('#getStartedBtn').textContent = 'Get Started';
    $('#getStartedBtn').onclick = () => openAuth('signup');
  }
}

function showDashboard(type) {
  const isFarmer = type === 'farmer' || type === 'fpo';
  const isBuyer = type === 'buyer';

  if (isFarmer) {
    $('#farmerDashboard').classList.remove('hidden');
    $('#buyerDashboard').classList.add('hidden');
    updateFarmerStats();
    loadMyProduce();
    window.scrollTo({ top: $('#farmerDashboard').offsetTop - 80, behavior: 'smooth' });
  } else if (isBuyer) {
    $('#buyerDashboard').classList.remove('hidden');
    $('#farmerDashboard').classList.add('hidden');
    window.scrollTo({ top: $('#buyerDashboard').offsetTop - 80, behavior: 'smooth' });
  } else {
    toast('You can now browse and buy produce');
    document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' });
  }
}

function logout() {
  currentUser = null;
  api.setToken(null);
  localStorage.removeItem('cm_user');
  localStorage.removeItem('cm_refresh_token');
  $('#farmerDashboard').classList.add('hidden');
  $('#buyerDashboard').classList.add('hidden');
  updateAuthUI();
  toast('Logged out');
}

async function updateFarmerStats() {
  // Try to get real counts from API
  let produceCount = allProducts.length;
  try {
    if (currentUser && apiAvailable) {
      const myProducts = await api.get(`/products?seller_id=${currentUser.id}`);
      produceCount = myProducts.length;
    }
  } catch (e) { /* use default */ }

  $('#fdTotalProduce').textContent = produceCount;
  $('#fdActiveOrders').textContent = 3;
  $('#fdTotalSales').textContent = '₹48,200';
  $('#fdPending').textContent = '₹12,400';
  if (currentUser) {
    $('#farmerProfileInfo').textContent = `Logged in as ${currentUser.name || currentUser.email} (${currentUser.role || currentUser.type})`;
  }
}

// -------------------- FARMER LIST PRODUCE (API-connected) --------------------
async function handleListProduce(e) {
  e.preventDefault();
  const item = {
    name: $('#lpName').value,
    category: $('#lpCategory').value,
    quantity_kg: +$('#lpQty').value,
    price_per_kg: +$('#lpPrice').value,
    grade: $('#lpQuality').value,
    harvest_date: $('#lpHarvest').value,
    location: $('#lpLocation').value,
    image_url: $('#lpImage').value || '',
    farmer_name: currentUser?.name || 'You',
    fpo_name: currentUser?.role === 'fpo' ? currentUser.name : '',
  };

  try {
    const product = await api.post('/products', item);
    allProducts.push(product);
    myProduce.push(product);
    toast('Produce listed successfully!');
  } catch (err) {
    // Fallback to local
    const localItem = { ...item, id: Date.now(), price: item.price_per_kg, quantity: item.quantity_kg, status: 'active' };
    allProducts.push(localItem);
    myProduce.push(localItem);
    toast('Produce listed locally (API unavailable)');
  }

  renderMyProduce();
  filterProducts();
  $('#listProduceForm').reset();
  $('#listProduceForm').classList.add('hidden');
  updateFarmerStats();
}

async function loadMyProduce() {
  if (!currentUser || !apiAvailable) return;
  try {
    myProduce = await api.get(`/products?seller_id=${currentUser.id}`);
    renderMyProduce();
  } catch (e) { /* ignore */ }
}

function renderMyProduce() {
  const el = $('#myProduceList');
  const all = [...myProduce];
  if (!all.length) {
    el.innerHTML = '<p style="color:var(--text-muted)">No produce listed yet. Click "List New Produce".</p>';
    return;
  }
  el.innerHTML = all.map(p => {
    const price = p.price_per_kg || p.price;
    const qty = p.quantity_kg || p.quantity;
    return `
    <div class="product-card">
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="product-meta">${qty} kg · ${formatINR(price)}/kg · Grade ${p.grade}</div>
        <div class="product-meta">${p.location} · ${p.harvest_date || p.harvest || ''}</div>
      </div>
    </div>
  `;
  }).join('');
}

// -------------------- BULK REQUIREMENT (API-connected) --------------------
async function handleBulkReq(e) {
  e.preventDefault();
  const product = $('#brProduct').value;
  const qty = +$('#brQty').value;
  const maxPrice = +$('#brMaxPrice').value;
  const location = $('#brLocation').value;
  const date = $('#brDate').value;

  let matches;
  try {
    // Create requirement in DB
    await api.post('/requirements', {
      product_name: product,
      quantity_kg: qty,
      max_price: maxPrice,
      location: location,
      required_date: date,
    });
    // Get matches
    const matchData = await api.get(`/ai/match?product=${encodeURIComponent(product)}&sort=score`);
    matches = matchData.matches || [];
  } catch (e) {
    // Fallback
    matches = [
      { name: 'Farmer nearby', score: 93, required_qty: qty + 100, distance_km: 12, offer_price: maxPrice - 1 },
      { name: 'FPO farmer', score: 87, required_qty: qty + 50, distance_km: 28, offer_price: maxPrice - 2 },
      { name: 'Local grower', score: 81, required_qty: qty - 50, distance_km: 40, offer_price: maxPrice - 3 },
    ];
  }

  $('#bulkMatches').innerHTML = `
    <h4 style="margin:16px 0 12px">Matching Farmers (Prototype)</h4>
    ${matches.map((b, i) => `
      <div class="match-card">
        <h4>${i + 1}. ${b.name} (${b.distance_km} km away)</h4>
        <div class="match-info">
          <span>Match: <strong>${b.score}%</strong></span>
          <span>Available ~${b.required_qty} kg</span>
          <span>Offer: ${formatINR(b.offer_price)}/kg</span>
        </div>
        <div class="match-score-bar"><div class="match-score-fill" style="width:${b.score}%"></div></div>
        <button class="btn btn-primary btn-sm">Contact Farmer</button>
      </div>
    `).join('')}
  `;
  toast('Matching farmers found (Prototype)');
}

// -------------------- CHECKOUT (API-connected) --------------------
async function handleCheckout(e) {
  e.preventDefault();
  const items = cart.map(c => ({
    product_id: c.id,
    product_name: c.name,
    quantity_kg: c.qty,
    unit_price: c.price,
  }));

  let orderId;
  try {
    const order = await api.post('/orders/checkout', {
      items,
      delivery_name: $('#coName').value,
      delivery_phone: $('#coPhone').value,
      delivery_address: $('#coAddress').value,
      payment_method: document.querySelector('input[name="payment"]:checked')?.value || 'upi',
    });
    orderId = order.order_ref;
  } catch (err) {
    // Fallback
    orderId = 'CM-' + Date.now().toString().slice(-8);
  }

  $('#successOrderId').textContent = orderId;
  $('#checkoutModal').classList.remove('open');
  $('#successModal').classList.add('open');
  cart = [];
  saveCart();
  closeCart();
}

// -------------------- LANGUAGE --------------------
function setLanguage(lang) {
  const dict = I18N[lang] || I18N.en;
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.innerHTML = dict[key];
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.placeholder = dict[key];
  });
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  localStorage.setItem('cm_lang', lang);
}

// -------------------- IMPACT COUNTERS --------------------
function animateCounters() {
  $$('.impact-value').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 30);
  });
}

// -------------------- DASHBOARD NAV --------------------
function initDashNav(containerSel) {
  const container = $(containerSel);
  if (!container) return;
  $$('.dash-link', container).forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      $$('.dash-link', container).forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const panel = link.dataset.panel;
      $$('.dash-panel', container).forEach(p => p.classList.toggle('active', p.id === panel));
    });
  });
}

// -------------------- THEME --------------------
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('cm_theme', isDark ? 'light' : 'dark');
  $('#themeToggle').innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// -------------------- INIT --------------------
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  const savedTheme = localStorage.getItem('cm_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') $('#themeToggle').innerHTML = '<i class="fas fa-sun"></i>';

  // Language
  const savedLang = localStorage.getItem('cm_lang') || 'en';
  setLanguage(savedLang);

  // Restore token from localStorage
  const savedToken = localStorage.getItem('cm_token');
  if (savedToken) api.setToken(savedToken);

  // Load products from API (falls back to demo data)
  loadProducts();

  // Filters
  ['productSearch', 'categoryFilter', 'locationFilter', 'sortFilter', 'priceRange'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(id === 'productSearch' ? 'input' : 'change', () => {
      if (id === 'priceRange') $('#priceValue').textContent = el.value;
      filterProducts();
    });
  });

  // AI
  renderDemand('tomato');
  renderPrice('tomato');
  renderBuyerMatches('tomato');

  $('#demandCrop').addEventListener('change', e => renderDemand(e.target.value));
  $('#priceCrop').addEventListener('change', e => renderPrice(e.target.value));
  $('#matchProduct').addEventListener('change', e => {
    renderBuyerMatches(e.target.value, $('#matchSort').value);
  });
  $('#matchSort').addEventListener('change', e => {
    renderBuyerMatches($('#matchProduct').value, e.target.value);
  });

  // Order
  renderOrder();
  $('#nextStatusBtn').onclick = () => {
    if (currentOrderStatus < ORDER_STATUSES.length - 1) { currentOrderStatus++; renderOrder(); }
  };
  $('#prevStatusBtn').onclick = () => {
    if (currentOrderStatus > 0) { currentOrderStatus--; renderOrder(); }
  };

  // Logistics
  $('#optimizeRouteBtn').onclick = optimizeRoute;

  // Auth
  $('#loginBtn').onclick = () => openAuth('login');
  $('#getStartedBtn').onclick = () => openAuth('signup');
  $('#mobileLoginBtn')?.addEventListener('click', () => { openAuth('login'); $('#mobileNav').classList.remove('open'); });
  $('#mobileGetStartedBtn')?.addEventListener('click', () => { openAuth('signup'); $('#mobileNav').classList.remove('open'); });
  $('#joinFarmerBtn').onclick = () => openAuth('signup');
  $$('.join-farmer-cta').forEach(b => b.onclick = () => openAuth('signup'));
  $('#findSuppliersBtn')?.addEventListener('click', () => openAuth('signup'));

  $$('.auth-tab').forEach(t => t.onclick = () => switchAuthTab(t.dataset.tab));
  $('#loginForm').onsubmit = handleLogin;
  $('#signupForm').onsubmit = handleSignup;

  // Cart
  updateCartUI();
  $('#fabCart').onclick = openCart;
  $('#closeCart').onclick = closeCart;
  $('#checkoutBtn').onclick = () => {
    if (!cart.length) { toast('Cart is empty'); return; }
    closeCart();
    $('#checkoutModal').classList.add('open');
  };
  $('#checkoutForm').onsubmit = handleCheckout;

  // Farmer produce form
  $('#showListFormBtn')?.addEventListener('click', () => {
    $('#listProduceForm').classList.toggle('hidden');
  });
  $('#listProduceForm')?.addEventListener('submit', handleListProduce);

  // Bulk req
  $('#bulkReqForm')?.addEventListener('submit', handleBulkReq);

  // Contact
  $('#contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    toast('Message sent! We will get back to you soon.');
    e.target.reset();
  });

  // Logout
  $('#logoutFarmer')?.addEventListener('click', logout);
  $('#logoutBuyer')?.addEventListener('click', logout);

  // Dash nav
  initDashNav('#farmerDashboard');
  initDashNav('#buyerDashboard');

  // Modal close
  $$('[data-close]').forEach(btn => {
    btn.onclick = () => btn.closest('.modal').classList.remove('open');
  });
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Mobile nav
  $('#hamburger').onclick = () => $('#mobileNav').classList.toggle('open');
  $$('#mobileNav .nav-link').forEach(l => l.onclick = () => $('#mobileNav').classList.remove('open'));

  // Theme
  $('#themeToggle').onclick = toggleTheme;

  // Language
  $$('.lang-btn').forEach(b => b.onclick = () => setLanguage(b.dataset.lang));

  // Impact counters on scroll
  let countersDone = false;
  const impactSec = document.querySelector('.impact-section');
  if (impactSec) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersDone) {
        animateCounters();
        countersDone = true;
      }
    }, { threshold: 0.3 });
    obs.observe(impactSec);
  }

  // Restore user session & update UI
  if (currentUser) {
    updateAuthUI();
  }

  // Smooth active nav on scroll
  const sections = $$('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY && sec.offsetTop + sec.offsetHeight > scrollY) {
        $$('.nav .nav-link').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  });
});

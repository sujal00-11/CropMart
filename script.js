/* =====================================================
   CropMart — Frontend Logic
   Demo data + interactions (backend-ready structure)
   ===================================================== */

// -------------------- DEMO DATA --------------------

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

const PRODUCTS = [
  {
    id: 1,
    name: 'Tomato',
    category: 'Vegetables',
    farmer: 'Ramesh Patil',
    fpo: 'Nashik Farmers FPO',
    location: 'Nashik',
    quantity: 500,
    price: 28,
    grade: 'A',
    harvest: '2026-09-02',
    image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80',
    delivery: '2-3 days',
    aiInsight: 'Demand rising. Suggested price ₹29/kg based on local average.'
  },
  {
    id: 2,
    name: 'Potato',
    category: 'Vegetables',
    farmer: 'Suresh Jadhav',
    fpo: 'Pune Agro FPO',
    location: 'Pune',
    quantity: 800,
    price: 18,
    grade: 'A',
    harvest: '2026-08-28',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
    delivery: '1-2 days',
    aiInsight: 'Stable demand. Good time to list additional stock.'
  },
  {
    id: 3,
    name: 'Onion',
    category: 'Vegetables',
    farmer: 'Anita Deshmukh',
    fpo: 'Lasalgaon Onion FPO',
    location: 'Nashik',
    quantity: 1200,
    price: 22,
    grade: 'B',
    harvest: '2026-08-20',
    image: 'https://images.unsplash.com/photo-1592924357228-91b4b5c7d0b0?w=400&q=80',
    delivery: '2-4 days',
    aiInsight: 'Slight price pressure. Consider bulk offers.'
  },
  {
    id: 4,
    name: 'Wheat',
    category: 'Grains',
    farmer: 'Vijay Shinde',
    fpo: 'Marathwada Grain FPO',
    location: 'Aurangabad',
    quantity: 2000,
    price: 24,
    grade: 'A',
    harvest: '2026-04-15',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    delivery: '3-5 days',
    aiInsight: 'Strong institutional demand expected next week.'
  },
  {
    id: 5,
    name: 'Rice',
    category: 'Grains',
    farmer: 'Kavita More',
    fpo: 'Konkan Rice Collective',
    location: 'Kolhapur',
    quantity: 1500,
    price: 42,
    grade: 'A',
    harvest: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    delivery: '3-5 days',
    aiInsight: 'Premium grade fetching higher margins.'
  },
  {
    id: 6,
    name: 'Mango',
    category: 'Fruits',
    farmer: 'Prakash Pawar',
    fpo: 'Ratnagiri Mango FPO',
    location: 'Kolhapur',
    quantity: 300,
    price: 65,
    grade: 'A',
    harvest: '2026-05-25',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
    delivery: '1-2 days',
    aiInsight: 'Seasonal peak. High match score with urban buyers.'
  },
  {
    id: 7,
    name: 'Cauliflower',
    category: 'Vegetables',
    farmer: 'Meena Kale',
    fpo: 'Pune Fresh FPO',
    location: 'Pune',
    quantity: 250,
    price: 30,
    grade: 'A',
    harvest: '2026-09-01',
    image: 'https://images.unsplash.com/photo-1568584711075-3d9217d9e5e0?w=400&q=80',
    delivery: '1-2 days',
    aiInsight: 'Short shelf life — prioritize nearby buyers.'
  },
  {
    id: 8,
    name: 'Mustard',
    category: 'Pulses',
    farmer: 'Ravi Chavan',
    fpo: 'Vidarbha Oilseed FPO',
    location: 'Nagpur',
    quantity: 900,
    price: 55,
    grade: 'B',
    harvest: '2026-03-20',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    delivery: '4-6 days',
    aiInsight: 'Oil mill demand steady. Good for bulk contracts.'
  }
];

const DEMAND_DATA = {
  tomato: { current: 820, predicted: 1050, trend: 27, rec: 'Increase supply', confidence: 87 },
  potato: { current: 620, predicted: 700, trend: 13, rec: 'Maintain supply', confidence: 82 },
  onion: { current: 1100, predicted: 980, trend: -11, rec: 'Reduce excess listing', confidence: 79 },
  wheat: { current: 2400, predicted: 2650, trend: 10, rec: 'Slight increase', confidence: 85 },
  rice: { current: 1800, predicted: 1950, trend: 8, rec: 'Maintain supply', confidence: 81 },
  mango: { current: 420, predicted: 510, trend: 21, rec: 'Increase supply', confidence: 88 }
};

const PRICE_DATA = {
  tomato: { market: 28, local: 26, suggested: 29, trend: 'up' },
  potato: { market: 18, local: 17, suggested: 19, trend: 'stable' },
  onion: { market: 22, local: 23, suggested: 21, trend: 'down' },
  wheat: { market: 24, local: 23.5, suggested: 25, trend: 'up' },
  rice: { market: 42, local: 40, suggested: 43, trend: 'up' },
  mango: { market: 65, local: 60, suggested: 68, trend: 'up' }
};

const BUYER_MATCHES = {
  tomato: [
    { name: 'FreshMart Wholesale', score: 96, req: 400, distance: 18, offer: 29 },
    { name: 'GreenBasket', score: 91, req: 300, distance: 25, offer: 28 },
    { name: 'CityFresh Retail', score: 84, req: 200, distance: 32, offer: 27 }
  ],
  potato: [
    { name: 'AgroLink Traders', score: 94, req: 600, distance: 22, offer: 19 },
    { name: 'FreshMart Wholesale', score: 88, req: 400, distance: 30, offer: 18 },
    { name: 'DailyVeg Co.', score: 79, req: 250, distance: 15, offer: 17.5 }
  ],
  onion: [
    { name: 'OnionHub Bulk', score: 93, req: 500, distance: 12, offer: 23 },
    { name: 'GreenBasket', score: 87, req: 350, distance: 28, offer: 22 },
    { name: 'MetroMart', score: 81, req: 200, distance: 40, offer: 21 }
  ]
};

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
    nav_home: 'Home',
    nav_marketplace: 'Marketplace',
    nav_how: 'How It Works',
    nav_ai: 'AI Insights',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_login: 'Login',
    nav_get_started: 'Get Started',
    hero_title: 'From Farm to Market,<br>Without the Middlemen.',
    hero_sub: 'AI-powered direct marketplace connecting farmers, FPOs, bulk buyers and consumers.',
    hero_explore: 'Explore Marketplace',
    hero_join: 'Join as Farmer',
    stat_direct: 'Direct Market Access',
    stat_price: 'Better Price Discovery',
    stat_match: 'Smart Buyer Matching',
    stat_delivery: 'Optimized Delivery',
    problem_title: 'The Broken Supply Chain',
    problem_sub: 'Too many hands, too little value for farmers and consumers.',
    market_title: 'Marketplace',
    market_sub: 'Fresh produce directly from farmers & FPOs',
    search_placeholder: 'Search products...',
    how_title: 'How It Works',
    how_sub: 'Predict → Match → Aggregate → Deliver',
    ai_title: 'AI Insights',
    ai_sub: 'Prototype AI predictions for demand, price & matching'
  },
  hi: {
    nav_home: 'होम',
    nav_marketplace: 'बाज़ार',
    nav_how: 'कैसे काम करता है',
    nav_ai: 'एआई इनसाइट्स',
    nav_about: 'हमारे बारे में',
    nav_contact: 'संपर्क',
    nav_login: 'लॉगिन',
    nav_get_started: 'शुरू करें',
    hero_title: 'खेत से बाज़ार तक,<br>बिना बिचौलियों के।',
    hero_sub: 'किसानों, एफपीओ, थोक खरीदारों और उपभोक्ताओं को जोड़ने वाला एआई-संचालित बाज़ार।',
    hero_explore: 'बाज़ार देखें',
    hero_join: 'किसान के रूप में जुड़ें',
    stat_direct: 'सीधी बाज़ार पहुँच',
    stat_price: 'बेहतर मूल्य खोज',
    stat_match: 'स्मार्ट खरीदार मैचिंग',
    stat_delivery: 'अनुकूलित डिलीवरी',
    problem_title: 'टूटी हुई आपूर्ति श्रृंखला',
    problem_sub: 'बहुत ज़्यादा हाथ, किसानों और उपभोक्ताओं के लिए बहुत कम मूल्य।',
    market_title: 'बाज़ार',
    market_sub: 'किसानों और एफपीओ से सीधे ताज़ी उपज',
    search_placeholder: 'उत्पाद खोजें...',
    how_title: 'कैसे काम करता है',
    how_sub: 'पूर्वानुमान → मैच → एकत्रीकरण → डिलीवरी',
    ai_title: 'एआई इनसाइट्स',
    ai_sub: 'माँग, मूल्य और मैचिंग के लिए प्रोटोटाइप एआई पूर्वानुमान'
  }
};

// -------------------- STATE --------------------
let cart = JSON.parse(localStorage.getItem('cm_cart') || '[]');
let currentUser = JSON.parse(localStorage.getItem('cm_user') || 'null');
let currentOrderStatus = 0;
let demandChart = null;
let priceChart = null;
let filteredProducts = [...PRODUCTS];
let myProduce = []; // farmer listed items

// -------------------- UTILITIES --------------------
function $(sel, ctx = document) {
  return ctx.querySelector(sel);
}

function $$(sel, ctx = document) {
  return [...ctx.querySelectorAll(sel)];
}

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

// -------------------- RENDER PRODUCTS --------------------
function renderProducts(list = filteredProducts) {
  const grid = $('#productGrid');
  if (!list.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">No products match your filters.</p>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-img">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\\'placeholder\\'><i class=\\'fas fa-leaf\\'></i></span>'" />` : `<span class="placeholder"><i class="fas fa-leaf"></i></span>`}
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="product-meta">
          <span><i class="fas fa-user"></i> ${p.farmer}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${p.location}</span>
        </div>
        <div class="product-meta">
          <span>Qty: ${p.quantity} kg</span>
          <span>Grade: ${p.grade}</span>
        </div>
        <div class="product-price">${formatINR(p.price)} <small>/ kg</small></div>
        <div class="product-actions">
          <button class="btn btn-outline btn-sm view-btn" data-id="${p.id}">View Details</button>
          <button class="btn btn-primary btn-sm buy-btn" data-id="${p.id}">Buy Now</button>
        </div>
      </div>
    </article>
  `).join('');

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

  filteredProducts = PRODUCTS.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.farmer.toLowerCase().includes(q);
    const matchC = !cat || p.category === cat;
    const matchL = !loc || p.location === loc;
    const matchP = p.price <= maxPrice;
    return matchQ && matchC && matchL && matchP;
  });

  if (sort === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
  else if (sort === 'qty-desc') filteredProducts.sort((a, b) => b.quantity - a.quantity);

  renderProducts();
}

// -------------------- PRODUCT MODAL --------------------
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id) || myProduce.find(x => x.id === id);
  if (!p) return;
  const body = $('#productModalBody');
  body.innerHTML = `
    <div class="pm-img">
      ${p.image ? `<img src="${p.image}" alt="${p.name}" />` : `<span class="placeholder" style="font-size:4rem;color:var(--accent)"><i class="fas fa-leaf"></i></span>`}
    </div>
    <h2>${p.name}</h2>
    <div class="pm-details">
      <div><span>Farmer / FPO</span><strong>${p.farmer}${p.fpo ? ' · ' + p.fpo : ''}</strong></div>
      <div><span>Location</span><strong>${p.location}</strong></div>
      <div><span>Available</span><strong>${p.quantity} kg</strong></div>
      <div><span>Price</span><strong>${formatINR(p.price)} / kg</strong></div>
      <div><span>Quality Grade</span><strong>${p.grade}</strong></div>
      <div><span>Harvest Date</span><strong>${p.harvest}</strong></div>
      <div><span>Expected Delivery</span><strong>${p.delivery || '2-4 days'}</strong></div>
    </div>
    <div class="pm-ai"><i class="fas fa-brain"></i> <strong>AI Price Insight:</strong> ${p.aiInsight || 'Prototype prediction available in AI Insights.'}</div>
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
  const p = PRODUCTS.find(x => x.id === id) || myProduce.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id: p.id, name: p.name, price: p.price, qty, image: p.image });
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

function openCart() {
  $('#cartDrawer').classList.add('open');
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
}

// -------------------- AI INSIGHTS --------------------
function renderDemand(crop = 'tomato') {
  const d = DEMAND_DATA[crop];
  if (!d) return;
  $('#demandCards').innerHTML = `
    <div class="demand-stat"><div class="label">Current Demand</div><div class="value">${d.current} kg</div></div>
    <div class="demand-stat"><div class="label">Predicted Demand</div><div class="value">${d.predicted} kg</div></div>
    <div class="demand-stat"><div class="label">Trend</div><div class="value ${d.trend >= 0 ? 'trend-up' : 'trend-down'}">${d.trend >= 0 ? '↑' : '↓'} ${Math.abs(d.trend)}%</div></div>
    <div class="demand-stat"><div class="label">Recommendation</div><div class="value" style="font-size:1rem">${d.rec}</div></div>
    <div class="demand-stat"><div class="label">Confidence</div><div class="value">${d.confidence}%</div></div>
  `;

  const ctx = $('#demandChart').getContext('2d');
  if (demandChart) demandChart.destroy();
  demandChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Current', 'Predicted'],
      datasets: [{
        label: 'Demand (kg)',
        data: [d.current, d.predicted],
        backgroundColor: ['#66bb6a', '#1b5e20'],
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

function renderPrice(crop = 'tomato') {
  const p = PRICE_DATA[crop];
  if (!p) return;
  const ind = p.trend === 'up' ? '↑ Price increasing' : p.trend === 'down' ? '↓ Price decreasing' : '→ Stable';
  const cls = p.trend === 'up' ? 'up' : p.trend === 'down' ? 'down' : 'stable';
  $('#priceIntel').innerHTML = `
    <div class="price-box"><div class="label">Current Market Price</div><div class="value">${formatINR(p.market)}/kg</div></div>
    <div class="price-box"><div class="label">Local Average</div><div class="value">${formatINR(p.local)}/kg</div></div>
    <div class="price-box"><div class="label">AI Suggested Price</div><div class="value">${formatINR(p.suggested)}/kg</div></div>
    <div class="price-box"><div class="label">Price Trend</div><div class="indicator ${cls}">${ind}</div></div>
  `;

  const ctx = $('#priceChart').getContext('2d');
  if (priceChart) priceChart.destroy();
  // Simple trend line (demo)
  const base = p.market;
  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'Now', 'Forecast'],
      datasets: [{
        label: 'Price ₹/kg',
        data: [base - 3, base - 1, base + 1, base - 0.5, base, p.suggested],
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

function renderBuyerMatches(product = 'tomato', sortBy = 'score') {
  let list = [...(BUYER_MATCHES[product] || [])];
  if (sortBy === 'score') list.sort((a, b) => b.score - a.score);
  else if (sortBy === 'price') list.sort((a, b) => b.offer - a.offer);
  else if (sortBy === 'distance') list.sort((a, b) => a.distance - b.distance);
  else if (sortBy === 'qty') list.sort((a, b) => b.req - a.req);

  $('#buyerMatches').innerHTML = list.map((b, i) => `
    <div class="match-card">
      <h4>${i + 1}. ${b.name}</h4>
      <div class="match-info">
        <span>Match Score: <strong>${b.score}%</strong></span>
        <span>Requirement: ${b.req} kg</span>
        <span>Distance: ${b.distance} km</span>
        <span>Offer: ${formatINR(b.offer)}/kg</span>
      </div>
      <div class="match-score-bar"><div class="match-score-fill" style="width:0%" data-score="${b.score}"></div></div>
      <div class="match-actions">
        <button class="btn btn-outline btn-sm">View Buyer</button>
        <button class="btn btn-primary btn-sm accept-offer">Accept Offer</button>
      </div>
    </div>
  `).join('');

  // Animate bars
  requestAnimationFrame(() => {
    $$('.match-score-fill').forEach(el => {
      el.style.width = el.dataset.score + '%';
    });
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

// -------------------- LOGISTICS --------------------
function optimizeRoute() {
  const distances = [38, 35, 42, 31, 29];
  const times = ['1h 05m', '58m', '1h 15m', '52m', '48m'];
  const costs = [780, 720, 850, 690, 650];
  const i = Math.floor(Math.random() * distances.length);
  $('#routeDistance').textContent = distances[i] + ' km';
  $('#routeTime').textContent = times[i];
  $('#routeCost').textContent = formatINR(costs[i]);
  toast('Route optimized by AI (Prototype)');
}

// -------------------- AUTH --------------------
function openAuth(tab = 'login') {
  $('#authModal').classList.add('open');
  switchAuthTab(tab);
}

function switchAuthTab(tab) {
  $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $('#loginForm').classList.toggle('hidden', tab !== 'login');
  $('#signupForm').classList.toggle('hidden', tab !== 'signup');
}

function handleLogin(e) {
  e.preventDefault();
  const type = $('#loginType').value;
  const email = $('#loginEmail').value;
  if (!type || !email) return;
  currentUser = { type, email, name: email.split('@')[0] };
  localStorage.setItem('cm_user', JSON.stringify(currentUser));
  $('#authModal').classList.remove('open');
  toast(`Welcome back! Logged in as ${type}`);
  showDashboard(type);
}

function handleSignup(e) {
  e.preventDefault();
  const type = $('#signupType').value;
  const name = $('#signupName').value;
  const email = $('#signupEmail').value;
  if (!type || !name || !email) return;
  currentUser = { type, name, email, phone: $('#signupPhone').value, location: $('#signupLocation').value };
  localStorage.setItem('cm_user', JSON.stringify(currentUser));
  $('#authModal').classList.remove('open');
  toast(`Account created! Welcome, ${name}`);
  showDashboard(type);
}

function showDashboard(type) {
  // Hide main sections, show relevant dashboard
  const isFarmer = type === 'farmer' || type === 'fpo';
  const isBuyer = type === 'buyer';

  if (isFarmer) {
    $('#farmerDashboard').classList.remove('hidden');
    $('#buyerDashboard').classList.add('hidden');
    updateFarmerStats();
    window.scrollTo({ top: $('#farmerDashboard').offsetTop - 80, behavior: 'smooth' });
  } else if (isBuyer) {
    $('#buyerDashboard').classList.remove('hidden');
    $('#farmerDashboard').classList.add('hidden');
    window.scrollTo({ top: $('#buyerDashboard').offsetTop - 80, behavior: 'smooth' });
  } else {
    // Consumer — stay on marketplace
    toast('You can now browse and buy produce');
    document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' });
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem('cm_user');
  $('#farmerDashboard').classList.add('hidden');
  $('#buyerDashboard').classList.add('hidden');
  toast('Logged out');
}

function updateFarmerStats() {
  const total = PRODUCTS.length + myProduce.length;
  $('#fdTotalProduce').textContent = total;
  $('#fdActiveOrders').textContent = 3;
  $('#fdTotalSales').textContent = '₹48,200';
  $('#fdPending').textContent = '₹12,400';
  if (currentUser) {
    $('#farmerProfileInfo').textContent = `Logged in as ${currentUser.name || currentUser.email} (${currentUser.type})`;
  }
}

// -------------------- FARMER LIST PRODUCE --------------------
function handleListProduce(e) {
  e.preventDefault();
  const item = {
    id: Date.now(),
    name: $('#lpName').value,
    category: $('#lpCategory').value,
    quantity: +$('#lpQty').value,
    price: +$('#lpPrice').value,
    grade: $('#lpQuality').value,
    harvest: $('#lpHarvest').value,
    location: $('#lpLocation').value,
    farmer: currentUser?.name || 'You',
    fpo: currentUser?.type === 'fpo' ? 'Your FPO' : '',
    image: $('#lpImage').value || '',
    delivery: '2-4 days',
    aiInsight: 'New listing — AI will generate insights after more data.'
  };
  myProduce.push(item);
  PRODUCTS.push(item); // also appear in marketplace for demo
  renderMyProduce();
  filterProducts();
  $('#listProduceForm').reset();
  $('#listProduceForm').classList.add('hidden');
  updateFarmerStats();
  toast('Produce listed successfully!');
}

function renderMyProduce() {
  const el = $('#myProduceList');
  const all = [...myProduce];
  if (!all.length) {
    el.innerHTML = '<p style="color:var(--text-muted)">No produce listed yet. Click “List New Produce”.</p>';
    return;
  }
  el.innerHTML = all.map(p => `
    <div class="product-card">
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="product-meta">${p.quantity} kg · ${formatINR(p.price)}/kg · Grade ${p.grade}</div>
        <div class="product-meta">${p.location} · ${p.harvest}</div>
      </div>
    </div>
  `).join('');
}

// -------------------- BULK REQUIREMENT --------------------
function handleBulkReq(e) {
  e.preventDefault();
  const product = $('#brProduct').value.toLowerCase();
  const matches = BUYER_MATCHES[product] || BUYER_MATCHES.tomato;
  // Reuse match cards but label as farmers
  $('#bulkMatches').innerHTML = `
    <h4 style="margin:16px 0 12px">Matching Farmers (Prototype)</h4>
    ${matches.map((b, i) => `
      <div class="match-card">
        <h4>${i + 1}. Farmer near ${b.distance} km</h4>
        <div class="match-info">
          <span>Match: <strong>${b.score}%</strong></span>
          <span>Available ~${b.req + 100} kg</span>
          <span>Offer: ${formatINR(b.offer - 1)}/kg</span>
        </div>
        <div class="match-score-bar"><div class="match-score-fill" style="width:${b.score}%"></div></div>
        <button class="btn btn-primary btn-sm">Contact Farmer</button>
      </div>
    `).join('')}
  `;
  toast('Matching farmers found (Prototype)');
}

// -------------------- CHECKOUT --------------------
function handleCheckout(e) {
  e.preventDefault();
  const orderId = 'CM-' + Date.now().toString().slice(-8);
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

  // Products
  renderProducts();

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
    const key = e.target.value;
    renderBuyerMatches(key, $('#matchSort').value);
  });
  $('#matchSort').addEventListener('change', e => {
    const key = $('#matchProduct').value;
    renderBuyerMatches(key, e.target.value);
  });

  // Order
  renderOrder();
  $('#nextStatusBtn').onclick = () => {
    if (currentOrderStatus < ORDER_STATUSES.length - 1) {
      currentOrderStatus++;
      renderOrder();
    }
  };
  $('#prevStatusBtn').onclick = () => {
    if (currentOrderStatus > 0) {
      currentOrderStatus--;
      renderOrder();
    }
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

  // Restore user session
  if (currentUser) {
    // Optionally auto-show dashboard
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

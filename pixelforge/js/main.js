// ── CURSOR ─────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if (cursor) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * .13; ry += (my - ry) * .13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button, .price-btn, .form-submit, .toggle-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(1.8)'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
}

// ── NAVBAR SCROLL ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ────────────────────────────────────────────────
const mobOverlay = document.getElementById('mobOverlay');
document.getElementById('mobOpen')?.addEventListener('click', () => mobOverlay?.classList.add('open'));
document.getElementById('mobClose')?.addEventListener('click', closeMob);
function closeMob() { mobOverlay?.classList.remove('open'); }

// ── MARQUEE ────────────────────────────────────────────────────
const marqueeEl = document.getElementById('marquee');
if (marqueeEl) {
  const items = ['Shopify Development','WooCommerce','UI/UX Design','Performance','Custom Integrations','CRO Strategy','E-Commerce Experts','Fast Delivery','Conversion Focused','Mobile First'];
  const full = [...items, ...items, ...items, ...items].map(t => `<span class="marquee-item">${t}</span>`).join('');
  marqueeEl.innerHTML = full;
}

// ── COUNTER ANIMATION ──────────────────────────────────────────
function animCount(el, target, duration) {
  if (!el) return;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
setTimeout(() => {
  animCount(document.getElementById('convCounter'), 147, 2000);
  animCount(document.getElementById('projCounter'), 120, 1800);
  animCount(document.getElementById('retCounter'), 94, 1500);
}, 500);

// ── SCROLL FADE IN ─────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── PRICING TOGGLE ─────────────────────────────────────────────
const retainerPrices = { p1: '$800', p1s: 'per month', p2: '$1,800', p2s: 'per month', p3: '$3,500+', p3s: 'per month' };
const projectPrices  = { p1: '$2,500', p1s: 'one-time project', p2: '$6,500', p2s: 'one-time project', p3: '$14k+', p3s: 'custom scope' };
function setFreq(type, btn) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const prices = type === 'monthly' ? retainerPrices : projectPrices;
  Object.entries(prices).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) { el.style.opacity = '0'; setTimeout(() => { el.textContent = val; el.style.opacity = '1'; }, 180); }
  });
}

// ── FAQ ────────────────────────────────────────────────────────
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}

// ── CONTACT FORM ───────────────────────────────────────────────
function scrollContact(pkg) {
  const el = document.getElementById('contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const sel = document.getElementById('ftype');
    if (sel && pkg) {
      const map = { Starter: 'Shopify Development', Growth: 'Shopify Development', Premium: 'Custom E-Commerce' };
      sel.value = map[pkg] || '';
    }
  }, 700);
}

function submitForm() {
  const name = document.getElementById('fname')?.value.trim();
  const email = document.getElementById('femail')?.value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (btn) btn.style.display = 'none';
  if (success) success.style.display = 'block';
}

// ── LIVE CHAT ──────────────────────────────────────────────────
const chatBox = document.getElementById('chatBox');
function toggleChat() { chatBox?.classList.toggle('open'); }

const chatResponses = {
  default: "Thanks for reaching out! For a quick response, fill in the contact form below or email us at hello@pixelforge.agency 🚀",
  price: "Our packages start at $2,500 for a Starter site. Growth is $6,500 and Premium starts at $14k. We also offer monthly retainers from $800/mo!",
  time: "Typical timelines: Starter (3–4 weeks), Growth (5–8 weeks), Premium (8–16 weeks). We can sometimes fast-track — just ask!",
  shopify: "Shopify is our specialty! Custom themes, app integrations, migration, and optimization — we handle it all.",
  hello: "Hey! 👋 Great to hear from you. How can we help with your e-commerce store today?",
  portfolio: "Check out our portfolio page to see case studies from LuxThread, Verdura Wellness, and Meridian Watches — all with real results!",
};

function sendChat() {
  const input = document.getElementById('chatInput');
  const body = document.getElementById('chatBody');
  if (!input || !body) return;
  const msg = input.value.trim();
  if (!msg) return;
  body.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  input.value = '';
  body.scrollTop = body.scrollHeight;
  const lower = msg.toLowerCase();
  let reply = chatResponses.default;
  if (/hi|hello|hey/.test(lower)) reply = chatResponses.hello;
  else if (/price|cost|how much|pricing/.test(lower)) reply = chatResponses.price;
  else if (/time|long|week|fast|quick/.test(lower)) reply = chatResponses.time;
  else if (/shopify/.test(lower)) reply = chatResponses.shopify;
  else if (/portfolio|work|example|case/.test(lower)) reply = chatResponses.portfolio;
  setTimeout(() => {
    body.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 700);
}

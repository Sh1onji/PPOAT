const $ = id => document.getElementById(id);
const peso = n => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);
const toISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const prettyDate = v => v ? new Date(v + 'T00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

/* ---------- selection: URL first, then copy saved by order.js ---------- */
let saved = {};
try { saved = JSON.parse(sessionStorage.getItem('teyvatOrder')) || {}; } catch (e) {}
const q = new URLSearchParams(location.search);
const get = k => q.get(k) || saved[k] || '';

const nation = get('nation') || 'Not selected';
const pkg    = get('package') || 'Not selected';
const theme  = get('theme').replace(/[^a-z]/g, '');
const img    = get('img');
const rate   = window.PACKAGES[pkg.toLowerCase()] ?? window.DEFAULT_RATE;

$('package-name').textContent = pkg;       // textContent: URL values can't inject HTML
$('nation-name').textContent  = nation;
$('f-nation').value  = nation;
$('f-package').value = pkg;
$('s-rate').textContent = peso(rate);
if (theme) document.body.dataset.nation = theme;

const imgEl = $('summary-img');
if (img.startsWith('../images/') && !img.includes('..', 3)) { imgEl.src = img.replace('../', ''); imgEl.alt = pkg; }
else imgEl.remove();

if (!get('package')) $('no-package').hidden = false;

/* ---------- reviews ---------- */
const reviews = window.REVIEWS[nation.toLowerCase()];
if (reviews) {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  $('rating-line').textContent = `★ ${avg.toFixed(1)} · ${reviews.length} traveler reviews`;
  $('rev-nation').textContent = nation;
  reviews.forEach(r => {
    const card = document.createElement('article');
    card.className = 'review';
    const s = document.createElement('div'); s.className = 'stars'; s.textContent = stars(r.rating);
    const t = document.createElement('p');   t.textContent = '“' + r.text + '”';
    const n = document.createElement('span'); n.textContent = '— ' + r.name;
    card.append(s, t, n);
    $('review-grid').append(card);
  });
  $('reviews').hidden = false;
}

/* ---------- dates, travelers, live price ---------- */
const dep = $('departure_date'), ret = $('return_date'), trav = $('travelers');
dep.min = toISO(new Date());

function nightsBetween() {
  if (!dep.value || !ret.value) return 0;
  return Math.max(0, Math.round((new Date(ret.value + 'T00:00') - new Date(dep.value + 'T00:00')) / 864e5));
}
function updateSummary() {
  const nights = nightsBetween();
  const total  = rate * +trav.value * nights;
  $('s-dep').textContent    = prettyDate(dep.value);
  $('s-ret').textContent    = prettyDate(ret.value);
  $('s-nights').textContent = nights ? `${nights} night${nights > 1 ? 's' : ''}` : '—';
  $('s-trav').textContent   = trav.value;
  $('s-total').textContent  = peso(total);
  $('f-total').value = total;
}
dep.addEventListener('change', () => {
  if (dep.value) {
    const next = new Date(dep.value + 'T00:00'); next.setDate(next.getDate() + 1);
    ret.min = toISO(next);                       // return must be after departure
    if (ret.value && ret.value < ret.min) ret.value = '';
  }
  updateSummary();
});
ret.addEventListener('change', updateSummary);
document.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => {
  trav.value = Math.min(10, Math.max(1, +trav.value + +b.dataset.step));
  updateSummary();
}));
updateSummary();

/* ---------- payment method tabs ---------- */
const cardFields = $('card-fields');
document.querySelectorAll('input[name="method"]').forEach(r => r.addEventListener('change', () => {
  if (!r.checked) return;
  const isCard = r.value === 'Card';
  cardFields.hidden = !isCard;
  cardFields.querySelectorAll('input').forEach(i => i.required = isCard);
}));

/* ---------- input formatting ---------- */
$('card_number').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
});
$('expiry_date').addEventListener('input', e => {
  const v = e.target.value.replace(/\D/g, '').slice(0, 4);
  e.target.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
});
$('cvv').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); });

/* ---------- submit -> confirmation page ---------- */
$('booking-form').addEventListener('submit', e => {
  e.preventDefault();
  if (!get('package')) { $('no-package').hidden = false; window.scrollTo(0, 0); return; }
  const nights = nightsBetween();
  const ref = 'HXN-' + Math.random().toString(36).slice(2, 8).toUpperCase();

  // Card details are deliberately NOT stored anywhere.
  const booking = {
    ref, nation, package: pkg, theme, img: imgEl.isConnected ? img : '',
    name: $('name').value.trim(), email: $('email').value.trim(), phone: $('phone').value.trim(),
    departure: dep.value, return: ret.value, nights, travelers: +trav.value, rate,
    total: rate * +trav.value * nights,
    method: document.querySelector('input[name="method"]:checked').value,
    createdAt: new Date().toISOString()
  };
  try { sessionStorage.setItem('teyvatBooking', JSON.stringify(booking)); sessionStorage.removeItem('teyvatOrder'); } catch (err) {}
  location.href = 'confirmation.html';
});

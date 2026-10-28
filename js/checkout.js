// Read selection: URL first, then the copy saved by order.js
let saved = {};
try { saved = JSON.parse(sessionStorage.getItem('teyvatOrder')) || {}; } catch (e) {}
const q = new URLSearchParams(location.search);
const get = k => q.get(k) || saved[k] || '';

const nation = get('nation') || 'Not selected';
const pkg    = get('package') || 'Not selected';
const theme  = get('theme').replace(/[^a-z]/g, '');
const img    = get('img');
const hasPackage = !!get('package');

// textContent (not innerHTML) so URL values can never inject HTML
document.getElementById('package-name').textContent = pkg;
document.getElementById('nation-name').textContent  = nation;
document.getElementById('f-nation').value  = nation;
document.getElementById('f-package').value = pkg;
if (theme) document.body.dataset.nation = theme;

// only accept images from our own images folder
const imgEl = document.getElementById('summary-img');
if (img.startsWith('../images/') && !img.includes('..', 3)) {
  imgEl.src = img.replace('../', '');
  imgEl.alt = pkg;
} else imgEl.remove();

// no package chosen -> send user back
if (!hasPackage) document.getElementById('no-package').hidden = false;

// travel date can't be in the past
document.getElementById('travel_date').min = new Date().toISOString().split('T')[0];

// traveler stepper
const trav = document.getElementById('travelers');
document.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => {
  trav.value = Math.min(10, Math.max(1, +trav.value + +b.dataset.step));
}));

// payment method tabs
const cardFields = document.getElementById('card-fields');
document.querySelectorAll('input[name="method"]').forEach(r => r.addEventListener('change', () => {
  const isCard = r.value === 'card' && r.checked;
  if (r.checked) {
    cardFields.hidden = !isCard;
    cardFields.querySelectorAll('input').forEach(i => i.required = isCard);
  }
}));

// input formatting
document.getElementById('card_number').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
});
document.getElementById('expiry_date').addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  e.target.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
});
document.getElementById('cvv').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

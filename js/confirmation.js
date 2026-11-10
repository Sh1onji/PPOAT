const $ = id => document.getElementById(id);
const peso = n => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);
const pretty = v => new Date(v + 'T00:00').toLocaleDateString('en-PH', { dateStyle: 'long' });

let b = null;
try { b = JSON.parse(sessionStorage.getItem('teyvatBooking')); } catch (e) {}

if (!b) { $('empty').hidden = false; }
else {
  const set = (id, v) => { $(id).textContent = v; };   // textContent only
  set('c-name', b.name);       set('c-email', b.email);   set('c-ref', b.ref);
  set('c-nation', b.nation);   set('c-package', b.package);
  set('c-dep', pretty(b.departure)); set('c-ret', pretty(b.return));
  set('c-nights', `${b.nights} night${b.nights > 1 ? 's' : ''}`);
  set('c-trav', b.travelers);  set('c-phone', b.phone);   set('c-method', b.method);
  set('c-rate', peso(b.rate)); set('c-total', peso(b.total));

  const theme = (b.theme || '').replace(/[^a-z]/g, '');
  if (theme) document.body.dataset.nation = theme;

  const img = $('c-img');
  if ((b.img || '').startsWith('../images/') && !b.img.includes('..', 3)) img.src = b.img.replace('../', '');
  else img.remove();

  $('receipt').hidden = false;
  document.title = 'Booking ' + b.ref + ' | Hexanova Agency';
}
$('print-btn')?.addEventListener('click', () => window.print());

// Add to every nation page (nations/*.html), right before </body>:
// <script src="../js/order.js"></script>
document.querySelectorAll('.order-button').forEach(btn => {
  const card = btn.closest('.pk-card');
  if (!card) return;

  const selection = {
    nation:  document.querySelector('.hero h1')?.textContent.trim() || 'Teyvat',
    package: card.querySelector('strong')?.textContent.trim() || 'Package',
    img:     card.querySelector('img')?.getAttribute('src') || '',
    theme:   location.pathname.split('/').pop().replace('.html', '').toLowerCase()
  };

  // 1) put it in the link
  btn.href = '../forms_payment.html?' + new URLSearchParams(selection).toString();

  // 2) also save it in the browser when the button is clicked
  btn.addEventListener('click', () => {
    try { sessionStorage.setItem('teyvatOrder', JSON.stringify(selection)); } catch (e) {}
  });
});

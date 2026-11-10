// EDIT THIS FILE to change prices and reviews. Keys are the package names
// exactly as written in the <strong> tag of each nation page, in lowercase.
// Prices are PHP per person, per night (PLACEHOLDER VALUES).
window.DEFAULT_RATE = 5000;
window.PACKAGES = {
  // Fontaine
  'court of fontaine': 6500, 'romaritime harbor': 5500, 'lumidouce harbor': 5000, 'opera épiclèse': 7000,
  // Inazuma
  'hanamizaka package': 4000, 'tenryou package': 5500, 'tenshukaku package': 7500, 'shrine package': 9000,
  // Liyue
  'liyue harbor': 5000, 'jueyun karst': 4200, 'qingce village': 3500, 'guyun stone forest': 4800,
  // Monstadt
  'mondstadt city': 4500, 'springvale': 3200, 'cider lake': 3800, 'windrise': 3500,
  // Natlan
  'stadium of the sacred flame': 6000, 'people of the springs': 5200, 'children of the echoes': 4800, 'scions of the canopy': 4500,
  // Snezhnaya
  'snezhnaya city': 7000, 'zapolyarny palace': 9500, 'morepesok': 5500, 'nod krai': 6500,
  // Sumeru
  'sumeru city': 5500, 'vanarana': 4800, 'port ormos': 4200, 'aaru village': 3800
};

// Reviews per nation (SAMPLE TEXT). Key = nation name in lowercase.
window.REVIEWS = {
  monstadt: [
    { name: 'Maria S.',  rating: 5, text: 'The windmills and open fields were unreal. Our guide knew every hidden spot.' },
    { name: 'Paolo R.',  rating: 4, text: 'Relaxing trip, great food. Cider Lake at sunset was the highlight.' },
    { name: 'Jenna L.',  rating: 5, text: 'Perfect first stop on our Teyvat tour. Very friendly locals.' } ],
  liyue: [
    { name: 'Carlo M.',  rating: 5, text: 'The harbor market is incredible. Everything was well organised.' },
    { name: 'Anna T.',   rating: 5, text: 'Jueyun Karst views were breathtaking. Worth every peso.' },
    { name: 'Ramon D.',  rating: 4, text: 'Lots of walking, but the stone forest tour was unforgettable.' } ],
  inazuma: [
    { name: 'Kyla B.',   rating: 5, text: 'Cherry blossoms and shrines everywhere. Felt like a dream.' },
    { name: 'Migo A.',   rating: 4, text: 'Beautiful and peaceful. The weather was stormy but the guides handled it well.' },
    { name: 'Sofia V.',  rating: 5, text: 'Tenshukaku was the highlight of my whole trip.' } ],
  sumeru: [
    { name: 'Nico P.',   rating: 5, text: 'From rainforest to desert in one trip. Amazing variety.' },
    { name: 'Bea C.',    rating: 4, text: 'The Akademiya tour was fascinating. Bring water for the desert part!' },
    { name: 'Luis G.',   rating: 5, text: 'Treetop stay in Vanarana was magical.' } ],
  fontaine: [
    { name: 'Isabel F.', rating: 5, text: 'Elegant city, great opera night. Loved every minute.' },
    { name: 'Dennis O.', rating: 4, text: 'The harbors are charming and the food is excellent.' },
    { name: 'Tina H.',   rating: 5, text: 'Courtroom tour felt like watching a live show.' } ],
  natlan: [
    { name: 'Rico J.',   rating: 5, text: 'The stadium atmosphere is electric. Do not miss the hot springs.' },
    { name: 'Alyssa N.', rating: 4, text: 'Lively and full of adventure. Great for groups.' },
    { name: 'Marco E.',  rating: 5, text: 'The tribes were so welcoming. Best food of the whole tour.' } ],
  snezhnaya: [
    { name: 'Hannah K.', rating: 4, text: 'Very cold but gorgeous. Pack warm clothes and enjoy the stews.' },
    { name: 'Joel W.',   rating: 5, text: 'Snezhnaya City at night is stunning.' },
    { name: 'Cathy Z.',  rating: 4, text: 'Unique trip. The guides made the cold bearable.' } ]
};

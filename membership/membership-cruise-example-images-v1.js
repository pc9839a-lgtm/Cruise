(() => {
  'use strict';

  /* The supplied artwork already contains cruise name + price.
     Asia and Mediterranean artwork were previously mapped in reverse. */
  const ITEMS = [
    {
      label: '아시아 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/pevn5zoo2fsnxzmqxmh9.png'
    },
    {
      label: '디즈니 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/j4ippct6ag07tqpifkbj.png'
    },
    {
      label: '지중해 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/fvmk2pzl5lazua8vnuef.png'
    },
    {
      label: '북유럽 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/jhtcfifjkiuvkinguj64.png'
    }
  ];

  function installStyles() {
    if (document.getElementById('mx-cruise-example-images-style')) return;

    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

  function mountImages() {
    const section = document.getElementById('mx-cruise-price-examples');
    if (!section) return false;

    const cards = [...section.querySelectorAll('.mx10p-price-item')];
    if (cards.length < ITEMS.length) return false;

    cards.slice(0, ITEMS.length).forEach((card, index) => {
      const item = ITEMS[index];
      card.innerHTML = '';

      const photo = document.createElement('div');
      photo.className = 'mx10p-photo';
      photo.style.setProperty('--mx-photo-delay', `${150 + index * 105}ms`);

      const img = document.createElement('img');
      img.src = item.url;
      img.alt = `${item.label} 가격 예시`;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 1122;
      img.height = 1402;

      photo.appendChild(img);
      card.appendChild(photo);
    });

    /* Artwork already carries name/price, so old text below it is duplicate. */
    section.querySelector('.mx10p-note')?.remove();
    return true;
  }

  function init() {
    installStyles();
    if (mountImages()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (mountImages() || tries >= 60) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

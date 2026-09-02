(() => {
  'use strict';

  function buildSection6() {
    const route = document.getElementById('impact-med');
    const price = document.getElementById('price-pain');
    if (!route || !price) return false;

    price.classList.add('mx6-price-barrier');
    price.setAttribute('data-membership-section', '6');

    if (route.nextElementSibling !== price) {
      route.insertAdjacentElement('afterend', price);
    }

    return true;
  }

  function init() {
    if (buildSection6()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection6() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

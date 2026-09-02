(() => {
  'use strict';

  function buildSection6() {
    const route = document.getElementById('impact-med');
    const price = document.getElementById('price-pain');
    if (!route || !price) return false;

    price.classList.add('mx6-price-barrier');
    price.setAttribute('data-membership-section', '6');

    const kicker = price.querySelector('.mv2-kicker');
    const title = price.querySelector('.mv2-title');
    const mega = price.querySelector('.mv2-mega');
    const save = price.querySelector('.mv2-save');

    if (kicker) kicker.textContent = '결국 비싸잖아?';
    if (title) title.innerHTML = '맞습니다.<br><strong>패키지로 예약하면 비쌉니다.</strong>';
    if (mega) mega.textContent = '약 400만원';
    if (save) save.innerHTML = '4박 5일 / 2명<br>여행사·가이드 포함 예시';

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

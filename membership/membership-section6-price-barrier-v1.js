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

    if (kicker) kicker.textContent = '지중해 크루즈, 결국 비싸잖아?';
    if (title) title.innerHTML = '여행사 패키지로 보면<br><strong>2인 기준</strong>';
    if (mega) mega.textContent = '약 890만원';
    if (save) save.innerHTML = '그래서 제 실제<br><strong>바르셀로나 출발 7박 서부 지중해 영수증과 비교합니다.</strong>';

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

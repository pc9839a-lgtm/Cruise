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

    if (kicker) kicker.remove();
    if (title) {
      title.className = 'mx6-title';
      title.innerHTML = '그런데 크루즈는 비싸잖아?<br><strong>여행사 패키지로 알아보면</strong>';
    }
    if (mega) mega.textContent = '2인 약 890만원';
    if (save) save.innerHTML = '그래서 저는 <strong>다른 예약 방법을 찾아봤습니다</strong>';

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

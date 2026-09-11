(() => {
  'use strict';

  function buildSection6() {
    const route = document.getElementById('impact-med');
    const price = document.getElementById('price-pain');
    if (!route || !price) return false;

    price.className = 'mx6-price-barrier';
    price.setAttribute('data-membership-section', '6');
    price.innerHTML = `
      <div class="mv2-inner">
        <h2 class="mx6-bridge-question">그런데<br><strong>크루즈는 비싸잖아?</strong></h2>
        <p class="mx6-context">여행사 패키지 · 2인 기준</p>
        <div class="mv2-mega">약 890만원</div>
        <p class="mv2-save">그래서 저는 <strong>다른 예약 방법을 찾아봤습니다</strong></p>
      </div>`;

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

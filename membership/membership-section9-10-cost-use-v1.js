(() => {
  'use strict';

  function buildSection9() {
    const section8 = document.getElementById('same-cruise');
    const section9 = document.getElementById('guide-question');
    if (!section8 || !section9) return false;

    const cost = document.getElementById('mx-cost-structure');
    const savings = document.getElementById('m3-savings-use');
    if (cost) cost.remove();
    if (savings) savings.remove();

    section9.className = 'mx11-guide-section mx9-club-section';
    section9.setAttribute('data-membership-section', '9');
    section9.innerHTML = `
      <div class="mx11-inner">
        <span class="mx11-kicker">그 POINT는 어디서 생겼을까요?</span>
        <h2 class="mx11-title">전 세계 약 <strong>350만 명</strong>이 이용하는<br><strong>회원제 크루즈클럽</strong></h2>
      </div>`;

    if (section8.nextElementSibling !== section9) {
      section8.insertAdjacentElement('afterend', section9);
    }

    return true;
  }

  function init() {
    if (buildSection9()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection9() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

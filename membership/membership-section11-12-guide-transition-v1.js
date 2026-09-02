(() => {
  'use strict';

  function buildSections11And12() {
    const section8 = document.getElementById('same-cruise');
    const section11 = document.getElementById('guide-question');
    const section12 = document.getElementById('mx-prepare-money');
    if (!section8 || !section11 || !section12) return false;

    section11.className = 'mx11-guide-section';
    section11.setAttribute('data-membership-section', '9');
    section11.innerHTML = `
      <div class="mx11-inner">
        <span class="mx11-kicker">가이드가 걱정된다면</span>
        <h2 class="mx11-title">처음부터 혼자 갈 필요는 없습니다<br><strong>함께 가는 일정도 선택할 수 있습니다</strong></h2>
      </div>`;

    section12.className = 'mx12-transition-section';
    section12.setAttribute('data-membership-section', '10');
    section12.innerHTML = `
      <div class="mx12-inner">
        <span class="mx12-kicker">멤버십은 필수가 아닙니다</span>
        <h2 class="mx12-title">앞으로 크루즈를 갈 생각이라면<br><strong>비용을 POINT로 미리 모아둘 수 있습니다</strong></h2>
      </div>`;

    if (section8.nextElementSibling !== section11) section8.insertAdjacentElement('afterend', section11);
    if (section11.nextElementSibling !== section12) section11.insertAdjacentElement('afterend', section12);
    return true;
  }

  function init() {
    if (buildSections11And12()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections11And12() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

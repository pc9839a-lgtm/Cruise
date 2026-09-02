(() => {
  'use strict';

  function buildSections13And14() {
    const section12 = document.getElementById('mx-prepare-money');
    const section13 = document.getElementById('membership-point');
    const section14 = document.getElementById('points-by-time');
    if (!section12 || !section13 || !section14) return false;

    section13.className = 'mx13-membership-section';
    section13.setAttribute('data-membership-section', '13');
    section13.innerHTML = `
      <div class="mx13-inner">
        <span class="mx13-kicker">미리 모은다면</span>
        <h2 class="mx13-title">매달 이렇게<br><strong>POINT가 쌓입니다</strong></h2>

        <div class="mx13-plans" aria-label="멤버십 월 적립">
          <article class="mx13-plan">
            <span>CLASSIC</span>
            <div class="mx13-plan-row primary"><b>월 $100</b><strong>200P</strong></div>
          </article>
          <article class="mx13-plan premium">
            <span>PREMIUM</span>
            <div class="mx13-plan-row primary"><b>월 $250</b><strong>500P</strong></div>
          </article>
        </div>
      </div>`;

    section14.remove();

    if (section12.nextElementSibling !== section13) section12.insertAdjacentElement('afterend', section13);
    return true;
  }

  function init() {
    if (buildSections13And14()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections13And14() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

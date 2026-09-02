(() => {
  'use strict';

  function buildSections13And14() {
    const section12 = document.getElementById('mx-prepare-money');
    const section13 = document.getElementById('membership-point');
    const section14 = document.getElementById('points-by-time');
    if (!section12 || !section13) return false;

    section13.className = 'mx13-membership-section';
    section13.setAttribute('data-membership-section', '13');
    section13.innerHTML = `
      <div class="mx13-inner">
        <span class="mx13-kicker">멤버십은 이렇게 쌓입니다</span>
        <h2 class="mx13-title">매달 결제하면<br><strong>크루즈에 쓸 POINT가 쌓입니다</strong></h2>

        <div class="mx13-simple-list" aria-label="멤버십 월 적립">
          <div class="mx13-simple-row">
            <span>CLASSIC</span>
            <strong>$100 → 200P</strong>
          </div>
          <div class="mx13-simple-row premium">
            <span>PREMIUM</span>
            <strong>$250 → 500P</strong>
          </div>
        </div>

        <p class="mx13-start-note">첫 가입 · CLASSIC <b>$200 → 350P</b> / PREMIUM <b>$500 → 800P</b></p>
      </div>`;

    if (section14) section14.remove();

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

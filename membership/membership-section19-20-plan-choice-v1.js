(() => {
  'use strict';

  function buildSections19And20() {
    const section18 = document.getElementById('mx-fit-check');
    const section19 = document.getElementById('mx-plan-guide');
    const section20 = document.getElementById('m3-selector');
    if (!section18 || !section19 || !section20) return false;

    section19.className = 'mx19-plan-compare-section';
    section19.setAttribute('data-membership-section', '19');
    section19.innerHTML = `
      <div class="mx19-inner">
        <span class="mx19-kicker">CLASSIC vs PREMIUM</span>
        <h2 class="mx19-title">어려울 것 없습니다<br><strong>차이는 매달 쌓이는 POINT</strong></h2>

        <div class="mx19-grid" aria-label="클래식과 프리미엄 멤버십 비교">
          <article class="mx19-card classic">
            <span>CLASSIC</span>
            <div class="mx19-main">
              <b>월</b>
              <strong>$100</strong>
            </div>
            <div class="mx19-row">
              <b>매달</b>
              <strong>200P</strong>
            </div>
            <div class="mx19-choice">적게 시작 → CLASSIC</div>
          </article>

          <article class="mx19-card premium">
            <span>PREMIUM</span>
            <div class="mx19-main">
              <b>월</b>
              <strong>$250</strong>
            </div>
            <div class="mx19-row">
              <b>매달</b>
              <strong>500P</strong>
            </div>
            <div class="mx19-choice">더 많이 적립 → PREMIUM</div>
          </article>
        </div>
      </div>`;

    section20.classList.add('mx20-plan-helper-section');
    section20.setAttribute('data-membership-section', '20');

    if (section18.nextElementSibling !== section19) {
      section18.insertAdjacentElement('afterend', section19);
    }
    if (section19.nextElementSibling !== section20) {
      section19.insertAdjacentElement('afterend', section20);
    }

    return true;
  }

  function init() {
    if (buildSections19And20()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections19And20() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

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
        <span class="mx19-kicker">플랜 숫자 비교</span>
        <h2 class="mx19-title"><strong>CLASSIC $100</strong><br><span>PREMIUM $250</span></h2>

        <div class="mx19-grid" aria-label="클래식과 프리미엄 멤버십 숫자 비교">
          <article class="mx19-card classic">
            <span>CLASSIC</span>
            <div class="mx19-main">
              <b>월 결제</b>
              <strong>$100</strong>
            </div>
            <div class="mx19-row">
              <b>월 적립</b>
              <strong>200P</strong>
            </div>
            <div class="mx19-row">
              <b>가입</b>
              <strong>$200 <i>→</i> 350P</strong>
            </div>
          </article>

          <article class="mx19-card premium">
            <span>PREMIUM</span>
            <div class="mx19-main">
              <b>월 결제</b>
              <strong>$250</strong>
            </div>
            <div class="mx19-row">
              <b>월 적립</b>
              <strong>500P</strong>
            </div>
            <div class="mx19-row">
              <b>가입</b>
              <strong>$500 <i>→</i> 800P</strong>
            </div>
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

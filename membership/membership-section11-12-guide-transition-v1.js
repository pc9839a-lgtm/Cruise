(() => {
  'use strict';

  function buildSections11And12() {
    const section10 = document.getElementById('m3-savings-use');
    const section11 = document.getElementById('guide-question');
    const section12 = document.getElementById('mx-prepare-money');
    if (!section10 || !section11 || !section12) return false;

    section11.className = 'mx11-guide-section';
    section11.setAttribute('data-membership-section', '11');
    section11.innerHTML = `
      <div class="mx11-inner">
        <span class="mx11-kicker">가이드 없이</span>
        <h2 class="mx11-title">싸도<br><strong>가이드 없으면 못 가는 거 아닌가?</strong></h2>
        <div class="mx11-flow" aria-label="가이드 없이 크루즈를 이용하는 기본 흐름">
          <article><b>01</b><strong>항구 도착</strong></article>
          <article><b>02</b><strong>체크인</strong></article>
          <article><b>03</b><strong>승선</strong></article>
          <article><b>04</b><strong>기항지</strong></article>
          <article><b>05</b><strong>하선</strong></article>
        </div>
      </div>`;

    section12.className = 'mx12-transition-section';
    section12.setAttribute('data-membership-section', '12');
    section12.innerHTML = `
      <div class="mx12-inner">
        <span class="mx12-kicker">직접 예약 ≠ 멤버십</span>
        <h2 class="mx12-title">둘은<br><strong>다른 선택입니다</strong></h2>
        <div class="mx12-grid">
          <article class="mx12-card">
            <span>직접 예약</span>
            <strong>패키지 대신<br>직접 예약하는 방식</strong>
          </article>
          <div class="mx12-not">≠</div>
          <article class="mx12-card accent">
            <span>멤버십</span>
            <strong>월 결제로<br>Reward Points 적립</strong>
          </article>
        </div>
        <div class="mx12-bottom">직접 예약 ≠ 멤버십 가입</div>
      </div>`;

    if (section10.nextElementSibling !== section11) {
      section10.insertAdjacentElement('afterend', section11);
    }
    if (section11.nextElementSibling !== section12) {
      section11.insertAdjacentElement('afterend', section12);
    }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

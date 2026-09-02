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
        <span class="mx12-kicker">그럼 멤버십은 왜 쓰나요?</span>
        <h2 class="mx12-title">차이는 딱 하나<br><strong>크루즈 비용을 준비하는 방식</strong></h2>
        <div class="mx12-grid">
          <article class="mx12-card">
            <span>일반 예약</span>
            <strong>여행할 때<br>한 번에 결제</strong>
          </article>
          <div class="mx12-not">VS</div>
          <article class="mx12-card accent">
            <span>멤버십</span>
            <strong>미리 POINT를 쌓고<br>예약할 때 사용</strong>
          </article>
        </div>
        <div class="mx12-bottom">1~2년 안에 갈 계획이라면 → 미리 쌓는 멤버십이 유리</div>
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

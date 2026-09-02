(() => {
  'use strict';

  function buildSections15And16() {
    const section14 = document.getElementById('points-by-time');
    const section15 = document.getElementById('real-cost');
    const section16 = document.getElementById('mx-use-rules');
    if (!section14 || !section15 || !section16) return false;

    const duplicatePointUse = document.getElementById('mx-point-use');
    if (duplicatePointUse) duplicatePointUse.remove();

    section15.className = 'mx15-point-use-section';
    section15.setAttribute('data-membership-section', '15');
    section15.innerHTML = `
      <div class="mx15-inner">
        <span class="mx15-kicker">POINT 사용 예시</span>
        <h2 class="mx15-title">$2,000 크루즈에<br><strong>1,000P를 쓰면</strong></h2>

        <div class="mx15-equation" aria-label="포인트 사용 예시">
          <article>
            <span>크루즈</span>
            <strong>$2,000</strong>
          </article>
          <i>−</i>
          <article class="point">
            <span>사용 POINT</span>
            <strong>1,000P</strong>
          </article>
          <i>=</i>
          <article class="card">
            <span>카드 결제</span>
            <strong>$1,000</strong>
          </article>
        </div>
      </div>`;

    section16.className = 'mx16-point-card-section';
    section16.setAttribute('data-membership-section', '16');
    section16.innerHTML = `
      <div class="mx16-inner">
        <span class="mx16-kicker">POINT가 부족해도</span>
        <h2 class="mx16-title">있는 POINT를 쓰고<br><strong>나머지는 CARD</strong></h2>

        <div class="mx16-equation" aria-label="포인트와 카드 결제 구조">
          <strong>POINT</strong><i>+</i><strong>CARD</strong>
        </div>

        <div class="mx16-answer">
          <span>사용 가능한 POINT 적용</span>
          <i>→</i>
          <span>남은 금액 CARD 결제</span>
        </div>

        <div class="mx16-early">
          <b>270일+</b>
          <span>출발일까지 충분한 기간이 남은 예약은 POINT 사용 범위가 커질 수 있습니다.</span>
        </div>
      </div>`;

    if (section14.nextElementSibling !== section15) {
      section14.insertAdjacentElement('afterend', section15);
    }
    if (section15.nextElementSibling !== section16) {
      section15.insertAdjacentElement('afterend', section16);
    }

    return true;
  }

  function init() {
    if (buildSections15And16()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections15And16() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

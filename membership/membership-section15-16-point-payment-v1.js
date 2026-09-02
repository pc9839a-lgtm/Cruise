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
        <span class="mx15-kicker">쌓은 POINT는 어디에 쓰는데?</span>
        <h2 class="mx15-title">크루즈 예약할 때<br><strong>바로 사용합니다</strong></h2>

        <div class="mx15-equation" aria-label="포인트 사용 예시">
          <article>
            <span>크루즈</span>
            <strong>$2,000</strong>
          </article>
          <i>−</i>
          <article class="point">
            <span>POINT</span>
            <strong>1,000P 사용</strong>
          </article>
          <i>=</i>
          <article class="card">
            <span>남은 금액</span>
            <strong>$1,000 CARD</strong>
          </article>
        </div>
      </div>`;

    section16.className = 'mx16-point-card-section';
    section16.setAttribute('data-membership-section', '16');
    section16.innerHTML = `
      <div class="mx16-inner">
        <span class="mx16-kicker">POINT가 모자라면?</span>
        <h2 class="mx16-title">가진 POINT 먼저 사용<br><strong>남은 금액만 카드 결제</strong></h2>

        <div class="mx16-equation" aria-label="포인트와 카드 결제 구조">
          <strong>POINT</strong><i>+</i><strong>CARD</strong>
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

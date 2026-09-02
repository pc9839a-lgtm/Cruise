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
        <span class="mx15-kicker">실제 결제 예시</span>
        <h2 class="mx15-title">제 영수증은<br><strong>이렇게 결제됐습니다</strong></h2>

        <div class="mx15-equation" aria-label="실제 포인트 사용 영수증 예시">
          <article><span>예약 총액</span><strong>$3,887.35</strong></article>
          <i>−</i>
          <article class="point"><span>사용 POINT</span><strong>1,805.84P</strong></article>
          <i>=</i>
          <article class="card"><span>카드 + 수수료</span><strong>$2,081.51</strong></article>
        </div>

        <div class="mx13-note">카드 실제 출금 <strong>$2,020.88</strong> · 처리 수수료 <strong>$60.63</strong></div>
      </div>`;

    section16.className = 'mx16-point-card-section';
    section16.setAttribute('data-membership-section', '16');
    section16.innerHTML = `
      <div class="mx16-inner">
        <span class="mx16-kicker">POINT가 부족해도 괜찮습니다</span>
        <h2 class="mx16-title">가진 POINT를 쓰고<br><strong>나머지만 카드 결제</strong></h2>
        <div class="mx16-equation" aria-label="포인트와 카드 결제 구조">
          <strong>POINT</strong><i>+</i><strong>CARD</strong>
        </div>
      </div>`;

    if (section14.nextElementSibling !== section15) section14.insertAdjacentElement('afterend', section15);
    if (section15.nextElementSibling !== section16) section15.insertAdjacentElement('afterend', section16);

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

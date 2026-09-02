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
        <span class="mx13-kicker">멤버십은 이렇게 쌓입니다</span>
        <h2 class="mx13-title">매달 결제하면<br><strong>크루즈에 쓸 POINT가 쌓입니다</strong></h2>

        <div class="mx13-plans">
          <article class="mx13-plan">
            <span>CLASSIC</span>
            <div class="mx13-plan-row primary">
              <b>매월</b>
              <strong>$100 <i>→</i> 200P</strong>
            </div>
          </article>

          <article class="mx13-plan premium">
            <span>PREMIUM</span>
            <div class="mx13-plan-row primary">
              <b>매월</b>
              <strong>$250 <i>→</i> 500P</strong>
            </div>
          </article>
        </div>

        <div class="mx13-note">낸 금액보다 더 많은 POINT가 적립됩니다</div>
      </div>`;

    section14.className = 'mx14-points-section';
    section14.setAttribute('data-membership-section', '14');
    section14.innerHTML = `
      <div class="mx14-inner">
        <span class="mx14-kicker">그래서 시간이 지나면?</span>
        <h2 class="mx14-title">갈 계획이 있다면<br><strong>예약 전까지 미리 쌓아둘 수 있습니다</strong></h2>

        <div class="mx14-groups">
          <div class="mx14-group">
            <div class="mx14-plan-label">CLASSIC</div>
            <div class="mx14-ledger" aria-label="클래식 포인트 누적 예시">
              <article><span>1개월</span><strong>200P</strong></article>
              <article><span>6개월</span><strong>1,200P</strong></article>
              <article class="total"><span>12개월</span><strong>2,400P</strong></article>
            </div>
          </div>

          <div class="mx14-group premium">
            <div class="mx14-plan-label">PREMIUM</div>
            <div class="mx14-ledger" aria-label="프리미엄 포인트 누적 예시">
              <article><span>1개월</span><strong>500P</strong></article>
              <article><span>6개월</span><strong>3,000P</strong></article>
              <article class="total"><span>12개월</span><strong>6,000P</strong></article>
            </div>
          </div>
        </div>
      </div>`;

    if (section12.nextElementSibling !== section13) {
      section12.insertAdjacentElement('afterend', section13);
    }
    if (section13.nextElementSibling !== section14) {
      section13.insertAdjacentElement('afterend', section14);
    }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

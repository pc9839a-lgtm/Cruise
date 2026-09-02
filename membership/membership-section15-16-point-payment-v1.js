(() => {
  'use strict';

  function buildSections15And16() {
    const section13 = document.getElementById('membership-point');
    const section15 = document.getElementById('real-cost');
    const section16 = document.getElementById('mx-use-rules');
    if (!section13 || !section15 || !section16) return false;

    const duplicatePointUse = document.getElementById('mx-point-use');
    if (duplicatePointUse) duplicatePointUse.remove();

    section15.className = 'mx15-point-use-section';
    section15.setAttribute('data-membership-section', '15');
    section15.innerHTML = `
      <div class="mx15-inner">
        <span class="mx15-kicker">그리고 실제 예약에서는</span>
        <h2 class="mx15-title">모아둔 <strong>1,805.84P</strong>를<br>실제로 사용했습니다</h2>

        <div class="mx15-equation" aria-label="실제 서부 지중해 예약 결제 영수증">
          <article>
            <span>예약 총액</span>
            <strong>$3,887.35</strong>
          </article>
          <i>→</i>
          <article class="point">
            <span>사용 POINT</span>
            <strong>1,805.84P</strong>
          </article>
          <i>→</i>
          <article class="card">
            <span>카드 실제 출금</span>
            <strong>$2,020.88</strong>
          </article>
        </div>

        <div class="mx13-note">처리 수수료 <strong>$60.63</strong> · MSC World Asia · 바르셀로나 출발 7박 서부 지중해</div>
      </div>`;

    section16.remove();

    if (section13.nextElementSibling !== section15) section13.insertAdjacentElement('afterend', section15);
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

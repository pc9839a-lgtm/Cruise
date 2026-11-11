(() => {
  'use strict';

  function installSection6Styles() {
    if (document.getElementById('membership-v3-section06-style')) return;

    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

  function buildSection4() {
    if (document.getElementById('mx-moving-hotel-4')) return true;

    const section3 = document.getElementById('mx-port-day');
    if (!section3) return false;

    installSection6Styles();

    section3.insertAdjacentHTML('afterend', `
      <section id="mx-moving-hotel-4" class="mx4-section membership-v3-compare-criteria" data-membership-section="06" aria-labelledby="mx4-title">
        <div class="mx4-inner">
          <div class="mx4-head">
            <span class="mx4-eyebrow">판매가보다 총비용</span>
            <h2 id="mx4-title">비교할 건<br><strong>딱 4가지입니다</strong></h2>
          </div>

          <div class="mx4-route membership-v3-criteria-grid" aria-label="크루즈 예약 비교 기준">
            <article class="membership-v3-criterion"><strong>총비용</strong></article>
            <article class="membership-v3-criterion"><strong>포함사항</strong></article>
            <article class="membership-v3-criterion"><strong>직접 해야 할 일</strong></article>
            <article class="membership-v3-criterion"><strong>이용 조건</strong></article>
          </div>

          <p class="membership-v3-section06-next">이제 실제 예약 한 건으로 확인합니다.</p>
        </div>
      </section>`);

    return true;
  }

  function init() {
    if (buildSection4()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection4() || tries >= 30) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

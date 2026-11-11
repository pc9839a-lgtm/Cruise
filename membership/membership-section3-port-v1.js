(() => {
  'use strict';

  function installSection5Styles() {
    if (document.getElementById('membership-v3-section05-style')) return;

    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

  function buildSection3() {
    if (document.getElementById('mx-port-day')) return true;

    const section2 = document.getElementById('mx-moving-hotel');
    if (!section2) return false;

    installSection5Styles();

    section2.insertAdjacentHTML('afterend', `
      <section id="mx-port-day" class="mx-port-section membership-v3-booking-methods" data-membership-section="05" aria-labelledby="mx-port-title">
        <div class="mxp-inner">
          <div class="mxp-head">
            <span class="mxp-question">같은 여행, 다른 예약 방법</span>
            <h2 id="mx-port-title">크루즈 예약은<br><strong>이렇게 나뉩니다</strong></h2>
          </div>

          <div class="mxp-flow" aria-label="크루즈 예약 방법">
            <article class="mxp-step"><strong>여행사</strong></article>
            <article class="mxp-step"><strong>홈쇼핑</strong></article>
            <article class="mxp-step"><strong>상조 전환</strong></article>
            <article class="mxp-step"><strong>선사홈페이지</strong></article>
            <article class="mxp-step membership-v3-ingroup"><strong>인그룹</strong></article>
          </div>

          <p class="membership-v3-section05-next">판매가보다 총비용을 봅니다.</p>
        </div>
      </section>`);

    return true;
  }

  function init() {
    if (buildSection3()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection3() || tries >= 30) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

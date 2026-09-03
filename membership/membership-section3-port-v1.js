(() => {
  'use strict';

  function buildSection3() {
    if (document.getElementById('mx-port-day')) return true;

    const section2 = document.getElementById('mx-moving-hotel');
    if (!section2) return false;

    section2.insertAdjacentHTML('afterend', `
      <section id="mx-port-day" class="mx-port-section" aria-labelledby="mx-port-title">
        <div class="mxp-inner">
          <div class="mxp-head">
            <span class="mxp-question">그럼 여행 내내 배 안에?</span>
            <h2 id="mx-port-title">아침에 눈을 뜨면<br><strong>새로운 도시입니다</strong></h2>
          </div>

          <div class="mxp-flow" aria-label="기항지 여행 흐름">
            <article class="mxp-step">
              <b>01</b>
              <strong>아침, 항구 도착</strong>
            </article>
            <article class="mxp-step">
              <b>02</b>
              <strong>배에서 내려</strong>
            </article>
            <article class="mxp-step">
              <b>03</b>
              <strong>관광 · 맛집 · 쇼핑</strong>
            </article>
            <article class="mxp-step">
              <b>04</b>
              <strong>저녁엔 다시 승선</strong>
            </article>
          </div>
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

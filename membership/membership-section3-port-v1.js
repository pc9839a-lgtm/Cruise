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
            <span class="mxp-question">그럼 여행 내내 배 안에만 있는 건가?</span>
            <h2 id="mx-port-title"><span>낮에는 도시 여행</span><strong>밤에는 크루즈</strong></h2>
          </div>

          <div class="mxp-flow" aria-label="기항지 여행 흐름">
            <article class="mxp-step">
              <b>01</b>
              <strong>항구 도착 · 하선</strong>
            </article>
            <article class="mxp-step">
              <b>02</b>
              <strong>관광 · 맛집 · 쇼핑</strong>
              <span>자유여행 또는 기항지 투어</span>
            </article>
            <article class="mxp-step">
              <b>03</b>
              <strong>정해진 시간까지<br>배로 복귀</strong>
            </article>
            <article class="mxp-step">
              <b>04</b>
              <strong>다시 출항</strong>
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

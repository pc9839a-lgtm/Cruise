(() => {
  'use strict';

  function buildSection4() {
    if (document.getElementById('mx-moving-hotel-4')) return true;

    const section3 = document.getElementById('mx-port-day');
    if (!section3) return false;

    section3.insertAdjacentHTML('afterend', `
      <section id="mx-moving-hotel-4" class="mx4-section" aria-labelledby="mx4-title">
        <div class="mx4-inner">
          <div class="mx4-head">
            <span class="mx4-eyebrow">움직이는 호텔</span>
            <h2 id="mx4-title">도시는 계속 바뀌는데<br><strong>내 객실은 그대로</strong></h2>
          </div>

          <div class="mx4-route" aria-label="크루즈 이동 방식">
            <div class="mx4-city"><b>오늘</b><strong>바르셀로나</strong></div>
            <div class="mx4-night"><span>자는 동안</span><strong>→</strong></div>
            <div class="mx4-city"><b>내일</b><strong>마르세유</strong></div>
            <div class="mx4-night"><span>자는 동안</span><strong>→</strong></div>
            <div class="mx4-city"><b>다음 날</b><strong>제노바</strong></div>
          </div>

          <div class="mx4-room-lock">
            <span>ROOM</span>
            <strong>내 객실 그대로</strong>
          </div>

          <div class="mx4-points">
            <article><b>01</b><strong>객실은 그대로</strong></article>
            <article><b>02</b><strong>짐 다시 싸기 없음</strong></article>
            <article><b>03</b><strong>호텔 체크인 반복 없음</strong></article>
            <article><b>04</b><strong>자는 동안 다음 도시로 이동</strong></article>
          </div>
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

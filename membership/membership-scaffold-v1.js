(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  function after(target, html) {
    if (target) target.insertAdjacentHTML('afterend', html);
  }

  function before(target, html) {
    if (target) target.insertAdjacentHTML('beforebegin', html);
  }

  function buildScaffold() {
    const reviewFlow = $('.review-flow-section');
    const sameCruise = $('#same-cruise');
    const membershipPoint = $('#membership-point');
    const calculator = $('#calculator');
    const plans = $('#plans');
    const terms = $('#membership-terms');

    if (!reviewFlow || !sameCruise || !membershipPoint || !calculator || !plans || !terms) return false;

    if (!$('#mx-moving-hotel')) {
      after(reviewFlow, `
        <section id="mx-moving-hotel" class="mx-expand-section">
          <div class="mx-inner">
            <div class="mx-center">
              <span class="mx-eyebrow">배 안에서 하루가 다 됩니다</span>
              <h2 class="mx-title">배 안에서 먹고, 자고, 놀고<br><strong>항구에선 도시를 여행합니다</strong></h2>
            </div>
            <div class="mx-hotel-layout">
              <div class="mx-hotel-visual">
                <img src="./img/객실및내부시설9.png" alt="크루즈 선내 아트리움" loading="lazy" />
                <div class="mx-hotel-caption"><span>배 안에서는</span><strong>숙박 · 식사 · 공연<br>수영 · 휴식</strong></div>
              </div>
              <div class="mx-hotel-points">
                <div class="mx-hotel-point"><b>01</b><strong>객실에서 숙박</strong></div>
                <div class="mx-hotel-point"><b>02</b><strong>뷔페 · 레스토랑</strong></div>
                <div class="mx-hotel-point"><b>03</b><strong>공연 · 수영 · 선내시설</strong></div>
                <div class="mx-hotel-point"><b>04</b><strong>기항지 내려서 도시 관광</strong></div>
              </div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-cost-structure')) {
      after(sameCruise, `
        <section id="mx-cost-structure" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow">가격 차이가 나는 이유</span>
            <h2 class="mx-title">같은 크루즈인데<br><strong>왜 80만원 차이가 날까?</strong></h2>
            <p class="mx-sub">패키지 상품에 따라 포함 항목은 달라질 수 있습니다.</p>
            <div class="mx-card-grid">
              <article class="mx-card"><b>01</b><strong>가이드</strong></article>
              <article class="mx-card"><b>02</b><strong>단체 이동</strong></article>
              <article class="mx-card"><b>03</b><strong>패키지 운영</strong></article>
              <article class="mx-card"><b>04</b><strong>예약 대행</strong></article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-prepare-money')) before(membershipPoint, '<section id="mx-prepare-money"></section>');
    if (!$('#mx-use-rules')) after(calculator, '<section id="mx-use-rules"></section>');

    if (!$('#mx-fit-check')) before(plans, '<section id="mx-fit-check"></section>');
    if (!$('#mx-plan-guide')) before(plans, '<section id="mx-plan-guide"></section>');

    if (!$('#mx-final-choice')) after(terms, '<section id="mx-final-choice"></section>');

    return true;
  }

  function init() {
    if (buildScaffold()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildScaffold() || tries >= 40) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
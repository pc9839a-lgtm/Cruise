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
              <span class="mx-eyebrow">크루즈가 뭔지부터 보면</span>
              <h2 class="mx-title">크루즈는<br><strong>이동하는 호텔입니다</strong></h2>
            </div>
            <div class="mx-hotel-layout">
              <div class="mx-hotel-visual">
                <img src="./img/객실및내부시설9.png" alt="크루즈 선내 아트리움" loading="lazy" />
                <div class="mx-hotel-caption"><span>한 배 안에서</span><strong>먹고 · 자고 · 수영하고<br>공연 보고 · 쉬어갑니다</strong></div>
              </div>
              <div class="mx-hotel-points">
                <div class="mx-hotel-point"><b>01</b><strong>먹고</strong></div>
                <div class="mx-hotel-point"><b>02</b><strong>자고</strong></div>
                <div class="mx-hotel-point"><b>03</b><strong>수영하고</strong></div>
                <div class="mx-hotel-point"><b>04</b><strong>공연 보고 · 쉬고</strong></div>
              </div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-cost-structure')) {
      after(sameCruise, `
        <section id="mx-cost-structure" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow">그럼 80만원은 왜 차이 나는데?</span>
            <h2 class="mx-title">차이는<br><strong>중간 마진에서 생깁니다</strong></h2>
            <p class="mx-sub">직접 할 수 있다면 꼭 전부 살 필요는 없습니다.</p>
            <div class="mx-card-grid">
              <article class="mx-card"><b>01</b><strong>가이드</strong></article>
              <article class="mx-card"><b>02</b><strong>단체 이동</strong></article>
              <article class="mx-card"><b>03</b><strong>예약 대행</strong></article>
              <article class="mx-card"><b>04</b><strong>패키지 운영</strong></article>
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
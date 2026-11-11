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

    if (!$('#membership-v3-section04-style')) {
      /* Styles are served by membership-unified.css; do not inject style tags. */
    }

    if (!$('#mx-moving-hotel')) {
      after(reviewFlow, `
        <section id="mx-moving-hotel" class="membership-v3-price-question" data-membership-section="04" aria-labelledby="membership-v3-price-title">
          <div class="membership-v3-price-inner">
            <span class="membership-v3-price-kicker">MSC WORLD ASIA · BALCONY</span>
            <h2 id="membership-v3-price-title" class="membership-v3-price-title">둘이 크루즈 가면<br><strong>얼마 정도 들까요?</strong></h2>
            <div class="membership-v3-price-facts" aria-label="가격 질문 기준 여행 조건">
              <span>MSC World Asia</span><i>·</i><span>발코니</span><i>·</i><span>2명</span><i>·</i><span>7박 8일</span>
            </div>
            <p class="membership-v3-price-next">예약 방법에 따라 같은 여행도 금액이 달라집니다.</p>
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
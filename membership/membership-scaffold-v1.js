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

    if (!reviewFlow) return false;

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
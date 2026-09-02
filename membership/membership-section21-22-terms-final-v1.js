(() => {
  'use strict';

  function buildFinalFlow() {
    const section13 = document.getElementById('membership-point');
    const calculator = document.getElementById('calculator');
    const section21 = document.getElementById('membership-terms');
    const section22 = document.getElementById('mx-final-choice');
    const plans = document.getElementById('plans');
    if (!section13 || !section21 || !plans) return false;

    ['mx-faq-section', 'mx-recap', 'price-match', 'mx-plan-guide', 'm3-selector', 'mx-fit-check', 'points-by-time', 'mx-use-rules', 'real-cost'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    if (section22) section22.remove();

    section21.className = 'mx21-terms-section';
    section21.setAttribute('data-membership-section', '13');
    section21.innerHTML = `
      <div class="mx21-inner">
        <span class="mx21-kicker">가입 전 확인</span>
        <h2 class="mx21-title">시작하기 전에<br><strong>필요한 조건만 확인하세요</strong></h2>
        <div class="mx21-terms" aria-label="멤버십 가입 조건">
          <article><b>환불</b><span>가입 후 14일이 지나면 환불이 어렵습니다.</span></article>
          <article><b>POINT</b><span>예약 조건에 따라 사용 범위가 달라질 수 있습니다.</span></article>
          <article><b>해지</b><span>2배 적립분은 사라지고 원금 기준 POINT가 남습니다.</span></article>
          <article><b>결제</b><span>본인 명의 카드로 결제해야 합니다.</span></article>
          <article><b>예약 유지</b><span>예약에 필요한 멤버십 조건을 유지해야 합니다.</span></article>
        </div>
      </div>`;

    const anchor = calculator || section13;
    if (anchor.nextElementSibling !== section21) anchor.insertAdjacentElement('afterend', section21);
    if (section21.nextElementSibling !== plans) section21.insertAdjacentElement('afterend', plans);
    plans.setAttribute('data-membership-section', '14');

    return true;
  }

  function init() {
    if (buildFinalFlow()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildFinalFlow() || tries >= 50) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

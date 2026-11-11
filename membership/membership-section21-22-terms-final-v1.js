(() => {
  'use strict';

  function buildFinalFlow() {
    const plans = document.getElementById('plans');
    const section21 = document.getElementById('membership-terms');
    if (!plans || !section21) return false;

    ['mx-faq-section','mx-recap','price-match','mx-final-choice','points-by-time','mx-use-rules','real-cost'].forEach((id) => document.getElementById(id)?.remove());

    plans.setAttribute('data-membership-section','20');

    section21.className = 'mx21-terms-section';
    section21.setAttribute('data-membership-section','21');
    section21.innerHTML = `
      <div class="mx21-inner">
        <span class="mx21-kicker">가입 전 확인</span>
        <h2 class="mx21-title">멤버십<br><strong>이용 조건</strong></h2>
        <div class="mx21-terms" aria-label="멤버십 가입 조건">
          <article class="mx21-term-card"><span class="mx21-term-num">01</span><div class="mx21-term-copy"><h3>환불</h3><p>가입 후 14일이 지나면 환불이 어렵습니다.</p></div></article>
          <article class="mx21-term-card"><span class="mx21-term-num">02</span><div class="mx21-term-copy"><h3>POINT</h3><p>예약 조건과 출발 시점에 따라 사용할 수 있는 POINT 범위가 달라질 수 있습니다.</p></div></article>
          <article class="mx21-term-card"><span class="mx21-term-num">03</span><div class="mx21-term-copy"><h3>해지</h3><p>해지 시 보너스 적립분 등 POINT 조건이 달라질 수 있습니다.</p></div></article>
          <article class="mx21-term-card"><span class="mx21-term-num">04</span><div class="mx21-term-copy"><h3>결제</h3><p>본인 명의 결제수단 등 예약 조건을 확인해야 합니다.</p></div></article>
          <article class="mx21-term-card"><span class="mx21-term-num">05</span><div class="mx21-term-copy"><h3>예약 유지</h3><p>예약에 필요한 멤버십 조건을 출발 전까지 유지해야 하는 경우가 있습니다.</p></div></article>
          <article class="mx21-term-card"><span class="mx21-term-num">06</span><div class="mx21-term-copy"><h3>최저가 보장</h3><p>동일 크루즈·출발일·객실 등 비교 조건과 신청 기준은 최저가 보장 약관에 따라 적용됩니다.</p></div></article>
        </div>
      </div>`;

    if (plans.nextElementSibling !== section21) plans.insertAdjacentElement('afterend',section21);
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{ once:true });
  else init();
})();

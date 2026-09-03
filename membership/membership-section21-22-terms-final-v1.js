(() => {
  'use strict';

  function buildFinalFlow() {
    const early = document.getElementById('mx-start-early');
    const plans = document.getElementById('plans');
    const section21 = document.getElementById('membership-terms');
    if (!early || !plans || !section21) return false;

    ['mx-faq-section', 'mx-recap', 'price-match', 'mx-final-choice', 'points-by-time', 'mx-use-rules', 'real-cost'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    plans.setAttribute('data-membership-section', '20');
    const planKicker = plans.querySelector('.section-kicker');
    const planTitle = plans.querySelector('.membership-section-head h2');
    if (planKicker) planKicker.textContent = '마지막 선택';
    if (planTitle) planTitle.innerHTML = '그럼 나는<br><strong>얼마씩 쌓을까?</strong>';

    section21.className = 'mx21-terms-section';
    section21.setAttribute('data-membership-section', '21');
    section21.innerHTML = `
      <div class="mx21-inner">
        <span class="mx21-kicker">가입 전 확인</span>
        <h2 class="mx21-title">시작하기 전에<br><strong>필요한 조건만 확인하세요</strong></h2>
        <div class="mx21-terms" aria-label="멤버십 가입 조건">
          <details><summary>환불</summary><p>가입 후 14일이 지나면 환불이 어렵습니다.</p></details>
          <details><summary>POINT</summary><p>예약 조건과 출발 시점에 따라 사용할 수 있는 POINT 범위가 달라질 수 있습니다.</p></details>
          <details><summary>해지</summary><p>해지 시 보너스 적립분 등 POINT 조건이 달라질 수 있습니다.</p></details>
          <details><summary>결제</summary><p>본인 명의 결제수단 등 예약 조건을 확인해야 합니다.</p></details>
          <details><summary>예약 유지</summary><p>예약에 필요한 멤버십 조건을 출발 전까지 유지해야 하는 경우가 있습니다.</p></details>
          <details><summary>최저가 보장</summary><p>동일 크루즈·출발일·객실 등 비교 조건과 신청 기준은 최저가 보장 약관에 따라 적용됩니다.</p></details>
        </div>
      </div>`;

    if (early.nextElementSibling !== plans) early.insertAdjacentElement('afterend', plans);
    if (plans.nextElementSibling !== section21) plans.insertAdjacentElement('afterend', section21);
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

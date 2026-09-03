(() => {
  'use strict';

  function ensureSection(id, className) {
    let section = document.getElementById(id);
    if (!section) {
      section = document.createElement('section');
      section.id = id;
    }
    section.className = className;
    return section;
  }

  function buildSections18To20() {
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    if (!calculator || !plans) return false;

    ['mx-plan-guide', 'm3-selector', 'mx-fit-check'].forEach((id) => {
      const old = document.getElementById(id);
      if (old) old.remove();
    });

    const optional = ensureSection('mx-membership-optional', 'mx18-optional-section mx-core-bridge');
    optional.setAttribute('data-membership-section', '18');
    optional.innerHTML = `
      <div class="mx18-inner">
        <h2 class="mx18-bridge-question">꼭<br><strong>회원이어야 하나요?</strong></h2>
        <p class="mx18-answer">크루즈 여행 자체는<br><strong>회원이 아니어도 가능합니다</strong></p>
        <p class="mx18-but">하지만</p>
        <div class="mx18-benefit-stack" aria-label="회원 예약으로 이용하는 핵심 혜택">
          <strong>POINT 적립</strong>
          <i>+</i>
          <strong>회원 예약</strong>
          <i>+</i>
          <strong>전세계 최저가 보장</strong>
        </div>
        <p class="mx18-closing">이 예약 구조를 이용하려면<br><strong>클럽 회원이어야 합니다</strong></p>
      </div>`;

    const early = ensureSection('mx-start-early', 'mx19-early-section mx-core-bridge');
    early.setAttribute('data-membership-section', '19');
    early.innerHTML = `
      <div class="mx19-inner">
        <h2 class="mx19-bridge-question">왜<br><strong>미리 시작하나요?</strong></h2>
        <p class="mx19-answer">여행을 예약할 때가 아니라<br><strong>가기 전부터 POINT를 쌓기 때문입니다</strong></p>
        <div class="mx19-timeline" aria-label="CLASSIC 포인트 적립 예시">
          <div><span>가입</span><strong>350P</strong></div>
          <div><span>3개월</span><strong>950P</strong></div>
          <div><span>6개월</span><strong>1,550P</strong></div>
          <div><span>12개월</span><strong>2,750P</strong></div>
        </div>
        <p class="mx19-closing">시간이 지나면<br><strong>POINT가 쌓입니다</strong></p>
        <p class="mx19-note">CLASSIC 가입 350P + 매월 200P 기준</p>
      </div>`;

    plans.setAttribute('data-membership-section', '20');
    const kicker = plans.querySelector('.section-kicker');
    const title = plans.querySelector('.membership-section-head h2');
    if (kicker) kicker.textContent = '마지막 선택';
    if (title) title.innerHTML = '그럼 나는<br><strong>얼마씩 쌓을까?</strong>';

    if (calculator.nextElementSibling !== optional) calculator.insertAdjacentElement('afterend', optional);
    if (optional.nextElementSibling !== early) optional.insertAdjacentElement('afterend', early);
    if (early.nextElementSibling !== plans) early.insertAdjacentElement('afterend', plans);

    return true;
  }

  function init() {
    if (buildSections18To20()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections18To20() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

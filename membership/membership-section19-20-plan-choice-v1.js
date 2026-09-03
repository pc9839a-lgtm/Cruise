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

    const optional = ensureSection('mx-membership-optional', 'mx18-optional-section');
    optional.setAttribute('data-membership-section', '18');
    optional.innerHTML = `
      <div class="mx18-inner">
        <span class="mx18-kicker">꼭 회원이어야 하나요?</span>
        <h2>크루즈 여행 자체는<br><strong>회원이 아니어도 가능합니다</strong></h2>
        <p class="mx18-copy">하지만 클럽 회원으로 가입해 POINT를 미리 쌓아야<br><strong>전세계 최저가 보장 제도를 활용한 회원 예약</strong>을 이용할 수 있습니다.</p>
      </div>`;

    const early = ensureSection('mx-start-early', 'mx19-early-section');
    early.setAttribute('data-membership-section', '19');
    early.innerHTML = `
      <div class="mx19-inner">
        <span class="mx19-kicker">왜 미리 시작하나요?</span>
        <h2>갈 생각이 있다면<br><strong>지금부터 POINT를 쌓을 수 있습니다</strong></h2>
        <div class="mx19-timeline" aria-label="CLASSIC 포인트 적립 예시">
          <div><span>가입</span><strong>350P</strong></div>
          <div><span>3개월</span><strong>950P</strong></div>
          <div><span>6개월</span><strong>1,550P</strong></div>
          <div><span>12개월</span><strong>2,750P</strong></div>
        </div>
        <p class="mx19-note">CLASSIC 가입 350P + 매월 200P 기준</p>
      </div>`;

    plans.setAttribute('data-membership-section', '20');
    const kicker = plans.querySelector('.section-kicker');
    const title = plans.querySelector('.membership-section-head h2');
    if (kicker) kicker.textContent = '마지막 선택';
    if (title) title.innerHTML = '나는 매달<br><strong>얼마가 부담 없을까?</strong>';

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

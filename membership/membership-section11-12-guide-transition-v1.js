(() => {
  'use strict';

  function buildSections11And12() {
    const section10 = document.getElementById('m3-savings-use');
    const section11 = document.getElementById('guide-question');
    const section12 = document.getElementById('mx-prepare-money');
    if (!section10 || !section11 || !section12) return false;

    section11.className = 'mx11-guide-section';
    section11.setAttribute('data-membership-section', '11');
    section11.innerHTML = `
      <div class="mx11-inner">
        <span class="mx11-kicker">그래도 가이드 없으면 무섭지 않나?</span>
        <h2 class="mx11-title"><strong>저희와 함께가는 일정을 예약하세요</strong></h2>
        <div class="mx11-message">단체로 가기 때문에<br><strong>초보자도 즐거운 여행을 할 수 있습니다.</strong></div>
      </div>`;

    section12.className = 'mx12-transition-section';
    section12.setAttribute('data-membership-section', '12');
    section12.innerHTML = `
      <div class="mx12-inner">
        <span class="mx12-kicker">꼭 멤버십 가입해야 하나요?</span>
        <h2 class="mx12-title">아니요<br><strong>크루즈는 예약할 수 있습니다</strong></h2>
        <div class="mx12-question">그럼 멤버십은?</div>
        <div class="mx12-answer">앞으로 탈 크루즈 비용을 미리<br><strong>POINT로 쌓아두는 선택입니다</strong></div>
      </div>`;

    if (section10.nextElementSibling !== section11) {
      section10.insertAdjacentElement('afterend', section11);
    }
    if (section11.nextElementSibling !== section12) {
      section11.insertAdjacentElement('afterend', section12);
    }

    return true;
  }

  function init() {
    if (buildSections11And12()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections11And12() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

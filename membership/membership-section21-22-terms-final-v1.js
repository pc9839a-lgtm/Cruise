(() => {
  'use strict';

  function buildSections21And22() {
    const section20 = document.getElementById('m3-selector');
    const section21 = document.getElementById('membership-terms');
    const section22 = document.getElementById('mx-final-choice');
    if (!section20 || !section21 || !section22) return false;

    ['mx-faq-section', 'mx-recap', 'price-match'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    section21.className = 'mx21-terms-section';
    section21.setAttribute('data-membership-section', '21');
    section21.innerHTML = `
      <div class="mx21-inner">
        <span class="mx21-kicker">가입 전 확인</span>
        <h2 class="mx21-title">딱 5가지만<br><strong>확인하세요</strong></h2>

        <div class="mx21-terms" aria-label="멤버십 가입 조건">
          <article><b>환불</b><span>가입 후 14일이 지나면 환불이 어렵습니다.</span></article>
          <article><b>POINT 사용</b><span>예약 조건에 따라 사용 범위가 달라질 수 있습니다.</span></article>
          <article><b>해지</b><span>2배 적립분은 사라지고 원금 기준 POINT가 남습니다.</span></article>
          <article><b>결제</b><span>본인 명의 카드로 결제해야 합니다.</span></article>
          <article><b>예약 유지</b><span>예약에 필요한 멤버십 조건을 유지해야 합니다.</span></article>
        </div>
      </div>`;

    section22.className = 'mx22-final-section';
    section22.setAttribute('data-membership-section', '22');
    section22.innerHTML = `
      <div class="mx22-inner">
        <h2 class="mx22-title">크루즈를 갈 생각이 있다면<br><strong>오늘부터 쌓을 수 있습니다</strong></h2>

        <div class="mx22-plans">
          <article>
            <span>CLASSIC</span>
            <strong>$100 / 월</strong>
            <b>200P / 월</b>
            <a class="mx22-cta" href="#plans">CLASSIC 시작하기</a>
          </article>
          <article class="premium">
            <span>PREMIUM</span>
            <strong>$250 / 월</strong>
            <b>500P / 월</b>
            <a class="mx22-cta" href="#plans">PREMIUM 시작하기</a>
          </article>
        </div>
      </div>`;

    if (section20.nextElementSibling !== section21) section20.insertAdjacentElement('afterend', section21);
    if (section21.nextElementSibling !== section22) section21.insertAdjacentElement('afterend', section22);

    return true;
  }

  function init() {
    if (buildSections21And22()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections21And22() || tries >= 50) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

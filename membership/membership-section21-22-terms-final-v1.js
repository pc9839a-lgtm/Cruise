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
        <h2 class="mx21-title">가입 전에<br><strong>이 5가지만</strong></h2>

        <div class="mx21-terms" aria-label="멤버십 가입 조건">
          <article><b>01</b><span>가입 후 14일이 지나면 환불이 어렵습니다.</span></article>
          <article><b>02</b><span>POINT는 현금처럼 출금할 수 없습니다.</span></article>
          <article><b>03</b><span>본인 명의 카드로 결제해야 합니다.</span></article>
          <article><b>04</b><span>예약한 크루즈 이용에 필요한 멤버십 조건을 유지해야 합니다.</span></article>
          <article><b>05</b><span>해지 시 2배 적립분은 사라지고 원금 기준 POINT가 남습니다.</span></article>
        </div>

        <div class="mx21-faq-head">자주 막히는 질문</div>
        <div class="mx21-faq">
          <details>
            <summary>직접 예약하면 멤버십 가입이 필수인가요?</summary>
            <p>아닙니다. 직접 예약과 멤버십은 별개입니다.</p>
          </details>
          <details>
            <summary>POINT가 부족하면 예약을 못 하나요?</summary>
            <p>사용 가능한 POINT를 적용하고 남은 금액은 CARD로 결제할 수 있습니다.</p>
          </details>
          <details>
            <summary>출발 270일 전이어야만 예약할 수 있나요?</summary>
            <p>아닙니다. 270일+는 POINT 사용 범위와 관련된 조건이며 실제 한도는 예약 조건에 따라 달라질 수 있습니다.</p>
          </details>
          <details>
            <summary>해지하면 적립 POINT는 어떻게 되나요?</summary>
            <p>2배 적립분은 사라지고 원금 기준 POINT가 남습니다.</p>
          </details>
        </div>
      </div>`;

    section22.className = 'mx22-final-section';
    section22.setAttribute('data-membership-section', '22');
    section22.innerHTML = `
      <div class="mx22-inner">
        <span class="mx22-kicker">마지막 비교</span>
        <h2 class="mx22-title">크루즈 갈 계획이 있다면<br><strong>숫자만 비교하세요</strong></h2>

        <div class="mx22-plans">
          <article>
            <span>CLASSIC</span>
            <strong>$100</strong>
            <b>매월 200P</b>
          </article>
          <article class="premium">
            <span>PREMIUM</span>
            <strong>$250</strong>
            <b>매월 500P</b>
          </article>
        </div>

        <a class="mx22-cta" href="#plans">플랜 비교 · 가입</a>
      </div>`;

    if (section20.nextElementSibling !== section21) {
      section20.insertAdjacentElement('afterend', section21);
    }
    if (section21.nextElementSibling !== section22) {
      section21.insertAdjacentElement('afterend', section22);
    }

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

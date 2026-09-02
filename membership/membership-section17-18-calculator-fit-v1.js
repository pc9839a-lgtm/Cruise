(() => {
  'use strict';

  if (typeof window.fetchExchangeRate === 'function') {
    window.fetchExchangeRate = async function () {};
  }

  function buildSections17And18() {
    const section16 = document.getElementById('mx-use-rules');
    const section17 = document.getElementById('calculator');
    const section18 = document.getElementById('mx-fit-check');
    if (!section16 || !section17 || !section18) return false;

    section17.className = 'mx17-calculator-section';
    section17.setAttribute('data-membership-section', '17');
    section17.innerHTML = `
      <div class="mx17-inner">
        <span class="mx17-kicker">실제 영수증으로 다시 보면</span>
        <h2 class="mx17-title">POINT가 들어가면<br><strong>카드 결제는 이렇게 남습니다</strong></h2>

        <div class="mx17-results" aria-live="polite">
          <article>
            <span>예약 총액</span>
            <strong>$3,887.35</strong>
          </article>
          <article class="point">
            <span>사용한 POINT</span>
            <strong>1,805.84P</strong>
          </article>
          <article class="card">
            <span>카드 실제 출금</span>
            <strong>$2,020.88</strong>
          </article>
        </div>

        <div class="mx17-note">처리 수수료 <strong>$60.63</strong> · POINT + CARD + FEE = <strong>$3,887.35</strong></div>
      </div>`;

    section18.className = 'mx18-fit-section';
    section18.setAttribute('data-membership-section', '18');
    section18.innerHTML = `
      <div class="mx18-inner">
        <span class="mx18-kicker">그럼 나는 뭘 골라야 하지?</span>
        <h2 class="mx18-title">크루즈를 언제쯤<br><strong>갈 생각인가요?</strong></h2>

        <div class="mx18-grid">
          <article class="mx18-card yes">
            <span>1~2년 안에 갈 생각이 있다</span>
            <strong>PREMIUM 추천</strong>
            <b>$250 → 500P</b>
          </article>
          <article class="mx18-card no">
            <span>가고 싶지만 날짜는 아직 미정</span>
            <strong>CLASSIC 추천</strong>
            <b>$100 → 200P</b>
          </article>
        </div>
      </div>`;

    if (section16.nextElementSibling !== section17) {
      section16.insertAdjacentElement('afterend', section17);
    }
    if (section17.nextElementSibling !== section18) {
      section17.insertAdjacentElement('afterend', section18);
    }

    return true;
  }

  function init() {
    if (buildSections17And18()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections17And18() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

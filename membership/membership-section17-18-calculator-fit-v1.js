(() => {
  'use strict';

  if (typeof window.fetchExchangeRate === 'function') {
    window.fetchExchangeRate = async function () {};
  }

  const formatUsd = (value) => `$${Number(value).toLocaleString('en-US')}`;
  const formatPoint = (value) => `${Number(value).toLocaleString('en-US')}P`;

  function buildSections17And18() {
    const section16 = document.getElementById('mx-use-rules');
    const section17 = document.getElementById('calculator');
    const section18 = document.getElementById('mx-fit-check');
    if (!section16 || !section17 || !section18) return false;

    section17.className = 'mx17-calculator-section';
    section17.setAttribute('data-membership-section', '17');
    section17.innerHTML = `
      <div class="mx17-inner">
        <span class="mx17-kicker">내 여행은 얼마가 남을까?</span>
        <h2 class="mx17-title">직접<br><strong>확인해보세요</strong></h2>

        <div class="mx17-control">
          <div class="mx17-control-head">
            <span>크루즈 가격</span>
            <strong id="mx17RangeValue">$2,000</strong>
          </div>
          <input id="mx17CruisePrice" class="mx17-range" type="range" min="1000" max="10000" step="100" value="2000" aria-label="크루즈 가격 조절" />
        </div>

        <div class="mx17-results" aria-live="polite">
          <article>
            <span>크루즈 가격</span>
            <strong id="mx17CruiseUsd">$2,000</strong>
          </article>
          <article class="point">
            <span>사용할 POINT</span>
            <strong id="mx17Point">1,000P</strong>
          </article>
          <article class="card">
            <span>실제 카드 결제</span>
            <strong id="mx17CardTotal">$1,000</strong>
          </article>
        </div>
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

    const range = document.getElementById('mx17CruisePrice');
    const rangeValue = document.getElementById('mx17RangeValue');
    const cruiseUsd = document.getElementById('mx17CruiseUsd');
    const point = document.getElementById('mx17Point');
    const cardTotal = document.getElementById('mx17CardTotal');

    const update = () => {
      if (!range) return;
      const price = Number(range.value);
      const usablePoint = Math.floor(price * 0.5);
      const reservationCard = price - usablePoint;
      const percent = ((price - Number(range.min)) / (Number(range.max) - Number(range.min))) * 100;

      if (rangeValue) rangeValue.textContent = formatUsd(price);
      if (cruiseUsd) cruiseUsd.textContent = formatUsd(price);
      if (point) point.textContent = formatPoint(usablePoint);
      if (cardTotal) cardTotal.textContent = formatUsd(reservationCard);
      range.style.setProperty('--mx17-progress', `${percent}%`);
    };

    if (range) {
      range.addEventListener('input', update);
      update();
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

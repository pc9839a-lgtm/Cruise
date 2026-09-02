(() => {
  'use strict';

  /* SECTION 17 rule: do not call the legacy exchange-rate API. */
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
        <span class="mx17-kicker">내 크루즈 금액으로</span>
        <h2 class="mx17-title">가격을 바꾸면<br><strong>실제 카드 결제가 바로 보입니다</strong></h2>

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
            <span>사용 POINT</span>
            <strong id="mx17Point">1,000P</strong>
          </article>
          <article class="card">
            <span>실제 카드 결제 총액</span>
            <strong id="mx17CardTotal">$1,500</strong>
            <span id="mx17CardBreakdown">POINT 적립 $500 + 예약 $1,000</span>
          </article>
        </div>

        <div class="mx17-note" id="mx17Note">CLASSIC 월 결제 $100 → 200P 기준 · POINT 적립에 이미 낸 카드값까지 포함한 실제 지출입니다. 가입 시 350P는 계산에서 제외합니다.</div>
      </div>`;

    section18.className = 'mx18-fit-section';
    section18.setAttribute('data-membership-section', '18');
    section18.innerHTML = `
      <div class="mx18-inner">
        <span class="mx18-kicker">가입 전 한 가지</span>
        <h2 class="mx18-title"><strong>1~2년 안에</strong><br>크루즈 갈 계획이 있나요?</h2>

        <div class="mx18-grid">
          <article class="mx18-card yes">
            <span>YES</span>
            <strong>갈 계획이 있다</strong>
            <b>멤버십 숫자 확인</b>
          </article>
          <article class="mx18-card no">
            <span>NO</span>
            <strong>계획이 없다</strong>
            <b>지금 가입할 이유 없음</b>
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
    const cardBreakdown = document.getElementById('mx17CardBreakdown');

    const update = () => {
      if (!range) return;
      const price = Number(range.value);

      /* General booking example: up to 50% of cruise price is covered with POINT. */
      const usablePoint = Math.floor(price * 0.5);
      const reservationCard = price - usablePoint;

      /* CLASSIC earns 2P per $1 paid. The money already paid to earn the used POINT
         is real card spend too, so include it in the user's total out-of-pocket card spend. */
      const pointFundingCard = usablePoint / 2;
      const actualCardTotal = reservationCard + pointFundingCard;

      const percent = ((price - Number(range.min)) / (Number(range.max) - Number(range.min))) * 100;

      if (rangeValue) rangeValue.textContent = formatUsd(price);
      if (cruiseUsd) cruiseUsd.textContent = formatUsd(price);
      if (point) point.textContent = formatPoint(usablePoint);
      if (cardTotal) cardTotal.textContent = formatUsd(actualCardTotal);
      if (cardBreakdown) {
        cardBreakdown.textContent = `POINT 적립 ${formatUsd(pointFundingCard)} + 예약 ${formatUsd(reservationCard)}`;
      }
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

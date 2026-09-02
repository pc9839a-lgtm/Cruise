(() => {
  'use strict';

  const usd = (value) => `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  const point = (value) => `${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}P`;

  function buildCalculator() {
    const membership = document.getElementById('membership-point');
    if (!membership) return false;

    let calculator = document.getElementById('calculator');
    if (!calculator) {
      calculator = document.createElement('section');
      calculator.id = 'calculator';
    }

    calculator.className = 'mx17-simple-calculator';
    calculator.setAttribute('data-membership-section', '12');
    calculator.innerHTML = `
      <div class="mx17-simple-inner">
        <span class="mx17-simple-kicker">내 금액으로 확인</span>
        <h2>내 여행은<br><strong>얼마가 남을까?</strong></h2>

        <div class="mx17-simple-tool">
          <div class="mx17-simple-control">
            <div class="mx17-simple-head">
              <span>크루즈 가격</span>
              <strong id="mx17PriceText">$2,000</strong>
            </div>
            <input id="mx17Price" type="range" min="1000" max="10000" step="100" value="2000" aria-label="크루즈 가격" />
          </div>

          <div class="mx17-simple-control">
            <div class="mx17-simple-head">
              <span>사용할 POINT</span>
              <strong id="mx17PointText">1,000P</strong>
            </div>
            <input id="mx17Point" type="range" min="0" max="2000" step="100" value="1000" aria-label="사용할 포인트" />
          </div>

          <div class="mx17-simple-result" aria-live="polite">
            <span>실제 카드 결제</span>
            <strong id="mx17CardText">$1,000</strong>
          </div>
        </div>
      </div>`;

    if (membership.nextElementSibling !== calculator) {
      membership.insertAdjacentElement('afterend', calculator);
    }

    const priceInput = calculator.querySelector('#mx17Price');
    const pointInput = calculator.querySelector('#mx17Point');
    const priceText = calculator.querySelector('#mx17PriceText');
    const pointText = calculator.querySelector('#mx17PointText');
    const cardText = calculator.querySelector('#mx17CardText');

    function syncRangeFill(input) {
      const min = Number(input.min || 0);
      const max = Number(input.max || 100);
      const value = Number(input.value || 0);
      const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
      input.style.setProperty('--mx17-fill', `${pct}%`);
    }

    function update(fromPrice = false) {
      const price = Math.max(0, Number(priceInput.value) || 0);

      if (fromPrice) {
        pointInput.max = String(price);
        if (Number(pointInput.value) > price) pointInput.value = String(price);
      }

      const usePoint = Math.min(price, Math.max(0, Number(pointInput.value) || 0));
      const card = Math.max(0, price - usePoint);

      priceText.textContent = usd(price);
      pointText.textContent = point(usePoint);
      cardText.textContent = usd(card);

      syncRangeFill(priceInput);
      syncRangeFill(pointInput);
    }

    priceInput.addEventListener('input', () => update(true));
    pointInput.addEventListener('input', () => update(false));
    update(true);

    return true;
  }

  function init() {
    if (buildCalculator()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildCalculator() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

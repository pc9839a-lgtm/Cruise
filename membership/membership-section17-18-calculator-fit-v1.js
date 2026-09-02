(() => {
  'use strict';

  const PLANS = {
    classic: { name: 'CLASSIC', signupCost: 200, signupPoint: 350, monthlyCost: 100, monthlyPoint: 200 },
    premium: { name: 'PREMIUM', signupCost: 500, signupPoint: 800, monthlyCost: 250, monthlyPoint: 500 }
  };

  const money = (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const point = (value) => `${Number(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}P`;

  function buildCalculator() {
    const membership = document.getElementById('membership-point');
    if (!membership) return false;

    let calculator = document.getElementById('calculator');
    if (!calculator) {
      calculator = document.createElement('section');
      calculator.id = 'calculator';
      membership.insertAdjacentElement('afterend', calculator);
    }

    calculator.className = 'mx17-calculator-section';
    calculator.setAttribute('data-membership-section', '12');
    calculator.innerHTML = `
      <div class="mx17-inner">
        <span class="mx17-kicker">내 금액으로 직접 계산</span>
        <h2 class="mx17-title">몇 달 모으면<br><strong>실제로 얼마를 내게 될까요?</strong></h2>

        <div class="mx17-tool">
          <div class="mx17-plan-switch" role="group" aria-label="멤버십 플랜 선택">
            <button type="button" class="active" data-plan="classic">CLASSIC</button>
            <button type="button" data-plan="premium">PREMIUM</button>
          </div>

          <div class="mx17-controls">
            <label class="mx17-control">
              <span>모은 기간</span>
              <strong id="mx17MonthsText">8개월</strong>
              <input id="mx17Months" type="range" min="0" max="36" step="1" value="8" />
            </label>

            <label class="mx17-control">
              <span>크루즈 총액</span>
              <input id="mx17CruisePrice" class="mx17-number-input" type="number" min="0" step="0.01" value="3887.35" inputmode="decimal" />
            </label>

            <label class="mx17-control">
              <span>예약에 사용할 POINT</span>
              <input id="mx17UsePoint" class="mx17-number-input" type="number" min="0" step="0.01" value="1805.84" inputmode="decimal" />
              <small id="mx17PointLimit">보유 POINT 안에서 직접 입력</small>
            </label>
          </div>

          <div class="mx17-results" aria-live="polite">
            <div class="mx17-result-row">
              <span>POINT 준비에 낸 금액</span>
              <strong id="mx17FundingCash">$1,000.00</strong>
            </div>
            <div class="mx17-result-row">
              <span>총 적립 POINT</span>
              <strong id="mx17EarnedPoint">1,950P</strong>
            </div>
            <div class="mx17-result-row">
              <span>예약 시 카드 결제</span>
              <strong id="mx17BookingCard">$2,081.51</strong>
            </div>
            <div class="mx17-result-row total">
              <span>총 현금 지출</span>
              <strong id="mx17TotalCash">$3,081.51</strong>
            </div>
            <div class="mx17-result-row remain">
              <span>예약 후 남는 POINT</span>
              <strong id="mx17RemainPoint">144.16P</strong>
            </div>
          </div>

          <p class="mx17-example" id="mx17Example">실제 영수증 예시: $2,020.88 카드 출금 + $60.63 처리 수수료 = $2,081.51</p>
        </div>
      </div>`;

    if (membership.nextElementSibling !== calculator) {
      membership.insertAdjacentElement('afterend', calculator);
    }

    const months = calculator.querySelector('#mx17Months');
    const monthsText = calculator.querySelector('#mx17MonthsText');
    const cruisePrice = calculator.querySelector('#mx17CruisePrice');
    const usePoint = calculator.querySelector('#mx17UsePoint');
    const planButtons = [...calculator.querySelectorAll('[data-plan]')];
    const fundingCash = calculator.querySelector('#mx17FundingCash');
    const earnedPoint = calculator.querySelector('#mx17EarnedPoint');
    const bookingCard = calculator.querySelector('#mx17BookingCard');
    const totalCash = calculator.querySelector('#mx17TotalCash');
    const remainPoint = calculator.querySelector('#mx17RemainPoint');
    const pointLimit = calculator.querySelector('#mx17PointLimit');

    let selectedPlan = 'classic';

    function update() {
      const plan = PLANS[selectedPlan];
      const monthCount = Math.max(0, Number(months.value) || 0);
      const price = Math.max(0, Number(cruisePrice.value) || 0);
      const availablePoint = plan.signupPoint + (plan.monthlyPoint * monthCount);
      const paidForPoint = plan.signupCost + (plan.monthlyCost * monthCount);
      let requestedPoint = Math.max(0, Number(usePoint.value) || 0);
      const maxUsable = Math.min(availablePoint, price);

      if (requestedPoint > maxUsable) {
        requestedPoint = maxUsable;
        usePoint.value = String(Number(requestedPoint.toFixed(2)));
      }

      const cardAtBooking = Math.max(0, price - requestedPoint);
      const totalCashPaid = paidForPoint + cardAtBooking;
      const remainingPoint = Math.max(0, availablePoint - requestedPoint);

      monthsText.textContent = `${monthCount}개월`;
      fundingCash.textContent = money(paidForPoint);
      earnedPoint.textContent = point(availablePoint);
      bookingCard.textContent = money(cardAtBooking);
      totalCash.textContent = money(totalCashPaid);
      remainPoint.textContent = point(remainingPoint);
      pointLimit.textContent = `${plan.name} 기준 보유 ${point(availablePoint)} · 최대 ${point(maxUsable)} 사용 가능`;

      const progress = (monthCount / Number(months.max)) * 100;
      months.style.setProperty('--mx17-progress', `${progress}%`);
    }

    planButtons.forEach((button) => {
      button.addEventListener('click', () => {
        selectedPlan = button.dataset.plan;
        planButtons.forEach((item) => item.classList.toggle('active', item === button));
        update();
      });
    });

    months.addEventListener('input', update);
    cruisePrice.addEventListener('input', update);
    usePoint.addEventListener('input', update);
    update();

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

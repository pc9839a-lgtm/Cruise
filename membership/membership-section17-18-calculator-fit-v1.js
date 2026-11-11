(() => {
  'use strict';

  // Only position and label the calculator. CSS owns sizing, spacing and visibility.
  function configureCalculator() {
    const membership = document.getElementById('membership-point');
    const calculator = document.getElementById('calculator');
    if (!membership || !calculator) return false;

    const anchor = document.getElementById('mx-booking-proof') || membership;

    calculator.classList.add('calc-clean-v2');
    calculator.setAttribute('data-membership-section', '17');
    if (anchor.nextElementSibling !== calculator) {
      anchor.insertAdjacentElement('afterend', calculator);
    }

    const setText = (selector, value) => {
      const element = calculator.querySelector(selector);
      if (element) element.textContent = value;
    };
    setText('.section-kicker', 'USD · POINT');
    setText('.calculator-head strong', '크루즈 금액');
    setText('.mode-btn[data-mode="general"]', '일반 예약');
    setText('.mode-btn[data-mode="early"]', '270일+');
    setText('#pointLabel', '필요 POINT');
    setText('#cashLabel', '카드 결제');

    const title = calculator.querySelector('.section-head h2');
    if (title) title.innerHTML = '그럼 내가 가려는 크루즈는?<br><strong>직접 계산해보세요</strong>';

    const cruiseBox = calculator.querySelector('#cruiseUsd')?.closest('.result-box');
    if (cruiseBox) {
      cruiseBox.classList.add('calc-price-dup');
      cruiseBox.setAttribute('aria-hidden', 'true');
    }
    const description = calculator.querySelector('#modeDescription');
    if (description) description.removeAttribute('aria-hidden');
    for (const selector of ['.exchange-bar', '#cruiseKrw', '#pointKrw', '#cashKrw', '#coverageText', '#coverageSubtext']) {
      calculator.querySelector(selector)?.setAttribute('aria-hidden', 'true');
    }

    const totalBox = calculator.querySelector('#coverageRatio')?.closest('.result-box');
    const totalLabel = totalBox?.querySelector('span');
    if (totalLabel) totalLabel.textContent = '총 결제 예시';
    return true;
  }

  function init() {
    if (configureCalculator()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (configureCalculator() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

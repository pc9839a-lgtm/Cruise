(() => {
  'use strict';

  // Only position and label the calculator. CSS owns sizing, spacing and visibility.
  function configureCalculator() {
    const membership = document.getElementById('member-story-points');
    const calculator = document.getElementById('calculator');
    if (!membership || !calculator) return false;

    const anchor = membership;

    calculator.classList.add('calc-clean-v2');
    calculator.setAttribute('data-membership-section', '17');
    if (anchor.nextElementSibling !== calculator) {
      anchor.insertAdjacentElement('afterend', calculator);
    }

    const setText = (selector, value) => {
      const element = calculator.querySelector(selector);
      if (element) element.textContent = value;
    };
    setText('.calculator-head strong', '예상 크루즈 금액');
    setText('.mode-btn[data-mode="general"]', '포인트 + 카드');
    setText('.mode-btn[data-mode="early"]', '270일 이상 미리 예약');
    setText('#pointLabel', '예약에 사용하는 POINT');
    setText('#cashLabel', '예약 시 카드 결제');

    const cruiseBox = calculator.querySelector('#cruiseUsd')?.closest('.result-box');
    if (cruiseBox) {
      cruiseBox.classList.add('calc-price-dup');
      cruiseBox.setAttribute('aria-hidden', 'true');
    }
    const description = calculator.querySelector('#modeDescription');
    if (description) description.removeAttribute('aria-hidden');

    const totalBox = calculator.querySelector('#coverageRatio')?.closest('.result-box');
    const totalLabel = totalBox?.querySelector('span');
    if (totalLabel) totalLabel.textContent = '멤버십 납부 + 예약 결제 합계';
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

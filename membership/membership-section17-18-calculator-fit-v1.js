(() => {
  'use strict';

  function patchCalculator() {
    const membership = document.getElementById('membership-point');
    const pointExample = document.getElementById('mx-point-example');
    const guide = document.getElementById('mx-guide-assist');
    const calculator = document.getElementById('calculator');
    if (!membership || !calculator) return false;

    calculator.className = 'section mv2-calculator';
    calculator.setAttribute('data-membership-section', '17');

    const anchor = guide || pointExample || membership;
    if (anchor.nextElementSibling !== calculator) {
      anchor.insertAdjacentElement('afterend', calculator);
    }

    const kicker = calculator.querySelector('.section-kicker');
    const title = calculator.querySelector('.section-head h2');
    const priceLabel = calculator.querySelector('.calculator-head strong');
    const general = calculator.querySelector('.mode-btn[data-mode="general"]');
    const early = calculator.querySelector('.mode-btn[data-mode="early"]');
    const description = calculator.querySelector('#modeDescription');

    if (kicker) kicker.textContent = 'USD · POINT';
    if (title) title.innerHTML = '그럼 내가 가려는 크루즈는<br><strong>얼마가 필요할까?</strong>';
    if (priceLabel) priceLabel.textContent = '크루즈 금액';
    if (general) general.textContent = '일반 예약';
    if (early) early.textContent = '270일+';

    const cruiseUsd = calculator.querySelector('#cruiseUsd');
    cruiseUsd?.closest('.result-box')?.classList.add('calc-price-dup');

    const pointLabel = calculator.querySelector('#pointLabel');
    const cashLabel = calculator.querySelector('#cashLabel');
    const coverage = calculator.querySelector('#coverageRatio');
    if (pointLabel) pointLabel.textContent = '필요 POINT';
    if (cashLabel) cashLabel.textContent = '카드 결제';
    if (coverage) {
      const box = coverage.closest('.result-box');
      const label = box?.querySelector('span');
      if (label) label.textContent = '총 결제 예시';
    }

    calculator.querySelectorAll('.exchange-bar,#cruiseKrw,#pointKrw,#cashKrw,#coverageText').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
      el.textContent = '';
    });

    function syncModeText() {
      if (!description) return;
      description.textContent = early?.classList.contains('active')
        ? '270일+ · POINT 활용 확대'
        : 'POINT + CARD';
    }

    syncModeText();

    if (calculator.dataset.usdOnlyBound !== '1') {
      calculator.dataset.usdOnlyBound = '1';
      calculator.querySelectorAll('.mode-btn').forEach((btn) => {
        btn.addEventListener('click', () => window.setTimeout(syncModeText, 0));
      });
      const range = calculator.querySelector('#cruisePrice');
      if (range) range.addEventListener('input', () => window.setTimeout(syncModeText, 0));
    }

    return true;
  }

  function init() {
    if (patchCalculator()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (patchCalculator() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

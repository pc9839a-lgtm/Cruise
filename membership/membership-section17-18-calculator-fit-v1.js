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
    const resultGrid = calculator.querySelector('.result-grid');
    const modeWrap = calculator.querySelector('.calculator-mode');

    if (kicker) kicker.textContent = 'USD · POINT';
    if (title) title.innerHTML = '그럼 내가 가려는 크루즈는?<br><strong>직접 계산해보세요</strong>';
    if (priceLabel) priceLabel.textContent = '크루즈 금액';
    if (general) general.textContent = '일반 예약';
    if (early) early.textContent = '270일+';

    /* 상단에 이미 크루즈 금액이 크게 보이므로 결과 영역의 중복 금액은 숨김 */
    const cruiseUsd = calculator.querySelector('#cruiseUsd');
    const cruiseBox = cruiseUsd?.closest('.result-box');
    if (cruiseBox) {
      cruiseBox.classList.add('calc-price-dup');
      cruiseBox.style.setProperty('display', 'none', 'important');
      cruiseBox.setAttribute('aria-hidden', 'true');
    }

    /* POINT + CARD 같은 중간 첨언 바는 완전히 비노출 */
    if (description) {
      description.style.setProperty('display', 'none', 'important');
      description.setAttribute('aria-hidden', 'true');
    }

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

    function applyResultLayout() {
      if (!resultGrid) return;
      const mobile = window.matchMedia('(max-width: 780px)').matches;
      const visibleBoxes = [...resultGrid.querySelectorAll('.result-box')].filter((box) => box !== cruiseBox);

      resultGrid.style.setProperty('grid-template-columns', mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', 'important');
      resultGrid.style.setProperty('gap', mobile ? '10px' : '12px', 'important');
      resultGrid.style.setProperty('margin-top', mobile ? '20px' : '28px', 'important');

      if (modeWrap) modeWrap.style.setProperty('margin-bottom', mobile ? '18px' : '24px', 'important');

      visibleBoxes.forEach((box) => {
        box.style.setProperty('min-height', mobile ? '82px' : '142px', 'important');
        box.style.setProperty('padding', mobile ? '15px 17px' : '24px 18px', 'important');
        box.style.setProperty('border-radius', mobile ? '12px' : '14px', 'important');

        const label = box.querySelector('span');
        const value = box.querySelector('strong');
        if (label) label.style.setProperty('font-size', mobile ? '13px' : '14px', 'important');
        if (value) value.style.setProperty('font-size', mobile ? '30px' : '38px', 'important');
      });
    }

    applyResultLayout();

    if (calculator.dataset.resultLayoutBound !== '1') {
      calculator.dataset.resultLayoutBound = '1';
      window.addEventListener('resize', applyResultLayout, { passive: true });
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

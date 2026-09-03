(() => {
  'use strict';

  function patchCalculator() {
    const membership = document.getElementById('membership-point');
    const pointExample = document.getElementById('mx-point-example');
    const guide = document.getElementById('mx-guide-assist');
    const calculator = document.getElementById('calculator');
    if (!membership || !calculator) return false;

    calculator.className = 'section mv2-calculator calc-clean-v2';
    calculator.setAttribute('data-membership-section', '17');

    const anchor = guide || pointExample || membership;
    if (anchor.nextElementSibling !== calculator) anchor.insertAdjacentElement('afterend', calculator);

    const kicker = calculator.querySelector('.section-kicker');
    const title = calculator.querySelector('.section-head h2');
    const priceLabel = calculator.querySelector('.calculator-head strong');
    const general = calculator.querySelector('.mode-btn[data-mode="general"]');
    const early = calculator.querySelector('.mode-btn[data-mode="early"]');
    const description = calculator.querySelector('#modeDescription');
    const resultGrid = calculator.querySelector('.result-grid');
    const modeWrap = calculator.querySelector('.calculator-mode');
    const card = calculator.querySelector('.calculator-card');

    if (kicker) kicker.textContent = 'USD · POINT';
    if (title) title.innerHTML = '그럼 내가 가려는 크루즈는?<br><strong>직접 계산해보세요</strong>';
    if (priceLabel) priceLabel.textContent = '크루즈 금액';
    if (general) general.textContent = '일반 예약';
    if (early) early.textContent = '270일+';

    /* 상단 금액과 중복되는 첫 번째 결과 박스 제거 */
    const cruiseUsd = calculator.querySelector('#cruiseUsd');
    const cruiseBox = cruiseUsd?.closest('.result-box');
    if (cruiseBox) {
      cruiseBox.classList.add('calc-price-dup');
      cruiseBox.style.setProperty('display', 'none', 'important');
      cruiseBox.setAttribute('aria-hidden', 'true');
    }

    /* 설명성 중간 바 제거 — 조작과 결과만 남김 */
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
      if (label) label.textContent = '실제 부담 예시';
    }

    calculator.querySelectorAll('.exchange-bar,#cruiseKrw,#pointKrw,#cashKrw,#coverageText,#coverageSubtext').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });

    if (card) {
      card.style.setProperty('padding', '38px 32px 34px', 'important');
    }

    function applyResultLayout() {
      if (!resultGrid) return;
      const mobile = window.matchMedia('(max-width: 780px)').matches;
      const visibleBoxes = [...resultGrid.querySelectorAll('.result-box')].filter((box) => box !== cruiseBox);

      resultGrid.style.setProperty('grid-template-columns', mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', 'important');
      resultGrid.style.setProperty('gap', mobile ? '10px' : '14px', 'important');
      resultGrid.style.setProperty('margin-top', mobile ? '22px' : '30px', 'important');

      if (modeWrap) {
        modeWrap.style.setProperty('margin-top', mobile ? '18px' : '24px', 'important');
        modeWrap.style.setProperty('margin-bottom', '0', 'important');
      }

      visibleBoxes.forEach((box, index) => {
        box.style.setProperty('min-height', mobile ? '88px' : '154px', 'important');
        box.style.setProperty('padding', mobile ? '16px 18px' : '26px 20px', 'important');
        box.style.setProperty('border-radius', mobile ? '12px' : '15px', 'important');
        box.style.setProperty('display', 'flex', 'important');
        box.style.setProperty('flex-direction', mobile ? 'row' : 'column', 'important');
        box.style.setProperty('align-items', mobile ? 'center' : 'center', 'important');
        box.style.setProperty('justify-content', 'center', 'important');
        box.style.setProperty('gap', mobile ? '12px' : '14px', 'important');
        box.style.setProperty('text-align', 'center', 'important');

        const label = box.querySelector('span');
        const value = box.querySelector('strong');
        if (label) {
          label.style.setProperty('font-size', mobile ? '14px' : '15px', 'important');
          label.style.setProperty('font-weight', '900', 'important');
        }
        if (value) {
          value.style.setProperty('margin', '0', 'important');
          value.style.setProperty('font-size', mobile ? '31px' : '42px', 'important');
          value.style.setProperty('line-height', '1', 'important');
        }

        if (index === visibleBoxes.length - 1) {
          box.style.setProperty('border-width', '2px', 'important');
        }
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

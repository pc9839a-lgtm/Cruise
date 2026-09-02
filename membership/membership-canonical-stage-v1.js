(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function buildSavingsUse() {
    const cost = $('#mx-cost-structure');
    if (!cost) return false;

    if (!$('#m3-savings-use')) {
      cost.insertAdjacentHTML('afterend', `
        <section id="m3-savings-use" class="m3-section m3-light">
          <div class="m3-inner">
            <span class="m3-kicker">둘이면 160만원</span>
            <h2>아낀 돈은<br><strong>여행에 다시 쓰면 됩니다</strong></h2>
            <div class="m3-four">
              <div><b>01</b><strong>항공권</strong></div>
              <div><b>02</b><strong>객실 업그레이드</strong></div>
              <div><b>03</b><strong>기항지 투어</strong></div>
              <div><b>04</b><strong>다음 크루즈 예약</strong></div>
            </div>
          </div>
        </section>`);
    }
    return true;
  }

  function buildSelector() {
    const planGuide = $('#mx-plan-guide');
    const plans = $('#plans');
    if (!planGuide || !plans) return false;

    if (!$('#m3-selector')) {
      planGuide.insertAdjacentHTML('afterend', `
        <section id="m3-selector" class="m3-section m3-soft">
          <div class="m3-inner">
            <span class="m3-kicker">마지막 선택은 이것만</span>
            <h2>한 달에 얼마가<br><strong>부담 없나요?</strong></h2>
            <div class="m3-select-block m3-select-amount" data-select="amount">
              <div class="m3-buttons">
                <button type="button" data-value="classic">$100<br>CLASSIC<br>매달 200P</button>
                <button type="button" data-value="premium">$250<br>PREMIUM<br>매달 500P</button>
              </div>
            </div>
            <div class="m3-result" aria-live="polite">
              <span>선택하면 바로</span>
              <strong>선택해보세요</strong>
            </div>
          </div>
        </section>`);
    }
    return true;
  }

  function bindSelector() {
    if (document.body.dataset.canonicalSelectorBound === '1') return;
    document.body.dataset.canonicalSelectorBound = '1';

    document.addEventListener('click', (event) => {
      const button = event.target.closest('#m3-selector .m3-buttons button');
      if (!button) return;

      const block = button.closest('[data-select="amount"]');
      if (!block) return;

      $$('.m3-buttons button', block).forEach((item) => item.classList.toggle('active', item === button));

      const result = $('#m3-selector .m3-result strong');
      if (!result) return;

      result.textContent = button.dataset.value === 'premium'
        ? '당신에게는 PREMIUM이 맞습니다'
        : '당신에게는 CLASSIC이 맞습니다';
    });
  }

  function build() {
    const a = buildSavingsUse();
    const b = buildSelector();
    if (a && b) bindSelector();
    return a && b;
  }

  function init() {
    if (build()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (build() || tries >= 40) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
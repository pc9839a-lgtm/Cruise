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
            <span class="m3-kicker">둘이 약 160만원 차이</span>
            <h2>160만원을<br><strong>다른 여행비로</strong></h2>
            <div class="m3-four">
              <div><b>01</b><strong>항공권</strong></div>
              <div><b>02</b><strong>객실 업그레이드</strong></div>
              <div><b>03</b><strong>기항지 투어</strong></div>
              <div><b>04</b><strong>다음 여행</strong></div>
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
            <span class="m3-kicker">둘 중 뭘 고르지?</span>
            <h2><strong>두 가지만 선택하세요</strong></h2>
            <div class="m3-select-block" data-select="time">
              <b>언제 갈까?</b>
              <div class="m3-buttons">
                <button type="button" data-value="soon">1년 이내</button>
                <button type="button" data-value="later">1~2년</button>
                <button type="button" data-value="unknown">미정</button>
              </div>
            </div>
            <div class="m3-select-block" data-select="freq">
              <b>얼마나 자주?</b>
              <div class="m3-buttons">
                <button type="button" data-value="low">가끔</button>
                <button type="button" data-value="high">자주</button>
              </div>
            </div>
            <div class="m3-result" aria-live="polite">
              <span>비교 결과</span>
              <strong>선택해보세요</strong>
              <button type="button" data-m3-go-plan>플랜 보기</button>
            </div>
          </div>
        </section>`);
    }
    return true;
  }

  function bindSelector() {
    if (document.body.dataset.canonicalSelectorBound === '1') return;
    document.body.dataset.canonicalSelectorBound = '1';

    const state = { time: '', freq: '' };

    document.addEventListener('click', (event) => {
      const button = event.target.closest('#m3-selector .m3-buttons button');
      if (button) {
        const block = button.closest('[data-select]');
        const key = block?.dataset.select;
        if (!key) return;

        state[key] = button.dataset.value || '';
        $$('.m3-buttons button', block).forEach((item) => item.classList.toggle('active', item === button));

        const result = $('#m3-selector .m3-result strong');
        if (result && state.time && state.freq) {
          result.textContent = state.freq === 'high'
            ? 'PREMIUM 비교'
            : (state.time === 'unknown' ? '일정 정한 뒤 비교' : 'CLASSIC 비교');
        }
        return;
      }

      if (event.target.closest('[data-m3-go-plan]')) {
        $('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
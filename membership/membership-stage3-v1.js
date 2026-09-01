(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function stripKrw() {
    const exchange = $('#calculator .exchange-bar');
    if (exchange) {
      exchange.style.display = 'none';
      exchange.setAttribute('aria-hidden', 'true');
    }

    ['#cruiseKrw', '#pointKrw', '#cashKrw', '#coverageText'].forEach((s) => {
      const el = $(s);
      if (!el) return;
      el.textContent = '';
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    });

    $$('#plans .plan-top-stats').forEach((el) => {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    });
  }

  function removeGeneratedDuplicates() {
    ['#m3-booking', '#m3-cases'].forEach((selector) => {
      const el = $(selector);
      if (el) el.remove();
    });
  }

  function addSavingsUse() {
    const cost = $('#mx-cost-structure');
    if (!cost || $('#m3-savings-use')) return;

    cost.insertAdjacentHTML('afterend', `
      <section id="m3-savings-use" class="m3-section m3-light">
        <div class="m3-inner">
          <span class="m3-kicker">160만원 차이</span>
          <h2><strong>여행에 다시 쓰기</strong></h2>
          <div class="m3-four">
            <div><b>01</b><strong>항공권</strong></div>
            <div><b>02</b><strong>객실 업그레이드</strong></div>
            <div><b>03</b><strong>기항지</strong></div>
            <div><b>04</b><strong>다음 여행</strong></div>
          </div>
        </div>
      </section>`);
  }

  function addSelector() {
    const plans = $('#plans');
    const guide = $('#mx-plan-guide');
    if (!plans || $('#m3-selector')) return;

    const html = `
      <section id="m3-selector" class="m3-section m3-soft">
        <div class="m3-inner">
          <span class="m3-kicker">10초 선택</span>
          <h2><strong>CLASSIC · PREMIUM</strong></h2>
          <div class="m3-select-block" data-select="time">
            <b>출발</b>
            <div class="m3-buttons">
              <button type="button" data-value="soon">1년 이내</button>
              <button type="button" data-value="later">1~2년</button>
              <button type="button" data-value="unknown">미정</button>
            </div>
          </div>
          <div class="m3-select-block" data-select="freq">
            <b>빈도</b>
            <div class="m3-buttons">
              <button type="button" data-value="low">가끔</button>
              <button type="button" data-value="high">자주</button>
            </div>
          </div>
          <div class="m3-result" aria-live="polite">
            <span>선택 결과</span>
            <strong>두 항목 선택</strong>
            <button type="button" data-m3-go-plan>플랜 보기</button>
          </div>
        </div>
      </section>`;

    if (guide && guide.parentNode) guide.insertAdjacentHTML('afterend', html);
    else plans.insertAdjacentHTML('beforebegin', html);
  }

  function bindSelector() {
    if (document.body.dataset.m3Bound === '1') return;
    document.body.dataset.m3Bound = '1';
    const state = { time: '', freq: '' };

    document.addEventListener('click', (event) => {
      const button = event.target.closest('#m3-selector .m3-buttons button');
      if (button) {
        const block = button.closest('[data-select]');
        const key = block?.dataset.select;
        if (!key) return;

        state[key] = button.dataset.value || '';
        $$('.m3-buttons button', block).forEach((b) => b.classList.toggle('active', b === button));

        const result = $('#m3-selector .m3-result strong');
        if (result && state.time && state.freq) {
          result.textContent = state.freq === 'high'
            ? 'PREMIUM'
            : (state.time === 'unknown' ? '여행 일정 먼저' : 'CLASSIC');
        }
        return;
      }

      if (event.target.closest('[data-m3-go-plan]')) {
        $('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function run() {
    if (!$('#mx-cost-structure') || !$('#plans')) return false;
    removeGeneratedDuplicates();
    addSavingsUse();
    addSelector();
    stripKrw();
    bindSelector();
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (run() || tries > 30) clearInterval(timer);
  }, 180);

  const observer = new MutationObserver(() => {
    removeGeneratedDuplicates();
    stripKrw();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 9000);
})();

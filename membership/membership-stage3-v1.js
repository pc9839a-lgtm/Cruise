(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = value;
  }

  function setHtml(selector, value) {
    const el = $(selector);
    if (el) el.innerHTML = value;
  }

  function syncCoreNarrativeCopy() {
    setText('#price-pain .mv2-kicker', '여행사 · 가이드 포함으로 가면');
    setHtml('#price-pain .mv2-title', '4박 5일 · 2명<br><strong>약 400만원</strong>');
    setText('#price-pain .mv2-mega', '400만원');
    setHtml('#price-pain .mv2-save', '1인 약 <strong>200만원 × 2명</strong>');

    setText('#price-compare .mv2-kicker', '같은 크루즈를 직접 예약하면');
    setHtml('#price-compare .mv2-title', '여행사 200만원 → 직접예약 120만원<br><strong>1인 약 80만원 차이</strong>');

    setText('#same-cruise .mv2-kicker', '가격이 낮아져도');
    setHtml('#same-cruise .mv2-title', '<strong>크루즈 자체는 같습니다</strong>');

    setText('#guide-question .mv2-kicker', '그러면 다음 질문');
    setHtml('#guide-question .mv2-title', '가이드 없이<br><strong>직접 갈 수 있나?</strong>');
    setText('#guide-question .mv2-sub', '항구 도착 → 승선 → 선내생활 → 기항지 → 귀항. 이 흐름을 미리 준비하면 됩니다.');

    setText('#membership-point .mv2-kicker', '직접 예약 다음, 여기서 멤버십');
    setHtml('#membership-point .mv2-title', 'CLASSIC은 월 $100 결제<br><strong>매월 200P 적립</strong>');
    setHtml('#membership-point .mv2-sub', '가입 시에는 <strong>$200 → 350P</strong>, 이후 매월 <strong>$100 → 200P</strong>가 적립됩니다.');

    setText('#points-by-time .mv2-kicker', '매월 200P가 쌓이면');
    setHtml('#points-by-time .mv2-title', 'CLASSIC 월 적립분<br><strong>12개월 2,400P</strong>');

    setText('#real-cost .mv2-kicker', '적립한 POINT를 예약에 쓰면');
    setHtml('#real-cost .mv2-title', '$2,000 크루즈에<br><strong>1,000P 적용 예시</strong>');
    const payBoxes = $$('#real-cost .mv2-paybox');
    if (payBoxes[0]) {
      setText('#real-cost .mv2-paybox:nth-child(1) span', '크루즈 가격');
      setText('#real-cost .mv2-paybox:nth-child(1) strong', '$2,000');
    }
    if (payBoxes[1]) {
      setText('#real-cost .mv2-paybox:nth-child(3) span', '1,000P 적용 후 카드');
      setText('#real-cost .mv2-paybox:nth-child(3) strong', '$1,000');
    }
    setHtml('#real-cost .mv2-save', '예약 시 카드 결제 <strong class="mv2-blue">$1,000</strong>');
    setText('#real-cost .mv2-sub', '일반 예약에서 1,000P를 적용한 예시입니다. 실제 사용 한도는 예약 조건에 따라 달라집니다.');

    setText('#calculator .section-kicker', '내 크루즈로 계산');
    setHtml('#calculator .section-head h2', '크루즈 가격을 넣으면<br><strong>POINT + CARD를 바로 확인</strong>');

    setHtml('#plans .membership-section-head h2', 'CLASSIC과 PREMIUM<br><strong>월 결제액을 비교하세요</strong>');
    setText('#plans .membership-section-head p', 'CLASSIC 월 $100 → 200P · PREMIUM 월 $250 → 500P');
  }

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
          <span class="m3-kicker">2명 기준 160만원 차이</span>
          <h2><strong>그 돈을 여행에 다시 쓰면</strong></h2>
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
          <span class="m3-kicker">내 플랜 빠르게 보기</span>
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
    syncCoreNarrativeCopy();
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

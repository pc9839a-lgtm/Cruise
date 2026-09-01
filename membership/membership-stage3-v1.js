(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function setText(selector, value) {
    const el = $(selector);
    if (el && el.textContent !== value) el.textContent = value;
  }

  function setHtml(selector, value) {
    const el = $(selector);
    if (el && el.innerHTML !== value) el.innerHTML = value;
  }

  function syncCoreNarrativeCopy() {
    setHtml('.hero-title', '짐은 한 번만 풀고<br><strong>아침마다 다른 도시에 도착합니다</strong>');
    setText('.hero-ticket-back span', '자는 동안 이동');
    setText('.hero-ticket-back strong', '아침엔 새 도시');
    setText('.hero-ticket-front span', '한 배 안에서');
    setText('.hero-ticket-front strong', '숙박 · 식사 · 공연');
    setText('.hero-ticket-front em', '짐은 한 번만');

    setText('.review-strip-head .section-kicker', '크루즈는 이런 여행');
    setHtml('.review-strip-head h2', '먹고, 쉬고, 자는 동안<br>다음 도시로 이동합니다');

    setText('#price-pain .mv2-kicker', '여행사 · 가이드 포함 예시');
    setHtml('#price-pain .mv2-title', '둘이 4박 5일<br><strong>약 400만원?</strong>');
    setText('#price-pain .mv2-mega', '400만원?');
    setHtml('#price-pain .mv2-save', '1인 약 <strong>200만원 × 2명</strong>');

    setText('#price-compare .mv2-kicker', '같은 크루즈 · 직접 예약 예시');
    setHtml('#price-compare .mv2-title', '1인 200만원 → 120만원<br><strong>둘이 약 160만원 차이</strong>');
    setText('#price-compare .mv2-price:first-child span', '여행사 · 가이드 포함');
    setText('#price-compare .mv2-price:first-child strong', '200만원');
    setText('#price-compare .mv2-price.good span', '직접 예약');
    setText('#price-compare .mv2-price.good strong', '120만원');
    setHtml('#price-compare .mv2-save', '1인 약 <strong>80만원 차이</strong>');
    setText('#price-compare .mv2-mega', '둘이 약 160만원');

    setText('#same-cruise .mv2-kicker', '싼 배로 바꾼 게 아닙니다');
    setHtml('#same-cruise .mv2-title', '가격은 달라도<br><strong>크루즈는 같습니다</strong>');

    setText('#guide-question .mv2-kicker', '그럼 바로 드는 생각');
    setHtml('#guide-question .mv2-title', '싸도<br><strong>가이드 없으면 못 가는 거 아닌가?</strong>');
    const guideSteps = [
      ['01', '항구 도착'],
      ['02', '체크인'],
      ['03', '승선'],
      ['04', '기항지'],
      ['05', '하선']
    ];
    $$('#guide-question .mv2-step').forEach((el, index) => {
      const step = guideSteps[index];
      if (step) el.innerHTML = `<b>${step[0]}</b>${step[1]}`;
    });
    setText('#guide-question .mv2-sub', '실제 흐름은 이 5단계입니다. 필요한 것만 미리 알면 됩니다.');

    setText('#membership-point .mv2-kicker', 'CLASSIC');
    setHtml('#membership-point .mv2-title', '월 $100 결제<br><strong>매월 200P 적립</strong>');
    setHtml('#membership-point .mv2-sub', '가입 시 <strong>$200 → 350P</strong> · 이후 매월 <strong>$100 → 200P</strong>');

    setText('#points-by-time .mv2-kicker', '1년이면?');
    setHtml('#points-by-time .mv2-title', '월 적립분만<br><strong>2,400P</strong>');
    setText('#points-by-time .mv2-note', '가입 시 받는 350P는 별도입니다.');

    setText('#real-cost .mv2-kicker', 'POINT를 예약에 넣으면');
    setHtml('#real-cost .mv2-title', '$2,000 크루즈<br><strong>1,000P 사용 예시</strong>');
    setText('#real-cost .mv2-paybox:nth-child(1) span', '크루즈 가격');
    setText('#real-cost .mv2-paybox:nth-child(1) strong', '$2,000');
    setText('#real-cost .mv2-paybox:nth-child(3) span', '카드 결제');
    setText('#real-cost .mv2-paybox:nth-child(3) strong', '$1,000');
    setHtml('#real-cost .mv2-save', '사용 POINT <strong class="mv2-blue">1,000P</strong>');
    setText('#real-cost .mv2-sub', '일반 예약에서 1,000P를 적용한 예시입니다. 실제 사용 한도는 예약 조건에 따라 달라집니다.');

    setText('#calculator .section-kicker', '내 크루즈 금액으로');
    setHtml('#calculator .section-head h2', 'POINT를 얼마나 쓰고<br><strong>카드로 얼마 내는지</strong>');
    setText('#calculator .mode-btn[data-mode="early"]', '출발 270일+');

    setHtml('#plans .membership-section-head h2', 'CLASSIC $100<br><strong>PREMIUM $250</strong>');
    setText('#plans .membership-section-head p', '월 결제액과 월 적립 POINT부터 비교하세요.');
    setText('#plans .mv2-early>div:first-child span', '일반 예약');
    setText('#plans .mv2-early>div:first-child strong', 'POINT 일부 + 나머지 카드');
    setText('#plans .mv2-early>div:last-child span', '출발 270일+');
    setText('#plans .mv2-early>div:last-child strong', 'POINT 사용 범위 확대 가능');

    const planCards = $$('#plans .plan-card');
    planCards.forEach((card) => {
      const name = $('.plan-name', card)?.textContent?.trim();
      const fit = $('.plan-fit', card);
      const cta = $('.plan-cta', card);
      if (name === '클래식') {
        if (fit) fit.textContent = '월 $100 결제 · 매월 200P';
        if (cta) cta.textContent = 'CLASSIC 선택';
      }
      if (name === '프리미엄') {
        if (fit) fit.textContent = '월 $250 결제 · 매월 500P';
        if (cta) cta.textContent = 'PREMIUM 선택';
      }
    });

    setText('#membership-terms .mv2-kicker', '가입 버튼 누르기 전에');
    setHtml('#membership-terms .mv2-title', '이 5가지는<br><strong>꼭 확인하세요</strong>');

    setText('#price-match .mv2-kicker', '같은 조건인데 더 싸다면');
    setHtml('#price-match .mv2-title', '가격 보장 조건을<br><strong>확인하세요</strong>');
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
          <span class="m3-kicker">둘이 약 160만원 차이</span>
          <h2>이 돈이면<br><strong>여행이 달라집니다</strong></h2>
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
    syncCoreNarrativeCopy();
    removeGeneratedDuplicates();
    stripKrw();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 9000);
})();

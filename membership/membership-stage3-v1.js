(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const setText = (s, text, r = document) => { const el = $(s, r); if (el && el.textContent !== text) el.textContent = text; };
  const setHtml = (s, html, r = document) => { const el = $(s, r); if (el && el.innerHTML !== html) el.innerHTML = html; };
  const remove = (s, r = document) => $$(s, r).forEach((el) => el.remove());

  function stripKrw() {
    const exchange = $('#calculator .exchange-bar');
    if (exchange) {
      if (exchange.style.display !== 'none') exchange.style.display = 'none';
      if (exchange.getAttribute('aria-hidden') !== 'true') exchange.setAttribute('aria-hidden', 'true');
    }

    ['#cruiseKrw', '#pointKrw', '#cashKrw', '#coverageText'].forEach((s) => {
      const el = $(s);
      if (!el) return;
      if (el.textContent) el.textContent = '';
      if (el.style.display !== 'none') el.style.display = 'none';
      if (el.getAttribute('aria-hidden') !== 'true') el.setAttribute('aria-hidden', 'true');
    });

    remove('#plans .plan-top-stats');

    const desc = $('#modeDescription');
    if (desc) {
      const text = $('.mode-btn.active')?.dataset.mode === 'early' ? '270일+ · 포인트 활용 확대' : '포인트 + 카드';
      if (desc.textContent !== text) desc.textContent = text;
    }
  }

  function cleanCoreCopy() {
    setText('#guide-question .mv2-kicker', '가이드 없이');
    setHtml('#guide-question .mv2-title', '<strong>승선 5단계</strong>');

    setText('#membership-point .mv2-kicker', 'CLASSIC');
    setHtml('#membership-point .mv2-title', '$100 → <strong>200P</strong>');
    setHtml('#membership-point .mv2-sub', '가입 $200 → <strong>350P</strong>');

    setText('#points-by-time .mv2-kicker', '12개월');
    setHtml('#points-by-time .mv2-title', '<strong>2,400P</strong>');

    setText('#real-cost .mv2-kicker', '실제 여행비');
    setHtml('#real-cost .mv2-title', '$2,000 → <strong>$1,500</strong>');

    setText('#calculator .section-kicker', '가격 계산');
    setHtml('#calculator .section-head h2', '<strong>USD + POINT</strong>');

    setHtml('#plans .membership-section-head h2', '<strong>CLASSIC · PREMIUM</strong>');

    setText('#membership-terms .mv2-kicker', '가입 전');
    setHtml('#membership-terms .mv2-title', '<strong>5가지 확인</strong>');

    setText('#price-match .mv2-kicker', '가격 비교');
    setHtml('#price-match .mv2-title', '<strong>최저가 보장</strong>');
    setText('#price-match .mv2-sub', '동일 크루즈 · 일정 · 객실 조건');
  }

  function cleanExpansionCopy() {
    const chapters = [
      ['#mx-chapter-1', '가격 비교', '같은 크루즈<br><strong>160만원 차이</strong>'],
      ['#mx-chapter-2', '직접 여행', '가이드 없이<br><strong>크루즈 여행</strong>'],
      ['#mx-chapter-3', '포인트', '$100 → <strong>200P</strong>'],
      ['#mx-chapter-4', '결제', '포인트 + 카드<br><strong>실제 결제</strong>'],
      ['#mx-chapter-5', '플랜', 'CLASSIC<br><strong>PREMIUM</strong>'],
      ['#mx-chapter-6', '확인', '가입 전<br><strong>5가지</strong>']
    ];

    chapters.forEach(([id, kicker, title]) => {
      const root = $(id);
      if (!root) return;
      setText('.mx-chapter-copy small', kicker, root);
      setHtml('.mx-chapter-copy h2', title, root);
      remove('.mx-chapter-copy p', root);
    });

    const cost = $('#mx-cost-structure');
    if (cost) {
      setText('.mx-eyebrow', '가격 차이', cost);
      setHtml('.mx-title', '크루즈는 그대로<br><strong>예약 방식만 다르게</strong>', cost);
      const labels = ['가이드', '단체 이동', '패키지 운영', '예약 대행'];
      $$('.mx-card', cost).forEach((card, i) => {
        if (labels[i]) setText('strong', labels[i], card);
      });
    }

    const hotel = $('#mx-moving-hotel');
    if (hotel) {
      setText('.mx-eyebrow', '크루즈 구조', hotel);
      setHtml('.mx-title', '객실은 그대로<br><strong>도시만 이동</strong>', hotel);
    }

    const prepare = $('#mx-prepare-money');
    if (prepare) {
      setText('.mx-eyebrow', '여행비 준비', prepare);
      setHtml('.mx-title', '한 번에 결제<br><strong>VS 매달 적립</strong>', prepare);
    }

    const pointUse = $('#mx-point-use');
    if (pointUse) {
      setText('.mx-eyebrow', '포인트 사용', pointUse);
      setHtml('.mx-title', '적립 → 선택 → <strong>예약</strong>', pointUse);
    }

    const rules = $('#mx-use-rules');
    if (rules) {
      setText('.mx-eyebrow', '사용 기준', rules);
      setHtml('.mx-title', '포인트 + 카드<br><strong>270일+</strong>', rules);
      const minis = $$('.mx-mini', rules);
      if (minis[0]) minis[0].textContent = '포인트 부족';
      if (minis[1]) minis[1].textContent = '출발 270일+';
    }

    const planGuide = $('#mx-plan-guide');
    if (planGuide) {
      setText('.mx-eyebrow', '플랜 비교', planGuide);
      setHtml('.mx-title', 'CLASSIC <strong>VS</strong> PREMIUM', planGuide);
    }

    const fit = $('#mx-fit-check');
    if (fit) {
      setText('.mx-eyebrow', '여행 계획', fit);
      setHtml('.mx-title', '1~2년 안에 크루즈<br><strong>YES · NO</strong>', fit);
      const heads = $$('.mx-fit-box h3', fit);
      if (heads[0]) heads[0].textContent = 'YES';
      if (heads[1]) heads[1].textContent = 'NO';
      const items = $$('.mx-fit-item span', fit);
      const copy = ['1~2년 안에 출발', '부부 · 가족 여행', '직접 예약 가능', '다음 크루즈 계획', '여행 일정 미정', '가이드 패키지만 선호', '가까운 날짜 바로 출발'];
      items.forEach((el, i) => { if (copy[i] && el.textContent !== copy[i]) el.textContent = copy[i]; });
    }

    const faq = $('#mx-faq-section');
    if (faq) {
      setText('.mx-eyebrow', 'FAQ', faq);
      setHtml('.mx-title', '가입 전 <strong>5문답</strong>', faq);
      const questions = ['같은 크루즈인가요?', '포인트가 부족하면?', '가이드 없이 가능한가요?', 'CLASSIC · PREMIUM?', '가입 전 확인?'];
      const answers = ['선사 · 일정 · 객실 조건 기준 비교', '포인트 + 카드', '승선 5단계 확인', '적립 속도 차이', '환불 · 결제 · 유지 · 해지 조건'];
      $$('.mx-faq-item', faq).forEach((item, i) => {
        if (questions[i]) setText('.mx-faq-q span', questions[i], item);
        if (answers[i]) setText('.mx-faq-a p', answers[i], item);
      });
    }

    const recap = $('#mx-recap');
    if (recap) {
      setText('.mx-eyebrow', '3줄 요약', recap);
      setHtml('.mx-title', '가격 · 포인트 · <strong>예약</strong>', recap);
      const summary = ['예약 방식 → 가격 차이', '$100 → 200P', '포인트 → 크루즈 예약'];
      $$('.mx-recap-card', recap).forEach((card, i) => {
        if (summary[i]) setText('strong', summary[i], card);
      });
    }

    const final = $('#mx-final-choice');
    if (final) {
      setHtml('h2', 'CLASSIC <strong>VS</strong> PREMIUM', final);
      const a = $('a', final);
      if (a && a.textContent !== '플랜 보기') a.textContent = '플랜 보기';
    }
  }

  function upgradeSameCruise() {
    const root = $('#same-cruise');
    if (!root) return;
    setText('.mv2-kicker', 'SAME', root);
    setHtml('.mv2-title', '<strong>같은 크루즈</strong>', root);
    const labels = ['배', '객실', '식사', '공연'];
    $$('.mv2-four > div', root).forEach((el, i) => {
      const html = `<b>SAME</b><span>${labels[i] || ''}</span>`;
      if (el.innerHTML !== html) el.innerHTML = html;
    });
  }

  function addStage3Sections() {
    if ($('#m3-savings-use')) return;

    const cost = $('#mx-cost-structure');
    if (cost) cost.insertAdjacentHTML('afterend', `
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

    const hotel = $('#mx-moving-hotel');
    if (hotel) hotel.insertAdjacentHTML('afterend', `
      <section id="m3-booking" class="m3-section m3-dark">
        <div class="m3-inner">
          <span class="m3-kicker">예약 5단계</span>
          <h2><strong>고르고 · 적용하고 · 예약</strong></h2>
          <div class="m3-steps">
            <div><b>01</b><strong>지역</strong></div>
            <div><b>02</b><strong>날짜</strong></div>
            <div><b>03</b><strong>객실</strong></div>
            <div><b>04</b><strong>포인트</strong></div>
            <div><b>05</b><strong>예약</strong></div>
          </div>
        </div>
      </section>`);

    const plans = $('#plans');
    const planGuide = $('#mx-plan-guide');
    const anchor = planGuide || plans;
    if (anchor && plans) anchor.insertAdjacentHTML('afterend', `
      <section id="m3-cases" class="m3-section m3-light">
        <div class="m3-inner">
          <span class="m3-kicker">3가지 여행</span>
          <h2><strong>여행 유형</strong></h2>
          <div class="m3-cases">
            <article><b>CASE 01</b><strong>첫 크루즈 · 부부</strong><span>CLASSIC</span></article>
            <article><b>CASE 02</b><strong>1년 뒤 · 가족</strong><span>CLASSIC</span></article>
            <article><b>CASE 03</b><strong>크루즈 자주</strong><span>PREMIUM</span></article>
          </div>
        </div>
      </section>
      <section id="m3-selector" class="m3-section m3-soft">
        <div class="m3-inner">
          <span class="m3-kicker">10초 선택</span>
          <h2><strong>CLASSIC · PREMIUM</strong></h2>
          <div class="m3-select-block" data-select="time">
            <b>출발</b>
            <div class="m3-buttons"><button type="button" data-value="soon">1년 이내</button><button type="button" data-value="later">1~2년</button><button type="button" data-value="unknown">미정</button></div>
          </div>
          <div class="m3-select-block" data-select="freq">
            <b>빈도</b>
            <div class="m3-buttons"><button type="button" data-value="low">가끔</button><button type="button" data-value="high">자주</button></div>
          </div>
          <div class="m3-result" aria-live="polite"><span>선택 결과</span><strong>두 항목 선택</strong><button type="button" data-m3-go-plan>플랜 보기</button></div>
        </div>
      </section>`);
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
          const text = state.freq === 'high' ? 'PREMIUM' : (state.time === 'unknown' ? '여행 일정 먼저' : 'CLASSIC');
          if (result.textContent !== text) result.textContent = text;
        }
        return;
      }

      if (event.target.closest('[data-m3-go-plan]')) {
        $('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function run() {
    if (!$('#mx-chapter-1')) return false;
    cleanCoreCopy();
    cleanExpansionCopy();
    upgradeSameCruise();
    addStage3Sections();
    stripKrw();
    bindSelector();
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (run() || tries > 20) clearInterval(timer);
  }, 180);

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      stripKrw();
      cleanCoreCopy();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
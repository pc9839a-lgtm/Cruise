(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function replaceFit() {
    const old = $('#mx-fit-check');
    if (!old || $('#tail-fit')) return;
    const section = document.createElement('section');
    section.id = 'tail-fit';
    section.className = 'tail-section tail-fit';
    section.innerHTML = `
      <div class="tail-inner">
        <span class="tail-pill">5초 체크</span>
        <h2>1~2년 안에<br><strong>크루즈 갈 계획?</strong></h2>

        <div class="tail-fit-question" data-tail-question="trip">
          <b>여행 계획</b>
          <div class="tail-fit-buttons">
            <button type="button" data-value="yes">있음</button>
            <button type="button" data-value="no">없음</button>
          </div>
        </div>

        <div class="tail-fit-question" data-tail-question="direct">
          <b>직접 예약</b>
          <div class="tail-fit-buttons">
            <button type="button" data-value="yes">가능</button>
            <button type="button" data-value="no">여행사 선호</button>
          </div>
        </div>

        <div class="tail-fit-result" aria-live="polite">
          <span>선택 결과</span>
          <strong>두 항목 선택</strong>
        </div>
      </div>`;
    old.replaceWith(section);
  }

  function replaceTerms() {
    const old = $('#membership-terms');
    if (!old || $('#tail-terms')) return;
    const section = document.createElement('section');
    section.id = 'tail-terms';
    section.className = 'tail-section tail-terms';
    section.innerHTML = `
      <div class="tail-inner">
        <span class="tail-pill dark">가입 전</span>
        <h2>이 5개만<br><strong>확인</strong></h2>
        <div class="tail-term-grid">
          <article><b>01</b><strong>14일</strong><span>가입 후 14일 이후 환불 제한</span></article>
          <article><b>02</b><strong>현금 X</strong><span>포인트는 출금용 현금이 아님</span></article>
          <article><b>03</b><strong>본인 카드</strong><span>본인 명의 카드 결제</span></article>
          <article><b>04</b><strong>멤버십 유지</strong><span>예약 크루즈 이용 시 유지 조건 확인</span></article>
          <article class="wide"><b>05</b><strong>해지 시 2배 적립분 소멸</strong><span>원래 결제 기준 포인트는 남음</span></article>
        </div>
      </div>`;
    old.replaceWith(section);
  }

  function replacePriceMatch() {
    const old = $('#price-match');
    if (!old || $('#tail-price-match')) return;
    const section = document.createElement('section');
    section.id = 'tail-price-match';
    section.className = 'tail-section tail-price-match';
    section.innerHTML = `
      <div class="tail-inner">
        <div class="tail-shield" aria-hidden="true">✓</div>
        <h2>더 싼 가격을 찾았다면</h2>
        <div class="tail-match-number"><strong>$100+</strong><span>PRICE MATCH</span></div>
        <div class="tail-match-rule">
          <span>같은 선사</span><i></i><span>같은 일정</span><i></i><span>같은 객실 조건</span>
        </div>
      </div>`;
    old.replaceWith(section);
  }

  function replaceFinal() {
    const old = $('#mx-final-choice');
    if (!old || $('#tail-final')) return;
    const section = document.createElement('section');
    section.id = 'tail-final';
    section.className = 'tail-section tail-final';
    section.innerHTML = `
      <div class="tail-inner">
        <h2>내 여행 속도에 맞게</h2>
        <div class="tail-final-split">
          <button type="button" data-tail-plan="classic">
            <span>천천히 준비</span>
            <strong>CLASSIC</strong>
            <b>$100 / 200P</b>
          </button>
          <button type="button" data-tail-plan="premium">
            <span>빠르게 준비</span>
            <strong>PREMIUM</strong>
            <b>$250 / 500P</b>
          </button>
        </div>
      </div>`;
    old.replaceWith(section);
  }

  function removeRedundant() {
    ['#mx-faq-section', '#mx-recap'].forEach((s) => $(s)?.remove());
  }

  function bindFit() {
    const root = $('#tail-fit');
    if (!root || root.dataset.bound === '1') return;
    root.dataset.bound = '1';
    const state = { trip: '', direct: '' };

    root.addEventListener('click', (event) => {
      const btn = event.target.closest('.tail-fit-buttons button');
      if (!btn) return;
      const q = btn.closest('[data-tail-question]');
      const key = q?.dataset.tailQuestion;
      if (!key) return;
      state[key] = btn.dataset.value || '';
      $$('.tail-fit-buttons button', q).forEach((b) => b.classList.toggle('active', b === btn));

      const result = $('.tail-fit-result strong', root);
      if (!result || !state.trip || !state.direct) return;
      if (state.trip === 'yes' && state.direct === 'yes') result.textContent = '멤버십 비교';
      else if (state.trip === 'yes') result.textContent = '가격 비교부터';
      else result.textContent = '지금은 가입 필요 없음';
    });
  }

  function bindFinal() {
    const root = $('#tail-final');
    if (!root || root.dataset.bound === '1') return;
    root.dataset.bound = '1';
    root.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-tail-plan]');
      if (!btn) return;
      const type = btn.dataset.tailPlan;
      const cards = $$('#plans .plan-card');
      const target = type === 'premium' ? cards[1] : cards[0];
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.remove('tail-plan-flash');
      void target.offsetWidth;
      target.classList.add('tail-plan-flash');
      setTimeout(() => target.classList.remove('tail-plan-flash'), 1800);
    });
  }

  function build() {
    replaceFit();
    replaceTerms();
    removeRedundant();
    replacePriceMatch();
    replaceFinal();
    bindFit();
    bindFinal();
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    build();
    if ($('#tail-fit') && $('#tail-terms') && $('#tail-price-match') && $('#tail-final')) clearInterval(timer);
    if (tries > 35) clearInterval(timer);
  }, 160);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build, { once: true });
  else build();
})();
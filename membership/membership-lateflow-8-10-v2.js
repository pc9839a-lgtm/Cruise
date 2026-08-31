(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function setText(el, value) {
    if (el && el.textContent !== value) el.textContent = value;
  }

  function wrapBand() {
    if ($('#membership-late-band')) return $('#membership-late-band');
    const real = $('#real-cost');
    const calc = $('#calculator');
    const plans = $('#plans');
    const terms = $('#membership-terms');
    if (!real || !calc || !plans || !terms) return null;

    const band = document.createElement('div');
    band.id = 'membership-late-band';
    real.parentNode.insertBefore(band, real);
    band.append(real, calc, plans, terms);
    return band;
  }

  function applyRealCost() {
    const real = $('#real-cost');
    if (!real) return;
    setText($('.mv2-kicker', real), '크루즈 $2,000 기준');
    const title = $('.mv2-title', real);
    if (title && title.innerHTML !== '<strong>실제 나가는 돈</strong>') title.innerHTML = '<strong>실제 나가는 돈</strong>';

    const boxes = $$('.mv2-paybox', real);
    if (boxes[0]) {
      setText($('span', boxes[0]), '일반 결제');
      setText($('strong', boxes[0]), '$2,000');
    }
    if (boxes[1]) {
      setText($('span', boxes[1]), '클래식 적립 기준');
      setText($('strong', boxes[1]), '$1,500');
    }
    $('.mv2-symbol', real)?.remove();
    const save = $('.mv2-save', real);
    if (save && save.innerHTML !== '<strong>$500 차이</strong>') save.innerHTML = '<strong>$500 차이</strong>';
    $('.mv2-sub', real)?.remove();
  }

  function syncCalculatorCopy() {
    const calc = $('#calculator');
    if (!calc) return;
    setText($('#pointLabel', calc), '필요 포인트');
    setText($('#cashLabel', calc), '예약 시 카드 결제');
    setText($('.total-pay-box > span', calc), '총 실제 납입');
    setText($('#coverageSubtext', calc), '포인트 적립분 + 카드 결제');
  }

  function applyCalculator() {
    const calc = $('#calculator');
    if (!calc) return;

    const head = $('.section-head', calc);
    const headHtml = '<span class="section-kicker">내 금액으로 확인</span><h2><strong>내 크루즈 가격</strong></h2>';
    if (head && head.innerHTML !== headHtml) head.innerHTML = headHtml;

    $('.exchange-bar', calc)?.remove();
    setText($('.calculator-head strong', calc), '선택한 크루즈 금액');
    syncCalculatorCopy();

    const range = $('#cruisePrice', calc);
    if (range) range.addEventListener('input', () => setTimeout(syncCalculatorCopy, 0), { passive:true });
    $$('.mode-btn', calc).forEach(btn => btn.addEventListener('click', () => setTimeout(syncCalculatorCopy, 0)));

    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        syncCalculatorCopy();
      });
    });
    observer.observe(calc, { childList:true, subtree:true, characterData:true });
  }

  function applyPlanHeading() {
    const heading = $('#plans .membership-section-head');
    if (!heading || heading.querySelector('.late-plan-heading')) return;
    heading.innerHTML = '<span class="section-kicker late-plan-heading">멤버십</span><h2><strong>클래식</strong> / <strong>프리미엄</strong></h2>';
  }

  function applyPlanCards() {
    const wrap = $('#planCards');
    if (!wrap) return;
    $$('.plan-card', wrap).forEach((card, index) => {
      const startUsd = index === 0 ? '$200' : '$500';
      const name = index === 0 ? '클래식' : '프리미엄';
      if (!card.querySelector('.late-plan-start')) {
        const line = document.createElement('div');
        line.className = 'late-plan-start';
        line.innerHTML = `시작 <strong>${startUsd}</strong>`;
        card.querySelector('.plan-main-line')?.after(line);
      }
      setText(card.querySelector('[data-plan-signup-link]'), `${name} 선택`);
    });
  }

  function watchPlans() {
    applyPlanHeading();
    applyPlanCards();
    const wrap = $('#planCards');
    if (!wrap) return;
    const observer = new MutationObserver(() => applyPlanCards());
    observer.observe(wrap, { childList:true });
  }

  function applyTerms() {
    const terms = $('#membership-terms');
    if (!terms) return;
    setText($('.mv2-kicker', terms), '멤버십 조건');
    const title = $('.mv2-title', terms);
    if (title && title.innerHTML !== '<strong>5가지</strong>') title.innerHTML = '<strong>5가지</strong>';

    const copy = [
      '14일 이후 환불 어려움',
      '월 회비 현금 인출 불가',
      '본인 명의 카드 결제',
      '이용일까지 멤버십 유지',
      '해지 시 2배 적립분 소멸 · 원금 포인트 유지'
    ];
    $$('.mv2-term', terms).forEach((row, index) => {
      setText($('b', row), String(index + 1).padStart(2, '0'));
      setText($('span', row), copy[index] || '');
    });
  }

  function init() {
    if (!wrapBand()) return;
    applyRealCost();
    applyCalculator();
    watchPlans();
    applyTerms();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

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
    $('.mv2-kicker', real).textContent = '크루즈 $2,000 기준';
    $('.mv2-title', real).innerHTML = '<strong>실제 나가는 돈</strong>';
    const boxes = $$('.mv2-paybox', real);
    if (boxes[0]) {
      $('span', boxes[0]).textContent = '일반 결제';
      $('strong', boxes[0]).textContent = '$2,000';
    }
    if (boxes[1]) {
      $('span', boxes[1]).textContent = '클래식 적립 기준';
      $('strong', boxes[1]).textContent = '$1,500';
    }
    $('.mv2-symbol', real)?.remove();
    const save = $('.mv2-save', real);
    if (save) save.innerHTML = '<strong>$500 차이</strong>';
    $('.mv2-sub', real)?.remove();
  }

  function applyCalculator() {
    const calc = $('#calculator');
    if (!calc) return;

    const head = $('.section-head', calc);
    if (head) {
      head.innerHTML = '<span class="section-kicker">내 금액으로 확인</span><h2><strong>내 크루즈 가격</strong></h2>';
    }

    $('.exchange-bar', calc)?.remove();

    const calculatorHeadLabel = $('.calculator-head strong', calc);
    if (calculatorHeadLabel) calculatorHeadLabel.textContent = '선택한 크루즈 금액';

    const pointLabel = $('#pointLabel', calc);
    const cashLabel = $('#cashLabel', calc);
    const coverageLabel = $('.total-pay-box > span', calc);
    const coverageSubtext = $('#coverageSubtext', calc);

    if (pointLabel) pointLabel.textContent = '필요 포인트';
    if (cashLabel) cashLabel.textContent = '예약 시 카드 결제';
    if (coverageLabel) coverageLabel.textContent = '총 실제 납입';
    if (coverageSubtext) coverageSubtext.textContent = '포인트 적립분 + 카드 결제';
  }

  function syncCalculatorCopy() {
    const calc = $('#calculator');
    if (!calc) return;
    const pointLabel = $('#pointLabel', calc);
    const cashLabel = $('#cashLabel', calc);
    const coverageLabel = $('.total-pay-box > span', calc);
    const coverageSubtext = $('#coverageSubtext', calc);

    if (pointLabel) pointLabel.textContent = '필요 포인트';
    if (cashLabel) cashLabel.textContent = '예약 시 카드 결제';
    if (coverageLabel) coverageLabel.textContent = '총 실제 납입';
    if (coverageSubtext) coverageSubtext.textContent = '포인트 적립분 + 카드 결제';
  }

  function watchCalculatorCopy() {
    const calc = $('#calculator');
    if (!calc) return;
    syncCalculatorCopy();
    const observer = new MutationObserver(() => syncCalculatorCopy());
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
      const cta = card.querySelector('[data-plan-signup-link]');
      if (cta) cta.textContent = `${name} 선택`;
    });
  }

  function watchPlans() {
    const wrap = $('#planCards');
    const heading = $('#plans .membership-section-head');
    applyPlanHeading();
    applyPlanCards();

    if (wrap) {
      const observer = new MutationObserver(() => applyPlanCards());
      observer.observe(wrap, { childList: true });
    }
    if (heading) {
      const observer = new MutationObserver(() => applyPlanHeading());
      observer.observe(heading, { childList: true, subtree: true });
    }
  }

  function applyTerms() {
    const terms = $('#membership-terms');
    if (!terms) return;
    $('.mv2-kicker', terms).textContent = '멤버십 조건';
    $('.mv2-title', terms).innerHTML = '<strong>5가지</strong>';
    const copy = [
      '14일 이후 환불 어려움',
      '월 회비 현금 인출 불가',
      '본인 명의 카드 결제',
      '이용일까지 멤버십 유지',
      '해지 시 2배 적립분 소멸 · 원금 포인트 유지'
    ];
    $$('.mv2-term', terms).forEach((row, index) => {
      const num = $('b', row);
      const text = $('span', row);
      if (num) num.textContent = String(index + 1).padStart(2, '0');
      if (text) text.textContent = copy[index] || '';
    });
  }

  function initMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    const mobile = window.matchMedia('(max-width:780px)').matches;

    const entrance = (section, targets) => {
      const els = targets.filter(Boolean);
      els.forEach(el => el.classList.add('late-gsap-ready'));
      gsap.from(els, {
        scrollTrigger:{ trigger:section, start:'top 78%', once:true },
        y:mobile ? 18 : 28,
        opacity:0,
        scale:.985,
        duration:mobile ? .55 : .72,
        stagger:mobile ? .05 : .08,
        ease:'power3.out',
        clearProps:'transform,opacity'
      });
    };

    const real = $('#real-cost');
    const calc = $('#calculator');
    const plans = $('#plans');
    const terms = $('#membership-terms');

    entrance(real, [$('.mv2-kicker',real), $('.mv2-title',real), ...$$('.mv2-paybox',real), $('.mv2-save',real)]);
    entrance(calc, [$('.section-head',calc), $('.calculator-card',calc)]);
    entrance(plans, [$('.membership-section-head',plans), ...$$('.plan-card',plans)]);
    entrance(terms, [$('.mv2-kicker',terms), $('.mv2-title',terms), ...$$('.mv2-term',terms)]);

    const realBoxes = $$('.mv2-paybox', real);
    const realSave = $('.mv2-save', real);
    const realLoop = gsap.timeline({paused:true, repeat:-1, repeatDelay:1.4});
    if (realBoxes.length >= 2) {
      realLoop
        .to(realBoxes[0], {opacity:.5, duration:.42})
        .fromTo(realBoxes[1], {scale:.96, opacity:.7}, {scale:1.035, opacity:1, duration:.5, ease:'back.out(1.25)'})
        .to(realBoxes[1], {scale:1, duration:.3})
        .to(realSave, {scale:mobile ? 1.012 : 1.03, duration:.3, ease:'power2.out'})
        .to(realSave, {scale:1, duration:.42})
        .to({}, {duration:1.25});
    }

    const planValues = $$('#plans .plan-feature-monthly strong');
    const planLoop = gsap.timeline({paused:true, repeat:-1, repeatDelay:1.2});
    planValues.forEach((value) => {
      planLoop
        .to(value, {scale:mobile ? 1.015 : 1.04, y:mobile ? -2 : -4, duration:.34, ease:'power2.out'})
        .to(value, {scale:1, y:0, duration:.46, ease:'expo.out'})
        .to({}, {duration:.45});
    });

    const termRows = $$('.mv2-term', terms);
    const termLoop = gsap.timeline({paused:true, repeat:-1, repeatDelay:.9});
    termRows.forEach(row => {
      termLoop
        .to(row, {opacity:1, x:mobile ? 3 : 8, duration:.28, ease:'power2.out'})
        .to($('b',row), {color:'#85d2ff', duration:.22}, '<')
        .to($('span',row), {color:'#ffffff', duration:.22}, '<')
        .to({}, {duration:.3})
        .to(row, {opacity:.62, x:0, duration:.26})
        .to($('b',row), {color:'rgba(133,210,255,.38)', duration:.22}, '<')
        .to($('span',row), {color:'rgba(255,255,255,.64)', duration:.22}, '<');
    });

    const bind = (section, timeline) => {
      if (!section || !timeline) return;
      ScrollTrigger.create({
        trigger:section,
        start:'top 80%',
        end:'bottom 20%',
        onEnter:() => timeline.restart(),
        onEnterBack:() => timeline.restart(),
        onLeave:() => timeline.pause(),
        onLeaveBack:() => timeline.pause()
      });
    };

    bind(real, realLoop);
    bind(plans, planLoop);
    bind(terms, termLoop);

    const range = $('#cruisePrice');
    const amount = $('#rangeValue');
    if (range && amount) {
      range.addEventListener('input', () => {
        gsap.fromTo(amount, {scale:.96}, {scale:1.06, duration:.18, yoyo:true, repeat:1, ease:'power2.out'});
        window.setTimeout(syncCalculatorCopy, 0);
      });
    }

    $$('.mode-btn', calc).forEach(btn => {
      btn.addEventListener('click', () => window.setTimeout(syncCalculatorCopy, 0));
    });
  }

  function init() {
    if (!wrapBand()) return;
    applyRealCost();
    applyCalculator();
    watchCalculatorCopy();
    watchPlans();
    applyTerms();
    initMotion();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
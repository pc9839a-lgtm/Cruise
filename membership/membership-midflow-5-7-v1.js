(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function wrapBand() {
    if ($('#membership-mid-band')) return $('#membership-mid-band');

    const guide = $('#guide-question');
    const point = $('#membership-point');
    const ledger = $('#points-by-time');
    if (!guide || !point || !ledger) return null;

    const band = document.createElement('div');
    band.id = 'membership-mid-band';
    guide.parentNode.insertBefore(band, guide);
    band.append(guide, point, ledger);
    return band;
  }

  function applyGuideCopy(guide) {
    guide.innerHTML = `
      <div class="mv2-inner guide-empathy-inner">
        <span class="mv2-kicker">가이드 없이</span>
        <h2 class="mv2-title guide-empathy-title">
          <span>크루즈 처음이면</span>
          <strong>이게 제일 걱정됩니다</strong>
        </h2>

        <div class="guide-worries" aria-label="처음 크루즈 여행에서 자주 걱정하는 것">
          <div class="guide-worry"><b>01</b><span>항구는 어디로 가지?</span></div>
          <div class="guide-worry"><b>02</b><span>체크인은 어떻게 하지?</span></div>
          <div class="guide-worry"><b>03</b><span>배 안에서 헤매면?</span></div>
          <div class="guide-worry"><b>04</b><span>기항지에서 다시 어떻게 타지?</span></div>
          <div class="guide-worry"><b>05</b><span>마지막 날은 어떻게 내리지?</span></div>
        </div>

        <div class="guide-answer-head">
          <span>알고 보면</span>
          <strong>이 5개만 알면 됩니다</strong>
        </div>

        <div class="mv2-steps guide-solutions" aria-label="처음 크루즈 여행에서 알아둘 다섯 가지">
          <div class="mv2-step"><b>01</b><span><strong>항구 도착</strong><em>터미널만 찾기</em></span></div>
          <div class="mv2-step"><b>02</b><span><strong>승선</strong><em>여권 · 체크인</em></span></div>
          <div class="mv2-step"><b>03</b><span><strong>선내</strong><em>객실 · 식당 · 공연</em></span></div>
          <div class="mv2-step"><b>04</b><span><strong>기항지</strong><em>내리고 · 구경하고 · 복귀</em></span></div>
          <div class="mv2-step"><b>05</b><span><strong>귀항</strong><em>짐 챙기고 하선</em></span></div>
        </div>
      </div>`;
  }

  function applyCopy() {
    const guide = $('#guide-question');
    const point = $('#membership-point');
    const ledger = $('#points-by-time');
    if (!guide || !point || !ledger) return false;

    applyGuideCopy(guide);

    const pointKicker = $('.mv2-kicker', point);
    const pointTitle = $('.mv2-title', point);
    const pointSub = $('.mv2-sub', point);
    if (pointKicker) pointKicker.textContent = '멤버십';
    if (pointTitle) pointTitle.innerHTML = '<span>매달 $100</span><strong>200P 적립</strong>';
    if (pointSub) pointSub.innerHTML = '가입 <strong>$200 · 350P</strong>';

    const ledgerKicker = $('.mv2-kicker', ledger);
    const ledgerTitle = $('.mv2-title', ledger);
    if (ledgerKicker) ledgerKicker.textContent = '$100씩 쌓이면';
    if (ledgerTitle) ledgerTitle.innerHTML = '<span>12개월</span><strong>2,400P</strong>';

    const rows = $$('.mv2-row', ledger);
    const rowData = [
      ['1개월', '200P'],
      ['6개월', '1,200P'],
      ['12개월', '2,400P']
    ];
    rows.forEach((row, index) => {
      const data = rowData[index];
      if (!data) return;
      const label = $('span', row);
      const value = $('strong', row);
      if (label) label.textContent = data[0];
      if (value) value.textContent = data[1];
    });

    return true;
  }

  function initMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const guide = $('#guide-question');
    const point = $('#membership-point');
    const ledger = $('#points-by-time');
    if (!guide || !point || !ledger) return;

    const mobile = window.matchMedia('(max-width: 780px)').matches;

    const entrance = (section, targets) => {
      const els = targets.filter(Boolean);
      els.forEach((el) => el.classList.add('mid-gsap-ready'));
      gsap.from(els, {
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        y: mobile ? 16 : 28,
        opacity: 0,
        scale: .99,
        duration: mobile ? .5 : .68,
        stagger: mobile ? .04 : .065,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    };

    const guideWorries = $$('.guide-worry', guide);
    const guideSteps = $$('.mv2-step', guide);
    const answerHead = $('.guide-answer-head', guide);
    entrance(guide, [$('.mv2-kicker', guide), $('.mv2-title', guide), ...guideWorries, answerHead, ...guideSteps]);
    entrance(point, [$('.mv2-kicker', point), $('.mv2-title', point), $('.mv2-sub', point)]);
    entrance(ledger, [$('.mv2-kicker', ledger), $('.mv2-title', ledger), ...$$('.mv2-row', ledger)]);

    const guideLoop = gsap.timeline({ paused:true, repeat:-1, repeatDelay:1.15 });
    guideWorries.forEach((item) => {
      const text = $('span', item);
      const num = $('b', item);
      guideLoop
        .to(item, { opacity:1, x:mobile ? 3 : 8, duration:.28, ease:'power2.out' })
        .to(text, { color:'#ffffff', duration:.24 }, '<')
        .to(num, { color:'#85d2ff', duration:.24 }, '<')
        .to({}, { duration:.2 })
        .to(item, { opacity:.58, x:0, duration:.24, ease:'power2.inOut' });
    });
    guideLoop
      .to(answerHead, { opacity:1, y:mobile ? -2 : -5, scale:mobile ? 1.005 : 1.018, duration:.4, ease:'power2.out' })
      .to(answerHead, { y:0, scale:1, duration:.45, ease:'expo.out' });
    guideSteps.forEach((step) => {
      const num = $('b', step);
      const title = $('span strong', step);
      const desc = $('span em', step);
      guideLoop
        .to(step, { opacity:1, y:mobile ? -2 : -4, duration:.3, ease:'power2.out' })
        .to(num, { color:'#85d2ff', duration:.24 }, '<')
        .to(title, { color:'#ffffff', duration:.24 }, '<')
        .to(desc, { color:'rgba(255,255,255,.78)', duration:.24 }, '<')
        .to({}, { duration:.24 })
        .to(step, { opacity:.58, y:0, duration:.24, ease:'power2.inOut' });
    });

    const pointStrong = $('.mv2-title strong', point);
    const pointSub = $('.mv2-sub', point);
    const pointLoop = gsap.timeline({ paused:true, repeat:-1, repeatDelay:1.25 })
      .to(pointStrong, { scale:mobile ? 1.015 : 1.035, y:mobile ? -2 : -5, duration:.4, ease:'power2.out' })
      .to(pointStrong, { scale:1, y:0, duration:.55, ease:'expo.out' })
      .to(pointSub, { opacity:1, scale:1.02, duration:.3, ease:'power2.out' })
      .to(pointSub, { scale:1, duration:.4, ease:'power2.inOut' })
      .to({}, { duration:1.1 });

    const ledgerRows = $$('.mv2-row', ledger);
    const ledgerTotal = $('.mv2-title strong', ledger);
    const ledgerLoop = gsap.timeline({ paused:true, repeat:-1, repeatDelay:.9 });
    ledgerRows.forEach((row, index) => {
      const value = $('strong', row);
      ledgerLoop
        .to(row, { opacity:1, y:mobile ? -2 : -4, duration:.3, ease:'power2.out' })
        .to(value, { color:'#85d2ff', scale:mobile ? 1.01 : 1.025, duration:.3, ease:'power2.out' }, '<')
        .to({}, { duration:.34 })
        .to(row, { y:0, duration:.25, ease:'power2.inOut' })
        .to(value, { color:index === ledgerRows.length - 1 ? '#85d2ff' : '#ffffff', scale:1, duration:.28 }, '<');
    });
    ledgerLoop
      .to(ledgerTotal, { scale:mobile ? 1.015 : 1.03, duration:.36, ease:'power2.out' })
      .to(ledgerTotal, { scale:1, duration:.48, ease:'expo.out' });

    const bind = (section, timeline) => {
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

    bind(guide, guideLoop);
    bind(point, pointLoop);
    bind(ledger, ledgerLoop);
  }

  function init() {
    if (!wrapBand()) return;
    if (!applyCopy()) return;
    initMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();

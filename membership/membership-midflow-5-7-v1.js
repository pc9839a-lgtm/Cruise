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

  function applyCopy() {
    const guide = $('#guide-question');
    const point = $('#membership-point');
    const ledger = $('#points-by-time');
    if (!guide || !point || !ledger) return false;

    const guideKicker = $('.mv2-kicker', guide);
    const guideTitle = $('.mv2-title', guide);
    if (guideKicker) guideKicker.textContent = '가이드 없이';
    if (guideTitle) guideTitle.innerHTML = '<span>처음 타는 크루즈</span><strong>5장면이면 끝</strong>';

    const guideLabels = ['항구 도착', '승선', '선내', '기항지', '귀항'];
    $$('.mv2-step', guide).forEach((step, index) => {
      step.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b><span>${guideLabels[index] || ''}</span>`;
    });
    $('.mv2-sub', guide)?.remove();

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
    $('.mv2-note', ledger)?.remove();

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
        y: mobile ? 20 : 30,
        opacity: 0,
        scale: .985,
        duration: mobile ? .56 : .72,
        stagger: mobile ? .055 : .08,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    };

    const guideSteps = $$('.mv2-step', guide);
    entrance(guide, [$('.mv2-kicker', guide), $('.mv2-title', guide), ...guideSteps]);
    entrance(point, [$('.mv2-kicker', point), $('.mv2-title', point), $('.mv2-sub', point)]);
    entrance(ledger, [$('.mv2-kicker', ledger), $('.mv2-title', ledger), ...$$('.mv2-row', ledger)]);

    const guideLoop = gsap.timeline({ paused:true, repeat:-1, repeatDelay:.75 });
    guideSteps.forEach((step) => {
      const num = $('b', step);
      const label = $('span', step);
      guideLoop
        .to(step, { opacity:1, y:mobile ? -2 : -5, scale:mobile ? 1.01 : 1.025, duration:.32, ease:'power2.out' })
        .to(num, { color:'#85d2ff', duration:.25 }, '<')
        .to(label, { color:'#ffffff', duration:.25 }, '<')
        .to({}, { duration:.34 })
        .to(step, { opacity:.48, y:0, scale:1, duration:.28, ease:'power2.inOut' })
        .to(num, { color:'rgba(133,210,255,.32)', duration:.25 }, '<')
        .to(label, { color:'rgba(255,255,255,.64)', duration:.25 }, '<');
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

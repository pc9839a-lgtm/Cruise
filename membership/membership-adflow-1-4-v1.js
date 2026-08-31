(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function applyCopy() {
    const pain = $('#price-pain');
    const compare = $('#price-compare');
    const same = $('#same-cruise');
    if (!pain || !compare || !same) return;

    const painKicker = $('.mv2-kicker', pain);
    const painTitle = $('.mv2-title', pain);
    const painMega = $('.mv2-mega', pain);
    const painSave = $('.mv2-save', pain);
    if (painKicker) painKicker.textContent = '4박 5일 아시아 크루즈';
    if (painTitle) painTitle.innerHTML = '<strong>둘이 가면</strong>';
    if (painMega) painMega.textContent = '400만원';
    if (painSave) painSave.innerHTML = '<strong>1인 200만원 × 2명</strong>';

    const compareKicker = $('.mv2-kicker', compare);
    const compareTitle = $('.mv2-title', compare);
    const compareSave = $('.mv2-save', compare);
    const compareMega = $('.mv2-mega', compare);
    const priceCards = $$('.mv2-price', compare);
    const arrow = $('.mv2-arrow', compare);

    if (compareKicker) compareKicker.textContent = '1인 80만원 차이';
    if (compareTitle) compareTitle.innerHTML = '<strong>둘이면</strong>';
    if (compareSave) compareSave.style.display = 'none';
    if (compareMega) compareMega.textContent = '160만원 차이';

    if (priceCards[0]) {
      const label = $('span', priceCards[0]);
      const value = $('strong', priceCards[0]);
      if (label) label.textContent = '2명 여행사 · 가이드 포함';
      if (value) value.textContent = '400만원';
    }
    if (priceCards[1]) {
      const label = $('span', priceCards[1]);
      const value = $('strong', priceCards[1]);
      if (label) label.textContent = '2명 해외직구 직접 예약';
      if (value) value.textContent = '240만원';
    }
    if (arrow) arrow.textContent = '→';

    const sameKicker = $('.mv2-kicker', same);
    const sameTitle = $('.mv2-title', same);
    if (sameKicker) sameKicker.textContent = '160만원 아끼고';
    if (sameTitle) sameTitle.innerHTML = '<strong>크루즈는 그대로</strong>';
  }

  function addStrike() {
    const oldStrong = $('#price-bridge .pb-price.old strong');
    if (!oldStrong || $('.af-strike', oldStrong)) return;
    const strike = document.createElement('i');
    strike.className = 'af-strike';
    strike.setAttribute('aria-hidden', 'true');
    oldStrong.appendChild(strike);
  }

  function initMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const pain = $('#price-pain');
    const bridge = $('#price-bridge');
    const compare = $('#price-compare');
    const same = $('#same-cruise');
    if (!pain || !bridge || !compare || !same) return;

    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const enterY = mobile ? 26 : 38;

    const makeEntrance = (section, targets, options = {}) => {
      const els = targets.filter(Boolean);
      if (!els.length) return;
      els.forEach((el) => el.classList.add('af-gsap-ready'));
      gsap.from(els, {
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        y: options.y ?? enterY,
        x: options.x ?? 0,
        scale: options.scale ?? .98,
        opacity: 0,
        duration: mobile ? .62 : .78,
        stagger: mobile ? .07 : .1,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    };

    makeEntrance(pain, [$('.mv2-kicker', pain), $('.mv2-title', pain), $('.mv2-mega', pain), $('.mv2-save', pain)], { scale: .96 });
    makeEntrance(bridge, [$('.pb-lead', bridge), $('.pb-direct', bridge), $('.pb-pair', bridge), $('.pb-diff', bridge)], { scale: .97 });
    makeEntrance(compare, [$('.mv2-kicker', compare), $('.mv2-title', compare), ...$$('.mv2-price', compare), $('.mv2-arrow', compare), $('.mv2-mega', compare)], { scale: .97 });
    makeEntrance(same, [$('.mv2-kicker', same), $('.mv2-title', same), ...$$('.mv2-four div', same)], { scale: .97 });

    const painMega = $('.mv2-mega', pain);
    const painLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.4 })
      .to(painMega, { scale: mobile ? 1.025 : 1.045, y: mobile ? -3 : -5, duration: .45, ease: 'power2.out' })
      .to(painMega, { scale: 1, y: 0, duration: .68, ease: 'expo.out' })
      .to({}, { duration: 1.25 });

    const direct = $('.pb-direct', bridge);
    const oldPrice = $('.pb-price.old', bridge);
    const oldStrong = $('.pb-price.old strong', bridge);
    const strike = $('.af-strike', bridge);
    const bridgeArrow = $('.pb-arrow', bridge);
    const newPrice = $('.pb-price.new', bridge);
    const diff = $('.pb-diff', bridge);
    const bridgeLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.15 });
    bridgeLoop
      .set([direct, oldPrice, bridgeArrow, newPrice, diff], { clearProps: 'transform,opacity' })
      .set(strike, { scaleX: 0 })
      .to(direct, { scale: mobile ? 1.012 : 1.025, duration: .34, ease: 'power2.out' })
      .to(direct, { scale: 1, duration: .45, ease: 'expo.out' })
      .fromTo(oldPrice, { opacity: .35, x: mobile ? -14 : -26 }, { opacity: 1, x: 0, duration: .6, ease: 'expo.out' }, '-=.1')
      .to(strike, { scaleX: 1, duration: .48, ease: 'power3.inOut' }, '+=.14')
      .to(oldStrong, { opacity: .5, x: mobile ? -4 : -8, duration: .38, ease: 'power2.out' }, '<')
      .fromTo(bridgeArrow, { opacity: 0, x: mobile ? -8 : -20 }, { opacity: 1, x: mobile ? 6 : 15, duration: .5, ease: 'expo.out' }, '-=.12')
      .fromTo(newPrice, { opacity: 0, x: mobile ? 12 : 28, scale: .86 }, { opacity: 1, x: 0, scale: mobile ? 1.035 : 1.06, duration: .56, ease: 'back.out(1.45)' }, '-=.22')
      .to(newPrice, { scale: 1, duration: .34, ease: 'power2.out' })
      .fromTo(diff, { opacity: 0, y: mobile ? 20 : 32, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .56, ease: 'expo.out' }, '-=.14')
      .to(diff, { scale: mobile ? 1.02 : 1.035, duration: .28, ease: 'power2.out' })
      .to(diff, { scale: 1, duration: .4, ease: 'power2.inOut' })
      .to({}, { duration: 1.35 });

    const compareCards = $$('.mv2-price', compare);
    const compareArrow = $('.mv2-arrow', compare);
    const compareMega = $('.mv2-mega', compare);
    const compareLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.45 });
    if (compareCards.length >= 2) {
      compareLoop
        .set([compareCards[0], compareCards[1], compareArrow, compareMega], { clearProps: 'transform,opacity,backgroundColor' })
        .to(compareCards[0], { x: mobile ? -6 : -12, opacity: .58, duration: .48, ease: 'power2.out' })
        .fromTo(compareArrow, { x: mobile ? -6 : -14, opacity: .35 }, { x: mobile ? 7 : 16, opacity: 1, duration: .52, ease: 'expo.out' }, '-=.24')
        .fromTo(compareCards[1], { x: mobile ? 10 : 26, scale: .94 }, { x: 0, scale: mobile ? 1.02 : 1.045, duration: .54, ease: 'back.out(1.3)' }, '-=.27')
        .to(compareCards[1], { scale: 1, duration: .32, ease: 'power2.out' })
        .fromTo(compareMega, { y: mobile ? 18 : 30, scale: .88, opacity: .25 }, { y: 0, scale: 1, opacity: 1, duration: .6, ease: 'expo.out' }, '-=.12')
        .to(compareMega, { scale: mobile ? 1.02 : 1.035, duration: .28, ease: 'power2.out' })
        .to(compareMega, { scale: 1, duration: .4, ease: 'power2.inOut' })
        .to({}, { duration: 1.5 });
    }

    const sameTitle = $('.mv2-title', same);
    const sameItems = $$('.mv2-four div', same);
    const sameLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
    sameLoop
      .to(sameTitle, { y: mobile ? -2 : -4, scale: mobile ? 1.01 : 1.02, duration: .42, ease: 'power2.out' })
      .to(sameTitle, { y: 0, scale: 1, duration: .52, ease: 'expo.out' });
    sameItems.forEach((item, index) => {
      sameLoop
        .fromTo(item,
          { y: mobile ? 5 : 10, opacity: .58, backgroundColor: 'rgba(133,210,255,0)' },
          { y: mobile ? -2 : -5, opacity: 1, backgroundColor: 'rgba(133,210,255,.10)', duration: .4, ease: 'power3.out' },
          index === 0 ? '-=.12' : '-=.18')
        .to(item, { y: 0, backgroundColor: 'rgba(133,210,255,0)', duration: .48, ease: 'power2.inOut' });
    });
    sameLoop.to({}, { duration: 1.3 });

    const bindLoop = (section, timeline) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => timeline.restart(),
        onEnterBack: () => timeline.restart(),
        onLeave: () => timeline.pause(),
        onLeaveBack: () => timeline.pause()
      });
    };

    bindLoop(pain, painLoop);
    bindLoop(bridge, bridgeLoop);
    bindLoop(compare, compareLoop);
    bindLoop(same, sameLoop);
  }

  function init() {
    applyCopy();
    addStrike();
    initMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
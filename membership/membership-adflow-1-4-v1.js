(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function applyCopy() {
    const pain = $('#price-pain');
    const bridge = $('#price-bridge');
    const compare = $('#price-compare');
    const same = $('#same-cruise');
    if (!pain || !bridge || !compare || !same) return false;

    const painKicker = $('.mv2-kicker', pain);
    const painTitle = $('.mv2-title', pain);
    const painMega = $('.mv2-mega', pain);
    const painSave = $('.mv2-save', pain);
    if (painKicker) painKicker.textContent = '4박 5일 아시아 크루즈';
    if (painTitle) painTitle.innerHTML = '<strong>둘이 가면</strong>';
    if (painMega) painMega.textContent = '400만원';
    if (painSave) painSave.innerHTML = '<strong>1인 200만원 × 2명</strong>';

    const sameKicker = $('.mv2-kicker', same);
    const sameTitle = $('.mv2-title', same);
    if (sameKicker) sameKicker.textContent = '160만원 아끼고';
    if (sameTitle) sameTitle.innerHTML = '<strong>크루즈는 그대로</strong>';

    compare.style.display = 'none';
    compare.setAttribute('aria-hidden', 'true');
    $$('a[href="#price-compare"]').forEach((link) => link.setAttribute('href', '#price-bridge'));

    return true;
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
    const same = $('#same-cruise');
    if (!pain || !bridge || !same) return;

    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const enterY = mobile ? 24 : 36;

    const makeEntrance = (section, targets, options = {}) => {
      const els = targets.filter(Boolean);
      if (!els.length) return;
      els.forEach((el) => el.classList.add('af-gsap-ready'));
      gsap.from(els, {
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        y: options.y ?? enterY,
        scale: options.scale ?? .98,
        opacity: 0,
        duration: mobile ? .58 : .76,
        stagger: mobile ? .06 : .09,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    };

    makeEntrance(pain, [$('.mv2-kicker', pain), $('.mv2-title', pain), $('.mv2-mega', pain), $('.mv2-save', pain)], { scale: .96 });
    makeEntrance(bridge, [$('.pb-lead', bridge), $('.pb-direct', bridge), $('.pb-pair', bridge), $('.pb-diff', bridge)], { scale: .97 });
    makeEntrance(same, [$('.mv2-kicker', same), $('.mv2-title', same), ...$$('.mv2-four div', same)], { scale: .97 });

    const painMega = $('.mv2-mega', pain);
    const painLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 })
      .to(painMega, { scale: mobile ? 1.022 : 1.04, y: mobile ? -2 : -5, duration: .44, ease: 'power2.out' })
      .to(painMega, { scale: 1, y: 0, duration: .66, ease: 'expo.out' })
      .to({}, { duration: 1.3 });

    const direct = $('.pb-direct', bridge);
    const oldPrice = $('.pb-price.old', bridge);
    const oldStrong = $('.pb-price.old strong', bridge);
    const strike = $('.af-strike', bridge);
    const bridgeArrow = $('.pb-arrow', bridge);
    const newPrice = $('.pb-price.new', bridge);
    const diff = $('.pb-diff', bridge);

    const bridgeLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.25 })
      .set([direct, oldPrice, bridgeArrow, newPrice, diff], { clearProps: 'transform,opacity' })
      .set(strike, { scaleX: 0 })
      .to(direct, { scale: mobile ? 1.01 : 1.02, duration: .32, ease: 'power2.out' })
      .to(direct, { scale: 1, duration: .42, ease: 'expo.out' })
      .fromTo(oldPrice, { opacity: .38 }, { opacity: 1, duration: .5, ease: 'power2.out' }, '-=.08')
      .to(strike, { scaleX: 1, duration: .48, ease: 'power3.inOut' }, '+=.12')
      .to(oldStrong, { opacity: .42, duration: .35, ease: 'power2.out' }, '<')
      .fromTo(bridgeArrow, { opacity: 0, x: mobile ? -5 : -14 }, { opacity: 1, x: mobile ? 4 : 10, duration: .46, ease: 'expo.out' }, '-=.1')
      .fromTo(newPrice, { opacity: 0, scale: .9 }, { opacity: 1, scale: mobile ? 1.025 : 1.05, duration: .52, ease: 'back.out(1.35)' }, '-=.2')
      .to(newPrice, { scale: 1, duration: .32, ease: 'power2.out' })
      .fromTo(diff, { opacity: 0, y: mobile ? 16 : 26, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: .54, ease: 'expo.out' }, '-=.12')
      .to(diff, { scale: mobile ? 1.012 : 1.025, duration: .26, ease: 'power2.out' })
      .to(diff, { scale: 1, duration: .38, ease: 'power2.inOut' })
      .to({}, { duration: 1.4 });

    const sameTitle = $('.mv2-title', same);
    const sameItems = $$('.mv2-four div', same);
    const sameLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.6 })
      .to(sameTitle, { y: mobile ? -2 : -4, scale: mobile ? 1.008 : 1.018, duration: .42, ease: 'power2.out' })
      .to(sameTitle, { y: 0, scale: 1, duration: .52, ease: 'expo.out' });

    sameItems.forEach((item, index) => {
      sameLoop
        .fromTo(item,
          { y: mobile ? 4 : 8, opacity: .6, backgroundColor: 'rgba(133,210,255,0)' },
          { y: mobile ? -2 : -4, opacity: 1, backgroundColor: 'rgba(133,210,255,.10)', duration: .38, ease: 'power3.out' },
          index === 0 ? '-=.12' : '-=.16')
        .to(item, { y: 0, backgroundColor: 'rgba(133,210,255,0)', duration: .46, ease: 'power2.inOut' });
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
    bindLoop(same, sameLoop);
  }

  function init() {
    if (!applyCopy()) return;
    addStrike();
    initMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
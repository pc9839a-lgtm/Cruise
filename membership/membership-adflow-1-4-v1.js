(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function wrapPriceBand() {
    if ($('#price-story-band')) return $('#price-story-band');

    const pain = $('#price-pain');
    const bridge = $('#price-bridge');
    const compare = $('#price-compare');
    const same = $('#same-cruise');
    if (!pain || !bridge || !compare || !same) return null;

    const band = document.createElement('div');
    band.id = 'price-story-band';
    pain.parentNode.insertBefore(band, pain);
    band.append(pain, bridge, compare, same);
    return band;
  }

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
    if (painSave) painSave.innerHTML = '<strong>2명 기준</strong>';

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
    const enterY = mobile ? 22 : 34;

    const makeEntrance = (section, targets, options = {}) => {
      const els = targets.filter(Boolean);
      if (!els.length) return;
      els.forEach((el) => el.classList.add('af-gsap-ready'));
      gsap.from(els, {
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        y: options.y ?? enterY,
        scale: options.scale ?? .985,
        opacity: 0,
        duration: mobile ? .56 : .72,
        stagger: mobile ? .055 : .085,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    };

    makeEntrance(pain, [$('.mv2-kicker', pain), $('.mv2-title', pain), $('.mv2-mega', pain), $('.mv2-save', pain)], { scale: .97 });
    makeEntrance(bridge, [$('.pb-lead', bridge), $('.pb-direct', bridge), $('.pb-pair', bridge), $('.pb-diff', bridge)], { scale: .975 });
    makeEntrance(same, [$('.mv2-kicker', same), $('.mv2-title', same), ...$$('.mv2-four div', same)], { scale: .98 });

    const painMega = $('.mv2-mega', pain);
    const painLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.6 })
      .to(painMega, { scale: mobile ? 1.018 : 1.034, y: mobile ? -2 : -4, duration: .42, ease: 'power2.out' })
      .to(painMega, { scale: 1, y: 0, duration: .64, ease: 'expo.out' })
      .to({}, { duration: 1.35 });

    const direct = $('.pb-direct', bridge);
    const oldPrice = $('.pb-price.old', bridge);
    const oldStrong = $('.pb-price.old strong', bridge);
    const strike = $('.af-strike', bridge);
    const newPrice = $('.pb-price.new', bridge);
    const diff = $('.pb-diff', bridge);

    const bridgeLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.35 })
      .set([direct, oldPrice, newPrice, diff], { clearProps: 'transform,opacity' })
      .set(strike, { scaleX: 0 })
      .to(direct, { scale: mobile ? 1.008 : 1.016, duration: .3, ease: 'power2.out' })
      .to(direct, { scale: 1, duration: .4, ease: 'expo.out' })
      .fromTo(oldPrice, { opacity: .34 }, { opacity: 1, duration: .48, ease: 'power2.out' }, '-=.06')
      .to(strike, { scaleX: 1, duration: .46, ease: 'power3.inOut' }, '+=.12')
      .to(oldStrong, { opacity: .4, duration: .34, ease: 'power2.out' }, '<')
      .fromTo(newPrice, { opacity: 0, scale: .92 }, { opacity: 1, scale: mobile ? 1.02 : 1.045, duration: .5, ease: 'back.out(1.3)' }, '-=.12')
      .to(newPrice, { scale: 1, duration: .3, ease: 'power2.out' })
      .fromTo(diff, { opacity: 0, y: mobile ? 14 : 22, scale: .95 }, { opacity: 1, y: 0, scale: 1, duration: .52, ease: 'expo.out' }, '-=.1')
      .to(diff, { scale: mobile ? 1.01 : 1.022, duration: .25, ease: 'power2.out' })
      .to(diff, { scale: 1, duration: .36, ease: 'power2.inOut' })
      .to({}, { duration: 1.5 });

    const sameTitle = $('.mv2-title', same);
    const sameItems = $$('.mv2-four div', same);
    const sameLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.7 })
      .to(sameTitle, { y: mobile ? -2 : -3, scale: mobile ? 1.006 : 1.014, duration: .4, ease: 'power2.out' })
      .to(sameTitle, { y: 0, scale: 1, duration: .5, ease: 'expo.out' });

    sameItems.forEach((item, index) => {
      sameLoop
        .fromTo(item,
          { y: mobile ? 3 : 7, opacity: .62, backgroundColor: 'rgba(133,210,255,0)' },
          { y: mobile ? -1 : -3, opacity: 1, backgroundColor: 'rgba(133,210,255,.08)', duration: .36, ease: 'power3.out' },
          index === 0 ? '-=.1' : '-=.15')
        .to(item, { y: 0, backgroundColor: 'rgba(133,210,255,0)', duration: .44, ease: 'power2.inOut' });
    });
    sameLoop.to({}, { duration: 1.35 });

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
    if (!wrapPriceBand()) return;
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
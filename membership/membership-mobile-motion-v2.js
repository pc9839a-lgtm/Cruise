(() => {
  'use strict';

  if (!window.matchMedia('(max-width: 780px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const loops = new WeakMap();
  const active = new WeakSet();

  function play(el, keyframes, options = {}) {
    if (!el?.animate) return null;
    try {
      return el.animate(keyframes, {
        duration: options.duration || 520,
        delay: options.delay || 0,
        easing: options.easing || 'cubic-bezier(.2,.8,.2,1)',
        fill: options.fill || 'none',
        iterations: options.iterations || 1,
        direction: options.direction || 'normal'
      });
    } catch (_) {
      return null;
    }
  }

  function entrance(section) {
    const inner = section.querySelector('.mv2-inner,.pb-inner,.mx-inner,.m3-inner,.container');
    play(inner || section, [
      { transform: 'translateY(18px) scale(.992)' },
      { transform: 'translateY(0) scale(1)' }
    ], { duration: 560 });

    const groups = [
      '.pb-price','.mv2-four > div','.mx-card','.mv2-step','.mx-hotel-point',
      '.mv2-row','.mx-flow-step','.mx-dual-card','.mx-speed-card','.plan-card',
      '.m3-four > div','.m3-steps > div','.m3-cases article','.mx-fit-box','.mx-recap-card'
    ];

    let items = [];
    groups.forEach((s) => { items = items.concat($$(s, section)); });
    items.slice(0, 10).forEach((el, i) => {
      play(el, [
        { transform: 'translateY(14px) scale(.975)' },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 430, delay: i * 58 });
    });
  }

  function addLoop(section, el, keyframes, options = {}) {
    if (!el?.animate) return;
    const anim = play(el, keyframes, {
      duration: options.duration || 2200,
      delay: options.delay || 0,
      easing: options.easing || 'ease-in-out',
      iterations: Infinity,
      direction: options.direction || 'normal'
    });
    if (!anim) return;
    const list = loops.get(section) || [];
    list.push(anim);
    loops.set(section, list);
  }

  function startLoops(section) {
    stopLoops(section);

    if (section.id === 'price-pain') {
      addLoop(section, section.querySelector('.mv2-mega'), [
        { transform: 'scale(1)' },
        { transform: 'scale(1.035)' },
        { transform: 'scale(1)' }
      ], { duration: 2100 });
    }

    if (section.id === 'price-bridge') {
      addLoop(section, section.querySelector('.pb-price.new'), [
        { transform: 'translateY(0)', boxShadow: '0 12px 28px rgba(40,104,215,.12)' },
        { transform: 'translateY(-5px)', boxShadow: '0 18px 36px rgba(40,104,215,.24)' },
        { transform: 'translateY(0)', boxShadow: '0 12px 28px rgba(40,104,215,.12)' }
      ], { duration: 2500 });
      addLoop(section, section.querySelector('.pb-diff strong'), [
        { transform: 'scale(1)' },
        { transform: 'scale(1.04)' },
        { transform: 'scale(1)' }
      ], { duration: 1800, delay: 220 });
    }

    if (section.id === 'same-cruise') {
      $$('.mv2-four > div', section).forEach((el, i) => {
        addLoop(section, el, [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-3px)' },
          { transform: 'translateY(0)' }
        ], { duration: 2600, delay: i * 180 });
      });
    }

    if (section.id === 'membership-point' || section.id === 'points-by-time') {
      const el = section.querySelector('.mv2-title strong') || section.querySelector('.mv2-title');
      addLoop(section, el, [
        { transform: 'scale(1)' },
        { transform: 'scale(1.035)' },
        { transform: 'scale(1)' }
      ], { duration: 2200 });
    }

    if (section.id === 'm3-selector') {
      addLoop(section, section.querySelector('.m3-result'), [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-4px)' },
        { transform: 'translateY(0)' }
      ], { duration: 2600 });
    }

    if (section.id === 'plans') {
      const recommended = section.querySelector('.plan-card.recommended');
      addLoop(section, recommended, [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-4px)' },
        { transform: 'translateY(0)' }
      ], { duration: 2800 });
    }
  }

  function stopLoops(section) {
    const list = loops.get(section) || [];
    list.forEach((anim) => {
      try { anim.cancel(); } catch (_) {}
    });
    loops.delete(section);
  }

  const selectors = [
    '#price-pain','#price-bridge','#same-cruise','#mx-cost-structure',
    '#m3-savings-use','#guide-question','#mx-moving-hotel','#m3-booking',
    '#membership-point','#points-by-time','#mx-prepare-money','#mx-point-use',
    '#real-cost','#calculator','#mx-use-rules','#mx-plan-guide','#plans',
    '#m3-cases','#m3-selector','#mx-fit-check','#membership-terms',
    '#mx-faq-section','#mx-recap','#price-match','#mx-final-choice'
  ];

  function init() {
    const sections = selectors.map((s) => document.querySelector(s)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= .18) {
          if (!active.has(section)) {
            active.add(section);
            entrance(section);
            startLoops(section);
          }
        } else if (active.has(section)) {
          active.delete(section);
          stopLoops(section);
        }
      });
    }, { threshold: [0, .18, .42], rootMargin: '-4% 0px -8% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  const boot = () => setTimeout(init, 900);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();

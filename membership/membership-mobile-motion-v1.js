(() => {
  'use strict';

  if (!window.matchMedia('(max-width: 780px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const seen = new WeakSet();

  function animate(el, keyframes, options = {}) {
    if (!el || seen.has(el)) return;
    seen.add(el);
    try {
      el.animate(keyframes, {
        duration: options.duration || 520,
        delay: options.delay || 0,
        easing: options.easing || 'cubic-bezier(.2,.8,.2,1)',
        fill: 'both'
      });
    } catch (_) {}
  }

  function revealSection(section) {
    const inner = section.querySelector('.mv2-inner,.pb-inner,.mx-inner,.m3-inner,.container');
    animate(inner || section, [
      { opacity: .18, transform: 'translateY(22px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 560 });
  }

  function stagger(selector, root, fromY = 14) {
    $$(selector, root).forEach((el, i) => {
      animate(el, [
        { opacity: .12, transform: `translateY(${fromY}px) scale(.985)` },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 460, delay: i * 75 });
    });
  }

  function pulse(selector, root, delay = 0) {
    const el = root.querySelector(selector);
    if (!el) return;
    animate(el, [
      { transform: 'scale(.92)', opacity: .35 },
      { transform: 'scale(1.045)', opacity: 1, offset: .72 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 620, delay, easing: 'cubic-bezier(.18,.9,.3,1.2)' });
  }

  function runSpecial(section) {
    if (section.id === 'price-pain') {
      pulse('.mv2-mega', section, 100);
      return;
    }
    if (section.id === 'price-bridge') {
      stagger('.pb-price', section, 18);
      pulse('.pb-price.new strong', section, 190);
      pulse('.pb-diff strong', section, 340);
      return;
    }
    if (section.id === 'same-cruise') {
      stagger('.mv2-four > div', section, 12);
      return;
    }
    if (section.id === 'guide-question') {
      stagger('.mv2-step', section, 12);
      return;
    }
    if (section.id === 'points-by-time') {
      stagger('.mv2-row', section, 10);
      pulse('.mv2-title strong', section, 120);
      return;
    }
    if (section.id === 'membership-point') {
      pulse('.mv2-title strong', section, 120);
      return;
    }
    if (section.id === 'mx-cost-structure') {
      stagger('.mx-card', section, 12);
      return;
    }
    if (section.id === 'mx-moving-hotel') {
      stagger('.mx-hotel-point', section, 10);
      return;
    }
    if (section.id === 'mx-point-use') {
      stagger('.mx-flow-step', section, 10);
      return;
    }
    if (section.id === 'mx-use-rules') {
      stagger('.mx-dual-card', section, 12);
      return;
    }
    if (section.id === 'plans') {
      stagger('.plan-card', section, 14);
      return;
    }
    if (section.id === 'm3-savings-use') {
      stagger('.m3-four > div', section, 12);
      return;
    }
    if (section.id === 'm3-booking') {
      stagger('.m3-steps > div', section, 10);
      return;
    }
    if (section.id === 'm3-cases') {
      stagger('.m3-cases article', section, 12);
    }
  }

  const targets = [
    '#price-pain','#price-bridge','#same-cruise','#mx-cost-structure',
    '#guide-question','#mx-moving-hotel','#membership-point','#points-by-time',
    '#mx-prepare-money','#mx-point-use','#real-cost','#calculator','#mx-use-rules',
    '#mx-plan-guide','#plans','#m3-savings-use','#m3-booking','#m3-cases','#m3-selector',
    '#mx-fit-check','#membership-terms','#mx-faq-section','#mx-recap','#price-match','#mx-final-choice'
  ];

  function init() {
    const sections = targets.map((s) => document.querySelector(s)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealSection(entry.target);
        runSpecial(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 700), { once: true });
  } else {
    setTimeout(init, 700);
  }
})();
(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sections = [
    ['#mx-moving-hotel','m-anim-photo-zoom'],
    ['#mx-port-day','m-anim-slide-left'],
    ['#mx-moving-hotel-4','m-anim-slide-right'],
    ['#impact-med','m-anim-clip'],
    ['#price-pain','m-anim-pop'],
    ['#mx-direct-booking-intro','m-anim-rise'],
    ['#price-compare','m-anim-scale'],
    ['#mx-direct-booking-saving','m-anim-sweep'],
    ['#same-cruise','m-anim-rise'],
    ['#mx-cost-structure','m-anim-slide-left'],
    ['#m3-savings-use','m-anim-slide-right'],
    ['#guide-question','m-anim-sweep'],
    ['#mx-prepare-money','m-anim-turn'],
    ['#membership-point','m-anim-pop'],
    ['#points-by-time','m-anim-rise'],
    ['#real-cost','m-anim-scale'],
    ['#mx-use-rules','m-anim-clip'],
    ['#calculator','m-anim-fade'],
    ['#mx-fit-check','m-anim-turn'],
    ['#mx-plan-guide','m-anim-pop'],
    ['#m3-selector','m-anim-sweep'],
    ['#membership-terms','m-anim-rise'],
    ['#mx-final-choice','m-anim-scale'],
    ['#plans','m-anim-slide-right']
  ];

  const labelSelector = [
    '.mx-eyebrow','.mxp-question','.mx4-eyebrow','.impact-label','.mv2-kicker','.m3-kicker',
    '.mx11-kicker','.mx12-kicker','.mx13-kicker','.mx14-kicker','.mx15-kicker','.mx16-kicker',
    '.mx17-kicker','.mx18-kicker','.mx19-kicker','.mx21-kicker','.mx22-kicker','#plans .section-kicker',
    '.mx7-overline'
  ].join(',');

  const cardSelector = [
    '.mx-hotel-point','.mxp-step','.mx4-city','.mx4-points article','.impact-med-stop',
    '.mv2-price','.mv2-four>div','.mx-card','.m3-four>div','.mx11-flow article',
    '.mx12-card','.mx13-plan','.mx14-ledger article','.mx15-equation article',
    '.mx17-control','.mx17-results article','.mx18-card','.mx19-card',
    '.m3-select-block','.m3-result','.mx21-terms article','.mx21-faq details',
    '.mx22-plans article','.plan-card'
  ].join(',');

  const visualSelector = [
    '.mx-hotel-visual','.mxp-flow','.mx4-route','.impact-med-cycle','.impact-med-route',
    '.mx7-receipt-proof','.mx7-saving-track','.mv2-compare','.mv2-four',
    '.mx-card-grid','.m3-four','.mx11-flow','.mx13-plans','.mx14-groups',
    '.mx15-equation','.mx16-equation','.mx17-results','.mx18-grid','.mx19-grid',
    '.m3-buttons','.mx21-terms','.mx22-plans','#planCards'
  ].join(',');

  const numberSelector = [
    '#price-pain .mv2-mega',
    '#mx-direct-booking-intro .mx7-receipt-total strong',
    '#price-compare .mv2-price strong','#price-compare .mv2-mega',
    '#mx-direct-booking-saving strong',
    '#membership-point .mx13-plan-row strong',
    '#points-by-time .mx14-ledger strong',
    '#real-cost .mx15-equation strong',
    '#mx-use-rules .mx16-equation strong','#mx-use-rules .mx16-early b',
    '#calculator .mx17-control-head strong','#calculator .mx17-results strong',
    '#mx-plan-guide .mx19-main strong','#mx-plan-guide .mx19-row strong',
    '#mx-final-choice .mx22-plans strong',
    '#plans .plan-price','#plans .plan-feature strong'
  ].join(',');

  const accentSelector = [
    '#price-pain .mv2-mega','#mx-direct-booking-intro .mx7-receipt-total strong',
    '#price-compare .mv2-price.good strong','#mx-direct-booking-saving strong',
    '#points-by-time .mx14-ledger .total strong',
    '#real-cost .mx15-equation .point strong',
    '#calculator .mx17-results .point strong',
    '#mx-plan-guide .premium .mx19-main strong',
    '#mx-final-choice .premium strong','#plans .recommended .plan-price'
  ].join(',');

  function parseNumericText(text) {
    const source = String(text || '').trim();
    const match = source.match(/-?\d[\d,]*(?:\.\d+)?/);
    if (!match) return null;
    const raw = match[0];
    const target = Number(raw.replace(/,/g, ''));
    if (!Number.isFinite(target)) return null;
    const decimalPart = raw.includes('.') ? raw.split('.')[1] : '';
    return {
      source,
      target,
      decimals: decimalPart.length,
      prefix: source.slice(0, match.index),
      suffix: source.slice((match.index || 0) + raw.length)
    };
  }

  function formatNumber(value, decimals) {
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function prepareCounter(el) {
    if (el.dataset.mMotionPrepared === '1') return;
    const parsed = parseNumericText(el.textContent);
    if (!parsed) return;
    el.dataset.mMotionPrepared = '1';
    el.dataset.mMotionSource = parsed.source;
    el.dataset.mMotionTarget = String(parsed.target);
    el.dataset.mMotionDecimals = String(parsed.decimals);
    el.dataset.mMotionPrefix = parsed.prefix;
    el.dataset.mMotionSuffix = parsed.suffix;
    if (!reduce) el.textContent = `${parsed.prefix}${formatNumber(0, parsed.decimals)}${parsed.suffix}`;
  }

  function animateCounter(el) {
    if (el.dataset.mMotionCounted === '1') return;
    const target = Number(el.dataset.mMotionTarget);
    if (!Number.isFinite(target)) return;

    el.dataset.mMotionCounted = '1';
    const decimals = Number(el.dataset.mMotionDecimals || 0);
    const prefix = el.dataset.mMotionPrefix || '';
    const suffix = el.dataset.mMotionSuffix || '';

    if (reduce) {
      el.textContent = el.dataset.mMotionSource || `${prefix}${formatNumber(target, decimals)}${suffix}`;
      return;
    }

    const duration = target >= 500 ? 1700 : 1350;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = target * eased;
      el.textContent = `${prefix}${formatNumber(value, decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = el.dataset.mMotionSource || `${prefix}${formatNumber(target, decimals)}${suffix}`;
    };
    requestAnimationFrame(tick);
  }

  function addAtmosphere(section, index) {
    if (!section || section.querySelector(':scope > .m-motion-orbit')) return;
    const orbit = document.createElement('span');
    orbit.className = 'm-motion-orbit';
    orbit.setAttribute('aria-hidden', 'true');
    orbit.style.setProperty('--orbit-delay', `${(index % 5) * -1.4}s`);
    section.prepend(orbit);

    const rail = document.createElement('span');
    rail.className = 'm-motion-rail';
    rail.setAttribute('aria-hidden', 'true');
    section.append(rail);
  }

  function prepareSection(section, variant, index) {
    if (!section || section.dataset.mPartnerMotion === '1') return;
    section.dataset.mPartnerMotion = '1';
    section.classList.add('m-motion-section', variant);
    section.style.setProperty('--m-motion-index', String(index));
    addAtmosphere(section, index);

    const labels = [...section.querySelectorAll(labelSelector)];
    labels.forEach((el) => el.classList.add('m-motion-label'));

    const heading = section.querySelector('h2');
    if (heading) {
      heading.classList.add('m-motion-item');
      heading.style.setProperty('transition-delay', '70ms', 'important');
    }

    const supporting = [...section.querySelectorAll(':scope > div > p, :scope > div > .mx-sub, :scope > div > .mx14-note, :scope > div > .mx17-note, :scope > div > .mv2-save')];
    supporting.forEach((el, i) => {
      el.classList.add('m-motion-item');
      el.style.setProperty('transition-delay', `${130 + i * 70}ms`, 'important');
    });

    const cards = [...section.querySelectorAll(cardSelector)];
    cards.forEach((card, i) => {
      card.classList.add('m-motion-card');
      card.style.setProperty('--m-motion-delay', `${Math.min(i, 7) * 95 + 150}ms`);
    });

    const visuals = [...section.querySelectorAll(visualSelector)];
    visuals.forEach((el, i) => {
      el.classList.add('m-motion-visual');
      el.style.setProperty('--m-visual-delay', `${180 + i * 100}ms`);
    });

    const media = [...section.querySelectorAll('.mx-hotel-visual img, .impact-med-route')];
    media.forEach((el) => el.classList.add('m-motion-media'));

    const numbers = [...section.querySelectorAll(numberSelector)];
    numbers.forEach((el) => {
      el.classList.add('m-motion-number');
      prepareCounter(el);
    });

    [...section.querySelectorAll(accentSelector)].forEach((el) => el.classList.add('m-motion-accent'));
  }

  function activate(section) {
    if (!section || section.classList.contains('section-active')) return;
    section.classList.add('section-active');
    section.querySelectorAll('.m-motion-number').forEach(animateCounter);
  }

  function prepareAll() {
    const prepared = [];
    sections.forEach(([selector, variant], index) => {
      const section = document.querySelector(selector);
      if (!section) return;
      prepareSection(section, variant, index);
      prepared.push(section);
    });
    return prepared;
  }

  function initObserver(list) {
    if (reduce || !('IntersectionObserver' in window)) {
      list.forEach(activate);
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activate(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    list.forEach((section) => observer.observe(section));
  }

  function boot() {
    root.classList.add('membership-motion-enabled');
    const list = prepareAll();
    initObserver(list);

    [420, 900, 1600].forEach((delay) => {
      setTimeout(() => {
        const late = prepareAll().filter((section) => !section.classList.contains('section-active'));
        if (late.length) initObserver(late);
      }, delay);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();

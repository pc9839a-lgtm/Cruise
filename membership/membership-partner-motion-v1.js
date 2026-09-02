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
    ['#price-compare','m-anim-scale'],
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
    '.mx17-kicker','.mx18-kicker','.mx19-kicker','.mx21-kicker','.mx22-kicker','#plans .section-kicker'
  ].join(',');

  const cardSelector = [
    '.mx-hotel-point','.mxp-step','.mx4-city','.mx4-points article','.impact-med-stop',
    '.mv2-price','.mv2-four>div','.mx-card','.m3-four>div','.mx11-flow article',
    '.mx12-card','.mx13-plan','.mx14-ledger article','.mx15-equation article',
    '.mx17-control','.mx17-results article','.mx18-card','.mx19-card',
    '.m3-select-block','.m3-result','.mx21-terms article','.mx21-faq details',
    '.mx22-plans article','.plan-card'
  ].join(',');

  const numberSelector = [
    '#price-pain .mv2-mega',
    '#price-compare .mv2-price strong','#price-compare .mv2-mega',
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
    '#price-pain .mv2-mega','#price-compare .mv2-mega',
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

    const duration = target >= 1000 ? 1650 : 1350;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = from + (target - from) * eased;
      el.textContent = `${prefix}${formatNumber(value, decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = el.dataset.mMotionSource || `${prefix}${formatNumber(target, decimals)}${suffix}`;
    };
    requestAnimationFrame(tick);
  }

  function prepareSection(section, variant, index) {
    if (!section || section.dataset.mPartnerMotion === '1') return;
    section.dataset.mPartnerMotion = '1';
    section.classList.add('m-motion-section', variant);
    section.style.setProperty('--m-motion-index', String(index));

    const labels = [...section.querySelectorAll(labelSelector)];
    labels.forEach((el) => el.classList.add('m-motion-label'));

    const heading = section.querySelector('h2');
    if (heading) {
      heading.classList.add('m-motion-item');
      heading.style.setProperty('transition-delay', '70ms', 'important');
    }

    const supporting = [...section.querySelectorAll(':scope > div > p, :scope > div > .mx-sub, :scope > div > .mx14-note, :scope > div > .mx17-note')];
    supporting.forEach((el, i) => {
      el.classList.add('m-motion-item');
      el.style.setProperty('transition-delay', `${120 + i * 60}ms`, 'important');
    });

    const cards = [...section.querySelectorAll(cardSelector)];
    cards.forEach((card, i) => {
      card.classList.add('m-motion-card');
      card.style.setProperty('--m-motion-delay', `${Math.min(i, 7) * 85 + 130}ms`);
    });

    const media = [...section.querySelectorAll('.mx-hotel-visual, .mx-hotel-visual img, .impact-med-route')];
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
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    list.forEach((section) => observer.observe(section));
  }

  function boot() {
    root.classList.add('membership-motion-enabled');
    const list = prepareAll();
    initObserver(list);

    // Late-built sections are re-scanned without re-binding already prepared nodes.
    setTimeout(() => {
      const late = prepareAll().filter((section) => !section.classList.contains('section-active'));
      if (late.length) initObserver(late);
    }, 420);
    setTimeout(() => {
      const late = prepareAll().filter((section) => !section.classList.contains('section-active'));
      if (late.length) initObserver(late);
    }, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();

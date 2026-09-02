(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionSelectors = [
    '#mx-moving-hotel','#mx-port-day','#mx-moving-hotel-4','#impact-med','#price-pain',
    '#mx-direct-booking-intro','#price-compare','#same-cruise','#mx-cost-structure',
    '#m3-savings-use','#guide-question','#mx-prepare-money','#membership-point',
    '#points-by-time','#real-cost','#mx-use-rules','#mx-fit-check','#mx-plan-guide',
    '#m3-selector','#membership-terms','#mx-final-choice','#plans'
  ];

  const labelSelector = [
    '.mx-eyebrow','.mxp-question','.mx4-eyebrow','.impact-label','.mv2-kicker','.m3-kicker',
    '.mx11-kicker','.mx12-kicker','.mx13-kicker','.mx14-kicker','.mx15-kicker','.mx16-kicker',
    '.mx18-kicker','.mx19-kicker','.mx21-kicker','.mx22-kicker','#plans .section-kicker','.mx7-overline'
  ].join(',');

  const cardSelector = [
    '.mxp-step','.mx4-city','.mx4-points article','.impact-med-stop','.mv2-price','.mv2-four>div',
    '.mx-card','.m3-four>div','.mx13-plan','.mx14-ledger article','.mx15-equation article',
    '.mx18-card','.mx19-card','.m3-select-block','.mx21-terms article','.mx22-plans article','.plan-card'
  ].join(',');

  const visualSelector = [
    '.mx-hotel-visual','.mxp-flow','.mx4-route','.impact-med-cycle','.impact-med-route',
    '.mx7-receipt-proof','.mv2-compare','.mv2-four','.mx-card-grid','.m3-four',
    '.mx13-plans','.mx14-groups','.mx15-equation','.mx16-equation','.mx18-grid',
    '.mx19-grid','.m3-buttons','.mx21-terms','.mx22-plans','#planCards'
  ].join(',');

  const numberSelector = [
    '#price-pain .mv2-mega','#price-compare .mv2-price strong',
    '#membership-point .mx13-plan-row strong','#points-by-time .mx14-ledger strong',
    '#real-cost .mx15-equation strong','#mx-use-rules .mx16-equation strong',
    '#mx-plan-guide .mx19-main strong','#mx-plan-guide .mx19-row strong',
    '#mx-final-choice .mx22-plans strong','#plans .plan-price','#plans .plan-feature strong'
  ].join(',');

  function parseNumericText(text) {
    const source = String(text || '').trim();
    const match = source.match(/-?\d[\d,]*(?:\.\d+)?/);
    if (!match) return null;
    const raw = match[0];
    const target = Number(raw.replace(/,/g, ''));
    if (!Number.isFinite(target)) return null;
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    return {
      source,
      target,
      decimals,
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
    const original = el.dataset.mMotionSource || `${prefix}${formatNumber(target, decimals)}${suffix}`;

    if (reduce) {
      el.textContent = original;
      return;
    }

    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${formatNumber(target * eased, decimals)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = original;
    };
    requestAnimationFrame(tick);
  }

  function prepareSection(section) {
    if (!section || section.dataset.mPartnerMotion === '1') return;
    section.dataset.mPartnerMotion = '1';
    section.classList.add('m-motion-section');

    section.querySelectorAll('.m-motion-orbit,.m-motion-rail').forEach((el) => el.remove());

    section.querySelectorAll(labelSelector).forEach((el) => el.classList.add('m-motion-label'));

    const heading = section.querySelector('h2');
    if (heading) heading.classList.add('m-motion-item');

    section.querySelectorAll(cardSelector).forEach((card, index) => {
      card.classList.add('m-motion-card');
      card.style.setProperty('--m-motion-delay', `${Math.min(index, 5) * 70 + 80}ms`);
    });

    section.querySelectorAll(visualSelector).forEach((visual, index) => {
      visual.classList.add('m-motion-visual');
      visual.style.setProperty('--m-visual-delay', `${100 + index * 70}ms`);
    });

    section.querySelectorAll('.mx-hotel-visual img,.impact-med-route').forEach((media) => media.classList.add('m-motion-media'));

    section.querySelectorAll(numberSelector).forEach((number) => {
      number.classList.add('m-motion-number');
      prepareCounter(number);
    });
  }

  function activate(section) {
    if (!section || section.classList.contains('section-active')) return;
    section.classList.add('section-active');
    section.querySelectorAll('.m-motion-number').forEach(animateCounter);
  }

  function boot() {
    root.classList.add('membership-motion-enabled');
    const sections = sectionSelectors.map((selector) => document.querySelector(selector)).filter(Boolean);
    sections.forEach(prepareSection);

    if (reduce || !('IntersectionObserver' in window)) {
      sections.forEach(activate);
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activate(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold:0.1, rootMargin:'0px 0px -4% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();

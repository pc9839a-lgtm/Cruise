(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionSelectors = [
    '#mx-moving-hotel','#mx-port-day','#mx-moving-hotel-4','#impact-med','#price-pain',
    '#mx-direct-booking-intro','#same-cruise','#guide-question','#mx-prepare-money',
    '#membership-point','#calculator','#membership-terms','#plans'
  ];

  const labelSelector = [
    '.mx-eyebrow','.mxp-question','.mx4-eyebrow','.impact-label','.mx11-kicker','.mx12-kicker',
    '.mx13-kicker','.mx17-kicker','.mx21-kicker','#plans .section-kicker','.mx7-overline','.mx8-overline'
  ].join(',');

  const visualSelector = [
    '.mx-hotel-visual','.mxp-flow','.mx4-route','.impact-med-cycle','.impact-med-route',
    '.mx7-receipt-proof','.mx8-proof-copy','.mx13-simple-list','.mx17-tool','.mx21-terms','#planCards'
  ].join(',');

  const rowSelector = [
    '.mxp-step','.mx4-city','.mx4-night','.impact-med-stop','.mx7-receipt-breakdown>div',
    '.mx13-simple-row','.mx17-control','.mx17-result-row','.mx21-terms article','.plan-card'
  ].join(',');

  const numberSelector = [
    '#price-pain .mv2-mega',
    '#mx-direct-booking-intro .mx7-receipt-breakdown strong',
    '#membership-point .mx13-simple-row strong',
    '#calculator .mx17-result-row strong',
    '#plans .plan-price','#plans .plan-feature-monthly strong'
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
    const duration = 850;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${formatNumber(target * eased, decimals)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = original;
    };
    requestAnimationFrame(tick);
  }

  function prepareSection(section, index) {
    if (!section || section.dataset.mPartnerMotion === '1') return;
    section.dataset.mPartnerMotion = '1';
    section.classList.add('m-motion-section');
    section.dataset.motionSide = index % 2 === 0 ? 'left' : 'right';

    section.querySelectorAll(labelSelector).forEach((el) => el.classList.add('m-motion-label'));

    const heading = section.querySelector('h2');
    if (heading) heading.classList.add('m-motion-heading');

    section.querySelectorAll(visualSelector).forEach((visual, visualIndex) => {
      visual.classList.add('m-motion-visual');
      visual.style.setProperty('--m-visual-delay', `${100 + visualIndex * 70}ms`);
    });

    section.querySelectorAll(rowSelector).forEach((row, rowIndex) => {
      row.classList.add('m-motion-row');
      row.style.setProperty('--m-row-delay', `${100 + Math.min(rowIndex, 8) * 65}ms`);
    });

    section.querySelectorAll('.mx-hotel-visual img').forEach((media) => media.classList.add('m-motion-media'));

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
    }, { threshold:0.12, rootMargin:'0px 0px -6% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();

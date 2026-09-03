(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionSelectors = [
    '#mx-moving-hotel','#mx-port-day','#mx-moving-hotel-4','#impact-med','#price-pain',
    '#mx-direct-booking-intro','#same-cruise','#guide-question','#mx-prepare-money',
    '#mx-cruise-price-examples','#mx-lowest-price','#membership-point','#mx-point-example','#mx-actual-cash',
    '#mx-actual-cash-total','#mx-booking-proof','#mx-guide-assist','#calculator','#mx-membership-optional',
    '#mx-member-booking-benefits','#mx-start-early','#plans','#membership-terms'
  ];

  const labelSelector = [
    '.mx-eyebrow','.mxp-question','.mx4-eyebrow','.impact-label','.mx11-kicker','.mx12-kicker',
    '.mx10p-kicker','.mxg-kicker','.mx13-kicker','.mxp13-kicker','.mx14-kicker','.mx15-kicker','.mx16-kicker',
    '.mx18-kicker','.mx19-kicker','#calculator .section-kicker','.mx21-kicker','#plans .section-kicker',
    '.mx7-overline','.mx8-overline'
  ].join(',');

  const headingSelector = [
    'h2','.mx6-title','.section-head h2','.membership-section-head h2'
  ].join(',');

  const visualSelector = [
    '.mx-hotel-visual','.mxp-flow','.mx4-route','.impact-med-cycle','.impact-med-route',
    '.mx7-receipt-proof','.mx7-bridge','.mx8-proof-copy','.mx8-question-lead','.mx8-bridge-question',
    '.mx10-flow','.mx10-detail','.mx10p-lead','.mx10p-price-grid','.mx10p-note',
    '.mxg-mega','.mx13-simple-list','.mxp13-ledger','.mx14-equation','.mx14-fee-note',
    '.mx14-total-lead','.mx14-total-value','.mx14-total-note',
    '.mx15-answer','.mx15-proof-list','.mx15-closing','.mx16-answer','.mx16-support','.mx16-flow',
    '#calculator .calculator-card','.mx18-answer','.mx18-but','.mx18-benefit-stack','.mx18-closing',
    '.mx18-benefit-lead','.mx18-benefit-title','.mx18-benefit-closing',
    '.mx19-answer','.mx19-timeline','.mx19-closing','.mx19-note','.mx21-terms','#planCards',
    '#price-pain .mx6-context','#price-pain .mv2-save',
    '#same-cruise .mx8-payment-stack',
    '#guide-question .mx9-prefix','#guide-question .mx9-clia-proof','#guide-question .mx9-copy',
    '#mx-lowest-price .mxg-criteria','#mx-lowest-price .mxg-copy','#mx-lowest-price .mxg-note'
  ].join(',');

  const rowSelector = [
    '.mxp-step','.mx4-city','.mx4-night','.impact-med-stop','.mx7-receipt-breakdown>div',
    '.mx10-flow span','.mx10-flow strong','.mx10-detail-item','.mx10p-price-item','.mx13-simple-row','.mxp13-ledger>div',
    '.mx14-equation>div','.mx15-proof-list>div','.mx16-flow strong','#calculator .result-box',
    '.mx18-benefit-stack strong','.mx19-timeline>div','.mx21-terms details','.plan-card','.mx8-payment-line'
  ].join(',');

  const numberSelector = [
    '#price-pain .mv2-mega',
    '#mx-direct-booking-intro .mx7-receipt-breakdown strong',
    '#same-cruise .mx8-value',
    '#guide-question .mx9-member-count',
    '#mx-cruise-price-examples .mx10p-price-value',
    '#mx-lowest-price .mxg-mega',
    '#membership-point .mx13-simple-row strong',
    '#mx-point-example .mxp13-ledger strong',
    '#mx-actual-cash .mx14-equation strong',
    '#mx-actual-cash-total .mx14-total-value',
    '#calculator .result-box strong',
    '#mx-start-early .mx19-timeline strong',
    '#plans .plan-price','#plans .plan-feature-monthly strong'
  ].join(',');

  let observer = null;
  let mutationQueued = false;
  const observedSections = new WeakSet();

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
    if (!section) return;

    section.dataset.mPartnerMotion = '1';
    section.classList.add('m-motion-section');
    section.dataset.motionSide = index % 2 === 0 ? 'left' : 'right';

    section.querySelectorAll(labelSelector).forEach((el) => el.classList.add('m-motion-label'));

    const heading = section.querySelector(headingSelector);
    if (heading) heading.classList.add('m-motion-heading');

    section.querySelectorAll(visualSelector).forEach((visual, visualIndex) => {
      visual.classList.add('m-motion-visual');
      visual.style.setProperty('--m-visual-delay', `${140 + visualIndex * 115}ms`);
    });

    section.querySelectorAll(rowSelector).forEach((row, rowIndex) => {
      row.classList.add('m-motion-row');
      row.style.setProperty('--m-row-delay', `${150 + Math.min(rowIndex, 8) * 70}ms`);
    });

    section.querySelectorAll('.mx-hotel-visual img').forEach((media) => media.classList.add('m-motion-media'));

    section.querySelectorAll(numberSelector).forEach((number) => {
      number.classList.add('m-motion-number');
      prepareCounter(number);
      if (section.classList.contains('section-active')) animateCounter(number);
    });
  }

  function activate(section) {
    if (!section) return;
    if (!section.classList.contains('section-active')) section.classList.add('section-active');
    section.querySelectorAll('.m-motion-number').forEach(animateCounter);
  }

  function observeSection(section) {
    if (!section || observedSections.has(section)) return;
    observedSections.add(section);

    if (reduce || !observer) {
      activate(section);
      return;
    }

    observer.observe(section);
  }

  function scanSections() {
    sectionSelectors.forEach((selector, index) => {
      const section = document.querySelector(selector);
      if (!section) return;
      prepareSection(section, index);
      observeSection(section);
    });
  }

  function queueScan() {
    if (mutationQueued) return;
    mutationQueued = true;
    requestAnimationFrame(() => {
      mutationQueued = false;
      scanSections();
    });
  }

  function boot() {
    root.classList.add('membership-motion-enabled');

    if (!reduce && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          activate(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -18% 0px' });
    }

    scanSections();

    const mutationObserver = new MutationObserver((mutations) => {
      if (!mutations.some((mutation) => mutation.type === 'childList' && (mutation.addedNodes.length || mutation.removedNodes.length))) return;
      queueScan();
    });

    if (document.body) mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.setTimeout(scanSections, 350);
    window.setTimeout(scanSections, 900);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();

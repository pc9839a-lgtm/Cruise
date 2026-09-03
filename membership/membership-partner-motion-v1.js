(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const variants = ['rise','slide-left','clip','pop','fade','slide-right'];

  const sectionSelectors = [
    '#mx-moving-hotel','#mx-port-day','#mx-moving-hotel-4','#impact-med','#price-pain',
    '#mx-direct-booking-intro','#same-cruise','#guide-question','#mx-prepare-money',
    '#mx-cruise-price-examples','#mx-lowest-price','#membership-point','#mx-point-example','#mx-actual-cash',
    '#mx-actual-cash-total','#mx-booking-proof','#mx-guide-assist','#calculator','#mx-membership-optional',
    '#mx-member-booking-benefits','#mx-start-early','#mx-start-early-proof','#plans','#membership-terms'
  ];

  const labelSelector = [
    '.mx-eyebrow','.mxp-question','.mx4-eyebrow','.impact-label','.mx11-kicker','.mx12-kicker',
    '.mx10p-kicker','.mxg-kicker','.mx13-kicker','.mxp13-kicker','.mx14-kicker','.mx15-kicker','.mx16-kicker',
    '.mx18-kicker','.mx19-kicker','#calculator .section-kicker','.mx21-kicker','#plans .section-kicker',
    '.mx7-overline','.mx8-overline'
  ].join(',');

  const headingSelector = 'h2,.mx6-title,.section-head h2,.membership-section-head h2';
  const visualSelector = [
    '.mx-hotel-visual','.mxp-flow','.mx4-route','.impact-med-cycle','.impact-med-route',
    '.mx7-receipt-proof','.mx7-bridge','.mx8-proof-copy','.mx8-question-lead','.mx8-bridge-question',
    '.mx10-flow','.mx10-detail','.mx10p-lead','.mx10p-price-grid','.mx10p-note','.mxg-mega',
    '.mx13-simple-list','.mxp13-ledger','.mx14-equation','.mx14-fee-note','.mx14-total-lead','.mx14-total-value','.mx14-total-note',
    '.mx15-answer','.mx15-proof-list','.mx15-closing','.mx16-answer','.mx16-support','.mx16-flow',
    '#calculator .calculator-card','.mx18-answer','.mx18-benefit-lead','.mx18-benefit-title','.mx18-benefit-stack','.mx18-benefit-closing',
    '.mx19-answer','.mx19-proof-lead','.mx19-timeline','.mx19-closing','.mx19-note','.mx21-terms','#planCards',
    '#price-pain .mx6-context','#price-pain .mv2-save','#same-cruise .mx8-payment-stack',
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
    '#price-pain .mv2-mega','#mx-direct-booking-intro .mx7-receipt-breakdown strong','#same-cruise .mx8-value',
    '#guide-question .mx9-member-count','#mx-cruise-price-examples .mx10p-price-value','#mx-lowest-price .mxg-mega',
    '#membership-point .mx13-simple-row strong','#mx-point-example .mxp13-ledger strong','#mx-actual-cash .mx14-equation strong',
    '#mx-actual-cash-total .mx14-total-value','#calculator .result-box strong','#mx-start-early-proof .mx19-timeline strong',
    '#plans .plan-price','#plans .plan-feature-monthly strong'
  ].join(',');

  let observer = null;
  let queued = false;
  const observed = new WeakSet();

  function prepareSection(section,index) {
    if (!section) return;
    section.classList.add('m-motion-section');
    section.dataset.mPartnerMotion = '1';
    section.dataset.motionSide = index % 2 === 0 ? 'left' : 'right';

    let variant = variants[index % variants.length];
    if (section.classList.contains('mx-core-bridge') || ['price-pain','mx-guide-assist','mx-membership-optional','mx-start-early'].includes(section.id)) variant = index % 2 ? 'pop' : 'clip';
    if (section.id === 'calculator' || section.id === 'plans') variant = 'rise';
    section.dataset.motionVariant = variant;

    section.querySelectorAll(labelSelector).forEach((el) => el.classList.add('m-motion-label'));
    const heading = section.querySelector(headingSelector);
    if (heading) heading.classList.add('m-motion-heading');

    section.querySelectorAll(visualSelector).forEach((el,i) => {
      el.classList.add('m-motion-visual');
      el.style.setProperty('--m-visual-delay', `${130 + i*130}ms`);
    });

    section.querySelectorAll(rowSelector).forEach((el,i) => {
      el.classList.add('m-motion-row');
      el.style.setProperty('--m-row-delay', `${180 + Math.min(i,10)*95}ms`);
    });

    section.querySelectorAll('.mx-hotel-visual img,.actual-photo img,.partner-direct-photo').forEach((el) => el.classList.add('m-motion-media'));

    /* Numbers are never rewritten. Animation is transform/opacity only so exact prices/POINT stay intact. */
    section.querySelectorAll(numberSelector).forEach((el) => {
      el.classList.add('m-motion-number');
      if (el.dataset.mMotionSource) {
        const source = el.dataset.mMotionSource;
        if (source && /\d/.test(source) && /^\s*(?:약\s*)?[\$₩]?\d/.test(source)) el.textContent = source;
      }
      delete el.dataset.mMotionPrepared;
      delete el.dataset.mMotionCounted;
      delete el.dataset.mMotionTarget;
      delete el.dataset.mMotionDecimals;
      delete el.dataset.mMotionPrefix;
      delete el.dataset.mMotionSuffix;
      delete el.dataset.mMotionSource;
    });
  }

  function activate(section) {
    if (!section) return;
    section.classList.add('section-active');
  }

  function observeSection(section) {
    if (!section || observed.has(section)) return;
    observed.add(section);
    if (reduce || !observer) { activate(section); return; }
    observer.observe(section);
  }

  function scan() {
    sectionSelectors.forEach((selector,index) => {
      const section = document.querySelector(selector);
      if (!section) return;
      prepareSection(section,index);
      observeSection(section);
    });
  }

  function queueScan() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; scan(); });
  }

  function boot() {
    root.classList.add('membership-motion-enabled');
    if (!reduce && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries,obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          activate(entry.target);
          obs.unobserve(entry.target);
        });
      },{ threshold:.16, rootMargin:'0px 0px -8% 0px' });
    }
    scan();
    if (typeof MutationObserver !== 'undefined') {
      const mutationObserver = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length))) queueScan();
      });
      mutationObserver.observe(document.body,{ childList:true,subtree:true });
    }
    [260,650,1200,2000].forEach((ms) => window.setTimeout(scan,ms));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{ once:true });
  else boot();
})();

(() => {
  'use strict';

  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const numberSelectors = [
    '#price-pain .mv2-mega',
    '#mx-direct-booking-intro .mx7-total-proof strong',
    '#same-cruise .mx8-payment-line .mx8-value',
    '#guide-question .mx9-member-count',
    '#membership-point .mx13-simple-row strong',
    '#membership-point .mx13-start-note b',
    '#mx-point-example .mxp13-ledger strong',
    '#mx-actual-cash .mx14-equation strong',
    '#mx-actual-cash-total .mx14-total-value'
  ];

  function formatValue(value, decimals, grouped) {
    if (decimals > 0) {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped
      });
    }
    return Math.round(value).toLocaleString('en-US', { useGrouping: grouped });
  }

  function prepareCounter(el) {
    if (!el || el.dataset.mxCounterPrepared === '1') return;
    const original = (el.textContent || '').trim();
    const matches = [...original.matchAll(/\d[\d,]*(?:\.\d+)?/g)];
    if (!matches.length) return;

    const fragment = document.createDocumentFragment();
    let cursor = 0;

    matches.forEach((match) => {
      const raw = match[0];
      const start = match.index || 0;
      if (start > cursor) fragment.appendChild(document.createTextNode(original.slice(cursor, start)));

      const target = Number(raw.replace(/,/g, ''));
      const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
      const grouped = raw.includes(',');
      const token = document.createElement('span');
      token.className = 'mx-live-counter-token';
      token.dataset.target = String(target);
      token.dataset.decimals = String(decimals);
      token.dataset.grouped = grouped ? '1' : '0';
      token.setAttribute('aria-hidden', 'true');
      token.textContent = reducedMotion ? raw : formatValue(0, decimals, grouped);
      fragment.appendChild(token);
      cursor = start + raw.length;
    });

    if (cursor < original.length) fragment.appendChild(document.createTextNode(original.slice(cursor)));
    el.textContent = '';
    el.appendChild(fragment);
    el.dataset.mxCounterPrepared = '1';
    el.setAttribute('aria-label', original);
  }

  function animateCounter(el) {
    if (!el || el.dataset.mxCounterDone === '1') return;
    const tokens = $$('[data-target]', el);
    if (!tokens.length) return;
    el.dataset.mxCounterDone = '1';

    if (reducedMotion) {
      tokens.forEach((token) => {
        token.textContent = formatValue(
          Number(token.dataset.target || 0),
          Number(token.dataset.decimals || 0),
          token.dataset.grouped === '1'
        );
      });
      return;
    }

    const start = performance.now();
    const maxTarget = Math.max(...tokens.map((token) => Number(token.dataset.target || 0)));
    const duration = maxTarget >= 1000 ? 1250 : 1050;
    tokens.forEach((token) => token.classList.add('is-counting'));

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      tokens.forEach((token) => {
        const target = Number(token.dataset.target || 0);
        const decimals = Number(token.dataset.decimals || 0);
        const grouped = token.dataset.grouped === '1';
        token.textContent = formatValue(target * eased, decimals, grouped);
      });

      if (p < 1) {
        requestAnimationFrame(tick);
        return;
      }

      tokens.forEach((token) => {
        token.textContent = formatValue(
          Number(token.dataset.target || 0),
          Number(token.dataset.decimals || 0),
          token.dataset.grouped === '1'
        );
        token.classList.remove('is-counting');
      });
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = 'IntersectionObserver' in window && !reducedMotion
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.32, rootMargin: '0px 0px -7% 0px' })
    : null;

  const imageObserver = 'IntersectionObserver' in window && !reducedMotion
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          imageObserver.unobserve(entry.target);
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' })
    : null;

  function scan() {
    numberSelectors.forEach((selector) => {
      $$(selector).forEach((el) => {
        prepareCounter(el);
        if (el.dataset.mxCounterObserved === '1') return;
        el.dataset.mxCounterObserved = '1';
        if (counterObserver) counterObserver.observe(el);
        else animateCounter(el);
      });
    });

    $$('.mx15-proof-shot').forEach((shot) => {
      if (shot.dataset.mxShotObserved === '1') return;
      shot.dataset.mxShotObserved = '1';
      if (imageObserver) imageObserver.observe(shot);
      else shot.classList.add('is-visible');
    });
  }

  function init() {
    scan();
    [220, 520, 1000, 1800, 3000].forEach((delay) => window.setTimeout(scan, delay));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

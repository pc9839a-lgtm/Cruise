(() => {
  'use strict';

  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counterMeta = new WeakMap();

  const numberSelectors = [
    '.hero-ticket-front strong',
    '.hero-ticket-front em',
    '#price-pain .mv2-mega',
    '#mx-direct-booking-intro .mx7-total-proof strong',
    '#same-cruise .mx8-payment-line .mx8-value',
    '#guide-question .mx9-member-count',
    '#mx-cruise-price-examples .mx10p-price-value',
    '#mx-lowest-price .mxg-mega',
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

  function parseCounterText(original) {
    const regex = /([$₩]?)(\d[\d,]*(?:\.\d+)?)(P?)/g;
    const matches = [...original.matchAll(regex)];
    if (!matches.length) return null;

    const pieces = [];
    let cursor = 0;
    matches.forEach((match) => {
      const start = match.index || 0;
      if (start > cursor) pieces.push({ type: 'text', value: original.slice(cursor, start) });

      const rawNumber = match[2] || '0';
      pieces.push({
        type: 'number',
        prefix: match[1] || '',
        suffix: match[3] || '',
        target: Number(rawNumber.replace(/,/g, '')),
        decimals: rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0,
        grouped: rawNumber.includes(',')
      });
      cursor = start + match[0].length;
    });

    if (cursor < original.length) pieces.push({ type: 'text', value: original.slice(cursor) });
    return pieces;
  }

  function renderCounter(el, progress) {
    const meta = counterMeta.get(el);
    if (!meta) return;
    el.textContent = meta.pieces.map((piece) => {
      if (piece.type === 'text') return piece.value;
      const value = piece.target * progress;
      return `${piece.prefix}${formatValue(value, piece.decimals, piece.grouped)}${piece.suffix}`;
    }).join('');
  }

  function prepareCounter(el) {
    if (!el || el.dataset.mxCounterPrepared === '1') return false;
    const original = (el.textContent || '').trim();
    const pieces = parseCounterText(original);
    if (!pieces) return false;

    counterMeta.set(el, { original, pieces });
    el.dataset.mxCounterPrepared = '1';
    el.classList.add('mx-live-counter-element');
    el.setAttribute('aria-label', original);

    if (!reducedMotion) renderCounter(el, 0);
    return true;
  }

  function animateCounter(el) {
    if (!el || el.dataset.mxCounterDone === '1') return;
    const meta = counterMeta.get(el);
    if (!meta) return;
    el.dataset.mxCounterDone = '1';

    if (reducedMotion) {
      el.textContent = meta.original;
      return;
    }

    const maxTarget = Math.max(...meta.pieces.filter((piece) => piece.type === 'number').map((piece) => piece.target));
    const duration = maxTarget >= 1000 ? 1250 : 1050;
    const startedAt = performance.now();
    el.classList.add('is-counting');

    function tick(now) {
      const p = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      renderCounter(el, eased);

      if (p < 1) {
        requestAnimationFrame(tick);
        return;
      }

      el.textContent = meta.original;
      el.classList.remove('is-counting');
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

  function refreshMemberCopy() {
    const section = document.getElementById('mx-member-booking-benefits');
    if (!section) return;

    const cards = $$('.mx18-benefit-card', section);
    const cardList = section.querySelector('.mx18-benefit-cards');
    if (cardList) cardList.setAttribute('aria-label', '회원 예약 단계');

    if (cards[1]) {
      const description = cards[1].querySelector('p');
      if (description) description.textContent = '회원가로 바로 예약합니다';
    }

    const conclusion = section.querySelector('.mx18-benefit-conclusion > p');
    if (conclusion && conclusion.dataset.mxCopyPatched !== '1') {
      conclusion.dataset.mxCopyPatched = '1';
      conclusion.innerHTML = '최저가 크루즈로<br><strong>예약하려면 회원이어야 합니다</strong>';
    }
  }

  function ensureTravelExpansion() {
    if (document.getElementById('mx-travel-expansion')) return;
    if (document.querySelector('script[data-mx-travel-expansion-loader="1"]')) return;
    const script = document.createElement('script');
    script.src = '/membership/membership-travel-expansion-v1.js?v=20260903-travel47';
    script.defer = true;
    script.dataset.mxTravelExpansionLoader = '1';
    document.head.appendChild(script);
  }

  function scan() {
    refreshMemberCopy();
    ensureTravelExpansion();

    numberSelectors.forEach((selector) => {
      $$(selector).forEach((el) => {
        if (!counterMeta.has(el)) prepareCounter(el);
        if (!counterMeta.has(el) || el.dataset.mxCounterObserved === '1') return;
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
    [120, 220, 520, 1000, 1800, 3000].forEach((delay) => window.setTimeout(scan, delay));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

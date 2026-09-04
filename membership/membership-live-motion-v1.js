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
    const cardList = section.querySelector('.mx18-benefit-cards');
    if (cardList) cardList.setAttribute('aria-label', '회원 혜택 흐름');
  }

  function ensureTravelExpansionFallback() {
    if (document.getElementById('mx-travel-expansion')) return true;

    const early = document.getElementById('mx-start-early');
    const plans = document.getElementById('plans');
    const anchor = early || plans;
    if (!anchor || !anchor.parentNode) return false;

    if (!document.getElementById('mx-travel-fallback-style')) {
      const style = document.createElement('style');
      style.id = 'mx-travel-fallback-style';
      style.textContent = `
        #mx-travel-expansion{position:relative;box-sizing:border-box;width:100%;padding:118px 0 132px;overflow:hidden;background:linear-gradient(180deg,#f8faff 0%,#edf3fa 100%);color:#0b1730;text-align:center;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        #mx-travel-expansion .mxtf-inner{width:min(1120px,calc(100% - 56px));margin:0 auto}
        #mx-travel-expansion .mxtf-kicker{display:inline-flex;align-items:center;justify-content:center;min-height:32px;padding:0 14px;border-radius:999px;background:#e7efff;color:#2869df;font-size:14px;font-weight:950}
        #mx-travel-expansion h2{max-width:900px;margin:20px auto 0;font-size:clamp(48px,5vw,72px);line-height:1.04;letter-spacing:-.065em;font-weight:950;word-break:keep-all}
        #mx-travel-expansion h2 strong{color:#2869df}
        #mx-travel-expansion .mxtf-sub{margin:18px auto 0;color:#718097;font-size:17px;line-height:1.45;font-weight:760;word-break:keep-all}
        #mx-travel-expansion .mxtf-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:54px auto 0}
        #mx-travel-expansion .mxtf-card{box-sizing:border-box;min-height:220px;padding:26px;border:1px solid #dce5f2;border-radius:28px;background:#fff;box-shadow:0 20px 48px rgba(17,49,92,.09);text-align:left;animation:mxtfRise .7s cubic-bezier(.16,1,.3,1) both}
        #mx-travel-expansion .mxtf-card:nth-child(2){animation-delay:.10s}#mx-travel-expansion .mxtf-card:nth-child(3){animation-delay:.20s}
        #mx-travel-expansion .mxtf-num{display:inline-flex;align-items:center;justify-content:center;height:28px;min-width:43px;padding:0 10px;border-radius:999px;background:#edf3ff;color:#2869df;font-size:12px;font-weight:950}
        #mx-travel-expansion .mxtf-card strong{display:block;margin-top:54px;font-size:clamp(28px,2.6vw,36px);line-height:1.06;letter-spacing:-.05em;font-weight:950}
        #mx-travel-expansion .mxtf-card p{margin:10px 0 0;color:#738299;font-size:15px;line-height:1.4;font-weight:760;word-break:keep-all}
        #mx-travel-expansion .mxtf-trip{width:min(980px,100%);box-sizing:border-box;margin:28px auto 0;padding:28px;border-radius:26px;background:#0d2b50;color:#fff;box-shadow:0 22px 52px rgba(6,30,65,.16)}
        #mx-travel-expansion .mxtf-trip-title{font-size:clamp(25px,2.5vw,33px);font-weight:950;letter-spacing:-.045em}
        #mx-travel-expansion .mxtf-flow{display:grid;grid-template-columns:repeat(4,1fr);margin-top:22px;border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden}
        #mx-travel-expansion .mxtf-flow span{padding:18px 8px;color:#dce8f6;font-size:14px;font-weight:850}#mx-travel-expansion .mxtf-flow span+span{border-left:1px solid rgba(255,255,255,.12)}
        #mx-travel-expansion .mxtf-flow b{display:block;margin-bottom:6px;color:#7fd5ff;font-size:11px}
        @keyframes mxtfRise{from{opacity:0;transform:translateY(26px) scale(.97)}to{opacity:1;transform:none}}
        @media(max-width:780px){
          #mx-travel-expansion{padding:82px 0 96px}
          #mx-travel-expansion .mxtf-inner{width:100%}
          #mx-travel-expansion .mxtf-head{padding:0 18px}
          #mx-travel-expansion .mxtf-kicker{font-size:13px}
          #mx-travel-expansion h2{max-width:430px;margin-top:17px;font-size:clamp(39px,10.8vw,49px);line-height:1.045}
          #mx-travel-expansion .mxtf-sub{max-width:370px;margin-top:15px;font-size:15px}
          #mx-travel-expansion .mxtf-cards{display:flex;gap:12px;width:100%;margin-top:40px;padding:4px 18px 22px;box-sizing:border-box;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none}
          #mx-travel-expansion .mxtf-cards::-webkit-scrollbar{display:none}
          #mx-travel-expansion .mxtf-card{flex:0 0 min(82vw,326px);min-height:225px;padding:22px;border-radius:24px;scroll-snap-align:center}
          #mx-travel-expansion .mxtf-card strong{margin-top:46px;font-size:clamp(29px,8vw,35px)}
          #mx-travel-expansion .mxtf-trip{width:calc(100% - 34px);margin-top:12px;padding:24px 16px 18px;border-radius:22px}
          #mx-travel-expansion .mxtf-trip-title{font-size:clamp(25px,7vw,31px)}
          #mx-travel-expansion .mxtf-flow{grid-template-columns:repeat(2,1fr);margin-top:18px;border-radius:16px}
          #mx-travel-expansion .mxtf-flow span{padding:15px 5px;font-size:13px}
          #mx-travel-expansion .mxtf-flow span:nth-child(3){border-left:0;border-top:1px solid rgba(255,255,255,.12)}
          #mx-travel-expansion .mxtf-flow span:nth-child(4){border-top:1px solid rgba(255,255,255,.12)}
        }
        @media(prefers-reduced-motion:reduce){#mx-travel-expansion .mxtf-card{animation:none}}
      `;
      document.head.appendChild(style);
    }

    const section = document.createElement('section');
    section.id = 'mx-travel-expansion';
    section.setAttribute('data-membership-section', '18.7');
    section.innerHTML = `
      <div class="mxtf-inner">
        <div class="mxtf-head">
          <span class="mxtf-kicker">크루즈만이 아닙니다</span>
          <h2>여행 앞뒤까지<br><strong>한 번에 준비할 수 있습니다</strong></h2>
          <p class="mxtf-sub">호텔 · 현지 투어 · 국내 숙박까지 함께</p>
        </div>
        <div class="mxtf-cards" aria-label="추가 예약 가능 상품">
          <article class="mxtf-card"><span class="mxtf-num">01</span><strong>전세계 호텔</strong><p>출발 전·후 숙박까지 같이 준비</p></article>
          <article class="mxtf-card"><span class="mxtf-num">02</span><strong>현지 투어</strong><p>기항지와 여행지 일정도 함께 예약</p></article>
          <article class="mxtf-card"><span class="mxtf-num">03</span><strong>국내 호텔</strong><p>출국 전날·귀국 후 숙박까지 연결</p></article>
        </div>
        <div class="mxtf-trip">
          <div class="mxtf-trip-title">크루즈만 잡고 끝나는 여행이 아닙니다</div>
          <div class="mxtf-flow"><span><b>출발 전</b>호텔 1박</span><span><b>여행</b>크루즈</span><span><b>현지</b>투어</span><span><b>귀국 후</b>호텔 1박</span></div>
        </div>
      </div>`;

    anchor.parentNode.insertBefore(section, anchor);
    return true;
  }

  function scan() {
    refreshMemberCopy();
    ensureTravelExpansionFallback();

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
    [120, 220, 520, 1000, 1800, 3000, 5000, 8000].forEach((delay) => window.setTimeout(scan, delay));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

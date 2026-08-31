(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function cleanupVerboseCopy() {
    const chapterTitles = {
      '#mx-chapter-1 .mx-chapter-copy h2': '같은 크루즈<br><strong>왜 160만원 차이?</strong>',
      '#mx-chapter-2 .mx-chapter-copy h2': '가이드 없이<br><strong>가능할까?</strong>',
      '#mx-chapter-3 .mx-chapter-copy h2': '매월 $100<br><strong>→ 200P</strong>',
      '#mx-chapter-4 .mx-chapter-copy h2': '$2,000 크루즈<br><strong>실제 부담은?</strong>',
      '#mx-chapter-5 .mx-chapter-copy h2': 'CLASSIC<br><strong>VS PREMIUM</strong>',
      '#mx-chapter-6 .mx-chapter-copy h2': '가입 전<br><strong>5가지만 확인</strong>'
    };

    Object.entries(chapterTitles).forEach(([selector, html]) => {
      const el = $(selector);
      if (el) el.innerHTML = html;
    });

    $$('.mx-chapter-copy p').forEach((el) => el.remove());
    $('#mx-cost-structure .mx-sub')?.remove();
    $$('#mx-cost-structure .mx-card span').forEach((el) => el.remove());
    $('#mx-moving-hotel .mx-sub')?.remove();
    $('#mx-point-use .mx-sub')?.remove();
    $$('#mx-use-rules .mx-dual-card p').forEach((el) => el.remove());
    $$('#mx-plan-guide .mx-speed-card p').forEach((el) => el.remove());
    $$('#mx-recap .mx-recap-card span').forEach((el) => el.remove());
    $('#mx-final-choice p')?.remove();

    const movingEyebrow = $('#mx-moving-hotel .mx-eyebrow');
    if (movingEyebrow) movingEyebrow.textContent = '크루즈는';

    const fitTitle = $('#mx-fit-check .mx-title');
    if (fitTitle) fitTitle.innerHTML = '내 여행 계획과<br><strong>맞나요?</strong>';

    const faqTitle = $('#mx-faq-section .mx-title');
    if (faqTitle) faqTitle.innerHTML = '자주 묻는 질문<br><strong>5가지</strong>';

    const recapTitle = $('#mx-recap .mx-title');
    if (recapTitle) recapTitle.innerHTML = '<strong>3가지만 기억하세요</strong>';

    const finalTitle = $('#mx-final-choice h2');
    if (finalTitle) finalTitle.innerHTML = '비교하고<br><strong>결정하세요</strong>';

    const faqAnswers = [
      '같은 선사·일정·객실 등급 기준으로 비교합니다.',
      '포인트 적용 후 남은 금액은 카드로 결제할 수 있습니다.',
      '항구·승선·선내·기항지·하선 순서만 알면 됩니다.',
      '천천히 모으면 클래식, 빠르게 모으면 프리미엄.',
      '환불·본인결제·멤버십 유지·해지 시 포인트 기준을 확인하세요.'
    ];
    $$('#mx-faq-section .mx-faq-a p').forEach((p, i) => {
      if (faqAnswers[i]) p.textContent = faqAnswers[i];
    });
  }

  function addPriceStory() {
    const host = $('#mx-cost-structure .mx-inner');
    if (!host || $('#m2-price-story')) return;
    const cardGrid = $('.mx-card-grid', host);
    const el = document.createElement('div');
    el.id = 'm2-price-story';
    el.className = 'm2-visual m2-price-story';
    el.innerHTML = `
      <div class="m2-visual-head">
        <span>2명 기준</span>
        <strong>400만원 → 240만원</strong>
      </div>
      <div class="m2-price-stack">
        <div class="m2-price-total">
          <span>여행사 · 가이드 포함</span>
          <strong><i data-m2-count="400">400</i>만원</strong>
        </div>
        <div class="m2-price-bar" aria-label="가격 구조 시각화">
          <div class="m2-price-core"><span>직접예약</span><strong>240만원</strong></div>
          <div class="m2-price-extra"><span>차이</span><strong>160만원</strong></div>
        </div>
        <div class="m2-service-tags">
          <span>가이드</span><span>단체 이동</span><span>패키지 운영</span><span>예약 대행</span>
        </div>
        <div class="m2-price-conclusion">
          <strong>같은 크루즈<br>다른 예약 방식</strong>
        </div>
      </div>`;
    if (cardGrid) host.insertBefore(el, cardGrid); else host.appendChild(el);
  }

  function addMovingHotelRoute() {
    const host = $('#mx-moving-hotel .mx-inner');
    if (!host || $('#m2-hotel-route')) return;
    const el = document.createElement('div');
    el.id = 'm2-hotel-route';
    el.className = 'm2-visual m2-hotel-route';
    el.innerHTML = `
      <div class="m2-route-title"><span>일반 여행</span><strong>호텔도 이동</strong></div>
      <div class="m2-route-line m2-land-route">
        <div class="m2-node"><b>호텔 1</b><span>짐 풀기</span></div><i>→</i>
        <div class="m2-node"><b>이동</b><span>짐 이동</span></div><i>→</i>
        <div class="m2-node"><b>호텔 2</b><span>체크인</span></div>
      </div>
      <div class="m2-route-title cruise"><span>크루즈</span><strong>객실은 그대로</strong></div>
      <div class="m2-sea-route">
        <div class="m2-port">도시 A</div>
        <div class="m2-sea-track"><div class="m2-ship">🚢</div></div>
        <div class="m2-port">도시 B</div>
      </div>
      <div class="m2-route-result"><strong>짐은 그대로</strong><span>자고 일어나면 다음 도시</span></div>`;
    host.appendChild(el);
  }

  function addPointTimeline() {
    const host = $('#mx-point-use .mx-inner');
    if (!host || $('#m2-point-timeline')) return;
    const el = document.createElement('div');
    el.id = 'm2-point-timeline';
    el.className = 'm2-visual m2-point-timeline';
    el.innerHTML = `
      <div class="m2-visual-head"><span>CLASSIC</span><strong>$100씩 12개월</strong></div>
      <div class="m2-timeline-track"><div class="m2-timeline-fill"></div></div>
      <div class="m2-timeline-points">
        <div class="m2-time-point"><b>1개월</b><strong><i data-m2-count="200">200</i>P</strong></div>
        <div class="m2-time-point"><b>6개월</b><strong><i data-m2-count="1200">1,200</i>P</strong></div>
        <div class="m2-time-point"><b>12개월</b><strong><i data-m2-count="2400">2,400</i>P</strong></div>
      </div>
      <div class="m2-point-to-trip">
        <div class="m2-point-bubble"><strong>2,400P</strong><span>12개월</span></div>
        <div class="m2-point-arrow">→</div>
        <div class="m2-trip-card"><strong>크루즈 예약</strong><span>포인트 사용</span></div>
      </div>`;
    host.appendChild(el);
  }

  function addPaymentFlow() {
    const host = $('#mx-use-rules .mx-inner');
    if (!host || $('#m2-payment-flow')) return;
    const el = document.createElement('div');
    el.id = 'm2-payment-flow';
    el.className = 'm2-visual m2-payment-flow';
    el.innerHTML = `
      <div class="m2-visual-head"><span>예약</span><strong>POINT + CARD</strong></div>
      <div class="m2-pay-pipes">
        <div class="m2-pay-source point"><span>보유</span><strong>POINT</strong></div>
        <div class="m2-pay-pipe"><i></i></div>
        <div class="m2-pay-merge"><span>예약</span><strong>크루즈</strong></div>
        <div class="m2-pay-pipe reverse"><i></i></div>
        <div class="m2-pay-source card"><span>남은 금액</span><strong>CARD</strong></div>
      </div>
      <div class="m2-pay-caption"><strong>포인트 + 카드</strong></div>`;
    host.appendChild(el);
  }

  function addPlanChooser() {
    const host = $('#mx-plan-guide .mx-inner');
    if (!host || $('#m2-plan-chooser')) return;
    const el = document.createElement('div');
    el.id = 'm2-plan-chooser';
    el.className = 'm2-plan-chooser';
    el.innerHTML = `
      <div class="m2-choice-question">준비 속도</div>
      <div class="m2-choice-buttons" role="group" aria-label="멤버십 준비 속도 선택">
        <button type="button" data-m2-plan="classic"><span>천천히</span><strong>CLASSIC</strong></button>
        <button type="button" data-m2-plan="premium"><span>빠르게</span><strong>PREMIUM</strong></button>
      </div>
      <div class="m2-choice-result" aria-live="polite"><strong>CLASSIC · PREMIUM</strong></div>`;
    const grid = $('.mx-speed-grid', host);
    if (grid) host.insertBefore(el, grid); else host.appendChild(el);

    el.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-m2-plan]');
      if (!btn) return;
      const type = btn.dataset.m2Plan;
      $$('.m2-choice-buttons button', el).forEach((b) => b.classList.toggle('active', b === btn));
      const cards = $$('.mx-speed-card', host);
      cards.forEach((card, index) => card.classList.toggle('m2-selected', type === 'classic' ? index === 0 : index === 1));
      const result = $('.m2-choice-result', el);
      result.innerHTML = type === 'classic'
        ? '<strong>CLASSIC · $100 / 200P</strong>'
        : '<strong>PREMIUM · $250 / 500P</strong>';
    });
  }

  function countUp(el) {
    if (el.dataset.m2Done === '1') return;
    el.dataset.m2Done = '1';
    const target = Number(el.dataset.m2Count || 0);
    const duration = 850;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function setupStage2Motion() {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const visuals = $$('.m2-visual');
    if (reduce || !('IntersectionObserver' in window)) {
      visuals.forEach((el) => el.classList.add('m2-active'));
      $$('[data-m2-count]').forEach((el) => el.textContent = Number(el.dataset.m2Count || 0).toLocaleString('ko-KR'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('m2-active');
        entry.target.querySelectorAll('[data-m2-count]').forEach(countUp);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.22, rootMargin: '0px 0px -10% 0px' });
    visuals.forEach((el) => observer.observe(el));

    if (window.gsap && window.ScrollTrigger && !matchMedia('(max-width: 780px)').matches) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      const price = $('#m2-price-story');
      if (price) {
        window.gsap.fromTo($('.m2-price-extra', price), { scaleX: 0, transformOrigin: 'left center' }, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: price, start: 'top 72%', end: 'bottom 48%', scrub: .55 }
        });
      }
      const ship = $('#m2-hotel-route .m2-ship');
      if (ship) {
        window.gsap.fromTo(ship, { xPercent: -30 }, { xPercent: 260, ease: 'none', scrollTrigger: { trigger: '#m2-hotel-route', start: 'top 75%', end: 'bottom 45%', scrub: .7 } });
      }
      const fill = $('#m2-point-timeline .m2-timeline-fill');
      if (fill) {
        window.gsap.fromTo(fill, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#m2-point-timeline', start: 'top 75%', end: 'bottom 45%', scrub: .6 } });
      }
    }
  }

  function init() {
    if ($('#m2-price-story')) return;
    cleanupVerboseCopy();
    addPriceStory();
    addMovingHotelRoute();
    addPointTimeline();
    addPaymentFlow();
    addPlanChooser();
    setupStage2Motion();
  }

  function start() {
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if ($('#mx-cost-structure') && $('#mx-moving-hotel') && $('#mx-point-use') && $('#mx-use-rules') && $('#mx-plan-guide')) {
        clearInterval(timer);
        init();
      } else if (attempts > 20) {
        clearInterval(timer);
      }
    }, 120);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();
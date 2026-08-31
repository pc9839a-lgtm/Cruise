(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function addPriceStory() {
    const host = $('#mx-cost-structure .mx-inner');
    if (!host || $('#m2-price-story')) return;
    const cardGrid = $('.mx-card-grid', host);
    const el = document.createElement('div');
    el.id = 'm2-price-story';
    el.className = 'm2-visual m2-price-story';
    el.innerHTML = `
      <div class="m2-visual-head">
        <span>2명 기준 예시</span>
        <strong>400만원이 어떻게 240만원이 될까요?</strong>
      </div>
      <div class="m2-price-stack">
        <div class="m2-price-total">
          <span>여행사 · 가이드 포함</span>
          <strong><i data-m2-count="400">400</i>만원</strong>
        </div>
        <div class="m2-price-bar" aria-label="가격 구조 시각화">
          <div class="m2-price-core"><span>크루즈 직접예약 예시</span><strong>240만원</strong></div>
          <div class="m2-price-extra"><span>포함 서비스·운영 차이</span><strong>160만원 차이</strong></div>
        </div>
        <div class="m2-service-tags">
          <span>가이드</span><span>단체 이동</span><span>패키지 운영</span><span>예약 대행</span>
        </div>
        <div class="m2-price-conclusion">
          <span>핵심</span><strong>배가 달라진 게 아니라<br>예약 방식이 달라집니다</strong>
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
      <div class="m2-route-title"><span>일반 자유여행</span><strong>도시가 바뀔 때마다 호텔도 이동</strong></div>
      <div class="m2-route-line m2-land-route">
        <div class="m2-node"><b>호텔 1</b><span>짐 풀기</span></div><i>→</i>
        <div class="m2-node"><b>이동</b><span>짐 들고 이동</span></div><i>→</i>
        <div class="m2-node"><b>호텔 2</b><span>다시 체크인</span></div>
      </div>
      <div class="m2-route-title cruise"><span>크루즈 여행</span><strong>내 객실은 그대로, 배가 도시를 이동</strong></div>
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
      <div class="m2-visual-head"><span>클래식 월 적립 예시</span><strong>시간이 지나면 이렇게 쌓입니다</strong></div>
      <div class="m2-timeline-track"><div class="m2-timeline-fill"></div></div>
      <div class="m2-timeline-points">
        <div class="m2-time-point"><b>1개월</b><strong><i data-m2-count="200">200</i>P</strong></div>
        <div class="m2-time-point"><b>6개월</b><strong><i data-m2-count="1200">1,200</i>P</strong></div>
        <div class="m2-time-point"><b>12개월</b><strong><i data-m2-count="2400">2,400</i>P</strong></div>
      </div>
      <div class="m2-point-to-trip">
        <div class="m2-point-bubble"><strong>2,400P</strong><span>모으고 끝이 아니라</span></div>
        <div class="m2-point-arrow">→</div>
        <div class="m2-trip-card"><strong>크루즈 예약</strong><span>조건에 맞춰 포인트 적용</span></div>
      </div>`;
    const sub = $('.mx-sub', host);
    if (sub) host.insertBefore(el, sub); else host.appendChild(el);
  }

  function addPaymentFlow() {
    const host = $('#mx-use-rules .mx-inner');
    if (!host || $('#m2-payment-flow')) return;
    const el = document.createElement('div');
    el.id = 'm2-payment-flow';
    el.className = 'm2-visual m2-payment-flow';
    el.innerHTML = `
      <div class="m2-visual-head"><span>예약할 때는</span><strong>두 통로가 한 결제로 합쳐집니다</strong></div>
      <div class="m2-pay-pipes">
        <div class="m2-pay-source point"><span>보유 포인트</span><strong>POINT</strong></div>
        <div class="m2-pay-pipe"><i></i></div>
        <div class="m2-pay-merge"><span>예약금액</span><strong>크루즈</strong></div>
        <div class="m2-pay-pipe reverse"><i></i></div>
        <div class="m2-pay-source card"><span>남은 금액</span><strong>CARD</strong></div>
      </div>
      <div class="m2-pay-caption"><strong>포인트가 부족해도 멈추지 않습니다</strong><span>사용 가능한 포인트 + 남은 카드 결제로 예약하는 방식이 있습니다.</span></div>`;
    host.appendChild(el);
  }

  function addPlanChooser() {
    const host = $('#mx-plan-guide .mx-inner');
    if (!host || $('#m2-plan-chooser')) return;
    const el = document.createElement('div');
    el.id = 'm2-plan-chooser';
    el.className = 'm2-plan-chooser';
    el.innerHTML = `
      <div class="m2-choice-question">나는 어떤 쪽에 가까운가요?</div>
      <div class="m2-choice-buttons" role="group" aria-label="멤버십 준비 속도 선택">
        <button type="button" data-m2-plan="classic"><span>천천히 준비</span><strong>월 부담 낮게</strong></button>
        <button type="button" data-m2-plan="premium"><span>빠르게 준비</span><strong>포인트 더 빠르게</strong></button>
      </div>
      <div class="m2-choice-result" aria-live="polite"><span>버튼을 눌러보세요</span><strong>아래 플랜을 바로 비교할 수 있습니다</strong></div>`;
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
      if (type === 'classic') result.innerHTML = '<span>추천 방향</span><strong>CLASSIC · 월 $100 / 매월 200P</strong>';
      else result.innerHTML = '<span>추천 방향</span><strong>PREMIUM · 월 $250 / 매월 500P</strong>';
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

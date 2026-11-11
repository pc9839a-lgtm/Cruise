(() => {
  'use strict';

  const SECTION_ID = 'mx-travel-expansion';
  const FREEDOM_ID = 'mx-membership-freedom';

  function installStyles() {
    if (document.getElementById('mx-travel-expansion-style')) return;
    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

  function activate(section) {
    if (!section) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 780px)').matches) {
      section.classList.add('is-active');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('is-active');
        observer.disconnect();
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    observer.observe(section);
  }

  function buildTravel() {
    if (document.getElementById(SECTION_ID)) return true;
    const benefit = document.getElementById('mx-member-booking-benefits');
    const plans = document.getElementById('plans');
    const anchor = plans || benefit;
    if (!anchor || !anchor.parentNode) return false;

    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('data-membership-section', '18.7');
    section.innerHTML = `
      <div class="mxt-inner">
        <div class="mxt-head">
          <span class="mxt-kicker">크루즈만이 아닙니다</span>
          <h2>호텔·투어도<br><strong>회원 혜택으로 예약합니다</strong></h2>
        </div>
        <div class="mxt-cards" aria-label="추가 예약 가능 상품">
          <article class="mxt-card" data-ghost="HOTEL">
            <div><span class="mxt-num">01</span><span class="mxt-guarantee">최저가 보장</span></div>
            <strong>전세계 호텔</strong>
            <p>호텔도 최저가 보장</p>
          </article>
          <article class="mxt-card" data-ghost="TOUR">
            <span class="mxt-num">02</span>
            <strong>현지 투어</strong>
            <p>기항지·여행지 투어 예약</p>
          </article>
          <article class="mxt-card" data-ghost="KOREA">
            <span class="mxt-num">03</span>
            <strong>국내 호텔</strong>
            <p>출국 전·귀국 후 숙박</p>
          </article>
        </div>
      </div>`;
    anchor.parentNode.insertBefore(section, anchor);
    activate(section);
    return true;
  }

  function buildFreedom() {
    if (document.getElementById(FREEDOM_ID)) return true;
    const plans = document.getElementById('plans');
    if (!plans || !plans.parentNode) return false;

    const section = document.createElement('div');
    section.id = FREEDOM_ID;
    section.setAttribute('data-membership-section', '19.8');
    section.innerHTML = `
      <div class="mxf-inner">
        <h2 class="mxf-title">가입 전에<br><strong>이것만 확인하세요</strong></h2>
        <div class="mxf-grid" aria-label="가입 전 핵심 조건">
          <div class="mxf-card mxf-penalty"><span class="mxf-zero">0원</span><strong>위약금 없음</strong></div>
          <div class="mxf-card mx-refund-card"><span class="mxf-zero">14일</span><strong>100% 환불*</strong></div>
          <div class="mxf-card mxf-contract"><span class="mxf-zero">0개월</span><strong>약정 없음</strong></div>
        </div>
        <p class="mxf-note">* 멤버십 결제 기준이며, 예약 상품 취소 규정은 각 상품 조건에 따릅니다.</p>
      </div>`;
    plans.parentNode.insertBefore(section, plans);
    activate(section);
    return true;
  }

  function init() {
    installStyles();
    let tries = 0;
    const run = () => {
      const travelReady = buildTravel();
      const freedomReady = buildFreedom();
      tries += 1;
      return (travelReady && freedomReady) || tries >= 80;
    };
    if (run()) return;
    const timer = window.setInterval(() => { if (run()) window.clearInterval(timer); }, 120);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
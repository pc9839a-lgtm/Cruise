(() => {
  'use strict';

  function ensureSection(id, className) {
    let section = document.getElementById(id);
    if (!section) {
      section = document.createElement('section');
      section.id = id;
    }
    section.className = className;
    return section;
  }

  function bindBenefitMotion() {
    const benefit = document.getElementById('mx-member-booking-benefits');
    if (!benefit || benefit.dataset.mx18MotionBound === '1') return;
    benefit.dataset.mx18MotionBound = '1';
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 780px)').matches) {
      benefit.classList.add('mx18-conversion-active');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        benefit.classList.add('mx18-conversion-active');
        observer.disconnect();
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    observer.observe(benefit);
  }

  function buildSections18To20() {
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    if (!calculator || !plans) return false;

    ['mx-plan-guide','m3-selector','mx-fit-check'].forEach((id) => document.getElementById(id)?.remove());

    document.getElementById('mx-membership-optional')?.remove();

    const memberBenefits = ensureSection('mx-member-booking-benefits','mx18-benefit-section');
    memberBenefits.setAttribute('data-membership-section','18.5');
    memberBenefits.innerHTML = `
      <div class="mx18-benefit-inner">
        <h2 class="mx18-benefit-title">같은 크루즈<br><strong>회원이 더 적게 냅니다</strong></h2>

        <div class="mx18-benefit-cards" aria-label="회원 혜택 흐름">
          <article class="mx18-benefit-card">
            <span class="mx18-step">01</span>
            <strong>낸 금액이 쌓이고</strong>
            <p>여행에 쓸 POINT가 됩니다</p>
          </article>
          <article class="mx18-benefit-card">
            <span class="mx18-step">02</span>
            <strong>회원 혜택가로 예약하고</strong>
            <p>쌓아둔 POINT를 함께 씁니다</p>
          </article>
          <article class="mx18-benefit-card mx18-benefit-result">
            <span class="mx18-step">RESULT</span>
            <strong>현금 부담이 줄어듭니다</strong>
            <p>같은 크루즈도 회원이 더 적게 냅니다</p>
          </article>
          <div class="mx18-proof-strip" aria-label="실제 예약 숫자">
            <div><span>예약 총액</span><strong>$3,887.35</strong></div>
            <div><span>사용 POINT</span><strong>1,805.84P</strong></div>
            <div class="accent"><span>실제 카드 결제</span><strong>$2,020.88</strong></div>
          </div>
        </div>

        <a class="mx18-benefit-cta" href="#plans">CLASSIC · PREMIUM 비교하기 <b>→</b></a>
      </div>`;

    document.getElementById('mx-start-early')?.remove();
    document.getElementById('mx-start-early-proof')?.remove();

    plans.setAttribute('data-membership-section','20');

    if (calculator.nextElementSibling !== memberBenefits) calculator.insertAdjacentElement('afterend', memberBenefits);
    if (memberBenefits.nextElementSibling !== plans) memberBenefits.insertAdjacentElement('afterend', plans);

    bindBenefitMotion();
    return true;
  }

  function init() {

    if (buildSections18To20()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections18To20() || tries >= 45) window.clearInterval(timer);
    },160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

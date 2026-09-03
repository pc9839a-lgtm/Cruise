(() => {
  'use strict';

  function patchPlanCards() {
    const plans = document.getElementById('plans');
    const wrap = document.getElementById('planCards');
    if (!plans || !wrap) return false;

    /* 플랜 위 설명성 첨언 제거 */
    const earlyNote = plans.querySelector('.mv2-early');
    if (earlyNote) earlyNote.remove();

    wrap.querySelectorAll('.plan-card').forEach((card) => {
      const premium = card.classList.contains('recommended') || /프리미엄/i.test(card.textContent || '');
      const data = premium
        ? { start: '$500', reward: '800P', monthly: '500P' }
        : { start: '$200', reward: '350P', monthly: '200P' };

      card.querySelectorAll('.plan-tag,.plan-fit,.plan-top-stats,.plan-mobile-summary').forEach((el) => {
        el.style.setProperty('display', 'none', 'important');
      });

      const oldFeature = card.querySelector('.plan-feature-group');
      if (oldFeature) oldFeature.style.setProperty('display', 'none', 'important');

      let facts = card.querySelector('.mx-plan-facts');
      if (!facts) {
        facts = document.createElement('div');
        facts.className = 'mx-plan-facts';
        facts.setAttribute('aria-label', '멤버십 핵심 조건');
        const cta = card.querySelector('.plan-cta');
        if (cta) card.insertBefore(facts, cta);
        else card.appendChild(facts);
      }

      facts.innerHTML = `
        <div class="mx-plan-fact"><span>가입 시 결제</span><strong>${data.start}</strong></div>
        <div class="mx-plan-fact"><span>가입 시 적립</span><strong>${data.reward}</strong></div>
        <div class="mx-plan-fact"><span>매월 적립</span><strong>${data.monthly}</strong></div>`;

      facts.style.setProperty('margin', '22px 0 0', 'important');
      facts.style.setProperty('border-top', '1px solid #d3deeb', 'important');
      facts.style.setProperty('border-bottom', '1px solid #d3deeb', 'important');

      facts.querySelectorAll('.mx-plan-fact').forEach((row, index, rows) => {
        row.style.setProperty('display', 'grid', 'important');
        row.style.setProperty('grid-template-columns', '1fr auto', 'important');
        row.style.setProperty('align-items', 'center', 'important');
        row.style.setProperty('gap', '16px', 'important');
        row.style.setProperty('padding', '16px 2px', 'important');
        if (index < rows.length - 1) row.style.setProperty('border-bottom', '1px solid #e1e8f1', 'important');

        const label = row.querySelector('span');
        const value = row.querySelector('strong');
        if (label) {
          label.style.setProperty('font-size', '15px', 'important');
          label.style.setProperty('font-weight', '850', 'important');
          label.style.setProperty('color', '#53657c', 'important');
        }
        if (value) {
          value.style.setProperty('font-size', '25px', 'important');
          value.style.setProperty('line-height', '1', 'important');
          value.style.setProperty('font-weight', '950', 'important');
          value.style.setProperty('color', premium ? '#2468e8' : '#0b1729', 'important');
        }
      });

      const main = card.querySelector('.plan-main-line');
      if (main) main.style.setProperty('margin-bottom', '0', 'important');

      const cta = card.querySelector('.plan-cta');
      if (cta) {
        cta.style.setProperty('margin-top', '22px', 'important');
        cta.style.setProperty('min-height', '56px', 'important');
      }
    });

    return true;
  }

  function buildFinalFlow() {
    const early = document.getElementById('mx-start-early');
    const plans = document.getElementById('plans');
    const section21 = document.getElementById('membership-terms');
    if (!early || !plans || !section21) return false;

    ['mx-faq-section', 'mx-recap', 'price-match', 'mx-final-choice', 'points-by-time', 'mx-use-rules', 'real-cost'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    plans.setAttribute('data-membership-section', '20');
    const planKicker = plans.querySelector('.section-kicker');
    const planTitle = plans.querySelector('.membership-section-head h2');
    if (planKicker) planKicker.textContent = '마지막 선택';
    if (planTitle) planTitle.innerHTML = '그럼 나는<br><strong>얼마씩 쌓을까?</strong>';

    patchPlanCards();

    section21.className = 'mx21-terms-section';
    section21.setAttribute('data-membership-section', '21');
    section21.innerHTML = `
      <div class="mx21-inner">
        <span class="mx21-kicker">가입 전 확인</span>
        <h2 class="mx21-title">시작하기 전에<br><strong>필요한 조건만 확인하세요</strong></h2>
        <div class="mx21-terms" aria-label="멤버십 가입 조건">
          <details><summary>환불</summary><p>가입 후 14일이 지나면 환불이 어렵습니다.</p></details>
          <details><summary>POINT</summary><p>예약 조건과 출발 시점에 따라 사용할 수 있는 POINT 범위가 달라질 수 있습니다.</p></details>
          <details><summary>해지</summary><p>해지 시 보너스 적립분 등 POINT 조건이 달라질 수 있습니다.</p></details>
          <details><summary>결제</summary><p>본인 명의 결제수단 등 예약 조건을 확인해야 합니다.</p></details>
          <details><summary>예약 유지</summary><p>예약에 필요한 멤버십 조건을 출발 전까지 유지해야 하는 경우가 있습니다.</p></details>
          <details><summary>최저가 보장</summary><p>동일 크루즈·출발일·객실 등 비교 조건과 신청 기준은 최저가 보장 약관에 따라 적용됩니다.</p></details>
        </div>
      </div>`;

    if (early.nextElementSibling !== plans) early.insertAdjacentElement('afterend', plans);
    if (plans.nextElementSibling !== section21) plans.insertAdjacentElement('afterend', section21);
    return true;
  }

  function init() {
    if (!buildFinalFlow()) {
      let tries = 0;
      const timer = window.setInterval(() => {
        tries += 1;
        if (buildFinalFlow() || tries >= 50) window.clearInterval(timer);
      }, 160);
    }

    const wrap = document.getElementById('planCards');
    if (wrap && typeof MutationObserver !== 'undefined' && wrap.dataset.mxPlanObserver !== '1') {
      wrap.dataset.mxPlanObserver = '1';
      let queued = false;
      const observer = new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          patchPlanCards();
        });
      });
      observer.observe(wrap, { childList: true, subtree: true });
    }

    window.setTimeout(patchPlanCards, 500);
    window.setTimeout(patchPlanCards, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

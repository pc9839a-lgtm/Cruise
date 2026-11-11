(() => {
  'use strict';

  function moveSections() {
    document.getElementById('mx-membership-optional')?.remove();
    document.getElementById('mx-start-early')?.remove();
    document.getElementById('mx-start-early-proof')?.remove();

    const benefit = document.getElementById('mx-member-booking-benefits');
    const travel = document.getElementById('mx-travel-expansion');
    const calculator = document.getElementById('calculator');
    const freedom = document.getElementById('mx-membership-freedom');
    const plans = document.getElementById('plans');

    // 최종 전환 순서: 회원 절감 근거 -> 호텔/투어 혜택 -> 플랜.
    if (benefit && travel && benefit.parentNode) {
      if (benefit.nextElementSibling !== travel) benefit.after(travel);
    }
    if (travel && plans && travel.parentNode === plans.parentNode && travel.nextElementSibling !== plans) {
      travel.after(plans);
    }

    // A selection CTA should land on the plan choices, not on preliminary notices.
    // Keep the existing reassurance section, but display it after both plan cards.
    if (freedom && plans) {
      const plansWrap = plans.querySelector('.plans-wrap') || plans;
      const planCards = plansWrap.querySelector('#planCards');
      if (planCards) {
        if (freedom.parentElement !== plansWrap || planCards.nextElementSibling !== freedom) {
          planCards.after(freedom);
        }
      } else if (freedom.parentElement !== plansWrap) {
        plansWrap.append(freedom);
      }
    } else if (freedom && calculator && calculator.parentNode) {
      calculator.after(freedom);
    }

    return !!(benefit && travel && freedom && plans);
  }

  function init() {
    // Arrange sections once as each dynamic section becomes available.
    // Repeated delayed moves caused visible jumps while users were scrolling.
    if (moveSections()) return;

    let queued = false;
    const observer = new MutationObserver((changes) => {
      if (queued || !changes.some((change) => change.type === 'childList' &&
        (change.addedNodes.length || change.removedNodes.length))) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (moveSections()) observer.disconnect();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // If a third-party script never loads, do not watch the page forever.
    window.setTimeout(() => {
      observer.disconnect();
      moveSections();
    }, 7000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

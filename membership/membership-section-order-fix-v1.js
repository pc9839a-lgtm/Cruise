(() => {
  'use strict';

  const ORDER_FIX_ID = 'mx-section-order-fix-style';

  function installStyles() {
    if (document.getElementById(ORDER_FIX_ID)) return;
    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

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

    // 가입 전 확인은 독립 섹션이 아니라 플랜 내부 상단 안심바로 고정.
    if (freedom && plans) {
      const plansWrap = plans.querySelector('.plans-wrap') || plans;
      const planHead = plansWrap.querySelector('.membership-section-head');
      if (planHead) {
        if (freedom.parentNode !== plansWrap || freedom.nextElementSibling !== planHead) planHead.before(freedom);
      } else if (freedom.parentNode !== plansWrap) {
        plansWrap.prepend(freedom);
      }
    } else if (freedom && calculator && calculator.parentNode) {
      calculator.after(freedom);
    }

    return !!(travel && freedom && plans);
  }

  function init() {
    installStyles();
    let tries = 0;
    const run = () => {
      tries += 1;
      const done = moveSections();
      if (done || tries >= 80) return;
      window.setTimeout(run, 120);
    };
    run();
    window.setTimeout(moveSections, 900);
    window.setTimeout(moveSections, 1800);
    window.setTimeout(moveSections, 3200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

(() => {
  'use strict';

  function init() {
    const bar = document.querySelector('.membership-bottom-cta');
    const link = bar?.querySelector('a');
    const plans = document.getElementById('plans');
    const terms = document.getElementById('membership-terms');
    const benefitAction = document.querySelector('#mx-member-booking-benefits .mx18-benefit-cta');
    const footer = document.querySelector('.site-footer');
    if (!bar || !link || !plans) return;

    const intersectsReadingArea = (element) => {
      if (!element || getComputedStyle(element).display === 'none') return false;
      const bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight - 66 && bounds.bottom > 66;
    };

    let rafPending = false;
    const update = () => {
      rafPending = false;
      const hide = [plans, terms, footer, benefitAction].some(intersectsReadingArea);
      const previous = bar.classList.contains('is-hidden-by-plans');
      if (previous !== hide) {
        bar.classList.toggle('is-hidden-by-plans', hide);
        bar.setAttribute('aria-hidden', String(hide));
        link.tabIndex = hide ? -1 : 0;
      }
      const pastPlans = plans.getBoundingClientRect().bottom < 0;
      const label = pastPlans ? '멤버십 다시 보기' : '내 멤버십 선택하기';
      if (link.textContent !== label) link.textContent = label;
    };

    const schedule = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
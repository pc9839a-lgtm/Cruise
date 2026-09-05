(() => {
  'use strict';

  function init() {
    const bar = document.querySelector('.membership-bottom-cta');
    const link = bar?.querySelector('a');
    const plans = document.getElementById('plans');
    if (!bar || !link || !plans) return;

    const setCopy = () => {
      const rect = plans.getBoundingClientRect();
      const passedPlans = rect.bottom < 0;
      link.textContent = passedPlans ? '플랜 다시 보기' : 'CLASSIC · PREMIUM 비교하기';
    };

    const setPlanVisibility = (visible) => {
      bar.classList.toggle('is-hidden-by-plans', visible);
      bar.setAttribute('aria-hidden', visible ? 'true' : 'false');
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setPlanVisibility(entry.isIntersecting));
      }, { threshold: 0.08, rootMargin: '-8% 0px -8% 0px' });
      observer.observe(plans);
    }

    window.addEventListener('scroll', setCopy, { passive:true });
    window.addEventListener('resize', setCopy, { passive:true });
    setCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();
(() => {
  'use strict';

  function removeLegacyScenes() {
    [
      'm3-savings-use',
      'm3-selector',
      'mx-direct-booking-saving',
      'points-by-time',
      'mx-use-rules',
      'calculator',
      'mx-fit-check',
      'mx-plan-guide',
      'mx-final-choice',
      'real-cost'
    ].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.remove();
    });

    document.querySelectorAll('.page-glow,.m-motion-orbit,.m-motion-rail').forEach((node) => node.remove());
  }

  function fixPlanReadability() {
    const root = document.getElementById('plans');
    if (!root) return;

    root.style.background = '#07111f';
    root.style.color = '#fff';

    const headTitle = root.querySelector('.membership-section-head h2');
    const headCopy = root.querySelector('.membership-section-head p');
    if (headTitle) headTitle.style.color = '#fff';
    if (headCopy) headCopy.style.color = 'rgba(255,255,255,.78)';

    root.querySelectorAll('.plan-card').forEach((card, index) => {
      const premium = index === 1 || card.classList.contains('recommended');
      card.style.background = premium ? '#edf4ff' : '#ffffff';
      card.style.color = '#0b1729';
      card.style.borderColor = premium ? '#8eb4ff' : '#d3deeb';
      card.style.boxShadow = 'none';

      card.querySelectorAll('*').forEach((el) => {
        if (!el.closest('.plan-cta')) el.style.color = '#0b1729';
        el.style.opacity = '1';
      });

      const muted = card.querySelectorAll('.plan-fit,.plan-stat .label,.plan-mini-label,.plan-mobile-line em');
      muted.forEach((el) => { el.style.color = '#53657c'; });

      const tag = card.querySelector('.plan-tag');
      if (tag) {
        tag.style.color = premium ? '#1657d8' : '#24519c';
        tag.style.background = premium ? '#dce9ff' : '#edf3fb';
      }

      const price = card.querySelector('.plan-price');
      if (price) price.style.color = premium ? '#2468e8' : '#0b1729';

      const monthlyPoint = card.querySelector('.plan-feature-monthly strong');
      if (monthlyPoint) monthlyPoint.style.color = '#2468e8';

      card.querySelectorAll('.plan-feature').forEach((feature) => {
        feature.style.background = '#fff';
        feature.style.borderColor = '#d3deeb';
      });

      const cta = card.querySelector('.plan-cta');
      if (cta) {
        cta.style.background = premium ? '#2468e8' : '#07111f';
        cta.style.color = '#fff';
      }
    });
  }

  function cleanAndFix() {
    removeLegacyScenes();
    fixPlanReadability();
    document.documentElement.classList.add('membership-clean-stage');
    return true;
  }

  function init() {
    cleanAndFix();

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      cleanAndFix();
      if (tries >= 24) window.clearInterval(timer);
    }, 180);

    const plans = document.getElementById('plans');
    if (plans && typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(() => fixPlanReadability());
      observer.observe(plans, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

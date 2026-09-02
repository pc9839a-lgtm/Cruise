(() => {
  'use strict';

  function force(el, prop, value) {
    if (el) el.style.setProperty(prop, value, 'important');
  }

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

    force(root, 'background', '#07111f');
    force(root, 'color', '#fff');

    const headTitle = root.querySelector('.membership-section-head h2');
    const headCopy = root.querySelector('.membership-section-head p');
    force(headTitle, 'color', '#fff');
    force(headCopy, 'color', 'rgba(255,255,255,.78)');

    root.querySelectorAll('.plan-card').forEach((card, index) => {
      const premium = index === 1 || card.classList.contains('recommended');
      force(card, 'background', premium ? '#edf4ff' : '#ffffff');
      force(card, 'color', '#0b1729');
      force(card, 'border-color', premium ? '#8eb4ff' : '#d3deeb');
      force(card, 'box-shadow', 'none');

      card.querySelectorAll('*').forEach((el) => {
        if (!el.closest('.plan-cta')) force(el, 'color', '#0b1729');
        force(el, 'opacity', '1');
      });

      card.querySelectorAll('.plan-fit,.plan-stat .label,.plan-mini-label,.plan-mobile-line em').forEach((el) => {
        force(el, 'color', '#53657c');
      });

      const tag = card.querySelector('.plan-tag');
      force(tag, 'color', premium ? '#1657d8' : '#24519c');
      force(tag, 'background', premium ? '#dce9ff' : '#edf3fb');

      const price = card.querySelector('.plan-price');
      force(price, 'color', premium ? '#2468e8' : '#0b1729');

      const monthlyPoint = card.querySelector('.plan-feature-monthly strong');
      force(monthlyPoint, 'color', '#2468e8');

      card.querySelectorAll('.plan-feature').forEach((feature) => {
        force(feature, 'background', '#fff');
        force(feature, 'border-color', '#d3deeb');
      });

      const cta = card.querySelector('.plan-cta');
      force(cta, 'background', premium ? '#2468e8' : '#07111f');
      force(cta, 'color', '#fff');
      if (cta) cta.querySelectorAll('*').forEach((el) => force(el, 'color', '#fff'));
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

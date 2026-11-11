(() => {
  'use strict';

  // Remove obsolete sections, without writing layout or typography into inline styles.
  const legacyIds = [
    'm3-savings-use', 'm3-selector', 'mx-direct-booking-saving',
    'points-by-time', 'mx-use-rules', 'mx-fit-check',
    'mx-plan-guide', 'mx-final-choice', 'real-cost'
  ];

  function cleanLegacy() {
    legacyIds.forEach((id) => document.getElementById(id)?.remove());
    document.querySelectorAll('.page-glow,.m-motion-orbit,.m-motion-rail')
      .forEach((element) => element.remove());
    document.documentElement.classList.add('membership-clean-stage');
  }

  function init() {
    cleanLegacy();
    // Other section scripts insert content after DOMContentLoaded.
    let queued = false;
    const observer = new MutationObserver((mutations) => {
      if (!mutations.some((m) => m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length))) return;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        cleanLegacy();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

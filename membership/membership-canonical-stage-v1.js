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

    // Only react when actual legacy sections are inserted, not on every
    // counter tick, image load or text mutation elsewhere on the page.
    const selectors = legacyIds.map((id) => '#' + id).join(',');
    const observer = new MutationObserver((changes) => {
      const legacyAdded = changes.some((change) =>
        [...change.addedNodes].some((node) =>
          node.nodeType === 1 &&
          (node.matches?.(selectors) || node.querySelector?.(selectors))
        )
      );
      if (legacyAdded) cleanLegacy();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => {
      observer.disconnect();
      cleanLegacy();
    }, 7000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

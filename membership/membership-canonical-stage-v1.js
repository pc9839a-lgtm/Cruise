(() => {
  'use strict';

  /*
   * The story is now owned by the section scripts + membership-canonical-v5.css.
   * Do not inject inline !important styles here and do not recreate removed sections.
   */
  function cleanLegacy() {
    [
      'm3-savings-use',
      'm3-selector',
      'mx-direct-booking-saving',
      'points-by-time',
      'mx-use-rules',
      'calculator',
      'mx-fit-check',
      'mx-plan-guide',
      'mx-final-choice'
    ].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.remove();
    });

    document.documentElement.classList.add('membership-clean-stage');
    return true;
  }

  function init() {
    cleanLegacy();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      cleanLegacy();
      if (tries >= 16) window.clearInterval(timer);
    }, 180);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

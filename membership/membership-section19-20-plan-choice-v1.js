(() => {
  'use strict';

  function removeSections19And20() {
    const section19 = document.getElementById('mx-plan-guide');
    const section20 = document.getElementById('m3-selector');
    if (section19) section19.remove();
    if (section20) section20.remove();
    return true;
  }

  function init() {
    removeSections19And20();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      removeSections19And20();
      if (tries >= 12) window.clearInterval(timer);
    }, 180);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

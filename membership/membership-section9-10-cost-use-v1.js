(() => {
  'use strict';

  function removeSections9And10() {
    const section9 = document.getElementById('mx-cost-structure');
    const section10 = document.getElementById('m3-savings-use');
    if (section9) section9.remove();
    if (section10) section10.remove();
    return true;
  }

  function init() {
    removeSections9And10();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      removeSections9And10();
      if (tries >= 12) window.clearInterval(timer);
    }, 180);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

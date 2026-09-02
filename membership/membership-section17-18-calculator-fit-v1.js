(() => {
  'use strict';

  function removeSections17And18() {
    const section17 = document.getElementById('calculator');
    const section18 = document.getElementById('mx-fit-check');
    if (!section17 && !section18) return true;
    if (section17) section17.remove();
    if (section18) section18.remove();
    return true;
  }

  function init() {
    removeSections17And18();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      removeSections17And18();
      if (tries >= 12) window.clearInterval(timer);
    }, 180);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

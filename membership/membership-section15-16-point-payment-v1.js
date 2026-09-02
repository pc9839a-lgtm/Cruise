(() => {
  'use strict';

  function removeDuplicatePaymentScenes() {
    const section15 = document.getElementById('real-cost');
    const section16 = document.getElementById('mx-use-rules');
    const duplicatePointUse = document.getElementById('mx-point-use');

    if (section15) section15.remove();
    if (section16) section16.remove();
    if (duplicatePointUse) duplicatePointUse.remove();
    return true;
  }

  function init() {
    removeDuplicatePaymentScenes();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      removeDuplicatePaymentScenes();
      if (tries >= 14) window.clearInterval(timer);
    }, 180);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

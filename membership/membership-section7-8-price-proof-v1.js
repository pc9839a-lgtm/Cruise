(() => {
  'use strict';

  function cleanupLegacyPriceProof() {
    const duplicateReceipt = document.getElementById('mx-direct-booking-intro');
    if (duplicateReceipt) duplicateReceipt.remove();

    const legacySection7 = document.getElementById('price-compare');
    if (legacySection7) legacySection7.remove();

    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    // Section 08 is now rendered by #price-pain immediately after #impact-med.
    // Keep #same-cruise untouched because later legacy/runtime sections still use it as an anchor.
    const legacySection8 = document.getElementById('same-cruise');
    if (legacySection8) {
      legacySection8.removeAttribute('data-membership-section');
      legacySection8.classList.remove('mx8-point-use-proof');
    }

    return true;
  }

  function init() {
    cleanupLegacyPriceProof();
    [240, 700, 1400].forEach((ms) => window.setTimeout(cleanupLegacyPriceProof, ms));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

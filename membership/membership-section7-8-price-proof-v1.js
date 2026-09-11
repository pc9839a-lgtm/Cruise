(() => {
  'use strict';

  function buildSection8Compatibility() {
    const section6 = document.getElementById('price-pain');
    const section7Legacy = document.getElementById('price-compare');
    const section8 = document.getElementById('same-cruise');
    if (!section6 || !section8) return false;

    // Section 07 now lives at #impact-med immediately after section 06.
    // Remove only the previous duplicate booking-proof node if another runtime pass created it.
    const duplicateReceipt = document.getElementById('mx-direct-booking-intro');
    if (duplicateReceipt) duplicateReceipt.remove();
    if (section7Legacy) section7Legacy.remove();

    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.className = 'mx8-point-use-proof';
    section8.setAttribute('data-membership-section', '8');
    section8.innerHTML = `
      <div class="mv2-inner">
        <span class="mx8-overline">실제 결제</span>
        <h2 class="mx8-story-title">실제로는<br><strong>POINT와 CARD로 나눠 예약했습니다</strong></h2>

        <div class="mx8-payment-stack" aria-label="실제 POINT 사용과 카드 결제" style="margin-top:72px!important;">
          <div class="mx8-payment-line">
            <span>예약에 사용한 POINT</span>
            <strong class="mx8-value">1,805.84P</strong>
          </div>
          <div class="mx8-payment-line">
            <span>예약 당시 카드 결제</span>
            <strong class="mx8-value">$2,020.88</strong>
          </div>
        </div>

        <h2 class="mx8-bridge-question" style="margin-top:104px!important;">1,805.84P는<br><strong>어디서 생겼을까요?</strong></h2>
      </div>`;

    if (section6.nextElementSibling !== section8) {
      section6.insertAdjacentElement('afterend', section8);
    }

    return true;
  }

  function init() {
    if (buildSection8Compatibility()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection8Compatibility() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

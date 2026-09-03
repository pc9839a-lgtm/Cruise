(() => {
  'use strict';

  function buildSections7And8() {
    const section6 = document.getElementById('price-pain');
    const section7 = document.getElementById('price-compare');
    const section8 = document.getElementById('same-cruise');
    if (!section6 || !section8) return false;

    let receipt = document.getElementById('mx-direct-booking-intro');
    if (!receipt) {
      receipt = document.createElement('section');
      receipt.id = 'mx-direct-booking-intro';
    }

    receipt.className = 'mx7-intro-section';
    receipt.setAttribute('data-membership-section', '7');
    receipt.innerHTML = `
      <div class="mx7-wide-inner">
        <span class="mx7-overline">실제 예약 영수증</span>
        <h2>말로만 싸다고 하면<br><strong>믿기 어렵습니다</strong></h2>

        <div class="mx7-receipt-proof" aria-label="MSC World Asia 실제 예약 정보">
          <div class="mx7-receipt-top">
            <strong>MSC World Asia · 2명</strong>
            <span>바르셀로나 출발 · 2027.01.01 → 2027.01.08</span>
          </div>
          <div class="mx7-receipt-route">
            <span>7박 서부 지중해 · Deluxe Balcony Fantastica BR2</span>
            <span>MSC Cruises · Cabin 11187</span>
          </div>
          <div class="mx7-receipt-breakdown">
            <div class="total"><span>예약 총액</span><strong>$3,887.35</strong></div>
            <div><span>여행 기간</span><strong>7박 8일</strong></div>
            <div><span>예약 인원</span><strong>2명</strong></div>
          </div>
          <p class="mx7-receipt-note">그런데 이 금액을 전부 카드로 낸 게 아닙니다.</p>
        </div>
      </div>`;

    if (section7) section7.remove();
    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.className = 'mx8-point-use-proof';
    section8.setAttribute('data-membership-section', '8');
    section8.innerHTML = `
      <div class="mv2-inner">
        <div class="mx8-payment-stack" aria-label="실제 POINT 사용과 카드 결제">
          <div class="mx8-payment-line">
            <span>실제 예약에서 사용한 POINT</span>
            <strong class="mx8-value">1,805.84P</strong>
          </div>
          <div class="mx8-payment-line">
            <span>예약 당시 카드 결제</span>
            <strong class="mx8-value">$2,020.88</strong>
          </div>
        </div>
        <h2 class="mx8-bridge-question">그런데 이 POINT는<br><strong>어디서 생겼을까요?</strong></h2>
      </div>`;

    if (section6.nextElementSibling !== receipt) section6.insertAdjacentElement('afterend', receipt);
    if (receipt.nextElementSibling !== section8) receipt.insertAdjacentElement('afterend', section8);

    return true;
  }

  function init() {
    if (buildSections7And8()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections7And8() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

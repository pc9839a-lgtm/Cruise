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
      receipt.className = 'mx7-intro-section';
    }

    receipt.setAttribute('data-membership-section', '7');
    receipt.innerHTML = `
      <div class="mx7-wide-inner">
        <span class="mx7-overline">실제 예약 영수증</span>
        <h2>패키지 2인 약 890만원<br><strong>저는 실제로 이렇게 냈습니다</strong></h2>

        <div class="mx7-receipt-proof" aria-label="MSC World Asia 서부 지중해 실제 지출 계산">
          <div class="mx7-receipt-top">
            <strong>MSC World Asia</strong>
            <span>바르셀로나 출발 7박 서부 지중해 · 2명</span>
          </div>
          <div class="mx7-receipt-route">
            <span>2027.01.01 → 2027.01.08</span>
            <span>Deluxe Balcony Fantastica · BR2</span>
          </div>
          <div class="mx7-receipt-breakdown mx7-cash-breakdown">
            <div><span>POINT 준비 비용</span><strong>$1,000</strong></div>
            <div><span>예약 시 카드 결제</span><strong>$2,020.88</strong></div>
            <div class="total"><span>카드 + POINT 준비 비용</span><strong>$3,020.88</strong></div>
          </div>
          <p class="mx7-receipt-note">CLASSIC 가입 $200 → 350P + 월 $100 × 8개월 → 1,600P · 총 1,950P 적립 · 1,805.84P 사용 · 144.16P 잔여</p>
        </div>
      </div>`;

    if (section7) section7.remove();
    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.className = 'mx8-same-cruise-proof';
    section8.setAttribute('data-membership-section', '8');
    section8.innerHTML = `
      <div class="mv2-inner">
        <span class="mx8-overline">실제 예약 확인</span>
        <h2 class="mx8-title">싼 배를 고른 게 아닙니다<br><strong>예약 방식만 바꿨습니다</strong></h2>
        <p class="mx8-proof-copy">MSC World Asia · 바르셀로나 출발 7박 서부 지중해 · Deluxe Balcony Fantastica BR2 · 2인 실제 예약</p>
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

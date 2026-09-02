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
        <span class="mx7-overline">MY MEDITERRANEAN RECEIPT</span>
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
            <div><span>POINT를 모으는 데 낸 금액</span><strong>$902.92</strong></div>
            <div><span>예약할 때 카드 결제</span><strong>$2,020.88</strong></div>
            <div class="total"><span>내가 실제로 낸 금액</span><strong>$2,923.80</strong></div>
          </div>
          <p class="mx7-receipt-note">1,805.84P 사용 · POINT는 월 결제액 대비 2배 적립 기준으로 계산 · 영수증 처리 수수료 $60.63</p>
        </div>
      </div>`;

    if (section7) section7.remove();
    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.className = 'mv2-section dark mx8-same-cruise-proof';
    section8.setAttribute('data-membership-section', '8');
    section8.innerHTML = `
      <div class="mv2-inner">
        <span class="mv2-kicker">싼 배를 고른 게 아닙니다</span>
        <h2 class="mv2-title">바뀐 건<br><strong>예약 방식입니다</strong></h2>
        <div class="mv2-four mx8-proof-lines" aria-label="실제 예약 내용">
          <div>MSC World Asia</div>
          <div>바르셀로나 출발 7박 서부 지중해</div>
          <div>Deluxe Balcony Fantastica · BR2</div>
          <div>2인 실제 예약</div>
        </div>
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

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
        <span class="mx7-overline">실제 예약 예시</span>
        <h2>MSC World Asia<br><strong>2인 실제 예약</strong></h2>

        <div class="mx7-receipt-proof" aria-label="MSC World Asia 실제 예약 정보" style="text-align:center!important;">
          <div class="mx7-receipt-top" style="text-align:center!important;">
            <strong style="font-size:clamp(26px,2.7vw,38px)!important;">바르셀로나 출발 · 7박 8일</strong>
            <span style="font-size:17px!important;">2027.01.01 → 2027.01.08 · 서부 지중해 · 발코니 객실</span>
          </div>

          <div class="mx7-receipt-breakdown" style="display:block!important;">
            <div class="total mx7-total-proof" style="border:0!important;text-align:center!important;padding:38px 8px 34px!important;">
              <span style="font-size:16px!important;">예약 총액</span>
              <strong style="font-size:clamp(72px,8vw,116px)!important;line-height:.95!important;letter-spacing:-.055em!important;">$3,887.35</strong>
              <small style="display:block!important;margin-top:16px!important;font-size:18px!important;color:#c5d0dc!important;font-weight:850!important;">7박 8일 · 2명</small>
            </div>
          </div>

          <p class="mx7-receipt-note mx7-bridge" style="padding:30px 8px 8px!important;border-top:1px solid #2a3a4f!important;font-size:clamp(25px,2.7vw,38px)!important;line-height:1.28!important;color:#fff!important;font-weight:950!important;">
            그런데 이 금액을<br><strong style="color:#86d4ff!important;">전부 카드로 낸 게 아닙니다</strong>
          </p>
        </div>
      </div>`;

    if (section7) section7.remove();
    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.className = 'mx8-point-use-proof';
    section8.setAttribute('data-membership-section', '8');
    section8.innerHTML = `
      <div class="mv2-inner">
        <span class="mx8-overline">실제 결제 구조</span>
        <h2 class="mx8-story-title">실제로는<br><strong>POINT와 CARD로 나눠 예약했습니다</strong></h2>

        <div class="mx8-payment-stack" aria-label="실제 POINT 사용과 카드 결제">
          <div class="mx8-payment-line">
            <span>예약에 사용한 POINT</span>
            <strong class="mx8-value">1,805.84P</strong>
          </div>
          <div class="mx8-payment-line">
            <span>예약 당시 카드 결제</span>
            <strong class="mx8-value">$2,020.88</strong>
          </div>
        </div>

        <p class="mx8-question-lead" style="margin:62px auto 0!important;font-size:20px!important;line-height:1.5!important;color:#9fb0c4!important;font-weight:900!important;">여기서 가장 궁금한 건 하나입니다</p>
        <h2 class="mx8-bridge-question" style="margin-top:18px!important;">그럼 1,805.84P는<br><strong>어디서 생겼을까요?</strong></h2>
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

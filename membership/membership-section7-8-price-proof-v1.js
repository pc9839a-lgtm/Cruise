(() => {
  'use strict';

  function buildSections7And8() {
    const section6 = document.getElementById('member-story-difference');
    const section7 = document.getElementById('price-compare');
    const section8 = document.getElementById('same-cruise');
    if (!section6 || !section8) return false;

    let receipt = document.getElementById('member-story-cost');
    if (!receipt) {
      receipt = document.createElement('section');
      receipt.id = 'member-story-cost';
    }

    receipt.className = 'member-story-scene member-story-savings';
    receipt.setAttribute('data-membership-section', '7');
    receipt.innerHTML = `
      <div class="member-story-frame member-story-storyline">
        <h2>같은 $2,000짜리 크루즈라면,<br /><strong>실제 부담은 얼마나 달라질까요?</strong></h2>
        <p>클래식으로 포인트를 모아 일반 예약에 사용하는 경우를 가정해 보겠습니다.</p>

        <div class="member-story-cost-compare" aria-label="동일 크루즈 기본요금 대비 포인트 활용 누적 지출 예시">
          <div class="member-story-cost-row">
            <span>일반 예약 기본요금</span><strong>$2,000</strong>
          </div>
          <div class="member-story-cost-row member-story-cost-benefit">
            <span>포인트 활용 시 누적 지출 예시</span><strong>$1,600</strong>
          </div>
          <div class="member-story-cost-difference">
            <span>동일 기본요금 가정의 차이</span><strong>$400</strong>
          </div>
        </div>

        <h3>그럼 $1,600은 어떻게 계산됐을까요?</h3>
        <div class="member-story-cost-breakdown" aria-label="멤버십 납부와 예약 카드 결제를 합친 계산 근거">
          <div><span>첫 결제 $200</span><strong>350P 적립</strong></div>
          <div><span>이후 월 $100 × 4회</span><strong>800P 적립</strong></div>
          <div><span>총 1,150P 중 예약에 사용</span><strong>1,000P</strong></div>
          <div><span>예약 당시 추가 카드 결제</span><strong>$1,000</strong></div>
        </div>
        <div class="member-story-cost-total">
          <span>첫 결제·월 납부 누적 $600 + 예약 카드 결제 $1,000</span>
          <strong>총 누적 지출 $1,600</strong>
        </div>
        <p class="member-story-cost-note">클래식 신규 가입·기존 보유 포인트 0P·정상 적립·일반 예약을 가정한 계산입니다. 남은 150P는 별도이며, 실제 이용 가능 포인트, 항차별 요금, 세금·수수료·추가 비용에 따라 차이가 달라집니다. 모든 예약에서 $400을 할인받는다는 뜻이 아닙니다.</p>
        <p class="member-story-cost-bridge">그렇다면 포인트를 실제 예약에도 사용할 수 있을까요?</p>
      </div>`;

    if (section7) section7.remove();
    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.className = 'mx8-point-use-proof';
    section8.setAttribute('data-membership-section', '8');
    section8.innerHTML = `
      <div class="mv2-inner">
        <span class="mx8-overline">실제 결제</span>
        <h2 class="mx8-story-title">실제 크루즈 예약에서는<br><strong>POINT와 카드 결제를 함께 사용했습니다.</strong></h2>
        <div class="mx8-real-total"><span>MSC World Asia · 2인 · 7박 8일</span><strong>예약 총액 $3,887.35</strong></div>

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
        <div class="mx8-cash-recap" aria-label="실제 현금 지출 합계">
          <span>포인트 적립 납부액과 예약 카드 결제 합계</span>
          <strong>$3,020.88</strong>
          <p>POINT 적립을 위해 낸 $1,000 + 예약 당시 카드 결제 $2,020.88</p>
          <small>처리 수수료 $60.63 별도 · 실제 예약 한 건의 사례</small>
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

(() => {
  'use strict';

  function ensureSection(id, className) {
    let section = document.getElementById(id);
    if (!section) {
      section = document.createElement('section');
      section.id = id;
    }
    section.className = className;
    return section;
  }

  function buildSections14To16() {
    const pointExample = document.getElementById('mx-point-example');
    const calculator = document.getElementById('calculator');
    if (!pointExample || !calculator) return false;

    ['real-cost', 'mx-use-rules', 'mx-point-use'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    const cash = ensureSection('mx-actual-cash', 'mx14-cash-section');
    cash.setAttribute('data-membership-section', '14');
    cash.innerHTML = `
      <div class="mx14-inner">
        <span class="mx14-kicker">그래서 실제로 낸 돈</span>
        <h2>POINT를 모은 비용과<br><strong>예약 카드 결제를 더하면</strong></h2>

        <div class="mx14-equation" aria-label="실제 현금 부담 계산">
          <div><span>POINT를 모으는 데</span><strong>$1,000</strong></div>
          <i>+</i>
          <div><span>예약 시 카드 결제</span><strong>$2,020.88</strong></div>
          <i>=</i>
          <div class="total"><span>실제 현금 부담</span><strong>$3,020.88</strong></div>
        </div>
      </div>`;

    const proof = ensureSection('mx-booking-proof', 'mx15-proof-section');
    proof.setAttribute('data-membership-section', '15');
    proof.innerHTML = `
      <div class="mx15-inner">
        <span class="mx15-kicker">혹시 싼 배를 고른 거 아닐까?</span>
        <h2>싼 배를 고른 게 아닙니다<br><strong>예약하는 방법이 달라진 겁니다</strong></h2>

        <div class="mx15-proof-list" aria-label="실제 예약 조건">
          <div><span>크루즈</span><strong>MSC World Asia</strong></div>
          <div><span>일정</span><strong>바르셀로나 출발 · 7박 서부 지중해</strong></div>
          <div><span>객실</span><strong>Deluxe Balcony Fantastica · BR2</strong></div>
          <div><span>예약</span><strong>2인 실제 예약</strong></div>
        </div>
      </div>`;

    const guide = ensureSection('mx-guide-assist', 'mx16-guide-section');
    guide.setAttribute('data-membership-section', '16');
    guide.innerHTML = `
      <div class="mx16-inner">
        <span class="mx16-kicker">크루즈 처음인데 혼자 갈 수 있을까?</span>
        <h2>처음이라 걱정된다면<br><strong>함께 출발하는 일정도 선택할 수 있습니다</strong></h2>

        <div class="mx16-flow" aria-label="함께 가는 일정 예시">
          <strong>항구 도착</strong><i>→</i><strong>승선</strong><i>→</i><strong>기항지 여행</strong><i>→</i><strong>복귀</strong>
        </div>
      </div>`;

    if (pointExample.nextElementSibling !== cash) pointExample.insertAdjacentElement('afterend', cash);
    if (cash.nextElementSibling !== proof) cash.insertAdjacentElement('afterend', proof);
    if (proof.nextElementSibling !== guide) proof.insertAdjacentElement('afterend', guide);
    if (guide.nextElementSibling !== calculator) guide.insertAdjacentElement('afterend', calculator);

    return true;
  }

  function init() {
    if (buildSections14To16()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections14To16() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

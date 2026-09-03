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

  function applyCashSplitStyles() {
    const total = document.getElementById('mx-actual-cash-total');
    if (!total) return;
    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const inner = total.querySelector('.mx14-total-inner');
    const lead = total.querySelector('.mx14-total-lead');
    const value = total.querySelector('.mx14-total-value');
    const note = total.querySelector('.mx14-total-note');

    total.style.setProperty('padding', mobile ? '96px 0 116px' : '150px 0 170px');
    if (inner) inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(1180px,calc(100% - 64px))');
    if (lead) lead.style.setProperty('font-size', mobile ? '21px' : 'clamp(24px,2.4vw,34px)');
    if (value) value.style.setProperty('font-size', mobile ? 'clamp(56px,16vw,76px)' : 'clamp(88px,10vw,154px)');
    if (note) note.style.setProperty('font-size', mobile ? '13px' : '16px');
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
        <span class="mx14-kicker">실제 예약 결과</span>
        <h2>실제로 나간 돈을<br><strong>두 개로 나눠보면</strong></h2>

        <div class="mx14-equation" aria-label="실제 현금 부담 구성" style="grid-template-columns:1fr auto 1fr!important;max-width:860px!important;">
          <div><span>POINT를 만들기 위해 낸 금액</span><strong>$1,000</strong></div>
          <i>+</i>
          <div><span>예약 당시 카드 결제</span><strong>$2,020.88</strong></div>
        </div>
      </div>`;

    const cashTotal = ensureSection('mx-actual-cash-total', 'mx14-total-section');
    cashTotal.setAttribute('data-membership-section', '14.5');
    cashTotal.setAttribute('style', 'box-sizing:border-box;width:100%;margin:0;padding:150px 0 170px;background:#07111f;color:#fff;text-align:center;overflow:hidden;font-family:Pretendard,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;');
    cashTotal.innerHTML = `
      <div class="mx14-total-inner" style="box-sizing:border-box;width:min(1180px,calc(100% - 64px));margin:0 auto;">
        <p class="mx14-total-lead" style="margin:0;font-size:clamp(24px,2.4vw,34px);line-height:1.35;font-weight:900;color:#c8d3df;">그래서 제가 실제로 부담한 금액은</p>
        <div class="mx14-total-value" style="margin:28px auto 0;font-size:clamp(88px,10vw,154px);line-height:.94;letter-spacing:-.06em;font-weight:950;color:#86d4ff;">$3,020.88</div>
        <p class="mx14-total-note" style="margin:30px auto 0;font-size:16px;line-height:1.5;font-weight:800;color:#8fa0b4;">처리 수수료 $60.63 별도</p>
      </div>`;

    const proof = ensureSection('mx-booking-proof', 'mx15-proof-section');
    proof.setAttribute('data-membership-section', '15');
    proof.innerHTML = `
      <div class="mx15-inner">
        <h2 class="mx15-question">혹시<br><strong>싼 배를 고른 거 아닐까?</strong></h2>
        <div class="mx15-answer">아닙니다</div>

        <div class="mx15-proof-list" aria-label="실제 예약 조건">
          <div><span>크루즈</span><strong>MSC World Asia</strong></div>
          <div><span>일정</span><strong>바르셀로나 출발 · 7박 서부 지중해</strong></div>
          <div><span>객실</span><strong>Deluxe Balcony Fantastica · BR2</strong></div>
          <div><span>예약</span><strong>2인 실제 예약</strong></div>
        </div>
        <p class="mx15-closing">바뀐 건 크루즈가 아니라<br><strong>예약하는 방법입니다</strong></p>
      </div>`;

    const guide = ensureSection('mx-guide-assist', 'mx16-guide-section mx-bridge-section');
    guide.setAttribute('data-membership-section', '16');
    guide.innerHTML = `
      <div class="mx16-inner">
        <h2 class="mx16-bridge-question">크루즈 처음인데<br><strong>혼자 갈 수 있을까?</strong></h2>
        <div class="mx16-answer">혼자 갈 필요도 없습니다</div>
        <p class="mx16-support">처음이라 걱정된다면 <strong>함께 출발하는 일정</strong>도 선택할 수 있습니다.</p>

        <div class="mx16-flow" aria-label="함께 가는 일정 예시">
          <strong>항구 도착</strong><i>→</i><strong>승선</strong><i>→</i><strong>기항지 여행</strong><i>→</i><strong>복귀</strong>
        </div>
      </div>`;

    if (pointExample.nextElementSibling !== cash) pointExample.insertAdjacentElement('afterend', cash);
    if (cash.nextElementSibling !== cashTotal) cash.insertAdjacentElement('afterend', cashTotal);
    if (cashTotal.nextElementSibling !== proof) cashTotal.insertAdjacentElement('afterend', proof);
    if (proof.nextElementSibling !== guide) proof.insertAdjacentElement('afterend', guide);
    if (guide.nextElementSibling !== calculator) guide.insertAdjacentElement('afterend', calculator);

    applyCashSplitStyles();
    if (cashTotal.dataset.splitResizeBound !== '1') {
      cashTotal.dataset.splitResizeBound = '1';
      window.addEventListener('resize', applyCashSplitStyles, { passive: true });
    }

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

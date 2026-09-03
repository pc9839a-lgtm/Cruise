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

  function buildSections18To20() {
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    if (!calculator || !plans) return false;

    ['mx-plan-guide', 'm3-selector', 'mx-fit-check'].forEach((id) => {
      const old = document.getElementById(id);
      if (old) old.remove();
    });

    const optional = ensureSection('mx-membership-optional', 'mx18-optional-section mx-core-bridge');
    optional.setAttribute('data-membership-section', '18');
    optional.innerHTML = `
      <div class="mx18-inner">
        <h2 class="mx18-bridge-question">꼭<br><strong>회원이어야 하나요?</strong></h2>
        <p class="mx18-answer">크루즈 여행 자체는<br><strong>회원이 아니어도 가능합니다</strong></p>
      </div>`;

    const memberBenefits = ensureSection('mx-member-booking-benefits', 'mx18-benefit-section');
    memberBenefits.setAttribute('data-membership-section', '18.5');
    memberBenefits.setAttribute('style', 'box-sizing:border-box;width:100%;margin:0;padding:150px 0 170px;background:#10284a;color:#fff;text-align:center;overflow:hidden;font-family:Pretendard,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;');
    memberBenefits.innerHTML = `
      <div class="mx18-benefit-inner" style="box-sizing:border-box;width:min(1180px,calc(100% - 64px));margin:0 auto;">
        <p class="mx18-benefit-lead" style="margin:0;font-size:clamp(24px,2.5vw,36px);line-height:1.35;font-weight:900;color:#c8d7e9;">하지만 회원이 되면</p>
        <h2 class="mx18-benefit-title" style="max-width:940px;margin:22px auto 0;font-size:clamp(54px,5.5vw,82px);line-height:1.08;letter-spacing:-.05em;font-weight:950;word-break:keep-all;">예약 방법이<br><strong style="color:#86d4ff;">달라집니다</strong></h2>
        <div class="mx18-benefit-stack" aria-label="회원 예약 핵심 혜택" style="display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;width:min(940px,100%);margin:52px auto 0;padding:28px 0;border-block:1px solid #345273;">
          <strong style="font-size:clamp(24px,2.4vw,34px);color:#86d4ff;">POINT 적립</strong>
          <i style="font-style:normal;font-size:22px;color:#70849c;">+</i>
          <strong style="font-size:clamp(24px,2.4vw,34px);color:#86d4ff;">회원 예약</strong>
          <i style="font-style:normal;font-size:22px;color:#70849c;">+</i>
          <strong style="font-size:clamp(24px,2.4vw,34px);color:#86d4ff;">전세계 최저가 보장</strong>
        </div>
        <p class="mx18-benefit-closing" style="margin:46px auto 0;font-size:clamp(28px,3vw,42px);line-height:1.35;font-weight:900;color:#fff;">이 예약 구조를 이용하려면<br><strong>클럽 회원이어야 합니다</strong></p>
      </div>`;

    const early = ensureSection('mx-start-early', 'mx19-early-section mx-core-bridge');
    early.setAttribute('data-membership-section', '19');
    early.innerHTML = `
      <div class="mx19-inner">
        <h2 class="mx19-bridge-question">왜<br><strong>미리 시작하나요?</strong></h2>
        <p class="mx19-answer">여행을 예약할 때가 아니라<br><strong>가기 전부터 POINT를 쌓기 때문입니다</strong></p>
        <div class="mx19-timeline" aria-label="CLASSIC 포인트 적립 예시">
          <div><span>가입</span><strong>350P</strong></div>
          <div><span>3개월</span><strong>950P</strong></div>
          <div><span>6개월</span><strong>1,550P</strong></div>
          <div><span>12개월</span><strong>2,750P</strong></div>
        </div>
        <p class="mx19-closing">시간이 지나면<br><strong>POINT가 쌓입니다</strong></p>
        <p class="mx19-note">CLASSIC 가입 350P + 매월 200P 기준</p>
      </div>`;

    plans.setAttribute('data-membership-section', '20');
    const kicker = plans.querySelector('.section-kicker');
    const title = plans.querySelector('.membership-section-head h2');
    if (kicker) kicker.textContent = '마지막 선택';
    if (title) title.innerHTML = '그럼 나는<br><strong>얼마씩 쌓을까?</strong>';

    if (calculator.nextElementSibling !== optional) calculator.insertAdjacentElement('afterend', optional);
    if (optional.nextElementSibling !== memberBenefits) optional.insertAdjacentElement('afterend', memberBenefits);
    if (memberBenefits.nextElementSibling !== early) memberBenefits.insertAdjacentElement('afterend', early);
    if (early.nextElementSibling !== plans) early.insertAdjacentElement('afterend', plans);

    return true;
  }

  function init() {
    if (buildSections18To20()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections18To20() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

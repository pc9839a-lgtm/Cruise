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

  function applyLateFlowStyles() {
    const mobile = window.matchMedia('(max-width: 780px)').matches;

    const benefit = document.getElementById('mx-member-booking-benefits');
    if (benefit) {
      const inner = benefit.querySelector('.mx18-benefit-inner');
      const lead = benefit.querySelector('.mx18-benefit-lead');
      const title = benefit.querySelector('.mx18-benefit-title');
      const stack = benefit.querySelector('.mx18-benefit-stack');
      const closing = benefit.querySelector('.mx18-benefit-closing');
      benefit.style.setProperty('padding', mobile ? '110px 0 132px' : '154px 0 188px');
      if (inner) inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(1180px,calc(100% - 64px))');
      if (lead) lead.style.setProperty('font-size', mobile ? '22px' : 'clamp(26px,2.5vw,38px)');
      if (title) title.style.setProperty('font-size', mobile ? 'clamp(44px,12vw,58px)' : 'clamp(58px,5.8vw,86px)');
      if (stack) {
        stack.style.setProperty('display', mobile ? 'grid' : 'flex');
        stack.style.setProperty('grid-template-columns', mobile ? '1fr' : 'none');
        stack.style.setProperty('gap', mobile ? '14px' : '20px');
        stack.querySelectorAll('strong').forEach((el) => el.style.setProperty('font-size', mobile ? '24px' : 'clamp(26px,2.5vw,36px)'));
        stack.querySelectorAll('i').forEach((el) => el.style.setProperty('font-size', mobile ? '18px' : '22px'));
      }
      if (closing) closing.style.setProperty('font-size', mobile ? 'clamp(27px,7.4vw,35px)' : 'clamp(30px,3vw,44px)');
    }

    const early = document.getElementById('mx-start-early');
    if (early) {
      early.style.setProperty('box-sizing','border-box');
      early.style.setProperty('width','100%');
      early.style.setProperty('min-height', mobile ? '76svh' : '88svh');
      early.style.setProperty('padding', mobile ? '106px 0 128px' : '150px 0 190px');
      early.style.setProperty('display','flex');
      early.style.setProperty('align-items','center');
      early.style.setProperty('background','#edf2f8');
      early.style.setProperty('text-align','center');
      const inner = early.querySelector('.mx19-inner');
      const q = early.querySelector('.mx19-bridge-question');
      const a = early.querySelector('.mx19-answer');
      if (inner) {
        inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(1180px,calc(100% - 64px))');
        inner.style.setProperty('margin','0 auto');
      }
      if (q) {
        q.style.setProperty('margin','0 auto');
        q.style.setProperty('font-size', mobile ? 'clamp(46px,13vw,60px)' : 'clamp(72px,7vw,96px)');
        q.style.setProperty('line-height','1.04');
        q.style.setProperty('font-weight','950');
      }
      if (a) {
        a.style.setProperty('margin', mobile ? '42px auto 0' : '58px auto 0');
        a.style.setProperty('font-size', mobile ? 'clamp(30px,8.2vw,39px)' : 'clamp(40px,4.3vw,62px)');
        a.style.setProperty('line-height','1.14');
        a.style.setProperty('font-weight','950');
      }
    }

    const proof = document.getElementById('mx-start-early-proof');
    if (proof) {
      proof.style.setProperty('box-sizing','border-box');
      proof.style.setProperty('width','100%');
      proof.style.setProperty('padding', mobile ? '104px 0 132px' : '144px 0 188px');
      proof.style.setProperty('background','#fff');
      proof.style.setProperty('color','#0b1729');
      proof.style.setProperty('text-align','center');
      const inner = proof.querySelector('.mx19-proof-inner');
      const lead = proof.querySelector('.mx19-proof-lead');
      const timeline = proof.querySelector('.mx19-timeline');
      const closing = proof.querySelector('.mx19-closing');
      const note = proof.querySelector('.mx19-note');
      if (inner) {
        inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(980px,calc(100% - 64px))');
        inner.style.setProperty('margin','0 auto');
      }
      if (lead) {
        lead.style.setProperty('margin','0 auto');
        lead.style.setProperty('font-size', mobile ? 'clamp(31px,8vw,40px)' : 'clamp(42px,4.5vw,64px)');
        lead.style.setProperty('line-height','1.12');
        lead.style.setProperty('font-weight','950');
      }
      if (timeline) {
        timeline.style.setProperty('display','grid');
        timeline.style.setProperty('grid-template-columns', mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)');
        timeline.style.setProperty('margin', mobile ? '44px auto 0' : '58px auto 0');
        timeline.style.setProperty('border-block','1px solid #cbd6e3');
        timeline.querySelectorAll('div').forEach((cell) => {
          cell.style.setProperty('padding', mobile ? '22px 8px' : '28px 12px');
          cell.style.setProperty('border-right','1px solid #cbd6e3');
        });
        timeline.querySelectorAll('span').forEach((el) => el.style.setProperty('font-size', mobile ? '16px' : '18px'));
        timeline.querySelectorAll('strong').forEach((el) => {
          el.style.setProperty('display','block');
          el.style.setProperty('margin-top','9px');
          el.style.setProperty('font-size', mobile ? 'clamp(34px,9vw,44px)' : 'clamp(42px,4vw,58px)');
          el.style.setProperty('color','#2468e8');
        });
      }
      if (closing) {
        closing.style.setProperty('margin', mobile ? '46px auto 0' : '58px auto 0');
        closing.style.setProperty('font-size', mobile ? 'clamp(28px,7.5vw,36px)' : 'clamp(34px,3.6vw,50px)');
        closing.style.setProperty('line-height','1.25');
        closing.style.setProperty('font-weight','900');
      }
      if (note) {
        note.style.setProperty('margin','20px auto 0');
        note.style.setProperty('font-size', mobile ? '15px' : '17px');
        note.style.setProperty('line-height','1.5');
      }
    }
  }

  function buildSections18To20() {
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    if (!calculator || !plans) return false;

    ['mx-plan-guide','m3-selector','mx-fit-check'].forEach((id) => document.getElementById(id)?.remove());

    const optional = ensureSection('mx-membership-optional','mx18-optional-section mx-core-bridge');
    optional.setAttribute('data-membership-section','18');
    optional.innerHTML = `
      <div class="mx18-inner">
        <h2 class="mx18-bridge-question">꼭<br><strong>회원이어야 하나요?</strong></h2>
        <p class="mx18-answer">크루즈 여행 자체는<br><strong>회원이 아니어도 가능합니다</strong></p>
      </div>`;

    const memberBenefits = ensureSection('mx-member-booking-benefits','mx18-benefit-section');
    memberBenefits.setAttribute('data-membership-section','18.5');
    memberBenefits.setAttribute('style','box-sizing:border-box;width:100%;margin:0;background:#10284a;color:#fff;text-align:center;overflow:hidden;font-family:Pretendard,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;');
    memberBenefits.innerHTML = `
      <div class="mx18-benefit-inner" style="box-sizing:border-box;margin:0 auto;">
        <p class="mx18-benefit-lead" style="margin:0;line-height:1.35;font-weight:900;color:#c8d7e9;">하지만 회원이 되면</p>
        <h2 class="mx18-benefit-title" style="max-width:940px;margin:22px auto 0;line-height:1.08;letter-spacing:-.05em;font-weight:950;word-break:keep-all;">예약 방법이<br><strong style="color:#86d4ff;">달라집니다</strong></h2>
        <div class="mx18-benefit-stack" aria-label="회원 예약 핵심 혜택" style="align-items:center;justify-content:center;flex-wrap:wrap;width:min(940px,100%);margin:52px auto 0;padding:28px 0;border-block:1px solid #345273;">
          <strong style="color:#86d4ff;">POINT 적립</strong><i style="font-style:normal;color:#70849c;">+</i>
          <strong style="color:#86d4ff;">회원 예약</strong><i style="font-style:normal;color:#70849c;">+</i>
          <strong style="color:#86d4ff;">전세계 최저가 보장</strong>
        </div>
        <p class="mx18-benefit-closing" style="line-height:1.35;font-weight:900;color:#fff;">이 예약 구조를 이용하려면<br><strong>클럽 회원이어야 합니다</strong></p>
      </div>`;

    const early = ensureSection('mx-start-early','mx19-early-section mx-core-bridge');
    early.setAttribute('data-membership-section','19');
    early.innerHTML = `
      <div class="mx19-inner">
        <h2 class="mx19-bridge-question">왜<br><strong>미리 시작하나요?</strong></h2>
        <p class="mx19-answer">여행을 예약할 때가 아니라<br><strong>가기 전부터 POINT를 쌓기 때문입니다</strong></p>
      </div>`;

    const earlyProof = ensureSection('mx-start-early-proof','mx19-proof-section');
    earlyProof.setAttribute('data-membership-section','19.5');
    earlyProof.innerHTML = `
      <div class="mx19-proof-inner">
        <h2 class="mx19-proof-lead">미리 시작할수록<br><strong style="color:#2468e8;">쌓이는 POINT가 달라집니다</strong></h2>
        <div class="mx19-timeline" aria-label="CLASSIC 포인트 적립 예시">
          <div><span>가입</span><strong>350P</strong></div>
          <div><span>3개월</span><strong>950P</strong></div>
          <div><span>6개월</span><strong>1,550P</strong></div>
          <div><span>12개월</span><strong>2,750P</strong></div>
        </div>
        <p class="mx19-closing">시간이 지나면<br><strong style="color:#2468e8;">POINT가 쌓입니다</strong></p>
        <p class="mx19-note">CLASSIC 가입 350P + 매월 200P 기준</p>
      </div>`;

    plans.setAttribute('data-membership-section','20');
    const kicker = plans.querySelector('.section-kicker');
    const title = plans.querySelector('.membership-section-head h2');
    if (kicker) kicker.textContent = '마지막 선택';
    if (title) title.innerHTML = '그럼 나는<br><strong>얼마씩 쌓을까?</strong>';

    if (calculator.nextElementSibling !== optional) calculator.insertAdjacentElement('afterend', optional);
    if (optional.nextElementSibling !== memberBenefits) optional.insertAdjacentElement('afterend', memberBenefits);
    if (memberBenefits.nextElementSibling !== early) memberBenefits.insertAdjacentElement('afterend', early);
    if (early.nextElementSibling !== earlyProof) early.insertAdjacentElement('afterend', earlyProof);
    if (earlyProof.nextElementSibling !== plans) earlyProof.insertAdjacentElement('afterend', plans);

    applyLateFlowStyles();
    if (document.body.dataset.lateFlowResizeBound !== '1') {
      document.body.dataset.lateFlowResizeBound = '1';
      window.addEventListener('resize', applyLateFlowStyles, { passive:true });
    }
    return true;
  }

  function init() {
    if (buildSections18To20()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections18To20() || tries >= 45) window.clearInterval(timer);
    },160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

(() => {
  'use strict';

  function buildSections12And13() {
    const section11 = document.getElementById('mx-lowest-price');
    const section12 = document.getElementById('membership-point');
    if (!section11 || !section12) return false;

    section12.className = 'mx13-membership-section';
    section12.setAttribute('data-membership-section', '12');
    section12.innerHTML = `
      <div class="mx13-inner">
        <span class="mx13-kicker">회원이 되면</span>
        <h2 class="mx13-title">매달 결제한 금액보다<br><strong>더 많은 POINT가 쌓입니다</strong></h2>

        <div class="mx13-simple-list" aria-label="멤버십 월 적립">
          <div class="mx13-simple-row">
            <span>CLASSIC</span>
            <strong>$100 → 200P</strong>
          </div>
          <div class="mx13-simple-row premium">
            <span>PREMIUM</span>
            <strong>$250 → 500P</strong>
          </div>
        </div>

        <p class="mx13-start-note">첫 가입 · CLASSIC <b>$200 → 350P</b> / PREMIUM <b>$500 → 800P</b></p>
      </div>`;

    let section13 = document.getElementById('mx-point-example');
    if (!section13) {
      section13 = document.createElement('section');
      section13.id = 'mx-point-example';
    }

    section13.className = 'mx13-point-proof';
    section13.setAttribute('data-membership-section', '13');
    section13.innerHTML = `
      <div class="mxp13-inner">
        <span class="mxp13-kicker">제 실제 CLASSIC 적립</span>
        <h2>실제로 $1,000을 내고<br><strong>1,950P를 만들었습니다</strong></h2>

        <div class="mxp13-ledger" aria-label="CLASSIC 실제 포인트 적립 예시">
          <div><span>가입</span><strong>$200 → 350P</strong></div>
          <div><span>8개월</span><strong>$800 → 1,600P</strong></div>
          <div class="total"><span>총 납부</span><strong>$1,000</strong></div>
          <div class="total"><span>총 적립</span><strong>1,950P</strong></div>
          <div><span>예약에 사용</span><strong>1,805.84P</strong></div>
          <div><span>남은 POINT</span><strong>144.16P</strong></div>
        </div>
      </div>`;

    const oldTimeline = document.getElementById('points-by-time');
    if (oldTimeline) oldTimeline.remove();

    if (section11.nextElementSibling !== section12) section11.insertAdjacentElement('afterend', section12);
    if (section12.nextElementSibling !== section13) section12.insertAdjacentElement('afterend', section13);
    return true;
  }

  function init() {
    if (buildSections12And13()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections12And13() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

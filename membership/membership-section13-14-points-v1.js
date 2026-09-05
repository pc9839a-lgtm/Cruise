(() => {
  'use strict';


  function installPointDoubleStyles() {
    if (document.getElementById('mx13-double-style')) return;
    const style = document.createElement('style');
    style.id = 'mx13-double-style';
    style.textContent = `
      #membership-point .mx13-double{
        width:min(780px,100%);margin:48px auto 0;padding:34px 24px 30px;border-radius:28px;
        background:linear-gradient(135deg,#0e55d8,#2b7cff);color:#fff;box-shadow:0 22px 54px rgba(36,104,232,.24);
        text-align:center;
      }
      #membership-point .mx13-double span{display:block;font-size:14px;font-weight:900;letter-spacing:.16em;opacity:.82}
      #membership-point .mx13-double strong{display:block;margin-top:8px;font-size:clamp(76px,8vw,112px);line-height:.9;letter-spacing:-.06em;font-weight:950}
      #membership-point .mx13-simple-list{margin-top:28px!important}
      @media(max-width:780px){
        #membership-point .mx13-double{width:calc(100% - 34px);margin-top:36px;padding:28px 18px 24px;border-radius:24px}
        #membership-point .mx13-double strong{font-size:clamp(68px,21vw,92px)}
        #membership-point .mx13-simple-list{width:calc(100% - 34px)!important;margin-top:24px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function buildSections12And13() {
    const section11 = document.getElementById('mx-lowest-price');
    const section12 = document.getElementById('membership-point');
    if (!section11 || !section12) return false;

    section12.className = 'mx13-membership-section';
    section12.setAttribute('data-membership-section', '12');
    section12.innerHTML = `
      <div class="mx13-inner">
        <span class="mx13-kicker">MONTHLY POINT</span>
        <h2 class="mx13-title">매월 결제액의<br><strong>2배 POINT 적립</strong></h2>

        <div class="mx13-double" aria-label="포인트 2배 적립">
          <span>POINT</span>
          <strong>2X</strong>
        </div>

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
        <span class="mxp13-kicker">실제 CLASSIC 적립</span>
        <h2>$1,000 납부 후<br><strong>1,950P 적립</strong></h2>

        <div class="mxp13-ledger" aria-label="CLASSIC 실제 적립 결과">
          <div class="total"><span>실제 납부</span><strong>$1,000</strong></div>
          <div class="total"><span>총 적립</span><strong>1,950P</strong></div>
          <div><span>예약에 사용</span><strong>1,805.84P</strong></div>
        </div>
      </div>`;

    const oldTimeline = document.getElementById('points-by-time');
    if (oldTimeline) oldTimeline.remove();

    if (section11.nextElementSibling !== section12) section11.insertAdjacentElement('afterend', section12);
    if (section12.nextElementSibling !== section13) section12.insertAdjacentElement('afterend', section13);
    return true;
  }

  function init() {
    installPointDoubleStyles();
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

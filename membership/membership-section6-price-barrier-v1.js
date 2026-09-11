(() => {
  'use strict';

  function installSection8Styles() {
    if (document.getElementById('membership-v3-section08-style')) return;

    const style = document.createElement('style');
    style.id = 'membership-v3-section08-style';
    style.textContent = `
      #price-pain.membership-v3-point-use{
        position:relative!important;
        width:100%!important;
        margin:0!important;
        padding:132px 0 146px!important;
        overflow:hidden!important;
        background:
          radial-gradient(circle at 50% 16%,rgba(70,145,255,.18),transparent 40%),
          linear-gradient(180deg,#07111f 0%,#0a1b31 100%)!important;
        color:#fff!important;
        text-align:center!important;
      }
      #price-pain.membership-v3-point-use .mv2-inner{
        width:min(940px,calc(100% - 48px))!important;
        margin:0 auto!important;
      }
      #price-pain.membership-v3-point-use .membership-v3-section08-kicker{
        display:inline-block!important;
        margin:0 0 24px!important;
        color:#8ec7ff!important;
        font-size:15px!important;
        line-height:1!important;
        font-weight:900!important;
        letter-spacing:.04em!important;
      }
      #price-pain.membership-v3-point-use .membership-v3-section08-copy{
        margin:0 auto!important;
        color:#fff!important;
        font-size:clamp(34px,4vw,54px)!important;
        line-height:1.08!important;
        letter-spacing:-.055em!important;
        font-weight:950!important;
        word-break:keep-all!important;
      }
      #price-pain.membership-v3-point-use .mv2-mega{
        display:block!important;
        margin:46px auto 0!important;
        color:#8ec7ff!important;
        font-size:clamp(82px,10.5vw,142px)!important;
        line-height:.92!important;
        letter-spacing:-.07em!important;
        font-weight:950!important;
        white-space:nowrap!important;
      }
      #price-pain.membership-v3-point-use .membership-v3-section08-next{
        margin:42px auto 0!important;
        color:#d7e2ed!important;
        font-size:clamp(22px,2.5vw,30px)!important;
        line-height:1.35!important;
        font-weight:900!important;
        letter-spacing:-.04em!important;
      }
      @media(max-width:780px){
        #price-pain.membership-v3-point-use{padding:96px 0 112px!important}
        #price-pain.membership-v3-point-use .mv2-inner{width:calc(100% - 32px)!important}
        #price-pain.membership-v3-point-use .membership-v3-section08-kicker{margin-bottom:18px!important;font-size:12px!important}
        #price-pain.membership-v3-point-use .membership-v3-section08-copy{font-size:clamp(32px,9.8vw,44px)!important}
        #price-pain.membership-v3-point-use .mv2-mega{margin-top:34px!important;font-size:clamp(64px,18vw,88px)!important}
        #price-pain.membership-v3-point-use .membership-v3-section08-next{margin-top:32px!important;font-size:20px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function buildSection8() {
    const section7 = document.getElementById('impact-med');
    const pointSection = document.getElementById('price-pain');
    if (!section7 || !pointSection) return false;

    installSection8Styles();

    pointSection.className = 'mx6-price-barrier membership-v3-point-use';
    pointSection.setAttribute('data-membership-section', '08');
    pointSection.setAttribute('aria-labelledby', 'membership-v3-section08-title');
    pointSection.innerHTML = `
      <div class="mv2-inner">
        <span class="membership-v3-section08-kicker">실제 POINT 사용</span>
        <h2 id="membership-v3-section08-title" class="membership-v3-section08-copy">예약 금액 일부에 POINT 적용</h2>
        <div class="mv2-mega">1,805.84P</div>
        <p class="membership-v3-section08-next">남은 금액은 카드로.</p>
      </div>`;

    if (section7.nextElementSibling !== pointSection) {
      section7.insertAdjacentElement('afterend', pointSection);
    }

    return true;
  }

  function init() {
    if (buildSection8()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection8() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

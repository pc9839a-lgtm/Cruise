(() => {
  'use strict';

  function installSection9Styles() {
    if (document.getElementById('membership-v3-section09-style')) return;

    const style = document.createElement('style');
    style.id = 'membership-v3-section09-style';
    style.textContent = `
      #same-cruise.membership-v3-card-payment{
        position:relative!important;
        width:100%!important;
        margin:0!important;
        padding:132px 0 146px!important;
        overflow:hidden!important;
        background:linear-gradient(180deg,#ffffff 0%,#f7faff 100%)!important;
        color:#0b1729!important;
        text-align:center!important;
      }
      #same-cruise.membership-v3-card-payment .membership-v3-section09-inner{
        width:min(940px,calc(100% - 48px))!important;
        margin:0 auto!important;
      }
      #same-cruise.membership-v3-card-payment .membership-v3-section09-kicker{
        display:inline-block!important;
        margin:0 0 24px!important;
        color:#2f6fed!important;
        font-size:15px!important;
        line-height:1!important;
        font-weight:900!important;
        letter-spacing:.04em!important;
      }
      #same-cruise.membership-v3-card-payment .membership-v3-section09-title{
        margin:0 auto!important;
        color:#0b1729!important;
        font-size:clamp(34px,4vw,54px)!important;
        line-height:1.08!important;
        letter-spacing:-.055em!important;
        font-weight:950!important;
        word-break:keep-all!important;
      }
      #same-cruise.membership-v3-card-payment .membership-v3-section09-value{
        display:block!important;
        margin:46px auto 0!important;
        color:#2f6fed!important;
        font-size:clamp(82px,10.5vw,142px)!important;
        line-height:.92!important;
        letter-spacing:-.07em!important;
        font-weight:950!important;
        white-space:nowrap!important;
      }
      #same-cruise.membership-v3-card-payment .membership-v3-section09-next{
        margin:42px auto 0!important;
        color:#53657c!important;
        font-size:clamp(22px,2.5vw,30px)!important;
        line-height:1.35!important;
        font-weight:900!important;
        letter-spacing:-.04em!important;
      }
      @media(max-width:780px){
        #same-cruise.membership-v3-card-payment{padding:96px 0 112px!important}
        #same-cruise.membership-v3-card-payment .membership-v3-section09-inner{width:calc(100% - 32px)!important}
        #same-cruise.membership-v3-card-payment .membership-v3-section09-kicker{margin-bottom:18px!important;font-size:12px!important}
        #same-cruise.membership-v3-card-payment .membership-v3-section09-title{font-size:clamp(32px,9.8vw,44px)!important}
        #same-cruise.membership-v3-card-payment .membership-v3-section09-value{margin-top:34px!important;font-size:clamp(58px,16.5vw,82px)!important}
        #same-cruise.membership-v3-card-payment .membership-v3-section09-next{margin-top:32px!important;font-size:20px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function buildSection9() {
    const section8 = document.getElementById('price-pain');
    const section9 = document.getElementById('same-cruise');
    if (!section8 || !section9) return false;

    installSection9Styles();

    const cost = document.getElementById('mx-cost-structure');
    const savings = document.getElementById('m3-savings-use');
    if (cost) cost.remove();
    if (savings) savings.remove();

    section9.className = 'membership-v3-card-payment';
    section9.setAttribute('data-membership-section', '09');
    section9.setAttribute('aria-labelledby', 'membership-v3-section09-title');
    section9.innerHTML = `
      <div class="membership-v3-section09-inner">
        <span class="membership-v3-section09-kicker">실제 카드 결제</span>
        <h2 id="membership-v3-section09-title" class="membership-v3-section09-title">남은 금액은<br><strong>카드로 결제했습니다</strong></h2>
        <strong class="mx8-value membership-v3-section09-value">$2,020.88</strong>
        <p class="membership-v3-section09-next">여기에 결제 수수료가 더해졌습니다.</p>
      </div>`;

    if (section8.nextElementSibling !== section9) {
      section8.insertAdjacentElement('afterend', section9);
    }

    return true;
  }

  function init() {
    if (buildSection9()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection9() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

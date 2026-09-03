(() => {
  'use strict';

  const ORDER_FIX_ID = 'mx-section-order-fix-style';

  function topLevelSection(el) {
    if (!el) return null;
    let node = el;
    while (node.parentElement && node.parentElement !== document.body) {
      const parent = node.parentElement;
      if (parent.tagName === 'MAIN') break;
      node = parent;
    }
    return node;
  }

  function placeAfter(node, anchor) {
    if (!node || !anchor || !anchor.parentNode) return false;
    const parent = anchor.parentNode;
    if (node === anchor.nextSibling) return true;
    parent.insertBefore(node, anchor.nextSibling);
    return true;
  }

  function placeBefore(node, anchor) {
    if (!node || !anchor || !anchor.parentNode) return false;
    const parent = anchor.parentNode;
    if (node.nextSibling === anchor) return true;
    parent.insertBefore(node, anchor);
    return true;
  }

  function installStyles() {
    if (document.getElementById(ORDER_FIX_ID)) return;
    const style = document.createElement('style');
    style.id = ORDER_FIX_ID;
    style.textContent = `
      #mx-travel-expansion{
        border-top:1px solid #e3e9f2!important;
        border-bottom:1px solid #dce5f0!important;
        background:linear-gradient(180deg,#ffffff 0%,#f4f7fb 100%)!important;
      }
      #mx-membership-freedom{
        position:relative!important;
        border-top:0!important;
        border-bottom:0!important;
        background:
          radial-gradient(circle at 50% 0%,rgba(79,161,255,.18),transparent 38%),
          linear-gradient(180deg,#0d2949 0%,#12365d 100%)!important;
        color:#fff!important;
      }
      #mx-membership-freedom::after{
        content:'';position:absolute;left:50%;bottom:0;width:min(900px,calc(100% - 40px));height:1px;
        transform:translateX(-50%);background:rgba(255,255,255,.14);pointer-events:none;
      }
      #mx-membership-freedom .mxf-kicker{
        background:rgba(126,207,255,.13)!important;border:1px solid rgba(126,207,255,.22)!important;color:#8bd8ff!important;
      }
      #mx-membership-freedom h2{color:#fff!important}
      #mx-membership-freedom h2 strong{color:#8bd8ff!important}
      #mx-membership-freedom .mxf-card{
        background:rgba(255,255,255,.07)!important;border-color:rgba(255,255,255,.14)!important;
        box-shadow:0 18px 46px rgba(0,12,32,.18)!important;
      }
      #mx-membership-freedom .mxf-zero{color:#8bd8ff!important}
      #mx-membership-freedom .mxf-card strong{color:#fff!important}
      #mx-membership-freedom .mxf-note{color:#9fb4ca!important}
      #mx-membership-freedom .mxf-kicker::before{content:'가입 전 확인 · ';font-weight:950}

      #plans{position:relative!important}
      #plans::before{
        content:'이제 플랜만 고르면 됩니다';display:block;width:min(900px,calc(100% - 40px));margin:0 auto 34px;
        text-align:center;color:#6f7f93;font-size:15px;font-weight:900;letter-spacing:-.03em;
      }
      @media(max-width:780px){
        #mx-travel-expansion{border-top-width:8px!important;border-top-color:#edf1f6!important}
        #mx-membership-freedom{padding-top:78px!important;padding-bottom:86px!important}
        #mx-membership-freedom .mxf-inner{width:calc(100% - 30px)!important}
        #mx-membership-freedom .mxf-grid{gap:10px!important}
        #plans::before{margin-bottom:26px;font-size:14px}
      }
    `;
    document.head.appendChild(style);
  }

  function fixOrder() {
    const travel = document.getElementById('mx-travel-expansion');
    const benefit = document.getElementById('mx-member-booking-benefits');
    const early = document.getElementById('mx-start-early');
    const freedom = document.getElementById('mx-membership-freedom');
    const plans = document.getElementById('plans');

    if (travel && benefit) {
      const benefitTop = topLevelSection(benefit);
      const travelTop = topLevelSection(travel);
      if (benefitTop && travelTop) placeAfter(travelTop, benefitTop);
    } else if (travel && early) {
      const travelTop = topLevelSection(travel);
      const earlyTop = topLevelSection(early);
      if (travelTop && earlyTop) placeBefore(travelTop, earlyTop);
    }

    if (freedom && plans) {
      const freedomTop = topLevelSection(freedom);
      const plansTop = topLevelSection(plans);
      if (freedomTop && plansTop) placeBefore(freedomTop, plansTop);
    }

    return !!(travel && freedom && plans);
  }

  function init() {
    installStyles();
    let tries = 0;
    const run = () => {
      tries += 1;
      const done = fixOrder();
      if (done || tries >= 80) return;
      window.setTimeout(run, 120);
    };
    run();
    window.setTimeout(fixOrder, 1200);
    window.setTimeout(fixOrder, 2600);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

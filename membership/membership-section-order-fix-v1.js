(() => {
  'use strict';

  const ORDER_FIX_ID = 'mx-section-order-fix-style';

  function installStyles() {
    if (document.getElementById(ORDER_FIX_ID)) return;
    const style = document.createElement('style');
    style.id = ORDER_FIX_ID;
    style.textContent = `
      #mx-travel-expansion{
        border-top:10px solid #edf1f6!important;
        border-bottom:10px solid #edf1f6!important;
        background:linear-gradient(180deg,#ffffff 0%,#f7f9fc 100%)!important;
      }

      #mx-membership-freedom{
        position:relative!important;
        margin:0!important;
        padding-top:96px!important;
        padding-bottom:104px!important;
        background:
          radial-gradient(circle at 50% 0%,rgba(76,162,255,.20),transparent 40%),
          linear-gradient(180deg,#0c2747 0%,#12375f 100%)!important;
        color:#fff!important;
        border:0!important;
      }
      #mx-membership-freedom .mxf-kicker{
        font-size:0!important;
        min-height:32px!important;
        background:rgba(126,207,255,.12)!important;
        border:1px solid rgba(126,207,255,.24)!important;
        color:#8bd8ff!important;
      }
      #mx-membership-freedom .mxf-kicker::before{
        content:'가입 전 확인';font-size:14px;font-weight:950;letter-spacing:-.025em;
      }
      #mx-membership-freedom h2{color:#fff!important}
      #mx-membership-freedom h2 strong{color:#8bd8ff!important}
      #mx-membership-freedom .mxf-card{
        background:rgba(255,255,255,.075)!important;
        border-color:rgba(255,255,255,.15)!important;
        box-shadow:0 18px 46px rgba(0,12,32,.20)!important;
      }
      #mx-membership-freedom .mxf-zero{color:#8bd8ff!important}
      #mx-membership-freedom .mxf-card strong{color:#fff!important}
      #mx-membership-freedom .mxf-note{color:#9fb5ca!important}

      #plans{
        margin-top:0!important;
        border-top:10px solid #edf1f6!important;
      }

      @media(max-width:780px){
        #mx-travel-expansion{border-top-width:8px!important;border-bottom-width:8px!important}
        #mx-membership-freedom{padding-top:74px!important;padding-bottom:82px!important}
        #mx-membership-freedom .mxf-inner{width:calc(100% - 30px)!important}
        #mx-membership-freedom .mxf-grid{gap:10px!important}
        #mx-membership-freedom .mxf-kicker::before{font-size:13px}
        #plans{border-top-width:8px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function moveSections() {
    const benefit = document.getElementById('mx-member-booking-benefits');
    const travel = document.getElementById('mx-travel-expansion');
    const early = document.getElementById('mx-start-early');
    const calculator = document.getElementById('calculator');
    const freedom = document.getElementById('mx-membership-freedom');
    const plans = document.getElementById('plans');

    // 여행 확장은 '회원 예약 장점' 바로 다음에 고정.
    if (benefit && travel && benefit.parentNode) {
      if (benefit.nextElementSibling !== travel) benefit.after(travel);
    } else if (travel && early && early.parentNode) {
      if (travel.nextElementSibling !== early) early.before(travel);
    }

    // 위약금/약정 없음은 계산 설명이 끝난 뒤, 플랜 바로 직전에 고정.
    if (freedom && plans && plans.parentNode) {
      if (freedom.nextElementSibling !== plans) plans.before(freedom);
    } else if (freedom && calculator && calculator.parentNode) {
      calculator.after(freedom);
    }

    return !!(travel && freedom && plans);
  }

  function init() {
    installStyles();
    let tries = 0;
    const run = () => {
      tries += 1;
      const done = moveSections();
      if (done || tries >= 80) return;
      window.setTimeout(run, 120);
    };
    run();
    window.setTimeout(moveSections, 900);
    window.setTimeout(moveSections, 1800);
    window.setTimeout(moveSections, 3200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

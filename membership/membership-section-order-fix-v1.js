(() => {
  'use strict';

  const ORDER_FIX_ID = 'mx-section-order-fix-style';

  function installStyles() {
    if (document.getElementById(ORDER_FIX_ID)) return;
    const style = document.createElement('style');
    style.id = ORDER_FIX_ID;
    style.textContent = `
      #mx-membership-optional{display:none!important}

      #mx-travel-expansion{
        border-top:6px solid #edf1f6!important;
        border-bottom:6px solid #edf1f6!important;
        background:linear-gradient(180deg,#ffffff 0%,#f7f9fc 100%)!important;
      }

      #mx-membership-freedom{
        position:relative!important;
        box-sizing:border-box!important;
        width:min(860px,100%)!important;
        margin:0 auto 34px!important;
        padding:0!important;
        background:transparent!important;
        color:#fff!important;
        border:0!important;
        overflow:visible!important;
      }
      #mx-membership-freedom::before{display:none!important}
      #mx-membership-freedom .mxf-inner{
        width:100%!important;
        margin:0!important;
      }
      #mx-membership-freedom .mxf-kicker{
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        min-height:28px!important;
        padding:0 11px!important;
        border-radius:999px!important;
        background:rgba(126,207,255,.10)!important;
        border:1px solid rgba(126,207,255,.20)!important;
        color:#8bd8ff!important;
        font-size:12px!important;
        font-weight:950!important;
      }
      #mx-membership-freedom .mxf-grid{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:8px!important;
        margin:14px 0 0!important;
      }
      #mx-membership-freedom .mxf-card{
        min-height:94px!important;
        padding:14px 10px!important;
        border-radius:16px!important;
        background:rgba(255,255,255,.065)!important;
        border:1px solid rgba(255,255,255,.13)!important;
        box-shadow:none!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        opacity:1!important;
        transform:none!important;
      }
      #mx-membership-freedom .mxf-zero{
        color:#8bd8ff!important;
        font-size:34px!important;
        line-height:1!important;
        font-weight:950!important;
      }
      #mx-membership-freedom .mxf-card strong{
        margin-top:8px!important;
        color:#fff!important;
        font-size:15px!important;
        line-height:1.15!important;
        font-weight:900!important;
        white-space:nowrap!important;
      }
      #mx-membership-freedom .mxf-note{
        margin:10px auto 0!important;
        color:#8196ad!important;
        font-size:10px!important;
        line-height:1.4!important;
      }

      #plans{
        margin-top:0!important;
        padding-top:46px!important;
        border-top:0!important;
        background:#07111f!important;
      }
      #plans .plans-wrap>#mx-membership-freedom + .membership-section-head{
        margin-top:30px!important;
      }

      @media(max-width:780px){
        #mx-travel-expansion{border-top-width:5px!important;border-bottom-width:5px!important}
        #mx-membership-freedom{width:100%!important;margin-bottom:26px!important}
        #mx-membership-freedom .mxf-inner{width:100%!important}
        #mx-membership-freedom .mxf-kicker{min-height:26px!important;font-size:11px!important}
        #mx-membership-freedom .mxf-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;margin-top:12px!important}
        #mx-membership-freedom .mxf-card{min-height:84px!important;padding:12px 5px!important;border-radius:14px!important}
        #mx-membership-freedom .mxf-zero{font-size:27px!important}
        #mx-membership-freedom .mxf-card strong{margin-top:7px!important;font-size:12px!important;letter-spacing:-.025em!important}
        #mx-membership-freedom .mxf-note{margin-top:8px!important;font-size:9px!important;line-height:1.35!important}
        #plans{padding-top:36px!important;border-top:0!important}
        #plans .plans-wrap>#mx-membership-freedom + .membership-section-head{margin-top:24px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function moveSections() {
    document.getElementById('mx-membership-optional')?.remove();
    document.getElementById('mx-start-early')?.remove();
    document.getElementById('mx-start-early-proof')?.remove();

    const benefit = document.getElementById('mx-member-booking-benefits');
    const travel = document.getElementById('mx-travel-expansion');
    const calculator = document.getElementById('calculator');
    const freedom = document.getElementById('mx-membership-freedom');
    const plans = document.getElementById('plans');

    // 최종 전환 순서: 회원 절감 근거 -> 호텔/투어 혜택 -> 플랜.
    if (benefit && travel && benefit.parentNode) {
      if (benefit.nextElementSibling !== travel) benefit.after(travel);
    }
    if (travel && plans && travel.parentNode === plans.parentNode && travel.nextElementSibling !== plans) {
      travel.after(plans);
    }

    // 가입 전 확인은 독립 섹션이 아니라 플랜 내부 상단 안심바로 고정.
    if (freedom && plans) {
      const plansWrap = plans.querySelector('.plans-wrap') || plans;
      const planHead = plansWrap.querySelector('.membership-section-head');
      if (planHead) {
        if (freedom.parentNode !== plansWrap || freedom.nextElementSibling !== planHead) planHead.before(freedom);
      } else if (freedom.parentNode !== plansWrap) {
        plansWrap.prepend(freedom);
      }
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

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
        width:min(1120px,calc(100% - 64px))!important;
        margin:0 auto 84px!important;
        padding:74px 0 18px!important;
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
        display:block!important;
        width:100%!important;
        min-height:0!important;
        padding:0!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        color:#fff!important;
        font-size:clamp(48px,5vw,68px)!important;
        line-height:1.04!important;
        letter-spacing:-.055em!important;
        font-weight:950!important;
        text-align:center!important;
      }
      #mx-membership-freedom .mxf-grid{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:18px!important;
        margin:54px 0 0!important;
      }
      #mx-membership-freedom .mxf-card{
        min-height:176px!important;
        padding:28px 18px!important;
        border-radius:26px!important;
        background:rgba(255,255,255,.075)!important;
        border:1px solid rgba(255,255,255,.16)!important;
        box-shadow:0 18px 46px rgba(0,12,32,.16)!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        opacity:1!important;
        transform:none!important;
      }
      #mx-membership-freedom .mxf-zero{
        color:#8bd8ff!important;
        font-size:clamp(54px,5.8vw,74px)!important;
        line-height:.95!important;
        letter-spacing:-.055em!important;
        font-weight:950!important;
      }
      #mx-membership-freedom .mxf-card strong{
        margin-top:16px!important;
        color:#fff!important;
        font-size:22px!important;
        line-height:1.15!important;
        font-weight:900!important;
        white-space:nowrap!important;
      }
      #mx-membership-freedom .mxf-note{
        max-width:920px!important;
        margin:22px auto 0!important;
        color:#8196ad!important;
        font-size:12px!important;
        line-height:1.55!important;
        text-align:center!important;
      }

      #mx-point-example{padding-top:90px!important;padding-bottom:90px!important}
      #calculator{padding-top:104px!important;padding-bottom:104px!important}

      #plans{
        margin-top:0!important;
        padding-top:46px!important;
        border-top:0!important;
        background:#07111f!important;
      }
      #plans .plans-wrap>#mx-membership-freedom + .membership-section-head{
        margin-top:40px!important;
      }

      @media(max-width:780px){
        #mx-travel-expansion{border-top-width:5px!important;border-bottom-width:5px!important}
        #mx-membership-freedom{width:calc(100% - 34px)!important;margin-bottom:58px!important;padding:54px 0 10px!important}
        #mx-membership-freedom .mxf-inner{width:100%!important}
        #mx-membership-freedom .mxf-kicker{font-size:clamp(36px,10.5vw,46px)!important;line-height:1.04!important;letter-spacing:-.05em!important}
        #mx-membership-freedom .mxf-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin-top:34px!important}
        #mx-membership-freedom .mxf-card{min-height:124px!important;padding:18px 6px!important;border-radius:18px!important}
        #mx-membership-freedom .mxf-zero{font-size:clamp(36px,10vw,46px)!important}
        #mx-membership-freedom .mxf-card strong{margin-top:10px!important;font-size:14px!important;letter-spacing:-.03em!important}
        #mx-membership-freedom .mxf-note{margin-top:14px!important;font-size:9px!important;line-height:1.45!important}
        #mx-point-example{padding-top:62px!important;padding-bottom:62px!important}
        #calculator{padding-top:74px!important;padding-bottom:74px!important}
        #plans{padding-top:36px!important;border-top:0!important}
        #plans .plans-wrap>#mx-membership-freedom + .membership-section-head{margin-top:52px!important}
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

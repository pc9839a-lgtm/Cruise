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
        margin:0 auto 48px!important;
        padding:96px 0 24px!important;
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
      #mx-membership-freedom .mxf-title{
        margin:0 auto!important;
        padding:0!important;
        max-width:920px!important;
        color:#fff!important;
        font-size:clamp(56px,5.4vw,76px)!important;
        line-height:1.03!important;
        letter-spacing:-.06em!important;
        font-weight:950!important;
        text-align:center!important;
        word-break:keep-all!important;
      }
      #mx-membership-freedom .mxf-grid{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:18px!important;
        margin:60px 0 0!important;
      }
      #mx-membership-freedom .mxf-card{
        min-height:196px!important;
        padding:30px 20px!important;
        border-radius:28px!important;
        background:linear-gradient(180deg,rgba(255,255,255,.085),rgba(255,255,255,.055))!important;
        border:1px solid rgba(255,255,255,.16)!important;
        box-shadow:0 22px 56px rgba(0,12,32,.18)!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        opacity:1!important;
        transform:none!important;
      }
      #mx-membership-freedom .mxf-zero{
        color:#83d7ff!important;
        font-size:clamp(62px,6.2vw,84px)!important;
        line-height:.94!important;
        letter-spacing:-.06em!important;
        font-weight:950!important;
      }
      #mx-membership-freedom .mxf-card strong{
        margin-top:18px!important;
        color:#fff!important;
        font-size:24px!important;
        line-height:1.12!important;
        letter-spacing:-.035em!important;
        font-weight:900!important;
        white-space:nowrap!important;
      }
      #mx-membership-freedom .mxf-note{
        max-width:980px!important;
        margin:24px auto 0!important;
        color:#8196ad!important;
        font-size:12px!important;
        line-height:1.55!important;
        text-align:center!important;
      }

      @media(max-width:780px){
        #mx-membership-freedom{
          width:calc(100% - 34px)!important;
          margin-bottom:38px!important;
          padding:72px 0 18px!important;
        }
        #mx-membership-freedom .mxf-title{
          max-width:430px!important;
          font-size:clamp(40px,11.2vw,50px)!important;
          line-height:1.03!important;
          letter-spacing:-.055em!important;
        }
        #mx-membership-freedom .mxf-grid{
          grid-template-columns:repeat(3,minmax(0,1fr))!important;
          gap:8px!important;
          margin-top:38px!important;
        }
        #mx-membership-freedom .mxf-card{
          min-height:138px!important;
          padding:20px 6px!important;
          border-radius:20px!important;
        }
        #mx-membership-freedom .mxf-zero{
          font-size:clamp(40px,10.8vw,50px)!important;
        }
        #mx-membership-freedom .mxf-card strong{
          margin-top:11px!important;
          font-size:15px!important;
          letter-spacing:-.035em!important;
        }
        #mx-membership-freedom .mxf-note{
          margin-top:16px!important;
          font-size:9px!important;
          line-height:1.45!important;
        }
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
        margin-top:52px!important;
      }

      @media(max-width:780px){
        #mx-travel-expansion{border-top-width:5px!important;border-bottom-width:5px!important}
        #plans .plans-wrap>#mx-membership-freedom + .membership-section-head{margin-top:44px!important}
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

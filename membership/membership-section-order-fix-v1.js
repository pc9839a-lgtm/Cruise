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
        width:min(1160px,calc(100% - 64px))!important;
        margin:0 auto 46px!important;
        padding:108px 0 26px!important;
        background:transparent!important;
        color:#fff!important;
        border:0!important;
        overflow:visible!important;
        isolation:isolate!important;
      }
      #mx-membership-freedom::before{
        content:''!important;
        display:block!important;
        position:absolute!important;
        left:50%!important;
        top:18px!important;
        width:min(980px,92vw)!important;
        height:420px!important;
        transform:translateX(-50%)!important;
        background:radial-gradient(circle,rgba(59,143,255,.24) 0%,rgba(59,143,255,.11) 28%,rgba(59,143,255,0) 72%)!important;
        filter:blur(10px)!important;
        z-index:-1!important;
        pointer-events:none!important;
      }
      #mx-membership-freedom .mxf-inner{
        width:100%!important;
        margin:0!important;
      }
      #mx-membership-freedom .mxf-title{
        margin:0 auto!important;
        padding:0!important;
        max-width:960px!important;
        color:#fff!important;
        font-size:clamp(58px,5.7vw,82px)!important;
        line-height:1.02!important;
        letter-spacing:-.065em!important;
        font-weight:950!important;
        text-align:center!important;
        word-break:keep-all!important;
        opacity:0!important;
        transform:translateY(28px)!important;
        transition:opacity .6s ease,transform .8s cubic-bezier(.16,1,.3,1)!important;
      }
      #mx-membership-freedom .mxf-title strong{
        color:#83d7ff!important;
        font-weight:950!important;
      }
      #mx-membership-freedom.is-active .mxf-title{
        opacity:1!important;
        transform:none!important;
      }
      #mx-membership-freedom .mxf-grid{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        align-items:center!important;
        gap:18px!important;
        margin:62px 0 0!important;
      }
      #mx-membership-freedom .mxf-card{
        position:relative!important;
        min-height:184px!important;
        padding:30px 20px!important;
        border-radius:30px!important;
        background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.05))!important;
        border:1px solid rgba(255,255,255,.17)!important;
        box-shadow:0 22px 56px rgba(0,12,32,.18)!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        opacity:0!important;
        transform:translateY(34px) scale(.96)!important;
        transition:
          opacity .58s ease,
          transform .82s cubic-bezier(.16,1,.3,1),
          border-color .25s ease,
          box-shadow .25s ease!important;
      }
      #mx-membership-freedom .mxf-card:nth-child(1){transition-delay:.10s!important}
      #mx-membership-freedom .mxf-card:nth-child(2){transition-delay:.22s!important}
      #mx-membership-freedom .mxf-card:nth-child(3){transition-delay:.34s!important}
      #mx-membership-freedom.is-active .mxf-card{
        opacity:1!important;
        transform:none!important;
      }
      #mx-membership-freedom .mxf-zero{
        color:#83d7ff!important;
        font-size:clamp(60px,6vw,82px)!important;
        line-height:.94!important;
        letter-spacing:-.06em!important;
        font-weight:950!important;
      }
      #mx-membership-freedom .mxf-card strong{
        margin-top:16px!important;
        color:#fff!important;
        font-size:23px!important;
        line-height:1.12!important;
        letter-spacing:-.035em!important;
        font-weight:900!important;
        white-space:nowrap!important;
      }
      #mx-membership-freedom .mx-refund-card{
        min-height:222px!important;
        transform:translateY(34px) scale(.92)!important;
        border-color:rgba(131,215,255,.56)!important;
        background:
          radial-gradient(circle at 50% 0%,rgba(88,174,255,.25),transparent 58%),
          linear-gradient(180deg,rgba(48,129,255,.25),rgba(255,255,255,.07))!important;
        box-shadow:0 26px 76px rgba(34,115,255,.30)!important;
      }
      #mx-membership-freedom.is-active .mx-refund-card{
        transform:scale(1.045)!important;
        animation:mxfRefundPulse 2.8s ease-in-out 1.2s infinite!important;
      }
      #mx-membership-freedom .mx-refund-card .mxf-zero{
        color:#fff!important;
        font-size:clamp(70px,6.8vw,92px)!important;
      }
      #mx-membership-freedom .mx-refund-card strong{
        color:#9cddff!important;
        font-size:26px!important;
      }
      #mx-membership-freedom .mxf-note{
        max-width:860px!important;
        margin:28px auto 0!important;
        color:#6f87a4!important;
        font-size:11px!important;
        line-height:1.5!important;
        text-align:center!important;
        opacity:0!important;
        transform:translateY(12px)!important;
        transition:opacity .5s ease .5s,transform .6s ease .5s!important;
      }
      #mx-membership-freedom.is-active .mxf-note{
        opacity:1!important;
        transform:none!important;
      }
      @keyframes mxfRefundPulse{
        0%,100%{box-shadow:0 26px 76px rgba(34,115,255,.28),0 0 0 0 rgba(88,174,255,.18)}
        50%{box-shadow:0 32px 90px rgba(34,115,255,.42),0 0 0 10px rgba(88,174,255,0)}
      }

      @media(max-width:780px){
        #mx-membership-freedom{
          width:calc(100% - 34px)!important;
          margin-bottom:34px!important;
          padding:78px 0 18px!important;
        }
        #mx-membership-freedom::before{
          top:12px!important;
          width:96vw!important;
          height:360px!important;
        }
        #mx-membership-freedom .mxf-title{
          max-width:430px!important;
          font-size:clamp(42px,11.4vw,52px)!important;
          line-height:1.02!important;
        }
        #mx-membership-freedom .mxf-grid{
          grid-template-columns:repeat(2,minmax(0,1fr))!important;
          gap:10px!important;
          margin-top:40px!important;
        }
        #mx-membership-freedom .mxf-card{
          min-height:132px!important;
          padding:20px 6px!important;
          border-radius:20px!important;
        }
        #mx-membership-freedom .mxf-penalty{grid-column:1!important;grid-row:2!important}
        #mx-membership-freedom .mxf-contract{grid-column:2!important;grid-row:2!important}
        #mx-membership-freedom .mx-refund-card{
          grid-column:1/-1!important;
          grid-row:1!important;
          min-height:176px!important;
          transform:translateY(28px) scale(.95)!important;
        }
        #mx-membership-freedom.is-active .mx-refund-card{
          transform:none!important;
        }
        #mx-membership-freedom .mxf-zero{
          font-size:clamp(40px,11vw,50px)!important;
        }
        #mx-membership-freedom .mxf-card strong{
          margin-top:10px!important;
          font-size:15px!important;
        }
        #mx-membership-freedom .mx-refund-card .mxf-zero{
          font-size:clamp(58px,16vw,72px)!important;
        }
        #mx-membership-freedom .mx-refund-card strong{
          margin-top:12px!important;
          font-size:21px!important;
        }
        #mx-membership-freedom .mxf-note{
          margin-top:16px!important;
          font-size:9px!important;
          line-height:1.45!important;
        }
      }

      @media(prefers-reduced-motion:reduce){
        #mx-membership-freedom .mxf-title,
        #mx-membership-freedom .mxf-card,
        #mx-membership-freedom .mxf-note{
          opacity:1!important;
          transform:none!important;
          transition:none!important;
          animation:none!important;
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

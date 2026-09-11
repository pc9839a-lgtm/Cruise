(() => {
  'use strict';

  function installSection5Styles() {
    if (document.getElementById('membership-v3-section05-style')) return;

    const style = document.createElement('style');
    style.id = 'membership-v3-section05-style';
    style.textContent = `
      #mx-port-day.membership-v3-booking-methods .mxp-flow{
        grid-template-columns:repeat(5,minmax(0,1fr))!important;
        width:min(1080px,100%)!important;
      }
      #mx-port-day.membership-v3-booking-methods .mxp-step{
        min-height:116px!important;
        padding:18px 10px!important;
      }
      #mx-port-day.membership-v3-booking-methods .mxp-step strong{
        font-size:clamp(21px,2.1vw,27px)!important;
        letter-spacing:-.045em!important;
      }
      #mx-port-day.membership-v3-booking-methods .membership-v3-ingroup{
        background:#eef5ff!important;
        border-color:#2f6fed!important;
        box-shadow:0 14px 32px rgba(47,111,237,.12)!important;
      }
      #mx-port-day.membership-v3-booking-methods .membership-v3-ingroup strong{
        color:#2f6fed!important;
      }
      #mx-port-day.membership-v3-booking-methods .membership-v3-section05-next{
        margin:34px auto 0!important;
        color:#53657c!important;
        font-size:clamp(18px,1.8vw,21px)!important;
        line-height:1.45!important;
        font-weight:820!important;
        letter-spacing:-.025em!important;
        text-align:center!important;
        word-break:keep-all!important;
      }
      @media(max-width:780px){
        #mx-port-day.membership-v3-booking-methods .mxp-flow{
          grid-template-columns:1fr!important;
          width:100%!important;
        }
        #mx-port-day.membership-v3-booking-methods .mxp-step{
          min-height:64px!important;
          padding:16px 8px!important;
        }
        #mx-port-day.membership-v3-booking-methods .mxp-step strong{
          font-size:23px!important;
        }
        #mx-port-day.membership-v3-booking-methods .membership-v3-section05-next{
          max-width:350px!important;
          margin-top:28px!important;
          font-size:17px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildSection3() {
    if (document.getElementById('mx-port-day')) return true;

    const section2 = document.getElementById('mx-moving-hotel');
    if (!section2) return false;

    installSection5Styles();

    section2.insertAdjacentHTML('afterend', `
      <section id="mx-port-day" class="mx-port-section membership-v3-booking-methods" data-membership-section="05" aria-labelledby="mx-port-title">
        <div class="mxp-inner">
          <div class="mxp-head">
            <span class="mxp-question">같은 여행, 다른 예약 방법</span>
            <h2 id="mx-port-title">크루즈 예약은<br><strong>이렇게 나뉩니다</strong></h2>
          </div>

          <div class="mxp-flow" aria-label="크루즈 예약 방법">
            <article class="mxp-step"><strong>여행사</strong></article>
            <article class="mxp-step"><strong>홈쇼핑</strong></article>
            <article class="mxp-step"><strong>상조 전환</strong></article>
            <article class="mxp-step"><strong>선사홈페이지</strong></article>
            <article class="mxp-step membership-v3-ingroup"><strong>인그룹</strong></article>
          </div>

          <p class="membership-v3-section05-next">판매가보다 총비용을 봅니다.</p>
        </div>
      </section>`);

    return true;
  }

  function init() {
    if (buildSection3()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection3() || tries >= 30) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

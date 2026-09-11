(() => {
  'use strict';

  function installSection6Styles() {
    if (document.getElementById('membership-v3-section06-style')) return;

    const style = document.createElement('style');
    style.id = 'membership-v3-section06-style';
    style.textContent = `
      #mx-moving-hotel-4.membership-v3-compare-criteria{
        text-align:center!important;
      }
      #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-criteria-grid{
        display:grid!important;
        grid-template-columns:repeat(4,minmax(0,1fr))!important;
        gap:14px!important;
        width:min(1040px,100%)!important;
        margin:46px auto 0!important;
      }
      #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-criterion{
        display:flex!important;
        min-height:180px!important;
        padding:24px 18px!important;
        border:1px solid #d7e1ed!important;
        border-radius:24px!important;
        background:#fff!important;
        align-items:center!important;
        justify-content:center!important;
        box-shadow:0 16px 40px rgba(20,48,88,.06)!important;
      }
      #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-criterion strong{
        color:#0b1729!important;
        font-size:clamp(25px,2.7vw,34px)!important;
        line-height:1.15!important;
        letter-spacing:-.05em!important;
        font-weight:950!important;
        word-break:keep-all!important;
      }
      #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-section06-next{
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
        #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-criteria-grid{
          grid-template-columns:1fr 1fr!important;
          gap:10px!important;
          margin-top:34px!important;
        }
        #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-criterion{
          min-height:132px!important;
          padding:18px 12px!important;
          border-radius:20px!important;
        }
        #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-criterion strong{
          font-size:clamp(22px,6.5vw,28px)!important;
        }
        #mx-moving-hotel-4.membership-v3-compare-criteria .membership-v3-section06-next{
          max-width:350px!important;
          margin-top:28px!important;
          font-size:17px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildSection4() {
    if (document.getElementById('mx-moving-hotel-4')) return true;

    const section3 = document.getElementById('mx-port-day');
    if (!section3) return false;

    installSection6Styles();

    section3.insertAdjacentHTML('afterend', `
      <section id="mx-moving-hotel-4" class="mx4-section membership-v3-compare-criteria" data-membership-section="06" aria-labelledby="mx4-title">
        <div class="mx4-inner">
          <div class="mx4-head">
            <span class="mx4-eyebrow">판매가보다 총비용</span>
            <h2 id="mx4-title">비교할 건<br><strong>딱 4가지입니다</strong></h2>
          </div>

          <div class="mx4-route membership-v3-criteria-grid" aria-label="크루즈 예약 비교 기준">
            <article class="membership-v3-criterion"><strong>총비용</strong></article>
            <article class="membership-v3-criterion"><strong>포함사항</strong></article>
            <article class="membership-v3-criterion"><strong>직접 해야 할 일</strong></article>
            <article class="membership-v3-criterion"><strong>이용 조건</strong></article>
          </div>

          <p class="membership-v3-section06-next">이제 실제 예약 한 건으로 확인합니다.</p>
        </div>
      </section>`);

    return true;
  }

  function init() {
    if (buildSection4()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection4() || tries >= 30) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

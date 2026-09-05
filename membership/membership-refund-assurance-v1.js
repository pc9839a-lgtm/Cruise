(() => {
  'use strict';

  const STYLE_ID = 'mx-refund-assurance-style';

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #mx-membership-freedom .mxf-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      #mx-membership-freedom .mxf-card.mx-refund-card{
        border-color:rgba(139,216,255,.34)!important;
        background:linear-gradient(180deg,rgba(71,160,255,.14),rgba(255,255,255,.065))!important;
        box-shadow:none!important;
      }
      #mx-membership-freedom .mx-refund-card .mxf-zero{color:#8bd8ff!important}
      #mx-membership-freedom .mx-refund-card strong{color:#fff!important}
      #mx-membership-freedom .mx-refund-card .mx-refund-sub{display:none!important}
      @media(max-width:780px){
        #mx-membership-freedom .mxf-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
        #mx-membership-freedom .mxf-card.mx-refund-card{grid-column:auto!important;min-height:124px!important}
        #mx-membership-freedom .mx-refund-card .mxf-zero{font-size:clamp(36px,10vw,46px)!important}
        #mx-membership-freedom .mx-refund-card strong{font-size:14px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function patchFreedom() {
    const section = document.getElementById('mx-membership-freedom');
    if (!section) return false;
    const grid = section.querySelector('.mxf-grid');
    if (!grid) return false;

    if (!grid.querySelector('.mx-refund-card')) {
      const card = document.createElement('div');
      card.className = 'mxf-card mx-refund-card';
      card.innerHTML = '<span class="mxf-zero">14일</span><strong>100% 환불*</strong>';
      grid.appendChild(card);
    }

    const note = section.querySelector('.mxf-note');
    if (note) {
      note.innerHTML = '* 멤버십 결제 기준. 거주 국가·지역 및 공식 환불 자격 조건이 적용됩니다. 예약한 크루즈·호텔·투어 상품은 각 상품의 취소 규정이 적용됩니다.';
    }
    return true;
  }

  function init() {
    installStyles();
    let tries = 0;
    const run = () => {
      tries += 1;
      if (patchFreedom() || tries >= 80) return;
      window.setTimeout(run, 120);
    };
    run();
    window.setTimeout(patchFreedom, 1200);
    window.setTimeout(patchFreedom, 2600);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

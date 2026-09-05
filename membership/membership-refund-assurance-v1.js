(() => {
  'use strict';

  const STYLE_ID = 'mx-refund-assurance-style';

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #mx-membership-freedom .mx-refund-card{
        border-color:rgba(131,215,255,.56)!important;
      }
    `;
    document.head.appendChild(style);
  }

  function patchFreedom() {
    const section = document.getElementById('mx-membership-freedom');
    if (!section) return false;
    const grid = section.querySelector('.mxf-grid');
    if (!grid) return false;

    let card = grid.querySelector('.mx-refund-card');
    if (!card) {
      card = document.createElement('div');
      card.className = 'mxf-card mx-refund-card';
      card.innerHTML = '<span class="mxf-zero">14일</span><strong>100% 환불*</strong>';
      const first = grid.querySelector('.mxf-card');
      if (first?.nextSibling) grid.insertBefore(card, first.nextSibling);
      else grid.appendChild(card);
    }

    const note = section.querySelector('.mxf-note');
    if (note) {
      note.innerHTML = '* 멤버십 결제 기준이며, 예약 상품 취소 규정은 각 상품 조건에 따릅니다.';
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

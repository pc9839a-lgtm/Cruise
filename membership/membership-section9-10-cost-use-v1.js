(() => {
  'use strict';

  function buildSection9() {
    const section8 = document.getElementById('same-cruise');
    const section9 = document.getElementById('guide-question');
    if (!section8 || !section9) return false;

    const cost = document.getElementById('mx-cost-structure');
    const savings = document.getElementById('m3-savings-use');
    if (cost) cost.remove();
    if (savings) savings.remove();

    section9.className = 'mx9-club-section';
    section9.setAttribute('data-membership-section', '9');
    section9.innerHTML = `
      <div class="mx11-inner">
        <p class="mx9-prefix">전 세계 약</p>
        <div class="mx9-member-count">350만 명</div>
        <h2 class="mx9-title">이 이용하는<br><strong>회원제 크루즈클럽</strong></h2>

        <div class="mx9-clia-proof" aria-label="CLIA 공식 회원" style="display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;flex-wrap:wrap!important;width:min(760px,100%)!important;margin:46px auto 0!important;padding:24px 0!important;border-block:1px solid #d4deea!important;">
          <strong style="font-size:clamp(34px,3.8vw,52px)!important;line-height:1!important;letter-spacing:-.035em!important;color:#2468e8!important;font-weight:950!important;">CLIA</strong>
          <span style="font-size:22px!important;line-height:1.25!important;color:#0b1729!important;font-weight:950!important;">공식 회원</span>
          <em style="font-size:16px!important;line-height:1!important;color:#53657c!important;font-style:normal!important;font-weight:850!important;">#00027506</em>
        </div>

        <p class="mx9-copy">회원으로 가입하면<br>크루즈 예약에 사용할 <strong>POINT를 쌓습니다</strong></p>
      </div>`;

    if (section8.nextElementSibling !== section9) {
      section8.insertAdjacentElement('afterend', section9);
    }

    return true;
  }

  function init() {
    if (buildSection9()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSection9() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

(() => {
  'use strict';

  function buildSections10And11() {
    const section9 = document.getElementById('guide-question');
    const section10 = document.getElementById('mx-prepare-money');
    if (!section9 || !section10) return false;

    section10.className = 'mx10-membership-reason';
    section10.setAttribute('data-membership-section', '10');
    section10.innerHTML = `
      <div class="mx12-inner">
        <span class="mx12-kicker">왜 크루즈클럽에 가입하나요?</span>
        <h2 class="mx12-title">클럽 회원으로 가입해<br><strong>POINT를 미리 쌓아야</strong><br>전세계 최저가 보장으로 예약할 수 있습니다</h2>

        <div class="mx10-flow" aria-label="크루즈클럽 이용 흐름">
          <span>회원가입</span><i>→</i>
          <span>POINT 적립</span><i>→</i>
          <span>회원 크루즈 검색</span><i>→</i>
          <span>POINT 사용</span><i>→</i>
          <strong>전세계 최저가 보장</strong>
        </div>
      </div>`;

    let section11 = document.getElementById('mx-lowest-price');
    if (!section11) {
      section11 = document.createElement('section');
      section11.id = 'mx-lowest-price';
    }

    section11.className = 'mx11-lowest-price';
    section11.setAttribute('data-membership-section', '11');
    section11.innerHTML = `
      <div class="mxg-inner">
        <span class="mxg-kicker">다른 곳이 더 싸다면?</span>
        <h2>전세계<br><strong>최저가 보장</strong></h2>
        <div class="mxg-mega">$100+</div>
        <p class="mxg-criteria">동일 크루즈 · 동일 출발일 · 동일 객실 조건</p>
        <p class="mxg-copy">$100 이상 낮은 가격이 확인되면<br><strong>보장 조건에 따라 가격을 조정합니다</strong></p>
        <p class="mxg-note">세부 비교 · 신청 · 적용 조건은 최저가 보장 약관 기준</p>
      </div>`;

    if (section9.nextElementSibling !== section10) section9.insertAdjacentElement('afterend', section10);
    if (section10.nextElementSibling !== section11) section10.insertAdjacentElement('afterend', section11);
    return true;
  }

  function init() {
    if (buildSections10And11()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections10And11() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

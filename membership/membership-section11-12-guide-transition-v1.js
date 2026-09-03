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
        <span class="mx12-kicker">회원이 되는 이유</span>
        <h2 class="mx12-title">왜 굳이<br><strong>크루즈클럽에 가입할까요?</strong></h2>

        <div class="mx10-flow" aria-label="크루즈클럽 이용 흐름">
          <span>회원가입</span><i>→</i>
          <span>POINT 적립</span><i>→</i>
          <span>회원 크루즈 검색</span><i>→</i>
          <span>POINT 사용</span><i>→</i>
          <strong>전세계 최저가 보장</strong>
        </div>

        <div class="mx10-detail" aria-label="회원 이용 핵심" style="display:flex!important;flex-wrap:wrap!important;width:min(960px,100%)!important;margin:44px auto 0!important;border-block:1px solid #cbd6e3!important;">
          <div class="mx10-detail-item" style="flex:1 1 240px!important;padding:24px 18px!important;">
            <b style="display:block!important;font-size:20px!important;color:#0b1729!important;">POINT 적립</b>
            <span style="display:block!important;margin-top:8px!important;font-size:16px!important;line-height:1.5!important;color:#53657c!important;">CLASSIC 월 200P · PREMIUM 월 500P</span>
          </div>
          <div class="mx10-detail-item" style="flex:1 1 240px!important;padding:24px 18px!important;border-inline:1px solid #cbd6e3!important;">
            <b style="display:block!important;font-size:20px!important;color:#0b1729!important;">POINT 사용</b>
            <span style="display:block!important;margin-top:8px!important;font-size:16px!important;line-height:1.5!important;color:#53657c!important;">크루즈를 예약할 때 적립한 POINT 사용</span>
          </div>
          <div class="mx10-detail-item" style="flex:1 1 240px!important;padding:24px 18px!important;">
            <b style="display:block!important;font-size:20px!important;color:#2468e8!important;">최저가 보장</b>
            <span style="display:block!important;margin-top:8px!important;font-size:16px!important;line-height:1.5!important;color:#53657c!important;">회원 예약에 전세계 최저가 보장 제도 적용</span>
          </div>
        </div>
      </div>`;

    let priceExamples = document.getElementById('mx-cruise-price-examples');
    if (!priceExamples) {
      priceExamples = document.createElement('section');
      priceExamples.id = 'mx-cruise-price-examples';
    }

    priceExamples.className = 'mx10p-price-examples';
    priceExamples.setAttribute('data-membership-section', '10.5');
    priceExamples.innerHTML = `
      <div class="mx10p-inner">
        <span class="mx10p-kicker">회원 크루즈 예시</span>
        <h2>그럼 실제 크루즈는<br><strong>얼마부터 볼 수 있을까요?</strong></h2>

        <div class="mx10p-price-grid" aria-label="크루즈 1인 가격 예시">
          <div class="mx10p-price-item">
            <span>아시아 크루즈</span>
            <strong><small>1인</small><b class="mx10p-price-value">70만원~</b></strong>
          </div>
          <div class="mx10p-price-item">
            <span>디즈니 크루즈</span>
            <strong><small>1인</small><b class="mx10p-price-value">110만원~</b></strong>
          </div>
          <div class="mx10p-price-item">
            <span>지중해 크루즈</span>
            <strong><small>1인</small><b class="mx10p-price-value">90만원~</b></strong>
          </div>
          <div class="mx10p-price-item">
            <span>북유럽 크루즈</span>
            <strong><small>1인</small><b class="mx10p-price-value">110만원~</b></strong>
          </div>
        </div>
        <p class="mx10p-note">출발일 · 선사 · 객실 조건에 따라 금액은 달라질 수 있습니다.</p>
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
        <span class="mxg-kicker">회원 예약의 핵심</span>
        <h2>다른 곳이 더 싸다면?<br><strong>전세계 최저가 보장</strong></h2>
        <div class="mxg-mega">$100+</div>
        <p class="mxg-criteria">동일 크루즈 · 동일 출발일 · 동일 객실 조건</p>
        <p class="mxg-copy">$100 이상 낮은 가격이 확인되면<br><strong>보장 조건에 따라 가격을 조정합니다</strong></p>
        <p class="mxg-note">세부 비교 · 신청 · 적용 조건은 최저가 보장 약관 기준</p>
      </div>`;

    if (section9.nextElementSibling !== section10) section9.insertAdjacentElement('afterend', section10);
    if (section10.nextElementSibling !== priceExamples) section10.insertAdjacentElement('afterend', priceExamples);
    if (priceExamples.nextElementSibling !== section11) priceExamples.insertAdjacentElement('afterend', section11);
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

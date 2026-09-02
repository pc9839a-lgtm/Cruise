(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  function removeGeneratedDuplicates() {
    ['#impact-price', '#impact-same', '#impact-cost', '#impact-guide'].forEach((selector) => {
      const el = $(selector);
      if (el) el.remove();
    });
  }

  function addMediterranean() {
    const anchor = $('#mx-moving-hotel-4');
    if (!anchor) return false;

    let section = $('#impact-med');

    if (!section) {
      section = document.createElement('section');
      section.id = 'impact-med';
      section.className = 'impact-section impact-med';
    }

    section.innerHTML = `
      <div class="impact-med-glow" aria-hidden="true"></div>
      <div class="impact-inner">
        <div class="impact-label dark">지중해 7박 8일 · 예시</div>
        <h2 class="impact-title light">실제 여행 동선은<br><strong>이렇게 이어집니다</strong></h2>

        <div class="impact-med-cycle" aria-label="기항지 하루 여행 흐름">
          <strong>하선</strong><i>→</i><strong>도시 관광</strong><i>→</i><strong>승선</strong>
        </div>

        <div class="impact-med-route" aria-label="지중해 크루즈 7박 8일 예시 동선">
          <div class="impact-med-line" aria-hidden="true"><i></i></div>
          <div class="impact-med-stop"><b>DAY 1</b><strong>바르셀로나</strong><span>출항</span></div>
          <div class="impact-med-stop"><b>DAY 2</b><strong>마르세유</strong><span>프랑스</span></div>
          <div class="impact-med-stop"><b>DAY 3</b><strong>제노바</strong><span>이탈리아</span></div>
          <div class="impact-med-stop"><b>DAY 4</b><strong>로마</strong><span>치비타베키아</span></div>
          <div class="impact-med-stop"><b>DAY 5</b><strong>나폴리</strong><span>남부 이탈리아</span></div>
          <div class="impact-med-stop"><b>DAY 6–7</b><strong>해상 · 기항</strong><span>선사별 일정 상이</span></div>
          <div class="impact-med-stop"><b>DAY 8</b><strong>바르셀로나</strong><span>귀항</span></div>
        </div>

        <div class="impact-med-bottom">
          <span>기항일</span><b>도시 여행</b><i></i><span>정해진 시간</span><b>배로 복귀</b>
        </div>
      </div>`;

    if (anchor.nextElementSibling !== section) {
      anchor.insertAdjacentElement('afterend', section);
    }

    return true;
  }

  function build() {
    removeGeneratedDuplicates();
    return addMediterranean();
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (build() || tries > 40) clearInterval(timer);
  }, 160);

  if (document.readyState !== 'loading') build();
  else document.addEventListener('DOMContentLoaded', build, { once: true });
})();

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
    if ($('#impact-med')) return;
    const anchor = $('#mx-moving-hotel') || $('#guide-question');
    if (!anchor) return;

    const section = document.createElement('section');
    section.id = 'impact-med';
    section.className = 'impact-section impact-med';
    section.innerHTML = `
      <div class="impact-med-glow" aria-hidden="true"></div>
      <div class="impact-inner">
        <div class="impact-label dark">지중해 7박 8일 · 예시</div>
        <h2 class="impact-title light">짐은 그대로<br><strong>도시만 바뀝니다</strong></h2>
        <div class="impact-med-route" aria-label="지중해 크루즈 예시 동선">
          <div class="impact-med-line" aria-hidden="true"><i></i></div>
          <div class="impact-med-stop"><b>DAY 1</b><strong>바르셀로나</strong><span>출항</span></div>
          <div class="impact-med-stop"><b>DAY 2</b><strong>마르세유</strong><span>프랑스</span></div>
          <div class="impact-med-stop"><b>DAY 3</b><strong>제노바</strong><span>이탈리아</span></div>
          <div class="impact-med-stop"><b>DAY 4</b><strong>로마</strong><span>치비타베키아</span></div>
          <div class="impact-med-stop"><b>DAY 5</b><strong>나폴리</strong><span>남부 이탈리아</span></div>
          <div class="impact-med-stop"><b>DAY 6–7</b><strong>해상 · 기항</strong><span>선사별 일정 상이</span></div>
          <div class="impact-med-stop"><b>DAY 8</b><strong>바르셀로나</strong><span>귀항</span></div>
        </div>
        <div class="impact-med-bottom"><span>짐 이동</span><b>0번</b><i></i><span>객실</span><b>그대로</b></div>
      </div>`;

    anchor.insertAdjacentElement('afterend', section);
  }

  function build() {
    removeGeneratedDuplicates();
    addMediterranean();
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    build();
    if ($('#impact-med')) clearInterval(timer);
    if (tries > 40) clearInterval(timer);
  }, 160);

  if (document.readyState !== 'loading') build();
  else document.addEventListener('DOMContentLoaded', build, { once: true });
})();

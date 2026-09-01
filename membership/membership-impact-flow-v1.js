(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  function insertAfter(anchor, section) {
    if (!anchor || !anchor.parentNode) return;
    anchor.insertAdjacentElement('afterend', section);
  }

  function addPriceImpact() {
    if ($('#impact-price')) return;
    const anchor = $('#price-compare') || $('#price-bridge');
    if (!anchor) return;
    const section = document.createElement('section');
    section.id = 'impact-price';
    section.className = 'impact-section impact-price';
    section.innerHTML = `
      <div class="impact-inner">
        <div class="impact-label">4박 5일 · 2명 기준</div>
        <h2 class="impact-title">같은 크루즈인데<br><strong>160만원이 남습니다</strong></h2>
        <div class="impact-price-stage">
          <article class="impact-price-card impact-price-old" data-impact-card>
            <span>여행사 · 가이드 포함</span>
            <strong>400만원</strong>
          </article>
          <div class="impact-price-arrow" aria-hidden="true"><i></i><b>→</b></div>
          <article class="impact-price-card impact-price-direct" data-impact-card>
            <span>직접 예약</span>
            <strong>240만원</strong>
          </article>
        </div>
        <div class="impact-diff" data-impact-diff>
          <small>둘이 합쳐</small>
          <strong>160만원</strong>
          <b>차이</b>
        </div>
      </div>`;
    insertAfter(anchor, section);
  }

  function addSameImpact() {
    if ($('#impact-same')) return;
    const anchor = $('#same-cruise');
    if (!anchor) return;
    const section = document.createElement('section');
    section.id = 'impact-same';
    section.className = 'impact-section impact-same';
    section.innerHTML = `
      <div class="impact-inner">
        <div class="impact-label dark">SAME CRUISE</div>
        <h2 class="impact-title light">싸졌다고<br><strong>여행이 줄어드는 게 아닙니다</strong></h2>
        <div class="impact-same-list">
          <div class="impact-same-row"><span class="impact-check">✓</span><strong>같은 배</strong></div>
          <div class="impact-same-row"><span class="impact-check">✓</span><strong>같은 객실 등급</strong></div>
          <div class="impact-same-row"><span class="impact-check">✓</span><strong>같은 식사</strong></div>
          <div class="impact-same-row"><span class="impact-check">✓</span><strong>같은 공연</strong></div>
        </div>
        <div class="impact-only-change"><span>달라지는 건</span><strong>예약 방식 하나</strong></div>
      </div>`;
    insertAfter(anchor, section);
  }

  function addCostImpact() {
    if ($('#impact-cost')) return;
    const anchor = $('#mx-cost-structure');
    if (!anchor) return;
    const section = document.createElement('section');
    section.id = 'impact-cost';
    section.className = 'impact-section impact-cost';
    section.innerHTML = `
      <div class="impact-inner">
        <div class="impact-label">가격 차이의 정체</div>
        <h2 class="impact-title">크루즈값 위에<br><strong>이 비용이 더해집니다</strong></h2>
        <div class="impact-cost-stack">
          <div class="impact-cost-line"><span>+</span><strong>가이드 동행</strong></div>
          <div class="impact-cost-line"><span>+</span><strong>단체 이동</strong></div>
          <div class="impact-cost-line"><span>+</span><strong>패키지 운영</strong></div>
          <div class="impact-cost-line"><span>+</span><strong>예약 대행</strong></div>
        </div>
        <div class="impact-cost-result"><span>직접 하면</span><strong>필요한 것만 결제</strong></div>
      </div>`;
    insertAfter(anchor, section);
  }

  function addGuideImpact() {
    if ($('#impact-guide')) return;
    const anchor = $('#guide-question');
    if (!anchor) return;
    const section = document.createElement('section');
    section.id = 'impact-guide';
    section.className = 'impact-section impact-guide';
    section.innerHTML = `
      <div class="impact-inner">
        <div class="impact-label">가이드 없이</div>
        <h2 class="impact-title">항구에 도착하면<br><strong>이 순서대로</strong></h2>
        <div class="impact-route" aria-label="크루즈 이용 5단계">
          <div class="impact-route-progress" aria-hidden="true"><i></i></div>
          <div class="impact-route-step"><b>01</b><strong>항구</strong></div>
          <div class="impact-route-step"><b>02</b><strong>체크인</strong></div>
          <div class="impact-route-step"><b>03</b><strong>승선</strong></div>
          <div class="impact-route-step"><b>04</b><strong>기항지</strong></div>
          <div class="impact-route-step"><b>05</b><strong>하선</strong></div>
        </div>
        <div class="impact-guide-note"><strong>안내표지 보고</strong><span>순서대로 이동</span></div>
      </div>`;
    insertAfter(anchor, section);
  }

  function addMediterranean() {
    if ($('#impact-med')) return;
    const anchor = $('#impact-guide') || $('#mx-moving-hotel');
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
    insertAfter(anchor, section);
  }

  function build() {
    addPriceImpact();
    addSameImpact();
    addCostImpact();
    addGuideImpact();
    addMediterranean();
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    build();
    if ($('#impact-price') && $('#impact-same') && $('#impact-cost') && $('#impact-guide') && $('#impact-med')) clearInterval(timer);
    if (tries > 40) clearInterval(timer);
  }, 160);

  if (document.readyState !== 'loading') build();
  else document.addEventListener('DOMContentLoaded', build, { once: true });
})();

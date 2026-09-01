(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function insertBefore(target, html) {
    if (!target) return;
    target.insertAdjacentHTML('beforebegin', html);
  }

  function insertAfter(target, html) {
    if (!target) return;
    target.insertAdjacentHTML('afterend', html);
  }

  function buildExpansion() {
    const reviewFlow = $('.review-flow-section');
    const sameCruise = $('#same-cruise');
    const guide = $('#guide-question');
    const membershipPoint = $('#membership-point');
    const ledger = $('#points-by-time');
    const calculator = $('#calculator');
    const plans = $('#plans');
    const terms = $('#membership-terms');
    const priceMatch = $('#price-match');

    if (!reviewFlow || !sameCruise || !guide || !membershipPoint || !ledger || !calculator || !plans || !terms || !priceMatch) return false;

    if (!$('#mx-moving-hotel')) {
      insertAfter(reviewFlow, `
        <section id="mx-moving-hotel" class="mx-expand-section">
          <div class="mx-inner">
            <div class="mx-center">
              <span class="mx-eyebrow mx-reveal">크루즈가 편한 이유</span>
              <h2 class="mx-title mx-reveal">호텔을 옮기는 게 아니라<br><strong>호텔이 움직입니다</strong></h2>
              <p class="mx-sub mx-reveal">짐은 객실에 두고, 먹고 쉬고 자는 동안 배가 다음 도시로 이동합니다.</p>
            </div>
            <div class="mx-hotel-layout">
              <div class="mx-hotel-visual mx-reveal mx-left">
                <img src="./img/KakaoTalk_20260405_150550057_03.jpg" alt="크루즈 오션뷰 공간" loading="lazy" />
                <div class="mx-hotel-caption"><span>짐은 그대로</span><strong>아침이면<br>다른 도시</strong></div>
              </div>
              <div class="mx-hotel-points">
                <div class="mx-hotel-point mx-reveal"><b>01</b><strong>짐은 한 번만 풀기</strong></div>
                <div class="mx-hotel-point mx-reveal"><b>02</b><strong>식사·공연은 배에서</strong></div>
                <div class="mx-hotel-point mx-reveal"><b>03</b><strong>자는 동안 이동</strong></div>
                <div class="mx-hotel-point mx-reveal"><b>04</b><strong>도착하면 도시 여행</strong></div>
              </div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-cost-structure')) {
      insertAfter(sameCruise, `
        <section id="mx-cost-structure" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">둘이 약 160만원 차이</span>
            <h2 class="mx-title mx-reveal">같은 크루즈인데<br><strong>왜 가격이 다를까?</strong></h2>
            <p class="mx-sub mx-reveal">차이는 크루즈 자체보다 패키지에 포함되는 서비스에서 생길 수 있습니다.</p>
            <div class="mx-card-grid">
              <article class="mx-card mx-reveal"><b>01</b><strong>가이드</strong><span>인솔·일정 안내</span></article>
              <article class="mx-card mx-reveal"><b>02</b><strong>단체 이동</strong><span>공항·항구·관광지 이동</span></article>
              <article class="mx-card mx-reveal"><b>03</b><strong>패키지 운영</strong><span>여러 일정을 묶어 운영</span></article>
              <article class="mx-card mx-reveal"><b>04</b><strong>예약 대행</strong><span>예약 과정을 대신 처리</span></article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-prepare-money')) {
      insertBefore(membershipPoint, `
        <section id="mx-prepare-money" class="mx-expand-section mx-dark">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">직접 예약 ≠ 멤버십</span>
            <h2 class="mx-title mx-reveal">직접 예약은 비용을 줄이는 방법<br><strong>멤버십은 POINT를 쌓는 방법</strong></h2>
            <div class="mx-prepare-grid">
              <div class="mx-prepare-box mx-reveal mx-left">
                <span>직접 예약</span>
                <strong>패키지 비용 줄이기</strong>
                <em>크루즈를 직접 예약</em>
              </div>
              <div class="mx-prepare-vs mx-reveal">→</div>
              <div class="mx-prepare-box good mx-reveal mx-right">
                <span>CLASSIC 멤버십</span>
                <strong>$100 → 200P</strong>
                <em>매월 결제 · 매월 적립</em>
              </div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-point-use')) {
      insertAfter(ledger, `
        <section id="mx-point-use" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">POINT는 어디에 쓰나?</span>
            <h2 class="mx-title mx-reveal">쌓아두는 포인트가 아니라<br><strong>크루즈 예약에 쓰는 POINT</strong></h2>
            <div class="mx-flow">
              <div class="mx-flow-step mx-reveal"><b>01</b><strong>월 $100 결제</strong><span>CLASSIC 기준</span></div>
              <div class="mx-flow-arrow mx-reveal">→</div>
              <div class="mx-flow-step mx-reveal"><b>02</b><strong>200P 적립</strong><span>매월 적립</span></div>
              <div class="mx-flow-arrow mx-reveal">→</div>
              <div class="mx-flow-step mx-reveal"><b>03</b><strong>크루즈 예약</strong><span>예약 조건에 맞춰 사용</span></div>
            </div>
            <div class="mx-count-big mx-reveal mx-pop"><span data-mx-count="2400">0</span><small>P</small></div>
            <p class="mx-sub mx-reveal">CLASSIC 월 적립분 기준 · 12개월 = 2,400P</p>
          </div>
        </section>`);
    }

    if (!$('#mx-use-rules')) {
      insertAfter(calculator, `
        <section id="mx-use-rules" class="mx-expand-section mx-dark">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">POINT가 모자라면?</span>
            <h2 class="mx-title mx-reveal">있는 만큼 쓰고<br><strong>나머지는 카드로 결제</strong></h2>
            <div class="mx-dual">
              <article class="mx-dual-card mx-reveal mx-left">
                <div><span class="mx-mini">일반 예약 예시</span><h3>모은 POINT<br><strong>+ 나머지 CARD</strong></h3></div>
                <div class="mx-equation"><strong>POINT</strong><span>+</span><strong>CARD</strong></div>
                <p>예약 조건에 따라 사용할 수 있는 POINT를 적용하고 남은 금액을 카드로 결제할 수 있습니다.</p>
              </article>
              <article class="mx-dual-card mx-reveal mx-right">
                <div><span class="mx-mini">출발까지 270일+</span><h3><strong><span data-mx-count="270">0</span>일+</strong><br>POINT를 더 많이 쓸 수 있는 조건</h3></div>
                <div class="mx-equation"><strong>270일+</strong><span>→</span><strong>POINT ↑</strong></div>
                <p>출발일까지 충분한 기간이 남은 예약은 POINT 사용 범위가 커질 수 있습니다. 실제 한도는 예약 조건에서 확인합니다.</p>
              </article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-fit-check')) {
      const planGuide = $('#mx-plan-guide');
      insertBefore(planGuide || plans, `
        <section id="mx-fit-check" class="mx-expand-section">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">가입 전 10초 체크</span>
            <h2 class="mx-title mx-reveal">1~2년 안에<br><strong>크루즈 갈 계획이 있나요?</strong></h2>
            <div class="mx-fit-grid">
              <article class="mx-fit-box good mx-reveal mx-left">
                <h3>YES · 숫자 비교</h3>
                <div class="mx-fit-list">
                  <div class="mx-fit-item"><b>✓</b><span>1~2년 안에 크루즈를 갈 생각이 있다</span></div>
                  <div class="mx-fit-item"><b>✓</b><span>직접 예약도 가능하다</span></div>
                  <div class="mx-fit-item"><b>✓</b><span>월 결제로 POINT 적립이 괜찮다</span></div>
                  <div class="mx-fit-item"><b>✓</b><span>크루즈를 다시 탈 가능성이 있다</span></div>
                </div>
              </article>
              <article class="mx-fit-box mx-reveal mx-right">
                <h3>NO · 지금은 보류</h3>
                <div class="mx-fit-list">
                  <div class="mx-fit-item"><b>–</b><span>크루즈 계획이 아직 없다</span></div>
                  <div class="mx-fit-item"><b>–</b><span>가이드 포함 패키지만 원한다</span></div>
                  <div class="mx-fit-item"><b>–</b><span>곧바로 출발해야 한다</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-plan-guide')) {
      insertBefore(plans, `
        <section id="mx-plan-guide" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">플랜은 두 개</span>
            <h2 class="mx-title mx-reveal">CLASSIC $100<br><strong>PREMIUM $250</strong></h2>
            <div class="mx-speed-grid">
              <article class="mx-speed-card mx-reveal mx-left">
                <b>CLASSIC</b>
                <h3>$100 /월</h3>
                <p>$100 결제 → 200P 적립</p>
                <div class="mx-speed-number"><span>매월</span><strong>200P</strong></div>
              </article>
              <article class="mx-speed-card recommended mx-reveal mx-right">
                <b>PREMIUM</b>
                <h3>$250 /월</h3>
                <p>$250 결제 → 500P 적립</p>
                <div class="mx-speed-number"><span>매월</span><strong>500P</strong></div>
              </article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-faq-section')) {
      insertAfter(terms, `
        <section id="mx-faq-section" class="mx-expand-section mx-dark">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">헷갈리는 것만</span>
            <h2 class="mx-title mx-reveal">가입 전<br><strong>5문 5답</strong></h2>
            <div class="mx-faq mx-reveal">
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>직접 예약하면 멤버십 가입이 필수인가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>아닙니다. 직접 예약과 멤버십은 별개입니다. 직접 예약은 패키지 대신 크루즈를 직접 예약하는 방식이고, 멤버십은 월 결제로 POINT를 적립하는 선택입니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>POINT가 다 모일 때까지 여행을 못 가나요?</span><b>+</b></button><div class="mx-faq-a"><div><p>아닙니다. 예약 조건에 따라 사용할 수 있는 POINT를 적용하고 남은 금액을 카드로 결제할 수 있습니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>가이드 없이 처음 타도 되나요?</span><b>+</b></button><div class="mx-faq-a"><div><p>항구 도착, 체크인, 승선, 기항지, 하선 순서를 미리 확인하면 흐름은 단순합니다. 개인 여행 경험에 따라 필요한 준비 수준은 달라질 수 있습니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>CLASSIC과 PREMIUM은 뭐가 다른가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>CLASSIC은 매월 $100 결제 시 200P, PREMIUM은 매월 $250 결제 시 500P가 적립됩니다. 가입 시 초기 결제와 초기 적립 POINT도 각각 다릅니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>가입 전에 꼭 확인할 건 뭔가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>환불 가능 기간, 본인 명의 결제, 예약에 필요한 멤버십 유지 조건, 해지 시 POINT 처리 기준을 확인해야 합니다.</p></div></div></div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-recap')) {
      insertAfter(priceMatch, `
        <section id="mx-recap" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">딱 3개만</span>
            <h2 class="mx-title mx-reveal">직접 예약 · 멤버십 · <strong>POINT</strong></h2>
            <div class="mx-recap-grid">
              <article class="mx-recap-card mx-reveal"><b>01</b><div><strong>직접 예약</strong><span>패키지 대신 크루즈를 직접 예약해 포함 비용을 줄이는 방식</span></div></article>
              <article class="mx-recap-card mx-reveal"><b>02</b><div><strong>멤버십</strong><span>월 결제로 POINT를 적립하는 선택</span></div></article>
              <article class="mx-recap-card mx-reveal"><b>03</b><div><strong>POINT</strong><span>예약 조건에 맞춰 크루즈 예약에 사용</span></div></article>
            </div>
            <a href="#plans" class="mx-action mx-reveal">두 플랜 비교</a>
          </div>
        </section>`);
    }

    if (!$('#mx-final-choice')) {
      const recap = $('#mx-recap');
      insertAfter(recap || priceMatch, `
        <section id="mx-final-choice" class="mx-final">
          <div class="mx-inner">
            <h2 class="mx-reveal">크루즈 갈 계획이 있다면<br><strong>숫자만 비교해보세요</strong></h2>
            <p class="mx-reveal">CLASSIC $100 → 200P · PREMIUM $250 → 500P</p>
            <a href="#plans" class="mx-action mx-reveal">두 플랜 비교</a>
          </div>
        </section>`);
    }

    return true;
  }

  function setupFaq() {
    if (document.body.dataset.mxFaqBound === '1') return;
    document.body.dataset.mxFaqBound = '1';

    document.addEventListener('click', (event) => {
      const q = event.target.closest('.mx-faq-q');
      if (!q) return;
      const item = q.closest('.mx-faq-item');
      const willOpen = !item.classList.contains('open');
      item.parentElement.querySelectorAll('.mx-faq-item.open').forEach((other) => {
        if (other === item) return;
        other.classList.remove('open');
        other.querySelector('.mx-faq-q')?.setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('open', willOpen);
      q.setAttribute('aria-expanded', String(willOpen));
    });
  }

  function animateCount(el) {
    if (el.dataset.mxCountDone === '1') return;
    el.dataset.mxCountDone = '1';
    const target = Number(el.dataset.mxCount || 0);
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function setupMotion() {
    if (document.documentElement.dataset.mxMotionBound === '1') return;
    document.documentElement.dataset.mxMotionBound = '1';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      $$('[data-mx-count]').forEach((el) => {
        el.textContent = Number(el.dataset.mxCount || 0).toLocaleString('ko-KR');
      });
      $$('.mx-reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('mx-motion-ready');

    $$('.mx-card-grid,.mx-hotel-points,.mx-flow,.mx-recap-grid').forEach((group) => {
      [...group.children].forEach((child, index) => child.style.setProperty('--mx-delay', `${Math.min(index * 90, 450)}ms`));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll?.('[data-mx-count]').forEach(animateCount);
        if (entry.target.matches('[data-mx-count]')) animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    $$('.mx-reveal,[data-mx-count]').forEach((el) => observer.observe(el));
  }

  function initExpansion() {
    if (!buildExpansion()) return false;
    setupFaq();
    setupMotion();
    return true;
  }

  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (initExpansion() || tries >= 30) window.clearInterval(timer);
  }, 160);

  if (document.readyState !== 'loading') initExpansion();
  else document.addEventListener('DOMContentLoaded', initExpansion, { once: true });
})();

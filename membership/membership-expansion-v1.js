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
    const sameCruise = $('#same-cruise');
    const guide = $('#guide-question');
    const ledger = $('#points-by-time');
    const calculator = $('#calculator');
    const plans = $('#plans');
    const terms = $('#membership-terms');
    const priceMatch = $('#price-match');

    if (!sameCruise || !guide || !ledger || !calculator || !plans || !terms || !priceMatch) return false;

    if (!$('#mx-cost-structure')) {
      insertAfter(sameCruise, `
        <section id="mx-cost-structure" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">가격 차이가 생기는 지점</span>
            <h2 class="mx-title mx-reveal">크루즈가 달라진 게 아니라<br><strong>예약 방식이 달라집니다</strong></h2>
            <p class="mx-sub mx-reveal">여행사 패키지에는 상품에 따라 가이드·단체 이동·운영·예약 대행 같은 비용이 함께 포함될 수 있습니다.</p>
            <div class="mx-card-grid">
              <article class="mx-card mx-reveal"><b>01</b><strong>가이드</strong><span>일정을 함께 움직이는 인솔·안내 비용</span></article>
              <article class="mx-card mx-reveal"><b>02</b><strong>단체 이동</strong><span>공항·항구·관광지 이동을 묶어 운영</span></article>
              <article class="mx-card mx-reveal"><b>03</b><strong>패키지 운영</strong><span>여러 일정과 서비스를 한 상품으로 구성</span></article>
              <article class="mx-card mx-reveal"><b>04</b><strong>예약 대행</strong><span>직접 고르고 예약하는 과정을 대신 처리</span></article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-moving-hotel')) {
      insertAfter(guide, `
        <section id="mx-moving-hotel" class="mx-expand-section">
          <div class="mx-inner">
            <div class="mx-center">
              <span class="mx-eyebrow mx-reveal">크루즈 여행 구조</span>
              <h2 class="mx-title mx-reveal">객실은 그대로<br><strong>배가 다음 도시로 갑니다</strong></h2>
              <p class="mx-sub mx-reveal">짐을 매일 싸서 호텔을 옮길 필요가 없습니다. 자고 일어나면 배가 다음 도시 근처에 도착해 있습니다.</p>
            </div>
            <div class="mx-hotel-layout">
              <div class="mx-hotel-visual mx-reveal mx-left">
                <img src="./img/KakaoTalk_20260405_150550057_03.jpg" alt="크루즈 오션뷰 공간" loading="lazy" />
                <div class="mx-hotel-caption"><span>한 번 승선하면</span><strong>객실은 그대로<br>도시만 바뀝니다</strong></div>
              </div>
              <div class="mx-hotel-points">
                <div class="mx-hotel-point mx-reveal"><b>01</b><strong>짐은 객실에</strong></div>
                <div class="mx-hotel-point mx-reveal"><b>02</b><strong>식사는 배 안에서</strong></div>
                <div class="mx-hotel-point mx-reveal"><b>03</b><strong>잠든 사이 이동</strong></div>
                <div class="mx-hotel-point mx-reveal"><b>04</b><strong>기항지만 즐기기</strong></div>
              </div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-prepare-money') && !$('#mx-point-use')) {
      insertAfter(ledger, `
        <section id="mx-prepare-money" class="mx-expand-section mx-dark">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">CLASSIC 적립 구조</span>
            <h2 class="mx-title mx-reveal">매월 $100 결제하면<br><strong>200P가 적립됩니다</strong></h2>
            <div class="mx-prepare-grid">
              <div class="mx-prepare-box mx-reveal mx-left">
                <span>월 멤버십 결제</span>
                <strong>$100</strong>
                <em>CLASSIC 월 결제 기준</em>
              </div>
              <div class="mx-prepare-vs mx-reveal">→</div>
              <div class="mx-prepare-box good mx-reveal mx-right">
                <span>매월 적립</span>
                <strong>200P</strong>
                <em>크루즈 예약에 사용하는 Reward Points</em>
              </div>
            </div>
          </div>
        </section>
        <section id="mx-point-use" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">POINT 사용</span>
            <h2 class="mx-title mx-reveal">적립한 포인트는<br><strong>크루즈 예약에 씁니다</strong></h2>
            <div class="mx-flow">
              <div class="mx-flow-step mx-reveal"><b>STEP 1</b><strong>월 $100 결제</strong><span>CLASSIC 기준</span></div>
              <div class="mx-flow-arrow mx-reveal">→</div>
              <div class="mx-flow-step mx-reveal"><b>STEP 2</b><strong>200P 적립</strong><span>매월 Reward Points 적립</span></div>
              <div class="mx-flow-arrow mx-reveal">→</div>
              <div class="mx-flow-step mx-reveal"><b>STEP 3</b><strong>크루즈 예약</strong><span>예약 조건에 맞춰 포인트 적용</span></div>
            </div>
            <div class="mx-count-big mx-reveal mx-pop"><span data-mx-count="2400">0</span><small>P</small></div>
            <p class="mx-sub mx-reveal">CLASSIC 월 적립분만 계산하면 12개월 동안 2,400P가 적립됩니다.</p>
          </div>
        </section>`);
    }

    if (!$('#mx-use-rules')) {
      insertAfter(calculator, `
        <section id="mx-use-rules" class="mx-expand-section mx-dark">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">POINT 결제</span>
            <h2 class="mx-title mx-reveal">포인트가 부족하면<br><strong>남은 금액은 카드로 결제</strong></h2>
            <div class="mx-dual">
              <article class="mx-dual-card mx-reveal mx-left">
                <div><span class="mx-mini">보유 포인트가 부족한 경우</span><h3>사용 가능한 포인트를 쓰고<br><strong>나머지는 카드 결제</strong></h3></div>
                <div class="mx-equation"><strong>POINT</strong><span>+</span><strong>CARD</strong></div>
                <p>예약 조건에 따라 사용할 수 있는 포인트를 적용하고 남은 금액을 카드로 결제할 수 있습니다.</p>
              </article>
              <article class="mx-dual-card mx-reveal mx-right">
                <div><span class="mx-mini">출발까지 270일 이상 남은 경우</span><h3><strong><span data-mx-count="270">0</span>일+</strong><br>포인트를 더 많이 적용</h3></div>
                <div class="mx-equation"><strong>270일+</strong><span>→</span><strong>POINT ↑</strong></div>
                <p>출발까지 충분한 기간이 남은 예약은 포인트 적용 범위가 커질 수 있습니다. 실제 사용 한도는 예약 조건에서 확인합니다.</p>
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
            <span class="mx-eyebrow mx-reveal">가입 전 체크</span>
            <h2 class="mx-title mx-reveal">앞으로 크루즈를 갈 계획이 있다면<br><strong>멤버십을 비교해볼 수 있습니다</strong></h2>
            <div class="mx-fit-grid">
              <article class="mx-fit-box good mx-reveal mx-left">
                <h3>비교해볼 만한 경우</h3>
                <div class="mx-fit-list">
                  <div class="mx-fit-item"><b>✓</b><span>앞으로 1~2년 안에 크루즈 여행 계획이 있다</span></div>
                  <div class="mx-fit-item"><b>✓</b><span>매월 멤버십 결제로 포인트를 적립할 계획이 있다</span></div>
                  <div class="mx-fit-item"><b>✓</b><span>가이드 없이 직접 예약하는 것도 가능하다</span></div>
                  <div class="mx-fit-item"><b>✓</b><span>한 번보다 여러 번 크루즈를 이용할 가능성이 있다</span></div>
                </div>
              </article>
              <article class="mx-fit-box mx-reveal mx-right">
                <h3>지금은 보류해도 되는 경우</h3>
                <div class="mx-fit-list">
                  <div class="mx-fit-item"><b>–</b><span>크루즈 여행 계획이 아직 전혀 없다</span></div>
                  <div class="mx-fit-item"><b>–</b><span>가이드 포함 패키지만 이용하고 싶다</span></div>
                  <div class="mx-fit-item"><b>–</b><span>아주 가까운 날짜에 바로 출발해야 한다</span></div>
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
            <span class="mx-eyebrow mx-reveal">플랜 비교</span>
            <h2 class="mx-title mx-reveal">매월 얼마 내고<br><strong>몇 포인트 받는지만 비교</strong></h2>
            <div class="mx-speed-grid">
              <article class="mx-speed-card mx-reveal mx-left">
                <b>CLASSIC</b>
                <h3>월 $100</h3>
                <p>매월 200P가 적립됩니다.</p>
                <div class="mx-speed-number"><span>매월 적립</span><strong>200P</strong></div>
              </article>
              <article class="mx-speed-card recommended mx-reveal mx-right">
                <b>PREMIUM</b>
                <h3>월 $250</h3>
                <p>매월 500P가 적립됩니다.</p>
                <div class="mx-speed-number"><span>매월 적립</span><strong>500P</strong></div>
              </article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-faq-section')) {
      insertAfter(terms, `
        <section id="mx-faq-section" class="mx-expand-section mx-dark">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">FAQ</span>
            <h2 class="mx-title mx-reveal">가입 전에<br><strong>이것만 확인하세요</strong></h2>
            <div class="mx-faq mx-reveal">
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>정말 같은 크루즈를 더 저렴하게 예약하는 건가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>같은 선사·일정·객실 등급처럼 비교 조건을 맞춘 뒤 가격을 봐야 합니다. 앞의 가격은 이해를 위한 아시아 크루즈 예시이며 실제 가격은 일정과 객실에 따라 달라집니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>포인트가 다 모일 때까지 여행을 못 가나요?</span><b>+</b></button><div class="mx-faq-a"><div><p>아닙니다. 예약 조건에 따라 사용할 수 있는 포인트를 적용하고 남은 금액을 카드로 결제할 수 있습니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>가이드 없이 처음 가도 괜찮나요?</span><b>+</b></button><div class="mx-faq-a"><div><p>항구 도착, 승선, 선내 이용, 기항지 복귀, 하선 순서를 미리 확인하면 준비하기 수월합니다. 개인의 언어·여행 경험에 따라 필요한 준비 수준은 달라질 수 있습니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>CLASSIC과 PREMIUM의 차이는 무엇인가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>CLASSIC은 매월 $100 결제 시 200P, PREMIUM은 매월 $250 결제 시 500P가 적립됩니다. 가입 시 초기 결제와 초기 적립 포인트는 별도로 확인해야 합니다.</p></div></div></div>
              <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>가입 전에 꼭 다시 봐야 할 조건은 무엇인가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>환불 가능 기간, 본인 명의 결제, 예약 시 필요한 멤버십 유지 조건, 해지 시 포인트 처리 기준은 반드시 확인해야 합니다.</p></div></div></div>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-recap')) {
      insertAfter(priceMatch, `
        <section id="mx-recap" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow mx-reveal">3줄 요약</span>
            <h2 class="mx-title mx-reveal">결제 · 적립 · <strong>예약</strong></h2>
            <div class="mx-recap-grid">
              <article class="mx-recap-card mx-reveal"><b>01</b><div><strong>같은 크루즈도 예약 방식에 따라 가격이 달라질 수 있습니다</strong><span>선사·일정·객실 등급과 포함 서비스를 같은 조건으로 비교합니다.</span></div></article>
              <article class="mx-recap-card mx-reveal"><b>02</b><div><strong>CLASSIC은 월 $100 → 200P</strong><span>PREMIUM은 월 $250 → 500P가 적립됩니다.</span></div></article>
              <article class="mx-recap-card mx-reveal"><b>03</b><div><strong>적립한 포인트는 크루즈 예약에 사용합니다</strong><span>예약 조건에 따라 포인트와 카드 결제를 함께 사용할 수 있습니다.</span></div></article>
            </div>
            <a href="#plans" class="mx-action mx-reveal">CLASSIC · PREMIUM 다시 보기</a>
          </div>
        </section>`);
    }

    if (!$('#mx-final-choice')) {
      const recap = $('#mx-recap');
      insertAfter(recap || priceMatch, `
        <section id="mx-final-choice" class="mx-final">
          <div class="mx-inner">
            <h2 class="mx-reveal">내 여행 계획에 맞으면<br><strong>플랜을 선택하세요</strong></h2>
            <p class="mx-reveal">월 결제금액과 적립 포인트, 실제 여행 시점을 비교한 뒤 결정하면 됩니다.</p>
            <a href="#plans" class="mx-action mx-reveal">CLASSIC · PREMIUM 비교</a>
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

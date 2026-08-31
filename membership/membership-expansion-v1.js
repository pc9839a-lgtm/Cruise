(() => {
  'use strict';

  const CHAPTERS = [
    ['1', 'mx-chapter-1', '가격의 차이'],
    ['2', 'mx-chapter-2', '가이드 없이'],
    ['3', 'mx-chapter-3', '포인트 구조'],
    ['4', 'mx-chapter-4', '실제 여행비'],
    ['5', 'mx-chapter-5', '플랜 선택'],
    ['6', 'mx-chapter-6', '가입 전 확인']
  ];

  const chapter = (no, id, kicker, title, sub) => `
    <section id="${id}" class="mx-chapter" data-mx-chapter="${no}">
      <div class="mx-inner mx-chapter-grid">
        <div class="mx-chapter-no mx-reveal mx-left" data-mx-parallax>${String(no).padStart(2, '0')}</div>
        <div class="mx-chapter-copy">
          <small class="mx-reveal">CHAPTER ${String(no).padStart(2, '0')} · ${kicker}</small>
          <h2 class="mx-reveal">${title}</h2>
          <p class="mx-reveal">${sub}</p>
          <div class="mx-chapter-index mx-reveal"><strong>${String(no).padStart(2, '0')}</strong><span>/ 06</span></div>
        </div>
      </div>
    </section>`;

  function insertBefore(target, html) {
    if (!target) return;
    target.insertAdjacentHTML('beforebegin', html);
  }

  function insertAfter(target, html) {
    if (!target) return;
    target.insertAdjacentHTML('afterend', html);
  }

  function buildExpansion() {
    if (document.getElementById('mx-chapter-1')) return false;

    const pricePain = document.getElementById('price-pain');
    const sameCruise = document.getElementById('same-cruise');
    const guide = document.getElementById('guide-question');
    const point = document.getElementById('membership-point');
    const ledger = document.getElementById('points-by-time');
    const realCost = document.getElementById('real-cost');
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    const terms = document.getElementById('membership-terms');
    const priceMatch = document.getElementById('price-match');

    if (!pricePain || !sameCruise || !guide || !point || !ledger || !realCost || !calculator || !plans || !terms || !priceMatch) {
      return false;
    }

    insertBefore(pricePain, chapter(
      1,
      'mx-chapter-1',
      '가격의 차이',
      '같은 크루즈인데<br><strong>왜 가격이 다를까요?</strong>',
      '먼저 크루즈 자체의 가격과 여행사 패키지 가격을 분리해서 봅니다. 무엇이 다른지 알면 160만원 차이가 훨씬 쉽게 이해됩니다.'
    ));

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

    insertBefore(guide, chapter(
      2,
      'mx-chapter-2',
      '가이드 없이',
      '처음인데도<br><strong>직접 갈 수 있을까요?</strong>',
      '크루즈는 매일 호텔을 옮기는 자유여행과 다릅니다. 한 번 승선하면 객실은 그대로 있고, 배가 다음 도시로 움직입니다.'
    ));

    insertAfter(guide, `
      <section id="mx-moving-hotel" class="mx-expand-section">
        <div class="mx-inner">
          <div class="mx-center">
            <span class="mx-eyebrow mx-reveal">초등학생도 이해하는 크루즈</span>
            <h2 class="mx-title mx-reveal">쉽게 말하면<br><strong>움직이는 호텔</strong>입니다</h2>
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

    insertBefore(point, chapter(
      3,
      'mx-chapter-3',
      '포인트 구조',
      '그럼 멤버십은<br><strong>무슨 역할을 할까요?</strong>',
      '핵심은 어렵지 않습니다. 앞으로 쓸 여행비를 미리 준비하고, 정해진 방식으로 포인트를 더 받아 크루즈 예약에 활용하는 구조입니다.'
    ));

    insertAfter(ledger, `
      <section id="mx-prepare-money" class="mx-expand-section mx-dark">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">같은 여행비, 다른 준비 방식</span>
          <h2 class="mx-title mx-reveal">여행 직전에 한 번에 낼지<br><strong>미리 나눠 준비할지</strong></h2>
          <div class="mx-prepare-grid">
            <div class="mx-prepare-box mx-reveal mx-left">
              <span>일반적인 준비</span>
              <strong>여행 직전</strong>
              <em>필요한 여행비를 한 번에 결제</em>
            </div>
            <div class="mx-prepare-vs mx-reveal">VS</div>
            <div class="mx-prepare-box good mx-reveal mx-right">
              <span>클래식 예시</span>
              <strong>$100 → 200P</strong>
              <em>여행 전부터 매달 나눠 준비</em>
            </div>
          </div>
        </div>
      </section>
      <section id="mx-point-use" class="mx-expand-section mx-soft">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">포인트는 어디에?</span>
          <h2 class="mx-title mx-reveal">모으는 게 목적이 아니라<br><strong>크루즈 예약에 쓰는 것</strong>이 목적입니다</h2>
          <div class="mx-flow">
            <div class="mx-flow-step mx-reveal"><b>STEP 1</b><strong>매달 적립</strong><span>클래식 기준 매월 200P</span></div>
            <div class="mx-flow-arrow mx-reveal">→</div>
            <div class="mx-flow-step mx-reveal"><b>STEP 2</b><strong>크루즈 선택</strong><span>지역·날짜·객실을 고릅니다</span></div>
            <div class="mx-flow-arrow mx-reveal">→</div>
            <div class="mx-flow-step mx-reveal"><b>STEP 3</b><strong>예약에 사용</strong><span>조건에 맞춰 포인트를 적용합니다</span></div>
          </div>
          <div class="mx-count-big mx-reveal mx-pop"><span data-mx-count="2400">0</span><small>P</small></div>
          <p class="mx-sub mx-reveal">클래식 월 적립분만 단순 계산하면 12개월에 2,400P입니다.</p>
        </div>
      </section>`);

    insertBefore(realCost, chapter(
      4,
      'mx-chapter-4',
      '실제 여행비',
      '이제 중요한 건<br><strong>내 돈이 얼마나 나가느냐</strong>입니다',
      '포인트 숫자만 보면 감이 오지 않습니다. 그래서 실제 크루즈 금액을 넣고, 포인트와 카드 결제가 어떻게 나뉘는지 직접 확인합니다.'
    ));

    insertAfter(calculator, `
      <section id="mx-use-rules" class="mx-expand-section mx-dark">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">많이 묻는 두 가지</span>
          <h2 class="mx-title mx-reveal">포인트가 부족하거나<br><strong>여행이 많이 남았다면?</strong></h2>
          <div class="mx-dual">
            <article class="mx-dual-card mx-reveal mx-left">
              <div><span class="mx-mini">포인트가 부족할 때</span><h3>못 가는 게 아닙니다<br><strong>함께 결제합니다</strong></h3></div>
              <div class="mx-equation"><strong>포인트</strong><span>+</span><strong>카드</strong></div>
              <p>일반 예약 예시처럼 포인트를 일부 적용하고 남은 금액을 카드로 결제하는 방식이 있습니다.</p>
            </article>
            <article class="mx-dual-card mx-reveal mx-right">
              <div><span class="mx-mini">출발까지 충분히 남았을 때</span><h3><strong><span data-mx-count="270">0</span>일+</strong><br>포인트 활용 범위 확대</h3></div>
              <div class="mx-equation"><strong>일찍 준비</strong><span>→</span><strong>활용 ↑</strong></div>
              <p>출발일이 270일 이상 남은 예약 예시에서는 포인트 활용 범위가 더 커집니다. 세부 조건은 실제 예약 시 확인합니다.</p>
            </article>
          </div>
        </div>
      </section>`);

    insertBefore(plans, chapter(
      5,
      'mx-chapter-5',
      '플랜 선택',
      '나는 클래식일까요<br><strong>프리미엄일까요?</strong>',
      '두 플랜의 차이를 복잡하게 볼 필요 없습니다. 천천히 준비할지, 더 빠르게 포인트를 모을지부터 결정하면 됩니다.'
    ) + `
      <section id="mx-plan-guide" class="mx-expand-section mx-soft">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">먼저 이것만 비교</span>
          <h2 class="mx-title mx-reveal">차이는 결국<br><strong>준비하는 속도</strong>입니다</h2>
          <div class="mx-speed-grid">
            <article class="mx-speed-card mx-reveal mx-left">
              <b>CLASSIC · 천천히 준비</b>
              <h3>월 $100</h3>
              <p>1~2년에 한 번 크루즈를 계획하거나 부담을 낮춰 시작하고 싶은 경우.</p>
              <div class="mx-speed-number"><span>매월 적립</span><strong>200P</strong></div>
            </article>
            <article class="mx-speed-card recommended mx-reveal mx-right">
              <b>PREMIUM · 빠르게 준비</b>
              <h3>월 $250</h3>
              <p>여행 계획이 더 크거나 포인트를 더 빠른 속도로 모으고 싶은 경우.</p>
              <div class="mx-speed-number"><span>매월 적립</span><strong>500P</strong></div>
            </article>
          </div>
        </div>
      </section>`);

    insertAfter(plans, `
      <section id="mx-fit-check" class="mx-expand-section">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">나한테 맞는지 체크</span>
          <h2 class="mx-title mx-reveal">좋은 상품보다 중요한 건<br><strong>내 여행 계획과 맞는지</strong>입니다</h2>
          <div class="mx-fit-grid">
            <article class="mx-fit-box good mx-reveal mx-left">
              <h3>이런 분이면 잘 맞습니다</h3>
              <div class="mx-fit-list">
                <div class="mx-fit-item"><b>✓</b><span>앞으로 1~2년 안에 크루즈 여행 계획이 있다</span></div>
                <div class="mx-fit-item"><b>✓</b><span>부부·가족 여행비를 미리 나눠 준비하고 싶다</span></div>
                <div class="mx-fit-item"><b>✓</b><span>가이드 없이 직접 예약하는 것도 가능하다</span></div>
                <div class="mx-fit-item"><b>✓</b><span>한 번보다 여러 번 여행할 가능성이 있다</span></div>
              </div>
            </article>
            <article class="mx-fit-box mx-reveal mx-right">
              <h3>지금은 서두르지 않아도 됩니다</h3>
              <div class="mx-fit-list">
                <div class="mx-fit-item"><b>–</b><span>여행 계획이 아직 전혀 없다</span></div>
                <div class="mx-fit-item"><b>–</b><span>무조건 가이드 포함 패키지만 이용하고 싶다</span></div>
                <div class="mx-fit-item"><b>–</b><span>아주 가까운 날짜에 바로 출발해야 한다</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>`);

    insertBefore(terms, chapter(
      6,
      'mx-chapter-6',
      '가입 전 확인',
      '마지막으로<br><strong>헷갈리는 것만 정리합니다</strong>',
      '여기까지 이해했다면 이제 복잡한 설명은 필요 없습니다. 가입·유지·포인트 사용에서 자주 헷갈리는 부분만 확인하면 됩니다.'
    ));

    insertAfter(terms, `
      <section id="mx-faq-section" class="mx-expand-section mx-dark">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">마지막 궁금증</span>
          <h2 class="mx-title mx-reveal">보통 여기서<br><strong>이 다섯 가지를 묻습니다</strong></h2>
          <div class="mx-faq mx-reveal">
            <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>정말 같은 크루즈를 더 저렴하게 예약하는 건가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>같은 선사·일정·객실 등급처럼 비교 조건을 맞춘 뒤 가격을 봐야 합니다. 앞의 가격은 이해를 위한 아시아 크루즈 예시이며 실제 가격은 일정과 객실에 따라 달라집니다.</p></div></div></div>
            <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>포인트가 다 모일 때까지 여행을 못 가나요?</span><b>+</b></button><div class="mx-faq-a"><div><p>그렇지 않습니다. 일반 예약 예시처럼 사용할 수 있는 포인트를 적용하고 남은 금액을 카드로 결제하는 방식이 있습니다.</p></div></div></div>
            <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>가이드 없이 처음 가도 괜찮나요?</span><b>+</b></button><div class="mx-faq-a"><div><p>항구 도착, 승선, 선내 이용, 기항지 복귀, 하선 순서를 미리 알면 구조는 단순합니다. 다만 개인의 언어·여행 경험에 따라 준비 수준은 달라질 수 있습니다.</p></div></div></div>
            <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>클래식과 프리미엄 중 무엇이 더 좋은가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>무조건 더 좋은 플랜이 있는 것이 아니라 여행 시점과 준비 속도가 기준입니다. 부담을 낮춰 천천히 준비하면 클래식, 더 빠르게 포인트를 모으려면 프리미엄이 이해하기 쉽습니다.</p></div></div></div>
            <div class="mx-faq-item"><button type="button" class="mx-faq-q" aria-expanded="false"><span>가입 전에 꼭 다시 봐야 할 조건은 무엇인가요?</span><b>+</b></button><div class="mx-faq-a"><div><p>환불 가능 기간, 본인 명의 결제, 예약 시 필요한 멤버십 유지 조건, 해지 시 포인트 처리 기준은 반드시 확인해야 합니다.</p></div></div></div>
          </div>
        </div>
      </section>
      <section id="mx-recap" class="mx-expand-section mx-soft">
        <div class="mx-inner mx-center">
          <span class="mx-eyebrow mx-reveal">여기까지 기억할 것</span>
          <h2 class="mx-title mx-reveal">긴 설명은 잊어도<br><strong>이 3개만 기억하세요</strong></h2>
          <div class="mx-recap-grid">
            <article class="mx-recap-card mx-reveal"><b>01</b><div><strong>같은 크루즈도 가격이 다를 수 있습니다</strong><span>예약 방식과 포함 서비스까지 같은 조건으로 비교합니다.</span></div></article>
            <article class="mx-recap-card mx-reveal"><b>02</b><div><strong>여행비를 미리 준비하면 포인트가 쌓입니다</strong><span>클래식은 월 $100 납부 시 200P 적립 예시입니다.</span></div></article>
            <article class="mx-recap-card mx-reveal"><b>03</b><div><strong>포인트는 크루즈 예약에 활용합니다</strong><span>여행 시점과 보유 포인트에 맞춰 사용 범위가 달라집니다.</span></div></article>
          </div>
          <a href="#plans" class="mx-action mx-reveal">내게 맞는 플랜 다시 보기</a>
        </div>
      </section>`);

    insertAfter(priceMatch, `
      <section id="mx-final-choice" class="mx-final">
        <div class="mx-inner">
          <h2 class="mx-reveal">먼저 비교해보고<br><strong>그다음 결정하세요</strong></h2>
          <p class="mx-reveal">멤버십이 필요한지는 내 여행 시점과 예산을 보고 판단하면 됩니다.</p>
          <a href="#plans" class="mx-action mx-reveal">클래식 · 프리미엄 비교하기</a>
        </div>
      </section>`);

    return true;
  }

  function buildRail() {
    if (document.querySelector('.mx-chapter-rail')) return;
    const rail = document.createElement('aside');
    rail.className = 'mx-chapter-rail';
    rail.setAttribute('aria-label', '멤버십 페이지 챕터 이동');
    rail.innerHTML = CHAPTERS.map(([no, id, label]) => `
      <button type="button" class="mx-rail-btn" data-mx-target="${id}" aria-label="챕터 ${no} ${label}">
        <span class="mx-rail-label">${String(no).padStart(2, '0')} · ${label}</span>
      </button>`).join('');
    document.body.appendChild(rail);

    rail.addEventListener('click', (event) => {
      const button = event.target.closest('[data-mx-target]');
      if (!button) return;
      document.getElementById(button.dataset.mxTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function setupFaq() {
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      document.querySelectorAll('[data-mx-count]').forEach((el) => {
        el.textContent = Number(el.dataset.mxCount || 0).toLocaleString('ko-KR');
      });
      return;
    }

    document.documentElement.classList.add('mx-motion-ready');

    document.querySelectorAll('.mx-card-grid,.mx-hotel-points,.mx-flow,.mx-recap-grid').forEach((group) => {
      [...group.children].forEach((child, index) => child.style.setProperty('--mx-delay', `${Math.min(index * 90, 450)}ms`));
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll?.('[data-mx-count]').forEach(animateCount);
        if (entry.target.matches('[data-mx-count]')) animateCount(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.mx-reveal,[data-mx-count]').forEach((el) => revealObserver.observe(el));

    const parallaxEls = [...document.querySelectorAll('[data-mx-parallax]')];
    let ticking = false;
    const syncParallax = () => {
      const vh = window.innerHeight || 1;
      parallaxEls.forEach((el) => {
        const rect = el.closest('.mx-chapter')?.getBoundingClientRect();
        if (!rect) return;
        const center = rect.top + rect.height / 2;
        const delta = (center - vh / 2) / vh;
        const shift = Math.max(-24, Math.min(24, delta * -34));
        el.style.setProperty('--mx-parallax', `${shift}px`);
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncParallax);
    }, { passive: true });
    syncParallax();
  }

  function setupChapterTracking() {
    const buttons = [...document.querySelectorAll('.mx-rail-btn')];
    const chapters = [...document.querySelectorAll('[data-mx-chapter]')];
    if (!buttons.length || !chapters.length) return;

    const setActive = (id) => {
      buttons.forEach((button) => button.classList.toggle('active', button.dataset.mxTarget === id));
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { threshold: [0.15, 0.3, 0.5], rootMargin: '-20% 0px -55% 0px' });

    chapters.forEach((chapterEl) => observer.observe(chapterEl));
    setActive(chapters[0].id);
  }

  function initExpansion() {
    if (!buildExpansion()) return;
    buildRail();
    setupFaq();
    setupMotion();
    setupChapterTracking();
  }

  function schedule() {
    window.setTimeout(initExpansion, 220);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }
})();

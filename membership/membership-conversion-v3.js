(() => {
  const STYLE_ID = 'ingroup-conversion-story-v5-style';

  const section = (id, tone, body) => `
    <section id="${id}" class="ig5-section ${tone} ig5-reveal">
      <div class="ig5-orb ig5-orb-a" aria-hidden="true"></div>
      <div class="ig5-orb ig5-orb-b" aria-hidden="true"></div>
      <div class="container"><div class="ig5-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig5-section,.ig5-section *{box-sizing:border-box}
      .ig5-section{position:relative;min-height:620px;display:flex;align-items:center;padding:96px 0;overflow:hidden;isolation:isolate}
      .ig5-white{background:#fff;color:#10182b}.ig5-soft{background:#f3f6fb;color:#10182b}.ig5-dark{background:#0d1730;color:#fff}.ig5-blue{background:linear-gradient(135deg,#2658ad 0%,#17396b 58%,#0f2446 100%);color:#fff}
      .ig5-wrap{position:relative;z-index:2;width:min(1040px,100%);margin:0 auto;text-align:center}
      .ig5-section h2,.ig5-section p,.ig5-section span,.ig5-section strong{word-break:keep-all}
      .ig5-title{max-width:930px;margin:0 auto;font-size:clamp(42px,5.5vw,72px);line-height:1.08;letter-spacing:-.055em;font-weight:720;text-wrap:balance}
      .ig5-title strong{font-weight:900}
      .ig5-lead{max-width:820px;margin:28px auto 0;font-size:clamp(25px,3vw,36px);line-height:1.42;letter-spacing:-.03em;font-weight:470;text-wrap:balance}
      .ig5-lead strong{font-weight:800}
      .ig5-accent{color:#2c69ff}.ig5-dark .ig5-accent,.ig5-blue .ig5-accent{color:#b8d0ff}
      .ig5-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px;padding:12px 20px;border-radius:999px;background:#eaf1ff;color:#2c63bd;font-size:clamp(20px,2.2vw,25px);font-weight:650}
      .ig5-dark .ig5-kicker,.ig5-blue .ig5-kicker{background:rgba(255,255,255,.11);color:#d9e5ff}
      .ig5-mega{margin-top:42px;font-size:clamp(78px,10.5vw,138px);line-height:.9;letter-spacing:-.075em;font-weight:920}
      .ig5-mega-note{margin-top:24px;font-size:clamp(25px,2.9vw,34px);line-height:1.35;font-weight:500}
      .ig5-mega-note strong{font-weight:820}

      .ig5-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:22px;max-width:900px;margin:48px auto 0}
      .ig5-pair-card{padding:34px 26px;border-radius:30px;background:#fff;border:1px solid rgba(15,30,60,.1);box-shadow:0 18px 50px rgba(21,45,85,.08);color:#10182b}
      .ig5-dark .ig5-pair-card,.ig5-blue .ig5-pair-card{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);box-shadow:none;color:#fff}
      .ig5-pair-card span{display:block;font-size:clamp(22px,2.5vw,29px);line-height:1.3;font-weight:500}
      .ig5-pair-card strong{display:block;margin-top:14px;font-size:clamp(52px,6.6vw,86px);line-height:.95;letter-spacing:-.06em;font-weight:900}
      .ig5-symbol{font-size:46px;font-weight:650;color:#83a7eb}

      .ig5-ledger{max-width:850px;margin:46px auto 0;text-align:left}
      .ig5-ledger-row{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:26px 4px;border-top:1px solid rgba(17,31,56,.13)}
      .ig5-dark .ig5-ledger-row,.ig5-blue .ig5-ledger-row{border-color:rgba(255,255,255,.17)}
      .ig5-ledger-row:first-child{border-top:0}
      .ig5-ledger-row span{font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:480}
      .ig5-ledger-row strong{font-size:clamp(38px,4.8vw,58px);line-height:1;font-weight:830;letter-spacing:-.045em}
      .ig5-ledger-row.total{margin-top:6px;padding-top:30px;border-top:3px solid #2c69ff}
      .ig5-ledger-row.total span{font-weight:680}.ig5-ledger-row.total strong{color:#2c69ff;font-weight:920}
      .ig5-dark .ig5-ledger-row.total strong,.ig5-blue .ig5-ledger-row.total strong{color:#b8d0ff}

      .ig5-rule-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:48px auto 0}
      .ig5-rule-card{padding:38px 28px;border-radius:30px;background:#fff;border:1px solid rgba(15,30,60,.1);box-shadow:0 18px 48px rgba(21,45,85,.07);color:#10182b}
      .ig5-rule-card strong{display:block;font-size:clamp(48px,6vw,78px);line-height:1;font-weight:900}
      .ig5-rule-card span{display:block;margin-top:18px;font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:500}

      .ig5-result{max-width:900px;margin:48px auto 0;padding:40px 34px;border-radius:34px;background:#fff;border:1px solid rgba(15,30,60,.1);box-shadow:0 22px 58px rgba(21,45,85,.09);color:#10182b}
      .ig5-result-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
      .ig5-result-box{padding:30px 22px;border-radius:26px;background:#f5f7fb}
      .ig5-result-box span{display:block;font-size:clamp(22px,2.5vw,28px);font-weight:500}
      .ig5-result-box strong{display:block;margin-top:14px;font-size:clamp(44px,5.5vw,68px);line-height:1;font-weight:880;letter-spacing:-.05em}
      .ig5-saving{margin-top:28px;padding-top:28px;border-top:3px solid #2c69ff}
      .ig5-saving strong{display:block;color:#2c69ff;font-size:clamp(64px,8vw,102px);line-height:.95;font-weight:920;letter-spacing:-.06em}
      .ig5-saving span{display:block;margin-top:14px;font-size:clamp(25px,2.9vw,34px);line-height:1.35;font-weight:520}

      .ig5-routes{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1040px;margin:46px auto 0}
      .ig5-route{position:relative;min-height:320px;padding:30px 22px;border-radius:28px;background:linear-gradient(165deg,#fff 0%,#f5f8ff 100%);border:1px solid rgba(15,30,60,.1);box-shadow:0 18px 48px rgba(21,45,85,.08);overflow:hidden;text-align:left;color:#10182b}
      .ig5-route::after{content:'';position:absolute;right:-46px;bottom:-54px;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle,rgba(46,105,255,.22),rgba(46,105,255,0) 68%)}
      .ig5-route h3{position:relative;z-index:2;margin:0;font-size:clamp(28px,2.6vw,36px);line-height:1.15;font-weight:760;letter-spacing:-.04em}
      .ig5-route-price{position:relative;z-index:2;display:block;margin-top:20px;font-size:clamp(38px,4vw,52px);line-height:1;font-weight:900;letter-spacing:-.05em}
      .ig5-route-flow{position:relative;z-index:2;margin-top:26px;font-size:clamp(21px,2vw,25px);line-height:1.55;font-weight:500}
      .ig5-route-flow strong{display:block;color:#2c69ff;font-size:clamp(27px,2.7vw,34px);font-weight:850}
      .ig5-route-save{position:relative;z-index:2;display:inline-flex;margin-top:22px;padding:10px 14px;border-radius:999px;background:#e8f0ff;color:#245bb9;font-size:clamp(20px,1.9vw,23px);font-weight:760}

      .ig5-checks{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:940px;margin:46px auto 0}
      .ig5-check{padding:32px 24px;border-radius:28px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);font-size:clamp(27px,3vw,36px);line-height:1.25;font-weight:560}
      .ig5-check strong{font-weight:860}
      .ig5-btn{display:inline-flex;align-items:center;justify-content:center;min-height:72px;margin-top:42px;padding:0 42px;border:0;border-radius:18px;background:#fff;color:#173766;font-size:clamp(25px,2.8vw,32px);font-weight:760;cursor:pointer;box-shadow:0 16px 36px rgba(0,0,0,.15);transition:transform .2s ease,box-shadow .2s ease}
      .ig5-btn:hover{transform:translateY(-3px);box-shadow:0 20px 42px rgba(0,0,0,.2)}

      .ig5-orb{position:absolute;z-index:0;border-radius:50%;filter:blur(2px);opacity:0;transform:scale(.65);transition:opacity 1.1s ease,transform 1.1s cubic-bezier(.22,1,.36,1)}
      .ig5-orb-a{width:420px;height:420px;left:-180px;top:-140px;background:radial-gradient(circle,rgba(61,116,255,.22),rgba(61,116,255,0) 68%)}
      .ig5-orb-b{width:360px;height:360px;right:-140px;bottom:-120px;background:radial-gradient(circle,rgba(122,173,255,.18),rgba(122,173,255,0) 68%)}
      .ig5-reveal.is-visible .ig5-orb{opacity:1;transform:scale(1)}

      .ig5-reveal{opacity:0;transform:translateY(46px) scale(.985);filter:blur(7px);transition:opacity .78s cubic-bezier(.22,1,.36,1),transform .78s cubic-bezier(.22,1,.36,1),filter .78s ease}
      .ig5-reveal.is-visible{opacity:1;transform:none;filter:none}
      .ig5-reveal .ig5-kicker,.ig5-reveal .ig5-title,.ig5-reveal .ig5-lead,.ig5-reveal .ig5-mega,.ig5-reveal .ig5-mega-note,.ig5-reveal .ig5-pair-card,.ig5-reveal .ig5-ledger-row,.ig5-reveal .ig5-rule-card,.ig5-reveal .ig5-result-box,.ig5-reveal .ig5-saving,.ig5-reveal .ig5-route,.ig5-reveal .ig5-check,.ig5-reveal .ig5-btn{opacity:0;transform:translateY(28px) scale(.97);transition:opacity .62s cubic-bezier(.22,1,.36,1),transform .62s cubic-bezier(.22,1,.36,1)}
      .ig5-reveal.is-visible .ig5-kicker,.ig5-reveal.is-visible .ig5-title{opacity:1;transform:none;transition-delay:.06s}
      .ig5-reveal.is-visible .ig5-lead,.ig5-reveal.is-visible .ig5-mega,.ig5-reveal.is-visible .ig5-mega-note{opacity:1;transform:none;transition-delay:.15s}
      .ig5-reveal.is-visible .ig5-pair-card:nth-child(1),.ig5-reveal.is-visible .ig5-rule-card:nth-child(1),.ig5-reveal.is-visible .ig5-result-box:nth-child(1),.ig5-reveal.is-visible .ig5-route:nth-child(1),.ig5-reveal.is-visible .ig5-check:nth-child(1){opacity:1;transform:none;transition-delay:.18s}
      .ig5-reveal.is-visible .ig5-pair-card:nth-child(3),.ig5-reveal.is-visible .ig5-rule-card:nth-child(2),.ig5-reveal.is-visible .ig5-result-box:nth-child(2),.ig5-reveal.is-visible .ig5-route:nth-child(2),.ig5-reveal.is-visible .ig5-check:nth-child(2){opacity:1;transform:none;transition-delay:.28s}
      .ig5-reveal.is-visible .ig5-result-box:nth-child(3),.ig5-reveal.is-visible .ig5-route:nth-child(3),.ig5-reveal.is-visible .ig5-check:nth-child(3){opacity:1;transform:none;transition-delay:.38s}
      .ig5-reveal.is-visible .ig5-result-box:nth-child(4),.ig5-reveal.is-visible .ig5-route:nth-child(4){opacity:1;transform:none;transition-delay:.48s}
      .ig5-reveal.is-visible .ig5-saving,.ig5-reveal.is-visible .ig5-btn{opacity:1;transform:none;transition-delay:.52s}
      .ig5-reveal.is-visible .ig5-ledger-row{opacity:1;transform:none;transition-delay:.18s}
      .ig5-reveal.is-visible .ig5-ledger-row:nth-child(2){transition-delay:.28s}.ig5-reveal.is-visible .ig5-ledger-row:nth-child(3){transition-delay:.38s}.ig5-reveal.is-visible .ig5-ledger-row:nth-child(4){transition-delay:.48s}

      @keyframes ig5Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      .ig5-reveal.is-visible .ig5-route:nth-child(odd){animation:ig5Float 5s ease-in-out 1.1s infinite}
      .ig5-reveal.is-visible .ig5-route:nth-child(even){animation:ig5Float 5.8s ease-in-out 1.35s infinite reverse}

      @media(max-width:780px){
        .ig5-section{min-height:560px;padding:74px 0}
        .ig5-title{font-size:clamp(37px,10.2vw,44px);line-height:1.12;letter-spacing:-.05em}
        .ig5-lead{font-size:clamp(23px,6vw,28px);line-height:1.42}
        .ig5-kicker{font-size:20px;margin-bottom:20px}
        .ig5-pair,.ig5-rule-grid{grid-template-columns:1fr;gap:14px}.ig5-symbol{transform:rotate(90deg);font-size:30px}
        .ig5-ledger-row{grid-template-columns:1fr;gap:8px;text-align:center}
        .ig5-result{padding:30px 18px}.ig5-result-grid{grid-template-columns:1fr 1fr;gap:10px}.ig5-result-box{padding:24px 12px}.ig5-result-box span{font-size:19px}.ig5-result-box strong{font-size:34px}
        .ig5-routes{grid-template-columns:repeat(2,1fr);gap:10px}.ig5-route{min-height:270px;padding:24px 14px;border-radius:22px}.ig5-route h3{font-size:25px}.ig5-route-price{font-size:32px}.ig5-route-flow{font-size:18px;line-height:1.45}.ig5-route-flow strong{font-size:23px}.ig5-route-save{font-size:17px;padding:8px 10px}
        .ig5-checks{grid-template-columns:1fr;gap:12px}.ig5-check{font-size:27px;padding:28px 20px}
        .ig5-btn{width:100%}
      }
      @media(max-width:420px){
        .ig5-title{font-size:36px}.ig5-mega{font-size:76px}.ig5-routes{gap:8px}.ig5-route{padding:22px 12px}.ig5-route h3{font-size:23px}.ig5-route-price{font-size:29px}.ig5-route-flow{font-size:17px}.ig5-route-flow strong{font-size:21px}
      }
      @media(prefers-reduced-motion:reduce){.ig5-reveal,.ig5-reveal *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function initReveal() {
    const nodes = document.querySelectorAll('.ig5-reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        animateCounts(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -7% 0px' });
    nodes.forEach((node) => io.observe(node));
  }

  function animateCounts(root) {
    root.querySelectorAll('[data-count]').forEach((el) => {
      if (el.dataset.counted === '1') return;
      el.dataset.counted = '1';
      const target = Number(el.dataset.count || 0);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = Number(el.dataset.decimals || 0);
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = target * eased;
        const formatted = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US');
        el.textContent = `${prefix}${formatted}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function inject() {
    if (document.getElementById('ig5-problem')) return;
    addStyles();
    const review = document.querySelector('.review-flow-section');
    if (!review) return;

    const html =
      section('ig5-problem','ig5-dark',`
        <span class="ig5-kicker">크루즈는 가고 싶은데</span>
        <h2 class="ig5-title">부담되는 럭셔리 크루즈 여행 가격<br><strong>조금이라도 더 저렴하게 탈 수 없을까요?</strong></h2>`)
      + section('ig5-promise','ig5-blue',`
        <span class="ig5-kicker">미리 준비하면 달라집니다</span>
        <h2 class="ig5-title">여행비를 한 번에 내기 전에<br><strong>포인트부터 쌓아두세요</strong></h2>
        <div class="ig5-mega ig5-accent" data-count="25" data-suffix="%">25%</div>
        <div class="ig5-mega-note">대표 계산 예시 기준 <strong>약 25% 낮은 실지출</strong></div>`)
      + section('ig5-start','ig5-white',`
        <span class="ig5-kicker">시작부터 포인트가 있습니다</span>
        <h2 class="ig5-title">클래식 가입 시<br><strong>350P부터 시작</strong></h2>
        <div class="ig5-mega ig5-accent" data-count="350" data-suffix="P">350P</div>`)
      + section('ig5-monthly','ig5-soft',`
        <span class="ig5-kicker">그 다음 매월</span>
        <h2 class="ig5-title"><strong>$100</strong>을 납부하면<br><strong>200P</strong>가 적립됩니다</h2>
        <div class="ig5-pair">
          <div class="ig5-pair-card"><span>매월 납부</span><strong>$100</strong></div>
          <div class="ig5-symbol">→</div>
          <div class="ig5-pair-card"><span>매월 적립</span><strong class="ig5-accent">200P</strong></div>
        </div>`)
      + section('ig5-rule','ig5-white',`
        <span class="ig5-kicker">쌓은 포인트는 여행할 때 사용</span>
        <h2 class="ig5-title">보유 포인트는 사용할 수 있고<br><strong>한 예약에서는 최대 50%</strong></h2>
        <div class="ig5-rule-grid">
          <div class="ig5-rule-card"><strong>100%</strong><span>내가 보유한 포인트 사용 가능</span></div>
          <div class="ig5-rule-card"><strong>50%</strong><span>크루즈 예약금액 기준 사용 한도</span></div>
        </div>`)
      + section('ig5-eight','ig5-dark',`
        <span class="ig5-kicker">그럼 실제로 계산해보겠습니다</span>
        <h2 class="ig5-title"><strong>8개월</strong> 동안 클래식을 이용하면?</h2>
        <div class="ig5-ledger">
          <div class="ig5-ledger-row"><span>가입 시 시작 포인트</span><strong>350P</strong></div>
          <div class="ig5-ledger-row"><span>8개월 × 매월 200P</span><strong>1,600P</strong></div>
          <div class="ig5-ledger-row total"><span>8개월 뒤 보유 포인트</span><strong data-count="1950" data-suffix="P">1,950P</strong></div>
        </div>`)
      + section('ig5-cruise','ig5-soft',`
        <span class="ig5-kicker">예를 들어</span>
        <h2 class="ig5-title"><strong>$3,000</strong>짜리 크루즈를<br>예약한다고 가정해보겠습니다</h2>
        <div class="ig5-mega" data-count="3000" data-prefix="$">$3,000</div>`)
      + section('ig5-payment','ig5-blue',`
        <span class="ig5-kicker">예약할 때는 이렇게 결제</span>
        <h2 class="ig5-title">예약가의 절반을 포인트로<br><strong>나머지만 카드로</strong></h2>
        <div class="ig5-pair">
          <div class="ig5-pair-card"><span>포인트 사용</span><strong data-count="1500" data-suffix="P">1,500P</strong></div>
          <div class="ig5-symbol">+</div>
          <div class="ig5-pair-card"><span>카드 결제</span><strong data-count="1500" data-prefix="$">$1,500</strong></div>
        </div>`)
      + section('ig5-real','ig5-white',`
        <span class="ig5-kicker">내가 실제로 쓴 돈</span>
        <h2 class="ig5-title">크루즈 가격은 $3,000이지만<br><strong>실지출은 $2,300</strong></h2>
        <div class="ig5-result">
          <div class="ig5-result-grid">
            <div class="ig5-result-box"><span>8개월 월 납부</span><strong>$800</strong></div>
            <div class="ig5-result-box"><span>예약 카드 결제</span><strong>$1,500</strong></div>
          </div>
          <div class="ig5-saving"><strong data-count="2300" data-prefix="$">$2,300</strong><span>$3,000 대비 <strong>$700 절감 · 약 23.3%</strong><br>즉, 약 25% 낮아지는 계산 예시</span></div>
        </div>`)
      + section('ig5-routes','ig5-soft',`
        <span class="ig5-kicker">크루즈 가격대별로 보면</span>
        <h2 class="ig5-title">대표 크루즈 4가지<br><strong>한눈에 비교</strong></h2>
        <div class="ig5-routes">
          <article class="ig5-route"><h3>아시아</h3><span class="ig5-route-price">$2,000</span><div class="ig5-route-flow">5개월 준비<strong>$1,500 실지출</strong></div><span class="ig5-route-save">$500 · 25% 절감</span></article>
          <article class="ig5-route"><h3>지중해</h3><span class="ig5-route-price">$3,000</span><div class="ig5-route-flow">8개월 준비<strong>$2,300 실지출</strong></div><span class="ig5-route-save">$700 · 약 23%</span></article>
          <article class="ig5-route"><h3>북유럽</h3><span class="ig5-route-price">$4,000</span><div class="ig5-route-flow">10개월 준비<strong>$3,000 실지출</strong></div><span class="ig5-route-save">$1,000 · 25% 절감</span></article>
          <article class="ig5-route"><h3>디즈니</h3><span class="ig5-route-price">$4,800</span><div class="ig5-route-flow">12개월 준비<strong>$3,600 실지출</strong></div><span class="ig5-route-save">$1,200 · 25% 절감</span></article>
        </div>`)
      + section('ig5-freedom','ig5-dark',`
        <span class="ig5-kicker">그리고 계속 유지할 필요도 없습니다</span>
        <h2 class="ig5-title">필요한 기간 동안 준비하고<br><strong>여행 후 해지할 수 있습니다</strong></h2>
        <div class="ig5-checks">
          <div class="ig5-check"><strong>약정기간</strong><br>없음</div>
          <div class="ig5-check"><strong>해지 위약금</strong><br>없음</div>
          <div class="ig5-check"><strong>여행 후</strong><br>해지 가능</div>
        </div>`)
      + section('ig5-final','ig5-blue',`
        <span class="ig5-kicker">여행 계획이 있다면</span>
        <h2 class="ig5-title">출발 직전에 큰돈을 내기보다<br><strong>지금부터 여행비를 낮춰두세요</strong></h2>
        <button type="button" class="ig5-btn">멤버십 플랜 확인하기</button>`);

    review.insertAdjacentHTML('afterend', html);

    const button = document.querySelector('.ig5-btn');
    if (button) button.addEventListener('click', () => document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once:true });
  else inject();
})();

(() => {
  'use strict';

  const STYLE_ID = 'ingroup-conversion-story-v6-style';

  const section = (id, tone, body, extra = '') => `
    <section id="${id}" class="ig6-section ${tone} ig6-reveal ${extra}">
      <div class="ig6-orb ig6-orb-a" aria-hidden="true"></div>
      <div class="ig6-orb ig6-orb-b" aria-hidden="true"></div>
      <div class="ig6-sweep" aria-hidden="true"></div>
      <div class="container"><div class="ig6-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig6-section,.ig6-section *{box-sizing:border-box}
      .ig6-section{position:relative;min-height:620px;display:flex;align-items:center;padding:94px 0;overflow:hidden;isolation:isolate}
      .ig6-white{background:#fff;color:#10182b}.ig6-soft{background:#f3f6fb;color:#10182b}.ig6-dark{background:#0c1730;color:#fff}.ig6-blue{background:linear-gradient(138deg,#2d63be 0%,#173d73 56%,#0d2345 100%);color:#fff}
      .ig6-wrap{position:relative;z-index:3;width:min(1040px,100%);margin:0 auto;text-align:center}
      .ig6-section h2,.ig6-section p,.ig6-section span,.ig6-section strong{word-break:keep-all}
      .ig6-title{max-width:940px;margin:0 auto;font-size:clamp(42px,5.55vw,72px);line-height:1.08;letter-spacing:-.055em;font-weight:680;text-wrap:balance}
      .ig6-title strong{font-weight:900}
      .ig6-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px;padding:11px 19px;border-radius:999px;background:#eaf1ff;color:#2d63b9;font-size:clamp(20px,2.1vw,25px);line-height:1.2;font-weight:650}
      .ig6-dark .ig6-kicker,.ig6-blue .ig6-kicker{background:rgba(255,255,255,.11);color:#deebff}
      .ig6-accent{color:#2d6cff}.ig6-dark .ig6-accent,.ig6-blue .ig6-accent{color:#bdd3ff}
      .ig6-mega{margin-top:42px;font-size:clamp(80px,10.7vw,142px);line-height:.88;letter-spacing:-.078em;font-weight:920}
      .ig6-sub{max-width:820px;margin:26px auto 0;font-size:clamp(25px,3vw,35px);line-height:1.4;letter-spacing:-.03em;font-weight:470;text-wrap:balance}
      .ig6-sub strong{font-weight:790}

      .ig6-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:22px;max-width:900px;margin:48px auto 0}
      .ig6-card{padding:36px 28px;border-radius:30px;background:#fff;border:1px solid rgba(15,30,60,.10);box-shadow:0 20px 56px rgba(23,49,92,.09);color:#10182b}
      .ig6-dark .ig6-card,.ig6-blue .ig6-card{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16);box-shadow:none;color:#fff}
      .ig6-card span{display:block;font-size:clamp(23px,2.5vw,29px);line-height:1.25;font-weight:480}
      .ig6-card strong{display:block;margin-top:15px;font-size:clamp(54px,6.8vw,88px);line-height:.94;letter-spacing:-.065em;font-weight:900}
      .ig6-symbol{font-size:46px;font-weight:630;color:#87abea}

      .ig6-rule-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:48px auto 0}
      .ig6-rule{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:34px 26px;border-radius:30px;background:#fff;border:1px solid rgba(15,30,60,.10);box-shadow:0 20px 54px rgba(23,49,92,.08);color:#10182b}
      .ig6-rule strong{display:block;font-size:clamp(58px,7vw,88px);line-height:.95;letter-spacing:-.055em;font-weight:910}
      .ig6-rule span{display:block;margin-top:18px;font-size:clamp(26px,3vw,35px);line-height:1.18;font-weight:560;text-wrap:balance}

      .ig6-ledger{max-width:850px;margin:46px auto 0;text-align:left}
      .ig6-ledger-row{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:27px 4px;border-top:1px solid rgba(17,31,56,.13)}
      .ig6-dark .ig6-ledger-row,.ig6-blue .ig6-ledger-row{border-color:rgba(255,255,255,.17)}
      .ig6-ledger-row:first-child{border-top:0}
      .ig6-ledger-row span{font-size:clamp(25px,2.85vw,33px);line-height:1.35;font-weight:470}
      .ig6-ledger-row strong{font-size:clamp(40px,5vw,62px);line-height:1;font-weight:840;letter-spacing:-.05em}
      .ig6-ledger-row.total{margin-top:6px;padding-top:30px;border-top:3px solid #2d6cff}
      .ig6-ledger-row.total span{font-weight:660}.ig6-ledger-row.total strong{color:#2d6cff;font-weight:920}
      .ig6-dark .ig6-ledger-row.total strong,.ig6-blue .ig6-ledger-row.total strong{color:#bdd3ff}

      .ig6-equation{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:20px;margin:48px auto 0;max-width:980px}
      .ig6-equation-part{min-width:220px;padding:28px 24px;border-radius:28px;background:#fff;border:1px solid rgba(15,30,60,.10);box-shadow:0 18px 48px rgba(23,49,92,.08);color:#10182b}
      .ig6-equation-part span{display:block;font-size:clamp(22px,2.4vw,27px);font-weight:480}
      .ig6-equation-part strong{display:block;margin-top:12px;font-size:clamp(48px,6vw,74px);line-height:.95;font-weight:900;letter-spacing:-.055em}
      .ig6-eq-symbol{font-size:42px;font-weight:620;color:#85a9ea}

      .ig6-routes{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1040px;margin:46px auto 0}
      .ig6-route{position:relative;min-height:300px;padding:28px 20px;border-radius:28px;background:linear-gradient(165deg,#fff 0%,#f5f8ff 100%);border:1px solid rgba(15,30,60,.10);box-shadow:0 20px 54px rgba(23,49,92,.09);overflow:hidden;text-align:left;color:#10182b}
      .ig6-route::after{content:'';position:absolute;right:-52px;bottom:-62px;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,rgba(45,108,255,.24),rgba(45,108,255,0) 68%)}
      .ig6-route h3{position:relative;z-index:2;margin:0;font-size:clamp(28px,2.6vw,36px);line-height:1.15;font-weight:720;letter-spacing:-.04em}
      .ig6-route-price{position:relative;z-index:2;display:block;margin-top:24px;font-size:clamp(40px,4.3vw,54px);line-height:1;font-weight:900;letter-spacing:-.055em}
      .ig6-route-arrow{position:relative;z-index:2;display:block;margin:16px 0 12px;color:#7a9bd6;font-size:27px;font-weight:600}
      .ig6-route-actual{position:relative;z-index:2;display:block;color:#2d67c7;font-size:clamp(29px,2.9vw,37px);line-height:1.08;font-weight:850}
      .ig6-route-save{position:relative;z-index:2;display:inline-flex;margin-top:22px;padding:9px 13px;border-radius:999px;background:#e7efff;color:#255bb6;font-size:clamp(19px,1.85vw,22px);font-weight:700}

      .ig6-checks{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:940px;margin:46px auto 0}
      .ig6-check{padding:34px 22px;border-radius:28px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.16);font-size:clamp(27px,3vw,36px);line-height:1.24;font-weight:520}
      .ig6-check strong{font-weight:850}
      .ig6-btn{display:inline-flex;align-items:center;justify-content:center;min-height:74px;margin-top:42px;padding:0 42px;border:0;border-radius:18px;background:#fff;color:#173766;font-size:clamp(25px,2.8vw,32px);font-weight:760;cursor:pointer;box-shadow:0 18px 42px rgba(0,0,0,.17);transition:transform .22s ease,box-shadow .22s ease}
      .ig6-btn:hover{transform:translateY(-4px);box-shadow:0 24px 48px rgba(0,0,0,.22)}

      .ig6-orb{position:absolute;z-index:0;border-radius:50%;opacity:0;transform:scale(.58);transition:opacity 1.05s ease,transform 1.05s cubic-bezier(.22,1,.36,1);pointer-events:none}
      .ig6-orb-a{width:460px;height:460px;left:-210px;top:-170px;background:radial-gradient(circle,rgba(61,118,255,.25),rgba(61,118,255,0) 69%)}
      .ig6-orb-b{width:400px;height:400px;right:-170px;bottom:-150px;background:radial-gradient(circle,rgba(126,181,255,.20),rgba(126,181,255,0) 70%)}
      .ig6-reveal.is-visible .ig6-orb{opacity:1;transform:scale(1)}
      .ig6-sweep{position:absolute;z-index:1;inset:-40% auto -40% -38%;width:28%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent);transform:skewX(-18deg) translateX(-220%);pointer-events:none}
      .ig6-white .ig6-sweep,.ig6-soft .ig6-sweep{background:linear-gradient(90deg,transparent,rgba(76,124,214,.07),transparent)}
      .ig6-reveal.is-visible .ig6-sweep{animation:ig6Sweep 1.15s .08s cubic-bezier(.22,1,.36,1) both}
      @keyframes ig6Sweep{to{transform:skewX(-18deg) translateX(650%)}}

      .ig6-reveal{opacity:0;transform:translate3d(0,48px,0) scale(.985);filter:blur(8px);transition:opacity .78s cubic-bezier(.22,1,.36,1),transform .78s cubic-bezier(.22,1,.36,1),filter .72s ease}
      .ig6-reveal.is-visible{opacity:1;transform:none;filter:none}
      .ig6-reveal .ig6-kicker,.ig6-reveal .ig6-title,.ig6-reveal .ig6-sub,.ig6-reveal .ig6-mega,.ig6-reveal .ig6-card,.ig6-reveal .ig6-rule,.ig6-reveal .ig6-ledger-row,.ig6-reveal .ig6-equation-part,.ig6-reveal .ig6-eq-symbol,.ig6-reveal .ig6-route,.ig6-reveal .ig6-check,.ig6-reveal .ig6-btn{opacity:0;transition:opacity .62s cubic-bezier(.22,1,.36,1),transform .62s cubic-bezier(.22,1,.36,1)}
      .ig6-reveal .ig6-kicker,.ig6-reveal .ig6-title,.ig6-reveal .ig6-sub{transform:translate3d(0,28px,0)}
      .ig6-reveal .ig6-mega{transform:scale(.72)}
      .ig6-reveal .ig6-card:first-child{transform:translate3d(-48px,18px,0) rotate(-1.5deg)}
      .ig6-reveal .ig6-card:last-child{transform:translate3d(48px,18px,0) rotate(1.5deg)}
      .ig6-reveal .ig6-rule:nth-child(1),.ig6-reveal .ig6-route:nth-child(odd){transform:translate3d(-34px,28px,0)}
      .ig6-reveal .ig6-rule:nth-child(2),.ig6-reveal .ig6-route:nth-child(even){transform:translate3d(34px,28px,0)}
      .ig6-reveal .ig6-ledger-row,.ig6-reveal .ig6-equation-part,.ig6-reveal .ig6-eq-symbol,.ig6-reveal .ig6-check,.ig6-reveal .ig6-btn{transform:translate3d(0,26px,0)}
      .ig6-reveal.is-visible .ig6-kicker,.ig6-reveal.is-visible .ig6-title{opacity:1;transform:none;transition-delay:.05s}
      .ig6-reveal.is-visible .ig6-sub,.ig6-reveal.is-visible .ig6-mega{opacity:1;transform:none;transition-delay:.15s}
      .ig6-reveal.is-visible .ig6-card:nth-child(1),.ig6-reveal.is-visible .ig6-rule:nth-child(1),.ig6-reveal.is-visible .ig6-route:nth-child(1),.ig6-reveal.is-visible .ig6-equation-part:nth-child(1),.ig6-reveal.is-visible .ig6-check:nth-child(1){opacity:1;transform:none;transition-delay:.19s}
      .ig6-reveal.is-visible .ig6-card:nth-child(3),.ig6-reveal.is-visible .ig6-rule:nth-child(2),.ig6-reveal.is-visible .ig6-route:nth-child(2),.ig6-reveal.is-visible .ig6-equation-part:nth-child(3),.ig6-reveal.is-visible .ig6-check:nth-child(2){opacity:1;transform:none;transition-delay:.29s}
      .ig6-reveal.is-visible .ig6-route:nth-child(3),.ig6-reveal.is-visible .ig6-equation-part:nth-child(5),.ig6-reveal.is-visible .ig6-check:nth-child(3){opacity:1;transform:none;transition-delay:.39s}
      .ig6-reveal.is-visible .ig6-route:nth-child(4){opacity:1;transform:none;transition-delay:.49s}
      .ig6-reveal.is-visible .ig6-eq-symbol{opacity:1;transform:none;transition-delay:.25s}
      .ig6-reveal.is-visible .ig6-ledger-row{opacity:1;transform:none;transition-delay:.17s}
      .ig6-reveal.is-visible .ig6-ledger-row:nth-child(2){transition-delay:.27s}.ig6-reveal.is-visible .ig6-ledger-row:nth-child(3){transition-delay:.37s}
      .ig6-reveal.is-visible .ig6-btn{opacity:1;transform:none;transition-delay:.34s}

      @keyframes ig6Float{0%,100%{translate:0 0}50%{translate:0 -9px}}
      .ig6-reveal.is-visible .ig6-route:nth-child(1),.ig6-reveal.is-visible .ig6-route:nth-child(3){animation:ig6Float 5.1s ease-in-out 1.2s infinite}
      .ig6-reveal.is-visible .ig6-route:nth-child(2),.ig6-reveal.is-visible .ig6-route:nth-child(4){animation:ig6Float 5.8s ease-in-out 1.4s infinite reverse}

      @media(max-width:780px){
        .ig6-section{min-height:550px;padding:72px 0}
        .ig6-title{font-size:clamp(36px,9.7vw,43px);line-height:1.12;letter-spacing:-.048em}
        .ig6-sub{font-size:clamp(23px,5.9vw,27px);line-height:1.4}
        .ig6-kicker{font-size:19px;margin-bottom:19px;padding:10px 16px}
        .ig6-mega{font-size:clamp(78px,23vw,112px)}
        .ig6-pair{grid-template-columns:1fr;gap:12px;margin-top:38px}.ig6-symbol{transform:rotate(90deg);font-size:29px}
        .ig6-card{padding:28px 20px}.ig6-card span{font-size:21px}.ig6-card strong{font-size:clamp(48px,14vw,65px)}
        .ig6-rule-grid{grid-template-columns:1fr 1fr;gap:10px;margin-top:38px}.ig6-rule{min-height:180px;padding:26px 12px;border-radius:24px}.ig6-rule strong{font-size:clamp(54px,15vw,72px)}.ig6-rule span{font-size:clamp(21px,5.4vw,25px);line-height:1.18}
        .ig6-ledger-row{grid-template-columns:1fr;gap:8px;text-align:center}.ig6-ledger-row span{font-size:23px}.ig6-ledger-row strong{font-size:42px}
        .ig6-equation{display:grid;grid-template-columns:1fr;gap:10px;margin-top:38px}.ig6-equation-part{min-width:0;padding:25px 18px}.ig6-equation-part span{font-size:21px}.ig6-equation-part strong{font-size:50px}.ig6-eq-symbol{font-size:28px;transform:rotate(90deg)}
        .ig6-routes{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:38px}.ig6-route{min-height:245px;padding:22px 14px;border-radius:23px}.ig6-route h3{font-size:25px}.ig6-route-price{font-size:35px;margin-top:18px}.ig6-route-arrow{font-size:22px;margin:13px 0 9px}.ig6-route-actual{font-size:27px}.ig6-route-save{font-size:17px;margin-top:18px;padding:8px 10px}
        .ig6-checks{grid-template-columns:1fr;gap:11px}.ig6-check{font-size:27px;padding:26px 18px}
        .ig6-reveal .ig6-card:first-child,.ig6-reveal .ig6-card:last-child,.ig6-reveal .ig6-rule:nth-child(1),.ig6-reveal .ig6-rule:nth-child(2),.ig6-reveal .ig6-route:nth-child(odd),.ig6-reveal .ig6-route:nth-child(even){transform:translate3d(0,24px,0)}
        .ig6-sweep{width:42%}
      }
      @media(max-width:420px){
        .ig6-section{padding:66px 0}.ig6-title{font-size:36px}.ig6-rule span{font-size:20px}.ig6-route{min-height:230px;padding:20px 12px}.ig6-route h3{font-size:23px}.ig6-route-price{font-size:32px}.ig6-route-actual{font-size:25px}.ig6-route-save{font-size:16px}
      }
      @media(prefers-reduced-motion:reduce){.ig6-reveal,.ig6-reveal *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}.ig6-sweep{display:none}}
    `;
    document.head.appendChild(style);
  }

  function animateCounts(root) {
    root.querySelectorAll('[data-count]').forEach((el) => {
      if (el.dataset.counted === '1') return;
      el.dataset.counted = '1';
      const target = Number(el.dataset.count || 0);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 1000;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${prefix}${Math.round(target * eased).toLocaleString('en-US')}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll('.ig6-reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => { node.classList.add('is-visible'); animateCounts(node); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        animateCounts(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    nodes.forEach((node) => io.observe(node));
  }

  function inject() {
    if (document.getElementById('ig6-problem')) return;
    addStyles();
    const review = document.querySelector('.review-flow-section');
    if (!review) return;

    const html =
      section('ig6-problem','ig6-dark',`
        <span class="ig6-kicker">크루즈는 가고 싶은데</span>
        <h2 class="ig6-title">부담되는 럭셔리 크루즈 여행 가격<br><strong>최저가로 갈 수 있는 방법 없을까요?</strong></h2>`)
      + section('ig6-promise','ig6-blue',`
        <span class="ig6-kicker">방법은 미리 준비하는 것</span>
        <h2 class="ig6-title">미리미리 준비하면<br><strong>남들보다 약 25% 저렴하게</strong></h2>
        <div class="ig6-mega ig6-accent" data-count="25" data-suffix="%">25%</div>`)
      + section('ig6-start','ig6-white',`
        <span class="ig6-kicker">첫 가입</span>
        <h2 class="ig6-title">클래식 시작 비용 <strong>$200</strong></h2>
        <div class="ig6-pair">
          <div class="ig6-card"><span>시작 비용</span><strong>$200</strong></div>
          <div class="ig6-symbol">→</div>
          <div class="ig6-card"><span>바로 적립</span><strong class="ig6-accent">350P</strong></div>
        </div>`)
      + section('ig6-monthly','ig6-soft',`
        <span class="ig6-kicker">그 다음 매월</span>
        <h2 class="ig6-title"><strong>$100</strong> 납부하면<br><strong>200P</strong> 적립</h2>
        <div class="ig6-pair">
          <div class="ig6-card"><span>내가 납부</span><strong>$100</strong></div>
          <div class="ig6-symbol">→</div>
          <div class="ig6-card"><span>포인트 적립</span><strong class="ig6-accent">200P</strong></div>
        </div>`)
      + section('ig6-rule','ig6-white',`
        <span class="ig6-kicker">포인트 사용</span>
        <h2 class="ig6-title">쌓인 포인트는<br><strong>크루즈 예약할 때 사용</strong></h2>
        <div class="ig6-rule-grid">
          <div class="ig6-rule"><strong>100%</strong><span>보유 포인트 사용</span></div>
          <div class="ig6-rule"><strong>50%</strong><span>예약금액까지 적용</span></div>
        </div>`)
      + section('ig6-seven','ig6-dark',`
        <span class="ig6-kicker">7개월 준비</span>
        <h2 class="ig6-title">총 <strong>1,750P</strong>가 쌓입니다</h2>
        <div class="ig6-ledger">
          <div class="ig6-ledger-row"><span>가입 리워드</span><strong>350P</strong></div>
          <div class="ig6-ledger-row"><span>7개월 × 200P</span><strong>1,400P</strong></div>
          <div class="ig6-ledger-row total"><span>총 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div>
        </div>`)
      + section('ig6-cruise','ig6-soft',`
        <span class="ig6-kicker">이제 여행을 예약합니다</span>
        <h2 class="ig6-title">크루즈 가격이<br><strong>$3,500</strong>이라면</h2>
        <div class="ig6-mega" data-count="3500" data-prefix="$">$3,500</div>`)
      + section('ig6-payment','ig6-blue',`
        <span class="ig6-kicker">예약할 때</span>
        <h2 class="ig6-title"><strong>1,750P</strong>를 전부 사용합니다</h2>
        <div class="ig6-pair">
          <div class="ig6-card"><span>포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div>
          <div class="ig6-symbol">+</div>
          <div class="ig6-card"><span>카드</span><strong data-count="1750" data-prefix="$">$1,750</strong></div>
        </div>
        <div class="ig6-sub">남는 포인트 <strong>0P</strong></div>`)
      + section('ig6-membership-spend','ig6-white',`
        <span class="ig6-kicker">7개월 동안 실제 낸 멤버십 비용</span>
        <h2 class="ig6-title">시작 $200 + 월 납부 $700</h2>
        <div class="ig6-mega ig6-accent" data-count="900" data-prefix="$">$900</div>`)
      + section('ig6-total','ig6-soft',`
        <span class="ig6-kicker">실제 총지출</span>
        <h2 class="ig6-title">멤버십 $900 + 카드 $1,750</h2>
        <div class="ig6-equation">
          <div class="ig6-equation-part"><span>멤버십</span><strong>$900</strong></div>
          <div class="ig6-eq-symbol">+</div>
          <div class="ig6-equation-part"><span>카드</span><strong>$1,750</strong></div>
          <div class="ig6-eq-symbol">=</div>
          <div class="ig6-equation-part"><span>실제 지출</span><strong class="ig6-accent" data-count="2650" data-prefix="$">$2,650</strong></div>
        </div>`)
      + section('ig6-saving','ig6-dark',`
        <span class="ig6-kicker">결과</span>
        <h2 class="ig6-title">그냥 $3,500을 결제하는 것보다</h2>
        <div class="ig6-mega ig6-accent" data-count="850" data-prefix="$" data-suffix=" 절감">$850 절감</div>`)
      + section('ig6-routes','ig6-white',`
        <span class="ig6-kicker">대표 크루즈 예시</span>
        <h2 class="ig6-title">가격이 달라도<br><strong>계산 방식은 같습니다</strong></h2>
        <div class="ig6-routes">
          <article class="ig6-route"><h3>아시아</h3><span class="ig6-route-price">$1,900</span><span class="ig6-route-arrow">↓</span><strong class="ig6-route-actual">$1,450</strong><span class="ig6-route-save">$450 절감</span></article>
          <article class="ig6-route"><h3>지중해</h3><span class="ig6-route-price">$3,500</span><span class="ig6-route-arrow">↓</span><strong class="ig6-route-actual">$2,650</strong><span class="ig6-route-save">$850 절감</span></article>
          <article class="ig6-route"><h3>북유럽</h3><span class="ig6-route-price">$4,300</span><span class="ig6-route-arrow">↓</span><strong class="ig6-route-actual">$3,250</strong><span class="ig6-route-save">$1,050 절감</span></article>
          <article class="ig6-route"><h3>디즈니</h3><span class="ig6-route-price">$5,100</span><span class="ig6-route-arrow">↓</span><strong class="ig6-route-actual">$3,850</strong><span class="ig6-route-save">$1,250 절감</span></article>
        </div>`)
      + section('ig6-freedom','ig6-dark',`
        <span class="ig6-kicker">여행이 끝난 뒤</span>
        <h2 class="ig6-title">계속 낼 필요는 없습니다</h2>
        <div class="ig6-checks">
          <div class="ig6-check"><strong>약정기간</strong><br>없음</div>
          <div class="ig6-check"><strong>해지 위약금</strong><br>없음</div>
          <div class="ig6-check"><strong>여행 후</strong><br>해지 가능</div>
        </div>`)
      + section('ig6-final','ig6-blue',`
        <span class="ig6-kicker">여행 계획이 있다면</span>
        <h2 class="ig6-title">큰돈을 한 번에 내기 전에<br><strong>미리 준비하세요</strong></h2>
        <button type="button" class="ig6-btn">멤버십 플랜 확인하기</button>`);

    review.insertAdjacentHTML('afterend', html);
    const button = document.querySelector('.ig6-btn');
    if (button) button.addEventListener('click', () => document.querySelector('#plans')?.scrollIntoView({ behavior:'smooth', block:'start' }));
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once:true });
  else inject();
})();
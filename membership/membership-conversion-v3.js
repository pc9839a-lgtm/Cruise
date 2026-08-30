(() => {
  'use strict';

  const STYLE_ID = 'ingroup-conversion-story-v8-style';

  const section = (id, tone, body, extra = '') => `
    <section id="${id}" class="ig8-section ${tone} ig8-reveal ${extra}">
      <div class="ig8-line" aria-hidden="true"></div>
      <div class="container"><div class="ig8-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig8-section,.ig8-section *{box-sizing:border-box}
      .ig8-section{position:relative;min-height:600px;display:flex;align-items:center;padding:92px 0;overflow:hidden;isolation:isolate}
      .ig8-white{background:#fff;color:#10182b}.ig8-soft{background:#f4f6f9;color:#10182b}.ig8-dark{background:#0c1730;color:#fff}.ig8-blue{background:#1f4f96;color:#fff}
      .ig8-compact{min-height:440px}
      .ig8-wrap{position:relative;z-index:2;width:min(1040px,100%);margin:0 auto;text-align:center}
      .ig8-section h2,.ig8-section p,.ig8-section span,.ig8-section strong{word-break:keep-all}
      .ig8-title{max-width:930px;margin:0 auto;font-size:clamp(42px,5.5vw,72px);line-height:1.09;letter-spacing:-.055em;font-weight:650;text-wrap:balance}
      .ig8-title strong{font-weight:900}
      .ig8-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:22px;padding:10px 17px;border-radius:999px;background:#eef3fb;color:#2c5da7;font-size:clamp(20px,2.1vw,25px);line-height:1.2;font-weight:650}
      .ig8-dark .ig8-kicker,.ig8-blue .ig8-kicker{background:rgba(255,255,255,.11);color:#e5efff}
      .ig8-accent{color:#2d6cff}.ig8-dark .ig8-accent,.ig8-blue .ig8-accent{color:#c4d7ff}
      .ig8-mega{margin-top:40px;font-size:clamp(80px,10.7vw,142px);line-height:.9;letter-spacing:-.078em;font-weight:920}
      .ig8-sub{max-width:800px;margin:24px auto 0;font-size:clamp(24px,2.9vw,34px);line-height:1.4;letter-spacing:-.03em;font-weight:470;text-wrap:balance}
      .ig8-sub strong{font-weight:790}
      .ig8-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:22px;max-width:900px;margin:46px auto 0}
      .ig8-card{padding:34px 28px;border-radius:30px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 44px rgba(23,49,92,.08);color:#10182b}
      .ig8-dark .ig8-card,.ig8-blue .ig8-card{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.16);box-shadow:none;color:#fff}
      .ig8-card span{display:block;font-size:clamp(22px,2.5vw,29px);line-height:1.25;font-weight:470}
      .ig8-card strong{display:block;margin-top:14px;font-size:clamp(52px,6.8vw,86px);line-height:.95;letter-spacing:-.06em;font-weight:900}
      .ig8-symbol{font-size:44px;font-weight:630;color:#86a5dc}
      .ig8-rule-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:46px auto 0}
      .ig8-rule{min-height:215px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;border-radius:30px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 44px rgba(23,49,92,.07);color:#10182b}
      .ig8-rule strong{display:block;font-size:clamp(58px,7vw,86px);line-height:.95;font-weight:910}
      .ig8-rule span{display:block;margin-top:16px;font-size:clamp(25px,2.9vw,33px);line-height:1.18;font-weight:540}
      .ig8-ledger{max-width:840px;margin:44px auto 0;text-align:left}
      .ig8-ledger-row{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:26px 4px;border-top:1px solid rgba(17,31,56,.13)}
      .ig8-dark .ig8-ledger-row,.ig8-blue .ig8-ledger-row{border-color:rgba(255,255,255,.17)}
      .ig8-ledger-row:first-child{border-top:0}
      .ig8-ledger-row span{font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:470}
      .ig8-ledger-row strong{font-size:clamp(39px,4.9vw,60px);line-height:1;font-weight:840;letter-spacing:-.05em}
      .ig8-ledger-row.total{margin-top:6px;padding-top:30px;border-top:3px solid #2d6cff}
      .ig8-ledger-row.total span{font-weight:650}.ig8-ledger-row.total strong{color:#2d6cff;font-weight:920}
      .ig8-dark .ig8-ledger-row.total strong,.ig8-blue .ig8-ledger-row.total strong{color:#c4d7ff}
      .ig8-equation{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:18px;margin:46px auto 0;max-width:980px}
      .ig8-equation-part{min-width:210px;padding:27px 22px;border-radius:28px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 17px 42px rgba(23,49,92,.07);color:#10182b}
      .ig8-equation-part span{display:block;font-size:clamp(21px,2.4vw,27px);font-weight:470}
      .ig8-equation-part strong{display:block;margin-top:12px;font-size:clamp(46px,5.8vw,72px);line-height:.95;font-weight:900;letter-spacing:-.055em}
      .ig8-eq-symbol{font-size:40px;font-weight:620;color:#819bc8}
      .ig8-routes{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1040px;margin:44px auto 0}
      .ig8-route{position:relative;min-height:280px;padding:28px 20px;border-radius:27px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 46px rgba(23,49,92,.08);text-align:left;color:#10182b;overflow:hidden}
      .ig8-route::before{content:'';position:absolute;left:0;right:0;top:0;height:4px;background:#2d6cff;transform:scaleX(0);transform-origin:left;transition:transform .7s cubic-bezier(.22,1,.36,1)}
      .ig8-reveal.is-visible .ig8-route::before{transform:scaleX(1)}
      .ig8-route h3{margin:0;font-size:clamp(28px,2.6vw,36px);line-height:1.15;font-weight:720;letter-spacing:-.04em}
      .ig8-route-price{display:block;margin-top:22px;font-size:clamp(39px,4.2vw,53px);line-height:1;font-weight:900;letter-spacing:-.055em}
      .ig8-route-arrow{display:block;margin:15px 0 10px;color:#819bc8;font-size:26px;font-weight:600}
      .ig8-route-actual{display:block;color:#2d67c7;font-size:clamp(29px,2.9vw,37px);line-height:1.08;font-weight:850}
      .ig8-route-save{display:inline-flex;margin-top:20px;padding:8px 12px;border-radius:999px;background:#edf3ff;color:#255bb6;font-size:clamp(18px,1.8vw,21px);font-weight:700}
      .ig8-checks{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:940px;margin:44px auto 0}
      .ig8-check{padding:32px 22px;border-radius:27px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);font-size:clamp(27px,3vw,35px);line-height:1.24;font-weight:510}
      .ig8-check strong{font-weight:850}
      .ig8-btn{display:inline-flex;align-items:center;justify-content:center;min-height:72px;margin-top:40px;padding:0 40px;border:0;border-radius:17px;background:#fff;color:#173766;font-size:clamp(25px,2.8vw,32px);font-weight:760;cursor:pointer;box-shadow:0 16px 38px rgba(0,0,0,.16);transition:transform .22s ease,box-shadow .22s ease}
      .ig8-btn:hover{transform:translateY(-4px);box-shadow:0 22px 46px rgba(0,0,0,.21)}
      .ig8-line{position:absolute;left:50%;top:0;width:0;height:3px;background:#2d6cff;transform:translateX(-50%);transition:width .9s cubic-bezier(.22,1,.36,1)}
      .ig8-reveal.is-visible .ig8-line{width:min(180px,24vw)}
      .ig8-reveal{opacity:0;transform:translate3d(0,46px,0) scale(.986);filter:blur(7px);transition:opacity .74s cubic-bezier(.22,1,.36,1),transform .74s cubic-bezier(.22,1,.36,1),filter .68s ease}
      .ig8-reveal.is-visible{opacity:1;transform:none;filter:none}
      .ig8-reveal .ig8-kicker,.ig8-reveal .ig8-title,.ig8-reveal .ig8-sub,.ig8-reveal .ig8-mega,.ig8-reveal .ig8-card,.ig8-reveal .ig8-rule,.ig8-reveal .ig8-ledger-row,.ig8-reveal .ig8-equation-part,.ig8-reveal .ig8-eq-symbol,.ig8-reveal .ig8-route,.ig8-reveal .ig8-check,.ig8-reveal .ig8-btn{opacity:0;transition:opacity .58s cubic-bezier(.22,1,.36,1),transform .58s cubic-bezier(.22,1,.36,1)}
      .ig8-reveal .ig8-kicker,.ig8-reveal .ig8-title,.ig8-reveal .ig8-sub{transform:translateY(26px)}
      .ig8-reveal .ig8-mega{transform:scale(.75)}
      .ig8-reveal .ig8-card:first-child{transform:translateX(-48px)}
      .ig8-reveal .ig8-card:last-child{transform:translateX(48px)}
      .ig8-reveal .ig8-rule:nth-child(1),.ig8-reveal .ig8-route:nth-child(odd){transform:translate(-32px,24px)}
      .ig8-reveal .ig8-rule:nth-child(2),.ig8-reveal .ig8-route:nth-child(even){transform:translate(32px,24px)}
      .ig8-reveal .ig8-ledger-row,.ig8-reveal .ig8-equation-part,.ig8-reveal .ig8-eq-symbol,.ig8-reveal .ig8-check,.ig8-reveal .ig8-btn{transform:translateY(24px)}
      .ig8-reveal.is-visible .ig8-kicker,.ig8-reveal.is-visible .ig8-title{opacity:1;transform:none;transition-delay:.04s}
      .ig8-reveal.is-visible .ig8-sub,.ig8-reveal.is-visible .ig8-mega{opacity:1;transform:none;transition-delay:.13s}
      .ig8-reveal.is-visible .ig8-card:nth-child(1),.ig8-reveal.is-visible .ig8-rule:nth-child(1),.ig8-reveal.is-visible .ig8-route:nth-child(1),.ig8-reveal.is-visible .ig8-equation-part:nth-child(1),.ig8-reveal.is-visible .ig8-check:nth-child(1){opacity:1;transform:none;transition-delay:.17s}
      .ig8-reveal.is-visible .ig8-card:nth-child(3),.ig8-reveal.is-visible .ig8-rule:nth-child(2),.ig8-reveal.is-visible .ig8-route:nth-child(2),.ig8-reveal.is-visible .ig8-equation-part:nth-child(3),.ig8-reveal.is-visible .ig8-check:nth-child(2){opacity:1;transform:none;transition-delay:.27s}
      .ig8-reveal.is-visible .ig8-route:nth-child(3),.ig8-reveal.is-visible .ig8-equation-part:nth-child(5),.ig8-reveal.is-visible .ig8-check:nth-child(3){opacity:1;transform:none;transition-delay:.37s}
      .ig8-reveal.is-visible .ig8-route:nth-child(4){opacity:1;transform:none;transition-delay:.47s}
      .ig8-reveal.is-visible .ig8-eq-symbol{opacity:1;transform:none;transition-delay:.23s}
      .ig8-reveal.is-visible .ig8-ledger-row{opacity:1;transform:none;transition-delay:.15s}
      .ig8-reveal.is-visible .ig8-ledger-row:nth-child(2){transition-delay:.25s}.ig8-reveal.is-visible .ig8-ledger-row:nth-child(3){transition-delay:.35s}
      .ig8-reveal.is-visible .ig8-btn{opacity:1;transform:none;transition-delay:.31s}

      /* moved calculator */
      #calculator.ig8-calculator{min-height:0;padding:92px 0;background:#f4f6f9;color:#10182b;position:relative;overflow:hidden}
      #calculator.ig8-calculator>.container{width:min(1120px,calc(100% - 40px));margin:0 auto}
      #calculator.ig8-calculator .section-head{margin-bottom:44px;text-align:center}
      #calculator.ig8-calculator .section-head p{display:none!important}
      #calculator.ig8-calculator .exchange-bar{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:0 auto 18px;padding:22px 28px;border:1px solid #dfe5ef;border-radius:24px;background:#fff;box-shadow:none}
      #calculator.ig8-calculator .exchange-label{font-size:20px;font-weight:600;color:#637393}
      #calculator.ig8-calculator #exchangeRateText{font-size:clamp(28px,3.5vw,40px);line-height:1;font-weight:850;letter-spacing:-.045em;color:#10182b}
      #calculator.ig8-calculator .exchange-meta{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      #calculator.ig8-calculator .calculator-card{margin:0 auto;padding:38px;border:1px solid #dfe5ef;border-radius:30px;background:#fff;box-shadow:0 20px 54px rgba(23,49,92,.08);transform:translateY(30px);opacity:0;transition:opacity .65s .16s cubic-bezier(.22,1,.36,1),transform .65s .16s cubic-bezier(.22,1,.36,1)}
      #calculator.ig8-calculator.is-visible .calculator-card{transform:none;opacity:1}
      #calculator.ig8-calculator .calculator-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:24px}
      #calculator.ig8-calculator .calculator-head strong{font-size:clamp(24px,2.8vw,31px);font-weight:620;color:#10182b}
      #calculator.ig8-calculator #rangeValue{font-size:clamp(46px,6vw,72px);line-height:.92;font-weight:900;letter-spacing:-.06em;color:#10182b}
      #calculator.ig8-calculator .price-range{margin:8px 0 28px;height:10px}
      #calculator.ig8-calculator .calculator-mode{display:grid;grid-template-columns:1fr 1fr;width:min(560px,100%);margin:0 auto 32px;padding:5px;border:1px solid #dfe5ef;border-radius:18px;background:#f4f6f9}
      #calculator.ig8-calculator .mode-btn{min-height:54px;border:0;border-radius:14px;background:transparent;color:#637393;font-size:20px;font-weight:650;box-shadow:none}
      #calculator.ig8-calculator .mode-btn.active{background:#10182b;color:#fff}
      #calculator.ig8-calculator .calculator-note{display:none!important}
      #calculator.ig8-calculator .result-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:0}
      #calculator.ig8-calculator .result-box{min-height:185px;padding:28px 24px;border:1px solid #dfe5ef;border-radius:24px;background:#fff;box-shadow:none;display:flex;flex-direction:column;justify-content:center;text-align:left}
      #calculator.ig8-calculator .result-box:first-child{display:none!important}
      #calculator.ig8-calculator .result-box span{font-size:clamp(21px,2.2vw,25px);font-weight:560;color:#637393}
      #calculator.ig8-calculator .result-box strong{display:block;margin-top:14px;font-size:clamp(42px,5vw,58px);line-height:.95;font-weight:900;letter-spacing:-.05em;color:#10182b}
      #calculator.ig8-calculator .result-box em,#calculator.ig8-calculator .result-box small{display:none!important}
      #calculator.ig8-calculator .result-box.highlight{background:#1f4f96;border-color:#1f4f96;color:#fff}
      #calculator.ig8-calculator .result-box.highlight span,#calculator.ig8-calculator .result-box.highlight strong{color:#fff}
      #calculator.ig8-calculator .section-kicker{display:none!important}

      @media(max-width:780px){
        .ig8-section{min-height:540px;padding:70px 0}.ig8-compact{min-height:390px}
        .ig8-title{font-size:clamp(35px,9.5vw,42px);line-height:1.13;letter-spacing:-.045em}
        .ig8-sub{font-size:clamp(22px,5.7vw,27px);line-height:1.4}.ig8-kicker{font-size:19px;margin-bottom:18px;padding:9px 15px}.ig8-mega{font-size:clamp(76px,22vw,108px)}
        .ig8-pair{grid-template-columns:1fr;gap:12px;margin-top:36px}.ig8-symbol{transform:rotate(90deg);font-size:28px}.ig8-card{padding:27px 18px}.ig8-card span{font-size:21px}.ig8-card strong{font-size:clamp(47px,13.5vw,64px)}
        .ig8-rule-grid{grid-template-columns:1fr 1fr;gap:10px;margin-top:36px}.ig8-rule{min-height:170px;padding:24px 10px;border-radius:23px}.ig8-rule strong{font-size:clamp(52px,14.5vw,70px)}.ig8-rule span{font-size:clamp(20px,5.2vw,24px)}
        .ig8-ledger-row{grid-template-columns:1fr;gap:8px;text-align:center}.ig8-ledger-row span{font-size:22px}.ig8-ledger-row strong{font-size:41px}
        .ig8-equation{display:grid;grid-template-columns:1fr;gap:10px;margin-top:36px}.ig8-equation-part{min-width:0;padding:24px 16px}.ig8-equation-part span{font-size:20px}.ig8-equation-part strong{font-size:48px}.ig8-eq-symbol{font-size:27px;transform:rotate(90deg)}
        .ig8-routes{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:36px}.ig8-route{min-height:235px;padding:20px 12px;border-radius:22px}.ig8-route h3{font-size:23px}.ig8-route-price{font-size:32px;margin-top:17px}.ig8-route-arrow{font-size:21px;margin:12px 0 8px}.ig8-route-actual{font-size:25px}.ig8-route-save{font-size:16px;margin-top:16px;padding:7px 9px}
        .ig8-checks{grid-template-columns:1fr;gap:10px}.ig8-check{font-size:26px;padding:25px 17px}
        .ig8-reveal .ig8-card:first-child,.ig8-reveal .ig8-card:last-child,.ig8-reveal .ig8-rule:nth-child(1),.ig8-reveal .ig8-rule:nth-child(2),.ig8-reveal .ig8-route:nth-child(odd),.ig8-reveal .ig8-route:nth-child(even){transform:translateY(24px)}
        #calculator.ig8-calculator{padding:70px 0}
        #calculator.ig8-calculator>.container{width:min(100% - 24px,680px)}
        #calculator.ig8-calculator .section-head{margin-bottom:32px}
        #calculator.ig8-calculator .exchange-bar{padding:18px 20px;border-radius:20px;align-items:flex-end}
        #calculator.ig8-calculator .exchange-label{font-size:17px}
        #calculator.ig8-calculator #exchangeRateText{font-size:27px}
        #calculator.ig8-calculator .calculator-card{padding:26px 18px;border-radius:24px}
        #calculator.ig8-calculator .calculator-head{align-items:flex-end;margin-bottom:20px}
        #calculator.ig8-calculator .calculator-head strong{font-size:21px}
        #calculator.ig8-calculator #rangeValue{font-size:46px}
        #calculator.ig8-calculator .calculator-mode{margin-bottom:24px}
        #calculator.ig8-calculator .mode-btn{font-size:17px;min-height:50px}
        #calculator.ig8-calculator .result-grid{grid-template-columns:1fr;gap:10px}
        #calculator.ig8-calculator .result-box{min-height:120px;padding:22px 20px;text-align:center}
        #calculator.ig8-calculator .result-box span{font-size:20px}
        #calculator.ig8-calculator .result-box strong{font-size:44px}
      }
      @media(max-width:420px){.ig8-section{padding:64px 0}.ig8-title{font-size:35px}.ig8-route{min-height:225px;padding:18px 11px}.ig8-route h3{font-size:22px}.ig8-route-price{font-size:30px}.ig8-route-actual{font-size:24px}.ig8-route-save{font-size:15px}}
      @media(prefers-reduced-motion:reduce){.ig8-reveal,.ig8-reveal *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}}
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
      const duration = 900;
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
    const nodes = document.querySelectorAll('.ig8-reveal');
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

  function prepareCalculator() {
    const calc = document.getElementById('calculator');
    const saving = document.getElementById('ig8-saving');
    if (!calc || !saving) return;

    calc.className = 'ig8-calculator ig8-reveal';

    const head = calc.querySelector('.section-head');
    if (head) {
      head.innerHTML = `
        <span class="ig8-kicker">직접 계산</span>
        <h2 class="ig8-title">이번엔 <strong>내 크루즈 가격</strong>으로 계산해보세요</h2>`;
    }

    const calcLabel = calc.querySelector('.calculator-head strong');
    if (calcLabel) calcLabel.textContent = '크루즈 가격';

    const range = calc.querySelector('#cruisePrice');
    if (range) range.value = '3500';

    const modeDescription = calc.querySelector('#modeDescription');
    if (modeDescription) modeDescription.setAttribute('aria-hidden', 'true');

    saving.insertAdjacentElement('afterend', calc);
  }

  function inject() {
    if (document.getElementById('ig8-problem-a')) return;
    addStyles();
    const review = document.querySelector('.review-flow-section');
    if (!review) return;

    const html =
      section('ig8-problem-a','ig8-dark',`
        <h2 class="ig8-title"><strong>크루즈는 가고 싶은데</strong></h2>`, 'ig8-compact')
      + section('ig8-problem-b','ig8-white',`
        <h2 class="ig8-title"><strong>최저가로 갈 수 있는 방법 없을까요?</strong></h2>`, 'ig8-compact')
      + section('ig8-promise','ig8-blue',`
        <span class="ig8-kicker">방법은 미리 준비하는 것</span>
        <h2 class="ig8-title">미리미리 준비하면<br><strong>남들보다 약 25% 저렴하게</strong></h2>
        <div class="ig8-mega ig8-accent" data-count="25" data-suffix="%">25%</div>`)
      + section('ig8-start','ig8-white',`
        <span class="ig8-kicker">첫 가입</span>
        <h2 class="ig8-title">클래식 시작 비용 <strong>$200</strong></h2>
        <div class="ig8-pair">
          <div class="ig8-card"><span>시작 비용</span><strong>$200</strong></div>
          <div class="ig8-symbol">→</div>
          <div class="ig8-card"><span>바로 적립</span><strong class="ig8-accent">350P</strong></div>
        </div>`)
      + section('ig8-monthly','ig8-soft',`
        <span class="ig8-kicker">그 다음 매월</span>
        <h2 class="ig8-title"><strong>$100</strong> 납부하면<br><strong>200P</strong> 적립</h2>
        <div class="ig8-pair">
          <div class="ig8-card"><span>내가 납부</span><strong>$100</strong></div>
          <div class="ig8-symbol">→</div>
          <div class="ig8-card"><span>포인트 적립</span><strong class="ig8-accent">200P</strong></div>
        </div>`)
      + section('ig8-rule','ig8-white',`
        <span class="ig8-kicker">포인트 사용</span>
        <h2 class="ig8-title">쌓인 포인트는<br><strong>크루즈 예약할 때 사용</strong></h2>
        <div class="ig8-rule-grid">
          <div class="ig8-rule"><strong>100%</strong><span>보유 포인트 사용</span></div>
          <div class="ig8-rule"><strong>50%</strong><span>예약금액 한도</span></div>
        </div>`)
      + section('ig8-seven','ig8-dark',`
        <span class="ig8-kicker">7개월 준비</span>
        <h2 class="ig8-title">총 <strong>1,750P</strong>가 쌓입니다</h2>
        <div class="ig8-ledger">
          <div class="ig8-ledger-row"><span>가입 리워드</span><strong>350P</strong></div>
          <div class="ig8-ledger-row"><span>7개월 × 200P</span><strong>1,400P</strong></div>
          <div class="ig8-ledger-row total"><span>총 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div>
        </div>`)
      + section('ig8-cruise','ig8-soft',`
        <span class="ig8-kicker">이제 여행을 예약합니다</span>
        <h2 class="ig8-title">예시 크루즈 가격</h2>
        <div class="ig8-mega" data-count="3500" data-prefix="$">$3,500</div>`)
      + section('ig8-payment','ig8-blue',`
        <span class="ig8-kicker">예약할 때</span>
        <h2 class="ig8-title"><strong>1,750P</strong>를 전부 사용합니다</h2>
        <div class="ig8-pair">
          <div class="ig8-card"><span>포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div>
          <div class="ig8-symbol">+</div>
          <div class="ig8-card"><span>카드</span><strong data-count="1750" data-prefix="$">$1,750</strong></div>
        </div>
        <div class="ig8-sub">남는 포인트 <strong>0P</strong></div>`)
      + section('ig8-membership-spend','ig8-white',`
        <span class="ig8-kicker">7개월 동안 실제 낸 멤버십 비용</span>
        <h2 class="ig8-title">시작 $200 + 월 납부 $700</h2>
        <div class="ig8-mega ig8-accent" data-count="900" data-prefix="$">$900</div>`)
      + section('ig8-total','ig8-soft',`
        <span class="ig8-kicker">실제 총지출</span>
        <div class="ig8-equation">
          <div class="ig8-equation-part"><span>멤버십</span><strong>$900</strong></div>
          <div class="ig8-eq-symbol">+</div>
          <div class="ig8-equation-part"><span>카드</span><strong>$1,750</strong></div>
          <div class="ig8-eq-symbol">=</div>
          <div class="ig8-equation-part"><span>실제 지출</span><strong class="ig8-accent" data-count="2650" data-prefix="$">$2,650</strong></div>
        </div>`)
      + section('ig8-saving','ig8-dark',`
        <span class="ig8-kicker">결과</span>
        <h2 class="ig8-title">그냥 $3,500을 결제하는 것보다</h2>
        <div class="ig8-mega ig8-accent" data-count="850" data-prefix="$" data-suffix=" 절감">$850 절감</div>`)
      + section('ig8-routes','ig8-white',`
        <span class="ig8-kicker">대표 크루즈 예시</span>
        <h2 class="ig8-title">4가지 가격대<br><strong>한눈에 비교</strong></h2>
        <div class="ig8-routes">
          <article class="ig8-route"><h3>아시아</h3><span class="ig8-route-price">$1,900</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$1,450</strong><span class="ig8-route-save">$450 절감</span></article>
          <article class="ig8-route"><h3>지중해</h3><span class="ig8-route-price">$3,500</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$2,650</strong><span class="ig8-route-save">$850 절감</span></article>
          <article class="ig8-route"><h3>북유럽</h3><span class="ig8-route-price">$4,300</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$3,250</strong><span class="ig8-route-save">$1,050 절감</span></article>
          <article class="ig8-route"><h3>디즈니</h3><span class="ig8-route-price">$5,100</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$3,850</strong><span class="ig8-route-save">$1,250 절감</span></article>
        </div>`)
      + section('ig8-freedom','ig8-dark',`
        <span class="ig8-kicker">여행이 끝난 뒤</span>
        <h2 class="ig8-title">계속 낼 필요는 없습니다</h2>
        <div class="ig8-checks">
          <div class="ig8-check"><strong>약정기간</strong><br>없음</div>
          <div class="ig8-check"><strong>해지 위약금</strong><br>없음</div>
          <div class="ig8-check"><strong>여행 후</strong><br>해지 가능</div>
        </div>`)
      + section('ig8-final','ig8-blue',`
        <span class="ig8-kicker">여행 계획이 있다면</span>
        <h2 class="ig8-title">큰돈을 한 번에 내기 전에<br><strong>미리 준비하세요</strong></h2>
        <button type="button" class="ig8-btn">멤버십 플랜 확인하기</button>`);

    review.insertAdjacentHTML('afterend', html);
    prepareCalculator();

    const button = document.querySelector('.ig8-btn');
    if (button) button.addEventListener('click', () => document.querySelector('#plans')?.scrollIntoView({ behavior:'smooth', block:'start' }));
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once:true });
  else inject();
})();
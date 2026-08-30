(() => {
  'use strict';

  const STYLE_ID = 'membership-polish-v9-style';

  function addStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .pmx-section,.pmx-section *,
      .ig8-section,.ig8-section *,
      #calculator,#calculator *,
      #plans,#plans *{box-sizing:border-box;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}

      .pmx-section,.ig8-section{position:relative;overflow:hidden;transition:none!important}
      .pmx-inner,.ad-inner{width:min(1080px,calc(100% - 48px));margin:0 auto}

      /* top nav: no capsule cards */
      .hero-nav-track{gap:0!important;background:#fff!important;border-bottom:1px solid #e7e9ee!important}
      .hero-nav-track a{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:17px 20px!important;color:#536071!important}
      .hero-nav-track a strong{font-size:13px!important;color:#9ba3af!important;margin-right:7px!important}
      .hero-nav-track a span{font-size:17px!important;font-weight:700!important;letter-spacing:-.035em!important}
      .hero-nav-track a:hover,.hero-nav-track a.active{background:transparent!important;color:#111827!important}

      /* common ad typography */
      .ad-label,.pmx-brand{margin:0 0 18px;font-size:17px;line-height:1.2;font-weight:800;letter-spacing:.08em;color:#285aa8}
      .ad-title,.pmx-big-title,#calculator .section-head h2,#plans .membership-section-head h2{
        margin:0;font-size:clamp(48px,6.2vw,80px)!important;line-height:1.04!important;letter-spacing:-.06em!important;font-weight:760!important;word-break:keep-all;text-wrap:balance
      }
      .ad-title strong,.pmx-big-title strong{font-weight:920!important}
      .ad-copy{margin:24px 0 0;font-size:clamp(22px,2.4vw,30px);line-height:1.45;letter-spacing:-.035em;color:#647084;font-weight:480;word-break:keep-all}
      .pmx-kicker,.ig8-kicker{display:none!important}

      /* animation: content only */
      .pmx-enter,.ad-enter{opacity:0;transform:translateY(18px);transition:opacity .46s ease-out,transform .46s ease-out}
      .pmx-visible .pmx-enter,.pmx-visible .ad-enter{opacity:1;transform:none}
      .pmx-visible .ad-enter:nth-child(2){transition-delay:.06s}
      .pmx-visible .ad-enter:nth-child(3){transition-delay:.12s}
      .pmx-visible .ad-enter:nth-child(4){transition-delay:.18s}
      .ig8-reveal{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
      .ig8-reveal>*{opacity:1!important;transform:none!important;filter:none!important}

      /* trust: editorial strip, not cards */
      #trust-proof{padding:110px 0 104px;background:#fff;color:#111827}
      #trust-proof .pmx-inner{text-align:left}
      #trust-proof .pmx-big-title{max-width:900px;margin:0;text-align:left}
      .pmx-trust-strip{display:grid;grid-template-columns:repeat(3,1fr);margin-top:62px;border-top:1px solid #d9dde5;border-bottom:1px solid #d9dde5}
      .pmx-trust-item{padding:34px 28px 32px 0;opacity:0;transform:translateY(18px);transition:opacity .48s ease-out,transform .48s ease-out}
      #trust-proof.pmx-visible .pmx-trust-item{opacity:1;transform:none}
      #trust-proof.pmx-visible .pmx-trust-item:nth-child(1){transition-delay:.10s}
      #trust-proof.pmx-visible .pmx-trust-item:nth-child(2){transition-delay:.18s}
      #trust-proof.pmx-visible .pmx-trust-item:nth-child(3){transition-delay:.26s}
      .pmx-trust-item+.pmx-trust-item{padding-left:34px;border-left:1px solid #d9dde5}
      .pmx-trust-item strong{display:block;font-size:clamp(46px,5.6vw,72px);line-height:.95;font-weight:920;letter-spacing:-.06em;color:#111827}
      .pmx-trust-item span{display:block;margin-top:13px;font-size:22px;font-weight:720;letter-spacing:-.035em;color:#29354a}
      .pmx-trust-item small{display:block;margin-top:5px;font-size:17px;font-weight:500;color:#8a94a4}

      /* real cruise visual */
      #travel-desire{padding:0;background:#071427;color:#fff}
      .pmx-cruise-visual{position:relative;min-height:clamp(600px,67vw,820px);display:flex;align-items:flex-end;overflow:hidden}
      .pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block}
      .pmx-cruise-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,12,25,.02) 36%,rgba(5,12,25,.72) 100%)}
      .pmx-cruise-copy{position:relative;z-index:2;width:min(1080px,calc(100% - 48px));margin:0 auto;padding:0 0 72px;text-align:left}
      #travel-desire .pmx-big-title{max-width:850px;margin:0;color:#fff;text-align:left}
      #travel-desire .pmx-brand{color:rgba(255,255,255,.78)}

      /* price hook: no boxed cards */
      #quick-result{padding:112px 0 110px;background:#fff;color:#111827}
      #quick-result .pmx-inner{text-align:left}
      #quick-result .pmx-big-title{max-width:960px;text-align:left;margin:0}
      .pmx-price-line{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:34px;margin-top:58px;padding:36px 0;border-top:1px solid #d9dde5;border-bottom:1px solid #d9dde5}
      .pmx-price-unit span{display:block;margin-bottom:12px;font-size:20px;font-weight:650;color:#7a8494}
      .pmx-price-unit strong{display:block;font-size:clamp(62px,8vw,104px);line-height:.86;letter-spacing:-.075em;font-weight:920;color:#111827}
      .pmx-price-unit.before strong{text-decoration:line-through;text-decoration-thickness:3px;text-decoration-color:#b8bec8;color:#777f8c}
      .pmx-price-unit.after strong{color:#245fc4}
      .pmx-price-arrow{padding-bottom:10px;font-size:38px;color:#a0a8b5}
      .pmx-save{margin-top:28px;font-size:clamp(28px,3.5vw,44px);font-weight:760;letter-spacing:-.045em;color:#111827}
      .pmx-save strong{color:#245fc4;font-weight:920}

      /* bridge */
      #subscribe-bridge{padding:100px 0;background:#1f4f96;color:#fff}
      #subscribe-bridge .ad-inner{text-align:left}
      #subscribe-bridge .ad-title{max-width:940px;color:#fff}
      #subscribe-bridge .ad-copy{color:rgba(255,255,255,.75)}

      /* core explanation: large numbers, no cards */
      .ad-core{padding:100px 0;background:#fff;color:#111827}
      .ad-core.alt{background:#f5f6f8}
      .ad-core.dark{background:#0b1730;color:#fff}
      .ad-core .ad-inner{text-align:left}
      .ad-core.dark .ad-label{color:#99b9ee}
      .ad-core.dark .ad-copy{color:rgba(255,255,255,.72)}
      .ad-number-line{display:flex;align-items:center;gap:28px;margin-top:52px;padding:34px 0;border-top:1px solid currentColor;border-bottom:1px solid currentColor;border-color:rgba(124,135,151,.28)}
      .ad-number-line strong{font-size:clamp(66px,9vw,116px);line-height:.86;letter-spacing:-.075em;font-weight:920}
      .ad-number-line b{font-size:34px;color:#8f99a8}
      .ad-number-line .accent{color:#245fc4}
      .ad-core.dark .ad-number-line .accent{color:#b9d0ff}
      .ad-payment-line{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:28px;margin-top:52px;padding:34px 0;border-top:1px solid rgba(124,135,151,.28);border-bottom:1px solid rgba(124,135,151,.28)}
      .ad-payment-line span{display:block;margin-bottom:10px;font-size:19px;color:#7c8797;font-weight:650}
      .ad-payment-line strong{font-size:clamp(52px,6.8vw,88px);line-height:.9;letter-spacing:-.065em;font-weight:920}
      .ad-payment-line b{padding-bottom:8px;font-size:30px;color:#929baa}
      .ad-core.dark .ad-payment-line span{color:rgba(255,255,255,.58)}

      /* route examples: editorial columns */
      #ig8-routes{padding:96px 0!important;background:#fff!important;color:#111827!important}
      #ig8-routes .ig8-inner{width:min(1080px,calc(100% - 48px))!important;margin:0 auto!important}
      #ig8-routes .ig8-title{text-align:left!important;margin:0!important;font-size:clamp(44px,5.4vw,70px)!important;line-height:1.06!important;font-weight:800!important;letter-spacing:-.055em!important}
      #ig8-routes .ig8-route-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:0!important;margin-top:50px!important;border-top:1px solid #d9dde5!important;border-bottom:1px solid #d9dde5!important}
      #ig8-routes .ig8-route{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;animation:none!important;padding:28px 22px!important;min-height:160px!important}
      #ig8-routes .ig8-route+.ig8-route{border-left:1px solid #d9dde5!important}

      /* calculator: clean retail UI */
      #calculator{padding:100px 0!important;background:#f5f6f8!important}
      #calculator .section-head{text-align:left!important;width:min(980px,100%)!important;margin-left:auto!important;margin-right:auto!important}
      #calculator .section-head h2{text-align:left!important;max-width:850px!important}
      #calculator .calculator-card{background:#fff!important;border:1px solid #e1e4ea!important;border-radius:24px!important;box-shadow:none!important}
      #calculator .result-box{box-shadow:none!important;border:0!important;background:#f5f6f8!important}
      #calculator .result-box.highlight{background:#111827!important;color:#fff!important}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:100%;min-height:66px;margin:20px auto 0;border:0;border-radius:14px;background:#245fc4;color:#fff;font-size:22px;font-weight:800;cursor:pointer}

      /* price match: strongest promise */
      #price-match{padding:112px 0;background:#0b1730;color:#fff}
      #price-match .pmx-inner{text-align:left}
      #price-match .pmx-big-title{max-width:960px;text-align:left;color:#fff;margin:0}
      #price-match .pmx-main{margin:46px 0 0;font-size:clamp(96px,13vw,170px);line-height:.82;font-weight:920;letter-spacing:-.085em;color:#c5d8ff}
      #price-match .pmx-copy{max-width:880px;margin:30px 0 0;font-size:clamp(22px,2.6vw,31px);line-height:1.45;color:rgba(255,255,255,.76);font-weight:480;word-break:keep-all}
      #price-match .pmx-copy strong{color:#fff;font-weight:820}

      /* plans: keep product cards, remove unnecessary decoration */
      #plans{padding-top:100px!important;padding-bottom:100px!important}
      #plans .membership-section-head{text-align:left!important;width:min(1080px,calc(100% - 48px))!important;margin-left:auto!important;margin-right:auto!important}
      #plans .membership-section-head h2{text-align:left!important;margin:0!important}
      #plans .membership-section-head .section-kicker{display:none!important}
      #plans .plan-card{box-shadow:none!important}
      #plans .plan-fit{font-size:18px!important;line-height:1.4!important;font-weight:620!important;letter-spacing:-.025em!important;word-break:keep-all}
      #plans .recommended .plan-fit{color:rgba(255,255,255,.82)}
      #plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      /* signup steps: typography, not cards */
      #signup-steps{padding:94px 0;background:#fff;color:#111827}
      #signup-steps .pmx-inner{text-align:left}
      #signup-steps .pmx-big-title{text-align:left;margin:0;max-width:860px}
      .pmx-step-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:52px;border-top:1px solid #d9dde5;border-bottom:1px solid #d9dde5}
      .pmx-step{min-height:150px;padding:30px 24px 30px 0;opacity:0;transform:translateY(18px);transition:opacity .46s ease-out,transform .46s ease-out}
      .pmx-step+.pmx-step{padding-left:30px;border-left:1px solid #d9dde5}
      #signup-steps.pmx-visible .pmx-step{opacity:1;transform:none}
      #signup-steps.pmx-visible .pmx-step:nth-child(1){transition-delay:.08s}
      #signup-steps.pmx-visible .pmx-step:nth-child(2){transition-delay:.16s}
      #signup-steps.pmx-visible .pmx-step:nth-child(3){transition-delay:.24s}
      .pmx-step b{display:block;font-size:16px;color:#245fc4;font-weight:850}
      .pmx-step strong{display:block;margin-top:18px;font-size:clamp(28px,3vw,38px);font-weight:850;letter-spacing:-.045em}

      /* hotel/tour: one visual statement */
      #hotel-benefit{padding:108px 0;background:#f5f6f8;color:#111827}
      #hotel-benefit .pmx-inner{text-align:left}
      #hotel-benefit .pmx-big-title{text-align:left;margin:0;max-width:920px}
      #hotel-benefit .pmx-hotel-lead{max-width:760px;margin:24px 0 0;font-size:clamp(22px,2.5vw,30px);line-height:1.45;color:#687386;word-break:keep-all}
      .pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);margin-top:52px;border-top:1px solid #cfd4dd;border-bottom:1px solid #cfd4dd}
      .pmx-tripline-item{min-height:170px;padding:32px 26px 30px 0;text-align:left;opacity:0;transform:translateY(18px);transition:opacity .46s ease-out,transform .46s ease-out}
      #hotel-benefit.pmx-visible .pmx-tripline-item{opacity:1;transform:none}
      #hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(1){transition-delay:.08s}
      #hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(2){transition-delay:.16s}
      #hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(3){transition-delay:.24s}
      .pmx-tripline-item+.pmx-tripline-item{padding-left:30px;border-left:1px solid #cfd4dd}
      .pmx-tripline-item b{display:none}
      .pmx-tripline-item strong{display:block;font-size:clamp(30px,3.3vw,42px);font-weight:880;letter-spacing:-.045em}
      .pmx-tripline-item span{display:block;margin-top:12px;font-size:19px;line-height:1.4;color:#738094;font-weight:500}

      #join-faq,#ig8-rule,#ig8-final,#pmx-bottom-cta{display:none!important}

      @media(max-width:780px){
        .pmx-inner,.ad-inner,#plans .membership-section-head,#ig8-routes .ig8-inner{width:min(100% - 24px,680px)!important}
        .hero-nav-track a{padding:14px 12px!important}.hero-nav-track a strong{display:none!important}.hero-nav-track a span{font-size:15px!important}
        .ad-title,.pmx-big-title,#calculator .section-head h2,#plans .membership-section-head h2{font-size:clamp(38px,10.4vw,48px)!important;line-height:1.08!important}
        .ad-copy{font-size:21px}

        #trust-proof{padding:76px 0 72px}.pmx-trust-strip{grid-template-columns:1fr;margin-top:40px}.pmx-trust-item{padding:24px 0}.pmx-trust-item+.pmx-trust-item{padding-left:0;border-left:0;border-top:1px solid #d9dde5}.pmx-trust-item strong{font-size:52px}.pmx-trust-item span{font-size:21px}
        .pmx-cruise-visual{min-height:600px}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:46px}

        #quick-result{padding:76px 0}.pmx-price-line{grid-template-columns:1fr;gap:18px;margin-top:38px;padding:28px 0}.pmx-price-arrow{transform:rotate(90deg);font-size:28px;padding:0}.pmx-price-unit strong{font-size:64px}.pmx-save{font-size:30px}
        #subscribe-bridge{padding:72px 0}

        .ad-core{padding:76px 0}.ad-number-line{gap:16px;margin-top:36px;padding:28px 0;flex-wrap:wrap}.ad-number-line strong{font-size:clamp(58px,16vw,74px)}.ad-number-line b{font-size:26px}.ad-payment-line{grid-template-columns:1fr;gap:16px;margin-top:36px;padding:28px 0}.ad-payment-line b{transform:rotate(90deg);width:max-content}.ad-payment-line strong{font-size:56px}

        #ig8-routes{padding:72px 0!important}#ig8-routes .ig8-title{font-size:40px!important}#ig8-routes .ig8-route-grid{grid-template-columns:repeat(2,1fr)!important;margin-top:36px!important}#ig8-routes .ig8-route{min-height:140px!important;padding:22px 14px!important}#ig8-routes .ig8-route:nth-child(3){border-left:0!important;border-top:1px solid #d9dde5!important}#ig8-routes .ig8-route:nth-child(4){border-top:1px solid #d9dde5!important}

        #calculator{padding:76px 0!important}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator .section-head{text-align:left!important}#calculator .calculator-card{padding:20px 12px!important;border-radius:18px!important}#calculator.ig8-calculator .result-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}#calculator.ig8-calculator .result-box{min-height:118px!important;padding:18px 8px!important;border-radius:14px!important;text-align:center!important}#calculator.ig8-calculator .result-box span{font-size:16px!important}#calculator.ig8-calculator .result-box strong{font-size:clamp(28px,8.8vw,38px)!important;white-space:nowrap!important}#calculator.ig8-calculator .result-box.highlight{grid-column:1/-1!important;min-height:132px!important}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(44px,13vw,58px)!important}

        #price-match{padding:78px 0}#price-match .pmx-main{font-size:clamp(88px,25vw,120px)}#price-match .pmx-copy{font-size:21px}
        #plans{padding-top:76px!important;padding-bottom:76px!important}
        #signup-steps{padding:72px 0}.pmx-step-grid{grid-template-columns:1fr;margin-top:36px}.pmx-step{min-height:100px;padding:24px 0}.pmx-step+.pmx-step{padding-left:0;border-left:0;border-top:1px solid #d9dde5}.pmx-step strong{font-size:30px;margin-top:10px}
        #hotel-benefit{padding:76px 0}.pmx-tripline{grid-template-columns:1fr;margin-top:38px}.pmx-tripline-item{min-height:100px;padding:24px 0}.pmx-tripline-item+.pmx-tripline-item{padding-left:0;border-left:0;border-top:1px solid #cfd4dd}.pmx-tripline-item strong{font-size:31px}.pmx-tripline-item span{font-size:18px}
      }

      @media(prefers-reduced-motion:reduce){.pmx-enter,.ad-enter,.pmx-trust-item,.pmx-step,.pmx-tripline-item{opacity:1!important;transform:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function make(tag, id, html, cls) {
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (cls) el.className = cls;
    el.innerHTML = html;
    return el;
  }

  function animateCounts(root) {
    root.querySelectorAll('[data-pmx-count]').forEach((el) => {
      if (el.dataset.pmxCounted === '1') return;
      el.dataset.pmxCounted = '1';
      const target = Number(el.dataset.pmxCount || 0);
      const suffix = el.dataset.pmxSuffix || '';
      const start = performance.now();
      const duration = 760;
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('ko-KR') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function observe(nodes) {
    const list = nodes.filter(Boolean);
    if (!('IntersectionObserver' in window)) {
      list.forEach((node) => { node.classList.add('pmx-visible'); animateCounts(node); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('pmx-visible');
        animateCounts(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });
    list.forEach((node) => io.observe(node));
  }

  function cleanOldSections() {
    [
      'why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary',
      'ig8-problem-a','ig8-problem-b','ig8-promise','ig8-cruise','ig8-membership-spend',
      'ig8-total','ig8-saving','ig8-freedom','join-faq','ig8-rule','ig8-final','pmx-bottom-cta'
    ].forEach((id) => document.getElementById(id)?.remove());
    document.querySelectorAll('.ig8-line,.pmx-step-arrow').forEach((el) => el.remove());
  }

  function rebuildNav() {
    const nav = document.querySelector('.hero-nav-track');
    if (!nav) return;
    const set = [
      ['#quick-result','01','가격'],
      ['#calculator','02','직접 계산'],
      ['#price-match','03','최저가 보장'],
      ['#plans','04','멤버십'],
      ['#hotel-benefit','05','호텔 · 투어']
    ].map(([href, num, label]) => `<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML = set + set;
  }

  function buildTrust(review) {
    if (!review) return null;
    let trust = document.getElementById('trust-proof');
    if (!trust) trust = make('section', 'trust-proof', '', 'pmx-section');
    trust.innerHTML = `
      <div class="pmx-inner">
        <p class="pmx-brand pmx-enter">INGROUP · INCRUISES</p>
        <h2 class="pmx-big-title pmx-enter"><strong>10년 넘게 운영된</strong><br>글로벌 여행 멤버십</h2>
        <div class="pmx-trust-strip">
          <div class="pmx-trust-item"><strong data-pmx-count="10" data-pmx-suffix="년+">10년+</strong><span>2015년부터 운영</span></div>
          <div class="pmx-trust-item"><strong data-pmx-count="350" data-pmx-suffix="만+">350만+</strong><span>전 세계 이용자</span></div>
          <div class="pmx-trust-item"><strong>CLIA</strong><span>공식 회원</span><small>#00027506</small></div>
        </div>
      </div>`;
    review.insertAdjacentElement('afterend', trust);
    return trust;
  }

  function buildTravel(trust) {
    if (!trust) return null;
    let section = document.getElementById('travel-desire');
    if (!section) section = make('section', 'travel-desire', '', 'pmx-section');
    section.innerHTML = `
      <div class="pmx-cruise-visual">
        <img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=88&w=1800" alt="크루즈 선상 수영장과 바다 풍경" loading="lazy">
        <div class="pmx-cruise-copy">
          <p class="pmx-brand pmx-enter">7박 크루즈</p>
          <h2 class="pmx-big-title pmx-enter">한 번쯤 가보고 싶었던 크루즈,<br><strong>비싸게 갈 필요 없습니다</strong></h2>
        </div>
      </div>`;
    trust.insertAdjacentElement('afterend', section);
    return section;
  }

  function buildQuickResult(after) {
    if (!after) return null;
    let section = document.getElementById('quick-result');
    if (!section) section = make('section', 'quick-result', '', 'pmx-section');
    section.innerHTML = `
      <div class="pmx-inner">
        <h2 class="pmx-big-title pmx-enter">같은 <strong>$3,500 크루즈</strong><br>미리 준비하면 <strong>$2,650</strong></h2>
        <div class="pmx-price-line">
          <div class="pmx-price-unit before pmx-enter"><span>그대로 결제</span><strong>$3,500</strong></div>
          <div class="pmx-price-arrow pmx-enter">→</div>
          <div class="pmx-price-unit after pmx-enter"><span>미리 준비</span><strong>$2,650</strong></div>
        </div>
        <div class="pmx-save pmx-enter">차이 <strong>$850</strong></div>
      </div>`;
    after.insertAdjacentElement('afterend', section);
    return section;
  }

  function buildBridge(startSection) {
    if (!startSection) return null;
    let bridge = document.getElementById('subscribe-bridge');
    if (!bridge) bridge = make('section', 'subscribe-bridge', '', 'pmx-section');
    bridge.innerHTML = `
      <div class="ad-inner">
        <h2 class="ad-title ad-enter">크루즈,<br><strong>구독해서 더 저렴하게 가세요</strong></h2>
        <p class="ad-copy ad-enter">여행 전에 조금씩 준비하고, 쌓인 포인트를 예약할 때 사용합니다.</p>
      </div>`;
    startSection.insertAdjacentElement('beforebegin', bridge);
    return bridge;
  }

  function rebuildCore() {
    const start = document.getElementById('ig8-start');
    const monthly = document.getElementById('ig8-monthly');
    const seven = document.getElementById('ig8-seven');
    const payment = document.getElementById('ig8-payment');

    if (start) {
      start.className = 'ad-core';
      start.innerHTML = `<div class="ad-inner"><p class="ad-label">첫 가입</p><h2 class="ad-title">클래식 시작 비용 <strong>$200</strong></h2><div class="ad-number-line"><strong>$200</strong><b>→</b><strong class="accent">350P</strong></div><p class="ad-copy">가입하는 순간 350P가 적립됩니다.</p></div>`;
    }
    if (monthly) {
      monthly.className = 'ad-core alt';
      monthly.innerHTML = `<div class="ad-inner"><p class="ad-label">구독</p><h2 class="ad-title"><strong>$100</strong> 결제하면<br><strong>200P</strong> 적립</h2><div class="ad-number-line"><strong>$100</strong><b>→</b><strong class="accent">200P</strong></div></div>`;
    }
    if (seven) {
      seven.className = 'ad-core dark';
      seven.innerHTML = `<div class="ad-inner"><p class="ad-label">7개월 준비</p><h2 class="ad-title">쌓이는 포인트<br><strong>1,750P</strong></h2><p class="ad-copy">첫 가입 350P + 7개월 적립 1,400P</p></div>`;
    }
    if (payment) {
      payment.className = 'ad-core';
      payment.innerHTML = `<div class="ad-inner"><p class="ad-label">크루즈 예약</p><h2 class="ad-title"><strong>$3,500</strong> 크루즈라면</h2><div class="ad-payment-line"><div><span>포인트 사용</span><strong>1,750P</strong></div><b>+</b><div><span>카드 결제</span><strong>$1,750</strong></div></div></div>`;
    }
    return { start, monthly, seven, payment };
  }

  function reorderCore(result, core, bridge) {
    if (!result) return null;
    const routes = document.getElementById('ig8-routes');
    const calc = document.getElementById('calculator');
    let cursor = result;
    [bridge, core.start, core.monthly, core.seven, core.payment, routes, calc].forEach((el) => {
      if (!el || !cursor) return;
      cursor.insertAdjacentElement('afterend', el);
      cursor = el;
    });
    return { routes, calc };
  }

  function addCalculatorCta(calc) {
    if (!calc) return;
    calc.querySelector('.pmx-calc-cta')?.remove();
    const card = calc.querySelector('.calculator-card');
    if (!card) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pmx-calc-cta';
    btn.textContent = '멤버십 플랜 보기';
    btn.addEventListener('click', () => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    card.appendChild(btn);
  }

  function rebuildPriceMatch(calc) {
    const pm = document.getElementById('price-match');
    if (!pm) return null;
    pm.className = 'pmx-section';
    pm.innerHTML = `
      <div class="pmx-inner">
        <h2 class="pmx-big-title pmx-enter"><strong>최저가 보장</strong><br>다른 곳이 더 싸면 맞춰드립니다</h2>
        <div class="pmx-main pmx-enter">$100+</div>
        <p class="pmx-copy pmx-enter">동일 크루즈 · 일정 · 객실 기준 <strong>$100 이상 차이</strong>가 나면<br>조건 확인 후 <strong>가격을 조정합니다.</strong></p>
      </div>`;
    calc?.insertAdjacentElement('afterend', pm);
    return pm;
  }

  function buildSteps(plans) {
    if (!plans) return null;
    let steps = document.getElementById('signup-steps');
    if (!steps) steps = make('section', 'signup-steps', '', 'pmx-section');
    steps.innerHTML = `
      <div class="pmx-inner">
        <h2 class="pmx-big-title pmx-enter">시작은 <strong>간단하게</strong></h2>
        <div class="pmx-step-grid">
          <div class="pmx-step"><b>01</b><strong>플랜 선택</strong></div>
          <div class="pmx-step"><b>02</b><strong>멤버십 가입</strong></div>
          <div class="pmx-step"><b>03</b><strong>포인트 적립</strong></div>
        </div>
      </div>`;
    plans.insertAdjacentElement('afterend', steps);
    return steps;
  }

  function rebuildHotel(after) {
    const hotel = document.getElementById('hotel-benefit');
    if (!hotel) return null;
    hotel.className = 'pmx-section';
    hotel.innerHTML = `
      <div class="pmx-inner">
        <h2 class="pmx-big-title pmx-enter">크루즈뿐 아니라<br><strong>호텔과 투어까지</strong></h2>
        <p class="pmx-hotel-lead pmx-enter">출발 전후 일정도 함께 준비할 수 있습니다.</p>
        <div class="pmx-tripline">
          <div class="pmx-tripline-item"><strong>전세계 호텔</strong><span>출발 전후 숙박</span></div>
          <div class="pmx-tripline-item"><strong>현지 투어</strong><span>기항지 일정</span></div>
          <div class="pmx-tripline-item"><strong>출발 전후 1박</strong><span>여유 있는 여행</span></div>
        </div>
      </div>`;
    after?.insertAdjacentElement('afterend', hotel);
    return hotel;
  }

  function patchPlans() {
    const cards = [...document.querySelectorAll('#plans .plan-card')];
    cards.forEach((card, index) => {
      card.querySelector('.plan-fit')?.remove();
      const name = card.querySelector('.plan-name')?.textContent?.trim() || '';
      const fit = document.createElement('p');
      fit.className = 'plan-fit';
      fit.textContent = /프리미엄/.test(name) || index === 1
        ? '더 빠르게 포인트를 모으고 싶은 분'
        : '1~2년에 한 번 크루즈를 계획하는 분';
      const main = card.querySelector('.plan-main-line');
      const mobile = card.querySelector('.plan-mobile-summary');
      if (main) main.insertAdjacentElement('afterend', fit);
      else if (mobile) mobile.insertAdjacentElement('afterend', fit);
      else card.prepend(fit);
    });
  }

  function watchPlans() {
    const wrap = document.getElementById('planCards');
    if (!wrap) return;
    let scheduled = false;
    const run = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; patchPlans(); });
    };
    new MutationObserver(run).observe(wrap, { childList: true, subtree: true });
    setTimeout(run, 0);
    setTimeout(run, 600);
    setTimeout(run, 1600);
  }

  function init() {
    addStyles();
    cleanOldSections();
    rebuildNav();

    const review = document.querySelector('.review-flow-section');
    const trust = buildTrust(review);
    const travel = buildTravel(trust);
    const result = buildQuickResult(travel);
    const core = rebuildCore();
    const bridge = buildBridge(core.start);
    const moved = reorderCore(result, core, bridge);
    addCalculatorCta(moved?.calc);
    const pm = rebuildPriceMatch(moved?.calc);

    const plans = document.getElementById('plans');
    if (plans && pm) pm.insertAdjacentElement('afterend', plans);
    const steps = buildSteps(plans);
    const hotel = rebuildHotel(steps);

    document.getElementById('join-faq')?.remove();
    document.getElementById('pmx-bottom-cta')?.remove();
    document.getElementById('ig8-final')?.remove();
    document.querySelectorAll('.pmx-section svg,#hotel-benefit svg,footer svg').forEach((svg) => svg.remove());

    watchPlans();
    observe([trust, travel, result, bridge, pm, steps, hotel]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0), { once: true });
  } else {
    setTimeout(init, 0);
  }
})();

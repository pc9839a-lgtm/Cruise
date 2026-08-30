(() => {
  'use strict';

  const STYLE_ID = 'membership-polish-v10-style';

  function addStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .pmx-section,.pmx-section *,
      .ad-core,.ad-core *,
      #calculator,#calculator *,
      #plans,#plans *,
      #ig8-routes,#ig8-routes *{
        box-sizing:border-box;
        font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      }

      .pmx-section,.ad-core{position:relative;overflow:hidden;transition:none!important}
      .pmx-inner,.ad-inner{width:min(1060px,calc(100% - 40px));margin:0 auto;text-align:center}

      .hero-nav-track{gap:0!important;background:#fff!important;border-bottom:1px solid #e6e9ef!important}
      .hero-nav-track a{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:16px 18px!important;color:#697386!important}
      .hero-nav-track a strong{font-size:13px!important;color:#a0a7b2!important;margin-right:6px!important}
      .hero-nav-track a span{font-size:16px!important;font-weight:720!important;letter-spacing:-.03em!important}
      .hero-nav-track a:hover,.hero-nav-track a.active{background:transparent!important;color:#111827!important}

      .pmx-brand,.ad-label{margin:0 0 16px;text-align:center;font-size:17px;line-height:1.2;font-weight:800;letter-spacing:.075em;color:#245fc4}
      .pmx-title,.ad-title,#calculator .section-head h2,#plans .membership-section-head h2{
        max-width:940px;margin:0 auto!important;text-align:center!important;
        font-size:clamp(44px,5.8vw,74px)!important;line-height:1.06!important;
        letter-spacing:-.055em!important;font-weight:760!important;word-break:keep-all;text-wrap:balance
      }
      .pmx-title strong,.ad-title strong{font-weight:920!important}

      .pmx-enter,.ad-enter{opacity:0;transform:translateY(20px);transition:opacity .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1)}
      .pmx-visible .pmx-enter,.pmx-visible .ad-enter{opacity:1;transform:none}

      #trust-proof{padding:96px 0;background:#fff;color:#111827}
      .pmx-trust-strip{display:grid;grid-template-columns:repeat(3,1fr);margin-top:48px;border-top:1px solid #d9dee7;border-bottom:1px solid #d9dee7}
      .pmx-trust-item{padding:30px 22px;opacity:0;transform:translateY(20px);transition:opacity .5s ease-out,transform .5s ease-out;text-align:center}
      #trust-proof.pmx-visible .pmx-trust-item{opacity:1;transform:none}
      #trust-proof.pmx-visible .pmx-trust-item:nth-child(1){transition-delay:.10s}
      #trust-proof.pmx-visible .pmx-trust-item:nth-child(2){transition-delay:.20s}
      #trust-proof.pmx-visible .pmx-trust-item:nth-child(3){transition-delay:.30s}
      .pmx-trust-item+.pmx-trust-item{border-left:1px solid #d9dee7}
      .pmx-trust-item strong{display:block;font-size:clamp(48px,6vw,72px);line-height:.94;font-weight:920;letter-spacing:-.06em}
      .pmx-trust-item span{display:block;margin-top:12px;font-size:21px;font-weight:720;letter-spacing:-.03em;color:#344055}
      .pmx-trust-item small{display:block;margin-top:5px;font-size:16px;color:#8a94a4;font-weight:500}

      #travel-desire{padding:0;background:#0b1730;color:#fff}
      .pmx-cruise-visual{position:relative;min-height:clamp(560px,64vw,760px);display:flex;align-items:flex-end;overflow:hidden}
      .pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block}
      .pmx-cruise-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,14,30,.02) 34%,rgba(6,14,30,.74) 100%)}
      .pmx-cruise-copy{position:relative;z-index:2;width:min(1060px,calc(100% - 40px));margin:0 auto;padding:0 0 62px;text-align:center}
      #travel-desire .pmx-brand{color:rgba(255,255,255,.78)}
      #travel-desire .pmx-title{color:#fff}

      #quick-result{padding:96px 0;background:#fff;color:#111827}
      .pmx-price-line{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:26px;margin-top:48px;padding:32px 0;border-top:1px solid #d9dee7;border-bottom:1px solid #d9dee7}
      .pmx-price-unit{text-align:center}
      .pmx-price-unit span{display:block;margin-bottom:11px;font-size:20px;font-weight:650;color:#7d8796}
      .pmx-price-unit strong{display:block;font-size:clamp(60px,7.8vw,96px);line-height:.88;letter-spacing:-.07em;font-weight:920}
      .pmx-price-unit.before strong{color:#818896;text-decoration:line-through;text-decoration-thickness:3px;text-decoration-color:#b8bec8}
      .pmx-price-unit.after strong{color:#245fc4}
      .pmx-price-arrow{padding-bottom:8px;font-size:36px;color:#a1a9b6}
      .pmx-save{margin-top:26px;text-align:center;font-size:clamp(28px,3.4vw,42px);font-weight:780;letter-spacing:-.04em}
      .pmx-save strong{color:#245fc4;font-weight:920}

      #subscribe-bridge{padding:88px 0;background:#1f4f96;color:#fff}
      #subscribe-bridge .ad-title{color:#fff}

      .ad-core{padding:90px 0;background:#fff;color:#111827}
      .ad-core.alt{background:#f5f6f8}
      .ad-core.dark{background:#0b1730;color:#fff}
      .ad-core.dark .ad-label{color:#9ebcf0}
      .ad-number-line{display:flex;align-items:center;justify-content:center;gap:24px;margin-top:44px;padding:30px 0;border-top:1px solid rgba(124,135,151,.28);border-bottom:1px solid rgba(124,135,151,.28)}
      .ad-number-line strong{font-size:clamp(62px,8.5vw,104px);line-height:.88;letter-spacing:-.07em;font-weight:920}
      .ad-number-line b{font-size:32px;color:#929ba8}
      .ad-number-line .accent{color:#245fc4}
      .ad-core.dark .ad-number-line .accent{color:#bdd1ff}
      .ad-payment-line{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:24px;margin-top:44px;padding:30px 0;border-top:1px solid rgba(124,135,151,.28);border-bottom:1px solid rgba(124,135,151,.28)}
      .ad-payment-line>div{text-align:center}
      .ad-payment-line span{display:block;margin-bottom:10px;font-size:19px;color:#7d8796;font-weight:650}
      .ad-payment-line strong{display:block;font-size:clamp(50px,6.4vw,82px);line-height:.9;letter-spacing:-.065em;font-weight:920}
      .ad-payment-line b{padding-bottom:8px;font-size:30px;color:#929ba8}
      .ad-core.dark .ad-payment-line span{color:rgba(255,255,255,.58)}

      #ig8-routes{padding:88px 0!important;background:#fff!important;color:#111827!important}
      #ig8-routes .ig8-inner{width:min(1060px,calc(100% - 40px))!important;margin:0 auto!important;text-align:center!important}
      #ig8-routes .ig8-kicker,#ig8-routes .ig8-sub{display:none!important}
      #ig8-routes .ig8-title{max-width:900px!important;margin:0 auto!important;text-align:center!important;font-size:clamp(42px,5.4vw,68px)!important;line-height:1.06!important;font-weight:800!important;letter-spacing:-.055em!important}
      #ig8-routes .ig8-route-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:0!important;margin-top:44px!important;border-top:1px solid #d9dee7!important;border-bottom:1px solid #d9dee7!important}
      #ig8-routes .ig8-route{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;animation:none!important;padding:26px 18px!important;min-height:150px!important;text-align:center!important}
      #ig8-routes .ig8-route+.ig8-route{border-left:1px solid #d9dee7!important}

      #calculator{padding:88px 0!important;background:#f5f6f8!important}
      #calculator .section-head{width:min(960px,100%)!important;margin:0 auto 34px!important;text-align:center!important}
      #calculator .section-head h2{text-align:center!important}
      #calculator .calculator-card{background:#fff!important;border:1px solid #e1e5eb!important;border-radius:22px!important;box-shadow:none!important}
      #calculator .result-box{box-shadow:none!important;border:0!important;background:#f3f5f8!important;text-align:center!important}
      #calculator .result-box.highlight{background:#111827!important;color:#fff!important}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:100%;min-height:64px;margin:18px auto 0;border:0;border-radius:14px;background:#245fc4;color:#fff;font-size:22px;font-weight:800;cursor:pointer}

      #price-match{padding:96px 0;background:#0b1730;color:#fff;text-align:center}
      #price-match .pmx-title{color:#fff}
      #price-match .pmx-main{margin:38px 0 0;font-size:clamp(90px,12vw,150px);line-height:.84;font-weight:920;letter-spacing:-.08em;color:#c5d8ff}
      #price-match .pmx-short{margin:24px auto 0;font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:650;color:rgba(255,255,255,.84);word-break:keep-all}
      #price-match .pmx-short strong{color:#fff;font-weight:900}

      #plans{padding-top:88px!important;padding-bottom:88px!important}
      #plans .membership-section-head{width:min(1060px,calc(100% - 40px))!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important}
      #plans .membership-section-head h2{text-align:center!important}
      #plans .membership-section-head .section-kicker{display:none!important}
      #plans .plan-card{box-shadow:none!important}
      #plans .plan-fit{font-size:18px!important;line-height:1.4!important;font-weight:620!important;letter-spacing:-.025em!important;word-break:keep-all}
      #plans .recommended .plan-fit{color:rgba(255,255,255,.82)}
      #plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      #signup-steps{padding:82px 0;background:#fff;color:#111827}
      .pmx-step-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:42px;border-top:1px solid #d9dee7;border-bottom:1px solid #d9dee7}
      .pmx-step{min-height:140px;padding:28px 20px;text-align:center;opacity:0;transform:translateY(20px);transition:opacity .5s ease-out,transform .5s ease-out}
      .pmx-step+.pmx-step{border-left:1px solid #d9dee7}
      #signup-steps.pmx-visible .pmx-step{opacity:1;transform:none}
      #signup-steps.pmx-visible .pmx-step:nth-child(1){transition-delay:.08s}
      #signup-steps.pmx-visible .pmx-step:nth-child(2){transition-delay:.18s}
      #signup-steps.pmx-visible .pmx-step:nth-child(3){transition-delay:.28s}
      .pmx-step b{display:block;font-size:16px;color:#245fc4;font-weight:850}
      .pmx-step strong{display:block;margin-top:13px;font-size:clamp(28px,3vw,38px);font-weight:850;letter-spacing:-.045em}

      #hotel-benefit{padding:88px 0;background:#f5f6f8;color:#111827;text-align:center}
      .pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);margin-top:42px;border-top:1px solid #cfd5de;border-bottom:1px solid #cfd5de}
      .pmx-tripline-item{min-height:132px;display:flex;align-items:center;justify-content:center;padding:26px 18px;text-align:center;opacity:0;transform:translateY(20px);transition:opacity .5s ease-out,transform .5s ease-out}
      #hotel-benefit.pmx-visible .pmx-tripline-item{opacity:1;transform:none}
      #hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(1){transition-delay:.08s}
      #hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(2){transition-delay:.18s}
      #hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(3){transition-delay:.28s}
      .pmx-tripline-item+.pmx-tripline-item{border-left:1px solid #cfd5de}
      .pmx-tripline-item strong{font-size:clamp(28px,3vw,38px);font-weight:880;letter-spacing:-.045em}

      #join-faq,#ig8-rule,#ig8-final,#pmx-bottom-cta{display:none!important}

      @media(max-width:780px){
        .pmx-inner,.ad-inner,#plans .membership-section-head,#ig8-routes .ig8-inner{width:min(100% - 24px,680px)!important}
        .hero-nav-track a{padding:14px 11px!important}.hero-nav-track a strong{display:none!important}.hero-nav-track a span{font-size:14px!important}
        .pmx-title,.ad-title,#calculator .section-head h2,#plans .membership-section-head h2{font-size:clamp(36px,9.8vw,44px)!important;line-height:1.1!important}

        #trust-proof{padding:72px 0}.pmx-trust-strip{grid-template-columns:1fr;margin-top:34px}.pmx-trust-item{padding:22px 0}.pmx-trust-item+.pmx-trust-item{border-left:0;border-top:1px solid #d9dee7}.pmx-trust-item strong{font-size:50px}.pmx-trust-item span{font-size:20px}
        .pmx-cruise-visual{min-height:560px}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:44px}.pmx-cruise-visual img{object-position:center}
        #quick-result{padding:72px 0}.pmx-price-line{grid-template-columns:1fr;gap:15px;margin-top:34px;padding:26px 0}.pmx-price-arrow{transform:rotate(90deg);font-size:28px;padding:0}.pmx-price-unit strong{font-size:60px}.pmx-save{font-size:29px}
        #subscribe-bridge{padding:68px 0}
        .ad-core{padding:70px 0}.ad-number-line{gap:14px;margin-top:32px;padding:26px 0;flex-wrap:wrap}.ad-number-line strong{font-size:clamp(54px,15vw,70px)}.ad-number-line b{font-size:25px}.ad-payment-line{grid-template-columns:1fr;gap:14px;margin-top:32px;padding:26px 0}.ad-payment-line b{transform:rotate(90deg);width:max-content;margin:0 auto}.ad-payment-line strong{font-size:52px}
        #ig8-routes{padding:70px 0!important}#ig8-routes .ig8-title{font-size:38px!important}#ig8-routes .ig8-route-grid{grid-template-columns:repeat(2,1fr)!important;margin-top:34px!important}#ig8-routes .ig8-route{min-height:130px!important;padding:20px 10px!important}#ig8-routes .ig8-route:nth-child(3){border-left:0!important;border-top:1px solid #d9dee7!important}#ig8-routes .ig8-route:nth-child(4){border-top:1px solid #d9dee7!important}
        #calculator{padding:70px 0!important}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator .section-head{text-align:center!important}#calculator .calculator-card{padding:20px 12px!important;border-radius:18px!important}#calculator.ig8-calculator .result-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}#calculator.ig8-calculator .result-box{min-height:118px!important;padding:18px 8px!important;border-radius:14px!important}#calculator.ig8-calculator .result-box span{font-size:16px!important}#calculator.ig8-calculator .result-box strong{font-size:clamp(28px,8.8vw,38px)!important;white-space:nowrap!important}#calculator.ig8-calculator .result-box.highlight{grid-column:1/-1!important;min-height:132px!important}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(44px,13vw,58px)!important}
        #price-match{padding:72px 0}#price-match .pmx-main{font-size:clamp(82px,23vw,110px)}#price-match .pmx-short{font-size:21px}
        #plans{padding-top:70px!important;padding-bottom:70px!important}
        #signup-steps{padding:68px 0}.pmx-step-grid{grid-template-columns:1fr;margin-top:32px}.pmx-step{min-height:92px;padding:22px 0}.pmx-step+.pmx-step{border-left:0;border-top:1px solid #d9dee7}.pmx-step strong{font-size:29px;margin-top:8px}
        #hotel-benefit{padding:68px 0}.pmx-tripline{grid-template-columns:1fr;margin-top:32px}.pmx-tripline-item{min-height:90px;padding:22px 0}.pmx-tripline-item+.pmx-tripline-item{border-left:0;border-top:1px solid #cfd5de}.pmx-tripline-item strong{font-size:29px}
      }

      @media(prefers-reduced-motion:reduce){.pmx-enter,.ad-enter,.pmx-trust-item,.pmx-step,.pmx-tripline-item{opacity:1!important;transform:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function make(tag,id,html,cls){
    const el=document.createElement(tag);
    if(id)el.id=id;
    if(cls)el.className=cls;
    el.innerHTML=html;
    return el;
  }

  function animateCounts(root){
    root?.querySelectorAll('[data-pmx-count]').forEach((el)=>{
      if(el.dataset.pmxCounted==='1')return;
      el.dataset.pmxCounted='1';
      const target=Number(el.dataset.pmxCount||0);
      const suffix=el.dataset.pmxSuffix||'';
      const start=performance.now();
      const duration=760;
      function tick(now){
        const p=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*eased).toLocaleString('ko-KR')+suffix;
        if(p<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function observe(nodes){
    const list=nodes.filter(Boolean);
    if(!('IntersectionObserver'in window)){
      list.forEach((node)=>{node.classList.add('pmx-visible');animateCounts(node)});
      return;
    }
    const io=new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('pmx-visible');
        animateCounts(entry.target);
        io.unobserve(entry.target);
      });
    },{threshold:.16,rootMargin:'0px 0px -5% 0px'});
    list.forEach((node)=>io.observe(node));
  }

  function cleanOldSections(){
    [
      'why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary',
      'ig8-problem-a','ig8-problem-b','ig8-promise','ig8-cruise','ig8-membership-spend',
      'ig8-total','ig8-saving','ig8-freedom','join-faq','ig8-rule','ig8-final','pmx-bottom-cta'
    ].forEach((id)=>document.getElementById(id)?.remove());
    document.querySelectorAll('.ig8-line,.pmx-step-arrow').forEach((el)=>el.remove());
  }

  function rebuildNav(){
    const nav=document.querySelector('.hero-nav-track');
    if(!nav)return;
    const items=[
      ['#quick-result','01','가격'],['#calculator','02','직접 계산'],['#price-match','03','최저가 보장'],['#plans','04','멤버십'],['#hotel-benefit','05','호텔 · 투어']
    ];
    const html=items.map(([href,num,label])=>`<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML=html+html;
  }

  function buildTrust(review){
    if(!review)return null;
    let section=document.getElementById('trust-proof');
    if(!section)section=make('section','trust-proof','','pmx-section');
    section.innerHTML=`
      <div class="pmx-inner">
        <p class="pmx-brand pmx-enter">INGROUP · INCRUISES</p>
        <h2 class="pmx-title pmx-enter"><strong>10년 넘게 운영된</strong><br>글로벌 여행 멤버십</h2>
        <div class="pmx-trust-strip">
          <div class="pmx-trust-item"><strong data-pmx-count="10" data-pmx-suffix="년+">10년+</strong><span>2015년부터 운영</span></div>
          <div class="pmx-trust-item"><strong data-pmx-count="350" data-pmx-suffix="만+">350만+</strong><span>전 세계 이용자</span></div>
          <div class="pmx-trust-item"><strong>CLIA</strong><span>공식 회원</span><small>#00027506</small></div>
        </div>
      </div>`;
    review.insertAdjacentElement('afterend',section);
    return section;
  }

  function buildTravel(trust){
    if(!trust)return null;
    let section=document.getElementById('travel-desire');
    if(!section)section=make('section','travel-desire','','pmx-section');
    section.innerHTML=`
      <div class="pmx-cruise-visual">
        <img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=88&w=1800" alt="크루즈 선상 풍경" loading="lazy">
        <div class="pmx-cruise-copy">
          <p class="pmx-brand pmx-enter">7박 크루즈</p>
          <h2 class="pmx-title pmx-enter">크루즈,<br><strong>비싸게 가지 마세요</strong></h2>
        </div>
      </div>`;
    trust.insertAdjacentElement('afterend',section);
    return section;
  }

  function buildQuickResult(after){
    if(!after)return null;
    let section=document.getElementById('quick-result');
    if(!section)section=make('section','quick-result','','pmx-section');
    section.innerHTML=`
      <div class="pmx-inner">
        <h2 class="pmx-title pmx-enter"><strong>$3,500</strong> 크루즈<br><strong>$2,650</strong>으로</h2>
        <div class="pmx-price-line">
          <div class="pmx-price-unit before pmx-enter"><span>일반 결제</span><strong>$3,500</strong></div>
          <div class="pmx-price-arrow pmx-enter">→</div>
          <div class="pmx-price-unit after pmx-enter"><span>멤버십 활용</span><strong>$2,650</strong></div>
        </div>
        <div class="pmx-save pmx-enter"><strong>$850</strong> 차이</div>
      </div>`;
    after.insertAdjacentElement('afterend',section);
    return section;
  }

  function rebuildCore(){
    const start=document.getElementById('ig8-start');
    const monthly=document.getElementById('ig8-monthly');
    const seven=document.getElementById('ig8-seven');
    const payment=document.getElementById('ig8-payment');

    if(start){
      start.className='ad-core';
      start.innerHTML=`<div class="ad-inner"><p class="ad-label">첫 가입</p><h2 class="ad-title">클래식 시작 비용 <strong>$200</strong></h2><div class="ad-number-line"><strong>$200</strong><b>→</b><strong class="accent">350P</strong></div></div>`;
    }
    if(monthly){
      monthly.className='ad-core alt';
      monthly.innerHTML=`<div class="ad-inner"><p class="ad-label">구독</p><h2 class="ad-title"><strong>$100</strong> → <strong>200P</strong></h2><div class="ad-number-line"><strong>$100</strong><b>→</b><strong class="accent">200P</strong></div></div>`;
    }
    if(seven){
      seven.className='ad-core dark';
      seven.innerHTML=`<div class="ad-inner"><p class="ad-label">7개월</p><h2 class="ad-title">적립 포인트<br><strong>1,750P</strong></h2></div>`;
    }
    if(payment){
      payment.className='ad-core';
      payment.innerHTML=`<div class="ad-inner"><p class="ad-label">$3,500 크루즈</p><h2 class="ad-title"><strong>1,750P</strong> 사용</h2><div class="ad-payment-line"><div><span>포인트</span><strong>1,750P</strong></div><b>+</b><div><span>카드</span><strong>$1,750</strong></div></div></div>`;
    }
    return{start,monthly,seven,payment};
  }

  function buildBridge(start){
    if(!start)return null;
    let section=document.getElementById('subscribe-bridge');
    if(!section)section=make('section','subscribe-bridge','','pmx-section');
    section.innerHTML=`<div class="ad-inner"><h2 class="ad-title ad-enter">크루즈는<br><strong>구독해서 저렴하게 가세요</strong></h2></div>`;
    start.insertAdjacentElement('beforebegin',section);
    return section;
  }

  function reorderCore(result,bridge,core){
    if(!result)return{};
    const routes=document.getElementById('ig8-routes');
    const calc=document.getElementById('calculator');
    let cursor=result;
    [bridge,core.start,core.monthly,core.seven,core.payment,routes,calc].forEach((el)=>{
      if(!el)return;
      cursor.insertAdjacentElement('afterend',el);
      cursor=el;
    });
    return{routes,calc};
  }

  function addCalculatorCta(calc){
    if(!calc)return;
    calc.querySelector('.pmx-calc-cta')?.remove();
    const card=calc.querySelector('.calculator-card');
    if(!card)return;
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='pmx-calc-cta';
    btn.textContent='멤버십 플랜 보기';
    btn.addEventListener('click',()=>document.getElementById('plans')?.scrollIntoView({behavior:'smooth',block:'start'}));
    card.appendChild(btn);
  }

  function rebuildPriceMatch(calc){
    const pm=document.getElementById('price-match');
    if(!pm)return null;
    pm.className='pmx-section';
    pm.innerHTML=`
      <div class="pmx-inner">
        <p class="pmx-brand pmx-enter">다른 곳이 더 싸면?</p>
        <h2 class="pmx-title pmx-enter"><strong>최저가 보장</strong></h2>
        <div class="pmx-main pmx-enter">$100+</div>
        <p class="pmx-short pmx-enter"><strong>$100 이상 차이</strong>면 가격 조정</p>
      </div>`;
    calc?.insertAdjacentElement('afterend',pm);
    return pm;
  }

  function patchPlans(){
    [...document.querySelectorAll('#plans .plan-card')].forEach((card,index)=>{
      card.querySelector('.plan-fit')?.remove();
      const name=card.querySelector('.plan-name')?.textContent?.trim()||'';
      const fit=document.createElement('p');
      fit.className='plan-fit';
      fit.textContent=/프리미엄/.test(name)||index===1?'포인트를 더 빠르게 모으는 플랜':'1~2년에 한 번 크루즈를 계획하는 플랜';
      const main=card.querySelector('.plan-main-line');
      const mobile=card.querySelector('.plan-mobile-summary');
      if(main)main.insertAdjacentElement('afterend',fit);
      else if(mobile)mobile.insertAdjacentElement('afterend',fit);
      else card.prepend(fit);
    });
  }

  function watchPlans(){
    const wrap=document.getElementById('planCards');
    if(!wrap)return;
    let scheduled=false;
    const run=()=>{
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(()=>{scheduled=false;patchPlans()});
    };
    new MutationObserver(run).observe(wrap,{childList:true,subtree:true});
    setTimeout(run,0);setTimeout(run,600);setTimeout(run,1600);
  }

  function buildSteps(plans){
    if(!plans)return null;
    let section=document.getElementById('signup-steps');
    if(!section)section=make('section','signup-steps','','pmx-section');
    section.innerHTML=`
      <div class="pmx-inner">
        <h2 class="pmx-title pmx-enter">가입은 <strong>3단계</strong></h2>
        <div class="pmx-step-grid">
          <div class="pmx-step"><b>01</b><strong>플랜 선택</strong></div>
          <div class="pmx-step"><b>02</b><strong>멤버십 가입</strong></div>
          <div class="pmx-step"><b>03</b><strong>포인트 적립</strong></div>
        </div>
      </div>`;
    plans.insertAdjacentElement('afterend',section);
    return section;
  }

  function rebuildHotel(after){
    const hotel=document.getElementById('hotel-benefit');
    if(!hotel)return null;
    hotel.className='pmx-section';
    hotel.innerHTML=`
      <div class="pmx-inner">
        <p class="pmx-brand pmx-enter">호텔 · 투어</p>
        <h2 class="pmx-title pmx-enter"><strong>크루즈 전후 숙박부터</strong><br>현지 투어까지</h2>
        <div class="pmx-tripline">
          <div class="pmx-tripline-item"><strong>전세계 호텔</strong></div>
          <div class="pmx-tripline-item"><strong>현지 투어</strong></div>
          <div class="pmx-tripline-item"><strong>출발 전후 숙박</strong></div>
        </div>
      </div>`;
    after?.insertAdjacentElement('afterend',hotel);
    return hotel;
  }

  function init(){
    addStyles();
    cleanOldSections();
    rebuildNav();

    const review=document.querySelector('.review-flow-section');
    const trust=buildTrust(review);
    const travel=buildTravel(trust);
    const result=buildQuickResult(travel);
    const core=rebuildCore();
    const bridge=buildBridge(core.start);
    const moved=reorderCore(result,bridge,core);
    addCalculatorCta(moved.calc);
    const pm=rebuildPriceMatch(moved.calc);

    const plans=document.getElementById('plans');
    if(plans&&pm)pm.insertAdjacentElement('afterend',plans);
    const steps=buildSteps(plans);
    const hotel=rebuildHotel(steps);

    ['join-faq','ig8-rule','ig8-final','pmx-bottom-cta'].forEach((id)=>document.getElementById(id)?.remove());
    document.querySelectorAll('.pmx-section svg,#hotel-benefit svg,footer svg').forEach((svg)=>svg.remove());

    patchPlans();
    watchPlans();
    observe([trust,travel,result,bridge,core.start,core.monthly,core.seven,core.payment,pm,steps,hotel]);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});
  else setTimeout(init,0);
})();

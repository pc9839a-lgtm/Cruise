(() => {
  'use strict';

  const STYLE_ID = 'membership-conversion-final-style';

  function addStyles() {
    document.getElementById('membership-final-style')?.remove();
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .pmx-section,.pmx-section *,#calculator,#calculator *,#plans,#plans *{box-sizing:border-box;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
      .pmx-section{position:relative;overflow:hidden}
      .pmx-inner{width:min(1040px,calc(100% - 40px));margin:0 auto;text-align:center}
      .pmx-label{display:block;margin:0 0 18px;color:#2b5da8;font-size:clamp(18px,1.8vw,21px);font-weight:850;letter-spacing:-.025em}
      .pmx-title{max-width:940px;margin:0 auto;font-size:clamp(42px,5.5vw,72px);line-height:1.08;letter-spacing:-.055em;font-weight:620;word-break:keep-all;text-wrap:balance}
      .pmx-title strong{font-weight:920}
      .pmx-enter{opacity:0;transform:translateY(18px);transition:opacity .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1)}
      .pmx-visible .pmx-enter{opacity:1;transform:none}
      .pmx-visible .pmx-enter:nth-child(2){transition-delay:.05s}.pmx-visible .pmx-enter:nth-child(3){transition-delay:.1s}.pmx-visible .pmx-enter:nth-child(4){transition-delay:.15s}

      /* travel desire */
      #travel-desire{padding:0;background:#0c1730;color:#fff}
      .pmx-cruise-visual{position:relative;min-height:clamp(520px,64vw,760px);display:flex;align-items:flex-end;overflow:hidden}
      .pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block}
      .pmx-cruise-visual::after{content:'';position:absolute;inset:0;background:rgba(5,14,30,.48)}
      .pmx-cruise-copy{position:relative;z-index:2;width:min(1040px,calc(100% - 40px));margin:0 auto;padding:0 0 72px;text-align:left}
      #travel-desire .pmx-label{color:#fff}
      #travel-desire .pmx-title{max-width:860px;margin:0;color:#fff;text-align:left}

      /* beginner explanation 1 */
      #subscribe-start{padding:96px 0;background:#fff;color:#10182b}
      .pmx-simple-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;max-width:900px;margin:46px auto 0}
      .pmx-simple-box{padding:32px 24px;border-top:1px solid #dbe2eb;border-bottom:1px solid #dbe2eb}
      .pmx-simple-box span{display:block;color:#64728b;font-size:clamp(21px,2.3vw,26px);font-weight:650}
      .pmx-simple-box strong{display:block;margin-top:12px;font-size:clamp(54px,7vw,82px);line-height:.92;font-weight:920;letter-spacing:-.06em;white-space:nowrap}
      .pmx-simple-arrow{font-size:42px;color:#7890b8;font-weight:650}
      .pmx-start-monthly{max-width:900px;margin:28px auto 0;padding:26px 0;border-bottom:1px solid #dbe2eb;font-size:clamp(24px,2.8vw,32px);font-weight:700;word-break:keep-all}
      .pmx-start-monthly strong{color:#245fc4;font-weight:920}

      /* beginner explanation 2 */
      #subscribe-seven{padding:96px 0;background:#0c1730;color:#fff}
      #subscribe-seven .pmx-label{color:#a9c3ee}
      #subscribe-seven .pmx-title{color:#fff}
      .pmx-ledger{max-width:860px;margin:44px auto 0;text-align:left}
      .pmx-ledger-row{display:grid;grid-template-columns:1fr auto;align-items:end;gap:24px;padding:24px 4px;border-top:1px solid rgba(255,255,255,.2)}
      .pmx-ledger-row:first-child{border-top:0}
      .pmx-ledger-row span{font-size:clamp(22px,2.5vw,29px);font-weight:620;color:rgba(255,255,255,.78)}
      .pmx-ledger-row strong{font-size:clamp(36px,4.4vw,52px);font-weight:900;letter-spacing:-.045em}
      .pmx-ledger-row.total{margin-top:8px;padding-top:30px;border-top:3px solid #6f9be5}
      .pmx-ledger-row.total span,.pmx-ledger-row.total strong{color:#fff;font-weight:920}
      .pmx-paid-box{max-width:860px;margin:30px auto 0;padding:26px 4px;border-top:1px solid rgba(255,255,255,.2);font-size:clamp(23px,2.7vw,31px);font-weight:700;text-align:left}
      .pmx-paid-box strong{float:right;font-size:clamp(34px,4vw,46px);font-weight:920}

      /* beginner explanation 3 */
      #subscribe-booking{padding:96px 0;background:#1f4f96;color:#fff}
      #subscribe-booking .pmx-label{color:#dce8ff}
      #subscribe-booking .pmx-title{color:#fff}
      .pmx-booking-equation{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;max-width:900px;margin:46px auto 0}
      .pmx-booking-part{padding:30px 20px;border-top:1px solid rgba(255,255,255,.25);border-bottom:1px solid rgba(255,255,255,.25)}
      .pmx-booking-part span{display:block;color:rgba(255,255,255,.78);font-size:clamp(21px,2.3vw,26px);font-weight:650}
      .pmx-booking-part strong{display:block;margin-top:12px;font-size:clamp(48px,6.3vw,72px);line-height:.92;font-weight:920;letter-spacing:-.06em;white-space:nowrap}
      .pmx-booking-plus{font-size:38px;color:#d7e5ff;font-weight:800}
      .pmx-total-outlay{max-width:900px;margin:34px auto 0;padding-top:30px;border-top:1px solid rgba(255,255,255,.25)}
      .pmx-total-outlay span{display:block;font-size:clamp(22px,2.5vw,29px);font-weight:650;color:rgba(255,255,255,.8)}
      .pmx-total-outlay strong{display:block;margin-top:12px;font-size:clamp(58px,7.5vw,88px);line-height:.92;font-weight:920;letter-spacing:-.065em}
      .pmx-save-line{margin:26px auto 0;font-size:clamp(27px,3.3vw,40px);font-weight:850}
      .pmx-save-line strong{color:#fff;font-weight:950}

      /* actual booking proof */
      #real-booking-case{padding:94px 0;background:#f4f6f9;color:#10182b}
      .pmx-case-route{margin:16px auto 0;color:#576680;font-size:clamp(21px,2.3vw,27px);font-weight:650;word-break:keep-all}
      .pmx-case-features{display:flex;justify-content:center;flex-wrap:wrap;max-width:980px;margin:36px auto 0;border-top:1px solid #dce2ea;border-bottom:1px solid #dce2ea}
      .pmx-case-features span{display:flex;align-items:center;justify-content:center;min-height:78px;padding:18px 28px;font-size:clamp(20px,2.2vw,25px);font-weight:760;word-break:keep-all}
      .pmx-case-features span+span{border-left:1px solid #dce2ea}
      .pmx-case-prices{display:grid;grid-template-columns:repeat(3,1fr);max-width:980px;margin:46px auto 0}
      .pmx-case-price{padding:12px 18px}
      .pmx-case-price span{display:block;color:#64728b;font-size:clamp(19px,2.1vw,23px);font-weight:650}
      .pmx-case-price strong{display:block;margin-top:11px;font-size:clamp(40px,5.2vw,60px);line-height:.94;letter-spacing:-.055em;font-weight:920;white-space:nowrap}
      .pmx-case-price.main strong{color:#245fc4}

      /* trust */
      #trust-proof{padding:88px 0;background:#fff;color:#10182b;border-bottom:1px solid #e4e9f0}
      .pmx-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:44px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
      .pmx-trust-grid article{min-height:164px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 18px}
      .pmx-trust-grid article+article{border-left:1px solid #dfe5ef}
      .pmx-trust-grid strong{font-size:clamp(46px,5.7vw,68px);line-height:.95;font-weight:920;letter-spacing:-.06em}
      .pmx-trust-grid span{margin-top:11px;font-size:clamp(20px,2.2vw,25px);font-weight:700;color:#33425f}
      .pmx-trust-grid em{margin-top:6px;font-style:normal;font-size:18px;color:#6e7d98;font-weight:520}

      /* hotel/tour */
      #hotel-benefit{padding:80px 0;background:#0c1730;color:#fff}
      #hotel-benefit .pmx-title{color:#fff}
      .pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:40px auto 0;border-top:1px solid rgba(255,255,255,.22);border-bottom:1px solid rgba(255,255,255,.22)}
      .pmx-tripline-item{min-height:138px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:24px 18px;text-align:center}
      .pmx-tripline-item+.pmx-tripline-item{border-left:1px solid rgba(255,255,255,.2)}
      .pmx-tripline-item b{font-size:16px;letter-spacing:.08em;color:#a9c2eb;font-weight:800}
      .pmx-tripline-item strong{margin-top:10px;font-size:clamp(26px,2.8vw,34px);font-weight:850}

      /* calculator */
      #calculator.ig8-calculator{min-height:0;padding:92px 0;background:#f4f6f9;color:#10182b;position:relative;overflow:hidden}
      #calculator.ig8-calculator>.container{width:min(1120px,calc(100% - 40px));margin:0 auto}
      #calculator.ig8-calculator .section-head{margin-bottom:40px;text-align:center}
      #calculator.ig8-calculator .section-head h2{max-width:900px;margin:0 auto;font-size:clamp(42px,5.5vw,68px)!important;line-height:1.08!important;letter-spacing:-.055em!important;font-weight:650!important;word-break:keep-all}
      #calculator.ig8-calculator .section-head h2 strong{font-weight:920!important}
      #calculator.ig8-calculator .section-head p,#calculator.ig8-calculator .section-kicker,#calculator.ig8-calculator .calculator-note{display:none!important}
      #calculator.ig8-calculator .exchange-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 auto 18px;padding:20px 26px;border:1px solid #dfe5ef;border-radius:22px;background:#fff}
      #calculator.ig8-calculator .exchange-label{font-size:19px;font-weight:650;color:#637393}
      #calculator.ig8-calculator #exchangeRateText{font-size:clamp(27px,3.4vw,38px);line-height:1;font-weight:850;letter-spacing:-.045em;color:#10182b}
      #calculator.ig8-calculator .exchange-meta{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      #calculator.ig8-calculator .calculator-card{margin:0 auto;padding:36px;border:1px solid #dfe5ef;border-radius:26px;background:#fff;box-shadow:none}
      #calculator.ig8-calculator .calculator-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:22px}
      #calculator.ig8-calculator .calculator-head strong{font-size:clamp(23px,2.7vw,30px);font-weight:650;color:#10182b}
      #calculator.ig8-calculator #rangeValue{font-size:clamp(46px,6vw,70px);line-height:.92;font-weight:920;letter-spacing:-.06em;color:#10182b}
      #calculator.ig8-calculator .price-range{margin:8px 0 28px;height:10px}
      #calculator.ig8-calculator .calculator-mode{display:grid;grid-template-columns:1fr 1fr;width:min(560px,100%);margin:0 auto 30px;padding:5px;border:1px solid #dfe5ef;border-radius:16px;background:#f4f6f9}
      #calculator.ig8-calculator .mode-btn{min-height:52px;border:0;border-radius:12px;background:transparent;color:#637393;font-size:19px;font-weight:700;box-shadow:none}
      #calculator.ig8-calculator .mode-btn.active{background:#10182b;color:#fff}
      #calculator.ig8-calculator .result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:0}
      #calculator.ig8-calculator .result-box{min-height:150px;padding:24px 20px;border:1px solid #dfe5ef;border-radius:20px;background:#fff;display:flex;flex-direction:column;justify-content:center;text-align:center}
      #calculator.ig8-calculator .result-box:first-child{display:none!important}
      #calculator.ig8-calculator .result-box span{font-size:clamp(19px,2vw,23px);font-weight:620;color:#637393}
      #calculator.ig8-calculator .result-box strong{display:block;margin-top:12px;font-size:clamp(38px,4.8vw,54px);line-height:.95;font-weight:920;letter-spacing:-.05em;color:#10182b;white-space:nowrap}
      #calculator.ig8-calculator .result-box em,#calculator.ig8-calculator .result-box small{display:none!important}
      #calculator.ig8-calculator .result-box.highlight{grid-column:1/-1;width:100%;min-height:160px;background:#1f4f96;border-color:#1f4f96;color:#fff}
      #calculator.ig8-calculator .result-box.highlight span,#calculator.ig8-calculator .result-box.highlight strong{color:#fff}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:66px;margin:22px auto 0;padding:0 28px;border:0;border-radius:16px;background:#10182b;color:#fff;font-size:clamp(21px,2.3vw,27px);font-weight:800;letter-spacing:-.035em;cursor:pointer}

      /* price guarantee */
      #price-match{padding:74px 0;background:#fff;color:#10182b;border-top:1px solid #e2e7ee;border-bottom:1px solid #e2e7ee}
      .pmx-price-match-line{display:grid;grid-template-columns:1fr auto;align-items:center;gap:30px;max-width:980px;margin:0 auto;text-align:left}
      .pmx-price-match-line h2{margin:0;font-size:clamp(34px,4.3vw,54px);line-height:1.12;letter-spacing:-.05em;font-weight:720;word-break:keep-all}
      .pmx-price-match-line h2 strong{font-weight:920;color:#245fc4}
      .pmx-price-match-number{font-size:clamp(58px,7vw,82px);line-height:.9;font-weight:920;letter-spacing:-.06em;color:#10182b;white-space:nowrap}
      .pmx-price-match-copy{max-width:980px;margin:18px auto 0;color:#62708a;font-size:clamp(19px,2.1vw,24px);font-weight:620;text-align:left;word-break:keep-all}

      #plans .membership-section-head .section-kicker{display:none!important}
      #plans .membership-section-head h2{font-size:clamp(42px,5.5vw,68px)!important;line-height:1.08!important;letter-spacing:-.055em!important;font-weight:850!important}
      #plans .plan-fit{margin:-8px 0 22px;padding:0 2px;font-size:clamp(19px,2vw,22px);line-height:1.35;font-weight:720;letter-spacing:-.025em;word-break:keep-all}
      #plans .recommended .plan-fit{color:rgba(255,255,255,.86)}
      #plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      @media(max-width:780px){
        .pmx-inner{width:min(100% - 24px,680px)}
        .pmx-title{font-size:clamp(35px,9.5vw,43px);line-height:1.1}.pmx-label{font-size:18px;margin-bottom:14px}
        .pmx-cruise-visual{min-height:540px}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:48px}.pmx-cruise-visual img{object-position:center 52%}
        #subscribe-start,#subscribe-seven,#subscribe-booking{padding:72px 0}
        .pmx-simple-pair,.pmx-booking-equation{grid-template-columns:1fr;gap:8px;margin-top:34px}.pmx-simple-box,.pmx-booking-part{padding:24px 12px}.pmx-simple-box strong{font-size:54px}.pmx-booking-part strong{font-size:52px}.pmx-simple-arrow,.pmx-booking-plus{transform:rotate(90deg);font-size:28px}.pmx-start-monthly{font-size:22px}.pmx-ledger{margin-top:34px}.pmx-ledger-row{grid-template-columns:1fr;gap:8px;text-align:center;padding:22px 4px}.pmx-ledger-row span{font-size:21px}.pmx-ledger-row strong{font-size:40px}.pmx-paid-box{text-align:center;font-size:21px}.pmx-paid-box strong{float:none;display:block;margin-top:8px;font-size:40px}.pmx-total-outlay strong{font-size:62px}.pmx-save-line{font-size:28px}
        #real-booking-case{padding:70px 0}.pmx-case-route{font-size:20px}.pmx-case-features{display:block;margin-top:28px}.pmx-case-features span{min-height:66px;padding:14px 8px;font-size:20px}.pmx-case-features span+span{border-left:0;border-top:1px solid #dce2ea}.pmx-case-prices{grid-template-columns:1fr;margin-top:32px}.pmx-case-price{padding:17px 8px;border-top:1px solid #dce2ea}.pmx-case-price:first-child{border-top:0}.pmx-case-price strong{font-size:46px}
        #trust-proof{padding:70px 0}.pmx-trust-grid{grid-template-columns:1fr;margin-top:34px}.pmx-trust-grid article{min-height:108px}.pmx-trust-grid article+article{border-left:0;border-top:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:46px}.pmx-trust-grid span{font-size:21px}.pmx-trust-grid em{font-size:17px}
        #hotel-benefit{padding:64px 0}.pmx-tripline{grid-template-columns:1fr;margin-top:30px}.pmx-tripline-item{min-height:92px;padding:19px 8px}.pmx-tripline-item+.pmx-tripline-item{border-left:0;border-top:1px solid rgba(255,255,255,.2)}.pmx-tripline-item strong{font-size:27px}
        #calculator.ig8-calculator{padding:70px 0}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator.ig8-calculator .section-head{margin-bottom:30px}#calculator.ig8-calculator .section-head h2{font-size:clamp(35px,9.5vw,43px)!important}#calculator.ig8-calculator .exchange-bar{padding:17px 18px;border-radius:18px;align-items:flex-end}#calculator.ig8-calculator .exchange-label{font-size:16px}#calculator.ig8-calculator #exchangeRateText{font-size:26px}#calculator.ig8-calculator .calculator-card{padding:22px 14px;border-radius:20px}#calculator.ig8-calculator .calculator-head strong{font-size:19px}#calculator.ig8-calculator #rangeValue{font-size:43px}#calculator.ig8-calculator .calculator-mode{width:100%;margin-bottom:20px}#calculator.ig8-calculator .mode-btn{font-size:16px;min-height:48px}#calculator.ig8-calculator .result-grid{gap:9px}#calculator.ig8-calculator .result-box{min-height:120px;padding:18px 8px;border-radius:18px}#calculator.ig8-calculator .result-box span{font-size:16px}#calculator.ig8-calculator .result-box strong{font-size:clamp(29px,8.8vw,38px)}#calculator.ig8-calculator .result-box.highlight{min-height:136px;padding:22px 12px}#calculator.ig8-calculator .result-box.highlight span{font-size:19px}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(43px,12vw,56px)}#calculator .pmx-calc-cta{min-height:60px;font-size:21px}
        #price-match{padding:56px 0}.pmx-price-match-line{grid-template-columns:1fr;text-align:center;gap:18px}.pmx-price-match-line h2{font-size:34px}.pmx-price-match-number{font-size:62px}.pmx-price-match-copy{text-align:center;font-size:18px}
        #plans .membership-section-head h2{font-size:clamp(35px,9.5vw,43px)!important}#plans .plan-fit{font-size:18px!important}
      }
      @media(prefers-reduced-motion:reduce){.pmx-enter{opacity:1!important;transform:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function make(tag,id,html,cls){const el=document.createElement(tag);if(id)el.id=id;if(cls)el.className=cls;el.innerHTML=html;return el}

  function observe(nodes){
    const list=nodes.filter(Boolean);
    if(!('IntersectionObserver' in window)){list.forEach((node)=>node.classList.add('pmx-visible'));return}
    const io=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(!entry.isIntersecting)return;entry.target.classList.add('pmx-visible');io.unobserve(entry.target)}),{threshold:.14,rootMargin:'0px 0px -5% 0px'});
    list.forEach((node)=>io.observe(node));
  }

  function removeOldInjected(){
    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary','ig8-problem-a','ig8-problem-b','ig8-promise','ig8-rule','ig8-cruise','ig8-membership-spend','ig8-total','ig8-saving','ig8-freedom','ig8-final','join-faq','pmx-bottom-cta','trust-proof','travel-desire','quick-result','real-booking-case','subscribe-bridge','subscribe-value','subscribe-start','subscribe-seven','subscribe-booking','ig8-start','ig8-monthly','ig8-seven','ig8-payment','ig8-routes','signup-steps'].forEach((id)=>document.getElementById(id)?.remove());
  }

  function rebuildNav(){
    const nav=document.querySelector('.hero-nav-track');if(!nav)return;
    const set=[
      ['#subscribe-start','01','구독 방식'],
      ['#subscribe-booking','02','가격 예시'],
      ['#real-booking-case','03','실제 예약'],
      ['#calculator','04','직접 계산'],
      ['#plans','05','플랜 선택']
    ].map(([href,num,label])=>`<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML=set+set;
  }

  function buildTravel(review){
    const el=make('section','travel-desire',`<div class="pmx-cruise-visual"><img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=85&w=1800" alt="크루즈 선상 수영장과 바다 풍경" loading="lazy"><div class="pmx-cruise-copy"><span class="pmx-label pmx-enter">7박 크루즈</span><h2 class="pmx-title pmx-enter">일주일을 바다 위에서<br><strong>발코니 객실로</strong></h2></div></div>`,'pmx-section');
    review.insertAdjacentElement('afterend',el);return el;
  }

  function buildSubscribeStart(after){
    const el=make('section','subscribe-start',`<div class="pmx-inner"><span class="pmx-label pmx-enter">클래식 기준</span><h2 class="pmx-title pmx-enter">여행도 <strong>구독하면</strong><br>포인트가 쌓입니다</h2><div class="pmx-simple-pair pmx-enter"><div class="pmx-simple-box"><span>첫 가입</span><strong>$200</strong></div><div class="pmx-simple-arrow">→</div><div class="pmx-simple-box"><span>바로 적립</span><strong>350P</strong></div></div><div class="pmx-start-monthly pmx-enter">그 다음부터 매월 <strong>$100 구독 → 200P 적립</strong></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildSubscribeSeven(after){
    const el=make('section','subscribe-seven',`<div class="pmx-inner"><span class="pmx-label pmx-enter">7개월 구독 예시</span><h2 class="pmx-title pmx-enter">7개월이면<br><strong>1,750P</strong></h2><div class="pmx-ledger pmx-enter"><div class="pmx-ledger-row"><span>첫 가입 적립</span><strong>350P</strong></div><div class="pmx-ledger-row"><span>7개월 × 200P</span><strong>1,400P</strong></div><div class="pmx-ledger-row total"><span>쌓인 포인트</span><strong>1,750P</strong></div></div><div class="pmx-paid-box pmx-enter">이때까지 낸 구독료 <strong>$900</strong></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildSubscribeBooking(after){
    const el=make('section','subscribe-booking',`<div class="pmx-inner"><span class="pmx-label pmx-enter">$3,500 크루즈 예약 예시</span><h2 class="pmx-title pmx-enter">쌓은 포인트를<br><strong>예약할 때 사용</strong></h2><div class="pmx-booking-equation pmx-enter"><div class="pmx-booking-part"><span>포인트 사용</span><strong>1,750P</strong></div><div class="pmx-booking-plus">+</div><div class="pmx-booking-part"><span>카드 결제</span><strong>$1,750</strong></div></div><div class="pmx-total-outlay pmx-enter"><span>7개월 구독료 $900 + 카드 $1,750</span><strong>$2,650</strong></div><div class="pmx-save-line pmx-enter">$3,500 대신 <strong>$2,650 지출</strong> · $850 차이</div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildRealCase(after){
    const el=make('section','real-booking-case',`<div class="pmx-inner"><span class="pmx-label pmx-enter">실제 예약</span><h2 class="pmx-title pmx-enter"><strong>2인 7박 서부 지중해</strong></h2><p class="pmx-case-route pmx-enter">바르셀로나 출발 · MSC World Asia</p><div class="pmx-case-features pmx-enter"><span>2인 기준</span><span>프리미엄 음료 패키지 포함</span><span>디럭스 발코니 Fantastica</span></div><div class="pmx-case-prices pmx-enter"><div class="pmx-case-price"><span>2인 총 예약가</span><strong>$3,887.35</strong></div><div class="pmx-case-price"><span>리워드 사용</span><strong>1,805.84P</strong></div><div class="pmx-case-price main"><span>예약 시 결제</span><strong>$2,020.88</strong></div></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildTrust(after){
    const el=make('section','trust-proof',`<div class="pmx-inner"><span class="pmx-label pmx-enter">INCRUISES</span><h2 class="pmx-title pmx-enter"><strong>2015년부터 운영 중</strong></h2><div class="pmx-trust-grid pmx-enter"><article><strong>10년+</strong><span>운영 이력</span><em>2015년부터</em></article><article><strong>350만+</strong><span>전 세계 이용자</span><em>글로벌 여행 플랫폼</em></article><article><strong>CLIA</strong><span>공식 회원</span><em>#00027506</em></article></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function rebuildHotel(after){
    const hotel=document.getElementById('hotel-benefit');if(!hotel)return null;
    hotel.className='pmx-section';
    hotel.innerHTML=`<div class="pmx-inner"><span class="pmx-label pmx-enter">크루즈 외 혜택</span><h2 class="pmx-title pmx-enter">호텔 · 투어도<br><strong>같이 이용</strong></h2><div class="pmx-tripline pmx-enter"><div class="pmx-tripline-item"><b>STAY</b><strong>전세계 호텔</strong></div><div class="pmx-tripline-item"><b>EXPLORE</b><strong>현지 투어</strong></div><div class="pmx-tripline-item"><b>EXTEND</b><strong>출발 전후 숙박</strong></div></div></div>`;
    after.insertAdjacentElement('afterend',hotel);return hotel;
  }

  function prepareCalculator(after){
    const calc=document.getElementById('calculator');if(!calc)return null;
    calc.className='ig8-calculator pmx-section';
    const head=calc.querySelector('.section-head');if(head)head.innerHTML='<h2>이번엔 <strong>내 크루즈 가격</strong>으로 계산</h2>';
    const label=calc.querySelector('.calculator-head strong');if(label)label.textContent='2인 크루즈 가격';
    const range=calc.querySelector('#cruisePrice');if(range){range.value='3500';range.dispatchEvent(new Event('input',{bubbles:true}))}
    calc.querySelector('.pmx-calc-cta')?.remove();
    const card=calc.querySelector('.calculator-card');
    if(card){const btn=document.createElement('button');btn.type='button';btn.className='pmx-calc-cta';btn.textContent='클래식 · 프리미엄 비교하기';btn.addEventListener('click',()=>document.getElementById('plans')?.scrollIntoView({behavior:'smooth',block:'start'}));card.appendChild(btn)}
    after.insertAdjacentElement('afterend',calc);
    return calc;
  }

  function rebuildPriceMatch(after){
    const pm=document.getElementById('price-match');if(!pm)return null;
    pm.className='pmx-section';
    pm.innerHTML=`<div class="pmx-inner"><div class="pmx-price-match-line pmx-enter"><h2>동일 조건이 더 싸다면<br><strong>최저가 보장</strong></h2><div class="pmx-price-match-number">$100+</div></div><p class="pmx-price-match-copy pmx-enter">동일 크루즈 · 일정 · 객실 기준 $100 이상 차이 시 가격 조정</p></div>`;
    after.insertAdjacentElement('afterend',pm);return pm;
  }

  function patchPlans(){
    const heading=document.querySelector('#plans .membership-section-head h2');if(heading)heading.innerHTML='내 구독 플랜<br><strong>클래식 · 프리미엄</strong>';
    [...document.querySelectorAll('#plans .plan-card')].forEach((card,index)=>{
      const name=card.querySelector('.plan-name')?.textContent?.trim()||'';
      const desired=/프리미엄/.test(name)||index===1?'빠르게 포인트를 모으고 싶다면':'1~2년에 한 번 · 천천히 준비';
      let fit=card.querySelector('.plan-fit');
      if(!fit){fit=document.createElement('p');fit.className='plan-fit';const main=card.querySelector('.plan-main-line');if(main)main.insertAdjacentElement('afterend',fit);else card.prepend(fit)}
      if(fit.textContent!==desired)fit.textContent=desired;
    });
  }

  function watchPlans(){const wrap=document.getElementById('planCards');if(!wrap)return;const run=()=>requestAnimationFrame(patchPlans);new MutationObserver(run).observe(wrap,{childList:true,subtree:true});run();setTimeout(run,500);setTimeout(run,1500)}

  function init(){
    addStyles();removeOldInjected();rebuildNav();
    const review=document.querySelector('.review-flow-section');if(!review)return;
    const travel=buildTravel(review);
    const start=buildSubscribeStart(travel);
    const seven=buildSubscribeSeven(start);
    const booking=buildSubscribeBooking(seven);
    const realCase=buildRealCase(booking);
    const trust=buildTrust(realCase);
    const hotel=rebuildHotel(trust);
    const calc=prepareCalculator(hotel||trust);
    const pm=rebuildPriceMatch(calc);
    const plans=document.getElementById('plans');if(plans&&pm)pm.insertAdjacentElement('afterend',plans);
    patchPlans();watchPlans();
    const floating=document.querySelector('.floating-cta');if(floating)floating.textContent='멤버십 플랜 보기';
    document.querySelectorAll('#hotel-benefit svg,footer svg,.pmx-section svg').forEach((svg)=>svg.remove());
    observe([travel,start,seven,booking,realCase,trust,hotel,calc,pm]);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
})();
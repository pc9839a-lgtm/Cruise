const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-8"></script>';

const FLOW_POLISH = `
<style>
  .pmx-section,.pmx-section *{box-sizing:border-box}
  .pmx-section{position:relative;overflow:hidden;transition:none!important}
  .pmx-inner{width:min(1040px,calc(100% - 40px));margin:0 auto;text-align:center}
  #plans .membership-section-head .section-kicker{display:none!important}

  /* 배경은 항상 표시, 콘텐츠만 짧게 등장 */
  .ig8-reveal{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
  .ig8-reveal .ig8-kicker,.ig8-reveal .ig8-title,.ig8-reveal .ig8-sub,.ig8-reveal .ig8-mega,
  .ig8-reveal .ig8-card,.ig8-reveal .ig8-rule,.ig8-reveal .ig8-ledger-row,.ig8-reveal .ig8-equation-part,
  .ig8-reveal .ig8-eq-symbol,.ig8-reveal .ig8-route,.ig8-reveal .ig8-check,.ig8-reveal .ig8-btn{
    opacity:0!important;transform:translateY(18px)!important;filter:none!important;
    transition:opacity .46s ease-out,transform .46s ease-out!important
  }
  .ig8-reveal.is-visible .ig8-kicker,.ig8-reveal.is-visible .ig8-title,.ig8-reveal.is-visible .ig8-sub,.ig8-reveal.is-visible .ig8-mega,
  .ig8-reveal.is-visible .ig8-card,.ig8-reveal.is-visible .ig8-rule,.ig8-reveal.is-visible .ig8-ledger-row,.ig8-reveal.is-visible .ig8-equation-part,
  .ig8-reveal.is-visible .ig8-eq-symbol,.ig8-reveal.is-visible .ig8-route,.ig8-reveal.is-visible .ig8-check,.ig8-reveal.is-visible .ig8-btn{
    opacity:1!important;transform:none!important
  }

  .pmx-enter{opacity:0;transform:translateY(18px);transition:opacity .46s ease-out,transform .46s ease-out}
  .pmx-visible .pmx-enter{opacity:1;transform:none}
  .pmx-visible .pmx-enter:nth-child(2){transition-delay:.05s}
  .pmx-visible .pmx-enter:nth-child(3){transition-delay:.10s}
  .pmx-visible .pmx-enter:nth-child(4){transition-delay:.15s}

  /* 신뢰 */
  #trust-proof{min-height:620px;display:flex;align-items:center;padding:92px 0;background:#fff;color:#10182b;border-bottom:1px solid #e7ebf0}
  #trust-proof .pmx-kicker{display:block;margin-bottom:20px;color:#285ca9;font-size:clamp(20px,2vw,24px);font-weight:720}
  .pmx-big-title{max-width:940px;margin:0 auto;font-size:clamp(43px,5.7vw,74px);line-height:1.08;letter-spacing:-.06em;font-weight:580;word-break:keep-all;text-wrap:balance}
  .pmx-big-title strong{font-weight:900}
  .pmx-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:52px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
  .pmx-trust-grid article{min-height:188px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px 18px}
  .pmx-trust-grid article+article{border-left:1px solid #dfe5ef}
  .pmx-trust-grid strong{font-size:clamp(48px,6vw,74px);line-height:.95;font-weight:920;letter-spacing:-.06em}
  .pmx-trust-grid span{margin-top:12px;font-size:clamp(22px,2.5vw,29px);font-weight:650;word-break:keep-all}
  .pmx-trust-grid em{margin-top:7px;font-style:normal;font-size:20px;color:#6e7d98;font-weight:520;word-break:keep-all}

  /* 여행 감정 */
  #travel-desire{padding:92px 0;background:#f5f6f8;color:#10182b}
  .pmx-photo{width:min(1080px,100%);height:clamp(360px,52vw,620px);margin:42px auto 0;border-radius:32px;overflow:hidden;background:#dfe4eb}
  .pmx-photo img{width:100%;height:100%;display:block;object-fit:cover}
  #travel-desire .pmx-big-title{max-width:900px}
  .pmx-lead{max-width:820px;margin:20px auto 0;font-size:clamp(24px,2.9vw,34px);line-height:1.38;font-weight:500;letter-spacing:-.03em;word-break:keep-all}

  /* 결과 먼저 */
  #quick-result{min-height:620px;display:flex;align-items:center;padding:92px 0;background:#fff;color:#10182b}
  .pmx-compare{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:26px;max-width:950px;margin:48px auto 0}
  .pmx-price-side{padding:34px 24px;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
  .pmx-price-side span{display:block;font-size:clamp(23px,2.6vw,30px);font-weight:600;color:#66748d}
  .pmx-price-side strong{display:block;margin-top:14px;font-size:clamp(58px,7.5vw,92px);line-height:.9;font-weight:920;letter-spacing:-.07em}
  .pmx-price-side.good strong{color:#245fc4}
  .pmx-arrow{font-size:46px;color:#7890b8;font-weight:500}
  .pmx-save{margin-top:34px;font-size:clamp(30px,4vw,48px);font-weight:820;letter-spacing:-.045em}

  /* 계산 CTA */
  #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:68px;margin:24px auto 0;padding:0 28px;border:0;border-radius:18px;background:#10182b;color:#fff;font-size:clamp(22px,2.4vw,28px);font-weight:780;letter-spacing:-.035em;cursor:pointer}

  /* 최저가 보장 */
  #price-match{min-height:650px;display:flex;align-items:center;padding:96px 0;background:#0c1730;color:#fff}
  #price-match .pmx-kicker{display:inline-flex;margin-bottom:25px;padding:9px 16px;border:1px solid rgba(255,255,255,.18);border-radius:999px;color:#dbe7ff;font-size:22px;font-weight:650}
  #price-match .pmx-main{margin:38px 0 0;font-size:clamp(86px,12vw,150px);line-height:.88;font-weight:920;letter-spacing:-.08em;color:#c8d9ff}
  #price-match .pmx-copy{max-width:850px;margin:28px auto 0;font-size:clamp(24px,3vw,34px);line-height:1.4;font-weight:480;color:rgba(255,255,255,.82);word-break:keep-all}
  #price-match .pmx-copy strong{color:#fff;font-weight:800}

  /* 가입 3단계 */
  #signup-steps{padding:88px 0;background:#f5f6f8;color:#10182b}
  .pmx-step-grid{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:18px;max-width:980px;margin:46px auto 0}
  .pmx-step{min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;border-top:1px solid #d8dee8;border-bottom:1px solid #d8dee8}
  .pmx-step b{font-size:20px;color:#2a63be}
  .pmx-step strong{margin-top:10px;font-size:clamp(28px,3.3vw,40px);font-weight:830;word-break:keep-all}
  .pmx-step-arrow{font-size:34px;color:#8498bb}

  /* Q&A */
  #join-faq{padding:90px 0;background:#fff;color:#10182b}
  .pmx-faq{max-width:900px;margin:46px auto 0;text-align:left;border-top:1px solid #dce2ea}
  .pmx-faq details{border-bottom:1px solid #dce2ea}
  .pmx-faq summary{list-style:none;cursor:pointer;padding:26px 4px;font-size:clamp(24px,2.8vw,32px);font-weight:760;letter-spacing:-.035em}
  .pmx-faq summary::-webkit-details-marker{display:none}
  .pmx-faq p{margin:0;padding:0 4px 27px;font-size:clamp(21px,2.3vw,27px);line-height:1.5;color:#53617a;font-weight:500;word-break:keep-all}

  /* 호텔 */
  #hotel-benefit{min-height:520px;display:flex;align-items:center;padding:84px 0;background:#f5f6f8;color:#10182b}
  .pmx-benefits{display:grid;grid-template-columns:repeat(3,1fr);max-width:980px;margin:48px auto 0;border-top:1px solid #d9e0e8;border-bottom:1px solid #d9e0e8}
  .pmx-benefits div{min-height:138px;display:flex;align-items:center;justify-content:center;padding:24px;font-size:clamp(27px,3vw,37px);font-weight:680;word-break:keep-all}
  .pmx-benefits div+div{border-left:1px solid #d9e0e8}

  @media(max-width:780px){
    .pmx-inner{width:min(100% - 24px,680px)}
    #trust-proof{min-height:560px;padding:72px 0}.pmx-big-title{font-size:clamp(36px,9.5vw,44px);line-height:1.12}
    .pmx-trust-grid{grid-template-columns:1fr;margin-top:36px}.pmx-trust-grid article{min-height:120px}.pmx-trust-grid article+article{border-left:0;border-top:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:50px}.pmx-trust-grid span{font-size:23px}.pmx-trust-grid em{font-size:18px}
    #travel-desire{padding:70px 0}.pmx-photo{height:58vw;min-height:300px;border-radius:24px;margin-top:32px}.pmx-lead{font-size:23px}
    #quick-result{min-height:540px;padding:72px 0}.pmx-compare{grid-template-columns:1fr;gap:10px;margin-top:34px}.pmx-arrow{transform:rotate(90deg);font-size:30px}.pmx-price-side{padding:24px 14px}.pmx-price-side strong{font-size:58px}.pmx-save{font-size:32px;margin-top:26px}
    #price-match{min-height:570px;padding:76px 0}#price-match .pmx-main{font-size:clamp(82px,24vw,114px)}#price-match .pmx-copy{font-size:23px}
    .pmx-step-grid{grid-template-columns:1fr;gap:8px;margin-top:34px}.pmx-step{min-height:105px}.pmx-step-arrow{transform:rotate(90deg);font-size:24px}
    #join-faq{padding:72px 0}.pmx-faq{margin-top:34px}.pmx-faq summary{font-size:24px;padding:23px 2px}.pmx-faq p{font-size:21px;padding-bottom:24px}
    #hotel-benefit{min-height:470px;padding:70px 0}.pmx-benefits{grid-template-columns:1fr;margin-top:34px}.pmx-benefits div{min-height:86px;font-size:26px}.pmx-benefits div+div{border-left:0;border-top:1px solid #d9e0e8}

    #calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}
    #calculator.ig8-calculator .calculator-card{padding:22px 14px!important;border-radius:22px!important}
    #calculator.ig8-calculator .calculator-head strong{font-size:20px!important}
    #calculator.ig8-calculator #rangeValue{font-size:44px!important}
    #calculator.ig8-calculator .calculator-mode{width:100%!important;margin-bottom:22px!important}
    #calculator.ig8-calculator .mode-btn{font-size:17px!important;min-height:50px!important}
    #calculator.ig8-calculator .result-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
    #calculator.ig8-calculator .result-box{min-width:0!important;min-height:128px!important;padding:20px 10px!important;border-radius:20px!important;text-align:center!important}
    #calculator.ig8-calculator .result-box span{font-size:18px!important;line-height:1.25!important;word-break:keep-all!important}
    #calculator.ig8-calculator .result-box strong{margin-top:10px!important;font-size:clamp(31px,9.5vw,42px)!important;line-height:.98!important;letter-spacing:-.055em!important;white-space:nowrap!important}
    #calculator.ig8-calculator .result-box.highlight{grid-column:1/-1!important;width:100%!important;min-height:142px!important;padding:24px 16px!important}
    #calculator.ig8-calculator .result-box.highlight span{font-size:21px!important}
    #calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(46px,13vw,60px)!important}
    #calculator .pmx-calc-cta{min-height:62px;margin-top:16px;font-size:22px;border-radius:16px}
    #plans .plan-fit{font-size:18px!important}
  }

  @media(max-width:420px){
    #calculator.ig8-calculator>.container{width:min(calc(100% - 16px),680px)!important}
    #calculator.ig8-calculator .calculator-card{padding:20px 10px!important}
    #calculator.ig8-calculator .result-grid{gap:8px!important}
    #calculator.ig8-calculator .result-box{min-height:120px!important;padding:18px 8px!important}
    #calculator.ig8-calculator .result-box span{font-size:16px!important}
    #calculator.ig8-calculator .result-box strong{font-size:clamp(28px,8.8vw,36px)!important}
    #calculator.ig8-calculator .result-box.highlight{min-height:136px!important}
    #calculator.ig8-calculator .result-box.highlight span{font-size:19px!important}
    #calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(44px,13vw,56px)!important}
  }

  @media(prefers-reduced-motion:reduce){.pmx-enter,.ig8-reveal,.ig8-reveal *{opacity:1!important;transform:none!important;transition:none!important}}
</style>
<script>
(function(){
  function make(tag,id,html,cls){var el=document.createElement(tag);if(id)el.id=id;if(cls)el.className=cls;el.innerHTML=html;return el;}
  function visibleObserve(nodes){
    nodes=nodes.filter(Boolean);
    if(!('IntersectionObserver' in window)){nodes.forEach(function(n){n.classList.add('pmx-visible');});return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('pmx-visible');io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -5% 0px'});
    nodes.forEach(function(n){io.observe(n);});
  }
  function polish(){
    document.querySelectorAll('.ig8-line').forEach(function(line){line.remove();});
    var planKicker=document.querySelector('#plans .membership-section-head .section-kicker');if(planKicker)planKicker.remove();

    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary','ig8-problem-a','ig8-problem-b','ig8-promise','ig8-cruise','ig8-membership-spend','ig8-total','ig8-saving','ig8-freedom'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});

    var nav=document.querySelector('.hero-nav-track');
    if(nav){
      var set='<a href="#quick-result"><strong>01</strong><span>가격 절감</span></a><a href="#calculator"><strong>02</strong><span>직접 계산</span></a><a href="#price-match"><strong>03</strong><span>최저가 보장</span></a><a href="#plans"><strong>04</strong><span>멤버십 플랜</span></a><a href="#hotel-benefit"><strong>05</strong><span>호텔 · 투어</span></a>';
      nav.innerHTML=set+set;
    }

    var review=document.querySelector('.review-flow-section');
    var trust=document.getElementById('trust-proof');
    if(review&&!trust){
      trust=make('section','trust-proof','<div class="pmx-inner"><span class="pmx-kicker pmx-enter">INGROUP · INCRUISES</span><h2 class="pmx-big-title pmx-enter"><strong>10년 넘게 운영된</strong><br>글로벌 여행 멤버십</h2><div class="pmx-trust-grid"><article><strong>10년+</strong><span>운영 이력</span><em>2015년부터</em></article><article><strong>350만+</strong><span>전 세계 이용자</span><em>글로벌 여행 플랫폼</em></article><article><strong>CLIA</strong><span>공식 회원</span><em>#00027506</em></article></div></div>','pmx-section');
      review.insertAdjacentElement('afterend',trust);
    }

    var desire=document.getElementById('travel-desire');
    if(trust&&!desire){
      desire=make('section','travel-desire','<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">이 여행을<br><strong>이 가격에</strong></h2><p class="pmx-lead pmx-enter">7박 크루즈도 미리 준비하면 부담을 줄일 수 있습니다.</p><div class="pmx-photo pmx-enter"><img src="/membership/img/KakaoTalk_20260405_150550057_02.jpg" alt="크루즈 여행 풍경"></div></div>','pmx-section');
      trust.insertAdjacentElement('afterend',desire);
    }

    var result=document.getElementById('quick-result');
    if(desire&&!result){
      result=make('section','quick-result','<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">먼저 결과부터<br><strong>확인해보세요</strong></h2><div class="pmx-compare"><div class="pmx-price-side pmx-enter"><span>그냥 예약</span><strong>$3,500</strong></div><div class="pmx-arrow pmx-enter">→</div><div class="pmx-price-side good pmx-enter"><span>미리 준비</span><strong>$2,650</strong></div></div><div class="pmx-save pmx-enter">차이 <strong>$850</strong></div></div>','pmx-section');
      desire.insertAdjacentElement('afterend',result);
    }

    var start=document.getElementById('ig8-start');var monthly=document.getElementById('ig8-monthly');var rule=document.getElementById('ig8-rule');var seven=document.getElementById('ig8-seven');var payment=document.getElementById('ig8-payment');var routes=document.getElementById('ig8-routes');var calc=document.getElementById('calculator');
    var cursor=result;
    [start,monthly,rule,seven,payment,routes,calc].forEach(function(el){if(el&&cursor){cursor.insertAdjacentElement('afterend',el);cursor=el;}});

    if(calc&&!calc.querySelector('.pmx-calc-cta')){
      var card=calc.querySelector('.calculator-card');
      if(card){var btn=document.createElement('button');btn.type='button';btn.className='pmx-calc-cta';btn.textContent='이 금액으로 준비 시작하기';btn.addEventListener('click',function(){var p=document.getElementById('plans');if(p)p.scrollIntoView({behavior:'smooth',block:'start'});});card.appendChild(btn);}
    }

    var pm=document.getElementById('price-match');
    if(pm){
      pm.className='pmx-section';
      pm.innerHTML='<div class="pmx-inner"><span class="pmx-kicker pmx-enter">그래도 다른 곳이 더 싸다면?</span><h2 class="pmx-big-title pmx-enter">걱정하지 마세요<br><strong>최저가 보장제</strong></h2><div class="pmx-main pmx-enter">$100+</div><p class="pmx-copy pmx-enter">동일 크루즈 · 일정 · 객실 기준으로 <strong>$100 이상 차이</strong>가 나면<br>조건 확인 후 <strong>가격을 조정합니다.</strong></p></div>';
      if(calc)calc.insertAdjacentElement('afterend',pm);
    }

    var plans=document.getElementById('plans');if(plans&&pm)pm.insertAdjacentElement('afterend',plans);

    var steps=document.getElementById('signup-steps');
    if(plans&&!steps){
      steps=make('section','signup-steps','<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">가입은<br><strong>3단계면 끝</strong></h2><div class="pmx-step-grid"><div class="pmx-step pmx-enter"><b>01</b><strong>플랜 선택</strong></div><div class="pmx-step-arrow pmx-enter">→</div><div class="pmx-step pmx-enter"><b>02</b><strong>멤버십 가입</strong></div><div class="pmx-step-arrow pmx-enter">→</div><div class="pmx-step pmx-enter"><b>03</b><strong>매월 포인트 적립</strong></div></div></div>','pmx-section');
      plans.insertAdjacentElement('afterend',steps);
    }

    var faq=document.getElementById('join-faq');
    if(steps&&!faq){
      faq=make('section','join-faq','<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">가입 전에<br><strong>이것만 확인하세요</strong></h2><div class="pmx-faq pmx-enter"><details><summary>약정기간이 있나요?</summary><p>별도의 장기 약정기간 없이 이용할 수 있습니다.</p></details><details><summary>해지는 어떻게 하나요?</summary><p>필요한 기간 이용 후 해지할 수 있습니다. 해지 시 2배 적립분은 사라지고 원금 기준 포인트만 남습니다.</p></details><details><summary>포인트 유효기간이 있나요?</summary><p>포인트 자체의 유효기간은 없습니다. 다만 멤버십 상태에 따라 적립 혜택 조건이 달라질 수 있습니다.</p></details><details><summary>예약 후에도 멤버십을 유지해야 하나요?</summary><p>예약한 크루즈를 실제 이용하려면 출발 시점까지 필요한 멤버십 조건을 유지해야 합니다.</p></details></div></div>','pmx-section');
      steps.insertAdjacentElement('afterend',faq);
    }

    var hotel=document.getElementById('hotel-benefit');
    if(hotel){
      hotel.className='pmx-section';hotel.innerHTML='<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">추가로 이것도<br><strong>한 번에 예약</strong></h2><p class="pmx-lead pmx-enter">크루즈뿐 아니라 여행 전후 일정까지 이어서 준비할 수 있습니다.</p><div class="pmx-benefits"><div>전세계 호텔</div><div>현지 투어</div><div>출발 전후 1박</div></div></div>';
      if(faq)faq.insertAdjacentElement('afterend',hotel);
    }

    var finalSection=document.getElementById('ig8-final');if(finalSection&&hotel)hotel.insertAdjacentElement('afterend',finalSection);
    var finalBtn=document.querySelector('#ig8-final .ig8-btn');if(finalBtn)finalBtn.textContent='내 여행비 미리 준비하기';
    var floating=document.querySelector('.floating-cta');if(floating)floating.textContent='내 여행비 미리 준비하기';

    visibleObserve([trust,desire,result,pm,steps,faq,hotel]);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',polish,{once:true});else polish();
})();
</script>`;

class MembershipScriptInjector { element(element) { element.prepend(SURVEY_SCRIPT + CONVERSION_SCRIPT + FLOW_POLISH, { html: true }); } }
class RemoveElement { element(element) { element.remove(); } }

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  const isMembershipLanding = (url.pathname === '/membership/' || url.pathname === '/membership/index.html') && contentType.includes('text/html');
  if (!isMembershipLanding) return response;
  return new HTMLRewriter().on('body', new MembershipScriptInjector()).on('.hero-benefit-row', new RemoveElement()).on('.hero-actions', new RemoveElement()).transform(response);
}

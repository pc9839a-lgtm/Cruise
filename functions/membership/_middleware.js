const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-7"></script>';

const FLOW_POLISH = `
<style>
  .pmx-section,.pmx-section *{box-sizing:border-box}
  .pmx-section{position:relative;overflow:hidden;isolation:isolate;transition:none!important}
  .pmx-inner{width:min(1040px,calc(100% - 40px));margin:0 auto;text-align:center}

  #plans .membership-section-head .section-kicker{display:none!important}

  /* 섹션 배경은 항상 보이고, 콘텐츠만 짧게 등장 */
  .ig8-reveal{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
  .ig8-reveal .ig8-kicker,
  .ig8-reveal .ig8-title,
  .ig8-reveal .ig8-sub,
  .ig8-reveal .ig8-mega,
  .ig8-reveal .ig8-card,
  .ig8-reveal .ig8-rule,
  .ig8-reveal .ig8-ledger-row,
  .ig8-reveal .ig8-equation-part,
  .ig8-reveal .ig8-eq-symbol,
  .ig8-reveal .ig8-route,
  .ig8-reveal .ig8-check,
  .ig8-reveal .ig8-btn{
    opacity:0!important;
    transform:translateY(20px)!important;
    filter:none!important;
    transition:opacity .48s ease-out,transform .48s ease-out!important;
  }
  .ig8-reveal.is-visible .ig8-kicker,
  .ig8-reveal.is-visible .ig8-title,
  .ig8-reveal.is-visible .ig8-sub,
  .ig8-reveal.is-visible .ig8-mega,
  .ig8-reveal.is-visible .ig8-card,
  .ig8-reveal.is-visible .ig8-rule,
  .ig8-reveal.is-visible .ig8-ledger-row,
  .ig8-reveal.is-visible .ig8-equation-part,
  .ig8-reveal.is-visible .ig8-eq-symbol,
  .ig8-reveal.is-visible .ig8-route,
  .ig8-reveal.is-visible .ig8-check,
  .ig8-reveal.is-visible .ig8-btn{
    opacity:1!important;
    transform:none!important;
  }

  #price-match.pmx-section{min-height:650px;display:flex;align-items:center;padding:100px 0;background:#0c1730;color:#fff}
  #price-match .pmx-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:28px;padding:10px 18px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.08);color:#dbe7ff;font-size:clamp(19px,2vw,24px);font-weight:600;letter-spacing:-.03em}
  #price-match .pmx-title{max-width:950px;margin:0 auto;font-size:clamp(44px,6vw,78px);line-height:1.08;letter-spacing:-.06em;font-weight:560;word-break:keep-all;text-wrap:balance}
  #price-match .pmx-title strong{font-weight:900;color:#fff}
  #price-match .pmx-main{margin:42px 0 0;font-size:clamp(86px,12vw,154px);line-height:.88;letter-spacing:-.08em;font-weight:920;color:#c8d9ff}
  #price-match .pmx-copy{max-width:850px;margin:30px auto 0;font-size:clamp(24px,3vw,34px);line-height:1.38;letter-spacing:-.035em;font-weight:470;color:rgba(255,255,255,.82);word-break:keep-all}
  #price-match .pmx-copy strong{font-weight:780;color:#fff}

  #hotel-benefit.pmx-section{min-height:540px;display:flex;align-items:center;padding:88px 0;background:#fff;color:#10182b;border-top:1px solid #e6eaf0}
  #hotel-benefit .pmx-title{max-width:900px;margin:0 auto;font-size:clamp(40px,5.2vw,68px);line-height:1.09;letter-spacing:-.055em;font-weight:560;word-break:keep-all;text-wrap:balance}
  #hotel-benefit .pmx-title strong{font-weight:880}
  #hotel-benefit .pmx-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch;gap:0;max-width:980px;margin:54px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
  #hotel-benefit .pmx-benefit{min-height:150px;display:flex;align-items:center;justify-content:center;padding:26px 18px;font-size:clamp(27px,3vw,38px);line-height:1.15;letter-spacing:-.045em;font-weight:650;word-break:keep-all}
  #hotel-benefit .pmx-benefit + .pmx-benefit{border-left:1px solid #dfe5ef}

  .pmx-enter{opacity:0;transform:translateY(20px);filter:none;transition:opacity .48s ease-out,transform .48s ease-out}
  .pmx-visible .pmx-enter{opacity:1;transform:none}
  .pmx-visible .pmx-enter:nth-child(2){transition-delay:.05s}
  .pmx-visible .pmx-enter:nth-child(3){transition-delay:.10s}
  .pmx-visible .pmx-enter:nth-child(4){transition-delay:.15s}
  #hotel-benefit .pmx-benefit{opacity:0;transform:translateY(18px);transition:opacity .45s ease-out,transform .45s ease-out}
  #hotel-benefit.pmx-visible .pmx-benefit{opacity:1;transform:none}
  #hotel-benefit.pmx-visible .pmx-benefit:nth-child(1){transition-delay:.06s}
  #hotel-benefit.pmx-visible .pmx-benefit:nth-child(2){transition-delay:.12s}
  #hotel-benefit.pmx-visible .pmx-benefit:nth-child(3){transition-delay:.18s}

  @media(max-width:780px){
    #price-match.pmx-section{min-height:590px;padding:78px 0}
    #price-match .pmx-title{font-size:clamp(37px,10vw,46px);line-height:1.12}
    #price-match .pmx-main{margin-top:34px;font-size:clamp(82px,24vw,118px)}
    #price-match .pmx-copy{font-size:clamp(22px,6vw,27px);line-height:1.4}
    #hotel-benefit.pmx-section{min-height:500px;padding:72px 0}
    #hotel-benefit .pmx-title{font-size:clamp(35px,9.5vw,43px);line-height:1.13}
    #hotel-benefit .pmx-benefits{grid-template-columns:1fr;margin-top:38px}
    #hotel-benefit .pmx-benefit{min-height:90px;font-size:27px}
    #hotel-benefit .pmx-benefit + .pmx-benefit{border-left:0;border-top:1px solid #dfe5ef}

    #calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}
    #calculator.ig8-calculator .calculator-card{padding:22px 14px!important;border-radius:22px!important}
    #calculator.ig8-calculator .calculator-head{gap:10px!important}
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

  @media(prefers-reduced-motion:reduce){
    .ig8-reveal,.ig8-reveal *, .pmx-enter,#hotel-benefit .pmx-benefit{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
  }
</style>
<script>
(function(){
  function setNavItem(href,number,label){
    document.querySelectorAll('.hero-nav-track a[href="'+href+'"]').forEach(function(a){
      var n=a.querySelector('strong');
      var s=a.querySelector('span');
      if(n)n.textContent=number;
      if(s)s.textContent=label;
    });
  }

  function polish(){
    document.querySelectorAll('.ig8-line').forEach(function(line){line.remove();});

    var planKicker=document.querySelector('#plans .membership-section-head .section-kicker');
    if(planKicker) planKicker.remove();

    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary'].forEach(function(id){
      var el=document.getElementById(id); if(el) el.remove();
      document.querySelectorAll('.hero-nav-track a[href="#'+id+'"]').forEach(function(a){a.remove();});
    });

    setNavItem('#plans','01','멤버십 플랜');
    setNavItem('#calculator','02','직접 계산');
    setNavItem('#price-match','03','최저가 보장');
    setNavItem('#hotel-benefit','04','호텔 · 투어');

    var pm=document.getElementById('price-match');
    if(pm){
      pm.className='pmx-section';
      pm.innerHTML='<div class="pmx-inner"><span class="pmx-kicker pmx-enter">최저가 보장제</span><h2 class="pmx-title pmx-enter">같은 조건의 크루즈를<br><strong>더 저렴하게 찾으셨나요?</strong></h2><div class="pmx-main pmx-enter">$100+</div><p class="pmx-copy pmx-enter">동일 크루즈 · 일정 · 객실 기준으로 <strong>$100 이상 차이</strong>가 나면<br>조건 확인 후 <strong>가격을 조정합니다.</strong></p></div>';
      var routes=document.getElementById('ig8-routes');
      if(routes) routes.insertAdjacentElement('afterend',pm);
    }

    var hotel=document.getElementById('hotel-benefit');
    if(hotel){
      hotel.className='pmx-section';
      hotel.innerHTML='<div class="pmx-inner"><h2 class="pmx-title pmx-enter">크루즈뿐 아니라<br><strong>여행 전후 일정도 한 번에</strong></h2><div class="pmx-benefits"><div class="pmx-benefit">전세계 호텔</div><div class="pmx-benefit">현지 투어</div><div class="pmx-benefit">출발 전후 1박</div></div></div>';
    }

    var nodes=[pm,hotel].filter(Boolean);
    if(!('IntersectionObserver' in window)){nodes.forEach(function(n){n.classList.add('pmx-visible');});return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('pmx-visible');io.unobserve(entry.target);}});},{threshold:.14,rootMargin:'0px 0px -5% 0px'});
    nodes.forEach(function(n){io.observe(n);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',polish,{once:true}); else polish();
})();
</script>`;

class MembershipScriptInjector {
  element(element) {
    element.prepend(SURVEY_SCRIPT + CONVERSION_SCRIPT + FLOW_POLISH, { html: true });
  }
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  const isMembershipLanding =
    (url.pathname === '/membership/' || url.pathname === '/membership/index.html') &&
    contentType.includes('text/html');

  if (!isMembershipLanding) return response;

  return new HTMLRewriter()
    .on('body', new MembershipScriptInjector())
    .on('.hero-benefit-row', new RemoveElement())
    .on('.hero-actions', new RemoveElement())
    .transform(response);
}

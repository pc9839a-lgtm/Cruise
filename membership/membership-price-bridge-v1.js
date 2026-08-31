(() => {
  'use strict';

  function init() {
    const compare = document.querySelector('#price-compare');
    if (!compare || document.querySelector('#price-bridge')) return;

    const style = document.createElement('style');
    style.textContent = `
      #price-bridge{
        position:relative;
        overflow:hidden;
        min-height:clamp(760px,92vh,980px);
        margin:0;
        padding:clamp(110px,11vw,170px) 0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#0c1730;
        color:#fff;
      }
      #price-bridge .pb-inner{
        width:min(1120px,calc(100% - 40px));
        margin:auto;
        text-align:center;
      }
      #price-bridge .pb-lead{
        font-size:clamp(24px,2.5vw,34px);
        line-height:1;
        font-weight:800;
        letter-spacing:-.045em;
        color:rgba(255,255,255,.68);
      }
      #price-bridge .pb-direct{
        margin-top:18px;
        font-size:clamp(52px,7vw,94px);
        line-height:.98;
        font-weight:950;
        letter-spacing:-.075em;
        word-break:keep-all;
      }
      #price-bridge .pb-direct strong{
        position:relative;
        display:inline-block;
        color:#9fc0ff;
        font-weight:950;
      }
      #price-bridge .pb-direct strong::after{
        content:"";
        position:absolute;
        left:2%;right:0;bottom:-12px;
        height:5px;
        background:#9fc0ff;
        transform:scaleX(.12);
        transform-origin:left center;
        opacity:.42;
        animation:pbDirectLine 3.6s cubic-bezier(.16,1,.3,1) infinite;
      }
      #price-bridge .pb-pair{
        display:grid;
        grid-template-columns:minmax(0,.92fr) auto minmax(0,1.08fr);
        align-items:center;
        gap:clamp(24px,3.4vw,52px);
        margin-top:clamp(70px,7vw,100px);
      }
      #price-bridge .pb-price{min-width:0}
      #price-bridge .pb-price span{
        display:block;
        margin-bottom:16px;
        font-size:clamp(20px,2.15vw,28px);
        line-height:1.2;
        font-weight:800;
        letter-spacing:-.04em;
        opacity:.72;
      }
      #price-bridge .pb-price strong{
        display:block;
        font-size:clamp(86px,10vw,146px);
        line-height:.86;
        font-weight:950;
        letter-spacing:-.09em;
        white-space:nowrap;
      }
      #price-bridge .pb-price.old strong{
        position:relative;
        color:rgba(255,255,255,.72);
      }
      #price-bridge .pb-price.new strong{
        font-size:clamp(96px,11.3vw,164px);
        color:#9fc0ff;
      }
      #price-bridge .pb-price.old strong::after{
        content:"";
        position:absolute;
        left:-3%;right:-3%;top:51%;
        height:clamp(5px,.55vw,8px);
        background:#9fc0ff;
        transform:scaleX(0);
        transform-origin:left center;
      }
      #price-bridge .pb-arrow{
        font-size:clamp(46px,5vw,70px);
        line-height:1;
        font-weight:950;
        color:#9fc0ff;
      }
      #price-bridge .pb-diff{
        margin-top:clamp(62px,6.5vw,90px);
        line-height:.94;
        letter-spacing:-.07em;
      }
      #price-bridge .pb-diff span{
        display:block;
        margin-bottom:12px;
        font-size:clamp(22px,2.5vw,32px);
        font-weight:800;
        color:rgba(255,255,255,.68);
      }
      #price-bridge .pb-diff strong{
        display:block;
        font-size:clamp(66px,8.7vw,124px);
        font-weight:950;
        color:#fff;
      }
      #price-bridge .pb-reveal{
        opacity:0;
        transform:translateY(38px) scale(.97);
        transition:opacity .58s ease,transform .84s cubic-bezier(.16,1,.3,1);
      }
      #price-bridge.is-visible .pb-reveal{opacity:1;transform:none}
      #price-bridge.is-visible .pb-lead{transition-delay:.02s}
      #price-bridge.is-visible .pb-direct{transition-delay:.12s}
      #price-bridge.is-visible .pb-price.old{transition-delay:.26s}
      #price-bridge.is-visible .pb-arrow{transition-delay:.5s}
      #price-bridge.is-visible .pb-price.new{transition-delay:.64s}
      #price-bridge.is-visible .pb-diff{transition-delay:.9s}
      #price-bridge.is-visible .pb-price.old strong::after{
        animation:pbStrike .56s .52s cubic-bezier(.16,1,.3,1) forwards;
      }
      @keyframes pbStrike{to{transform:scaleX(1)}}
      @keyframes pbDirectLine{
        0%,20%,100%{transform:scaleX(.12);opacity:.3}
        48%,72%{transform:scaleX(1);opacity:.85}
      }
      @media(max-width:780px){
        #price-bridge{min-height:760px;padding:110px 0}
        #price-bridge .pb-inner{width:min(100% - 24px,680px)}
        #price-bridge .pb-lead{font-size:22px}
        #price-bridge .pb-direct{margin-top:16px;font-size:clamp(43px,12.5vw,58px);line-height:1.02}
        #price-bridge .pb-direct strong::after{bottom:-8px;height:4px}
        #price-bridge .pb-pair{grid-template-columns:1fr;gap:26px;margin-top:64px}
        #price-bridge .pb-price span{font-size:19px;margin-bottom:10px}
        #price-bridge .pb-price strong{font-size:clamp(72px,21vw,102px)}
        #price-bridge .pb-price.new strong{font-size:clamp(82px,24vw,114px)}
        #price-bridge .pb-arrow{transform:rotate(90deg);font-size:40px}
        #price-bridge .pb-diff{margin-top:54px}
        #price-bridge .pb-diff span{font-size:20px}
        #price-bridge .pb-diff strong{font-size:clamp(54px,16vw,74px)}
      }
      @media(prefers-reduced-motion:reduce){
        #price-bridge .pb-reveal{opacity:1!important;transform:none!important;transition:none!important}
        #price-bridge .pb-price.old strong::after{transform:scaleX(1)!important;animation:none!important}
        #price-bridge .pb-direct strong::after{transform:scaleX(1)!important;animation:none!important}
      }
    `;
    document.head.appendChild(style);

    const bridge = document.createElement('section');
    bridge.id = 'price-bridge';
    bridge.innerHTML = `
      <div class="pb-inner">
        <div class="pb-lead pb-reveal">그런데,</div>
        <div class="pb-direct pb-reveal"><strong>해외직구로</strong> 직접 예약하면</div>
        <div class="pb-pair">
          <div class="pb-price old pb-reveal">
            <span>여행사 · 가이드 포함</span>
            <strong>200만원</strong>
          </div>
          <div class="pb-arrow pb-reveal">→</div>
          <div class="pb-price new pb-reveal">
            <span>해외직구 직접 예약</span>
            <strong>120만원</strong>
          </div>
        </div>
        <div class="pb-diff pb-reveal"><span>1인</span><strong>80만원 차이</strong></div>
      </div>
    `;
    compare.parentNode.insertBefore(bridge, compare);

    if (!('IntersectionObserver' in window)) {
      bridge.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      bridge.classList.add('is-visible');
      observer.disconnect();
    }, { threshold:.24, rootMargin:'0px 0px -8% 0px' });
    observer.observe(bridge);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

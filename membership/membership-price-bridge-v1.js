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
        min-height:clamp(620px,78vh,820px);
        margin:clamp(86px,9vw,148px) 0;
        padding:clamp(96px,10vw,150px) 0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#2559c5;
        color:#fff;
      }
      #price-bridge .pb-inner{
        width:min(1080px,calc(100% - 40px));
        margin:auto;
        text-align:center;
      }
      #price-bridge .pb-lead{
        font-size:clamp(34px,4vw,54px);
        line-height:1;
        font-weight:950;
        letter-spacing:-.06em;
      }
      #price-bridge .pb-pair{
        display:grid;
        grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);
        align-items:center;
        gap:clamp(20px,3vw,44px);
        margin-top:clamp(52px,6vw,82px);
      }
      #price-bridge .pb-price{
        min-width:0;
      }
      #price-bridge .pb-price span{
        display:block;
        margin-bottom:16px;
        font-size:clamp(20px,2.2vw,28px);
        line-height:1.25;
        font-weight:800;
        letter-spacing:-.04em;
        opacity:.82;
      }
      #price-bridge .pb-price strong{
        display:block;
        font-size:clamp(78px,9vw,132px);
        line-height:.9;
        font-weight:950;
        letter-spacing:-.085em;
        white-space:nowrap;
      }
      #price-bridge .pb-price.old strong{
        position:relative;
        color:#d9e5ff;
      }
      #price-bridge .pb-price.old strong::after{
        content:"";
        position:absolute;
        left:-3%;right:-3%;top:51%;
        height:clamp(5px,.55vw,8px);
        background:#fff;
        transform:scaleX(0);
        transform-origin:left center;
      }
      #price-bridge .pb-arrow{
        font-size:clamp(42px,5vw,64px);
        line-height:1;
        font-weight:950;
      }
      #price-bridge .pb-diff{
        margin-top:clamp(50px,6vw,78px);
        font-size:clamp(46px,6vw,82px);
        line-height:1;
        font-weight:950;
        letter-spacing:-.065em;
      }
      #price-bridge .pb-reveal{
        opacity:0;
        transform:translateY(38px) scale(.97);
        transition:opacity .58s ease,transform .84s cubic-bezier(.16,1,.3,1);
      }
      #price-bridge.is-visible .pb-reveal{opacity:1;transform:none}
      #price-bridge.is-visible .pb-lead{transition-delay:.04s}
      #price-bridge.is-visible .pb-price.old{transition-delay:.18s}
      #price-bridge.is-visible .pb-arrow{transition-delay:.46s}
      #price-bridge.is-visible .pb-price.new{transition-delay:.62s}
      #price-bridge.is-visible .pb-diff{transition-delay:.9s}
      #price-bridge.is-visible .pb-price.old strong::after{
        animation:pbStrike .56s .48s cubic-bezier(.16,1,.3,1) forwards;
      }
      @keyframes pbStrike{to{transform:scaleX(1)}}
      @media(max-width:780px){
        #price-bridge{min-height:640px;margin:64px 0;padding:96px 0}
        #price-bridge .pb-lead{font-size:clamp(34px,10vw,46px)}
        #price-bridge .pb-pair{grid-template-columns:1fr;gap:24px;margin-top:46px}
        #price-bridge .pb-price span{font-size:20px;margin-bottom:10px}
        #price-bridge .pb-price strong{font-size:clamp(70px,20vw,100px)}
        #price-bridge .pb-arrow{transform:rotate(90deg);font-size:38px}
        #price-bridge .pb-diff{margin-top:42px;font-size:clamp(42px,12vw,58px)}
      }
      @media(prefers-reduced-motion:reduce){
        #price-bridge .pb-reveal{opacity:1!important;transform:none!important;transition:none!important}
        #price-bridge .pb-price.old strong::after{transform:scaleX(1)!important;animation:none!important}
      }
    `;
    document.head.appendChild(style);

    const bridge = document.createElement('section');
    bridge.id = 'price-bridge';
    bridge.innerHTML = `
      <div class="pb-inner">
        <div class="pb-lead pb-reveal">그런데,</div>
        <div class="pb-pair">
          <div class="pb-price old pb-reveal">
            <span>여행사 · 가이드 포함</span>
            <strong>200만원</strong>
          </div>
          <div class="pb-arrow pb-reveal">→</div>
          <div class="pb-price new pb-reveal">
            <span>직접 예약</span>
            <strong>120만원</strong>
          </div>
        </div>
        <div class="pb-diff pb-reveal">1인 80만원 차이</div>
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

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
        min-height:clamp(560px,72vh,760px);
        margin:clamp(78px,8vw,136px) 0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#2559c5;
        color:#fff;
      }
      #price-bridge .pb-inner{
        width:min(980px,calc(100% - 36px));
        margin:auto;
        text-align:center;
      }
      #price-bridge .pb-top{
        font-size:clamp(24px,2.5vw,32px);
        font-weight:850;
        letter-spacing:-.04em;
      }
      #price-bridge .pb-pair{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:clamp(24px,4vw,52px);
        margin-top:clamp(42px,5vw,68px);
      }
      #price-bridge .pb-old,
      #price-bridge .pb-new{
        position:relative;
        display:inline-block;
        font-size:clamp(78px,10.8vw,150px);
        line-height:.9;
        font-weight:950;
        letter-spacing:-.085em;
        white-space:nowrap;
      }
      #price-bridge .pb-old{color:#d6e2ff}
      #price-bridge .pb-old::after{
        content:"";
        position:absolute;
        left:-3%;right:-3%;top:51%;
        height:clamp(5px,.55vw,9px);
        background:#fff;
        transform:scaleX(0);
        transform-origin:left center;
      }
      #price-bridge .pb-arrow{
        font-size:clamp(42px,5vw,68px);
        font-weight:900;
        line-height:1;
      }
      #price-bridge .pb-cut{
        margin-top:clamp(36px,4vw,54px);
        font-size:clamp(38px,5.2vw,68px);
        line-height:1;
        font-weight:950;
        letter-spacing:-.06em;
      }
      #price-bridge .pb-reveal{
        opacity:0;
        transform:translateY(34px) scale(.97);
        transition:opacity .58s ease,transform .82s cubic-bezier(.16,1,.3,1);
      }
      #price-bridge.is-visible .pb-reveal{opacity:1;transform:none}
      #price-bridge.is-visible .pb-top{transition-delay:.04s}
      #price-bridge.is-visible .pb-old{transition-delay:.18s}
      #price-bridge.is-visible .pb-arrow{transition-delay:.52s}
      #price-bridge.is-visible .pb-new{transition-delay:.66s}
      #price-bridge.is-visible .pb-cut{transition-delay:.92s}
      #price-bridge.is-visible .pb-old::after{animation:pbStrike .56s .48s cubic-bezier(.16,1,.3,1) forwards}
      @keyframes pbStrike{to{transform:scaleX(1)}}
      @media(max-width:780px){
        #price-bridge{min-height:560px;margin:58px 0;padding:88px 0}
        #price-bridge .pb-pair{flex-direction:column;gap:22px;margin-top:38px}
        #price-bridge .pb-old,#price-bridge .pb-new{font-size:clamp(72px,21vw,104px)}
        #price-bridge .pb-arrow{transform:rotate(90deg);font-size:42px}
        #price-bridge .pb-cut{margin-top:34px;font-size:clamp(40px,11vw,58px)}
      }
      @media(prefers-reduced-motion:reduce){
        #price-bridge .pb-reveal{opacity:1!important;transform:none!important;transition:none!important}
        #price-bridge .pb-old::after{transform:scaleX(1)!important;animation:none!important}
      }
    `;
    document.head.appendChild(style);

    const bridge = document.createElement('section');
    bridge.id = 'price-bridge';
    bridge.innerHTML = `
      <div class="pb-inner">
        <div class="pb-top pb-reveal">같은 4박 5일</div>
        <div class="pb-pair">
          <div class="pb-old pb-reveal">200만원</div>
          <div class="pb-arrow pb-reveal">→</div>
          <div class="pb-new pb-reveal">120만원</div>
        </div>
        <div class="pb-cut pb-reveal">1인 -80만원</div>
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
    }, { threshold: .26, rootMargin: '0px 0px -8% 0px' });
    observer.observe(bridge);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

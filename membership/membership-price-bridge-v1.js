(() => {
  'use strict';

  function init() {
    const pain = document.querySelector('#price-pain');
    const compare = document.querySelector('#price-compare');
    if (!pain || !compare || document.querySelector('#price-bridge')) return;

    const style = document.createElement('style');
    style.textContent = `
      #price-bridge{
        position:relative;
        overflow:hidden;
        min-height:clamp(560px,72vh,760px);
        margin:clamp(72px,8vw,132px) 0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:linear-gradient(180deg,#0c1730 0%,#10295a 48%,#f5f8fd 100%);
        color:#fff;
        isolation:isolate;
      }
      #price-bridge::before{
        content:"";
        position:absolute;
        width:min(78vw,980px);
        aspect-ratio:1;
        left:50%;top:44%;
        transform:translate(-50%,-50%);
        border-radius:50%;
        background:radial-gradient(circle,rgba(70,121,255,.27),rgba(70,121,255,0) 66%);
        z-index:-1;
      }
      #price-bridge .pb-inner{
        width:min(980px,calc(100% - 36px));
        margin:auto;
        text-align:center;
      }
      #price-bridge .pb-kicker{
        display:block;
        font-size:clamp(22px,2.4vw,30px);
        font-weight:850;
        letter-spacing:-.04em;
        color:#c9dcff;
      }
      #price-bridge .pb-price{
        position:relative;
        display:inline-block;
        margin-top:34px;
        font-size:clamp(82px,12vw,166px);
        line-height:.9;
        font-weight:950;
        letter-spacing:-.085em;
        text-shadow:0 24px 70px rgba(0,0,0,.28);
      }
      #price-bridge .pb-price::after{
        content:"";
        position:absolute;
        left:-5%;right:-5%;top:52%;
        height:clamp(5px,.55vw,9px);
        border-radius:999px;
        background:#75a4ff;
        transform:scaleX(0);
        transform-origin:left center;
      }
      #price-bridge.is-visible .pb-price::after{
        animation:pbLine .72s .46s cubic-bezier(.16,1,.3,1) forwards;
      }
      #price-bridge .pb-question{
        max-width:900px;
        margin:42px auto 0;
        font-size:clamp(42px,5.6vw,76px);
        line-height:1.07;
        font-weight:930;
        letter-spacing:-.065em;
        word-break:keep-all;
      }
      #price-bridge .pb-next{
        margin-top:42px;
        font-size:clamp(24px,2.7vw,34px);
        line-height:1.3;
        font-weight:760;
        letter-spacing:-.04em;
        color:#dbe8ff;
      }
      #price-bridge .pb-arrow{
        display:block;
        margin:34px auto 0;
        width:22px;height:22px;
        border-right:3px solid rgba(255,255,255,.78);
        border-bottom:3px solid rgba(255,255,255,.78);
        transform:rotate(45deg);
        animation:pbArrow 1.4s ease-in-out infinite;
      }
      #price-bridge .pb-reveal{
        opacity:0;
        transform:translateY(38px) scale(.985);
        filter:blur(5px);
        transition:opacity .72s ease,transform .86s cubic-bezier(.16,1,.3,1),filter .72s ease;
      }
      #price-bridge.is-visible .pb-reveal{opacity:1;transform:none;filter:none}
      #price-bridge.is-visible .pb-kicker{transition-delay:.05s}
      #price-bridge.is-visible .pb-price{transition-delay:.16s}
      #price-bridge.is-visible .pb-question{transition-delay:.72s}
      #price-bridge.is-visible .pb-next{transition-delay:.9s}
      #price-bridge.is-visible .pb-arrow{transition-delay:1.05s}
      @keyframes pbLine{to{transform:scaleX(1)}}
      @keyframes pbArrow{0%,100%{translate:0 0;opacity:.45}50%{translate:0 10px;opacity:1}}
      @media(max-width:780px){
        #price-bridge{min-height:590px;margin:54px 0;padding:88px 0}
        #price-bridge .pb-price{margin-top:28px;font-size:clamp(78px,23vw,112px)}
        #price-bridge .pb-question{margin-top:34px;font-size:clamp(40px,11vw,54px)}
        #price-bridge .pb-next{margin-top:32px;font-size:23px}
      }
      @media(prefers-reduced-motion:reduce){
        #price-bridge .pb-reveal{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
        #price-bridge .pb-price::after{transform:scaleX(1)!important;animation:none!important}
        #price-bridge .pb-arrow{animation:none!important}
      }
    `;
    document.head.appendChild(style);

    const bridge = document.createElement('section');
    bridge.id = 'price-bridge';
    bridge.setAttribute('aria-label', '가격 비교 전 안내');
    bridge.innerHTML = `
      <div class="pb-inner">
        <span class="pb-kicker pb-reveal">그런데 잠깐.</span>
        <div class="pb-price pb-reveal">200만원</div>
        <h2 class="pb-question pb-reveal">1인 200만원이<br>원래 크루즈 가격일까요?</h2>
        <div class="pb-next pb-reveal">같은 배라도 가격은 달라질 수 있습니다.</div>
        <span class="pb-arrow pb-reveal" aria-hidden="true"></span>
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
    }, { threshold: .28, rootMargin: '0px 0px -8% 0px' });
    observer.observe(bridge);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

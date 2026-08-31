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
        font-size:clamp(28px,3vw,38px);
        font-weight:850;
        letter-spacing:-.045em;
      }
      #price-bridge .pb-number{
        margin-top:clamp(28px,4vw,46px);
        font-size:clamp(94px,13vw,176px);
        line-height:.88;
        font-weight:950;
        letter-spacing:-.09em;
      }
      #price-bridge .pb-bottom{
        margin-top:clamp(24px,3.4vw,40px);
        font-size:clamp(42px,5.4vw,72px);
        line-height:1;
        font-weight:950;
        letter-spacing:-.06em;
      }
      #price-bridge .pb-reveal{
        opacity:0;
        transform:translateY(38px) scale(.97);
        transition:opacity .6s ease,transform .84s cubic-bezier(.16,1,.3,1);
      }
      #price-bridge.is-visible .pb-reveal{opacity:1;transform:none}
      #price-bridge.is-visible .pb-top{transition-delay:.04s}
      #price-bridge.is-visible .pb-number{transition-delay:.18s}
      #price-bridge.is-visible .pb-bottom{transition-delay:.48s}
      @media(max-width:780px){
        #price-bridge{min-height:560px;margin:58px 0;padding:88px 0}
        #price-bridge .pb-top{font-size:clamp(27px,7.5vw,36px)}
        #price-bridge .pb-number{font-size:clamp(90px,25vw,122px);margin-top:30px}
        #price-bridge .pb-bottom{font-size:clamp(42px,11vw,56px);margin-top:26px}
      }
      @media(prefers-reduced-motion:reduce){
        #price-bridge .pb-reveal{opacity:1!important;transform:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);

    const bridge = document.createElement('section');
    bridge.id = 'price-bridge';
    bridge.innerHTML = `
      <div class="pb-inner">
        <div class="pb-top pb-reveal">그런데 여기서</div>
        <div class="pb-number pb-reveal">160만원</div>
        <div class="pb-bottom pb-reveal">빠진다면?</div>
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
    }, { threshold:.26, rootMargin:'0px 0px -8% 0px' });
    observer.observe(bridge);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

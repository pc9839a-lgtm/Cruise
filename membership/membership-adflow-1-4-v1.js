(() => {
  'use strict';

  function init() {
    const pain = document.querySelector('#price-pain');
    const bridge = document.querySelector('#price-bridge');
    const compare = document.querySelector('#price-compare');
    const same = document.querySelector('#same-cruise');
    if (!pain || !compare || !same) return;

    const painKicker = pain.querySelector('.mv2-kicker');
    const painTitle = pain.querySelector('.mv2-title');
    const painMega = pain.querySelector('.mv2-mega');
    const painSave = pain.querySelector('.mv2-save');
    if (painKicker) painKicker.textContent = '4박 5일 아시아 크루즈 예시';
    if (painTitle) painTitle.innerHTML = '<strong>둘이 가면</strong>';
    if (painMega) painMega.textContent = '400만원';
    if (painSave) painSave.innerHTML = '<strong>1인 200만원 × 2명</strong>';

    const compareKicker = compare.querySelector('.mv2-kicker');
    const compareTitle = compare.querySelector('.mv2-title');
    const compareSave = compare.querySelector('.mv2-save');
    const compareMega = compare.querySelector('.mv2-mega');
    const priceCards = compare.querySelectorAll('.mv2-price');
    const arrow = compare.querySelector('.mv2-arrow');

    if (compareKicker) compareKicker.textContent = '1인 80만원 차이';
    if (compareTitle) compareTitle.innerHTML = '<strong>둘이면</strong>';
    if (compareSave) compareSave.style.display = 'none';
    if (compareMega) compareMega.textContent = '160만원 차이';

    if (priceCards[0]) {
      const label = priceCards[0].querySelector('span');
      const value = priceCards[0].querySelector('strong');
      if (label) label.textContent = '2명 여행사 · 가이드 포함';
      if (value) value.textContent = '400만원';
    }
    if (priceCards[1]) {
      const label = priceCards[1].querySelector('span');
      const value = priceCards[1].querySelector('strong');
      if (label) label.textContent = '2명 직접 예약';
      if (value) value.textContent = '240만원';
    }
    if (arrow) arrow.textContent = '→';

    const sameKicker = same.querySelector('.mv2-kicker');
    const sameTitle = same.querySelector('.mv2-title');
    if (sameKicker) sameKicker.textContent = '160만원 아끼고';
    if (sameTitle) sameTitle.innerHTML = '<strong>크루즈는 그대로</strong>';

    const oldStyle = document.querySelector('#membership-adflow-1-4-style');
    if (oldStyle) oldStyle.remove();
    const style = document.createElement('style');
    style.id = 'membership-adflow-1-4-style';
    style.textContent = `
      #price-pain::before,#price-pain::after,
      #price-compare::before,
      #same-cruise::before,#same-cruise::after{display:none!important}

      #price-pain,#price-bridge,#price-compare,#same-cruise{
        margin:0!important;
        background:#0c1730!important;
        background-image:none!important;
        color:#fff!important;
        box-shadow:none!important;
      }
      #price-pain{padding-top:clamp(150px,13vw,220px)!important;padding-bottom:clamp(145px,12vw,210px)!important}
      #price-bridge{padding-top:clamp(140px,12vw,205px)!important;padding-bottom:clamp(140px,12vw,205px)!important;min-height:clamp(620px,78vh,820px)!important}
      #price-compare{padding-top:clamp(150px,13vw,220px)!important;padding-bottom:clamp(150px,13vw,220px)!important}
      #same-cruise{padding-top:clamp(150px,13vw,220px)!important;padding-bottom:clamp(160px,14vw,230px)!important}

      #price-pain .mv2-kicker,#price-compare .mv2-kicker,#same-cruise .mv2-kicker{
        background:rgba(255,255,255,.10)!important;
        color:#dce8ff!important;
      }
      #price-pain .mv2-title,#price-compare .mv2-title,#same-cruise .mv2-title{color:#fff!important}
      #price-pain .mv2-title{margin-top:18px!important}
      #price-pain .mv2-mega{margin-top:46px!important;color:#fff!important;text-shadow:none!important}
      #price-pain .mv2-save{margin-top:34px!important;color:#fff!important;background:transparent!important;border:0!important;padding:0!important}
      #price-pain .mv2-save strong{color:#9fc0ff!important}

      #price-bridge .pb-lead,#price-bridge .pb-diff,#price-bridge .pb-arrow{color:#fff!important}
      #price-bridge .pb-price span{color:rgba(255,255,255,.68)!important;opacity:1!important}
      #price-bridge .pb-price strong{color:#fff!important}
      #price-bridge .pb-price.old strong{color:rgba(255,255,255,.72)!important}
      #price-bridge .pb-price.old strong::after{background:#9fc0ff!important}

      #price-compare .mv2-inner{display:flex;flex-direction:column;align-items:center}
      #price-compare .mv2-kicker{order:1}
      #price-compare .mv2-title{order:2;margin-top:16px!important}
      #price-compare .mv2-compare{order:3;width:100%;margin-top:54px!important}
      #price-compare .mv2-mega{order:4;margin-top:44px!important;font-size:clamp(74px,9.8vw,136px)!important;color:#9fc0ff!important}
      #price-compare .mv2-save{order:5}
      #price-compare .mv2-price{
        background:transparent!important;
        border-top:1px solid rgba(255,255,255,.18)!important;
        border-bottom:1px solid rgba(255,255,255,.18)!important;
        border-left:0!important;border-right:0!important;
        border-radius:0!important;
        box-shadow:none!important;
      }
      #price-compare .mv2-price span{color:rgba(255,255,255,.68)!important}
      #price-compare .mv2-price strong{color:#fff!important}
      #price-compare .mv2-price.good strong{color:#9fc0ff!important}
      #price-compare .mv2-arrow{color:#9fc0ff!important}

      #same-cruise .mv2-title{margin-top:16px!important}
      #same-cruise .mv2-four{margin-top:60px!important;border-color:rgba(255,255,255,.20)!important}
      #same-cruise .mv2-four div{color:#fff!important}
      #same-cruise .mv2-four div+div{border-color:rgba(255,255,255,.20)!important}
      #same-cruise .mv2-four div::after{display:none!important}

      .af-reveal{
        opacity:0!important;
        translate:0 38px;
        scale:.97;
        transition:opacity .62s ease,translate .86s cubic-bezier(.16,1,.3,1),scale .86s cubic-bezier(.16,1,.3,1)!important;
        transition-delay:var(--af-delay,0ms)!important;
        will-change:opacity,translate,scale;
      }
      .af-reveal.af-left{translate:-48px 0}
      .af-reveal.af-right{translate:48px 0}
      .af-reveal.af-pop{translate:0 18px;scale:.88}
      .af-reveal.af-visible{opacity:1!important;translate:0 0;scale:1}

      @media(max-width:780px){
        #price-pain{padding-top:118px!important;padding-bottom:118px!important}
        #price-bridge{padding-top:118px!important;padding-bottom:118px!important;min-height:620px!important}
        #price-compare{padding-top:120px!important;padding-bottom:120px!important}
        #same-cruise{padding-top:120px!important;padding-bottom:132px!important}
        #price-compare .mv2-compare{margin-top:42px!important}
        #price-compare .mv2-mega{font-size:clamp(60px,16vw,86px)!important;margin-top:32px!important}
        #same-cruise .mv2-four{margin-top:46px!important}
        .af-reveal.af-left{translate:-32px 0}.af-reveal.af-right{translate:32px 0}
      }
      @media(prefers-reduced-motion:reduce){
        .af-reveal{opacity:1!important;translate:0 0!important;scale:1!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);

    const targets = [];
    const add = (el, cls = '', delay = 0) => {
      if (!el) return;
      el.classList.remove('s14-anim','s14-left','s14-right','s14-pop','s14-soft','is-visible');
      el.classList.add('af-reveal');
      cls.split(' ').filter(Boolean).forEach((name) => el.classList.add(name));
      el.style.setProperty('--af-delay', `${delay}ms`);
      targets.push(el);
    };

    add(painKicker, '', 0);
    add(painTitle, '', 90);
    add(painMega, 'af-pop', 190);
    add(painSave, '', 330);

    if (bridge) {
      add(bridge.querySelector('.pb-lead'), '', 0);
      add(bridge.querySelector('.pb-price.old'), 'af-left', 120);
      add(bridge.querySelector('.pb-arrow'), 'af-pop', 260);
      add(bridge.querySelector('.pb-price.new'), 'af-right', 360);
      add(bridge.querySelector('.pb-diff'), 'af-pop', 520);
      bridge.classList.add('is-visible');
    }

    add(compareKicker, '', 0);
    add(compareTitle, '', 100);
    add(priceCards[0], 'af-left', 210);
    add(arrow, 'af-pop', 340);
    add(priceCards[1], 'af-right', 430);
    add(compareMega, 'af-pop', 600);

    add(sameKicker, '', 0);
    add(sameTitle, '', 110);
    same.querySelectorAll('.mv2-four div').forEach((el, index) => add(el, 'af-pop', 220 + index * 110));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('af-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('af-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold:.16, rootMargin:'0px 0px -8% 0px' });
    targets.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

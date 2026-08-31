(() => {
  'use strict';

  function restoreNav() {
    const track = document.querySelector('.hero-nav-track');
    if (!track) return;
    const items = [
      ['01', '가격 비교', '#price-compare'],
      ['02', '가이드 없이', '#guide-question'],
      ['03', '$100 → 200P', '#membership-point'],
      ['04', '내 금액 계산', '#calculator'],
      ['05', '멤버십 선택', '#plans'],
      ['06', '내 가격 확인', '#membership-inquiry']
    ];
    track.innerHTML = [...items, ...items]
      .map(([no, label, href]) => `<a href="${href}"><strong>${no}</strong><span>${label}</span></a>`)
      .join('');
  }

  function init() {
    restoreNav();

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

      #price-pain.af-live .mv2-mega{animation:afPricePulse 3.2s ease-in-out infinite}
      #price-pain.af-live .mv2-save{animation:afSoftLift 4.2s ease-in-out .45s infinite}

      #price-bridge.af-live .pb-price.old{animation:afOldPrice 6s ease-in-out infinite}
      #price-bridge.af-live .pb-arrow{animation:afArrowMove 2.2s ease-in-out .45s infinite}
      #price-bridge.af-live .pb-price.new{animation:afNewPrice 6s ease-in-out .9s infinite}
      #price-bridge.af-live .pb-diff{animation:afDiffPulse 3.3s ease-in-out 1.2s infinite}

      #price-compare.af-live .mv2-price:first-child{animation:afCompareLeft 6.4s ease-in-out infinite}
      #price-compare.af-live .mv2-arrow{animation:afArrowMove 2.2s ease-in-out .35s infinite}
      #price-compare.af-live .mv2-price.good{animation:afCompareRight 6.4s ease-in-out .75s infinite}
      #price-compare.af-live .mv2-mega{animation:afDiffPulse 3.2s ease-in-out 1s infinite}

      #same-cruise.af-live .mv2-title{animation:afSoftLift 4.4s ease-in-out infinite}
      #same-cruise.af-live .mv2-four div{animation:afTileGlow 5.2s ease-in-out infinite}
      #same-cruise.af-live .mv2-four div:nth-child(2){animation-delay:.42s}
      #same-cruise.af-live .mv2-four div:nth-child(3){animation-delay:.84s}
      #same-cruise.af-live .mv2-four div:nth-child(4){animation-delay:1.26s}

      @keyframes afPricePulse{
        0%,72%,100%{transform:scale(1)}
        82%{transform:scale(1.055)}
        90%{transform:scale(.992)}
      }
      @keyframes afSoftLift{
        0%,68%,100%{transform:translateY(0)}
        80%{transform:translateY(-7px)}
      }
      @keyframes afArrowMove{
        0%,100%{transform:translateX(0);opacity:.62}
        50%{transform:translateX(10px);opacity:1}
      }
      @keyframes afOldPrice{
        0%,18%,100%{opacity:.92;transform:scale(1)}
        30%,52%{opacity:.58;transform:scale(.985)}
        68%{opacity:.9;transform:scale(1)}
      }
      @keyframes afNewPrice{
        0%,24%,100%{transform:scale(1)}
        38%{transform:scale(1.065)}
        48%{transform:scale(1)}
      }
      @keyframes afDiffPulse{
        0%,68%,100%{transform:scale(1);opacity:1}
        80%{transform:scale(1.045);opacity:1}
        88%{transform:scale(.994);opacity:.92}
      }
      @keyframes afCompareLeft{
        0%,20%,100%{transform:translateX(0);opacity:1}
        32%,46%{transform:translateX(-10px);opacity:.7}
        62%{transform:translateX(0);opacity:1}
      }
      @keyframes afCompareRight{
        0%,24%,100%{transform:translateX(0) scale(1)}
        38%{transform:translateX(8px) scale(1.035)}
        52%{transform:translateX(0) scale(1)}
      }
      @keyframes afTileGlow{
        0%,62%,100%{background:transparent;transform:translateY(0)}
        72%{background:rgba(159,192,255,.09);transform:translateY(-5px)}
        82%{background:transparent;transform:translateY(0)}
      }

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
        #price-pain.af-live .mv2-mega,#price-pain.af-live .mv2-save,
        #price-bridge.af-live .pb-price.old,#price-bridge.af-live .pb-arrow,#price-bridge.af-live .pb-price.new,#price-bridge.af-live .pb-diff,
        #price-compare.af-live .mv2-price,#price-compare.af-live .mv2-arrow,#price-compare.af-live .mv2-mega,
        #same-cruise.af-live .mv2-title,#same-cruise.af-live .mv2-four div{animation:none!important}
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

    const sections = [pain, bridge, compare, same].filter(Boolean);

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('af-visible'));
      sections.forEach((el) => el.classList.add('af-live'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('af-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold:.16, rootMargin:'0px 0px -8% 0px' });
    targets.forEach((el) => revealObserver.observe(el));

    const loopObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('af-live', entry.isIntersecting);
      });
    }, { threshold:.28 });
    sections.forEach((el) => loopObserver.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

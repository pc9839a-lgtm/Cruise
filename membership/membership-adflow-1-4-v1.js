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
      #price-pain .mv2-mega{margin-top:46px!important;color:#fff!important;text-shadow:none!important;animation:none!important}
      #price-pain .mv2-save{margin-top:34px!important;color:#fff!important;background:transparent!important;border:0!important;padding:0!important;animation:none!important}
      #price-pain .mv2-save strong{color:#9fc0ff!important}

      #price-bridge .pb-lead,#price-bridge .pb-diff,#price-bridge .pb-arrow{color:#fff!important}
      #price-bridge .pb-price span{color:rgba(255,255,255,.68)!important;opacity:1!important}
      #price-bridge .pb-price strong{color:#fff!important}
      #price-bridge .pb-price.old strong{color:rgba(255,255,255,.78)!important}
      #price-bridge .pb-price.old strong::after{background:#9fc0ff!important}

      #price-compare .mv2-inner{display:flex;flex-direction:column;align-items:center}
      #price-compare .mv2-kicker{order:1}
      #price-compare .mv2-title{order:2;margin-top:16px!important}
      #price-compare .mv2-compare{order:3;width:100%;margin-top:54px!important}
      #price-compare .mv2-mega{order:4;margin-top:44px!important;font-size:clamp(74px,9.8vw,136px)!important;color:#9fc0ff!important;animation:none!important}
      #price-compare .mv2-save{order:5}
      #price-compare .mv2-price{
        background:transparent!important;
        border-top:1px solid rgba(255,255,255,.18)!important;
        border-bottom:1px solid rgba(255,255,255,.18)!important;
        border-left:0!important;border-right:0!important;
        border-radius:0!important;
        box-shadow:none!important;
        animation:none!important;
      }
      #price-compare .mv2-price span{color:rgba(255,255,255,.68)!important}
      #price-compare .mv2-price strong{color:#fff!important}
      #price-compare .mv2-price.good strong{color:#9fc0ff!important}
      #price-compare .mv2-arrow{color:#9fc0ff!important;animation:none!important}

      #same-cruise .mv2-title{margin-top:16px!important;animation:none!important}
      #same-cruise .mv2-four{margin-top:60px!important;border-color:rgba(255,255,255,.20)!important}
      #same-cruise .mv2-four div{color:#fff!important;animation:none!important;background:transparent!important;transform:none!important}
      #same-cruise .mv2-four div+div{border-color:rgba(255,255,255,.20)!important}
      #same-cruise .mv2-four div::after{display:none!important}

      /* one focal loop only: 200만원 -> 120만원 */
      #price-bridge.focus-loop .pb-price.old{
        animation:focusOld 7.2s cubic-bezier(.16,1,.3,1) infinite!important;
      }
      #price-bridge.focus-loop .pb-price.old strong::after{
        animation:focusStrike 7.2s cubic-bezier(.16,1,.3,1) infinite!important;
        transform-origin:left center!important;
      }
      #price-bridge.focus-loop .pb-arrow{
        animation:focusArrow 7.2s cubic-bezier(.16,1,.3,1) infinite!important;
      }
      #price-bridge.focus-loop .pb-price.new{
        animation:focusNew 7.2s cubic-bezier(.16,1,.3,1) infinite!important;
      }

      @keyframes focusOld{
        0%,8%,72%,100%{opacity:1;transform:translateX(0) scale(1)}
        17%,32%{opacity:.5;transform:translateX(-8px) scale(.985)}
        43%{opacity:.72;transform:translateX(0) scale(1)}
      }
      @keyframes focusStrike{
        0%,8%,72%,100%{transform:scaleX(0)}
        18%,58%{transform:scaleX(1)}
      }
      @keyframes focusArrow{
        0%,13%,72%,100%{opacity:.5;transform:translateX(0)}
        22%{opacity:1;transform:translateX(12px)}
        31%,58%{opacity:.88;transform:translateX(6px)}
      }
      @keyframes focusNew{
        0%,16%,72%,100%{transform:translateY(0) scale(1);opacity:.82}
        27%{transform:translateY(-4px) scale(1.055);opacity:1}
        38%,58%{transform:translateY(0) scale(1);opacity:1}
      }

      @media(max-width:780px){
        #price-pain{padding-top:118px!important;padding-bottom:118px!important}
        #price-bridge{padding-top:118px!important;padding-bottom:118px!important;min-height:620px!important}
        #price-compare{padding-top:120px!important;padding-bottom:120px!important}
        #same-cruise{padding-top:120px!important;padding-bottom:132px!important}
        #price-compare .mv2-compare{margin-top:42px!important}
        #price-compare .mv2-mega{font-size:clamp(60px,16vw,86px)!important;margin-top:32px!important}
        #same-cruise .mv2-four{margin-top:46px!important}
      }
      @media(prefers-reduced-motion:reduce){
        #price-bridge.focus-loop .pb-price.old,
        #price-bridge.focus-loop .pb-price.old strong::after,
        #price-bridge.focus-loop .pb-arrow,
        #price-bridge.focus-loop .pb-price.new{animation:none!important}
        #price-bridge .pb-price.old strong::after{transform:scaleX(1)!important}
      }
    `;
    document.head.appendChild(style);

    if (!bridge) return;

    if (!('IntersectionObserver' in window)) {
      bridge.classList.add('focus-loop');
      return;
    }

    const loopObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        bridge.classList.toggle('focus-loop', entry.isIntersecting);
      });
    }, { threshold:.38 });
    loopObserver.observe(bridge);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

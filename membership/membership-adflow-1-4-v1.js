(() => {
  'use strict';

  function init() {
    const pain = document.querySelector('#price-pain');
    const compare = document.querySelector('#price-compare');
    const same = document.querySelector('#same-cruise');
    if (!pain || !compare || !same) return;

    const painKicker = pain.querySelector('.mv2-kicker');
    const painTitle = pain.querySelector('.mv2-title');
    const painMega = pain.querySelector('.mv2-mega');
    const painSave = pain.querySelector('.mv2-save');
    if (painKicker) painKicker.textContent = '막상 둘이 가려면';
    if (painTitle) painTitle.innerHTML = '4박 5일 크루즈';
    if (painMega) painMega.textContent = '400만원';
    if (painSave) painSave.innerHTML = '<strong>1인 200만원 × 2명</strong>';

    const compareKicker = compare.querySelector('.mv2-kicker');
    const compareTitle = compare.querySelector('.mv2-title');
    const compareSave = compare.querySelector('.mv2-save');
    const compareMega = compare.querySelector('.mv2-mega');
    if (compareKicker) compareKicker.textContent = '4박 5일 아시아 크루즈 예시';
    if (compareTitle) compareTitle.innerHTML = '<strong>둘이면</strong>';
    if (compareSave) compareSave.style.display = 'none';
    if (compareMega) compareMega.textContent = '160만원 차이';

    const sameKicker = same.querySelector('.mv2-kicker');
    const sameTitle = same.querySelector('.mv2-title');
    if (sameKicker) sameKicker.textContent = '가격은 내려가고';
    if (sameTitle) sameTitle.innerHTML = '<strong>크루즈는 그대로</strong>';

    const style = document.createElement('style');
    style.id = 'membership-adflow-1-4-style';
    style.textContent = `
      #price-pain::before,#price-pain::after,
      #price-compare::before,
      #same-cruise::before,#same-cruise::after{display:none!important}
      #same-cruise .mv2-four div::after{background:#75a4ff!important}

      #price-pain,#price-compare,#same-cruise{background-image:none!important}
      #price-pain .mv2-title{margin-top:18px!important}
      #price-pain .mv2-mega{margin-top:46px!important}

      #price-compare .mv2-inner{display:flex;flex-direction:column;align-items:center}
      #price-compare .mv2-kicker{order:1}
      #price-compare .mv2-title{order:2;margin-top:18px!important}
      #price-compare .mv2-mega{order:3;margin-top:18px!important;font-size:clamp(72px,9.5vw,132px)!important}
      #price-compare .mv2-compare{order:4;width:100%;margin-top:54px!important}
      #price-compare .mv2-save{order:5}

      #same-cruise .mv2-title{margin-top:18px!important}

      @media(max-width:780px){
        #price-compare .mv2-mega{font-size:clamp(58px,16vw,84px)!important;margin-top:14px!important}
        #price-compare .mv2-compare{margin-top:42px!important}
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

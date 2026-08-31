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

    const style = document.createElement('style');
    style.id = 'membership-adflow-1-4-style';
    style.textContent = `
      #price-pain::before,#price-pain::after,
      #price-compare::before,
      #same-cruise::before,#same-cruise::after{display:none!important}

      #price-pain,#price-compare,#same-cruise{background-image:none!important}
      #price-pain .mv2-title{margin-top:18px!important}
      #price-pain .mv2-mega{margin-top:46px!important}
      #price-pain .mv2-save{margin-top:34px!important}

      #price-compare .mv2-inner{display:flex;flex-direction:column;align-items:center}
      #price-compare .mv2-kicker{order:1}
      #price-compare .mv2-title{order:2;margin-top:16px!important}
      #price-compare .mv2-compare{order:3;width:100%;margin-top:50px!important}
      #price-compare .mv2-mega{order:4;margin-top:42px!important;font-size:clamp(74px,9.8vw,136px)!important}
      #price-compare .mv2-save{order:5}

      #same-cruise .mv2-title{margin-top:16px!important}
      #same-cruise .mv2-four{margin-top:58px!important}
      #same-cruise .mv2-four div::after{display:none!important}

      @media(max-width:780px){
        #price-compare .mv2-compare{margin-top:40px!important}
        #price-compare .mv2-mega{font-size:clamp(60px,16vw,86px)!important;margin-top:30px!important}
        #same-cruise .mv2-four{margin-top:44px!important}
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

(() => {
  'use strict';

  function buildSections7And8() {
    const section6 = document.getElementById('price-pain');
    const section7 = document.getElementById('price-compare');
    const section8 = document.getElementById('same-cruise');
    if (!section6 || !section7 || !section8) return false;

    section7.classList.add('mx7-price-reversal');
    section7.setAttribute('data-membership-section', '7');

    const kicker7 = section7.querySelector('.mv2-kicker');
    const title7 = section7.querySelector('.mv2-title');
    const prices7 = section7.querySelectorAll('.mv2-price');
    const save7 = section7.querySelector('.mv2-save');
    const mega7 = section7.querySelector('.mv2-mega');

    if (kicker7) kicker7.textContent = '그래서 우리는 해외직구로 갑니다.';
    if (title7) title7.innerHTML = '1인 약 200만원<br><strong>직구 예약 약 120만원</strong>';
    if (prices7[0]) {
      const label = prices7[0].querySelector('span');
      const price = prices7[0].querySelector('strong');
      if (label) label.textContent = '패키지 예약';
      if (price) price.textContent = '200만원';
    }
    if (prices7[1]) {
      const label = prices7[1].querySelector('span');
      const price = prices7[1].querySelector('strong');
      if (label) label.textContent = '직구 예약';
      if (price) price.textContent = '120만원';
    }
    if (save7) save7.innerHTML = '1인 약 <strong>80만원 차이</strong>';
    if (mega7) mega7.textContent = '둘이면 약 160만원 차이';

    section8.classList.add('mx8-same-cruise-proof');
    section8.setAttribute('data-membership-section', '8');

    const kicker8 = section8.querySelector('.mv2-kicker');
    const title8 = section8.querySelector('.mv2-title');
    const proofItems = section8.querySelectorAll('.mv2-four > div');
    const proofCopy = ['같은 배', '같은 객실 등급', '같은 식사', '같은 공연'];

    if (kicker8) kicker8.textContent = '혹시 싼 크루즈라서?';
    if (title8) title8.innerHTML = '아닙니다<br><strong>크루즈가 달라진 게 아닙니다</strong>';
    proofItems.forEach((item, index) => {
      if (proofCopy[index]) item.textContent = proofCopy[index];
    });

    const summary = section8.querySelector('.mx8-summary');
    if (summary) summary.remove();

    if (section6.nextElementSibling !== section7) {
      section6.insertAdjacentElement('afterend', section7);
    }
    if (section7.nextElementSibling !== section8) {
      section7.insertAdjacentElement('afterend', section8);
    }

    return true;
  }

  function init() {
    if (buildSections7And8()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections7And8() || tries >= 40) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

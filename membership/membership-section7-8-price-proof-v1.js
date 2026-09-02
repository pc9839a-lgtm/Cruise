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

    if (kicker7) kicker7.textContent = '같은 크루즈 · 직접 예약 예시';
    if (title7) title7.innerHTML = '1인 200만원 → 120만원<br><strong>가격이 이렇게 달라집니다</strong>';
    if (prices7[0]) {
      const label = prices7[0].querySelector('span');
      const price = prices7[0].querySelector('strong');
      if (label) label.textContent = '여행사 · 가이드 포함';
      if (price) price.textContent = '200만원';
    }
    if (prices7[1]) {
      const label = prices7[1].querySelector('span');
      const price = prices7[1].querySelector('strong');
      if (label) label.textContent = '직접 예약';
      if (price) price.textContent = '120만원';
    }
    if (save7) save7.innerHTML = '1인 차이 <strong>약 80만원</strong>';
    if (mega7) mega7.textContent = '2명 차이 약 160만원';

    section8.classList.add('mx8-same-cruise-proof');
    section8.setAttribute('data-membership-section', '8');

    const kicker8 = section8.querySelector('.mv2-kicker');
    const title8 = section8.querySelector('.mv2-title');
    const proofItems = section8.querySelectorAll('.mv2-four > div');
    const proofCopy = ['같은 배', '같은 객실 등급', '같은 식사', '같은 공연'];

    if (kicker8) kicker8.textContent = '싼 배로 바꾼 게 아닙니다';
    if (title8) title8.innerHTML = '가격은 달라도<br><strong>크루즈는 같습니다</strong>';
    proofItems.forEach((item, index) => {
      if (proofCopy[index]) item.textContent = proofCopy[index];
    });

    let summary = section8.querySelector('.mx8-summary');
    if (!summary) {
      summary = document.createElement('div');
      summary.className = 'mx8-summary';
      summary.innerHTML = '<span>달라진 것은</span><strong>예약 방식 · 포함 서비스</strong>';
      section8.querySelector('.mv2-inner')?.appendChild(summary);
    }

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

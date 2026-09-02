(() => {
  'use strict';

  function buildSections9And10() {
    const section8 = document.getElementById('same-cruise');
    const section9 = document.getElementById('mx-cost-structure');
    const section10 = document.getElementById('m3-savings-use');
    if (!section8 || !section9 || !section10) return false;

    section9.classList.add('mx9-cost-reason');
    section9.setAttribute('data-membership-section', '9');

    const kicker9 = section9.querySelector('.mx-eyebrow');
    const title9 = section9.querySelector('.mx-title');
    const sub9 = section9.querySelector('.mx-sub');
    const cards9 = section9.querySelectorAll('.mx-card');
    const names9 = ['예약 총액 $3,887.35', '사용 POINT 1,805.84P', '카드 출금 $2,020.88', '처리 수수료 $60.63'];

    if (kicker9) kicker9.textContent = '제 영수증은 이렇게 결제됐습니다';
    if (title9) title9.innerHTML = 'POINT를 먼저 쓰고<br><strong>남은 금액을 카드로 결제</strong>';
    if (sub9) sub9.textContent = '실제 영수증 숫자를 그대로 가져온 결제 구조입니다.';

    cards9.forEach((card, index) => {
      const number = card.querySelector('b');
      const title = card.querySelector('strong');
      const detail = card.querySelector('span');
      if (number) number.textContent = String(index + 1).padStart(2, '0');
      if (title && names9[index]) title.textContent = names9[index];
      if (detail) detail.remove();
    });

    section10.classList.add('mx10-savings-use');
    section10.setAttribute('data-membership-section', '10');

    const kicker10 = section10.querySelector('.m3-kicker');
    const title10 = section10.querySelector('h2');
    const items10 = section10.querySelectorAll('.m3-four > div strong');
    const names10 = ['총 $3,887.35', '1,805.84P', '$2,020.88 CARD', '$60.63 FEE'];

    if (kicker10) kicker10.textContent = '실제 결제 구조';
    if (title10) title10.innerHTML = '모아둔 POINT + 카드 결제<br><strong>이렇게 예약에 들어갑니다</strong>';
    items10.forEach((item, index) => {
      if (names10[index]) item.textContent = names10[index];
    });

    const amount = section10.querySelector('.mx10-amount');
    if (amount) amount.remove();

    if (section8.nextElementSibling !== section9) {
      section8.insertAdjacentElement('afterend', section9);
    }
    if (section9.nextElementSibling !== section10) {
      section9.insertAdjacentElement('afterend', section10);
    }

    return true;
  }

  function init() {
    if (buildSections9And10()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections9And10() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

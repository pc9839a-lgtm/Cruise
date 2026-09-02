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
    const names9 = ['가이드', '단체 이동', '예약 대행', '패키지 운영'];

    if (kicker9) kicker9.textContent = '그럼 624만원은 왜 차이 나는데?';
    if (title9) title9.innerHTML = '패키지는<br><strong>서비스 비용이 함께 붙습니다</strong>';
    if (sub9) sub9.textContent = '가이드·단체 이동·예약 대행·패키지 운영 등이 포함될 수 있습니다.';

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
    const names10 = ['항공권', '객실 업그레이드', '기항지 투어', '다음 크루즈 예약'];

    if (kicker10) kicker10.textContent = '2인 약 624만원 차이';
    if (title10) title10.innerHTML = '차액은<br><strong>여행 자체에 다시 쓸 수 있습니다</strong>';
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

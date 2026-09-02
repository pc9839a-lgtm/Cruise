(() => {
  'use strict';

  function buildSections7And8() {
    const section6 = document.getElementById('price-pain');
    const section7 = document.getElementById('price-compare');
    const section8 = document.getElementById('same-cruise');
    if (!section6 || !section7 || !section8) return false;

    let intro = document.getElementById('mx-direct-booking-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.id = 'mx-direct-booking-intro';
      intro.className = 'mx7-intro-section';
      intro.setAttribute('data-membership-section', '7-intro');
    }

    intro.innerHTML = `
      <div class="mx7-wide-inner">
        <span class="mx7-overline">MY RECEIPT</span>
        <h2>제가 예약한<br><strong>서부 지중해 7박</strong></h2>
        <div class="mx7-receipt-proof" aria-label="서부 지중해 실제 예약 영수증 요약">
          <div class="mx7-receipt-top">
            <span>MSC WORLD ASIA</span>
            <b>Barcelona · 2027.01.01</b>
          </div>
          <div class="mx7-receipt-route">
            <span>Deluxe Balcony Fantastica</span><i></i><span>BR2</span><i></i><span>2명</span>
          </div>
          <div class="mx7-receipt-breakdown">
            <div><span>예약 총액</span><strong>$3,887.35</strong></div>
            <div><span>사용 POINT</span><strong>1,805.84P</strong></div>
            <div><span>카드 실제 출금</span><strong>$2,020.88</strong></div>
            <div><span>처리 수수료</span><strong>$60.63</strong></div>
          </div>
        </div>
      </div>`;

    section7.classList.add('mx7-price-reversal');
    section7.setAttribute('data-membership-section', '7');

    const kicker7 = section7.querySelector('.mv2-kicker');
    const title7 = section7.querySelector('.mv2-title');
    const prices7 = section7.querySelectorAll('.mv2-price');
    const save7 = section7.querySelector('.mv2-save');
    const mega7 = section7.querySelector('.mv2-mega');

    if (kicker7) kicker7.remove();
    if (title7) title7.innerHTML = '패키지 2인 약 890만원<br><strong>내 예약 총액 $3,887.35</strong>';
    if (prices7[0]) {
      const label = prices7[0].querySelector('span');
      const price = prices7[0].querySelector('strong');
      if (label) label.textContent = '여행사 패키지 · 2인';
      if (price) price.textContent = '약 890만원';
    }
    if (prices7[1]) {
      const label = prices7[1].querySelector('span');
      const price = prices7[1].querySelector('strong');
      if (label) label.textContent = '내 실제 예약 · 총액';
      if (price) price.textContent = '$3,887.35';
    }
    if (save7) save7.innerHTML = 'POINT 사용 후 카드 실제 출금 <strong>$2,020.88</strong>';
    if (mega7) mega7.remove();

    const saving = document.getElementById('mx-direct-booking-saving');
    if (saving) saving.remove();

    section8.classList.add('mx8-same-cruise-proof');
    section8.setAttribute('data-membership-section', '8');

    const kicker8 = section8.querySelector('.mv2-kicker');
    const title8 = section8.querySelector('.mv2-title');
    const proofItems = section8.querySelectorAll('.mv2-four > div');
    const proofCopy = [
      'MSC WORLD ASIA',
      'Barcelona 출발 7박',
      'Deluxe Balcony Fantastica',
      '객실 코드 BR2'
    ];

    if (kicker8) kicker8.textContent = '혹시 싼 크루즈라서?';
    if (title8) title8.innerHTML = '아닙니다<br><strong>예약 내용을 그대로 공개합니다</strong>';
    proofItems.forEach((item, index) => {
      if (proofCopy[index]) item.textContent = proofCopy[index];
    });

    const summary = section8.querySelector('.mx8-summary');
    if (summary) summary.remove();

    if (section6.nextElementSibling !== intro) section6.insertAdjacentElement('afterend', intro);
    if (intro.nextElementSibling !== section7) intro.insertAdjacentElement('afterend', section7);
    if (section7.nextElementSibling !== section8) section7.insertAdjacentElement('afterend', section8);

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

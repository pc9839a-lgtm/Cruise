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
      intro.innerHTML = `
        <div class="mx7-wide-inner">
          <span class="mx7-overline">ACTUAL RECEIPT · WESTERN MEDITERRANEAN</span>
          <h2>말로만 싼 게 아니라<br><strong>제 실제 예약 영수증입니다.</strong></h2>
          <div class="mx7-receipt-proof" aria-label="서부 지중해 실제 예약 요약">
            <div class="mx7-receipt-top">
              <span>MSC WORLD ASIA</span>
              <b>실제 예약</b>
            </div>
            <div class="mx7-receipt-route">
              <span>Barcelona</span><i></i><span>7 nights Western Mediterranean</span><i></i><span>2명</span>
            </div>
            <div class="mx7-receipt-total">
              <span>예약 총액 $3,887.35<br>사용 POINT 1,805.84P</span>
              <strong>$2,020.88 CARD</strong>
            </div>
          </div>
        </div>`;
    }

    section7.classList.add('mx7-price-reversal');
    section7.setAttribute('data-membership-section', '7');

    const kicker7 = section7.querySelector('.mv2-kicker');
    const title7 = section7.querySelector('.mv2-title');
    const prices7 = section7.querySelectorAll('.mv2-price');
    const save7 = section7.querySelector('.mv2-save');
    const mega7 = section7.querySelector('.mv2-mega');

    if (kicker7) kicker7.remove();
    if (title7) title7.innerHTML = '여행사 패키지 2인 약 890만원<br><strong>제 영수증 총 예약금액은 $3,887.35</strong>';
    if (prices7[0]) {
      const label = prices7[0].querySelector('span');
      const price = prices7[0].querySelector('strong');
      if (label) label.textContent = '여행사 패키지 · 2인';
      if (price) price.textContent = '약 890만원';
    }
    if (prices7[1]) {
      const label = prices7[1].querySelector('span');
      const price = prices7[1].querySelector('strong');
      if (label) label.textContent = '내 실제 예약 영수증 · 총액';
      if (price) price.textContent = '$3,887.35';
    }
    if (save7) save7.innerHTML = '그중 <strong>1,805.84P</strong>를 사용해 카드 실제 출금은 <strong>$2,020.88</strong>';
    if (mega7) mega7.remove();

    let saving = document.getElementById('mx-direct-booking-saving');
    if (!saving) {
      saving = document.createElement('section');
      saving.id = 'mx-direct-booking-saving';
      saving.className = 'mx7-saving-section';
      saving.setAttribute('data-membership-section', '7-saving');
      saving.innerHTML = `
        <div class="mx7-wide-inner">
          <span>총 $3,887.35 = 1,805.84P POINT + $2,020.88 CARD + $60.63 처리 수수료</span>
          <strong>카드 실제 출금 $2,020.88</strong>
          <div class="mx7-saving-track" aria-hidden="true"><i></i></div>
        </div>`;
    }

    section8.classList.add('mx8-same-cruise-proof');
    section8.setAttribute('data-membership-section', '8');

    const kicker8 = section8.querySelector('.mv2-kicker');
    const title8 = section8.querySelector('.mv2-title');
    const proofItems = section8.querySelectorAll('.mv2-four > div');
    const proofCopy = [
      'MSC WORLD ASIA',
      '7 nights Western Mediterranean',
      'Barcelona · 2027.01.01',
      'Deluxe Balcony Fantastica · BR2'
    ];

    if (kicker8) kicker8.textContent = '혹시 싼 크루즈라서?';
    if (title8) title8.innerHTML = '아닙니다<br><strong>실제 예약 내용을 그대로 보여드립니다</strong>';
    proofItems.forEach((item, index) => {
      if (proofCopy[index]) item.textContent = proofCopy[index];
    });

    const summary = section8.querySelector('.mx8-summary');
    if (summary) summary.remove();

    if (section6.nextElementSibling !== intro) {
      section6.insertAdjacentElement('afterend', intro);
    }
    if (intro.nextElementSibling !== section7) {
      intro.insertAdjacentElement('afterend', section7);
    }
    if (section7.nextElementSibling !== saving) {
      section7.insertAdjacentElement('afterend', saving);
    }
    if (saving.nextElementSibling !== section8) {
      saving.insertAdjacentElement('afterend', section8);
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

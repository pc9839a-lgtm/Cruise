(() => {
  'use strict';

  function ensureSection(id, className) {
    let section = document.getElementById(id);
    if (!section) {
      section = document.createElement('section');
      section.id = id;
    }
    section.className = className;
    return section;
  }

  function installGuideMediaStyles() {
    if (document.getElementById('mx16-media-style')) return;
    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

  function buildSections14To16() {
    const pointExample = document.getElementById('mx-point-example');
    const calculator = document.getElementById('calculator');
    if (!pointExample || !calculator) return false;

    ['real-cost', 'mx-use-rules', 'mx-point-use'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    const cash = ensureSection('mx-actual-cash', 'mx14-cash-section');
    cash.setAttribute('data-membership-section', '14');
    cash.innerHTML = `
      <div class="mx14-inner">
        <span class="mx14-kicker">실제 예약 결과</span>
        <h2>실제로 나간 돈을<br><strong>두 개로 나눠보면</strong></h2>
        <div class="mx14-equation" aria-label="실제 현금 부담 구성">
          <div><span>POINT를 만들기 위해 낸 금액</span><strong>$1,000</strong></div>
          <i>+</i>
          <div><span>예약 당시 카드 결제</span><strong>$2,020.88</strong></div>
        </div>
      </div>`;

    const cashTotal = ensureSection('mx-actual-cash-total', 'mx14-total-section');
    cashTotal.setAttribute('data-membership-section', '14.5');
    cashTotal.innerHTML = `
      <div class="mx14-total-inner">
        <p class="mx14-total-lead">그래서 제가 실제로 부담한 금액은</p>
        <div class="mx14-total-value">$3,020.88</div>
        <p class="mx14-total-note">처리 수수료 $60.63 별도</p>
      </div>`;

    const proof = ensureSection('mx-booking-proof', 'mx15-proof-section');
    proof.setAttribute('data-membership-section', '15');
    proof.innerHTML = `
      <div class="mx15-inner">
        <h2 class="mx15-question">혹시<br><strong>싼 배를 고른 거 아닐까?</strong></h2>
        <div class="mx15-answer">아닙니다</div>
        <div class="mx15-proof-gallery" aria-label="실제 예약 증빙 이미지">
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/fvmk2pzl5lazua8vnuef.png" alt="실제 예약 증빙 이미지 1"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/j4ippct6ag07tqpifkbj.png" alt="실제 예약 증빙 이미지 2"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/pevn5zoo2fsnxzmqxmh9.png" alt="실제 예약 증빙 이미지 3"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/jhtcfifjkiuvkinguj64.png" alt="실제 예약 증빙 이미지 4"></figure>
        </div>
      </div>`;

    const guide = ensureSection('mx-guide-assist', 'mx16-guide-section mx-bridge-section');
    guide.setAttribute('data-membership-section', '16');
    guide.innerHTML = `
      <div class="mx16-inner">
        <h2 class="mx16-bridge-question">크루즈 처음인데<br><strong>혼자 갈 수 있을까?</strong></h2>
        <div class="mx16-answer">함께 출발할 수도 있습니다</div>
        <div class="mx16-media-slider" aria-label="함께 출발하는 크루즈 이미지 슬라이드">
          <figure class="mx16-media-card" data-image-slot="departure"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>함께 출발</figcaption></figure>
          <figure class="mx16-media-card" data-image-slot="boarding"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>승선</figcaption></figure>
          <figure class="mx16-media-card" data-image-slot="port"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>기항지</figcaption></figure>
          <figure class="mx16-media-card" data-image-slot="travel"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>같이 여행</figcaption></figure>
        </div>
      </div>`;

    if (pointExample.nextElementSibling !== cash) pointExample.insertAdjacentElement('afterend', cash);
    if (cash.nextElementSibling !== cashTotal) cash.insertAdjacentElement('afterend', cashTotal);
    if (cashTotal.nextElementSibling !== proof) cashTotal.insertAdjacentElement('afterend', proof);
    if (proof.nextElementSibling !== guide) proof.insertAdjacentElement('afterend', guide);
    if (guide.nextElementSibling !== calculator) guide.insertAdjacentElement('afterend', calculator);

    installGuideMediaStyles();

    return true;
  }

  function init() {
    installGuideMediaStyles();
    if (buildSections14To16()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections14To16() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

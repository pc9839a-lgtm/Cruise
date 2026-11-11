(() => {
  'use strict';

  function createProof() {
    const point = document.getElementById('membership-point');
    const calculator = document.getElementById('calculator');
    if (!point || !calculator) return false;

    // The point and cash examples are explained in the single receipt above.
    // Preserve the original booking screenshots, not a duplicate multi-screen
    // cash breakdown or a second introductory travel carousel.
    ['mx-point-example', 'mx-actual-cash', 'mx-actual-cash-total', 'mx-guide-assist',
      'real-cost', 'mx-use-rules', 'mx-point-use'].forEach(id => {
      document.getElementById(id)?.remove();
    });

    let proof = document.getElementById('mx-booking-proof');
    if (!proof) {
      proof = document.createElement('section');
      proof.id = 'mx-booking-proof';
    }

    proof.className = 'mx15-proof-section';
    proof.setAttribute('data-membership-section', '15');
    proof.innerHTML = `
      <div class="mx15-inner">
        <h2 class="mx15-question">실제 예약 화면으로<br><strong>확인해 보세요</strong></h2>
        <div class="mx15-proof-gallery" aria-label="실제 예약 증빙 이미지">
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/fvmk2pzl5lazua8vnuef.png" alt="실제 예약 증빙 이미지 1"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/j4ippct6ag07tqpifkbj.png" alt="실제 예약 증빙 이미지 2"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/pevn5zoo2fsnxzmqxmh9.png" alt="실제 예약 증빙 이미지 3"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/jhtcfifjkiuvkinguj64.png" alt="실제 예약 증빙 이미지 4"></figure>
        </div>
      </div>`;

    if (point.nextElementSibling !== proof) point.insertAdjacentElement('afterend', proof);
    if (proof.nextElementSibling !== calculator) proof.insertAdjacentElement('afterend', calculator);
    return true;
  }

  function init() {
    if (createProof()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      if (createProof() || ++tries >= 40) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

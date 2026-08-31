(() => {
  'use strict';

  function init() {
    const compare = document.querySelector('#price-compare');
    if (!compare || document.querySelector('#price-bridge')) return;

    const bridge = document.createElement('section');
    bridge.id = 'price-bridge';
    bridge.innerHTML = `
      <div class="pb-inner">
        <div class="pb-lead">그런데,</div>
        <div class="pb-direct"><strong>해외직구로</strong> 직접 예약하면</div>
        <div class="pb-pair">
          <div class="pb-price old">
            <span>여행사 · 가이드 포함</span>
            <strong>200만원</strong>
          </div>
          <div class="pb-arrow" aria-hidden="true">→</div>
          <div class="pb-price new">
            <span>해외직구로 직접 예약</span>
            <strong>120만원</strong>
          </div>
        </div>
        <div class="pb-diff"><span>1인</span><strong>80만원 차이</strong></div>
      </div>
    `;

    compare.parentNode.insertBefore(bridge, compare);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
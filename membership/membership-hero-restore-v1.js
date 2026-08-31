(() => {
  'use strict';

  function restoreHero() {
    const shell = document.querySelector('.hero-section .hero-shell');
    if (!shell) return;

    shell.innerHTML = `
      <div class="hero-overlay"></div>
      <div class="hero-copy-wrap">
        <h1 class="hero-title reveal reveal-rise">
          이제는 여행도<br />
          <strong>구독 서비스로 갑니다</strong>
        </h1>
      </div>
      <div class="hero-visual-stage reveal reveal-pop" aria-hidden="true">
        <span class="hero-coin coin-a">P</span>
        <span class="hero-coin coin-b">P</span>
        <span class="hero-coin coin-c">P</span>
        <div class="hero-ticket hero-ticket-back">
          <span>전세계 호텔 + 크루즈</span>
          <strong>여행 패스</strong>
        </div>
        <div class="hero-ticket hero-ticket-front">
          <span>크루즈 여행구독</span>
          <strong>$100</strong>
          <em>클래식 기준 200P 적립</em>
        </div>
        <img class="hero-shot hero-shot-a" src="./img/KakaoTalk_20260405_150550057_03.jpg" alt="오션뷰 라운지 사진" />
        <img class="hero-shot hero-shot-b" src="./img/음식및엔터24.png" alt="크루즈 공연 사진" />
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restoreHero, { once:true });
  } else {
    restoreHero();
  }
})();

(() => {
  'use strict';

  function buildSections17And18() {
    const section16 = document.getElementById('mx-use-rules');
    const section17 = document.getElementById('calculator');
    const section18 = document.getElementById('mx-fit-check');
    if (!section16 || !section17 || !section18) return false;

    section17.remove();

    section18.className = 'mx18-fit-section';
    section18.setAttribute('data-membership-section', '18');
    section18.innerHTML = `
      <div class="mx18-inner">
        <span class="mx18-kicker">이제 플랜만 고르면 됩니다</span>
        <h2 class="mx18-title">크루즈를 언제쯤<br><strong>갈 생각인가요?</strong></h2>

        <div class="mx18-grid">
          <article class="mx18-card yes">
            <span>1~2년 안에 갈 생각이 있다</span>
            <strong>PREMIUM</strong>
            <b>$250 → 500P</b>
          </article>
          <article class="mx18-card no">
            <span>가고 싶지만 날짜는 아직 미정</span>
            <strong>CLASSIC</strong>
            <b>$100 → 200P</b>
          </article>
        </div>
      </div>`;

    if (section16.nextElementSibling !== section18) {
      section16.insertAdjacentElement('afterend', section18);
    }

    return true;
  }

  function init() {
    if (buildSections17And18()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections17And18() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

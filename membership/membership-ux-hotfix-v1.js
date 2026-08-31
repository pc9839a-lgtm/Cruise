(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function normalize() {
    const pricePain = $('#price-pain');
    if (pricePain) {
      const kicker = $('.mv2-kicker', pricePain);
      const title = $('.mv2-title', pricePain);
      const mega = $('.mv2-mega', pricePain);
      const save = $('.mv2-save', pricePain);
      if (kicker) kicker.textContent = '4박 5일 아시아 크루즈';
      if (title) title.innerHTML = '<strong>둘이 가면</strong>';
      if (mega) mega.textContent = '400만원';
      if (save) save.innerHTML = '<strong>2명 기준</strong>';
    }

    const conclusion = $('.m2-price-conclusion');
    if (conclusion) conclusion.innerHTML = '<strong>같은 크루즈 · 다른 예약 방식</strong>';

    const visualHead = $('#m2-price-story .m2-visual-head');
    if (visualHead) visualHead.innerHTML = '<span>2명 기준</span><strong>400만원 → 240만원</strong>';

    const same = $('#same-cruise');
    if (same) {
      const kicker = $('.mv2-kicker', same);
      const title = $('.mv2-title', same);
      if (kicker) kicker.textContent = '160만원 차이';
      if (title) title.innerHTML = '<strong>크루즈는 그대로</strong>';
    }

    $$('.mx-chapter-copy p').forEach((el) => el.remove());
    $$('.mx-card span').forEach((el) => el.remove());
    $$('#mx-plan-guide .mx-speed-card p').forEach((el) => el.remove());
    $$('#mx-use-rules .mx-dual-card p').forEach((el) => el.remove());
    $$('#mx-recap .mx-recap-card span').forEach((el) => el.remove());

    document.documentElement.classList.add('membership-ux-fixed');
  }

  function start() {
    let count = 0;
    const run = () => {
      count += 1;
      normalize();
      if (count < 8) setTimeout(run, 180);
    };
    run();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();

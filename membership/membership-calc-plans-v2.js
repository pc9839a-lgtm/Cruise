(() => {
  'use strict';

  if (!window.matchMedia('(max-width: 780px)').matches) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function patchCalculator() {
    const root = $('#calculator');
    if (!root) return;

    const kicker = $('.section-kicker', root);
    const title = $('.section-head h2', root);
    const priceLabel = $('.calculator-head strong', root);
    const general = $('.mode-btn[data-mode="general"]', root);
    const early = $('.mode-btn[data-mode="early"]', root);

    if (kicker) kicker.textContent = 'USD · POINT';
    if (title) title.textContent = '크루즈 가격 계산';
    if (priceLabel) priceLabel.textContent = '크루즈 금액';
    if (general) general.textContent = '일반 예약';
    if (early) early.textContent = '270일+';

    const cruiseUsd = $('#cruiseUsd', root);
    cruiseUsd?.closest('.result-box')?.classList.add('calc-price-dup');

    const pointLabel = $('#pointLabel', root);
    const cashLabel = $('#cashLabel', root);
    const coverage = $('#coverageRatio', root);
    if (pointLabel) pointLabel.textContent = '필요 포인트';
    if (cashLabel) cashLabel.textContent = '카드 결제';
    if (coverage) {
      const box = coverage.closest('.result-box');
      const label = box?.querySelector('span');
      if (label) label.textContent = '총 결제 예시';
    }

    ['#cruiseKrw','#pointKrw','#cashKrw','#coverageText'].forEach((s) => {
      const el = $(s, root);
      if (el) {
        el.textContent = '';
        el.style.display = 'none';
      }
    });

    const syncModeText = () => {
      const desc = $('#modeDescription', root);
      if (!desc) return;
      desc.textContent = early?.classList.contains('active') ? '270일+ · 포인트 활용 확대' : '포인트 + 카드';
    };
    syncModeText();
    $$('.mode-btn', root).forEach((btn) => btn.addEventListener('click', () => setTimeout(syncModeText, 0), { passive: true }));
  }

  function patchPlans() {
    const root = $('#plans');
    if (!root) return;

    const heading = $('.membership-section-head h2', root);
    if (heading) heading.innerHTML = 'CLASSIC<br><strong>PREMIUM</strong>';

    const cards = $('.plan-card', root);
    const data = [
      { cta: 'CLASSIC으로 시작하기' },
      { cta: 'PREMIUM으로 시작하기' }
    ];

    cards.forEach((card, i) => {
      const info = data[i];
      if (!info) return;
      $('.plan-quick', card)?.remove();

      const cta = $('.plan-cta', card);
      if (cta) cta.textContent = info.cta;
    });
  }

  function run() {
    patchCalculator();
    patchPlans();
  }

  let count = 0;
  const timer = setInterval(() => {
    run();
    count += 1;
    if (count > 25) clearInterval(timer);
  }, 180);

  const observer = new MutationObserver(() => run());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 7000);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();

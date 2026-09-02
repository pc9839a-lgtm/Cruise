(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function important(el, prop, value) {
    if (el) el.style.setProperty(prop, value, 'important');
  }

  function buildSavingsUse() {
    const cost = $('#mx-cost-structure');
    if (!cost) return false;

    if (!$('#m3-savings-use')) {
      cost.insertAdjacentHTML('afterend', `
        <section id="m3-savings-use" class="m3-section m3-light">
          <div class="m3-inner">
            <span class="m3-kicker">둘이면 160만원</span>
            <h2>아낀 돈은<br><strong>여행에 다시 쓰면 됩니다</strong></h2>
            <div class="m3-four">
              <div><b>01</b><strong>항공권</strong></div>
              <div><b>02</b><strong>객실 업그레이드</strong></div>
              <div><b>03</b><strong>기항지 투어</strong></div>
              <div><b>04</b><strong>다음 크루즈 예약</strong></div>
            </div>
          </div>
        </section>`);
    }
    return true;
  }

  function buildSelector() {
    const planGuide = $('#mx-plan-guide');
    const plans = $('#plans');
    if (!planGuide || !plans) return false;

    if (!$('#m3-selector')) {
      planGuide.insertAdjacentHTML('afterend', `
        <section id="m3-selector" class="m3-section m3-soft">
          <div class="m3-inner">
            <span class="m3-kicker">마지막 선택</span>
            <h2>내가 매달 낼 금액만<br><strong>고르면 됩니다</strong></h2>
            <div class="m3-select-block m3-select-amount" data-select="amount">
              <div class="m3-buttons">
                <button type="button" data-value="classic"><span>CLASSIC</span><strong>$100 / 월</strong><b>매달 200P</b></button>
                <button type="button" data-value="premium"><span>PREMIUM</span><strong>$250 / 월</strong><b>매달 500P</b></button>
              </div>
            </div>
            <div class="m3-result" aria-live="polite">
              <span>선택한 플랜</span>
              <strong>금액을 선택하세요</strong>
            </div>
          </div>
        </section>`);
    }
    return true;
  }

  function bindSelector() {
    if (document.body.dataset.canonicalSelectorBound === '1') return;
    document.body.dataset.canonicalSelectorBound = '1';

    document.addEventListener('click', (event) => {
      const button = event.target.closest('#m3-selector .m3-buttons button');
      if (!button) return;

      const block = button.closest('[data-select="amount"]');
      if (!block) return;

      $$('.m3-buttons button', block).forEach((item) => item.classList.toggle('active', item === button));

      const result = $('#m3-selector .m3-result strong');
      if (!result) return;

      result.textContent = button.dataset.value === 'premium'
        ? 'PREMIUM 선택'
        : 'CLASSIC 선택';
    });
  }

  function fixSection8() {
    const section = $('#same-cruise');
    if (!section) return;

    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const inner = $('.mv2-inner', section);
    const kicker = $('.mv2-kicker', section);
    const title = $('.mv2-title', section);
    const proof = $('.mv2-four', section);

    important(section, 'background', '#07111f');
    important(section, 'color', '#fff');
    important(section, 'display', 'flex');
    important(section, 'align-items', 'center');
    important(section, 'min-height', mobile ? 'auto' : '96svh');
    important(section, 'padding', mobile ? '122px 0 132px' : '190px 0 210px');

    important(inner, 'width', mobile ? 'calc(100% - 30px)' : 'min(1280px, calc(100% - 80px))');
    important(inner, 'max-width', '1280px');
    important(inner, 'margin', '0 auto');
    important(inner, 'text-align', 'center');

    important(kicker, 'display', 'block');
    important(kicker, 'width', 'auto');
    important(kicker, 'min-height', '0');
    important(kicker, 'margin', mobile ? '0 auto 38px' : '0 auto 58px');
    important(kicker, 'padding', '0');
    important(kicker, 'border', '0');
    important(kicker, 'border-radius', '0');
    important(kicker, 'background', 'transparent');
    important(kicker, 'color', '#fff');
    important(kicker, 'font-size', mobile ? 'clamp(48px, 13vw, 68px)' : 'clamp(74px, 7.4vw, 116px)');
    important(kicker, 'line-height', '.98');
    important(kicker, 'letter-spacing', '-.07em');
    important(kicker, 'font-weight', '950');

    important(title, 'max-width', '920px');
    important(title, 'margin', '0 auto');
    important(title, 'font-size', mobile ? 'clamp(30px, 7.5vw, 42px)' : 'clamp(38px, 3.8vw, 58px)');
    important(title, 'line-height', '1.16');
    important(title, 'letter-spacing', '-.045em');
    important(title, 'color', 'rgba(255,255,255,.92)');
    const titleStrong = $('strong', title);
    important(titleStrong, 'color', '#86d4ff');

    important(proof, 'width', 'min(1080px, 100%)');
    important(proof, 'margin', mobile ? '52px auto 0' : '82px auto 0');
    important(proof, 'display', 'grid');
    important(proof, 'grid-template-columns', 'repeat(2, minmax(0, 1fr))');
    important(proof, 'gap', mobile ? '12px' : '22px');

    $$('.mv2-four > div', section).forEach((item) => {
      important(item, 'min-height', mobile ? '122px' : '184px');
      important(item, 'padding', mobile ? '18px 12px' : '28px 24px');
      important(item, 'border', '1px solid rgba(255,255,255,.15)');
      important(item, 'border-radius', mobile ? '20px' : '26px');
      important(item, 'background', 'rgba(255,255,255,.055)');
      important(item, 'color', '#fff');
      important(item, 'font-size', mobile ? '22px' : 'clamp(28px, 2.5vw, 38px)');
      important(item, 'font-weight', '900');
    });
  }

  function applyLegacyPlanStyles(root) {
    if (!root) return;

    important(root, 'background', '#07111f');
    important(root, 'color', '#fff');
    important(root, 'padding', '150px 0');

    const head = $('.membership-section-head', root);
    const headTitle = $('.membership-section-head h2', root);
    const headCopy = $('.membership-section-head p', root);
    important(headTitle, 'color', '#fff');
    important(headTitle, 'opacity', '1');
    important(headTitle, 'text-shadow', 'none');
    important(headCopy, 'color', 'rgba(255,255,255,.76)');
    important(headCopy, 'opacity', '1');
    if (head) important(head, 'margin-bottom', '64px');

    const grid = $('#planCards', root);
    important(grid, 'width', 'min(1080px, calc(100% - 40px))');
    important(grid, 'max-width', '1080px');
    important(grid, 'margin', '0 auto');
    important(grid, 'gap', '24px');

    $$('.plan-card', root).forEach((card, index) => {
      const premium = index === 1 || card.classList.contains('recommended');
      important(card, 'background', premium ? '#eef4ff' : '#fff');
      important(card, 'color', '#0b1729');
      important(card, 'border', premium ? '2px solid #86b1ff' : '1px solid #d3deeb');
      important(card, 'box-shadow', 'none');

      $$('.plan-name,.plan-price-unit,.plan-top-stats .value,.plan-feature strong,.plan-mobile-summary strong,.plan-mobile-summary span', card).forEach((el) => {
        important(el, 'color', '#0b1729');
        important(el, 'opacity', '1');
      });

      const price = $('.plan-price', card);
      important(price, 'color', premium ? '#2468e8' : '#0b1729');
      important(price, 'opacity', '1');

      const tag = $('.plan-tag', card);
      important(tag, 'color', premium ? '#1657d8' : '#24519c');
      important(tag, 'background', premium ? '#dce9ff' : '#edf3fb');
      important(tag, 'opacity', '1');

      const fit = $('.plan-fit', card);
      important(fit, 'color', '#53657c');
      important(fit, 'opacity', '1');

      $$('.plan-stat .label,.plan-mini-label,.plan-mobile-line em', card).forEach((el) => {
        important(el, 'color', '#53657c');
        important(el, 'opacity', '1');
      });

      $$('.plan-feature', card).forEach((el) => {
        important(el, 'background', '#fff');
        important(el, 'border', '1px solid #d3deeb');
      });

      const monthlyPoint = $('.plan-feature-monthly strong', card);
      important(monthlyPoint, 'color', '#2468e8');

      const cta = $('.plan-cta', card);
      important(cta, 'background', premium ? '#2468e8' : '#07111f');
      important(cta, 'color', '#fff');
      important(cta, 'opacity', '1');
    });
  }

  function fixLegacyPlans() {
    const root = $('#plans');
    if (!root) return;
    applyLegacyPlanStyles(root);

    if (root.dataset.readabilityObserverBound === '1') return;
    root.dataset.readabilityObserverBound = '1';
    const observer = new MutationObserver(() => applyLegacyPlanStyles(root));
    observer.observe(root, { childList: true, subtree: true });
  }

  function fixFinalChoice() {
    const root = $('#mx-final-choice');
    if (!root) return;

    $$('.mx22-plans article', root).forEach((card, index) => {
      important(card, 'background', index === 1 ? 'rgba(134,212,255,.10)' : 'rgba(255,255,255,.06)');
      important(card, 'border', index === 1 ? '1px solid rgba(134,212,255,.38)' : '1px solid rgba(255,255,255,.16)');
      $$('span,strong,b', card).forEach((el) => important(el, 'opacity', '1'));
      important($('span', card), 'color', '#fff');
      important($('strong', card), 'color', '#fff');
      important($('b', card), 'color', '#86d4ff');
    });
  }

  function fixVisuals() {
    fixSection8();
    fixLegacyPlans();
    fixFinalChoice();
  }

  function build() {
    const a = buildSavingsUse();
    const b = buildSelector();
    if (a && b) bindSelector();
    fixVisuals();
    return a && b;
  }

  function init() {
    build();

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      build();
      if (tries >= 30) window.clearInterval(timer);
    }, 160);

    window.addEventListener('resize', fixSection8, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
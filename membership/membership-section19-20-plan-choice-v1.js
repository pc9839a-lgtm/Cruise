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

  function installConversionStyles() {
    if (document.getElementById('mx18-conversion-style')) return;
    /* Styles are served by membership-unified.css; do not inject style tags. */
  }

  function bindBenefitMotion() {
    const benefit = document.getElementById('mx-member-booking-benefits');
    if (!benefit || benefit.dataset.mx18MotionBound === '1') return;
    benefit.dataset.mx18MotionBound = '1';
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      benefit.classList.add('mx18-conversion-active');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        benefit.classList.add('mx18-conversion-active');
        observer.disconnect();
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    observer.observe(benefit);
  }

  function applyLateFlowStyles() {
    const mobile = window.matchMedia('(max-width: 780px)').matches;

    const early = document.getElementById('mx-start-early');
    if (early) {
      early.style.setProperty('box-sizing','border-box');
      early.style.setProperty('width','100%');
      early.style.setProperty('min-height', mobile ? '76svh' : '88svh');
      early.style.setProperty('padding', mobile ? '106px 0 128px' : '150px 0 190px');
      early.style.setProperty('display','flex');
      early.style.setProperty('align-items','center');
      early.style.setProperty('background','#edf2f8');
      early.style.setProperty('text-align','center');
      const inner = early.querySelector('.mx19-inner');
      const q = early.querySelector('.mx19-bridge-question');
      const a = early.querySelector('.mx19-answer');
      if (inner) {
        inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(1180px,calc(100% - 64px))');
        inner.style.setProperty('margin','0 auto');
      }
      if (q) {
        q.style.setProperty('margin','0 auto');
        q.style.setProperty('font-size', mobile ? 'clamp(46px,13vw,60px)' : 'clamp(72px,7vw,96px)');
        q.style.setProperty('line-height','1.04');
        q.style.setProperty('font-weight','950');
      }
      if (a) {
        a.style.setProperty('margin', mobile ? '42px auto 0' : '58px auto 0');
        a.style.setProperty('font-size', mobile ? 'clamp(30px,8.2vw,39px)' : 'clamp(40px,4.3vw,62px)');
        a.style.setProperty('line-height','1.14');
        a.style.setProperty('font-weight','950');
      }
    }

    const proof = document.getElementById('mx-start-early-proof');
    if (proof) {
      proof.style.setProperty('box-sizing','border-box');
      proof.style.setProperty('width','100%');
      proof.style.setProperty('padding', mobile ? '104px 0 132px' : '144px 0 188px');
      proof.style.setProperty('background','#fff');
      proof.style.setProperty('color','#0b1729');
      proof.style.setProperty('text-align','center');
      const inner = proof.querySelector('.mx19-proof-inner');
      const lead = proof.querySelector('.mx19-proof-lead');
      const timeline = proof.querySelector('.mx19-timeline');
      const closing = proof.querySelector('.mx19-closing');
      const note = proof.querySelector('.mx19-note');
      if (inner) {
        inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(980px,calc(100% - 64px))');
        inner.style.setProperty('margin','0 auto');
      }
      if (lead) {
        lead.style.setProperty('margin','0 auto');
        lead.style.setProperty('font-size', mobile ? 'clamp(31px,8vw,40px)' : 'clamp(42px,4.5vw,64px)');
        lead.style.setProperty('line-height','1.12');
        lead.style.setProperty('font-weight','950');
      }
      if (timeline) {
        timeline.style.setProperty('display','grid');
        timeline.style.setProperty('grid-template-columns', mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)');
        timeline.style.setProperty('margin', mobile ? '44px auto 0' : '58px auto 0');
        timeline.style.setProperty('border-block','1px solid #cbd6e3');
        timeline.querySelectorAll('div').forEach((cell) => {
          cell.style.setProperty('padding', mobile ? '22px 8px' : '28px 12px');
          cell.style.setProperty('border-right','1px solid #cbd6e3');
        });
        timeline.querySelectorAll('span').forEach((el) => el.style.setProperty('font-size', mobile ? '16px' : '18px'));
        timeline.querySelectorAll('strong').forEach((el) => {
          el.style.setProperty('display','block');
          el.style.setProperty('margin-top','9px');
          el.style.setProperty('font-size', mobile ? 'clamp(34px,9vw,44px)' : 'clamp(42px,4vw,58px)');
          el.style.setProperty('color','#2468e8');
        });
      }
      if (closing) {
        closing.style.setProperty('margin', mobile ? '46px auto 0' : '58px auto 0');
        closing.style.setProperty('font-size', mobile ? 'clamp(28px,7.5vw,36px)' : 'clamp(34px,3.6vw,50px)');
        closing.style.setProperty('line-height','1.25');
        closing.style.setProperty('font-weight','900');
      }
      if (note) {
        note.style.setProperty('margin','20px auto 0');
        note.style.setProperty('font-size', mobile ? '15px' : '17px');
        note.style.setProperty('line-height','1.5');
      }
    }
  }

  function patchPlanSelection() {
    const plans = document.getElementById('plans');
    if (!plans) return false;

    const kicker = plans.querySelector('.section-kicker');
    const title = plans.querySelector('.membership-section-head h2');
    const subtitle = plans.querySelector('.membership-section-head p');

    if (kicker) kicker.textContent = '멤버십 선택';
    if (title) title.innerHTML = '내 일정에 맞게<br><strong>고르세요</strong>';
    if (subtitle) subtitle.textContent = '';

    const planCards = [...plans.querySelectorAll('.plan-card')];
    if (planCards.length < 2) return false;

    const recommendations = [
      {
        label:'CLASSIC',
        copy:'가볍게 시작',
        join:'$200',
        monthly:'$100',
        startPoints:'350P',
        monthlyPoints:'200P',
        cta:'CLASSIC 시작하기',
        cls:'mx-plan-classic'
      },
      {
        label:'PREMIUM',
        copy:'빠르게 적립',
        join:'$500',
        monthly:'$250',
        startPoints:'800P',
        monthlyPoints:'500P',
        cta:'PREMIUM 시작하기',
        cls:'mx-plan-premium'
      }
    ];

    planCards.slice(0,2).forEach((card, index) => {
      const rec = recommendations[index];
      if (!rec) return;

      card.classList.remove('mx-plan-classic','mx-plan-premium');
      card.classList.add(rec.cls);

      if (card.dataset.mxPlanPatched === '73') return;

      card.querySelectorAll('.mx-plan-recommend,.mx-plan-essentials,.mx-plan-start').forEach((el) => el.remove());

      let badge = document.createElement('div');
      badge.className = 'mx-plan-recommend';
      badge.innerHTML = '<b>'+rec.label+'</b><span>'+rec.copy+'</span>';

      const main = card.querySelector('.plan-main-line');
      if (main) main.before(badge);
      else card.prepend(badge);

      const essentials = document.createElement('div');
      essentials.className = 'mx-plan-essentials';
      essentials.innerHTML =
        '<div class="mx-plan-phase first">' +
          '<div class="mx-plan-phase-head"><strong>처음</strong><span>최초 1회</span></div>' +
          '<div class="mx-plan-pair">' +
            '<div class="mx-plan-pair-item"><small>결제</small><strong>'+rec.join+'</strong></div>' +
            '<div class="mx-plan-arrow">→</div>' +
            '<div class="mx-plan-pair-item points"><small>POINT 적립</small><strong>'+rec.startPoints+'</strong></div>' +
          '</div>' +
          '<p class="mx-plan-phase-note">첫 결제 금액도 POINT로 적립</p>' +
        '</div>' +
        '<div class="mx-plan-phase monthly">' +
          '<div class="mx-plan-phase-head"><strong>이후 매월</strong><span>2배 적립</span></div>' +
          '<div class="mx-plan-pair">' +
            '<div class="mx-plan-pair-item"><small>월 결제</small><strong>'+rec.monthly+'</strong></div>' +
            '<div class="mx-plan-arrow">→</div>' +
            '<div class="mx-plan-pair-item points"><small>매월 POINT</small><strong>'+rec.monthlyPoints+'</strong></div>' +
          '</div>' +
          '<p class="mx-plan-phase-note">매월 결제액의 2배 POINT 적립</p>' +
        '</div>';

      if (main) main.insertAdjacentElement('afterend', essentials);
      else badge.insertAdjacentElement('afterend', essentials);

      const cta = card.querySelector('.plan-cta');
      if (cta) cta.textContent = rec.cta;

      card.dataset.mxPlanPatched = '73';
    });

    return true;
  }

  function bindPlanRepair() {
    const plans = document.getElementById('plans');
    const wrap = plans?.querySelector('#planCards') || plans;
    if (!wrap || wrap.dataset.mxPlanRepairBound === '1') return;

    wrap.dataset.mxPlanRepairBound = '1';
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        patchPlanSelection();
      });
    });
    observer.observe(wrap,{childList:true,subtree:true});

    [0,120,300,700,1400,2600,4500].forEach((delay) => {
      window.setTimeout(patchPlanSelection,delay);
    });
  }

  function buildSections18To20() {
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    if (!calculator || !plans) return false;

    ['mx-plan-guide','m3-selector','mx-fit-check'].forEach((id) => document.getElementById(id)?.remove());

    document.getElementById('mx-membership-optional')?.remove();

    const memberBenefits = ensureSection('mx-member-booking-benefits','mx18-benefit-section');
    memberBenefits.setAttribute('data-membership-section','18.5');
    memberBenefits.innerHTML = `
      <div class="mx18-benefit-inner">
        <h2 class="mx18-benefit-title">같은 크루즈<br><strong>회원이 더 적게 냅니다</strong></h2>

        <div class="mx18-benefit-cards" aria-label="회원 혜택 흐름">
          <article class="mx18-benefit-card">
            <span class="mx18-step">01</span>
            <strong>낸 금액이 쌓이고</strong>
            <p>여행에 쓸 POINT가 됩니다</p>
          </article>
          <article class="mx18-benefit-card">
            <span class="mx18-step">02</span>
            <strong>회원 혜택가로 예약하고</strong>
            <p>쌓아둔 POINT를 함께 씁니다</p>
          </article>
          <article class="mx18-benefit-card mx18-benefit-result">
            <span class="mx18-step">RESULT</span>
            <strong>현금 부담이 줄어듭니다</strong>
            <p>같은 크루즈도 회원이 더 적게 냅니다</p>
          </article>
          <div class="mx18-proof-strip" aria-label="실제 예약 숫자">
            <div><span>예약 총액</span><strong>$3,887.35</strong></div>
            <div><span>사용 POINT</span><strong>1,805.84P</strong></div>
            <div class="accent"><span>실제 카드 결제</span><strong>$2,020.88</strong></div>
          </div>
        </div>

        <a class="mx18-benefit-cta" href="#plans">CLASSIC · PREMIUM 비교하기 <b>→</b></a>
      </div>`;

    document.getElementById('mx-start-early')?.remove();
    document.getElementById('mx-start-early-proof')?.remove();

    plans.setAttribute('data-membership-section','20');
    patchPlanSelection();

    if (calculator.nextElementSibling !== memberBenefits) calculator.insertAdjacentElement('afterend', memberBenefits);
    if (memberBenefits.nextElementSibling !== plans) memberBenefits.insertAdjacentElement('afterend', plans);

    installConversionStyles();
    applyLateFlowStyles();
    bindBenefitMotion();
    patchPlanSelection();
    bindPlanRepair();
    if (document.body.dataset.lateFlowResizeBound !== '1') {
      document.body.dataset.lateFlowResizeBound = '1';
      window.addEventListener('resize', applyLateFlowStyles, { passive:true });
    }
    return true;
  }

  function init() {
    installConversionStyles();
    if (buildSections18To20()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections18To20() || tries >= 45) window.clearInterval(timer);
    },160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();

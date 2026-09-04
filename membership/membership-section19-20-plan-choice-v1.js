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
    const style = document.createElement('style');
    style.id = 'mx18-conversion-style';
    style.textContent = `
      #mx-member-booking-benefits{
        position:relative!important;
        box-sizing:border-box!important;
        width:100%!important;
        margin:0!important;
        padding:112px 0 126px!important;
        overflow:hidden!important;
        background:
          radial-gradient(circle at 50% 0%,rgba(71,154,255,.18),transparent 36%),
          linear-gradient(180deg,#0c2443 0%,#102f57 56%,#0b2545 100%)!important;
        color:#fff!important;
        text-align:center!important;
        font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;
      }
      #mx-member-booking-benefits::before{
        content:'';position:absolute;left:50%;top:-180px;width:560px;height:560px;border-radius:50%;
        transform:translateX(-50%);background:rgba(73,163,255,.08);filter:blur(90px);pointer-events:none;
      }
      #mx-member-booking-benefits .mx18-benefit-inner{
        position:relative;z-index:1;box-sizing:border-box;width:min(1120px,calc(100% - 64px));margin:0 auto;
      }
      #mx-member-booking-benefits .mx18-benefit-title{
        max-width:920px;margin:0 auto;font-size:clamp(54px,5.8vw,82px);line-height:1.06;letter-spacing:-.06em;
        font-weight:950;word-break:keep-all;color:#fff;
      }
      #mx-member-booking-benefits .mx18-benefit-title strong{color:#83d7ff;font-weight:950}
      #mx-member-booking-benefits .mx18-benefit-cards{
        width:min(980px,100%);margin:64px auto 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;
      }
      #mx-member-booking-benefits .mx18-benefit-card{
        position:relative;min-height:230px;padding:30px 28px;border:1px solid rgba(157,211,255,.18);border-radius:28px;
        background:linear-gradient(180deg,rgba(255,255,255,.085),rgba(255,255,255,.045));
        box-shadow:0 24px 54px rgba(1,12,31,.18);text-align:left;overflow:visible;
        opacity:0;transform:translateY(34px) scale(.965);filter:blur(4px);
        transition:opacity .62s ease,transform .82s cubic-bezier(.16,1,.3,1),filter .62s ease,border-color .3s ease,background .3s ease;
      }
      #mx-member-booking-benefits .mx18-benefit-card:nth-child(2){transition-delay:110ms}
      #mx-member-booking-benefits .mx18-benefit-card:nth-child(3){transition-delay:220ms}
      #mx-member-booking-benefits .mx18-benefit-result{
        grid-column:1/-1;min-height:210px;padding:40px 36px;text-align:center;
        background:linear-gradient(135deg,rgba(43,123,255,.28),rgba(114,207,255,.13));
        border-color:rgba(131,215,255,.48);box-shadow:0 24px 68px rgba(20,106,236,.20);
        transform:translateY(34px) scale(.94);
      }
      #mx-member-booking-benefits .mx18-benefit-result .mx18-step{
        background:#83d7ff;border-color:#83d7ff;color:#0b2746;
      }
      #mx-member-booking-benefits .mx18-benefit-result>strong{
        margin-top:22px;font-size:clamp(38px,4.2vw,58px);line-height:1.04;text-align:center;color:#fff;
      }
      #mx-member-booking-benefits .mx18-benefit-result>p{
        margin:16px auto 0;color:#aee3ff;font-size:clamp(19px,2vw,25px);font-weight:900;text-align:center;
      }
      #mx-member-booking-benefits .mx18-proof-strip{
        grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;
        margin-top:2px;border:1px solid rgba(131,215,255,.24);border-radius:20px;overflow:hidden;background:rgba(4,20,42,.28);
        opacity:0;transform:translateY(20px);transition:opacity .62s ease .34s,transform .76s cubic-bezier(.16,1,.3,1) .34s;
      }
      #mx-member-booking-benefits.mx18-conversion-active .mx18-proof-strip{opacity:1;transform:none}
      #mx-member-booking-benefits .mx18-proof-strip>div{padding:20px 12px;text-align:center}
      #mx-member-booking-benefits .mx18-proof-strip>div+div{border-left:1px solid rgba(131,215,255,.18)}
      #mx-member-booking-benefits .mx18-proof-strip span{display:block;color:#91a8c0;font-size:13px;font-weight:850}
      #mx-member-booking-benefits .mx18-proof-strip strong{display:block;margin-top:7px;color:#fff;font-size:clamp(24px,2.5vw,34px);line-height:1;font-weight:950}
      #mx-member-booking-benefits .mx18-proof-strip .accent strong{color:#83d7ff}
      #mx-member-booking-benefits.mx18-conversion-active .mx18-benefit-card{opacity:1;transform:none;filter:none}
      #mx-member-booking-benefits .mx18-step{
        display:inline-flex;align-items:center;justify-content:center;min-width:48px;height:30px;padding:0 11px;border-radius:999px;
        background:rgba(131,215,255,.13);border:1px solid rgba(131,215,255,.22);color:#83d7ff;font-size:14px;font-weight:950;letter-spacing:.04em;
      }
      #mx-member-booking-benefits .mx18-benefit-card>strong{
        display:block;margin-top:24px;color:#fff;font-size:clamp(27px,2.5vw,36px);line-height:1.1;letter-spacing:-.045em;font-weight:950;word-break:keep-all;
      }
      #mx-member-booking-benefits .mx18-benefit-card>p{
        margin:14px 0 0;color:#b9c9dc;font-size:17px;line-height:1.45;font-weight:760;word-break:keep-all;
      }
      #mx-member-booking-benefits .mx18-benefit-conclusion{
        width:min(900px,100%);margin:82px auto 0;padding:58px 24px 0;border-top:1px solid rgba(149,194,236,.22);
        opacity:0;transform:translateY(24px);transition:opacity .65s ease .34s,transform .78s cubic-bezier(.16,1,.3,1) .34s;
      }
      #mx-member-booking-benefits.mx18-conversion-active .mx18-benefit-conclusion{opacity:1;transform:none}
      #mx-member-booking-benefits .mx18-benefit-conclusion>span{
        display:block;color:#8fa9c5;font-size:18px;font-weight:900;letter-spacing:-.03em;
      }
      #mx-member-booking-benefits .mx18-benefit-conclusion>p{
        margin:14px auto 0;color:#fff;font-size:clamp(36px,4vw,56px);line-height:1.12;letter-spacing:-.05em;font-weight:950;word-break:keep-all;
      }
      #mx-member-booking-benefits .mx18-benefit-conclusion strong{color:#83d7ff;font-weight:950}
      #mx-member-booking-benefits .mx18-benefit-cta{
        position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:12px;
        width:min(440px,100%);min-height:64px;margin:38px auto 0;padding:0 28px;border-radius:19px;
        background:linear-gradient(135deg,#2a67df,#3c8cff);color:#fff;text-decoration:none;font-size:20px;font-weight:950;letter-spacing:-.035em;
        box-shadow:0 16px 40px rgba(22,109,236,.30);opacity:0;transform:translateY(18px) scale(.97);
        transition:opacity .55s ease .5s,transform .72s cubic-bezier(.16,1,.3,1) .5s,box-shadow .2s ease;
      }
      #mx-member-booking-benefits.mx18-conversion-active .mx18-benefit-cta{opacity:1;transform:none}
      #mx-member-booking-benefits .mx18-benefit-cta::before{
        content:'';position:absolute;inset:0 auto 0 -36%;width:28%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.24),transparent);transform:skewX(-18deg);animation:mx18CtaShine 3.8s ease-in-out infinite;
      }
      #mx-member-booking-benefits .mx18-benefit-cta b{font-size:23px;line-height:1;animation:mx18Arrow 1.15s ease-in-out infinite}
      #mx-member-booking-benefits .mx18-benefit-cta:active{transform:scale(.985)!important}
      @keyframes mx18Arrow{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
      @keyframes mx18CtaShine{0%,60%{left:-36%;opacity:0}68%{opacity:1}84%,100%{left:122%;opacity:0}}

      @media(max-width:780px){
        #mx-member-booking-benefits{
          padding:76px 0 88px!important;
          background:
            radial-gradient(circle at 50% 0%,rgba(78,166,255,.22),transparent 29%),
            linear-gradient(180deg,#0b2443 0%,#12365f 54%,#0d294b 100%)!important;
        }
        #mx-member-booking-benefits .mx18-benefit-inner{width:calc(100% - 34px)}
        #mx-member-booking-benefits .mx18-benefit-title{
          max-width:430px;font-size:clamp(42px,11.8vw,54px);line-height:1.045;letter-spacing:-.065em;
        }
        #mx-member-booking-benefits .mx18-benefit-cards{
          margin-top:44px;grid-template-columns:1fr;gap:34px;
        }
        #mx-member-booking-benefits .mx18-benefit-card{
          min-height:0;padding:25px 22px 27px;border-radius:24px;box-shadow:0 18px 38px rgba(1,12,31,.22);
        }
        #mx-member-booking-benefits .mx18-benefit-card:not(:last-child)::after{
          content:'↓';position:absolute;left:50%;bottom:-29px;transform:translateX(-50%);color:#6f9dcc;font-size:22px;font-weight:900;
        }
        #mx-member-booking-benefits .mx18-step{height:28px;min-width:44px;font-size:13px}
        #mx-member-booking-benefits .mx18-benefit-card>strong{
          margin-top:20px;font-size:clamp(28px,7.5vw,34px);line-height:1.08;
        }
        #mx-member-booking-benefits .mx18-benefit-card>p{
          margin-top:10px;font-size:16px;line-height:1.4;
        }
        #mx-member-booking-benefits .mx18-benefit-result{
          grid-column:auto;min-height:210px;padding:30px 20px 32px;border-radius:26px;
          box-shadow:0 22px 56px rgba(20,106,236,.24);
        }
        #mx-member-booking-benefits .mx18-benefit-result>strong{
          margin-top:20px;font-size:clamp(34px,9.5vw,44px);line-height:1.05;
        }
        #mx-member-booking-benefits .mx18-benefit-result>p{
          margin-top:14px;font-size:clamp(18px,5vw,22px);line-height:1.25;
        }
        #mx-member-booking-benefits .mx18-proof-strip{grid-template-columns:repeat(3,minmax(0,1fr));border-radius:16px}
        #mx-member-booking-benefits .mx18-proof-strip>div{padding:15px 5px}
        #mx-member-booking-benefits .mx18-proof-strip span{font-size:10px;line-height:1.25}
        #mx-member-booking-benefits .mx18-proof-strip strong{margin-top:6px;font-size:clamp(19px,5.8vw,25px)}
        #mx-member-booking-benefits .mx18-benefit-conclusion{
          margin-top:66px;padding:46px 4px 0;
        }
        #mx-member-booking-benefits .mx18-benefit-conclusion>span{font-size:16px}
        #mx-member-booking-benefits .mx18-benefit-conclusion>p{
          margin-top:12px;font-size:clamp(34px,9.3vw,43px);line-height:1.1;
        }
        #mx-member-booking-benefits .mx18-benefit-cta{
          width:100%;min-height:60px;margin-top:32px;border-radius:18px;font-size:19px;
        }
      }
      #plans .mx-plan-recommend{
        display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;
        margin:0 0 16px!important;padding:10px 12px!important;border-radius:10px!important;background:#edf4ff!important;color:#17345d!important;
      }
      #plans .mx-plan-recommend b{font-size:13px!important;color:#2468e8!important;font-weight:950!important}
      #plans .mx-plan-recommend span{font-size:12px!important;color:#607089!important;font-weight:850!important}
      @media(max-width:780px){
        #plans .mx-plan-recommend{margin-bottom:13px!important;padding:9px 10px!important}
        #plans .mx-plan-recommend b{font-size:12px!important}
        #plans .mx-plan-recommend span{font-size:11px!important}
      }
      @media(prefers-reduced-motion:reduce){
        #mx-member-booking-benefits .mx18-benefit-card,
        #mx-member-booking-benefits .mx18-benefit-conclusion,
        #mx-member-booking-benefits .mx18-benefit-cta{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
        #mx-member-booking-benefits .mx18-benefit-cta::before,
        #mx-member-booking-benefits .mx18-benefit-cta b{animation:none!important}
      }
    `;
    document.head.appendChild(style);
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

  function buildSections18To20() {
    const calculator = document.getElementById('calculator');
    const plans = document.getElementById('plans');
    if (!calculator || !plans) return false;

    ['mx-plan-guide','m3-selector','mx-fit-check'].forEach((id) => document.getElementById(id)?.remove());

    const optional = ensureSection('mx-membership-optional','mx18-optional-section mx-core-bridge');
    optional.setAttribute('data-membership-section','18');
    optional.innerHTML = `
      <div class="mx18-inner">
        <h2 class="mx18-bridge-question">꼭<br><strong>회원이어야 하나요?</strong></h2>
        <p class="mx18-answer">크루즈 여행 자체는<br><strong>회원이 아니어도 가능합니다</strong></p>
      </div>`;

    const memberBenefits = ensureSection('mx-member-booking-benefits','mx18-benefit-section');
    memberBenefits.setAttribute('data-membership-section','18.5');
    memberBenefits.innerHTML = `
      <div class="mx18-benefit-inner">
        <h2 class="mx18-benefit-title">결국<br><strong>회원이 더 적게 냅니다</strong></h2>

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

        <div class="mx18-benefit-conclusion">
          <span>최저가 크루즈로 예약하려면</span>
          <p><strong>회원으로 시작하면 됩니다</strong></p>
        </div>

        <a class="mx18-benefit-cta" href="#plans">내게 맞는 플랜 보기 <b>→</b></a>
      </div>`;

    document.getElementById('mx-start-early')?.remove();
    document.getElementById('mx-start-early-proof')?.remove();

    plans.setAttribute('data-membership-section','20');
    const kicker = plans.querySelector('.section-kicker');
    const title = plans.querySelector('.membership-section-head h2');
    if (kicker) kicker.textContent = '플랜 선택';
    if (title) title.innerHTML = '준비 속도에 맞춰<br><strong>둘 중 하나만 고르면 됩니다</strong>';

    const planCards = [...plans.querySelectorAll('.plan-card')];
    const recommendations = [
      { label:'CLASSIC 추천', copy:'여유 있게 준비' },
      { label:'PREMIUM 추천', copy:'빠르게 더 많이 적립' }
    ];
    planCards.forEach((card, index) => {
      const rec = recommendations[index];
      if (!rec) return;
      let badge = card.querySelector('.mx-plan-recommend');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'mx-plan-recommend';
        card.prepend(badge);
      }
      badge.innerHTML = '<b>'+rec.label+'</b><span>'+rec.copy+'</span>';
    });

    if (calculator.nextElementSibling !== optional) calculator.insertAdjacentElement('afterend', optional);
    if (optional.nextElementSibling !== memberBenefits) optional.insertAdjacentElement('afterend', memberBenefits);
    if (memberBenefits.nextElementSibling !== plans) memberBenefits.insertAdjacentElement('afterend', plans);

    installConversionStyles();
    applyLateFlowStyles();
    bindBenefitMotion();
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

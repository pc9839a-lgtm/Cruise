(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  function after(target, html) {
    if (target) target.insertAdjacentHTML('afterend', html);
  }

  function before(target, html) {
    if (target) target.insertAdjacentHTML('beforebegin', html);
  }

  function buildScaffold() {
    const reviewFlow = $('.review-flow-section');
    const sameCruise = $('#same-cruise');
    const membershipPoint = $('#membership-point');
    const calculator = $('#calculator');
    const plans = $('#plans');
    const terms = $('#membership-terms');

    if (!reviewFlow || !sameCruise || !membershipPoint || !calculator || !plans || !terms) return false;

    if (!$('#membership-v3-section04-style')) {
      const style = document.createElement('style');
      style.id = 'membership-v3-section04-style';
      style.textContent = `
        #mx-moving-hotel.membership-v3-price-question{
          position:relative!important;
          width:100%!important;
          margin:0!important;
          padding:150px 0 176px!important;
          overflow:hidden!important;
          background:
            radial-gradient(circle at 50% 10%,rgba(65,132,255,.17),transparent 38%),
            linear-gradient(180deg,#07111f 0%,#0b1d34 100%)!important;
          color:#fff!important;
          text-align:center!important;
          font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;
        }
        #mx-moving-hotel.membership-v3-price-question::after{
          content:'';position:absolute;left:50%;bottom:0;width:min(900px,82vw);height:1px;transform:translateX(-50%);
          background:linear-gradient(90deg,transparent,rgba(142,190,255,.32),transparent);
        }
        #mx-moving-hotel .membership-v3-price-inner{
          position:relative;z-index:1;width:min(980px,calc(100% - 48px));margin:0 auto;
        }
        #mx-moving-hotel .membership-v3-price-kicker{
          display:inline-block;margin:0 0 26px;color:#8fc2ff;font-size:16px;font-weight:900;letter-spacing:.08em;
        }
        #mx-moving-hotel .membership-v3-price-title{
          margin:0 auto;color:#fff;font-size:clamp(58px,6.7vw,92px)!important;line-height:1.03!important;
          letter-spacing:-.065em!important;font-weight:950!important;word-break:keep-all;
        }
        #mx-moving-hotel .membership-v3-price-title strong{color:#8ec7ff;font-weight:950}
        #mx-moving-hotel .membership-v3-price-facts{
          display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px 16px;
          margin:48px auto 0;color:#fff;font-size:clamp(22px,2.5vw,30px);font-weight:900;letter-spacing:-.04em;
        }
        #mx-moving-hotel .membership-v3-price-facts i{color:#587494;font-style:normal;font-weight:700}
        #mx-moving-hotel .membership-v3-price-next{
          margin:34px auto 0!important;color:#aebed2!important;font-size:clamp(18px,2vw,22px)!important;
          line-height:1.45!important;font-weight:760!important;word-break:keep-all;
        }
        @media(max-width:780px){
          #mx-moving-hotel.membership-v3-price-question{padding:104px 0 124px!important}
          #mx-moving-hotel .membership-v3-price-inner{width:calc(100% - 32px)}
          #mx-moving-hotel .membership-v3-price-kicker{margin-bottom:20px;font-size:13px}
          #mx-moving-hotel .membership-v3-price-title{
            max-width:430px;font-size:clamp(42px,12vw,54px)!important;line-height:1.04!important;
          }
          #mx-moving-hotel .membership-v3-price-facts{
            max-width:390px;margin-top:36px;gap:8px 10px;font-size:clamp(19px,5.5vw,24px);
          }
          #mx-moving-hotel .membership-v3-price-next{
            max-width:360px;margin-top:28px!important;font-size:17px!important;line-height:1.45!important;
          }
        }
        @media(prefers-reduced-motion:reduce){
          #mx-moving-hotel.membership-v3-price-question *{transition:none!important;animation:none!important}
        }
      `;
      document.head.appendChild(style);
    }

    if (!$('#mx-moving-hotel')) {
      after(reviewFlow, `
        <section id="mx-moving-hotel" class="membership-v3-price-question" data-membership-section="04" aria-labelledby="membership-v3-price-title">
          <div class="membership-v3-price-inner">
            <span class="membership-v3-price-kicker">MSC WORLD ASIA · BALCONY</span>
            <h2 id="membership-v3-price-title" class="membership-v3-price-title">둘이 크루즈 가면<br><strong>얼마 정도 들까요?</strong></h2>
            <div class="membership-v3-price-facts" aria-label="가격 질문 기준 여행 조건">
              <span>MSC World Asia</span><i>·</i><span>발코니</span><i>·</i><span>2명</span><i>·</i><span>7박 8일</span>
            </div>
            <p class="membership-v3-price-next">예약 방법에 따라 같은 여행도 금액이 달라집니다.</p>
          </div>
        </section>`);
    }

    if (!$('#mx-cost-structure')) {
      after(sameCruise, `
        <section id="mx-cost-structure" class="mx-expand-section mx-soft">
          <div class="mx-inner mx-center">
            <span class="mx-eyebrow">그럼 80만원은 왜 차이 나는데?</span>
            <h2 class="mx-title">차이는<br><strong>중간 마진에서 생깁니다</strong></h2>
            <p class="mx-sub">직접 할 수 있다면 꼭 전부 살 필요는 없습니다.</p>
            <div class="mx-card-grid">
              <article class="mx-card"><b>01</b><strong>가이드</strong></article>
              <article class="mx-card"><b>02</b><strong>단체 이동</strong></article>
              <article class="mx-card"><b>03</b><strong>예약 대행</strong></article>
              <article class="mx-card"><b>04</b><strong>패키지 운영</strong></article>
            </div>
          </div>
        </section>`);
    }

    if (!$('#mx-prepare-money')) before(membershipPoint, '<section id="mx-prepare-money"></section>');
    if (!$('#mx-use-rules')) after(calculator, '<section id="mx-use-rules"></section>');

    if (!$('#mx-fit-check')) before(plans, '<section id="mx-fit-check"></section>');
    if (!$('#mx-plan-guide')) before(plans, '<section id="mx-plan-guide"></section>');

    if (!$('#mx-final-choice')) after(terms, '<section id="mx-final-choice"></section>');

    return true;
  }

  function init() {
    if (buildScaffold()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildScaffold() || tries >= 40) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
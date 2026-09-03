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

  function installGuideMediaStyles() {
    if (document.getElementById('mx16-media-style')) return;
    const style = document.createElement('style');
    style.id = 'mx16-media-style';
    style.textContent = `
      #mx-guide-assist .mx16-inner{width:min(1180px,calc(100% - 48px))!important;margin:0 auto!important;text-align:center!important}
      #mx-guide-assist .mx16-answer{margin-top:34px!important;font-size:clamp(28px,3.2vw,44px)!important;line-height:1.15!important;font-weight:950!important;color:#7fd1ff!important}
      #mx-guide-assist .mx16-support{display:none!important}
      #mx-guide-assist .mx16-flow{display:none!important}
      #mx-guide-assist .mx16-media-slider{
        width:min(1120px,100%)!important;
        margin:58px auto 0!important;
        display:grid!important;
        grid-template-columns:repeat(4,minmax(0,1fr))!important;
        gap:16px!important;
      }
      #mx-guide-assist .mx16-media-card{
        position:relative!important;
        min-width:0!important;
        aspect-ratio:4/5!important;
        margin:0!important;
        border-radius:24px!important;
        overflow:hidden!important;
        background:linear-gradient(145deg,#1a3b64,#0d2748)!important;
        border:1px solid rgba(255,255,255,.15)!important;
        box-shadow:0 18px 46px rgba(0,0,0,.2)!important;
        scroll-snap-align:center!important;
      }
      #mx-guide-assist .mx16-media-slot{
        position:absolute!important;
        inset:0!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        background:
          radial-gradient(circle at 50% 38%,rgba(127,209,255,.14),transparent 42%),
          linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,0))!important;
      }
      #mx-guide-assist .mx16-media-slot::before{
        content:'+'!important;
        display:grid!important;
        place-items:center!important;
        width:54px!important;
        height:54px!important;
        border-radius:50%!important;
        border:1px solid rgba(255,255,255,.32)!important;
        color:rgba(255,255,255,.7)!important;
        font-size:30px!important;
        font-weight:300!important;
      }
      #mx-guide-assist .mx16-media-card figcaption{
        position:absolute!important;
        left:16px!important;
        right:16px!important;
        bottom:16px!important;
        z-index:2!important;
        padding:10px 12px!important;
        border-radius:12px!important;
        background:rgba(5,20,40,.62)!important;
        backdrop-filter:blur(8px)!important;
        -webkit-backdrop-filter:blur(8px)!important;
        color:#fff!important;
        font-size:16px!important;
        line-height:1.1!important;
        font-weight:900!important;
        text-align:center!important;
      }
      html.membership-motion-enabled #mx-guide-assist.m-motion-section:not(.section-active) .mx16-media-card{
        opacity:0!important;
        transform:translateY(36px) scale(.95)!important;
        filter:blur(4px)!important;
      }
      html.membership-motion-enabled #mx-guide-assist.m-motion-section.section-active .mx16-media-card{
        opacity:1!important;
        transform:none!important;
        filter:none!important;
        transition:opacity .65s ease,transform .95s cubic-bezier(.16,1,.3,1),filter .65s ease!important;
      }
      html.membership-motion-enabled #mx-guide-assist.m-motion-section.section-active .mx16-media-card:nth-child(1){transition-delay:.16s!important}
      html.membership-motion-enabled #mx-guide-assist.m-motion-section.section-active .mx16-media-card:nth-child(2){transition-delay:.25s!important}
      html.membership-motion-enabled #mx-guide-assist.m-motion-section.section-active .mx16-media-card:nth-child(3){transition-delay:.34s!important}
      html.membership-motion-enabled #mx-guide-assist.m-motion-section.section-active .mx16-media-card:nth-child(4){transition-delay:.43s!important}
      @media(max-width:780px){
        #mx-guide-assist .mx16-inner{width:100%!important}
        #mx-guide-assist .mx16-bridge-question{padding:0 20px!important}
        #mx-guide-assist .mx16-answer{padding:0 20px!important;margin-top:24px!important;font-size:29px!important}
        #mx-guide-assist .mx16-media-slider{
          display:flex!important;
          width:auto!important;
          gap:14px!important;
          margin:42px 0 0!important;
          padding:4px 18px 28px!important;
          overflow-x:auto!important;
          scroll-snap-type:x mandatory!important;
          scroll-padding-inline:18px!important;
          -webkit-overflow-scrolling:touch!important;
          scrollbar-width:none!important;
        }
        #mx-guide-assist .mx16-media-slider::-webkit-scrollbar{display:none!important}
        #mx-guide-assist .mx16-media-card{
          flex:0 0 min(78vw,330px)!important;
          width:min(78vw,330px)!important;
          border-radius:20px!important;
        }
        #mx-guide-assist .mx16-media-card figcaption{left:13px!important;right:13px!important;bottom:13px!important;font-size:15px!important}
      }
      @media(prefers-reduced-motion:reduce){
        #mx-guide-assist .mx16-media-card{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function applyCashSplitStyles() {
    const total = document.getElementById('mx-actual-cash-total');
    if (!total) return;
    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const inner = total.querySelector('.mx14-total-inner');
    const lead = total.querySelector('.mx14-total-lead');
    const value = total.querySelector('.mx14-total-value');
    const note = total.querySelector('.mx14-total-note');

    total.style.setProperty('padding', mobile ? '96px 0 116px' : '150px 0 170px');
    if (inner) inner.style.setProperty('width', mobile ? 'calc(100% - 34px)' : 'min(1180px,calc(100% - 64px))');
    if (lead) lead.style.setProperty('font-size', mobile ? '21px' : 'clamp(24px,2.4vw,34px)');
    if (value) value.style.setProperty('font-size', mobile ? 'clamp(56px,16vw,76px)' : 'clamp(88px,10vw,154px)');
    if (note) note.style.setProperty('font-size', mobile ? '13px' : '16px');
  }

  function buildSections14To16() {
    const pointExample = document.getElementById('mx-point-example');
    const calculator = document.getElementById('calculator');
    if (!pointExample || !calculator) return false;

    ['real-cost', 'mx-use-rules', 'mx-point-use'].forEach((id) => {
      const duplicate = document.getElementById(id);
      if (duplicate) duplicate.remove();
    });

    const cash = ensureSection('mx-actual-cash', 'mx14-cash-section');
    cash.setAttribute('data-membership-section', '14');
    cash.innerHTML = `
      <div class="mx14-inner">
        <span class="mx14-kicker">실제 예약 결과</span>
        <h2>실제로 나간 돈을<br><strong>두 개로 나눠보면</strong></h2>
        <div class="mx14-equation" aria-label="실제 현금 부담 구성" style="grid-template-columns:1fr auto 1fr!important;max-width:860px!important;">
          <div><span>POINT를 만들기 위해 낸 금액</span><strong>$1,000</strong></div>
          <i>+</i>
          <div><span>예약 당시 카드 결제</span><strong>$2,020.88</strong></div>
        </div>
      </div>`;

    const cashTotal = ensureSection('mx-actual-cash-total', 'mx14-total-section');
    cashTotal.setAttribute('data-membership-section', '14.5');
    cashTotal.setAttribute('style', 'box-sizing:border-box;width:100%;margin:0;padding:150px 0 170px;background:#07111f;color:#fff;text-align:center;overflow:hidden;font-family:Pretendard,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;');
    cashTotal.innerHTML = `
      <div class="mx14-total-inner" style="box-sizing:border-box;width:min(1180px,calc(100% - 64px));margin:0 auto;">
        <p class="mx14-total-lead" style="margin:0;font-size:clamp(24px,2.4vw,34px);line-height:1.35;font-weight:900;color:#c8d3df;">그래서 제가 실제로 부담한 금액은</p>
        <div class="mx14-total-value" style="margin:28px auto 0;font-size:clamp(88px,10vw,154px);line-height:.94;letter-spacing:-.06em;font-weight:950;color:#86d4ff;">$3,020.88</div>
        <p class="mx14-total-note" style="margin:30px auto 0;font-size:16px;line-height:1.5;font-weight:800;color:#8fa0b4;">처리 수수료 $60.63 별도</p>
      </div>`;

    const proof = ensureSection('mx-booking-proof', 'mx15-proof-section');
    proof.setAttribute('data-membership-section', '15');
    proof.innerHTML = `
      <div class="mx15-inner">
        <h2 class="mx15-question">혹시<br><strong>싼 배를 고른 거 아닐까?</strong></h2>
        <div class="mx15-answer">아닙니다</div>
        <div class="mx15-proof-gallery" aria-label="실제 예약 증빙 이미지">
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/fvmk2pzl5lazua8vnuef.png" alt="실제 예약 증빙 이미지 1"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/j4ippct6ag07tqpifkbj.png" alt="실제 예약 증빙 이미지 2"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/pevn5zoo2fsnxzmqxmh9.png" alt="실제 예약 증빙 이미지 3"></figure>
          <figure class="mx15-proof-shot"><img loading="lazy" decoding="async" width="1122" height="1402" src="https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/jhtcfifjkiuvkinguj64.png" alt="실제 예약 증빙 이미지 4"></figure>
        </div>
      </div>`;

    const guide = ensureSection('mx-guide-assist', 'mx16-guide-section mx-bridge-section');
    guide.setAttribute('data-membership-section', '16');
    guide.innerHTML = `
      <div class="mx16-inner">
        <h2 class="mx16-bridge-question">크루즈 처음인데<br><strong>혼자 갈 수 있을까?</strong></h2>
        <div class="mx16-answer">함께 출발할 수도 있습니다</div>
        <div class="mx16-media-slider" aria-label="함께 출발하는 크루즈 이미지 슬라이드">
          <figure class="mx16-media-card" data-image-slot="departure"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>함께 출발</figcaption></figure>
          <figure class="mx16-media-card" data-image-slot="boarding"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>승선</figcaption></figure>
          <figure class="mx16-media-card" data-image-slot="port"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>기항지</figcaption></figure>
          <figure class="mx16-media-card" data-image-slot="travel"><div class="mx16-media-slot" aria-hidden="true"></div><figcaption>같이 여행</figcaption></figure>
        </div>
      </div>`;

    if (pointExample.nextElementSibling !== cash) pointExample.insertAdjacentElement('afterend', cash);
    if (cash.nextElementSibling !== cashTotal) cash.insertAdjacentElement('afterend', cashTotal);
    if (cashTotal.nextElementSibling !== proof) cashTotal.insertAdjacentElement('afterend', proof);
    if (proof.nextElementSibling !== guide) proof.insertAdjacentElement('afterend', guide);
    if (guide.nextElementSibling !== calculator) guide.insertAdjacentElement('afterend', calculator);

    installGuideMediaStyles();
    applyCashSplitStyles();
    if (cashTotal.dataset.splitResizeBound !== '1') {
      cashTotal.dataset.splitResizeBound = '1';
      window.addEventListener('resize', applyCashSplitStyles, { passive: true });
    }

    return true;
  }

  function init() {
    installGuideMediaStyles();
    if (buildSections14To16()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (buildSections14To16() || tries >= 45) window.clearInterval(timer);
    }, 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

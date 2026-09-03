(() => {
  'use strict';

  const SECTION_ID = 'mx-travel-expansion';

  function installStyles() {
    if (document.getElementById('mx-travel-expansion-style')) return;
    const style = document.createElement('style');
    style.id = 'mx-travel-expansion-style';
    style.textContent = `
      #${SECTION_ID}{
        position:relative;box-sizing:border-box;width:100%;margin:0;padding:142px 0 158px;overflow:hidden;
        background:linear-gradient(180deg,#f7f9fc 0%,#eef3f9 100%);color:#0b1730;
        font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-align:center;
      }
      #${SECTION_ID}::before{
        content:'';position:absolute;left:50%;top:-180px;width:760px;height:420px;transform:translateX(-50%);
        background:radial-gradient(circle,rgba(49,111,239,.12),rgba(49,111,239,0) 68%);pointer-events:none;
      }
      #${SECTION_ID} .mxt-inner{position:relative;z-index:1;width:min(1120px,calc(100% - 64px));margin:0 auto}
      #${SECTION_ID} .mxt-kicker{
        display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 15px;border-radius:999px;
        background:#e7efff;color:#245fce;font-size:15px;font-weight:900;letter-spacing:-.025em;
      }
      #${SECTION_ID} h2{
        max-width:900px;margin:22px auto 0;font-size:clamp(50px,5.3vw,76px);line-height:1.06;letter-spacing:-.06em;
        font-weight:950;word-break:keep-all;
      }
      #${SECTION_ID} h2 strong{color:#2869df;font-weight:950}
      #${SECTION_ID} .mxt-sub{
        max-width:690px;margin:22px auto 0;color:#687a94;font-size:18px;line-height:1.45;font-weight:760;word-break:keep-all;
      }
      #${SECTION_ID} .mxt-cards{
        width:100%;margin:64px auto 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;
      }
      #${SECTION_ID} .mxt-card{
        position:relative;box-sizing:border-box;min-height:292px;padding:28px;border:1px solid rgba(22,61,115,.10);border-radius:30px;
        background:rgba(255,255,255,.90);box-shadow:0 24px 62px rgba(16,40,78,.10);text-align:left;overflow:hidden;
        opacity:0;transform:translateY(36px) scale(.965);filter:blur(4px);
        transition:opacity .62s ease,transform .85s cubic-bezier(.16,1,.3,1),filter .62s ease,box-shadow .28s ease;
      }
      #${SECTION_ID} .mxt-card:nth-child(2){transition-delay:100ms}
      #${SECTION_ID} .mxt-card:nth-child(3){transition-delay:200ms}
      #${SECTION_ID}.is-active .mxt-card{opacity:1;transform:none;filter:none}
      #${SECTION_ID} .mxt-card::after{
        content:attr(data-ghost);position:absolute;right:18px;bottom:-12px;color:#eaf0f8;font-size:74px;line-height:1;font-weight:950;
        letter-spacing:-.06em;pointer-events:none;
      }
      #${SECTION_ID} .mxt-num{
        display:inline-flex;align-items:center;justify-content:center;min-width:48px;height:30px;padding:0 10px;border-radius:999px;
        background:#edf3ff;color:#2869df;font-size:13px;font-weight:950;letter-spacing:.04em;
      }
      #${SECTION_ID} .mxt-card strong{
        position:relative;z-index:1;display:block;margin-top:58px;font-size:clamp(29px,2.7vw,38px);line-height:1.08;letter-spacing:-.05em;font-weight:950;
      }
      #${SECTION_ID} .mxt-card p{
        position:relative;z-index:1;margin:12px 0 0;color:#718199;font-size:16px;line-height:1.42;font-weight:760;word-break:keep-all;
      }
      #${SECTION_ID} .mxt-trip{
        width:min(980px,100%);margin:58px auto 0;padding:32px 34px;border-radius:28px;background:#0c2443;color:#fff;
        box-shadow:0 24px 58px rgba(5,25,55,.18);opacity:0;transform:translateY(26px);
        transition:opacity .64s ease .26s,transform .82s cubic-bezier(.16,1,.3,1) .26s;
      }
      #${SECTION_ID}.is-active .mxt-trip{opacity:1;transform:none}
      #${SECTION_ID} .mxt-trip-title{font-size:clamp(25px,2.6vw,34px);line-height:1.15;font-weight:950;letter-spacing:-.045em}
      #${SECTION_ID} .mxt-trip-flow{
        margin-top:24px;display:grid;grid-template-columns:repeat(4,1fr);align-items:center;gap:0;border:1px solid rgba(255,255,255,.12);border-radius:20px;overflow:hidden;
      }
      #${SECTION_ID} .mxt-trip-flow span{position:relative;padding:20px 12px;color:#d9e6f4;font-size:16px;font-weight:850}
      #${SECTION_ID} .mxt-trip-flow span+span{border-left:1px solid rgba(255,255,255,.12)}
      #${SECTION_ID} .mxt-trip-flow b{display:block;margin-bottom:7px;color:#7ed4ff;font-size:12px;letter-spacing:.03em}
      #${SECTION_ID} .mxt-trip-note{margin:18px 0 0;color:#91a8c0;font-size:14px;font-weight:750}
      @media(hover:hover) and (pointer:fine){
        #${SECTION_ID} .mxt-card:hover{transform:translateY(-7px);box-shadow:0 30px 74px rgba(16,40,78,.15)}
      }
      @media(max-width:780px){
        #${SECTION_ID}{padding:88px 0 112px}
        #${SECTION_ID} .mxt-inner{width:100%}
        #${SECTION_ID} .mxt-head{padding:0 18px}
        #${SECTION_ID} .mxt-kicker{min-height:30px;padding:0 13px;font-size:13px}
        #${SECTION_ID} h2{max-width:430px;margin-top:18px;font-size:clamp(41px,11.5vw,54px);line-height:1.04;letter-spacing:-.065em}
        #${SECTION_ID} .mxt-sub{max-width:390px;margin-top:16px;font-size:16px;line-height:1.4}
        #${SECTION_ID} .mxt-cards{
          display:flex;width:100%;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;
          padding:4px 18px 26px;margin-top:46px;box-sizing:border-box;scrollbar-width:none;
        }
        #${SECTION_ID} .mxt-cards::-webkit-scrollbar{display:none}
        #${SECTION_ID} .mxt-card{
          flex:0 0 min(82vw,330px);min-height:252px;padding:24px 22px;border-radius:25px;scroll-snap-align:center;
          box-shadow:0 18px 44px rgba(16,40,78,.11);
        }
        #${SECTION_ID} .mxt-card::after{right:15px;bottom:-8px;font-size:62px}
        #${SECTION_ID} .mxt-card strong{margin-top:48px;font-size:clamp(29px,8vw,35px)}
        #${SECTION_ID} .mxt-card p{font-size:15px}
        #${SECTION_ID} .mxt-trip{width:calc(100% - 34px);margin-top:30px;padding:27px 18px 22px;border-radius:24px}
        #${SECTION_ID} .mxt-trip-title{font-size:clamp(27px,7.5vw,34px)}
        #${SECTION_ID} .mxt-trip-flow{grid-template-columns:repeat(2,1fr);margin-top:20px;border-radius:17px}
        #${SECTION_ID} .mxt-trip-flow span{padding:17px 7px;font-size:14px}
        #${SECTION_ID} .mxt-trip-flow span:nth-child(3){border-left:0;border-top:1px solid rgba(255,255,255,.12)}
        #${SECTION_ID} .mxt-trip-flow span:nth-child(4){border-top:1px solid rgba(255,255,255,.12)}
        #${SECTION_ID} .mxt-trip-note{margin-top:14px;font-size:12px}
      }
      @media(prefers-reduced-motion:reduce){
        #${SECTION_ID} .mxt-card,#${SECTION_ID} .mxt-trip{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function build() {
    if (document.getElementById(SECTION_ID)) return true;
    const memberBenefits = document.getElementById('mx-member-booking-benefits');
    const early = document.getElementById('mx-start-early');
    if (!memberBenefits || !early) return false;

    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('data-membership-section', '18.7');
    section.innerHTML = `
      <div class="mxt-inner">
        <div class="mxt-head">
          <span class="mxt-kicker">크루즈만이 아닙니다</span>
          <h2>여행 앞뒤까지<br><strong>한 번에 준비할 수 있습니다</strong></h2>
          <p class="mxt-sub">전세계 호텔과 현지 투어, 국내 숙박도 함께 예약할 수 있습니다.</p>
        </div>

        <div class="mxt-cards" aria-label="추가 예약 가능 상품">
          <article class="mxt-card" data-ghost="HOTEL">
            <span class="mxt-num">01</span>
            <strong>전세계 호텔</strong>
            <p>출발 전·후 숙박까지 같이 준비</p>
          </article>
          <article class="mxt-card" data-ghost="TOUR">
            <span class="mxt-num">02</span>
            <strong>현지 투어</strong>
            <p>기항지와 여행지 일정도 함께 예약</p>
          </article>
          <article class="mxt-card" data-ghost="KOREA">
            <span class="mxt-num">03</span>
            <strong>국내 호텔</strong>
            <p>출국 전날·귀국 후 숙박까지 연결</p>
          </article>
        </div>

        <div class="mxt-trip">
          <div class="mxt-trip-title">크루즈만 잡고 끝나는 여행이 아닙니다</div>
          <div class="mxt-trip-flow" aria-label="여행 일정 예시">
            <span><b>출발 전</b>호텔 1박</span>
            <span><b>여행</b>크루즈</span>
            <span><b>현지</b>투어</span>
            <span><b>귀국 후</b>호텔 1박</span>
          </div>
          <p class="mxt-trip-note">상품 및 지역에 따라 예약 가능 범위는 달라질 수 있습니다.</p>
        </div>
      </div>`;

    early.parentNode.insertBefore(section, early);
    installStyles();

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.classList.add('is-active');
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          section.classList.add('is-active');
          observer.disconnect();
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
      observer.observe(section);
    }
    return true;
  }

  function init() {
    installStyles();
    if (build()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (build() || tries >= 60) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

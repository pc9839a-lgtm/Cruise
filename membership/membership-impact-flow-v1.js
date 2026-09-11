(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  function removeGeneratedDuplicates() {
    ['#impact-price', '#impact-same', '#impact-cost', '#impact-guide'].forEach((selector) => {
      const el = $(selector);
      if (el) el.remove();
    });
  }

  function installSection7Styles() {
    if ($('#membership-v3-section07-style')) return;

    const style = document.createElement('style');
    style.id = 'membership-v3-section07-style';
    style.textContent = `
      #impact-med.membership-v3-booking-proof{
        position:relative!important;
        width:100%!important;
        margin:0!important;
        padding:132px 0 148px!important;
        overflow:hidden!important;
        background:
          radial-gradient(circle at 50% 14%,rgba(62,133,255,.18),transparent 38%),
          linear-gradient(180deg,#07111f 0%,#0a1a2f 100%)!important;
        color:#fff!important;
        text-align:center!important;
      }
      #impact-med.membership-v3-booking-proof .impact-med-glow{display:none!important}
      #impact-med.membership-v3-booking-proof .membership-v3-section07-inner{
        width:min(1080px,calc(100% - 48px))!important;
        margin:0 auto!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-kicker{
        display:inline-block!important;
        margin:0 0 22px!important;
        padding:10px 18px!important;
        border:1px solid rgba(142,199,255,.24)!important;
        border-radius:999px!important;
        background:rgba(86,156,255,.10)!important;
        color:#8ec7ff!important;
        font-size:15px!important;
        font-weight:900!important;
        line-height:1!important;
        letter-spacing:.04em!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-title{
        max-width:900px!important;
        margin:0 auto!important;
        color:#fff!important;
        font-size:clamp(48px,5.4vw,76px)!important;
        line-height:1.04!important;
        letter-spacing:-.06em!important;
        font-weight:950!important;
        word-break:keep-all!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-title strong{
        color:#fff!important;
        font-weight:950!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-facts{
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        flex-wrap:wrap!important;
        gap:10px 14px!important;
        width:min(900px,100%)!important;
        margin:38px auto 0!important;
        padding:0!important;
        border:0!important;
        background:transparent!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-facts span{
        color:#c4d1df!important;
        font-size:clamp(18px,2vw,23px)!important;
        line-height:1.3!important;
        font-weight:820!important;
        letter-spacing:-.03em!important;
        white-space:nowrap!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-facts i{
        color:#506985!important;
        font-style:normal!important;
        font-size:18px!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-total-wrap{
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        width:min(920px,100%)!important;
        min-height:300px!important;
        margin:58px auto 0!important;
        padding:48px 28px!important;
        border:1px solid rgba(143,194,255,.20)!important;
        border-radius:34px!important;
        background:
          radial-gradient(circle at 50% 0%,rgba(65,142,255,.19),transparent 58%),
          rgba(255,255,255,.035)!important;
        box-shadow:0 26px 72px rgba(0,10,28,.22)!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-total-label{
        margin:0 0 18px!important;
        color:#aebed1!important;
        font-size:18px!important;
        font-weight:850!important;
        line-height:1!important;
        letter-spacing:-.02em!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-total{
        display:block!important;
        color:#8ec7ff!important;
        font-size:clamp(76px,9.4vw,126px)!important;
        line-height:.92!important;
        letter-spacing:-.065em!important;
        font-weight:950!important;
        white-space:nowrap!important;
      }
      #impact-med.membership-v3-booking-proof .membership-v3-section07-next{
        max-width:560px!important;
        margin:38px auto 0!important;
        color:#d9e3ed!important;
        font-size:clamp(21px,2.3vw,28px)!important;
        line-height:1.4!important;
        font-weight:900!important;
        letter-spacing:-.04em!important;
        word-break:keep-all!important;
      }
      @media(max-width:780px){
        #impact-med.membership-v3-booking-proof{padding:96px 0 112px!important}
        #impact-med.membership-v3-booking-proof .membership-v3-section07-inner{width:calc(100% - 32px)!important}
        #impact-med.membership-v3-booking-proof .membership-v3-section07-kicker{
          margin-bottom:18px!important;padding:9px 14px!important;font-size:12px!important
        }
        #impact-med.membership-v3-booking-proof .membership-v3-section07-title{
          max-width:420px!important;font-size:clamp(40px,11.4vw,52px)!important;line-height:1.04!important
        }
        #impact-med.membership-v3-booking-proof .membership-v3-section07-facts{
          max-width:390px!important;margin-top:28px!important;gap:7px 9px!important
        }
        #impact-med.membership-v3-booking-proof .membership-v3-section07-facts span{font-size:16px!important}
        #impact-med.membership-v3-booking-proof .membership-v3-section07-facts i{font-size:14px!important}
        #impact-med.membership-v3-booking-proof .membership-v3-section07-total-wrap{
          min-height:228px!important;margin-top:40px!important;padding:36px 14px!important;border-radius:26px!important
        }
        #impact-med.membership-v3-booking-proof .membership-v3-section07-total-label{
          margin-bottom:14px!important;font-size:15px!important
        }
        #impact-med.membership-v3-booking-proof .membership-v3-section07-total{
          font-size:clamp(56px,16.8vw,78px)!important
        }
        #impact-med.membership-v3-booking-proof .membership-v3-section07-next{
          max-width:340px!important;margin-top:30px!important;font-size:20px!important
        }
      }
    `;
    document.head.appendChild(style);
  }

  function addBookingProof() {
    const anchor = $('#mx-moving-hotel-4');
    if (!anchor) return false;

    installSection7Styles();

    let section = $('#impact-med');
    if (!section) {
      section = document.createElement('section');
      section.id = 'impact-med';
    }

    section.className = 'impact-section impact-med membership-v3-booking-proof';
    section.setAttribute('data-membership-section', '07');
    section.setAttribute('aria-labelledby', 'membership-v3-section07-title');
    section.innerHTML = `
      <div class="impact-med-glow" aria-hidden="true"></div>
      <div class="impact-inner membership-v3-section07-inner">
        <div class="impact-label dark membership-v3-section07-kicker">실제 예약 한 건</div>
        <h2 id="membership-v3-section07-title" class="impact-title light membership-v3-section07-title">MSC World Asia<br><strong>2인 실제 예약</strong></h2>

        <div class="impact-med-route membership-v3-section07-facts" aria-label="실제 예약 조건">
          <span>Barcelona</span><i>·</i><span>7박 8일</span><i>·</i><span>Balcony</span><i>·</i><span>2명</span>
        </div>

        <div class="impact-med-cycle membership-v3-section07-total-wrap" aria-label="예약 총액 3,887.35달러">
          <span class="membership-v3-section07-total-label">예약 총액</span>
          <strong class="membership-v3-section07-total">$3,887.35</strong>
        </div>

        <p class="membership-v3-section07-next">실제 결제 흐름은 어떻게 됐을까요?</p>
      </div>`;

    if (anchor.nextElementSibling !== section) {
      anchor.insertAdjacentElement('afterend', section);
    }

    return true;
  }

  function build() {
    removeGeneratedDuplicates();
    return addBookingProof();
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (build() || tries > 40) clearInterval(timer);
  }, 160);

  if (document.readyState !== 'loading') build();
  else document.addEventListener('DOMContentLoaded', build, { once: true });
})();

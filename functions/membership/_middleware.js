export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const ua = context.request.headers.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  const canonicalStyle = '<link rel="stylesheet" href="/membership/membership-canonical-v5.css?v=20260903-priceexamples26">';
  const motionStyle = '<link rel="stylesheet" href="/membership/membership-partner-motion-v1.css?v=20260903-partnergrade37">';
  const heroMotionStyle = '<link rel="stylesheet" href="/membership/membership-hero-motion-v1.css?v=20260902-3">';
  const liveMotionStyle = '<link rel="stylesheet" href="/membership/membership-live-motion-v1.css?v=20260903-live43">';
  const surveyMobileStyle = '<link rel="stylesheet" href="/membership/membership-survey-mobile-v3.css?v=20260901-1">';
  const bottomCtaStyle = `<style id="membership-bottom-cta-style">
    html{scroll-behavior:smooth}
    body{padding-bottom:118px!important}
    #plans{scroll-margin-top:24px!important}

    .membership-bottom-cta{
      position:fixed!important;
      left:0!important;right:0!important;
      bottom:calc(18px + env(safe-area-inset-bottom))!important;
      z-index:2147483000!important;
      padding:0 16px!important;
      background:transparent!important;
      pointer-events:none!important;
      opacity:1!important;
      transform:translateY(0)!important;
      transition:opacity .22s ease,transform .32s cubic-bezier(.16,1,.3,1)!important;
    }

    .membership-bottom-cta.is-hidden-by-plans{
      opacity:0!important;
      transform:translateY(130%)!important;
      pointer-events:none!important;
    }

    .membership-bottom-cta-inner{
      width:min(650px,100%)!important;
      margin:0 auto!important;
      pointer-events:auto!important;
    }

    .membership-bottom-cta a{
      position:relative!important;
      overflow:hidden!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:12px!important;
      min-height:72px!important;
      padding:0 34px!important;
      border-radius:999px!important;
      border:1px solid rgba(255,255,255,.28)!important;
      text-decoration:none!important;
      background:linear-gradient(135deg,#1c56d8 0%,#2c72ff 52%,#4d8cff 100%)!important;
      background-size:180% 180%!important;
      color:#fff!important;
      font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;
      font-size:21px!important;
      font-weight:950!important;
      letter-spacing:-.045em!important;
      line-height:1!important;
      box-shadow:
        0 16px 42px rgba(31,91,216,.42),
        0 0 0 0 rgba(74,139,255,.34)!important;
      transform-origin:50% 100%!important;
      animation:
        membershipCtaFloat 1.85s ease-in-out infinite,
        membershipCtaGlow 1.85s ease-in-out infinite,
        membershipCtaGradient 3.8s ease-in-out infinite!important;
      transition:filter .18s ease,box-shadow .18s ease!important;
    }

    .membership-bottom-cta a::before{
      content:''!important;
      position:absolute!important;
      top:-40%!important;
      bottom:-40%!important;
      left:-34%!important;
      width:24%!important;
      transform:skewX(-22deg)!important;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.52),transparent)!important;
      animation:membershipCtaShine 2.5s ease-in-out infinite!important;
      pointer-events:none!important;
    }

    .membership-bottom-cta a::after{
      content:'→'!important;
      font-size:26px!important;
      line-height:1!important;
      transform:translateY(-1px)!important;
      animation:membershipCtaArrow 1.05s ease-in-out infinite!important;
    }

    .membership-bottom-cta a:hover{
      filter:brightness(1.07)!important;
      box-shadow:0 20px 48px rgba(31,91,216,.50),0 0 0 5px rgba(74,139,255,.12)!important;
    }

    .membership-bottom-cta a:active{
      animation:none!important;
      transform:scale(.975)!important;
    }

    @keyframes membershipCtaFloat{
      0%,100%{transform:translateY(0) scale(1)}
      50%{transform:translateY(-6px) scale(1.025)}
    }

    @keyframes membershipCtaGlow{
      0%,100%{box-shadow:0 16px 42px rgba(31,91,216,.38),0 0 0 0 rgba(74,139,255,.28)}
      50%{box-shadow:0 22px 52px rgba(31,91,216,.54),0 0 0 9px rgba(74,139,255,0)}
    }

    @keyframes membershipCtaGradient{
      0%,100%{background-position:0% 50%}
      50%{background-position:100% 50%}
    }

    @keyframes membershipCtaShine{
      0%,52%{left:-34%;opacity:0}
      60%{opacity:1}
      78%,100%{left:120%;opacity:0}
    }

    @keyframes membershipCtaArrow{
      0%,100%{transform:translate(0,-1px)}
      50%{transform:translate(7px,-1px)}
    }

    @media(max-width:720px){
      body{padding-bottom:108px!important}
      .membership-bottom-cta{
        bottom:calc(14px + env(safe-area-inset-bottom))!important;
        padding:0 10px!important;
      }
      .membership-bottom-cta a{
        min-height:66px!important;
        padding:0 22px!important;
        border-radius:999px!important;
        font-size:19px!important;
      }
      .membership-bottom-cta a::after{font-size:24px!important}
    }

    @media(prefers-reduced-motion:reduce){
      .membership-bottom-cta,
      .membership-bottom-cta a,
      .membership-bottom-cta a::before,
      .membership-bottom-cta a::after{
        animation:none!important;
        transition:none!important;
      }
    }
  </style>`;
  const extraStyles = (isMobile ? surveyMobileStyle : '') + canonicalStyle + motionStyle + heroMotionStyle + liveMotionStyle + bottomCtaStyle;

  return new HTMLRewriter()
    .on('link[href*="membership-page-v2.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v1.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v2.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v3.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v4.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-calc-plans-v2.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-global-optimization"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-global-visual-fix"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-entry-survey-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-entry-survey-v2.js"]', {
      element(element) { element.setAttribute('src', '/membership/membership-entry-survey-v2.js?v=20260903-align44'); }
    })
    .on('script[src*="membership-calc-plans-v2.js"]', {
      element(element) { element.setAttribute('src', '/membership/membership-calc-plans-v2.js?v=20260905-plan68'); }
    })
    .on('script[src*="membership-page-v2.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-expansion-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-stage3-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-canonical-motion-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-canonical-motion-v2.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-canonical-motion-v3.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-mobile-motion-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-mobile-motion-v2.js"]', { element(element) { element.remove(); } })
    .on('.sticky-menu-bar', { element(element) { element.remove(); } })
    .on('head', {
      element(element) {
        element.prepend('<script src="/assets/js/agent-persistence.js?v=20260831-1"></script>', { html: true });
        element.append(extraStyles, { html: true });
      }
    })
    .on('body', {
      element(element) {
        element.append(
          '<div class="membership-bottom-cta" role="navigation" aria-label="멤버십 선택 바로가기"><div class="membership-bottom-cta-inner"><a href="#plans">내 멤버십 선택하기</a></div></div>' +
          '<script defer src="/membership/membership-scaffold-v1.js?v=20260903-flow15"></script>' +
          '<script defer src="/membership/membership-canonical-stage-v1.js?v=20260903-type37"></script>' +
          '<script defer src="/membership/membership-section3-port-v1.js?v=20260903-flow15"></script>' +
          '<script defer src="/membership/membership-section4-moving-hotel-v1.js?v=20260903-flow15"></script>' +
          '<script defer src="/membership/membership-impact-flow-v1.js?v=20260903-flow15"></script>' +
          '<script defer src="/membership/membership-section6-price-barrier-v1.js?v=20260903-flow23"></script>' +
          '<script defer src="/membership/membership-section7-8-price-proof-v1.js?v=20260903-flow28"></script>' +
          '<script defer src="/membership/membership-section9-10-cost-use-v1.js?v=20260903-flow29"></script>' +
          '<script defer src="/membership/membership-section11-12-guide-transition-v1.js?v=20260903-flow30"></script>' +
          '<script defer src="/membership/membership-cruise-example-images-v1.js?v=20260903-cards45"></script>' +
          '<script defer src="/membership/membership-section13-14-points-v1.js?v=20260904-flow61"></script>' +
          '<script defer src="/membership/membership-section15-16-point-payment-v1.js?v=20260903-guide45"></script>' +
          '<script defer src="/membership/membership-section17-18-calculator-fit-v1.js?v=20260903-flow32"></script>' +
          '<script defer src="/membership/membership-section19-20-plan-choice-v1.js?v=20260905-conversion67"></script>' +
          '<script defer src="/membership/membership-remove-optional-v1.js?v=20260903-remove53"></script>' +
          '<script defer src="/membership/membership-travel-expansion-v1.js?v=20260905-travel66"></script>' +
          '<script defer src="/membership/membership-section-order-fix-v1.js?v=20260905-order66"></script>' +
          '<script defer src="/membership/membership-refund-assurance-v1.js?v=20260905-refund66"></script>' +
          '<script defer src="/membership/membership-section21-22-terms-final-v1.js?v=20260904-flow62"></script>' +
          '<script defer src="/membership/membership-live-motion-v1.js?v=20260904-live62"></script>' +
          '<script defer src="/membership/membership-cta-optimization-v1.js?v=20260905-cta69"></script>' +
          '<script defer src="/membership/membership-hero-restore-v1.js?v=20260902-subscription-restore"></script>' +
          '<script defer src="/membership/membership-partner-motion-v1.js?v=20260903-partnergrade37"></script>' +
          '<script defer src="/membership/membership-hero-motion-v1.js?v=20260902-2"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

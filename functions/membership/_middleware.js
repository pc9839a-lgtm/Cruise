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
    body{padding-bottom:104px!important}
    #plans{scroll-margin-top:28px!important}
    .membership-bottom-cta{
      position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:2147483000!important;
      padding:14px 18px calc(14px + env(safe-area-inset-bottom))!important;
      background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.93) 28%,rgba(255,255,255,.985) 100%)!important;
      pointer-events:none!important;
    }
    .membership-bottom-cta-inner{width:min(560px,100%)!important;margin:0 auto!important;pointer-events:auto!important}
    .membership-bottom-cta a{
      position:relative!important;overflow:hidden!important;
      display:flex!important;align-items:center!important;justify-content:center!important;gap:12px!important;
      min-height:60px!important;padding:0 30px!important;border-radius:19px!important;text-decoration:none!important;
      background:linear-gradient(135deg,#1f54b7 0%,#2f68ff 58%,#3976ff 100%)!important;color:#fff!important;
      font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;
      font-size:20px!important;font-weight:950!important;letter-spacing:-.038em!important;
      box-shadow:0 14px 36px rgba(31,84,183,.32),0 3px 10px rgba(16,35,72,.12)!important;
      transform-origin:50% 100%!important;
      animation:membershipCtaNudge 2.8s cubic-bezier(.16,1,.3,1) infinite!important;
      transition:transform .18s ease,box-shadow .18s ease!important;
    }
    .membership-bottom-cta a::before{
      content:''!important;position:absolute!important;inset:0 auto 0 -38%!important;width:30%!important;
      background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent)!important;
      transform:skewX(-18deg)!important;animation:membershipCtaShine 3.6s ease-in-out infinite!important;pointer-events:none!important;
    }
    .membership-bottom-cta a::after{
      content:'→'!important;font-size:22px!important;line-height:1!important;transform:translateY(-1px)!important;
      animation:membershipCtaArrow 1.15s ease-in-out infinite!important;
    }
    .membership-bottom-cta a:hover{animation-play-state:paused!important;transform:translateY(-2px) scale(1.01)!important;box-shadow:0 18px 44px rgba(31,84,183,.38),0 4px 12px rgba(16,35,72,.14)!important}
    .membership-bottom-cta a:active{animation:none!important;transform:translateY(0) scale(.982)!important}
    @keyframes membershipCtaNudge{
      0%,68%,100%{transform:translateY(0) scale(1)}
      76%{transform:translateY(-3px) scale(1.012)}
      84%{transform:translateY(0) scale(1)}
      91%{transform:translateY(-1px) scale(1.005)}
    }
    @keyframes membershipCtaArrow{0%,100%{translate:0 0}50%{translate:5px 0}}
    @keyframes membershipCtaShine{0%,58%{left:-38%;opacity:0}66%{opacity:1}82%,100%{left:122%;opacity:0}}
    @media(max-width:720px){
      body{padding-bottom:100px!important}
      .membership-bottom-cta{padding:10px 12px calc(12px + env(safe-area-inset-bottom))!important}
      .membership-bottom-cta a{min-height:58px!important;border-radius:17px!important;font-size:19px!important}
    }
    @media(prefers-reduced-motion:reduce){
      .membership-bottom-cta a,.membership-bottom-cta a::before,.membership-bottom-cta a::after{animation:none!important}
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
      element(element) { element.setAttribute('src', '/membership/membership-calc-plans-v2.js?v=20260904-plan62'); }
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
          '<div class="membership-bottom-cta" role="navigation" aria-label="최저가 크루즈 바로가기"><div class="membership-bottom-cta-inner"><a href="#plans">최저가로 크루즈 타기</a></div></div>' +
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
          '<script defer src="/membership/membership-section19-20-plan-choice-v1.js?v=20260905-conversion63"></script>' +
          '<script defer src="/membership/membership-remove-optional-v1.js?v=20260903-remove53"></script>' +
          '<script defer src="/membership/membership-travel-expansion-v1.js?v=20260904-travel59"></script>' +
          '<script defer src="/membership/membership-section-order-fix-v1.js?v=20260904-order59"></script>' +
          '<script defer src="/membership/membership-refund-assurance-v1.js?v=20260904-refund58"></script>' +
          '<script defer src="/membership/membership-section21-22-terms-final-v1.js?v=20260904-flow62"></script>' +
          '<script defer src="/membership/membership-live-motion-v1.js?v=20260904-live62"></script>' +
          '<script defer src="/membership/membership-hero-restore-v1.js?v=20260902-subscription-restore"></script>' +
          '<script defer src="/membership/membership-partner-motion-v1.js?v=20260903-partnergrade37"></script>' +
          '<script defer src="/membership/membership-hero-motion-v1.js?v=20260902-2"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

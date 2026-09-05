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
    body{padding-bottom:96px!important}
    #plans{scroll-margin-top:24px!important}
    .membership-bottom-cta{
      position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:2147483000!important;
      padding:10px 16px calc(12px + env(safe-area-inset-bottom))!important;
      background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.94) 34%,#fff 100%)!important;
      pointer-events:none!important;
      opacity:1!important;transform:translateY(0)!important;
      transition:opacity .22s ease,transform .28s cubic-bezier(.16,1,.3,1)!important;
    }
    .membership-bottom-cta.is-hidden-by-plans{
      opacity:0!important;transform:translateY(115%)!important;pointer-events:none!important;
    }
    .membership-bottom-cta-inner{width:min(620px,100%)!important;margin:0 auto!important;pointer-events:auto!important}
    .membership-bottom-cta a{
      display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;
      min-height:64px!important;padding:0 28px!important;border-radius:16px!important;text-decoration:none!important;
      background:linear-gradient(135deg,#1f5bd8 0%,#2f72ff 100%)!important;color:#fff!important;
      font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;
      font-size:19px!important;font-weight:950!important;letter-spacing:-.04em!important;line-height:1.15!important;
      box-shadow:0 14px 32px rgba(31,91,216,.28)!important;
      transition:transform .18s ease,box-shadow .18s ease,filter .18s ease!important;
    }
    .membership-bottom-cta a::before{display:none!important}
    .membership-bottom-cta a::after{
      content:'→'!important;font-size:22px!important;line-height:1!important;transform:translateY(-1px)!important;
    }
    .membership-bottom-cta a:hover{
      transform:translateY(-2px)!important;filter:brightness(1.03)!important;
      box-shadow:0 18px 38px rgba(31,91,216,.34)!important;
    }
    .membership-bottom-cta a:active{transform:scale(.985)!important}
    @media(max-width:720px){
      body{padding-bottom:88px!important}
      .membership-bottom-cta{padding:8px 10px calc(10px + env(safe-area-inset-bottom))!important}
      .membership-bottom-cta a{min-height:58px!important;padding:0 16px!important;border-radius:14px!important;font-size:17px!important}
    }
    @media(prefers-reduced-motion:reduce){
      .membership-bottom-cta,.membership-bottom-cta a{transition:none!important}
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
      element(element) { element.setAttribute('src', '/membership/membership-calc-plans-v2.js?v=20260905-plan67'); }
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
          '<div class="membership-bottom-cta" role="navigation" aria-label="멤버십 플랜 바로가기"><div class="membership-bottom-cta-inner"><a href="#plans">CLASSIC · PREMIUM 비교하기</a></div></div>' +
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
          '<script defer src="/membership/membership-hero-restore-v1.js?v=20260902-subscription-restore"></script>' +
          '<script defer src="/membership/membership-partner-motion-v1.js?v=20260903-partnergrade37"></script>' +
          '<script defer src="/membership/membership-hero-motion-v1.js?v=20260902-2"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

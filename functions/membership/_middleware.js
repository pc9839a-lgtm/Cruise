export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const ua = context.request.headers.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  const motionScripts = isMobile ? '' :
    '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>' +
    '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>';

  const impactStyle = '<link rel="stylesheet" href="/membership/membership-impact-flow-v1.css?v=20260901-partner1">';
  const section3Style = '<link rel="stylesheet" href="/membership/membership-section3-port-v1.css?v=20260901-1">';
  const section4Style = '<link rel="stylesheet" href="/membership/membership-section4-moving-hotel-v1.css?v=20260902-1">';
  const section5Style = '<link rel="stylesheet" href="/membership/membership-section5-route-v1.css?v=20260902-1">';
  const section6Style = '<link rel="stylesheet" href="/membership/membership-section6-price-barrier-v1.css?v=20260902-1">';
  const section78Style = '<link rel="stylesheet" href="/membership/membership-section7-8-price-proof-v1.css?v=20260902-1">';
  const section910Style = '<link rel="stylesheet" href="/membership/membership-section9-10-cost-use-v1.css?v=20260902-1">';
  const section1112Style = '<link rel="stylesheet" href="/membership/membership-section11-12-guide-transition-v1.css?v=20260902-1">';
  const section1314Style = '<link rel="stylesheet" href="/membership/membership-section13-14-points-v1.css?v=20260902-1">';
  const section1516Style = '<link rel="stylesheet" href="/membership/membership-section15-16-point-payment-v1.css?v=20260902-1">';
  const section1718Style = '<link rel="stylesheet" href="/membership/membership-section17-18-calculator-fit-v1.css?v=20260902-1">';
  const surveyMobileStyle = '<link rel="stylesheet" href="/membership/membership-survey-mobile-v3.css?v=20260901-1">';

  const mobileStyles =
    '<link rel="stylesheet" href="/membership/membership-expansion-v1.css?v=20260901-opt1">' +
    '<link rel="stylesheet" href="/membership/membership-stage3-v1.css?v=20260901-opt1">' +
    '<link rel="stylesheet" href="/membership/membership-mobile-canonical-v3.css?v=20260901-partner1">' +
    '<link rel="stylesheet" href="/membership/membership-mobile-type-v1.css?v=20260901-opt2">' +
    '<link rel="stylesheet" href="/membership/membership-center-clean-v1.css?v=20260901-opt2">' +
    section3Style +
    section4Style +
    impactStyle +
    section5Style +
    section6Style +
    section78Style +
    section910Style +
    section1112Style +
    section1314Style +
    section1516Style +
    section1718Style +
    surveyMobileStyle;

  const desktopStyles =
    '<link rel="stylesheet" href="/membership/membership-partner-harmony-v1.css?v=20260831-4">' +
    '<link rel="stylesheet" href="/membership/membership-price-clean-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-midflow-5-7-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-lateflow-8-10-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-guide-empathy-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v1.css?v=20260901-opt1">' +
    '<link rel="stylesheet" href="/membership/membership-master-theme-v1.css?v=20260901-restore1">' +
    '<link rel="stylesheet" href="/membership/membership-stage3-v1.css?v=20260901-opt1">' +
    section3Style +
    section4Style +
    impactStyle +
    section5Style +
    section6Style +
    section78Style +
    section910Style +
    section1112Style +
    section1314Style +
    section1516Style +
    section1718Style;

  const extraStyles = isMobile ? mobileStyles : desktopStyles;

  return new HTMLRewriter()
    .on('script[src*="membership-entry-survey-v1.js"]', {
      element(element) { element.remove(); }
    })
    .on('script[src*="membership-entry-survey-v2.js"]', {
      element(element) {
        element.setAttribute('src', '/membership/membership-entry-survey-v2.js?v=20260901-mobileopt2');
      }
    })
    .on('script[src*="membership-page-v2.js"]', {
      element(element) { element.remove(); }
    })
    .on('head', {
      element(element) {
        element.prepend(
          '<script src="/assets/js/agent-persistence.js?v=20260831-1"></script>',
          { html: true }
        );
        element.append(
          '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' + extraStyles,
          { html: true }
        );
      }
    })
    .on('body', {
      element(element) {
        element.append(
          motionScripts +
          '<script defer src="/membership/membership-price-bridge-v1.js?v=20260901-opt1"></script>' +
          '<script defer src="/membership/membership-expansion-v1.js?v=20260901-section2"></script>' +
          '<script defer src="/membership/membership-section3-port-v1.js?v=20260901-1"></script>' +
          '<script defer src="/membership/membership-section4-moving-hotel-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-stage3-v1.js?v=20260901-copy5"></script>' +
          '<script defer src="/membership/membership-impact-flow-v1.js?v=20260902-section5"></script>' +
          '<script defer src="/membership/membership-section6-price-barrier-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section7-8-price-proof-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section9-10-cost-use-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section11-12-guide-transition-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section13-14-points-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section15-16-point-payment-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section17-18-calculator-fit-v1.js?v=20260902-1"></script>' +
          (isMobile ? '<script defer src="/membership/membership-mobile-motion-v2.js?v=20260901-opt1"></script>' : '') +
          '<script defer src="/membership/membership-impact-motion-v1.js?v=20260901-opt1"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

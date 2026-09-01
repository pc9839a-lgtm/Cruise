export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const ua = context.request.headers.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  const motionScripts = isMobile ? '' :
    '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>' +
    '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>';

  const impactStyle = '<link rel="stylesheet" href="/membership/membership-impact-flow-v1.css?v=20260901-step2">';
  const surveyMobileStyle = '<link rel="stylesheet" href="/membership/membership-survey-mobile-v3.css?v=20260901-1">';
  const calcPlansStyle = '<link rel="stylesheet" href="/membership/membership-calc-plans-v2.css?v=20260901-1">';
  const tailStyle = '<link rel="stylesheet" href="/membership/membership-tail-flow-v1.css?v=20260901-1">';

  const mobileStyles =
    '<link rel="stylesheet" href="/membership/membership-expansion-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v2.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-stage3-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-mobile-canonical-v3.css?v=20260901-3">' +
    '<link rel="stylesheet" href="/membership/membership-mobile-type-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-center-clean-v1.css?v=20260901-1">' +
    impactStyle +
    surveyMobileStyle +
    calcPlansStyle +
    tailStyle;

  const desktopStyles =
    '<link rel="stylesheet" href="/membership/membership-partner-harmony-v1.css?v=20260831-4">' +
    '<link rel="stylesheet" href="/membership/membership-price-clean-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-midflow-5-7-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-lateflow-8-10-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-guide-empathy-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v2.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-master-theme-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-stage3-v1.css?v=20260901-2">' +
    impactStyle +
    tailStyle;

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
          '<script defer src="/membership/membership-hero-restore-v1.js?v=20260831-1"></script>' +
          motionScripts +
          '<script defer src="/membership/membership-price-bridge-v1.js?v=20260831-10"></script>' +
          '<script defer src="/membership/membership-adflow-1-4-v1.js?v=20260901-1"></script>' +
          '<script defer src="/membership/membership-midflow-5-7-v1.js?v=20260901-1"></script>' +
          '<script defer src="/membership/membership-expansion-v1.js?v=20260901-2"></script>' +
          '<script defer src="/membership/membership-expansion-v2.js?v=20260901-2"></script>' +
          (isMobile ? '<script defer src="/membership/membership-mobile-final-v1.js?v=20260901-source1"></script>' : '') +
          '<script defer src="/membership/membership-stage3-v1.js?v=20260901-2"></script>' +
          '<script defer src="/membership/membership-cleanup-v1.js?v=20260901-1"></script>' +
          '<script defer src="/membership/membership-impact-flow-v1.js?v=20260901-source1"></script>' +
          (isMobile ? '<script defer src="/membership/membership-calc-plans-v2.js?v=20260901-1"></script>' : '') +
          '<script defer src="/membership/membership-tail-flow-v1.js?v=20260901-1"></script>' +
          (isMobile ? '<script defer src="/membership/membership-mobile-motion-v2.js?v=20260901-1"></script>' : '') +
          '<script defer src="/membership/membership-impact-motion-v1.js?v=20260901-2"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

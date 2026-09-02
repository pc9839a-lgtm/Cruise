export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const ua = context.request.headers.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  const canonicalStyle = '<link rel="stylesheet" href="/membership/membership-canonical-v5.css?v=20260903-unified11">';
  const calcStyle = '<link rel="stylesheet" href="/membership/membership-calc-plans-v2.css?v=20260903-simplecalc12">';
  const motionStyle = '<link rel="stylesheet" href="/membership/membership-partner-motion-v1.css?v=20260903-purposemotion4">';
  const heroMotionStyle = '<link rel="stylesheet" href="/membership/membership-hero-motion-v1.css?v=20260902-3">';
  const surveyMobileStyle = '<link rel="stylesheet" href="/membership/membership-survey-mobile-v3.css?v=20260901-1">';
  const extraStyles = (isMobile ? surveyMobileStyle : '') + canonicalStyle + calcStyle + motionStyle + heroMotionStyle;

  return new HTMLRewriter()
    .on('link[href*="membership-page-v2.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v1.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v2.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v3.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-canonical-v4.css"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-global-optimization"]', { element(element) { element.remove(); } })
    .on('link[href*="membership-global-visual-fix"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-entry-survey-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-entry-survey-v2.js"]', {
      element(element) {
        element.setAttribute('src', '/membership/membership-entry-survey-v2.js?v=20260901-mobileopt2');
      }
    })
    .on('script[src*="membership-page-v2.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-expansion-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-stage3-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-canonical-motion-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-canonical-motion-v2.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-canonical-motion-v3.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-mobile-motion-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-mobile-motion-v2.js"]', { element(element) { element.remove(); } })
    .on('head', {
      element(element) {
        element.prepend('<script src="/assets/js/agent-persistence.js?v=20260831-1"></script>', { html: true });
        element.append(extraStyles, { html: true });
      }
    })
    .on('body', {
      element(element) {
        element.append(
          '<script defer src="/membership/membership-scaffold-v1.js?v=20260902-story2"></script>' +
          '<script defer src="/membership/membership-canonical-stage-v1.js?v=20260903-calculator11"></script>' +
          '<script defer src="/membership/membership-section3-port-v1.js?v=20260902-story2"></script>' +
          '<script defer src="/membership/membership-section4-moving-hotel-v1.js?v=20260902-story2"></script>' +
          '<script defer src="/membership/membership-impact-flow-v1.js?v=20260902-story2"></script>' +
          '<script defer src="/membership/membership-section6-price-barrier-v1.js?v=20260902-concise4"></script>' +
          '<script defer src="/membership/membership-section7-8-price-proof-v1.js?v=20260903-flatproof10"></script>' +
          '<script defer src="/membership/membership-section9-10-cost-use-v1.js?v=20260902-storyclean6"></script>' +
          '<script defer src="/membership/membership-section11-12-guide-transition-v1.js?v=20260902-storyclean6"></script>' +
          '<script defer src="/membership/membership-section13-14-points-v1.js?v=20260903-flatpoints10"></script>' +
          '<script defer src="/membership/membership-section15-16-point-payment-v1.js?v=20260902-costfix7"></script>' +
          '<script defer src="/membership/membership-section17-18-calculator-fit-v1.js?v=20260903-simplecalc12"></script>' +
          '<script defer src="/membership/membership-section19-20-plan-choice-v1.js?v=20260902-flowclean5"></script>' +
          '<script defer src="/membership/membership-section21-22-terms-final-v1.js?v=20260903-calculator11"></script>' +
          '<script defer src="/membership/membership-hero-restore-v1.js?v=20260902-subscription-restore"></script>' +
          '<script defer src="/membership/membership-partner-motion-v1.js?v=20260903-purposemotion4"></script>' +
          '<script defer src="/membership/membership-hero-motion-v1.js?v=20260902-2"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

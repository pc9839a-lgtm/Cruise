export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const ua = context.request.headers.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  const canonicalStyle = '<link rel="stylesheet" href="/membership/membership-canonical-v2.css?v=20260902-1">';
  const surveyMobileStyle = '<link rel="stylesheet" href="/membership/membership-survey-mobile-v3.css?v=20260901-1">';
  const extraStyles = (isMobile ? surveyMobileStyle : '') + canonicalStyle;

  return new HTMLRewriter()
    .on('link[href*="membership-page-v2.css"]', {
      element(element) { element.remove(); }
    })
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
        element.append(extraStyles, { html: true });
      }
    })
    .on('body', {
      element(element) {
        element.append(
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
          '<script defer src="/membership/membership-section19-20-plan-choice-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-section21-22-terms-final-v1.js?v=20260902-1"></script>' +
          '<script defer src="/membership/membership-canonical-motion-v2.js?v=20260902-1"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

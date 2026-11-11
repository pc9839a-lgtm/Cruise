export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('script[src*="membership-entry-survey-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-entry-survey-v2.js"]', {
      element(element) { element.setAttribute('src', '/membership/membership-entry-survey-v2.js?v=20261111-cssunified1'); }
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

      }
    })
    .on('body', {
      element(element) {
        element.append(
          '<div class="membership-bottom-cta" role="navigation" aria-label="멤버십 선택 바로가기"><div class="membership-bottom-cta-inner"><a href="#plans">내 멤버십 선택하기</a></div></div>' +
          '<script defer src="/membership/membership-scaffold-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-canonical-stage-v1.js?v=20261111-calc3"></script>' +
          '<script defer src="/membership/membership-section3-port-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-section4-moving-hotel-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-impact-flow-v1.js?v=20260903-flow15"></script>' +
          '<script defer src="/membership/membership-section6-price-barrier-v1.js?v=20260903-flow23"></script>' +
          '<script defer src="/membership/membership-section7-8-price-proof-v1.js?v=20261111-story4"></script>' +
          '<script defer src="/membership/membership-section9-10-cost-use-v1.js?v=20261111-story4"></script>' +
          '<script defer src="/membership/membership-section11-12-guide-transition-v1.js?v=20261111-story4"></script>' +
          '<script defer src="/membership/membership-cruise-example-images-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-section13-14-points-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-section15-16-point-payment-v1.js?v=20261111-calc3"></script>' +
          '<script defer src="/membership/membership-section17-18-calculator-fit-v1.js?v=20261111-calc3"></script>' +
          '<script defer src="/membership/membership-section19-20-plan-choice-v1.js?v=20261111-planowner2"></script>' +
          '<script defer src="/membership/membership-remove-optional-v1.js?v=20260903-remove53"></script>' +
          '<script defer src="/membership/membership-travel-expansion-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-section-order-fix-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-refund-assurance-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-section21-22-terms-final-v1.js?v=20261111-planowner2"></script>' +
          '<script defer src="/membership/membership-live-motion-v1.js?v=20261111-cssunified1"></script>' +
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

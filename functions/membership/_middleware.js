export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('script[src*="membership-entry-survey-v1.js"]', { element(element) { element.remove(); } })
    .on('script[src*="membership-entry-survey-v2.js"]', {
      element(element) { element.setAttribute('src', '/membership/membership-entry-survey-v2.js?v=20261117-trust1'); }
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
        // First four story chapters are static HTML; only later booking and plan examples are injected.
        element.append(
          '<script defer src="/membership/membership-canonical-stage-v1.js?v=20261111-mobile5"></script>' +

          '<script defer src="/membership/membership-section7-8-price-proof-v1.js?v=20261119-story-phase1"></script>' +
          '<script defer src="/membership/membership-section9-10-cost-use-v1.js?v=20261111-story4"></script>' +
          '<script defer src="/membership/membership-section11-12-guide-transition-v1.js?v=20261111-compact11"></script>' +
          '<script defer src="/membership/membership-cruise-example-images-v1.js?v=20261111-cssunified1"></script>' +
          '<script defer src="/membership/membership-section13-14-points-v1.js?v=20261111-compact11"></script>' +

          '<script defer src="/membership/membership-section17-18-calculator-fit-v1.js?v=20261111-compact11b"></script>' +

          '<script defer src="/membership/membership-remove-optional-v1.js?v=20260903-remove53"></script>' +

          '<script defer src="/membership/membership-live-motion-v1.js?v=20261111-price9a"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

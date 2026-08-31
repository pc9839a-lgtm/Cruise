export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const ua = context.request.headers.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  const lateSectionStyle = [
    'margin:0!important',
    'border:0!important',
    'background:#07111f!important',
    'background-color:#07111f!important',
    'background-image:none!important',
    'color:#fff!important',
    'box-shadow:none!important'
  ].join(';');

  const motionScripts = isMobile ? '' :
    '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>' +
    '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>';

  const mobileStyles =
    '<link rel="stylesheet" href="/membership/membership-expansion-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v2.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-stage3-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-mobile-canonical-v3.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-mobile-type-v1.css?v=20260901-1">';

  const desktopStyles =
    '<link rel="stylesheet" href="/membership/membership-partner-harmony-v1.css?v=20260831-4">' +
    '<link rel="stylesheet" href="/membership/membership-price-clean-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-midflow-5-7-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-lateflow-8-10-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-guide-empathy-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v1.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-expansion-v2.css?v=20260901-2">' +
    '<link rel="stylesheet" href="/membership/membership-master-theme-v1.css?v=20260831-1">' +
    '<link rel="stylesheet" href="/membership/membership-stage3-v1.css?v=20260901-2">';

  const extraStyles = isMobile ? mobileStyles : desktopStyles;

  const applyDesktopLateStyle = (element) => {
    if (isMobile) {
      element.removeAttribute('style');
      element.setAttribute('data-mobile-canonical', '1');
      return;
    }
    element.setAttribute('style', lateSectionStyle);
    element.setAttribute('data-late-static', '1');
  };

  return new HTMLRewriter()
    .on('script[src*="membership-entry-survey-v1.js"]', {
      element(element) { element.remove(); }
    })
    .on('script[src*="membership-page-v2.js"]', {
      element(element) { element.remove(); }
    })
    .on('#real-cost', {
      element(element) { applyDesktopLateStyle(element); }
    })
    .on('#calculator', {
      element(element) { applyDesktopLateStyle(element); }
    })
    .on('#plans', {
      element(element) { applyDesktopLateStyle(element); }
    })
    .on('#membership-terms', {
      element(element) { applyDesktopLateStyle(element); }
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
          (isMobile ? '<script defer src="/membership/membership-mobile-final-v1.js?v=20260901-2"></script>' : '') +
          '<script defer src="/membership/membership-stage3-v1.js?v=20260901-2"></script>' +
          (isMobile ? '<script defer src="/membership/membership-mobile-motion-v1.js?v=20260901-1"></script>' : ''),
          { html: true }
        );
      }
    })
    .transform(response);
}

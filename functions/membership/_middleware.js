export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.append(
          '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' +
          '<link rel="stylesheet" href="/membership/membership-partner-harmony-v1.css?v=20260831-2">',
          { html: true }
        );
      }
    })
    .on('body', {
      element(element) {
        element.append(
          '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>' +
          '<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>' +
          '<script defer src="/membership/membership-price-bridge-v1.js?v=20260831-6"></script>' +
          '<script defer src="/membership/membership-adflow-1-4-v1.js?v=20260831-8"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

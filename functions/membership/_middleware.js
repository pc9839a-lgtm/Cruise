export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('body', {
      element(element) {
        element.append(
          '<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>' +
          '<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>' +
          '<script src="/membership/membership-price-bridge-v1.js?v=20260831-5"></script>' +
          '<script src="/membership/membership-adflow-1-4-v1.js?v=20260831-7"></script>' +
          '<link rel="stylesheet" href="/membership/membership-partner-harmony-v1.css?v=20260831-1">',
          { html: true }
        );
      }
    })
    .transform(response);
}

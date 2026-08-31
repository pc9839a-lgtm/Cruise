export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('body', {
      element(element) {
        element.append('<script src="/membership/membership-price-bridge-v1.js?v=20260831-3"></script><script src="/membership/membership-adflow-1-4-v1.js?v=20260831-2"></script>', { html: true });
      }
    })
    .transform(response);
}

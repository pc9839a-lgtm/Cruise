// The membership page owns its HTML and CSS. Do not inject legacy sections.
export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;
  return new HTMLRewriter().on('head', {
    element(el) {
      el.prepend('<script defer src="/assets/js/agent-persistence.js?v=20260831-1"></script>', { html:true });
    }
  }).transform(response);
}

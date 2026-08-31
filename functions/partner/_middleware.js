export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.prepend(
          '<script src="/assets/js/agent-persistence.js?v=20260831-1"></script>',
          { html: true }
        );
      }
    })
    .transform(response);
}

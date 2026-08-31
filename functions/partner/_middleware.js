const MEMBERSHIP_OG_IMAGE = 'https://cruiseplay-dyt.pages.dev/img/og-membership.jpg';

export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('meta[property="og:image"]', {
      element(element) {
        element.setAttribute('content', MEMBERSHIP_OG_IMAGE);
      }
    })
    .on('meta[name="twitter:image"]', {
      element(element) {
        element.setAttribute('content', MEMBERSHIP_OG_IMAGE);
      }
    })
    .on('head', {
      element(element) {
        element.prepend(
          '<script src="/assets/js/agent-persistence.js?v=20260831-1"></script>',
          { html: true }
        );
        element.append(
          `<meta name="twitter:image" content="${MEMBERSHIP_OG_IMAGE}" />`,
          { html: true }
        );
      }
    })
    .transform(response);
}

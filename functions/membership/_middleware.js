const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-13"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-sections-v2.js?v=20260830-3"></script>';

class MembershipScriptInjector {
  element(element) {
    element.prepend(SURVEY_SCRIPT + CONVERSION_SCRIPT, { html: true });
  }
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  const isMembershipLanding =
    (url.pathname === '/membership/' || url.pathname === '/membership/index.html') &&
    contentType.includes('text/html');

  if (!isMembershipLanding) return response;

  return new HTMLRewriter()
    .on('body', new MembershipScriptInjector())
    .on('.hero-benefit-row', new RemoveElement())
    .on('.hero-actions', new RemoveElement())
    .transform(response);
}

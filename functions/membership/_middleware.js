const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-11"></script><script src="/membership/membership-entry-survey-result-compact-v1.js?v=20260830-1"></script>';

class MembershipSurveyInjector {
  element(element) {
    element.prepend(SURVEY_SCRIPT, { html: true });
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
    .on('body', new MembershipSurveyInjector())
    .transform(response);
}

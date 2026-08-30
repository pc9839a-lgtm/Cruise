const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-8"></script>';
const POLISH_SCRIPT = '<script src="/membership/membership-polish-v9.js?v=20260830-3"></script>';
const CENTER_STYLE = `<style id="membership-center-restore">
.pmx-inner,.ad-inner,
#trust-proof .pmx-inner,
#quick-result .pmx-inner,
#subscribe-bridge .pmx-inner,
#subscribe-bridge .ad-inner,
#price-match .pmx-inner,
#price-match .ad-inner,
#signup-steps .pmx-inner,
#signup-steps .ad-inner,
#hotel-benefit .pmx-inner,
#hotel-benefit .ad-inner,
#calculator .section-head,
#plans .membership-section-head{
  text-align:center!important;
}

.ad-title,.pmx-big-title,
#trust-proof .pmx-big-title,
#quick-result .pmx-big-title,
#travel-desire .pmx-big-title,
#subscribe-bridge .pmx-big-title,
#price-match .pmx-big-title,
#signup-steps .pmx-big-title,
#hotel-benefit .pmx-big-title,
#calculator .section-head h2,
#plans .membership-section-head h2{
  text-align:center!important;
  margin-left:auto!important;
  margin-right:auto!important;
}

.pmx-cruise-copy{
  text-align:center!important;
}

.pmx-brand,.ad-label,.ad-copy,.pmx-save,
#hotel-benefit p,
#price-match p{
  text-align:center!important;
  margin-left:auto!important;
  margin-right:auto!important;
}

.pmx-trust-item,
.pmx-price-unit,
.pmx-step,
.pmx-tripline-item,
.pmx-trip-item{
  text-align:center!important;
}

.pmx-trust-item{
  padding-left:24px!important;
  padding-right:24px!important;
}

.pmx-tripline-item,.pmx-trip-item{
  align-items:center!important;
}

@media(max-width:780px){
  .pmx-inner,.ad-inner,.pmx-cruise-copy{
    text-align:center!important;
  }
}
</style>`;

class MembershipScriptInjector {
  element(element) {
    element.prepend(SURVEY_SCRIPT + CONVERSION_SCRIPT + POLISH_SCRIPT + CENTER_STYLE, { html: true });
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

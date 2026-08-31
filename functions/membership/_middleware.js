const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-8"></script>';
const POLISH_SCRIPT = '<script src="/membership/membership-polish-v9.js?v=20260830-2"></script>';
const PAGE_PATCH = '<script src="/membership/membership-page-patch-v1.js?v=20260831-1"></script>';
const FINAL_PATCH = `<script>
(function(){
  function patchMembershipBottom(){
    var image=document.querySelector('#travel-desire .pmx-cruise-visual img');
    if(image){
      image.src='https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=85&w=1800';
      image.alt='크루즈 선상 수영장과 바다 풍경';
      image.style.objectPosition='center 52%';
    }

    ['join-faq','ig8-rule','ig8-final'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.remove();
    });

    var oldCustom=document.getElementById('pmx-bottom-cta');
    if(oldCustom) oldCustom.remove();
  }
  function run(){
    setTimeout(patchMembershipBottom,140);
    setTimeout(patchMembershipBottom,700);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
})();
</script>`;

class MembershipScriptInjector {
  element(element) {
    element.prepend(SURVEY_SCRIPT + CONVERSION_SCRIPT + POLISH_SCRIPT + FINAL_PATCH + PAGE_PATCH, { html: true });
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
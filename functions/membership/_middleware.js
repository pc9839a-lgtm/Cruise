const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-8"></script>';
const POLISH_SCRIPT = '<script src="/membership/membership-polish-v9.js?v=20260830-2"></script>';
const FINAL_PATCH = `<style>
#pmx-bottom-cta{padding:72px 20px 82px;background:#fff;text-align:center;border-top:1px solid #e5e9ef}
#pmx-bottom-cta .pmx-bottom-cta-btn{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:70px;margin:0 auto;padding:0 28px;border:0;border-radius:18px;background:#1f4f96;color:#fff;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:clamp(22px,2.5vw,28px);font-weight:800;letter-spacing:-.035em;cursor:pointer}
@media(max-width:780px){#pmx-bottom-cta{padding:52px 16px 62px}#pmx-bottom-cta .pmx-bottom-cta-btn{min-height:64px;border-radius:16px;font-size:22px}}
</style>
<script>
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

    var hotel=document.getElementById('hotel-benefit');
    if(hotel){
      var section=document.createElement('section');
      section.id='pmx-bottom-cta';
      section.innerHTML='<button type="button" class="pmx-bottom-cta-btn">내 여행비 미리 준비하기</button>';
      hotel.insertAdjacentElement('afterend',section);
      section.querySelector('button').addEventListener('click',function(){
        var plans=document.getElementById('plans');
        if(plans) plans.scrollIntoView({behavior:'smooth',block:'start'});
      });
    }

    document.querySelectorAll('#pmx-bottom-cta svg').forEach(function(svg){svg.remove();});
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
    element.prepend(SURVEY_SCRIPT + CONVERSION_SCRIPT + POLISH_SCRIPT + FINAL_PATCH, { html: true });
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

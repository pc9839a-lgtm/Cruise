const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const FINAL_RENDERER = '<script src="/membership/membership-polish-v9.js?v=20260831-6"></script>';
const COPY_SCRIPT = `<script>
(function(){
  function html(sel, value){
    const el = document.querySelector(sel);
    if (el && el.innerHTML !== value) el.innerHTML = value;
  }
  function text(sel, value){
    const el = document.querySelector(sel);
    if (el && el.textContent !== value) el.textContent = value;
  }
  function next(id, value){
    html('#' + id + ' .pmx-next', value + '<span class="arrow">↓</span>');
  }
  function applyCopy(){
    if (!document.getElementById('subscribe-start')) return false;

    html('#travel-desire .pmx-title', '크루즈는 가고 싶은데<br><strong>최저가로 갈 수 있는 방법 없을까요?</strong>');
    text('#travel-desire .pmx-lead', '예약할 때보다, 여행을 준비하는 방법에서 가격이 달라집니다.');
    next('travel-desire', '<strong>여행도 구독하면 가격이 달라집니다.</strong>');

    text('#subscribe-why .pmx-label', '여행도 구독하면');
    html('#subscribe-why .pmx-title', '여행도 구독하면<br><strong>가격이 달라집니다</strong>');
    html('#subscribe-why .pmx-why-line', '<strong>$100 구독 → 200P 적립</strong>');
    next('subscribe-why', '<strong>낸 돈보다 더 크게 쌓이는 첫 달.</strong>');

    html('#subscribe-start .pmx-title', '첫 <strong>$200</strong>부터<br><strong>350P로 시작</strong>');
    text('#subscribe-start .pmx-lead', '시작부터, 낸 금액보다 더 크게 쌓입니다.');
    next('subscribe-start', '<strong>첫 달만 그런 게 아닙니다.</strong>');

    html('#subscribe-monthly .pmx-title', '그 다음부터는<br><strong>$100이 매달 200P로</strong>');
    text('#subscribe-monthly .pmx-lead', '여행이 멀수록, 준비할 시간은 더 많습니다.');
    next('subscribe-monthly', '<strong>시간이 쌓이면, 포인트 차이는 더 커집니다.</strong>');

    html('#subscribe-seven .pmx-title', '내가 낸 건 <strong>$900</strong><br>쌓인 건 <strong>1,750P</strong>');
    next('subscribe-seven', '<strong>이 포인트는 숫자로 끝나지 않습니다.</strong>');

    html('#subscribe-use .pmx-title', '<strong>$3,500 크루즈</strong><br>절반을 포인트로');
    html('#subscribe-use .pmx-use-note', '카드에서 빠지는 돈은 <strong>$1,750</strong>.');
    next('subscribe-use', '<strong>$3,500짜리 여행에, 내 돈은 얼마였을까?</strong>');

    html('#subscribe-result .pmx-title', '구독료까지 다 더해도<br><strong>$2,650</strong>');
    next('subscribe-result', '<strong>계산으로 만든 숫자가 아닙니다.</strong>');

    html('#real-booking-case .pmx-title', '계산으로 만든 숫자가 아닙니다<br><strong>실제 2인 7박 서부 지중해</strong>');
    next('real-booking-case', '<strong>싸다고, 아무 데서나 예약하진 않으니까.</strong>');

    html('#trust-proof .pmx-title', '싸다고<br><strong>아무 데서나 예약하진 않으니까</strong>');
    next('trust-proof', '<strong>배에서 내린 다음 여행까지.</strong>');

    html('#hotel-benefit .pmx-title', '크루즈에서 끝나는<br><strong>멤버십이 아닙니다</strong>');
    next('hotel-benefit', '<strong>그럼 내 여행은, 얼마가 달라질까?</strong>');

    html('#calculator .section-head h2', '그럼 내 여행은<br><strong>얼마가 달라질까?</strong>');

    html('#price-match .pmx-price-match-line h2', '그래도 더 싼 가격을 찾았다면?<br><strong>최저가 보장</strong>');

    html('#plans .membership-section-head h2', '여행은 정해졌고<br><strong>얼마나 빨리 모을지만 고르면 됩니다</strong>');
    const cards = document.querySelectorAll('#plans .plan-card');
    cards.forEach(function(card, index){
      const fit = card.querySelector('.plan-fit');
      if (!fit) return;
      const name = card.querySelector('.plan-name')?.textContent?.trim() || '';
      fit.textContent = /프리미엄/.test(name) || index === 1 ? '더 빠르게 적립' : '천천히 준비';
    });

    return true;
  }

  let tries = 0;
  function run(){
    tries += 1;
    applyCopy();
    if (tries < 20) setTimeout(run, 150);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once:true });
  } else {
    run();
  }
})();
</script>`;

class MembershipScriptInjector {
  element(element) {
    element.prepend(SURVEY_SCRIPT + FINAL_RENDERER + COPY_SCRIPT, { html: true });
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
const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-8"></script>';
const LEGACY_REBUILD_STYLE = `
<style>
  .legacy-rebuilt,.legacy-rebuilt *{box-sizing:border-box}
  .legacy-rebuilt{margin:0;padding:0;background:#fff;color:#10182b;overflow:hidden}
  .lg-section{position:relative;min-height:560px;display:flex;align-items:center;padding:86px 0}
  .lg-section.lg-compact{min-height:430px}
  .lg-white{background:#fff;color:#10182b}
  .lg-soft{background:#f4f6f9;color:#10182b}
  .lg-dark{background:#0c1730;color:#fff}
  .lg-wrap{width:min(1040px,100%);margin:0 auto;text-align:center}
  .lg-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:22px;padding:10px 17px;border-radius:999px;background:#eef3fb;color:#2c5da7;font-size:22px;line-height:1.2;font-weight:650;letter-spacing:-.03em}
  .lg-dark .lg-kicker{background:rgba(255,255,255,.10);color:#e5efff}
  .lg-title{max-width:920px;margin:0 auto;font-size:clamp(42px,5.4vw,70px);line-height:1.08;letter-spacing:-.055em;font-weight:570;word-break:keep-all;text-wrap:balance}
  .lg-title strong{font-weight:900}
  .lg-three{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:980px;margin:44px auto 0}
  .lg-three article,.lg-pair article{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:210px;padding:30px 22px;border-radius:28px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 44px rgba(23,49,92,.07)}
  .lg-three strong{font-size:clamp(42px,5vw,64px);line-height:1;font-weight:900;letter-spacing:-.05em}
  .lg-three span{margin-top:16px;font-size:clamp(24px,2.6vw,31px);line-height:1.2;font-weight:500;word-break:keep-all}
  .lg-pair{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:900px;margin:44px auto 0}
  .lg-dark .lg-pair article{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.16);box-shadow:none;color:#fff}
  .lg-pair strong{font-size:clamp(38px,4.6vw,60px);line-height:1.05;font-weight:830;letter-spacing:-.05em}
  .lg-pair span{margin-top:14px;font-size:clamp(24px,2.6vw,30px);font-weight:500;line-height:1.25}
  .lg-stay{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;max-width:880px;margin:44px auto 0}
  .lg-stay div{padding:28px 20px;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
  .lg-stay span{display:block;font-size:clamp(24px,2.7vw,31px);font-weight:500}
  .lg-stay strong{display:block;margin-top:10px;font-size:clamp(38px,4.6vw,58px);line-height:1;font-weight:880}
  .lg-stay b{font-size:34px;font-weight:500;color:#8796b1}
  .legacy-rebuilt .reveal{will-change:transform,opacity}
  @media(max-width:780px){
    .lg-section{min-height:500px;padding:68px 0}.lg-section.lg-compact{min-height:390px}
    .lg-title{font-size:clamp(35px,9.3vw,42px);line-height:1.13}.lg-kicker{font-size:19px;margin-bottom:18px;padding:9px 15px}
    .lg-three{grid-template-columns:1fr;gap:10px;margin-top:36px}.lg-three article{min-height:145px;padding:24px 16px}.lg-three strong{font-size:44px}.lg-three span{font-size:23px;margin-top:10px}
    .lg-pair{grid-template-columns:1fr 1fr;gap:10px;margin-top:36px}.lg-pair article{min-height:170px;padding:24px 12px;border-radius:23px}.lg-pair strong{font-size:31px}.lg-pair span{font-size:21px}
    .lg-stay{grid-template-columns:1fr;gap:10px;margin-top:34px}.lg-stay b{transform:rotate(90deg);font-size:26px}.lg-stay div{padding:22px 12px}.lg-stay span{font-size:22px}.lg-stay strong{font-size:39px}
  }
</style>`;

class MembershipScriptInjector {
  element(element) {
    element.prepend(LEGACY_REBUILD_STYLE + SURVEY_SCRIPT + CONVERSION_SCRIPT, { html: true });
  }
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

class PriceMatchRebuilder {
  element(element) {
    element.setAttribute('class', 'legacy-rebuilt legacy-price-match');
    element.setInnerContent(`
      <div class="lg-section lg-white">
        <div class="container lg-wrap">
          <span class="lg-kicker reveal reveal-rise">최저가 보장</span>
          <h2 class="lg-title reveal reveal-rise">같은 크루즈가 더 싸다면<br><strong>가격을 맞춥니다</strong></h2>
        </div>
      </div>
      <div class="lg-section lg-soft lg-compact">
        <div class="container lg-wrap">
          <div class="lg-three">
            <article class="reveal reveal-left"><strong>$100 이상</strong><span>가격 차이가 나면</span></article>
            <article class="reveal reveal-scale"><strong>동일 조건</strong><span>크루즈 · 일정 확인</span></article>
            <article class="reveal reveal-right"><strong>가격 조정</strong><span>조건 확인 후 적용</span></article>
          </div>
        </div>
      </div>`, { html: true });
  }
}

class HotelBenefitRebuilder {
  element(element) {
    element.setAttribute('class', 'legacy-rebuilt legacy-hotel-benefit');
    element.setInnerContent(`
      <div class="lg-section lg-dark">
        <div class="container lg-wrap">
          <span class="lg-kicker reveal reveal-rise">크루즈 외에도</span>
          <h2 class="lg-title reveal reveal-rise">여행 전후 일정까지<br><strong>한 번에 준비할 수 있습니다</strong></h2>
          <div class="lg-pair">
            <article class="reveal reveal-left"><strong>전세계 호텔</strong><span>숙박 예약</span></article>
            <article class="reveal reveal-right"><strong>현지 투어</strong><span>여행 일정 확장</span></article>
          </div>
        </div>
      </div>
      <div class="lg-section lg-white lg-compact">
        <div class="container lg-wrap">
          <h2 class="lg-title reveal reveal-rise">크루즈 전후 <strong>1박</strong>도<br>같이 준비하세요</h2>
          <div class="lg-stay">
            <div class="reveal reveal-left"><span>출발 전</span><strong>1박</strong></div>
            <b class="reveal reveal-scale">+</b>
            <div class="reveal reveal-right"><span>귀국 후</span><strong>1박</strong></div>
          </div>
        </div>
      </div>`, { html: true });
  }
}

class ReplaceNavText {
  constructor(text) { this.text = text; }
  element(element) { element.setInnerContent(this.text); }
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
    .on('#price-match', new PriceMatchRebuilder())
    .on('#membership-summary', new RemoveElement())
    .on('#hotel-benefit', new HotelBenefitRebuilder())
    .on('.hero-nav-track a[href="#membership-summary"]', new RemoveElement())
    .on('.hero-nav-track a[href="#price-match"] span', new ReplaceNavText('최저가 보장'))
    .on('.hero-nav-track a[href="#hotel-benefit"] span', new ReplaceNavText('호텔 · 투어'))
    .transform(response);
}

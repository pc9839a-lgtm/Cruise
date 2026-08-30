const SURVEY_SCRIPT = '<script src="/membership/membership-entry-survey-v1.js?v=20260830-14"></script>';
const CONVERSION_SCRIPT = '<script src="/membership/membership-conversion-v3.js?v=20260830-7"></script>';
const LEGACY_PATCH_STYLE = '<style>' +
  '.safe-benefit,.safe-benefit *{box-sizing:border-box}' +
  '.safe-block{position:relative;display:flex;align-items:center;min-height:520px;padding:82px 0;overflow:hidden}' +
  '.safe-block.safe-compact{min-height:390px}' +
  '.safe-white{background:#fff;color:#10182b}' +
  '.safe-soft{background:#f4f6f9;color:#10182b}' +
  '.safe-dark{background:#0c1730;color:#fff}' +
  '.safe-wrap{width:min(1040px,100%);margin:0 auto;text-align:center}' +
  '.safe-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:22px;padding:10px 17px;border-radius:999px;background:#eef3fb;color:#2c5da7;font-size:22px;line-height:1.2;font-weight:650;letter-spacing:-.03em}' +
  '.safe-dark .safe-kicker{background:rgba(255,255,255,.10);color:#e5efff}' +
  '.safe-title{max-width:920px;margin:0 auto;font-size:clamp(42px,5.4vw,70px);line-height:1.08;letter-spacing:-.055em;font-weight:570;word-break:keep-all;text-wrap:balance}' +
  '.safe-title strong{font-weight:900}' +
  '.safe-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:980px;margin:0 auto}' +
  '.safe-step{min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 20px;border-radius:28px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 44px rgba(23,49,92,.07)}' +
  '.safe-step span{font-size:22px;font-weight:600;color:#2d6cff}' +
  '.safe-step strong{margin-top:14px;font-size:clamp(30px,3.2vw,42px);line-height:1.08;font-weight:820;letter-spacing:-.045em;word-break:keep-all}' +
  '.safe-pair{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:900px;margin:44px auto 0}' +
  '.safe-pair article{min-height:210px;display:flex;align-items:center;justify-content:center;padding:30px 22px;border-radius:28px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#fff}' +
  '.safe-pair strong{font-size:clamp(34px,4vw,54px);line-height:1.05;font-weight:780;letter-spacing:-.05em;word-break:keep-all}' +
  '.safe-stay{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;max-width:880px;margin:42px auto 0}' +
  '.safe-stay div{padding:26px 18px;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}' +
  '.safe-stay span{display:block;font-size:clamp(24px,2.7vw,31px);font-weight:500}' +
  '.safe-stay strong{display:block;margin-top:8px;font-size:clamp(38px,4.6vw,58px);line-height:1;font-weight:880}' +
  '.safe-stay b{font-size:34px;font-weight:500;color:#8796b1}' +
  '@media(max-width:780px){' +
    '.safe-block{min-height:470px;padding:66px 0}.safe-block.safe-compact{min-height:350px}' +
    '.safe-title{font-size:clamp(35px,9.3vw,42px);line-height:1.13}.safe-kicker{font-size:19px;margin-bottom:18px;padding:9px 15px}' +
    '.safe-steps{grid-template-columns:1fr;gap:10px}.safe-step{min-height:132px;padding:22px 16px}.safe-step span{font-size:18px}.safe-step strong{font-size:30px;margin-top:8px}' +
    '.safe-pair{grid-template-columns:1fr 1fr;gap:10px;margin-top:34px}.safe-pair article{min-height:160px;padding:22px 12px;border-radius:22px}.safe-pair strong{font-size:29px}' +
    '.safe-stay{grid-template-columns:1fr;gap:10px;margin-top:32px}.safe-stay b{transform:rotate(90deg);font-size:26px}.safe-stay div{padding:20px 12px}.safe-stay span{font-size:22px}.safe-stay strong{font-size:39px}' +
  '}' +
'</style>';
const LEGACY_PATCH_SCRIPT = '<script>(function(){function patch(){' +
  'var summary=document.getElementById("membership-summary");if(summary)summary.remove();' +
  'document.querySelectorAll(".hero-nav-track a[href=\\"#membership-summary\\"]").forEach(function(a){a.remove();});' +
  'document.querySelectorAll(".hero-nav-track a[href=\\"#price-match\\"] span").forEach(function(s){s.textContent="최저가 보장";});' +
  'document.querySelectorAll(".hero-nav-track a[href=\\"#hotel-benefit\\"] span").forEach(function(s){s.textContent="호텔 · 투어";});' +
  'var pm=document.getElementById("price-match");if(pm){pm.className="safe-benefit";pm.innerHTML=' +
    '`<div class="safe-block safe-white"><div class="container safe-wrap"><span class="safe-kicker reveal reveal-rise">최저가 보장</span><h2 class="safe-title reveal reveal-rise">같은 크루즈가 더 저렴하다면<br><strong>가격을 맞춰드립니다</strong></h2></div></div><div class="safe-block safe-soft safe-compact"><div class="container safe-wrap"><div class="safe-steps"><article class="safe-step reveal reveal-left"><span>01</span><strong>같은 크루즈 확인</strong></article><article class="safe-step reveal reveal-scale"><span>02</span><strong>$100 이상 차이</strong></article><article class="safe-step reveal reveal-right"><span>03</span><strong>가격 조정</strong></article></div></div></div>`' +
  ';}' +
  'var hb=document.getElementById("hotel-benefit");if(hb){hb.className="safe-benefit";hb.innerHTML=' +
    '`<div class="safe-block safe-dark"><div class="container safe-wrap"><span class="safe-kicker reveal reveal-rise">크루즈 외에도</span><h2 class="safe-title reveal reveal-rise">여행 전후 일정까지<br><strong>한 번에 준비할 수 있습니다</strong></h2><div class="safe-pair"><article class="reveal reveal-left"><strong>전세계 호텔</strong></article><article class="reveal reveal-right"><strong>현지 투어</strong></article></div></div></div><div class="safe-block safe-white safe-compact"><div class="container safe-wrap"><h2 class="safe-title reveal reveal-rise">크루즈 전후 <strong>1박</strong>도<br>같이 준비하세요</h2><div class="safe-stay"><div class="reveal reveal-left"><span>출발 전</span><strong>1박</strong></div><b class="reveal reveal-scale">+</b><div class="reveal reveal-right"><span>귀국 후</span><strong>1박</strong></div></div></div></div>`' +
  ';}' +
'}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",patch,{once:true});}else{patch();}})();</script>';

class MembershipScriptInjector {
  element(element) {
    element.prepend(LEGACY_PATCH_STYLE + SURVEY_SCRIPT + CONVERSION_SCRIPT + LEGACY_PATCH_SCRIPT, { html: true });
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

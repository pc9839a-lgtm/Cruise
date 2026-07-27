const FAQ_HTML = `
<section class="partner-seo-faq" aria-labelledby="partnerFaqTitle">
  <div class="partner-container partner-seo-faq-inner">
    <span class="partner-seo-faq-label">PARTNER GUIDE</span>
    <h2 id="partnerFaqTitle">파트너 활동, 이것만 확인하세요</h2>
    <div class="partner-seo-faq-list">
      <details>
        <summary>크루즈플레이 파트너는 어떤 활동을 하나요?</summary>
        <p>직접 경험한 크루즈 여행과 멤버십 정보를 소개하고, 관심 있는 사람의 첫 상담과 여행 준비를 돕습니다.</p>
      </details>
      <details>
        <summary>누구나 신청할 수 있나요?</summary>
        <p>19세 이상 성인이며 해외여행에 결격사유가 없다면 상담을 신청할 수 있습니다.</p>
      </details>
      <details>
        <summary>정규직이나 고정급 형태인가요?</summary>
        <p>정규직·계약직 채용이 아닌 파트너 활동이며 고정급이 지급되는 근로계약 형태가 아닙니다.</p>
      </details>
      <details>
        <summary>보상은 어떻게 발생하나요?</summary>
        <p>활동, 자격 유지, 추천과 팀 실적 등 지급 조건을 충족한 경우 보상이 발생할 수 있습니다.</p>
      </details>
      <details>
        <summary>신청 후 어떤 안내를 받나요?</summary>
        <p>멤버십 비용과 유지 조건, 실제 활동 방식, 교육과 지원 내용을 상담을 통해 안내받습니다.</p>
      </details>
    </div>
    <a class="partner-seo-guide-link" href="/partner/guide/">활동 방식과 가입 조건 자세히 보기 →</a>
  </div>
</section>`;

const HEAD_HTML = `
<style>
.partner-seo-faq{padding:88px 0;background:#f7f9fc;color:#0b1728}
.partner-seo-faq-inner{max-width:920px}
.partner-seo-faq-label{display:block;margin-bottom:12px;color:#2d68ff;font-size:12px;font-weight:900;letter-spacing:.14em}
.partner-seo-faq h2{margin:0 0 28px;font-size:clamp(30px,5vw,52px);line-height:1.12;letter-spacing:-.055em}
.partner-seo-faq-list{display:grid;gap:10px}
.partner-seo-faq details{border:1px solid #dfe6ef;border-radius:16px;background:#fff;overflow:hidden}
.partner-seo-faq summary{position:relative;padding:20px 52px 20px 20px;font-size:16px;font-weight:850;line-height:1.45;cursor:pointer;list-style:none}
.partner-seo-faq summary::-webkit-details-marker{display:none}
.partner-seo-faq summary:after{content:'+';position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:24px;font-weight:500;color:#2d68ff}
.partner-seo-faq details[open] summary:after{content:'−'}
.partner-seo-faq details p{margin:0;padding:0 20px 20px;color:#4a596c;font-size:15px;line-height:1.75}
.partner-seo-guide-link{display:inline-flex;margin-top:22px;padding:13px 18px;border-radius:999px;background:#0b1728;color:#fff;font-size:14px;font-weight:850;text-decoration:none}
@media(max-width:700px){.partner-seo-faq{padding:64px 0}.partner-seo-faq summary{padding:18px 48px 18px 16px;font-size:15px}.partner-seo-faq details p{padding:0 16px 18px;font-size:14px}}
</style>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"크루즈 파트너 활동 안내","url":"https://cruiseplay-dyt.pages.dev/partner/","description":"크루즈 여행을 직접 경험하고 여행 정보를 안내하는 크루즈플레이 파트너의 활동 방식과 상담 안내 페이지입니다.","isPartOf":{"@type":"WebSite","name":"크루즈플레이","url":"https://cruiseplay-dyt.pages.dev/"}}</script>`;

class RobotsMetaHandler {
  element(element) {
    element.setAttribute('content', 'index,follow,max-image-preview:large,max-snippet:-1');
  }
}

class MetaContentHandler {
  constructor(content) { this.content = content; }
  element(element) { element.setAttribute('content', this.content); }
}

class TitleHandler {
  element(element) { element.setInnerContent('크루즈 파트너 활동 안내 | 크루즈플레이'); }
}

class FixedTextHandler {
  constructor(text) { this.text = text; }
  element(element) { element.setInnerContent(this.text); }
}

class HeadHandler {
  element(element) { element.append(HEAD_HTML, { html: true }); }
}

class FormHandler {
  element(element) { element.before(FAQ_HTML, { html: true }); }
}

class FooterLinksHandler {
  element(element) {
    element.append('<a href="/partner/guide/">파트너 활동 안내</a>', { html: true });
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.includes('text/html')) return response;

  const headers = new Headers(response.headers);
  headers.delete('X-Robots-Tag');
  headers.set('X-Robots-Tag', 'index, follow');
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

  const cleanResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });

  return new HTMLRewriter()
    .on('title', new TitleHandler())
    .on('meta[name="robots"]', new RobotsMetaHandler())
    .on('meta[name="description"]', new MetaContentHandler('크루즈 여행을 직접 경험하고 여행 정보를 안내하는 크루즈플레이 파트너의 활동 방식, 가입 조건, 지원 내용과 상담 방법을 확인하세요.'))
    .on('meta[property="og:title"]', new MetaContentHandler('크루즈 파트너 활동 안내 | 크루즈플레이'))
    .on('meta[property="og:description"]', new MetaContentHandler('크루즈플레이 파트너의 활동 방식, 가입 조건, 지원 내용과 상담 방법을 확인하세요.'))
    .on('head', new HeadHandler())
    .on('[data-count="3720"]', new FixedTextHandler('3720만 명'))
    .on('[data-count="3830"]', new FixedTextHandler('3830만 명'))
    .on('[data-count="0.8"]', new FixedTextHandler('0.8%'))
    .on('#partner-form', new FormHandler())
    .on('.partner-footer-links', new FooterLinksHandler())
    .transform(cleanResponse);
}

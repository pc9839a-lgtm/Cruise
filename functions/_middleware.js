const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Strict-Transport-Security': 'max-age=31536000',
  'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src-attr 'none'; upgrade-insecure-requests"
};

const BRAND_FROM = '크루즈플레이';
const BRAND_TO = '오케이크루즈';
const NAVER_CAFE_URL = 'https://cafe.naver.com/okayrental';
const ADSENSE_CLIENT = 'ca-pub-1906196934401001';
const ADSENSE_CONNECT_SCRIPT = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`;
const EARLY_QUERY_GUARD = `<script>(function(){try{var u=new URL(location.href);var n=new URLSearchParams();var rules={agent:40,utm_source:80,utm_medium:80,utm_campaign:80,inquiryType:40};Object.keys(rules).forEach(function(k){var v=(u.searchParams.get(k)||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,rules[k]);if(!v)return;if(k==='agent'&&!/^[A-Za-z0-9_-]+$/.test(v))return;if(k==='inquiryType'&&!/^[A-Za-z0-9_-]+$/.test(v))return;n.set(k,v)});if(u.searchParams.get('openInquiry')==='1')n.set('openInquiry','1');var s=n.toString();var clean=u.pathname+(s?'?'+s:'')+u.hash;if(clean!==u.pathname+u.search+u.hash)history.replaceState(null,'',clean)}catch(e){}})();</script>`;
const RSS_DISCOVERY_LINK = '<link rel="alternate" type="application/rss+xml" title="오케이크루즈 콘텐츠 RSS" href="/rss.xml" />';
const PARTNER_EDGE_STYLE = `<style id="partner-edge-image-fix">\n.hero-bg{display:block!important;opacity:1!important;visibility:visible!important}\n#partnerKakaoConsult,.partner-kakao-consult{display:none!important}\n</style>`;
const PARTNER_DIRECT_ASSETS = '<link rel="stylesheet" href="/partner/partner-original-photos-v13.css?v=20260714-originals-v13"><link rel="stylesheet" href="/partner/partner-balanced-benefits-v14.css?v=20260714-balanced-v14"><link rel="stylesheet" href="/partner/partner-mobile-fix-v18.css?v=20260714-mobile-v18">';
const HOMEPAGE_CAFE_NAV = `<a href="${NAVER_CAFE_URL}" target="_blank" rel="noopener noreferrer">네이버 카페</a>`;
const HOMEPAGE_CAFE_STYLE = `<style id="homepage-cafe-section-style">
.cafe-community-section{padding:96px 24px;background:#f5faf7}
.cafe-community-wrap{max-width:1180px;margin:0 auto}
.cafe-community-card{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.65fr);overflow:hidden;background:#fff;border:1px solid rgba(3,199,90,.16);border-radius:28px;box-shadow:0 18px 50px rgba(20,56,35,.08)}
.cafe-community-copy{padding:58px 60px}
.cafe-community-label{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;font-size:12px;font-weight:800;letter-spacing:.14em;color:#03a94f}
.cafe-community-label:before{content:'';width:8px;height:8px;border-radius:50%;background:#03c75a}
.cafe-community-title{margin:0;font-size:38px;line-height:1.28;letter-spacing:-.045em;color:#151a17}
.cafe-community-desc{margin:22px 0 0;max-width:680px;font-size:17px;line-height:1.8;color:#5d6660}
.cafe-community-points{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.cafe-community-point{display:inline-flex;align-items:center;min-height:38px;padding:0 14px;border-radius:999px;background:#f0f7f3;font-size:14px;font-weight:700;color:#34423a}
.cafe-community-actions{display:flex;align-items:center;gap:14px;margin-top:34px;flex-wrap:wrap}
.cafe-community-btn{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 24px;border-radius:14px;background:#03c75a;color:#fff!important;text-decoration:none;font-size:15px;font-weight:800;box-shadow:0 10px 24px rgba(3,199,90,.2);transition:transform .2s ease,box-shadow .2s ease}
.cafe-community-btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(3,199,90,.26)}
.cafe-community-note{font-size:13px;color:#8a928d}
.cafe-community-visual{display:flex;align-items:center;justify-content:center;min-height:100%;padding:42px;background:linear-gradient(145deg,#e9f8ef 0%,#f8fcfa 100%)}
.cafe-community-mark{display:flex;flex-direction:column;align-items:center;text-align:center}
.cafe-community-n{display:flex;align-items:center;justify-content:center;width:112px;height:112px;border-radius:28px;background:#03c75a;color:#fff;font-size:58px;font-weight:900;line-height:1;box-shadow:0 18px 38px rgba(3,199,90,.24)}
.cafe-community-mark strong{margin-top:22px;font-size:20px;color:#18221c}
.cafe-community-mark span{margin-top:7px;font-size:14px;color:#647069}
@media (max-width:820px){.cafe-community-section{padding:64px 18px}.cafe-community-card{grid-template-columns:1fr}.cafe-community-copy{padding:38px 28px}.cafe-community-title{font-size:30px}.cafe-community-desc{font-size:15px}.cafe-community-visual{min-height:240px;padding:34px}.cafe-community-n{width:92px;height:92px;border-radius:24px;font-size:48px}}
@media (max-width:480px){.cafe-community-section{padding:52px 16px}.cafe-community-copy{padding:32px 22px}.cafe-community-title{font-size:27px}.cafe-community-points{gap:8px}.cafe-community-point{font-size:13px}.cafe-community-btn{width:100%}.cafe-community-note{width:100%;text-align:center}}
</style>`;
const HOMEPAGE_CAFE_SECTION = `<section class="cafe-community-section" id="cafeCommunity" aria-labelledby="cafeCommunityTitle">
  <div class="cafe-community-wrap">
    <div class="cafe-community-card">
      <div class="cafe-community-copy">
        <span class="cafe-community-label">OKAY CRUISE COMMUNITY</span>
        <h2 class="cafe-community-title" id="cafeCommunityTitle">오케이크루즈 네이버 카페에서<br>더 많은 크루즈 이야기를 만나보세요.</h2>
        <p class="cafe-community-desc">출항 소식부터 실제 여행 후기, 준비 팁과 자주 묻는 질문까지. 홈페이지에서 다 담지 못한 크루즈 정보를 네이버 카페에서 더 편하게 확인할 수 있습니다.</p>
        <div class="cafe-community-points" aria-label="카페 주요 콘텐츠">
          <span class="cafe-community-point">최신 크루즈 소식</span>
          <span class="cafe-community-point">실제 여행 후기</span>
          <span class="cafe-community-point">여행 준비 정보</span>
          <span class="cafe-community-point">질문 · 정보 공유</span>
        </div>
        <div class="cafe-community-actions">
          <a class="cafe-community-btn" href="${NAVER_CAFE_URL}" target="_blank" rel="noopener noreferrer">네이버 카페 바로가기 →</a>
          <span class="cafe-community-note">새 창에서 열립니다.</span>
        </div>
      </div>
      <div class="cafe-community-visual" aria-hidden="true">
        <div class="cafe-community-mark">
          <div class="cafe-community-n">N</div>
          <strong>오케이크루즈</strong>
          <span>NAVER CAFE</span>
        </div>
      </div>
    </div>
  </div>
</section>`;

const HOMEPAGE_CONTENT_CARDS = `
<article class="sheet-extra-card"><div class="sheet-extra-chip">승선 준비</div><h3>크루즈 터미널에는 몇 시에 도착해야 할까?</h3><p>도착 슬롯, 최종 승선 마감, 출항 시각의 차이와 부산·해외 출발 시 준비 기준을 공식 자료와 함께 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-terminal-arrival-time-checkin-guide/" class="btn">가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">초보 가이드</div><h3>첫 크루즈 여행, 무엇부터 비교해야 할까?</h3><p>처음 예약할 때 놓치기 쉬운 일정, 선실, 포함 비용, 기항지 동선을 한 번에 확인할 수 있도록 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/first-cruise-guide/" class="btn">가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">비용</div><h3>크루즈 비용은 객실 가격이 전부가 아닙니다</h3><p>항만세, 서비스 요금, 음료, 와이파이, 기항지 이동비 등 실제 여행 예산에 들어가는 항목을 나눠 설명합니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-cost-breakdown/" class="btn">비용 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">선실 선택</div><h3>발코니 객실이 꼭 필요한지 판단하는 기준</h3><p>인사이드·오션뷰·발코니 객실의 차이를 예산과 여행 스타일 기준으로 비교해 선택 기준을 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-balcony-cabin-guide/" class="btn">선실 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">수하물</div><h3>크루즈 수하물과 캐리어 준비 방법</h3><p>위탁 수하물과 휴대가방을 나누는 방법, 승선 첫날 바로 필요한 물품과 준비 순서를 확인할 수 있습니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-luggage-guide/" class="btn">수하물 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">여행지 선택</div><h3>한국인이 첫 크루즈로 가기 좋은 여행지</h3><p>일본·대만, 오키나와, 싱가포르와 한국 출발 일정을 첫 크루즈 관점에서 비교해 선택 포인트를 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/best-first-cruise-destinations-for-koreans/" class="btn">여행지 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">커뮤니티</div><h3>오케이크루즈 네이버 카페</h3><p>크루즈 여행 정보와 새로운 소식, 실제 여행 이야기를 네이버 카페에서도 편하게 확인해보세요.</p><div class="sheet-extra-action"><a href="${NAVER_CAFE_URL}" target="_blank" rel="noopener noreferrer" class="btn">카페 바로가기</a></div></article>`;

const BLOG_NAV = `<a href="/">홈</a><a href="/blog/" class="is-current">콘텐츠</a><a href="/about/">사이트 소개</a><a href="/contact/">문의 안내</a>`;
const BLOG_FOOTER = `<div><strong>오케이크루즈 콘텐츠</strong><span>크루즈 여행 준비에 필요한 정보를 공식 자료와 실제 준비 흐름을 기준으로 정리합니다.</span></div><nav aria-label="사이트 정책" style="display:flex;gap:12px;flex-wrap:wrap"><a href="/about/">사이트 소개</a><a href="/privacy/">개인정보처리방침</a><a href="/terms/">이용약관</a><a href="/contact/">문의 안내</a></nav>`;

const PASSTHROUGH_PATHS = new Set([
  '/ads.txt', '/sitemap-google.xml', '/sitemap.xml', '/sitemap.txt',
  '/sitemap-2026.xml', '/robots.txt'
]);

function shouldBypassHtmlMiddleware(pathname) {
  return PASSTHROUGH_PATHS.has(pathname) || pathname.startsWith('/img/');
}

function shouldRewriteBrand(contentType) {
  return contentType.startsWith('text/') ||
    contentType.includes('javascript') ||
    contentType.includes('json') ||
    contentType.includes('xml') ||
    contentType.includes('rss');
}

class HeadSecurityInjector {
  constructor(isPartner, includeAdsense, isHomepage) {
    this.isPartner = isPartner;
    this.includeAdsense = includeAdsense;
    this.isHomepage = isHomepage;
  }
  element(element) {
    if (this.includeAdsense) element.prepend(ADSENSE_CONNECT_SCRIPT, { html: true });
    element.prepend(EARLY_QUERY_GUARD, { html: true });
    element.append(RSS_DISCOVERY_LINK, { html: true });
    if (this.isHomepage) element.append(HOMEPAGE_CAFE_STYLE, { html: true });
    if (this.isPartner) {
      element.append(PARTNER_EDGE_STYLE, { html: true });
      element.append(PARTNER_DIRECT_ASSETS, { html: true });
    }
  }
}

class SecurityScriptInjector {
  constructor(isPartner, includePartnerLink) {
    this.isPartner = isPartner;
    this.includePartnerLink = includePartnerLink;
  }
  element(element) {
    let scripts = this.isPartner ? '<script src="/partner/partner-routing-fix.js?v=20260723-agent-route-v1" defer></script>' : '';
    scripts += '<script src="/assets/js/security-guard.js?v=20260712-security" defer></script>';
    if (this.includePartnerLink) scripts += '<script src="/assets/js/partner-link.js?v=20260712-partner-entry" defer></script>';
    if (this.isPartner) {
      scripts += '<script src="/partner/partner-original-photos-v13.js?v=20260714-originals-v13" defer></script><script src="/partner/partner-balanced-benefits-v14.js?v=20260714-duplicates-v17" defer></script><script src="/partner/partner-copy-v2.js?v=20260716-credit-dollar-unused-photos" defer></script>';
    }
    element.append(scripts, { html: true });
  }
}

class PartnerHeroInjector {
  element(element) {
    element.setAttribute('src', '/img/partner/hero.webp?v=20260714-duplicates-v17');
    element.setAttribute('loading', 'eager');
    element.setAttribute('decoding', 'async');
  }
}

class RemoveElement { element(element) { element.remove(); } }
class HomepageContentInjector { element(element) { element.setInnerContent(HOMEPAGE_CONTENT_CARDS, { html: true }); } }
class HomepageNavInjector { element(element) { element.append(HOMEPAGE_CAFE_NAV, { html: true }); } }
class HomepageCafeSectionInjector { element(element) { element.before(HOMEPAGE_CAFE_SECTION, { html: true }); } }
class BlogNavInjector { element(element) { element.setInnerContent(BLOG_NAV, { html: true }); } }
class BlogFooterInjector { element(element) { element.setInnerContent(BLOG_FOOTER, { html: true }); } }

function applySecurityHeaders(headers) {
  Object.entries(SECURITY_HEADERS).forEach(([name, value]) => headers.set(name, value));
  return headers;
}

async function rewriteBrandInResponse(response, contentType) {
  if (!shouldRewriteBrand(contentType)) return response;

  const body = await response.text();
  const brandedBody = body.split(BRAND_FROM).join(BRAND_TO);
  const headers = new Headers(response.headers);
  headers.delete('Content-Length');
  headers.delete('content-length');

  return new Response(brandedBody, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function onRequest(context) {
  const pathname = new URL(context.request.url).pathname;
  if (shouldBypassHtmlMiddleware(pathname)) return context.next();

  const response = await context.next();
  const headers = applySecurityHeaders(new Headers(response.headers));
  const contentType = String(headers.get('Content-Type') || '').toLowerCase();
  const isPartner = pathname === '/partner' || pathname.startsWith('/partner/');
  const isAcademy = pathname === '/academy' || pathname.startsWith('/academy/');
  const isMembership = pathname === '/membership' || pathname.startsWith('/membership/');
  const isCommercial = isPartner || isAcademy || isMembership;
  const isHomepage = pathname === '/';
  const isBlog = pathname === '/blog' || pathname === '/blog/' || pathname.startsWith('/blog/');
  const includeAdsense = isHomepage || isBlog;
  const includePartnerLink = isMembership;

  if (isCommercial) {
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  if (isPartner) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
  }

  let securedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });

  if (contentType.includes('text/html')) {
    let rewriter = new HTMLRewriter()
      .on('head', new HeadSecurityInjector(isPartner, includeAdsense, isHomepage))
      .on('body', new SecurityScriptInjector(isPartner, includePartnerLink))
      .on('a[href="/editorial-policy/"]', new RemoveElement());

    if (isPartner) rewriter = rewriter.on('.hero-bg', new PartnerHeroInjector());

    if (isHomepage) {
      rewriter = rewriter
        .on('.sticky-inquiry-bar', new RemoveElement())
        .on('#mainNav', new HomepageNavInjector())
        .on('#contentGrid', new HomepageContentInjector())
        .on('#contact', new HomepageCafeSectionInjector());
    }

    if (isBlog) {
      rewriter = rewriter
        .on('.blog-nav', new BlogNavInjector())
        .on('.blog-footer-inner', new BlogFooterInjector())
        .on('.post-header-actions', new RemoveElement())
        .on('.post-bottom-cta', new RemoveElement())
        .on('a.cta', new RemoveElement());
    }

    securedResponse = rewriter.transform(securedResponse);
  }

  return rewriteBrandInResponse(securedResponse, contentType);
}
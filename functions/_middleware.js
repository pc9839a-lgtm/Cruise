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
  constructor(isPartner, includeAdsense) {
    this.isPartner = isPartner;
    this.includeAdsense = includeAdsense;
  }
  element(element) {
    if (this.includeAdsense) element.prepend(ADSENSE_CONNECT_SCRIPT, { html: true });
    element.prepend(EARLY_QUERY_GUARD, { html: true });
    element.append(RSS_DISCOVERY_LINK, { html: true });
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
      .on('head', new HeadSecurityInjector(isPartner, includeAdsense))
      .on('body', new SecurityScriptInjector(isPartner, includePartnerLink))
      .on('a[href="/editorial-policy/"]', new RemoveElement());

    if (isPartner) rewriter = rewriter.on('.hero-bg', new PartnerHeroInjector());

    if (isHomepage) {
      rewriter = rewriter
        .on('.sticky-inquiry-bar', new RemoveElement())
        .on('#mainNav', new HomepageNavInjector())
        .on('#contentGrid', new HomepageContentInjector());
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

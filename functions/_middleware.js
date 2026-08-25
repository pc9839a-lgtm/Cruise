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
const SITE_ORIGIN = 'https://cruiseplay-dyt.pages.dev';
const ADSENSE_CLIENT = 'ca-pub-1906196934401001';
const ADSENSE_CONNECT_SCRIPT = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`;
const EARLY_QUERY_GUARD = `<script>(function(){try{var u=new URL(location.href);var n=new URLSearchParams();var rules={agent:40,utm_source:80,utm_medium:80,utm_campaign:80,inquiryType:40};Object.keys(rules).forEach(function(k){var v=(u.searchParams.get(k)||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,rules[k]);if(!v)return;if(k==='agent'&&!/^[A-Za-z0-9_-]+$/.test(v))return;if(k==='inquiryType'&&!/^[A-Za-z0-9_-]+$/.test(v))return;n.set(k,v)});if(u.searchParams.get('openInquiry')==='1')n.set('openInquiry','1');var s=n.toString();var clean=u.pathname+(s?'?'+s:'')+u.hash;if(clean!==u.pathname+u.search+u.hash)history.replaceState(null,'',clean)}catch(e){}})();</script>`;
const RSS_DISCOVERY_LINK = '<link rel="alternate" type="application/rss+xml" title="오케이크루즈 콘텐츠 RSS" href="/rss.xml" />';
const PARTNER_EDGE_STYLE = `<style id="partner-edge-image-fix">\n.hero-bg{display:block!important;opacity:1!important;visibility:visible!important}\n#partnerKakaoConsult,.partner-kakao-consult{display:none!important}\n</style>`;
const PARTNER_DIRECT_ASSETS = '<link rel="stylesheet" href="/partner/partner-original-photos-v13.css?v=20260714-originals-v13"><link rel="stylesheet" href="/partner/partner-balanced-benefits-v14.css?v=20260714-balanced-v14"><link rel="stylesheet" href="/partner/partner-mobile-fix-v18.css?v=20260714-mobile-v18">';
const HOMEPAGE_CAFE_NAV = `<a href="${NAVER_CAFE_URL}" target="_blank" rel="noopener noreferrer">네이버 카페</a>`;
const HOMEPAGE_CAFE_STYLE = `<style id="homepage-cafe-section-style">
.cafe-community-inline{margin-top:82px;padding-top:78px;border-top:1px solid #dfe6ef}
.cafe-community-inline .sheet-extra-head{margin-bottom:36px}
.cafe-community-intro{max-width:760px;margin:18px auto 0;color:#5f6b7c;font-size:17px;line-height:1.8;word-break:keep-all}
.cafe-community-grid{margin-top:0}
.cafe-community-grid .sheet-extra-card{min-height:220px;text-align:left}
.cafe-community-grid .sheet-extra-card h3{font-size:24px}
.cafe-community-grid .sheet-extra-card p{font-size:16px}
.cafe-community-bottom{margin-top:28px;padding:28px 30px;border:1px solid #e3eaf3;border-radius:24px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:24px;text-align:left;box-shadow:0 14px 34px rgba(15,23,42,.05)}
.cafe-community-bottom-copy strong{display:block;color:#091a3b;font-size:20px;line-height:1.35;letter-spacing:-.03em}
.cafe-community-bottom-copy p{margin:8px 0 0;color:#5f6b7c;font-size:15px;line-height:1.7}
.cafe-community-bottom .btn{flex:0 0 auto;min-width:210px}
@media (max-width:768px){.cafe-community-inline{margin-top:64px;padding-top:60px}.cafe-community-inline .sheet-extra-head{margin-bottom:28px}.cafe-community-intro{font-size:16px}.cafe-community-grid{grid-template-columns:1fr}.cafe-community-grid .sheet-extra-card{min-height:0}.cafe-community-bottom{display:block;padding:24px}.cafe-community-bottom .btn{width:100%;margin-top:20px}.cafe-community-bottom-copy strong{font-size:19px}}
</style>`;
const HOMEPAGE_CAFE_SECTION = `<section class="cafe-community-inline" id="cafeCommunity" aria-labelledby="cafeCommunityTitle">
  <div class="sheet-extra-head">
    <span class="sheet-extra-label">NAVER CAFE</span>
    <h2 class="sheet-extra-title" id="cafeCommunityTitle">오케이크루즈 네이버 카페</h2>
    <p class="cafe-community-intro">크루즈를 준비할 때 궁금한 내용부터 실제 여행 후기까지, 카페에서 조금 더 자세히 확인해보세요.</p>
  </div>
  <div class="sheet-extra-grid cafe-community-grid">
    <article class="sheet-extra-card">
      <div class="sheet-extra-chip">여행 후기</div>
      <h3>실제 여행 사진과 후기</h3>
      <p>어떤 선실을 골랐는지, 배 안은 어땠는지 실제 크루즈 여행 이야기를 확인해보세요.</p>
    </article>
    <article class="sheet-extra-card">
      <div class="sheet-extra-chip">크루즈 소식</div>
      <h3>새로운 출항 소식</h3>
      <p>국내외 크루즈 일정과 여행 전에 알아두면 좋은 소식을 카페에서도 함께 확인할 수 있습니다.</p>
    </article>
    <article class="sheet-extra-card">
      <div class="sheet-extra-chip">준비 정보</div>
      <h3>가기 전에 궁금한 것들</h3>
      <p>여권, 선실, 복장, 결제, 기항지처럼 준비하면서 자주 생기는 궁금증을 확인해보세요.</p>
    </article>
  </div>
  <div class="cafe-community-bottom">
    <div class="cafe-community-bottom-copy">
      <strong>크루즈가 더 궁금하다면 카페에서 확인해보세요.</strong>
      <p>여행 후기와 크루즈 관련 내용을 한곳에서 볼 수 있습니다.</p>
    </div>
    <a href="${NAVER_CAFE_URL}" target="_blank" rel="noopener noreferrer" class="btn">네이버 카페 들어가기</a>
  </div>
</section>`;

const HOMEPAGE_CONTENT_CARDS = `
<article class="sheet-extra-card"><div class="sheet-extra-chip">승선 준비</div><h3>크루즈 터미널에는 몇 시에 도착해야 할까?</h3><p>도착 슬롯, 최종 승선 마감, 출항 시각의 차이와 부산·해외 출발 시 준비 기준을 공식 자료와 함께 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-terminal-arrival-time-checkin-guide/" class="btn">가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">초보 가이드</div><h3>첫 크루즈 여행, 무엇부터 비교해야 할까?</h3><p>처음 예약할 때 놓치기 쉬운 일정, 선실, 포함 비용, 기항지 동선을 한 번에 확인할 수 있도록 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/first-cruise-guide/" class="btn">가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">비용</div><h3>크루즈 비용은 객실 가격이 전부가 아닙니다</h3><p>항만세, 서비스 요금, 음료, 와이파이, 기항지 이동비 등 실제 여행 예산에 들어가는 항목을 나눠 설명합니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-cost-breakdown/" class="btn">비용 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">선실 선택</div><h3>발코니 객실이 꼭 필요한지 판단하는 기준</h3><p>인사이드·오션뷰·발코니 객실의 차이를 예산과 여행 스타일 기준으로 비교해 선택 기준을 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-balcony-cabin-guide/" class="btn">선실 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">수하물</div><h3>크루즈 수하물과 캐리어 준비 방법</h3><p>위탁 수하물과 휴대가방을 나누는 방법, 승선 첫날 바로 필요한 물품과 준비 순서를 확인할 수 있습니다.</p><div class="sheet-extra-action"><a href="/blog/cruise-luggage-guide/" class="btn">수하물 가이드 보기</a></div></article>
<article class="sheet-extra-card"><div class="sheet-extra-chip">여행지 선택</div><h3>한국인이 첫 크루즈로 가기 좋은 여행지</h3><p>일본·대만, 오키나와, 싱가포르와 한국 출발 일정을 첫 크루즈 관점에서 비교해 선택 포인트를 정리했습니다.</p><div class="sheet-extra-action"><a href="/blog/best-first-cruise-destinations-for-koreans/" class="btn">여행지 가이드 보기</a></div></article>`;

const BLOG_NAV = `<a href="/">홈</a><a href="/blog/" class="is-current">콘텐츠</a><a href="/about/">사이트 소개</a><a href="/contact/">문의 안내</a>`;
const BLOG_FOOTER = `<div><strong>오케이크루즈 콘텐츠</strong><span>크루즈 여행 준비에 필요한 정보를 공식 자료와 실제 준비 흐름을 기준으로 정리합니다.</span></div><nav aria-label="사이트 정책" style="display:flex;gap:12px;flex-wrap:wrap"><a href="/about/">사이트 소개</a><a href="/privacy/">개인정보처리방침</a><a href="/terms/">이용약관</a><a href="/contact/">문의 안내</a></nav>`;
const BLOG_INDEX_TITLE = '크루즈 여행 준비 가이드·비용·선실·승선 정보 | 오케이크루즈';
const BLOG_INDEX_DESCRIPTION = '처음 크루즈를 준비하는 분을 위해 비용, 선실, 여권·서류, 승선 절차, 수하물, 선내생활과 기항지 정보를 실제 준비 순서에 맞춰 정리한 오케이크루즈 여행 가이드입니다.';
const BLOG_INDEX_GUIDES = [
  ['/blog/first-cruise-guide/', '처음 타는 크루즈', '첫 크루즈 준비 순서', '여권, 체크인, 수하물, 터미널 도착까지 출발 전 준비를 순서대로 확인합니다.'],
  ['/blog/cruise-cost-breakdown/', '여행 비용', '크루즈 총비용 계산', '객실 요금 외 세금, 서비스 요금, 음료, 와이파이와 기항지 비용을 함께 봅니다.'],
  ['/blog/cabin-type-comparison/', '선실 선택', '인사이드·오션뷰·발코니 비교', '예산과 여행 스타일에 따라 어떤 선실이 맞는지 비교합니다.'],
  ['/blog/cruise-passport-documents-check/', '서류 준비', '여권·비자·승선서류 확인', '예약 영문명, 여권 유효기간, 기항지 입국 조건과 승선서류를 확인합니다.'],
  ['/blog/cruise-boarding-process/', '승선 절차', '터미널 도착부터 승선까지', '수하물 위탁, 보안검색, 체크인, 승선 후 첫 동선을 한 번에 확인합니다.'],
  ['/blog/shore-excursion-guide/', '기항지', '기항지 자유여행과 투어 선택', '복귀시간, 이동거리, 선사 투어와 자유여행을 비교할 때 볼 기준을 정리합니다.']
];
const BLOG_INDEX_TOPIC_STYLE = `<style id="okaycruise-blog-index-map-style">
.blog-index-map{margin:28px 0 42px;padding:28px;border:1px solid #dfe6ef;border-radius:24px;background:#fff;box-shadow:0 12px 32px rgba(15,23,42,.04)}
.blog-index-map-head>span{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.12em;color:#2563eb}.blog-index-map-head h2{margin:8px 0;font-size:26px;line-height:1.35;letter-spacing:-.03em;color:#0f172a}.blog-index-map-head p{margin:0;color:#64748b;line-height:1.75}.blog-index-map-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}.blog-index-map-card{display:flex;min-height:154px;flex-direction:column;padding:18px;border:1px solid #e5eaf1;border-radius:18px;background:#f8fafc;text-decoration:none!important}.blog-index-map-card small{font-size:12px;font-weight:800;color:#2563eb}.blog-index-map-card strong{margin-top:7px;font-size:17px;line-height:1.45;color:#0f172a}.blog-index-map-card span{margin-top:7px;font-size:14px;line-height:1.65;color:#64748b}@media(max-width:760px){.blog-index-map{padding:22px 18px;border-radius:20px}.blog-index-map-grid{grid-template-columns:1fr}.blog-index-map-card{min-height:0}.blog-index-map-head h2{font-size:22px}}
</style>`;
const BLOG_INDEX_TOPIC_SECTION = `<section class="blog-index-map" aria-labelledby="blogIndexMapTitle"><div class="blog-index-map-head"><span>START HERE</span><h2 id="blogIndexMapTitle">처음이라면 이 순서부터 확인하세요</h2><p>날짜순 목록을 훑기 전에 여행 준비 단계별 핵심 가이드부터 확인할 수 있습니다.</p></div><div class="blog-index-map-grid">${BLOG_INDEX_GUIDES.map(([path,label,title,description]) => `<a class="blog-index-map-card" href="${path}"><small>${label}</small><strong>${title}</strong><span>${description}</span></a>`).join('')}</div></section>`;

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function blogIndexSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_ORIGIN}/blog/#collection`,
      url: `${SITE_ORIGIN}/blog/`,
      name: BLOG_INDEX_TITLE,
      description: BLOG_INDEX_DESCRIPTION,
      inLanguage: 'ko-KR',
      isPartOf: {'@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, url: `${SITE_ORIGIN}/`, name: '오케이크루즈'},
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: BLOG_INDEX_GUIDES.length,
        itemListElement: BLOG_INDEX_GUIDES.map(([path,,title], index) => ({'@type': 'ListItem', position: index + 1, name: title, url: `${SITE_ORIGIN}${path}`}))
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: '오케이크루즈', item: `${SITE_ORIGIN}/`},
        {'@type': 'ListItem', position: 2, name: '크루즈 여행 가이드', item: `${SITE_ORIGIN}/blog/`}
      ]
    }
  ];
}

const BLOG_INDEX_HEAD = `<meta property="og:type" content="website"><meta property="og:title" content="${BLOG_INDEX_TITLE}"><meta property="og:description" content="${BLOG_INDEX_DESCRIPTION}"><meta property="og:url" content="${SITE_ORIGIN}/blog/"><meta name="twitter:card" content="summary"><script type="application/ld+json">${safeJson(blogIndexSchema())}</script>${BLOG_INDEX_TOPIC_STYLE}`;

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
  constructor(isPartner, includeAdsense, isHomepage, isBlogIndex) {
    this.isPartner = isPartner;
    this.includeAdsense = includeAdsense;
    this.isHomepage = isHomepage;
    this.isBlogIndex = isBlogIndex;
  }
  element(element) {
    if (this.includeAdsense) element.prepend(ADSENSE_CONNECT_SCRIPT, { html: true });
    element.prepend(EARLY_QUERY_GUARD, { html: true });
    element.append(RSS_DISCOVERY_LINK, { html: true });
    if (this.isHomepage) element.append(HOMEPAGE_CAFE_STYLE, { html: true });
    if (this.isBlogIndex) element.append(BLOG_INDEX_HEAD, { html: true });
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
class HomepageCafeSectionInjector { element(element) { element.append(HOMEPAGE_CAFE_SECTION, { html: true }); } }
class BlogNavInjector { element(element) { element.setInnerContent(BLOG_NAV, { html: true }); } }
class BlogFooterInjector { element(element) { element.setInnerContent(BLOG_FOOTER, { html: true }); } }
class BlogIndexTitleInjector { element(element) { element.setInnerContent(BLOG_INDEX_TITLE); } }
class BlogIndexDescriptionInjector { element(element) { element.setAttribute('content', BLOG_INDEX_DESCRIPTION); } }
class BlogIndexHeroInjector { element(element) { element.after(BLOG_INDEX_TOPIC_SECTION, { html: true }); } }

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
  const isBlogIndex = pathname === '/blog' || pathname === '/blog/';
  const isBlog = isBlogIndex || pathname.startsWith('/blog/');
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
      .on('head', new HeadSecurityInjector(isPartner, includeAdsense, isHomepage, isBlogIndex))
      .on('body', new SecurityScriptInjector(isPartner, includePartnerLink))
      .on('a[href="/editorial-policy/"]', new RemoveElement());

    if (isPartner) rewriter = rewriter.on('.hero-bg', new PartnerHeroInjector());

    if (isHomepage) {
      rewriter = rewriter
        .on('.sticky-inquiry-bar', new RemoveElement())
        .on('#mainNav', new HomepageNavInjector())
        .on('#contentGrid', new HomepageContentInjector())
        .on('#reviews .review-wrap', new HomepageCafeSectionInjector());
    }

    if (isBlog) {
      rewriter = rewriter
        .on('.blog-nav', new BlogNavInjector())
        .on('.blog-footer-inner', new BlogFooterInjector())
        .on('.post-header-actions', new RemoveElement())
        .on('.post-bottom-cta', new RemoveElement())
        .on('a.cta', new RemoveElement());
    }

    if (isBlogIndex) {
      rewriter = rewriter
        .on('title', new BlogIndexTitleInjector())
        .on('meta[name="description"]', new BlogIndexDescriptionInjector())
        .on('.blog-hero', new BlogIndexHeroInjector());
    }

    securedResponse = rewriter.transform(securedResponse);
  }

  return rewriteBrandInResponse(securedResponse, contentType);
}

const SITE_ORIGIN = 'https://cruiseplay-dyt.pages.dev';

const CORE_GUIDES = [
  { path: '/blog/first-cruise-guide/', label: '처음 타는 크루즈', title: '첫 크루즈 준비 순서', description: '여권, 체크인, 수하물, 터미널 도착까지 출발 전 준비를 순서대로 확인합니다.' },
  { path: '/blog/cruise-cost-breakdown/', label: '여행 비용', title: '크루즈 총비용 계산', description: '객실 요금 외 세금, 서비스 요금, 음료, 와이파이와 기항지 비용을 함께 봅니다.' },
  { path: '/blog/cabin-type-comparison/', label: '선실 선택', title: '인사이드·오션뷰·발코니 비교', description: '예산과 여행 스타일에 따라 어떤 선실이 맞는지 비교합니다.' },
  { path: '/blog/cruise-passport-documents-check/', label: '서류 준비', title: '여권·비자·승선서류 확인', description: '예약 영문명, 여권 유효기간, 기항지 입국 조건과 승선서류를 확인합니다.' },
  { path: '/blog/cruise-boarding-process/', label: '승선 절차', title: '터미널 도착부터 승선까지', description: '수하물 위탁, 보안검색, 체크인, 승선 후 첫 동선을 한 번에 확인합니다.' },
  { path: '/blog/shore-excursion-guide/', label: '기항지', title: '기항지 자유여행과 투어 선택', description: '복귀시간, 이동거리, 선사 투어와 자유여행을 비교할 때 볼 기준을 정리합니다.' }
];

const INDEX_TITLE = '크루즈 여행 준비 가이드·비용·선실·승선 정보 | 오케이크루즈';
const INDEX_DESCRIPTION = '처음 크루즈를 준비하는 분을 위해 비용, 선실, 여권·서류, 승선 절차, 수하물, 선내생활과 기항지 정보를 실제 준비 순서에 맞춰 정리한 오케이크루즈 여행 가이드입니다.';

const LATEST_POSTS = [
  {
    path: '/blog/singapore-departure-cruise-booking-guide/',
    category: '출발항·예약',
    title: '싱가포르 출발 크루즈 예약 가이드: 터미널·입국·전날 숙박까지',
    summary: '싱가포르 출발 크루즈 예약 전 확인할 항로 선택, Marina Bay 크루즈 터미널, SG Arrival Card, 항공·전날 숙박과 총비용 비교 기준을 정리했습니다.',
    tags: '싱가포르출발크루즈,싱가포르크루즈,싱가포르크루즈터미널,SGArrivalCard',
    date: '2026-09-19',
    alt: '싱가포르 출발 크루즈 예약과 터미널 준비 안내'
  },
  {
    path: '/blog/2027-busan-departure-cruise-msc-bellissima-guide/',
    category: '출발항·일정',
    title: '2027 부산 출발 크루즈 일정 총정리: MSC 벨리시마 4박5일·5박6일·6박7일',
    summary: '2027년 부산에서 출발하는 MSC 벨리시마 일정을 겨울·여름 시즌으로 나눠 정리했습니다. 상하이·제주·후쿠오카·사세보 코스와 예약 전 확인할 가격·객실·터미널 기준까지 확인하세요.',
    tags: '2027부산출발크루즈,부산출발크루즈,MSC벨리시마,부산크루즈일정',
    date: '2026-09-18',
    alt: '2027 부산 출발 MSC 벨리시마 일정과 기항지 안내'
  },
  {
    path: '/blog/msc-vs-royal-caribbean-cruise-comparison-2026/',
    category: '선사비교',
    title: 'MSC 크루즈 vs 로얄캐리비안 비교: 식사·시설·가족여행, 어디가 맞을까? (2026)',
    summary: '2026년 공식 자료를 기준으로 MSC와 로얄캐리비안의 기본 식사, 키즈 프로그램, 선내 액티비티, Ocean Cay·CocoCay와 추가비용을 비교했습니다.',
    tags: 'MSC크루즈,로얄캐리비안,크루즈선사비교,가족크루즈',
    date: '2026-09-16',
    alt: 'MSC 크루즈와 로얄캐리비안의 식사 시설 가족여행 특징 비교'
  },
  {
    path: '/blog/cruise-best-time-to-book-early-vs-last-minute-2026/',
    category: '비용비교',
    title: '크루즈 예약 언제 해야 가장 저렴할까? 조기예약·막판특가 비교 (2026)',
    summary: '2026년 공식 선사 자료를 기준으로 12~18개월, 6~12개월, 출항 임박 예약의 장단점과 조기예약·막판특가 판단 기준을 정리했습니다.',
    tags: '크루즈예약시기,크루즈싸게예약,크루즈조기예약,크루즈막판특가',
    date: '2026-09-15',
    alt: '크루즈 예약 시기와 조기예약 막판특가 비교'
  },
  {
    path: '/blog/cruise-travel-price-4n5d-7n8d-2026/',
    category: '비용비교',
    title: '크루즈 여행 가격 얼마? 4박5일·7박8일 실제 비용 총정리 (2026)',
    summary: '2026 크루즈 여행 가격을 4박5일·7박8일 기준으로 선실료, 항만세, 선상팁, 항공권, 기항지 관광, 와이파이까지 나눠 실제 예산으로 정리했습니다.',
    tags: '크루즈여행가격,크루즈가격,크루즈비용,4박5일크루즈,7박8일크루즈',
    date: '2026-09-15',
    alt: '크루즈 여행 4박5일 7박8일 실제 비용 비교'
  }
];

function latestPostCard(post, eager = false) {
  const imgAttrs = eager ? ' loading="eager" decoding="async" fetchpriority="high"' : ' loading="eager" decoding="async"';
  return `<article class="blog-card" data-category="${post.category}" data-title="${post.title}" data-summary="${post.summary}" data-tags="${post.tags}"><a href="${post.path}"><img src="/img/og-image.jpg" alt="${post.alt}" width="1600" height="900"${imgAttrs}><time>${post.date}</time><h2>${post.title}</h2><p>${post.summary}</p></a></article>`;
}

function jsonForHtml(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }

function buildIndexSchema() {
  const itemListElement = CORE_GUIDES.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `${SITE_ORIGIN}${guide.path}` }));
  return [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${SITE_ORIGIN}/blog/#collection`, url: `${SITE_ORIGIN}/blog/`, name: INDEX_TITLE, description: INDEX_DESCRIPTION, inLanguage: 'ko-KR', isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, url: `${SITE_ORIGIN}/`, name: '오케이크루즈' }, mainEntity: { '@type': 'ItemList', itemListOrder: 'https://schema.org/ItemListOrderAscending', numberOfItems: CORE_GUIDES.length, itemListElement } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: '오케이크루즈', item: `${SITE_ORIGIN}/` }, { '@type': 'ListItem', position: 2, name: '크루즈 여행 가이드', item: `${SITE_ORIGIN}/blog/` } ] }
  ];
}

function buildTopicLinks(currentPath = '') {
  const guides = CORE_GUIDES.filter((guide) => guide.path !== currentPath);
  return `<section class="blog-topic-map" aria-labelledby="blogTopicMapTitle"><div class="blog-topic-map-head"><span>START HERE</span><h2 id="blogTopicMapTitle">처음이라면 이 순서부터 확인하세요</h2><p>글을 날짜순으로 훑기보다 여행 준비 단계에 맞는 핵심 가이드부터 보면 필요한 내용을 더 빠르게 찾을 수 있습니다.</p></div><div class="blog-topic-map-grid">${guides.map((guide) => `<a class="blog-topic-map-card" href="${guide.path}"><small>${guide.label}</small><strong>${guide.title}</strong><span>${guide.description}</span></a>`).join('')}</div></section>`;
}

const TOPIC_STYLE = `<style id="okaycruise-blog-topic-map-style">.blog-topic-map{margin:28px 0 42px;padding:28px;border:1px solid #dfe6ef;border-radius:24px;background:#fff;box-shadow:0 12px 32px rgba(15,23,42,.04)}.blog-topic-map-head>span{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.12em;color:#2563eb}.blog-topic-map-head h2{margin:8px 0 8px;font-size:26px;line-height:1.35;letter-spacing:-.03em;color:#0f172a}.blog-topic-map-head p{margin:0;color:#64748b;line-height:1.75}.blog-topic-map-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}.blog-topic-map-card{display:flex;min-height:154px;flex-direction:column;padding:18px;border:1px solid #e5eaf1;border-radius:18px;background:#f8fafc;text-decoration:none!important;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}.blog-topic-map-card:hover{transform:translateY(-2px);border-color:#bfdbfe;box-shadow:0 10px 24px rgba(37,99,235,.08)}.blog-topic-map-card small{font-size:12px;font-weight:800;color:#2563eb}.blog-topic-map-card strong{margin-top:7px;font-size:17px;line-height:1.45;color:#0f172a}.blog-topic-map-card span{margin-top:7px;font-size:14px;line-height:1.65;color:#64748b}.article .blog-topic-map{margin-top:52px}.article .blog-topic-map-head h2{margin-top:8px}@media(max-width:760px){.blog-topic-map{padding:22px 18px;border-radius:20px}.blog-topic-map-grid{grid-template-columns:1fr}.blog-topic-map-card{min-height:0}.blog-topic-map-head h2{font-size:22px}}</style>`;

class BlogPostHeadInjector { element(element) { element.append(TOPIC_STYLE, { html: true }); } }
class BlogPostTopicInjector { constructor(pathname) { this.pathname = pathname; } element(element) { element.append(buildTopicLinks(this.pathname), { html: true }); } }

function injectLatestPostsIntoIndex(html) {
  let output = String(html || '');
  output = output.replace(/(<strong id="blogResultsCount">)60(<\/strong>)/, (match, open, close) => `${open}${60 + LATEST_POSTS.length}${close}`);
  const marker = '<div class="blog-grid" id="blogGrid">';
  if (!output.includes(marker)) return output;
  const missingPosts = LATEST_POSTS.filter((post) => !output.includes(post.path));
  if (!missingPosts.length) return output;
  const cards = missingPosts.map((post, index) => latestPostCard(post, index === 0)).join('');
  return output.replace(marker, `${marker}${cards}`);
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  const response = await context.next();
  const contentType = String(response.headers.get('Content-Type') || '').toLowerCase();
  if (!contentType.includes('text/html') || response.status < 200 || response.status >= 400) return response;
  const isIndex = pathname === '/blog' || pathname === '/blog/';
  const isPost = /^\/blog\/[^/]+\/?$/.test(pathname) && !isIndex;
  if (isIndex) {
    const headers = new Headers(response.headers); headers.delete('Content-Length'); headers.delete('content-length');
    const html = injectLatestPostsIntoIndex(await response.text());
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
  let rewritten = new Response(response.body, { status: response.status, statusText: response.statusText, headers: response.headers });
  if (isPost) rewritten = new HTMLRewriter().on('head', new BlogPostHeadInjector()).on('main.article', new BlogPostTopicInjector(pathname.endsWith('/') ? pathname : `${pathname}/`)).transform(rewritten);
  return rewritten;
}
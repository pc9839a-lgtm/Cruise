const SITE_ORIGIN = 'https://cruiseplay-dyt.pages.dev';

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

const ABOUT_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_ORIGIN}/about/#about`,
    url: `${SITE_ORIGIN}/about/`,
    name: '오케이크루즈 사이트 소개·콘텐츠 작성 기준',
    description: '오케이크루즈의 운영 목적, 콘텐츠 작성·검수 기준, 수정 원칙, 광고·제휴 기준과 문의 방법을 안내합니다.',
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: '오케이크루즈'
    },
    about: {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: '오케이크루즈',
      url: `${SITE_ORIGIN}/`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '오케이크루즈',
        item: `${SITE_ORIGIN}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '사이트 소개',
        item: `${SITE_ORIGIN}/about/`
      }
    ]
  }
];

class AboutHeadInjector {
  element(element) {
    element.append(`
<meta property="og:type" content="website">
<meta property="og:title" content="오케이크루즈 사이트 소개·콘텐츠 작성 기준">
<meta property="og:description" content="오케이크루즈의 운영 목적, 콘텐츠 작성·검수 기준, 수정 원칙과 광고·제휴 기준을 안내합니다.">
<meta property="og:url" content="${SITE_ORIGIN}/about/">
<script type="application/ld+json">${jsonForHtml(ABOUT_SCHEMA)}</script>`, { html: true });
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = String(response.headers.get('Content-Type') || '').toLowerCase();
  if (!contentType.includes('text/html') || response.status < 200 || response.status >= 400) return response;

  const rewritten = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });

  return new HTMLRewriter()
    .on('head', new AboutHeadInjector())
    .transform(rewritten);
}

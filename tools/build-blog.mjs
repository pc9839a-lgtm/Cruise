import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SITE_URL = 'https://cruiseplay-dyt.pages.dev';
const SITE_NAME = '크루즈플레이';

const POSTS_DATA_PATH = path.join(ROOT, 'data', 'posts.json');
const BLOG_INDEX_TEMPLATE_PATH = path.join(ROOT, 'blog', 'templates', 'index.template.html');
const POST_TEMPLATE_PATH = path.join(ROOT, 'blog', 'templates', 'post.template.html');
const OUTPUT_BLOG_DIR = path.join(ROOT, 'blog');
const SEARCH_INDEX_PATH = path.join(ROOT, 'data', 'blog-search.json');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const FEED_PATH = path.join(ROOT, 'blog', 'feed.xml');

const rawPosts = JSON.parse(fs.readFileSync(POSTS_DATA_PATH, 'utf8'));
const blogIndexTemplate = fs.readFileSync(BLOG_INDEX_TEMPLATE_PATH, 'utf8');
const postTemplate = fs.readFileSync(POST_TEMPLATE_PATH, 'utf8');

ensureDir(path.join(ROOT, 'blog', 'category'));
ensureDir(path.join(ROOT, 'data'));

const posts = rawPosts
  .map((post) => hydratePost(post))
  .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

const postMap = new Map(posts.map((post) => [post.slug, post]));
const categoryMap = buildCategoryMap(posts);

buildBlogIndex(posts, categoryMap);
buildCategoryPages(categoryMap);
buildPostPages(posts, postMap);
buildSearchIndex(posts);
buildFeed(posts);
buildSitemap(posts, categoryMap);

console.log(`✅ blog build complete: ${posts.length} posts`);

function hydratePost(post) {
  validatePost(post);

  const bodyPath = path.join(ROOT, post.content_file);
  const rawBody = fs.readFileSync(bodyPath, 'utf8').trim();
  const { html: bodyHtml, toc } = injectHeadingIds(rawBody);
  const categorySlug = slugify(post.category);
  const postUrl = `${SITE_URL}/blog/${post.slug}/`;
  const publishedDate = formatDate(post.published_at);
  const updatedDate = formatDate(post.updated_at || post.published_at);

  return {
    ...post,
    bodyHtml,
    toc,
    categorySlug,
    postUrl,
    categoryUrl: `${SITE_URL}/blog/category/${categorySlug}/`,
    publishedDate,
    updatedDate,
    publishedIso: new Date(post.published_at).toISOString(),
    updatedIso: new Date(post.updated_at || post.published_at).toISOString(),
    searchText: stripHtml(`${post.title} ${post.summary} ${post.category} ${(post.tags || []).join(' ')}`),
  };
}

function validatePost(post) {
  const required = ['slug', 'category', 'title', 'summary', 'seo_title', 'seo_description', 'thumbnail_url', 'published_at', 'content_file'];
  const missing = required.filter((key) => !post[key]);
  if (missing.length) {
    throw new Error(`Missing required post fields for ${post.slug || 'unknown'}: ${missing.join(', ')}`);
  }
}

function buildCategoryMap(posts) {
  const map = new Map();
  posts.forEach((post) => {
    if (!map.has(post.categorySlug)) {
      map.set(post.categorySlug, {
        slug: post.categorySlug,
        name: post.category,
        posts: [],
      });
    }
    map.get(post.categorySlug).posts.push(post);
  });
  return map;
}

function buildBlogIndex(posts, categoryMap) {
  const categoryFilters = Array.from(categoryMap.values())
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
    .map((category) => `<button type="button" class="blog-filter-btn" data-category="${escapeHtml(category.name)}">${escapeHtml(category.name)}</button>`)
    .join('\n              ');

  const postCards = posts.map(renderPostCard).join('\n');

  const html = blogIndexTemplate
    .replaceAll('__SITE_URL__', SITE_URL)
    .replace('__POST_COUNT__', String(posts.length))
    .replace('__CATEGORY_FILTERS__', categoryFilters)
    .replace('__POST_CARDS__', postCards);

  fs.writeFileSync(path.join(OUTPUT_BLOG_DIR, 'index.html'), html, 'utf8');
}

function buildCategoryPages(categoryMap) {
  Array.from(categoryMap.values()).forEach((category) => {
    const categoryCards = category.posts.map(renderPostCard).join('\n');
    const html = blogIndexTemplate
      .replaceAll('__SITE_URL__', SITE_URL)
      .replace('SEO + 유입 + 문의 전환', `카테고리: ${category.name}`)
      .replace('크루즈를 더 쉽게 이해하게 만드는<br />정보형 콘텐츠 허브', `${category.name} 콘텐츠 모음`)
      .replace('크루즈 초보 가이드부터 비용 구조, 준비물 체크리스트, 기항지 정보까지. 검색 유입을 받되 읽고 끝나지 않게, 추천 일정과 가격 문의로 자연스럽게 이어지도록 설계한 콘텐츠 구조입니다.', `${category.name} 카테고리 글만 모아볼 수 있는 아카이브입니다. 같은 주제의 글을 묶어 탐색하고 문의 전환까지 이어지도록 설계했습니다.`)
      .replace('__POST_COUNT__', String(category.posts.length))
      .replace('__CATEGORY_FILTERS__', `<button type="button" class="blog-filter-btn is-active" data-category="${escapeHtml(category.name)}">${escapeHtml(category.name)}</button>`)
      .replace('__POST_CARDS__', categoryCards);

    const categoryDir = path.join(OUTPUT_BLOG_DIR, 'category', category.slug);
    ensureDir(categoryDir);
    fs.writeFileSync(path.join(categoryDir, 'index.html'), html, 'utf8');
  });
}

function buildPostPages(posts, postMap) {
  posts.forEach((post, index) => {
    const previousPost = posts[index + 1] || null;
    const nextPost = posts[index - 1] || null;

    const relatedPosts = resolveRelatedPosts(post, postMap, posts)
      .slice(0, 2)
      .map(renderRelatedCard)
      .join('\n');

    const tocHtml = post.toc.length
      ? post.toc.map((item) => `<a href="#${item.id}">${escapeHtml(item.text)}</a>`).join('\n')
      : '<span>이 글에는 별도 목차가 없습니다.</span>';

    const tagLinks = (post.tags || []).length
      ? post.tags.map((tag) => `<a href="/blog/category/${post.categorySlug}/">${escapeHtml(tag)}</a>`).join('\n')
      : '<span>태그 없음</span>';

    const pagerHtml = [
      previousPost
        ? `<a class="pager-card" href="/blog/${previousPost.slug}/"><em>이전 글</em><strong>${escapeHtml(previousPost.title)}</strong></a>`
        : '<div class="pager-card"><em>이전 글</em><strong>가장 처음 글입니다.</strong></div>',
      nextPost
        ? `<a class="pager-card" href="/blog/${nextPost.slug}/"><em>다음 글</em><strong>${escapeHtml(nextPost.title)}</strong></a>`
        : '<div class="pager-card"><em>다음 글</em><strong>가장 최근 글입니다.</strong></div>'
    ].join('\n');

    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seo_description,
      datePublished: post.publishedIso,
      dateModified: post.updatedIso,
      image: [post.thumbnail_url],
      url: post.postUrl,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      mainEntityOfPage: post.postUrl,
      keywords: (post.tags || []).join(', '),
      articleSection: post.category,
    }, null, 2);

    const html = postTemplate
      .replaceAll('__SEO_TITLE__', escapeHtml(post.seo_title))
      .replaceAll('__SEO_DESCRIPTION__', escapeHtml(post.seo_description))
      .replaceAll('__POST_URL__', post.postUrl)
      .replaceAll('__THUMBNAIL_URL__', post.thumbnail_url)
      .replaceAll('__PUBLISHED_ISO__', post.publishedIso)
      .replaceAll('__UPDATED_ISO__', post.updatedIso)
      .replace('__BLOG_POSTING_JSON_LD__', jsonLd)
      .replaceAll('__CATEGORY_SLUG__', post.categorySlug)
      .replaceAll('__CATEGORY__', escapeHtml(post.category))
      .replaceAll('__TITLE__', escapeHtml(post.title))
      .replaceAll('__SUMMARY__', escapeHtml(post.summary))
      .replaceAll('__PUBLISHED_DATE__', post.publishedDate)
      .replaceAll('__UPDATED_DATE__', post.updatedDate)
      .replaceAll('__TAG_COUNT__', String((post.tags || []).length))
      .replace('__POST_BODY__', indentHtml(post.bodyHtml, 16))
      .replaceAll('__CTA_PRIMARY_LABEL__', escapeHtml(post.cta_primary_label || '가격 문의하기'))
      .replaceAll('__CTA_PRIMARY_URL__', post.cta_primary_url || '/#contact')
      .replaceAll('__CTA_SECONDARY_LABEL__', escapeHtml(post.cta_secondary_label || '추천 일정 보기'))
      .replaceAll('__CTA_SECONDARY_URL__', post.cta_secondary_url || '/#schedule')
      .replace('__RELATED_POSTS__', relatedPosts)
      .replace('__PAGER_HTML__', pagerHtml)
      .replace('__TABLE_OF_CONTENTS__', tocHtml)
      .replace('__TAG_LINKS__', tagLinks);

    const postDir = path.join(OUTPUT_BLOG_DIR, post.slug);
    ensureDir(postDir);
    fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf8');
  });
}

function buildSearchIndex(posts) {
  const searchIndex = posts.map((post) => ({
    slug: post.slug,
    url: `/blog/${post.slug}/`,
    category: post.category,
    title: post.title,
    summary: post.summary,
    tags: post.tags || [],
    published_at: post.published_at,
    thumbnail_url: post.thumbnail_url,
  }));

  fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(searchIndex, null, 2), 'utf8');
}

function buildFeed(posts) {
  const items = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.postUrl}</link>
      <guid>${post.postUrl}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME} 콘텐츠 허브</title>
    <link>${SITE_URL}/blog/</link>
    <description>크루즈 초보 가이드, 비용 구조, 체크리스트, 일정 탐색 콘텐츠</description>
    ${items}
  </channel>
</rss>`;

  fs.writeFileSync(FEED_PATH, feed, 'utf8');
}

function buildSitemap(posts, categoryMap) {
  const urls = [
    '/',
    '/blog/',
    ...Array.from(categoryMap.values()).map((category) => `/blog/category/${category.slug}/`),
    ...posts.map((post) => `/blog/${post.slug}/`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
}

function renderPostCard(post) {
  return `
<article class="blog-card" data-blog-card data-category="${escapeHtml(post.category)}" data-search="${escapeHtml(post.searchText)}">
  <a class="blog-card-link" href="/blog/${post.slug}/">
    <div class="blog-card-media">
      <img src="${post.thumbnail_url}" alt="${escapeHtml(post.title)}" loading="lazy" />
    </div>
    <div class="blog-card-body">
      <div class="blog-chip-row">
        <span class="blog-chip">${escapeHtml(post.category)}</span>
        ${(post.tags || []).slice(0, 2).map((tag) => `<span class="blog-chip">${escapeHtml(tag)}</span>`).join('')}
      </div>
      <h2>${escapeHtml(post.title)}</h2>
      <p>${escapeHtml(post.summary)}</p>
      <div class="blog-card-footer">
        <div class="blog-card-meta">
          <span>${post.publishedDate}</span>
        </div>
        <span class="blog-more">자세히 보기 →</span>
      </div>
    </div>
  </a>
</article>`.trim();
}

function renderRelatedCard(post) {
  return `
<article class="related-card">
  <a class="related-card-link" href="/blog/${post.slug}/">
    <div class="blog-card-media">
      <img src="${post.thumbnail_url}" alt="${escapeHtml(post.title)}" loading="lazy" />
    </div>
    <div class="related-card-body">
      <div class="blog-chip-row"><span class="blog-chip">${escapeHtml(post.category)}</span></div>
      <strong>${escapeHtml(post.title)}</strong>
      <p>${escapeHtml(post.summary)}</p>
    </div>
  </a>
</article>`.trim();
}

function resolveRelatedPosts(post, postMap, posts) {
  const explicit = (post.related_slugs || []).map((slug) => postMap.get(slug)).filter(Boolean);
  if (explicit.length) return explicit;
  return posts.filter((item) => item.slug !== post.slug && item.categorySlug === post.categorySlug).slice(0, 2);
}

function injectHeadingIds(html) {
  const toc = [];
  let index = 0;
  const processed = html.replace(/<(h2|h3)([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    index += 1;
    const text = stripHtml(inner);
    const id = `section-${index}`;
    toc.push({ id, text, level: tag.toLowerCase() });
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
  return { html: processed, toc };
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function indentHtml(html, spaces) {
  const pad = ' '.repeat(spaces);
  return html.split('\n').map((line) => `${pad}${line}`).join('\n');
}

function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

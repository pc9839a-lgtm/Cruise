import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://cruiseplay-dyt.pages.dev';
const SITE_NAME = '크루즈플레이';
const SITE_DESCRIPTION = '크루즈 초보 가이드, 비용 정리, 체크리스트, 기항지 정보까지 검색 유입과 상담 전환을 함께 잡는 크루즈플레이 콘텐츠 허브입니다.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-default.jpg`;

const POSTS_DATA_CANDIDATES = [
  path.join(ROOT, 'data', 'blog-posts.json'),
  path.join(ROOT, 'data', 'posts.json'),
];

const TEMPLATE_DIR_CANDIDATES = [
  path.join(ROOT, 'blog', 'templates'),
  path.join(ROOT, 'blog', '_templates'),
];

const POSTS_DIR_CANDIDATES = [
  path.join(ROOT, 'blog', 'posts'),
  path.join(ROOT, 'blog', '_posts'),
];

function exists(targetPath) {
  try {
    return fs.existsSync(targetPath);
  } catch {
    return false;
  }
}

function pickExisting(candidates, label) {
  const found = candidates.find(exists);
  if (!found) {
    throw new Error(`${label} 경로를 찾지 못했습니다.\n후보:\n- ${candidates.join('\n- ')}`);
  }
  return found;
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function readUtf8(targetPath) {
  return fs.readFileSync(targetPath, 'utf8');
}

function writeUtf8(targetPath, content) {
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, content, 'utf8');
}

function rmIfExists(targetPath) {
  if (exists(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtml(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDateLabel(value) {
  const normalized = normalizeDate(value);
  if (!normalized) return '';
  const [y, m, d] = normalized.split('-');
  return `${y}.${m}.${d}`;
}

function toPosix(p) {
  return String(p).replace(/\\/g, '/');
}

function extractSlugFromLink(linkUrl = '') {
  const value = String(linkUrl || '').trim();
  if (!value) return '';

  const q1 = value.match(/[?&]slug=([^&#]+)/i);
  if (q1?.[1]) return decodeURIComponent(q1[1]).replace(/\/+$/, '');

  const q2 = value.match(/\/blog\/([^/?#]+)\/?$/i);
  if (q2?.[1]) return decodeURIComponent(q2[1]).replace(/\/+$/, '');

  const q3 = value.match(/\/posts\/([^/?#]+?)(?:\.html)?\/?$/i);
  if (q3?.[1]) return decodeURIComponent(q3[1]).replace(/\/+$/, '');

  return '';
}

function slugify(text = '') {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/['"]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9가-힣\s-_]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function deriveSlug(post) {
  if (post.slug) return String(post.slug).trim();
  if (post.link_url) {
    const fromLink = extractSlugFromLink(post.link_url);
    if (fromLink) return fromLink;
  }
  if (post.content_file) {
    return path.basename(post.content_file, path.extname(post.content_file));
  }
  if (post.title) {
    const s = slugify(post.title);
    if (s) return s;
  }
  if (post.content_id) return String(post.content_id).toLowerCase();
  return '';
}

function resolveThumbnail(post) {
  if (!post.thumbnail_url) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(post.thumbnail_url)) return post.thumbnail_url;
  return `${SITE_URL}/${String(post.thumbnail_url).replace(/^\/+/, '')}`;
}

function resolvePostSource(post, postsDir) {
  const candidates = [];

  if (post.content_file) {
    candidates.push(path.resolve(ROOT, post.content_file));
    candidates.push(path.resolve(postsDir, path.basename(post.content_file)));
  }

  const slug = deriveSlug(post);
  if (slug) {
    candidates.push(path.resolve(postsDir, `${slug}.html`));
  }

  const found = candidates.find(exists);
  if (!found) {
    throw new Error(`본문 파일을 찾지 못했습니다: ${post.title || post.content_id || 'unknown'}`);
  }
  return found;
}

function replaceAll(source, search, replacement) {
  return source.split(search).join(replacement);
}

function renderTemplate(template, map) {
  let out = template;
  for (const [key, value] of Object.entries(map)) {
    out = replaceAll(out, key, value ?? '');
  }
  return out;
}

function makeArticleJsonLd(post, postUrl, description, thumbnail) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title || '',
      description,
      image: thumbnail,
      datePublished: normalizeDate(post.published_at || post.date || '') || undefined,
      dateModified: normalizeDate(post.updated_at || post.published_at || post.date || '') || undefined,
      mainEntityOfPage: postUrl,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/img/logo.png`,
        },
      },
    },
    null,
    2
  );
}

function buildCategoryFilters(posts) {
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
  return categories
    .map(category => {
      const safeCategory = escapeHtml(category);
      return `<button type="button" class="blog-filter-btn" data-category="${safeCategory}">${safeCategory}</button>`;
    })
    .join('\n');
}

function buildPostCards(posts) {
  return posts
    .map(post => {
      const slug = deriveSlug(post);
      const title = escapeHtml(post.title || '');
      const summary = escapeHtml(post.summary || '');
      const category = escapeHtml(post.category || '콘텐츠');
      const tags = escapeHtml(Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''));
      const thumbnail = escapeHtml(resolveThumbnail(post));
      const link = `/blog/${encodeURIComponent(slug)}/`;
      const dateLabel = escapeHtml(formatDateLabel(post.published_at || post.date || ''));

      return `
<article class="blog-card" data-category="${category}" data-title="${title}" data-summary="${summary}" data-tags="${tags}">
  <a class="blog-card-thumb" href="${link}">
    <img src="${thumbnail}" alt="${title}" loading="lazy" />
  </a>
  <div class="blog-card-body">
    <div class="blog-card-meta">
      <span class="blog-card-chip">${category}</span>
      ${dateLabel ? `<span class="blog-card-date">${dateLabel}</span>` : ''}
    </div>
    <h2 class="blog-card-title"><a href="${link}">${title}</a></h2>
    <p class="blog-card-summary">${summary}</p>
    <a class="blog-card-link" href="${link}">자세히 보기</a>
  </div>
</article>`.trim();
    })
    .join('\n');
}

function buildRelatedPosts(posts, currentPost) {
  const currentSlug = deriveSlug(currentPost);
  const sameCategory = posts.filter(
    post => deriveSlug(post) !== currentSlug && post.category && post.category === currentPost.category
  );
  const fallback = posts.filter(post => deriveSlug(post) !== currentSlug);
  const related = [...sameCategory, ...fallback].slice(0, 3);

  return related
    .map(post => {
      const slug = deriveSlug(post);
      const title = escapeHtml(post.title || '');
      const summary = escapeHtml(post.summary || '');
      const category = escapeHtml(post.category || '콘텐츠');
      const link = `/blog/${encodeURIComponent(slug)}/`;

      return `
<a class="post-related-card" href="${link}">
  <span class="post-related-chip">${category}</span>
  <strong>${title}</strong>
  <p>${summary}</p>
</a>`.trim();
    })
    .join('\n');
}

function buildSitemap(posts) {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/blog/`,
    ...posts.map(post => `${SITE_URL}/blog/${encodeURIComponent(deriveSlug(post))}/`),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

function buildFeed(posts) {
  const items = posts
    .slice(0, 20)
    .map(post => {
      const slug = deriveSlug(post);
      const link = `${SITE_URL}/blog/${encodeURIComponent(slug)}/`;
      const title = escapeHtml(post.title || '');
      const description = escapeHtml(post.summary || '');
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${SITE_DESCRIPTION}</description>${items}
  </channel>
</rss>`;
}

function cleanupGeneratedBlog(blogRoot) {
  if (!exists(blogRoot)) return;

  const keepNames = new Set([
    'posts',
    '_posts',
    'templates',
    '_templates',
  ]);

  const entries = fs.readdirSync(blogRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (keepNames.has(entry.name)) continue;
    rmIfExists(path.join(blogRoot, entry.name));
  }
}

function main() {
  const postsDataPath = pickExisting(POSTS_DATA_CANDIDATES, 'posts 데이터');
  const templateDir = pickExisting(TEMPLATE_DIR_CANDIDATES, '템플릿 폴더');
  const postsDir = pickExisting(POSTS_DIR_CANDIDATES, '본문 소스 폴더');

  const indexTemplatePath = path.join(templateDir, 'index.template.html');
  const postTemplatePath = path.join(templateDir, 'post.template.html');

  if (!exists(indexTemplatePath)) {
    throw new Error(`index.template.html 이 없습니다: ${indexTemplatePath}`);
  }

  if (!exists(postTemplatePath)) {
    throw new Error(`post.template.html 이 없습니다: ${postTemplatePath}`);
  }

  const raw = readUtf8(postsDataPath);
  const posts = JSON.parse(raw)
    .filter(post => {
      const active = String(post.is_active ?? post.active ?? 'Y').toUpperCase();
      return active !== 'N' && active !== 'FALSE';
    })
    .map(post => ({
      ...post,
      slug: deriveSlug(post),
    }))
    .filter(post => post.slug)
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));

  if (!posts.length) {
    throw new Error('활성화된 글이 없습니다.');
  }

  const blogRoot = path.join(ROOT, 'blog');
  ensureDir(blogRoot);
  cleanupGeneratedBlog(blogRoot);

  const indexTemplate = readUtf8(indexTemplatePath);
  const postTemplate = readUtf8(postTemplatePath);

  for (const post of posts) {
    const sourcePath = resolvePostSource(post, postsDir);
    const rawBody = readUtf8(sourcePath).trim();

    if (/<!doctype html/i.test(rawBody) || /<html[\s>]/i.test(rawBody) || /<head[\s>]/i.test(rawBody)) {
      throw new Error(`본문 파일에 전체 HTML이 들어있습니다. 글 본문만 넣어야 합니다: ${toPosix(path.relative(ROOT, sourcePath))}`);
    }

    const description = (post.summary || stripHtml(rawBody)).slice(0, 160);
    const thumbnail = resolveThumbnail(post);
    const postUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
    const relatedPosts = buildRelatedPosts(posts, post);

    const renderedPost = renderTemplate(postTemplate, {
      '__SITE_URL__': SITE_URL,
      '__SITE_NAME__': SITE_NAME,

      '__SEO_TITLE__': escapeHtml(`${post.title || ''} | ${SITE_NAME}`),
      '__SEO_DESCRIPTION__': escapeHtml(description),
      '__SEO_OG_TITLE__': escapeHtml(post.title || ''),
      '__SEO_OG_DESCRIPTION__': escapeHtml(description),
      '__SEO_OG_IMAGE__': escapeHtml(thumbnail),
      '__SEO_CANONICAL_URL__': escapeHtml(postUrl),

      '__POST_TITLE__': escapeHtml(post.title || ''),
      '__POST_CATEGORY__': escapeHtml(post.category || '콘텐츠'),
      '__CATEGORY__': escapeHtml(post.category || '콘텐츠'),
      '__POST_DATE__': escapeHtml(formatDateLabel(post.published_at || post.date || '')),
      '__POST_SUMMARY__': escapeHtml(post.summary || ''),
      '__POST_BODY__': rawBody,

      '__RELATED_POSTS__': relatedPosts,

      '__CTA_PRIMARY_URL__': '/#contact',
      '__CTA_PRIMARY_TEXT__': '가격 문의하기',
      '__CTA_SECONDARY_URL__': '/blog/',
      '__CTA_SECONDARY_TEXT__': '목록 보기',

      '__JSON_LD_ARTICLE__': makeArticleJsonLd(post, postUrl, description, thumbnail),
    });

    const outDir = path.join(blogRoot, post.slug);
    writeUtf8(path.join(outDir, 'index.html'), renderedPost);
  }

  const renderedIndex = renderTemplate(indexTemplate, {
    '__SITE_URL__': SITE_URL,
    '__SITE_NAME__': SITE_NAME,
    '__POST_COUNT__': String(posts.length),
    '__CATEGORY_FILTERS__': buildCategoryFilters(posts),
    '__POST_CARDS__': buildPostCards(posts),
  });

  writeUtf8(path.join(blogRoot, 'index.html'), renderedIndex);
  writeUtf8(path.join(ROOT, 'sitemap.xml'), buildSitemap(posts));
  writeUtf8(path.join(ROOT, 'feed.xml'), buildFeed(posts));

  console.log('블로그 빌드 완료');
  console.log(`- posts data: ${toPosix(path.relative(ROOT, postsDataPath))}`);
  console.log(`- template dir: ${toPosix(path.relative(ROOT, templateDir))}`);
  console.log(`- posts dir: ${toPosix(path.relative(ROOT, postsDir))}`);
  console.log(`- generated: /blog/ (${posts.length}개 글)`);
}

try {
  main();
} catch (error) {
  console.error('[build-blog] 실패');
  console.error(error?.message || error);
  process.exit(1);
}

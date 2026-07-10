import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://cruiseplay-dyt.pages.dev';
const SITE_NAME = '크루즈플레이';
const SITE_DESCRIPTION = '처음 크루즈를 준비하는 분을 위한 비용, 선실, 준비물, 기항지 정보 가이드.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-default.jpg`;

const TEMPLATE_DIR_CANDIDATES = [
  path.join(ROOT, 'blog', 'templates'),
  path.join(ROOT, 'blog', '_templates'),
];

const POSTS_DIR_CANDIDATES = [
  path.join(ROOT, 'blog', 'posts'),
  path.join(ROOT, 'blog', '_posts'),
];

const META_PATH_CANDIDATES = [
  path.join(ROOT, 'content', 'blog-meta.json'),
  path.join(ROOT, 'blog', 'blog-meta.json'),
];

function exists(targetPath) {
  try { return fs.existsSync(targetPath); } catch { return false; }
}

function pickExisting(candidates, label, required = true) {
  const found = candidates.find(exists);
  if (!found && required) {
    throw new Error(`${label} 경로를 찾지 못했습니다.\n후보:\n- ${candidates.join('\n- ')}`);
  }
  return found || '';
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
  if (exists(targetPath)) fs.rmSync(targetPath, { recursive: true, force: true });
}

function replaceAll(source, search, replacement) {
  return String(source).split(search).join(replacement ?? '');
}

function renderTemplate(template, map) {
  let out = String(template);
  for (const [key, value] of Object.entries(map)) out = replaceAll(out, key, value ?? '');
  return out;
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
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toPosix(p) { return String(p).replace(/\\/g, '/'); }

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

function humanizeSlug(slug = '') {
  return String(slug || '').replace(/[-_]+/g, ' ').trim();
}

function normalizeDate(value) {
  if (!value) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return String(value);
  if (/^\d{4}\.\d{2}\.\d{2}$/.test(String(value))) return String(value).replace(/\./g, '-');
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

function splitTags(value = '') {
  if (Array.isArray(value)) return value.map(v => String(v || '').trim()).filter(Boolean);
  return String(value || '').split(/[,\n|]/).map(item => String(item || '').replace(/^#+/, '').trim()).filter(Boolean);
}

function walkHtmlFiles(dir, result = []) {
  if (!exists(dir)) return result;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtmlFiles(fullPath, result);
    if (entry.isFile() && /\.html?$/i.test(entry.name)) result.push(fullPath);
  }
  return result;
}

function cleanupGeneratedBlog(blogRoot) {
  if (!exists(blogRoot)) return;
  const keepNames = new Set(['posts', '_posts', 'templates', '_templates', 'blog-meta.json']);
  const entries = fs.readdirSync(blogRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (keepNames.has(entry.name)) continue;
    rmIfExists(path.join(blogRoot, entry.name));
  }
}

function loadMetaMap() {
  const metaPath = pickExisting(META_PATH_CANDIDATES, '블로그 메타데이터', false);
  if (!metaPath) return new Map();

  const raw = JSON.parse(readUtf8(metaPath));
  const posts = Array.isArray(raw) ? raw : Array.isArray(raw.posts) ? raw.posts : [];
  const map = new Map();

  for (const post of posts) {
    const slug = String(post.slug || post.content_id || '').trim() || slugify(post.title || '');
    if (!slug) continue;
    map.set(slug, { ...post, slug });
  }

  return map;
}

function extractFirstHeading(rawBody) {
  const h1 = String(rawBody).match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1?.[1]) return stripTags(h1[1]);
  const h2 = String(rawBody).match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2?.[1]) return stripTags(h2[1]);
  return '';
}

function removeFirstH1(rawBody) {
  return String(rawBody).replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');
}

function extractSummaryFromBody(rawBody) {
  const paragraphs = [...String(rawBody).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(match => stripTags(match[1]))
    .filter(Boolean);
  const summary = paragraphs.slice(0, 2).join(' ').trim();
  return (summary || stripHtml(rawBody)).slice(0, 180);
}

function buildIntroWrappedBody(bodyHtml) {
  if (!bodyHtml || /post-intro-section/.test(bodyHtml)) return bodyHtml;
  const firstH2Index = bodyHtml.search(/<h2\b/i);
  if (firstH2Index <= 0) return bodyHtml;
  const intro = bodyHtml.slice(0, firstH2Index).trim();
  const rest = bodyHtml.slice(firstH2Index).trim();
  if (!stripHtml(intro)) return bodyHtml;
  return `<section class="post-intro-section">${intro}</section>${rest ? '\n' + rest : ''}`;
}

function buildTableOfContentsAndBody(rawBody, postSlug) {
  const headings = [];
  let index = 0;
  let normalizedBody = removeFirstH1(rawBody).trim();

  normalizedBody = normalizedBody.replace(/<h([2-3])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    const text = stripTags(inner);
    if (!text) return match;
    index += 1;
    const id = `${postSlug}-toc-${index}-${slugify(text) || `section-${index}`}`;
    headings.push({ level: Number(level), id, text });
    if (/\sid\s*=/.test(attrs)) return `<h${level}${attrs}>${inner}</h${level}>`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

  normalizedBody = buildIntroWrappedBody(normalizedBody);

  const tocHtml = headings.length
    ? `<div class="post-toc-box"><strong class="post-toc-title">목차</strong><ul class="post-toc-list">${headings.map(item => `<li class="is-level-${item.level}"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join('')}</ul></div>`
    : '';

  return { bodyHtml: normalizedBody, tocHtml };
}

function makeArticleJsonLd(post, postUrl, description, thumbnail) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title || '',
    description,
    image: thumbnail,
    datePublished: normalizeDate(post.published_at || '') || undefined,
    dateModified: normalizeDate(post.updated_at || post.published_at || '') || undefined,
    mainEntityOfPage: postUrl,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/logo.png` } },
  }, null, 2);
}

function resolvePostMeta({ slug, rawBody, filePath, fileStat, metaMap }) {
  const meta = metaMap.get(slug) || {};
  return {
    slug,
    title: meta.title || extractFirstHeading(rawBody) || humanizeSlug(slug) || slug,
    summary: meta.summary || extractSummaryFromBody(removeFirstH1(rawBody)),
    thumbnail: meta.thumbnail_url || meta.thumbnail || DEFAULT_OG_IMAGE,
    category: meta.category || '콘텐츠',
    tags: splitTags(meta.tag_text || meta.tags || ''),
    published_at: normalizeDate(meta.published_at || meta.date || fileStat.mtime),
    updated_at: normalizeDate(meta.updated_at || meta.modified_at || meta.published_at || fileStat.mtime),
    sort_order: Number(meta.sort_order || 999999),
    filePath,
    rawBody,
  };
}

function buildCategoryFilters(posts) {
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
  return categories.map(category => `<button type="button" class="blog-filter-btn" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('\n');
}

function buildPostCards(posts) {
  return posts.map(post => {
    const link = `/blog/${encodeURIComponent(post.slug)}/`;
    const tags = Array.isArray(post.tags) ? post.tags.join(', ') : '';
    return `<article class="blog-card" data-category="${escapeHtml(post.category)}" data-title="${escapeHtml(post.title)}" data-summary="${escapeHtml(post.summary)}" data-tags="${escapeHtml(tags)}">
  <a class="blog-card-cover" href="${link}"><img src="${escapeHtml(post.thumbnail || DEFAULT_OG_IMAGE)}" alt="${escapeHtml(post.title)}" loading="lazy" /></a>
  <div class="blog-card-body">
    <div class="blog-card-topline"><span class="blog-card-category">${escapeHtml(post.category)}</span><span class="blog-card-date">${escapeHtml(formatDateLabel(post.published_at))}</span></div>
    <h2 class="blog-card-title"><a href="${link}">${escapeHtml(post.title)}</a></h2>
    <p class="blog-card-summary">${escapeHtml(post.summary)}</p>
    <div class="blog-card-actions"><a class="blog-card-link" href="${link}">자세히 보기</a></div>
  </div>
</article>`;
  }).join('\n');
}

function buildRelatedPosts(allPosts, currentPost) {
  const currentSlug = currentPost.slug;
  const related = allPosts
    .filter(post => post.slug !== currentSlug)
    .sort((a, b) => (a.category === currentPost.category ? -1 : 0) - (b.category === currentPost.category ? -1 : 0))
    .slice(0, 3);

  return related.map(post => `<a class="post-related-card" href="/blog/${encodeURIComponent(post.slug)}/">
  <div class="post-related-thumb"><img src="${escapeHtml(post.thumbnail || DEFAULT_OG_IMAGE)}" alt="${escapeHtml(post.title)}" loading="lazy" /></div>
  <span class="post-related-chip">${escapeHtml(post.category)}</span>
  <strong>${escapeHtml(post.title)}</strong>
  <p>${escapeHtml(post.summary)}</p>
</a>`).join('\n');
}

function buildTagLinks(tags) {
  return (Array.isArray(tags) ? tags : []).map(tag => `<span class="post-tag">#${escapeHtml(tag)}</span>`).join('');
}

function buildPagerHtml(posts, currentIndex) {
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  if (!prev && !next) return '';
  const prevHtml = prev ? `<a class="post-pager-link is-prev" href="/blog/${encodeURIComponent(prev.slug)}/"><span class="post-pager-label">이전 글</span><strong>${escapeHtml(prev.title)}</strong></a>` : '<span class="post-pager-link is-empty"></span>';
  const nextHtml = next ? `<a class="post-pager-link is-next" href="/blog/${encodeURIComponent(next.slug)}/"><span class="post-pager-label">다음 글</span><strong>${escapeHtml(next.title)}</strong></a>` : '<span class="post-pager-link is-empty"></span>';
  return `<div class="post-pager">${prevHtml}${nextHtml}</div>`;
}

function buildSitemap(posts) {
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: '2026-07-10', priority: '1.0' },
    { loc: `${SITE_URL}/blog/`, lastmod: '2026-07-10', priority: '0.8' },
    { loc: `${SITE_URL}/about/`, lastmod: '2026-07-10', priority: '0.5' },
    { loc: `${SITE_URL}/contact/`, lastmod: '2026-07-10', priority: '0.5' },
    { loc: `${SITE_URL}/privacy/`, lastmod: '2026-07-10', priority: '0.4' },
    { loc: `${SITE_URL}/terms/`, lastmod: '2026-07-10', priority: '0.4' },
    ...posts.map(post => ({ loc: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`, lastmod: normalizeDate(post.updated_at || post.published_at) || '2026-07-10', priority: '0.6' })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
}

function buildFeed(posts) {
  const items = posts.slice(0, 20).map(post => {
    const link = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
    const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
    return `<item><title>${escapeHtml(post.title)}</title><link>${link}</link><guid>${link}</guid><description>${escapeHtml(post.summary)}</description><pubDate>${pubDate}</pubDate></item>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${SITE_NAME}</title><link>${SITE_URL}/blog/</link><description>${SITE_DESCRIPTION}</description>${items}</channel></rss>\n`;
}

async function main() {
  const templateDir = pickExisting(TEMPLATE_DIR_CANDIDATES, '화면 틀');
  const postsDir = pickExisting(POSTS_DIR_CANDIDATES, '글 내용', false);

  if (!postsDir) {
    console.log('blog/posts 폴더가 없어 기존 발행 페이지는 유지합니다. 새 글 발행 시 blog/posts/*.html을 추가하세요.');
    return;
  }

  const htmlFiles = walkHtmlFiles(postsDir);
  if (!htmlFiles.length) {
    console.log('blog/posts에 글 파일이 없어 기존 발행 페이지는 유지합니다.');
    return;
  }

  const indexTemplatePath = path.join(templateDir, 'index.template.html');
  const postTemplatePath = path.join(templateDir, 'post.template.html');
  const metaMap = loadMetaMap();
  const posts = htmlFiles.map(filePath => {
    const rawBody = readUtf8(filePath).trim();
    const fileStat = fs.statSync(filePath);
    const relative = path.relative(postsDir, filePath);
    const slug = path.basename(relative, path.extname(relative));
    if (/<!doctype html/i.test(rawBody) || /<html[\s>]/i.test(rawBody) || /<head[\s>]/i.test(rawBody)) {
      throw new Error(`글 내용 파일에는 본문 조각만 넣어주세요: ${toPosix(path.relative(ROOT, filePath))}`);
    }
    return resolvePostMeta({ slug, rawBody, filePath, fileStat, metaMap });
  }).sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    const dateCompare = String(b.published_at || '').localeCompare(String(a.published_at || ''));
    if (dateCompare !== 0) return dateCompare;
    return String(a.title || '').localeCompare(String(b.title || ''), 'ko');
  });

  const blogRoot = path.join(ROOT, 'blog');
  cleanupGeneratedBlog(blogRoot);

  const indexTemplate = readUtf8(indexTemplatePath);
  const postTemplate = readUtf8(postTemplatePath);

  posts.forEach((post, postIndex) => {
    const tocAndBody = buildTableOfContentsAndBody(post.rawBody, post.slug);
    const description = (post.summary || stripHtml(tocAndBody.bodyHtml)).slice(0, 160);
    const postUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
    const renderedPost = renderTemplate(postTemplate, {
      '__SITE_URL__': SITE_URL,
      '__SITE_NAME__': SITE_NAME,
      '__SEO_TITLE__': escapeHtml(`${post.title} | ${SITE_NAME}`),
      '__SEO_DESCRIPTION__': escapeHtml(description),
      '__POST_URL__': escapeHtml(postUrl),
      '__THUMBNAIL_URL__': escapeHtml(post.thumbnail || DEFAULT_OG_IMAGE),
      '__PUBLISHED_ISO__': escapeHtml(post.published_at || ''),
      '__UPDATED_ISO__': escapeHtml(post.updated_at || post.published_at || ''),
      '__BLOG_POSTING_JSON_LD__': makeArticleJsonLd(post, postUrl, description, post.thumbnail || DEFAULT_OG_IMAGE),
      '__TITLE__': escapeHtml(post.title),
      '__SUMMARY__': escapeHtml(post.summary),
      '__CATEGORY__': escapeHtml(post.category),
      '__CATEGORY_SLUG__': escapeHtml(slugify(post.category || '콘텐츠')),
      '__PUBLISHED_DATE__': escapeHtml(formatDateLabel(post.published_at || '')),
      '__UPDATED_DATE__': escapeHtml(formatDateLabel(post.updated_at || post.published_at || '')),
      '__TAG_COUNT__': String(post.tags.length),
      '__POST_BODY__': tocAndBody.bodyHtml,
      '__TABLE_OF_CONTENTS__': tocAndBody.tocHtml,
      '__RELATED_POSTS__': buildRelatedPosts(posts, post),
      '__PAGER_HTML__': buildPagerHtml(posts, postIndex),
      '__TAG_LINKS__': buildTagLinks(post.tags),
      '__CTA_PRIMARY_URL__': '/#contact',
      '__CTA_PRIMARY_LABEL__': '문의하기',
      '__CTA_SECONDARY_URL__': '/blog/',
      '__CTA_SECONDARY_LABEL__': '목록 보기',
    });
    writeUtf8(path.join(blogRoot, post.slug, 'index.html'), renderedPost);
  });

  const renderedIndex = renderTemplate(indexTemplate, {
    '__SITE_URL__': SITE_URL,
    '__SITE_NAME__': SITE_NAME,
    '__SEO_TITLE__': `${SITE_NAME} 크루즈 여행 가이드`,
    '__SEO_DESCRIPTION__': SITE_DESCRIPTION,
    '__POST_COUNT__': String(posts.length),
    '__CATEGORY_FILTERS__': buildCategoryFilters(posts),
    '__POST_CARDS__': buildPostCards(posts),
  });

  writeUtf8(path.join(blogRoot, 'index.html'), renderedIndex);
  writeUtf8(path.join(ROOT, 'sitemap.xml'), buildSitemap(posts));
  writeUtf8(path.join(ROOT, 'feed.xml'), buildFeed(posts));

  console.log('구글시트 없이 로컬 파일 기반 블로그 빌드 완료');
  console.log(`- 글 내용: ${toPosix(path.relative(ROOT, postsDir))}`);
  console.log(`- 글 수: ${posts.length}개`);
}

main().catch(error => {
  console.error('[실패]');
  console.error(error?.message || error);
  process.exit(1);
});

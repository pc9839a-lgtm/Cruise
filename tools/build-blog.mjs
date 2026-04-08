import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://cruiseplay-dyt.pages.dev';
const SITE_NAME = '크루즈플레이';
const SITE_DESCRIPTION = '처음 떠나는 크루즈 여행에서 많이 궁금해하는 비용, 준비물, 선실, 기항지 정보를 쉽게 안내합니다.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-default.jpg`;

// 반드시 실제 Apps Script 웹앱 URL로 바꾸거나, 환경변수 CRUISE_BOOTSTRAP_URL로 넣어주세요.
const SHEET_BOOTSTRAP_URL =
  process.env.CRUISE_BOOTSTRAP_URL ||
  'https://script.google.com/macros/s/AKfycbw2e6hcSUoGCM9gdxKTuEPTy3BULFQLQoYoeuLSaDN3fqQRfdvPQ6rb622aQXKzvcU/exec';

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

function replaceAll(source, search, replacement) {
  return String(source).split(search).join(replacement ?? '');
}

function renderTemplate(template, map) {
  let out = String(template);
  for (const [key, value] of Object.entries(map)) {
    out = replaceAll(out, key, value ?? '');
  }
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
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toPosix(p) {
  return String(p).replace(/\\/g, '/');
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

function humanizeSlug(slug = '') {
  return String(slug || '')
    .replace(/[-_]+/g, ' ')
    .trim();
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

function extractImageFormulaUrl(value = '') {
  const text = String(value || '').trim();
  if (!text) return '';
  const imageFormula = text.match(/^=IMAGE\(\s*"([^"]+)"(?:\s*,.*)?\)$/i);
  if (imageFormula?.[1]) return imageFormula[1].trim();
  return text;
}

function normalizeGoogleDriveImageUrl(value = '') {
  const text = String(value || '').trim();
  if (!text) return '';

  const fileMatch = text.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (fileMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }

  const openMatch = text.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (openMatch?.[1] && /drive\.google\.com/i.test(text)) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  return text;
}

function normalizeImageUrl(value = '') {
  let text = String(value || '').trim();
  if (!text) return '';

  text = extractImageFormulaUrl(text);
  text = normalizeGoogleDriveImageUrl(text);

  if (/^https?:\/\//i.test(text)) return text;
  return `${SITE_URL}/${String(text).replace(/^\/+/, '')}`;
}

function splitTags(value = '') {
  if (Array.isArray(value)) return value.map(v => String(v || '').trim()).filter(Boolean);

  return String(value || '')
    .split(/[,\n|]/)
    .map(item => String(item || '').replace(/^#+/, '').trim())
    .filter(Boolean);
}

function appendQuery(urlText, params) {
  const url = new URL(urlText);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value) !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

async function fetchBootstrapPayload() {
  if (!SHEET_BOOTSTRAP_URL || SHEET_BOOTSTRAP_URL.includes('YOUR_APPS_SCRIPT_WEBAPP_URL')) {
    throw new Error('SHEET_BOOTSTRAP_URL 값을 실제 Apps Script 웹앱 URL로 바꿔주세요.');
  }

  const targetUrl = appendQuery(SHEET_BOOTSTRAP_URL, { action: 'bootstrap_full' });
  const response = await fetch(targetUrl, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'accept': 'application/json,text/plain,*/*',
      'cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`시트 bootstrap 호출 실패 (${response.status}): ${targetUrl}`);
  }

  const payload = await response.json();
  if (!payload || typeof payload !== 'object') {
    throw new Error('시트 bootstrap 응답 형식이 올바르지 않습니다.');
  }

  return payload;
}

function buildContentLinkMap(contentLinks = []) {
  const map = new Map();

  for (const row of contentLinks) {
    const slug =
      extractSlugFromLink(row.link_url) ||
      String(row.content_id || '').trim() ||
      slugify(row.title || '');

    if (!slug) continue;

    map.set(slug, {
      slug,
      content_id: String(row.content_id || '').trim(),
      title: String(row.title || '').trim(),
      summary: String(row.summary || '').trim(),
      category: String(row.category || '').trim(),
      thumbnail_url: normalizeImageUrl(row.thumbnail_url || ''),
      link_url: String(row.link_url || '').trim(),
      tag_text: String(row.tag_text || '').trim(),
      published_at: normalizeDate(row.published_at || row.date || row.created_at || ''),
      updated_at: normalizeDate(row.updated_at || row.modified_at || ''),
      sort_order: Number(row.sort_order || row.sort_no || 999999),
    });
  }

  return map;
}

function walkHtmlFiles(dir, result = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, result);
      continue;
    }

    if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      result.push(fullPath);
    }
  }

  return result;
}

function cleanupGeneratedBlog(blogRoot) {
  if (!exists(blogRoot)) return;

  const keepNames = new Set(['posts', '_posts', 'templates', '_templates']);

  const entries = fs.readdirSync(blogRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (keepNames.has(entry.name)) continue;
    rmIfExists(path.join(blogRoot, entry.name));
  }
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
  if (summary) return summary.slice(0, 180);

  return stripHtml(rawBody).slice(0, 180);
}

function buildIntroWrappedBody(bodyHtml) {
  if (!bodyHtml) return '';
  if (/post-intro-section/.test(bodyHtml)) return bodyHtml;

  const firstH2Index = bodyHtml.search(/<h2\b/i);
  if (firstH2Index <= 0) return bodyHtml;

  const intro = bodyHtml.slice(0, firstH2Index).trim();
  const rest = bodyHtml.slice(firstH2Index).trim();

  const introPlain = stripHtml(intro);
  if (!introPlain) return bodyHtml;

  return `<section class="post-intro-section">${intro}</section>${rest ? '\n' + rest : ''}`;
}

function buildTableOfContentsAndBody(rawBody, postSlug) {
  const headings = [];
  let index = 0;

  let normalizedBody = removeFirstH1(rawBody).trim();

  normalizedBody = String(normalizedBody).replace(
    /<h([2-3])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, inner) => {
      const text = stripTags(inner);
      if (!text) return match;

      index += 1;
      const id = `${postSlug}-toc-${index}-${slugify(text) || `section-${index}`}`;

      headings.push({
        level: Number(level),
        id,
        text,
      });

      if (/\sid\s*=/.test(attrs)) {
        return `<h${level}${attrs}>${inner}</h${level}>`;
      }

      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );

  normalizedBody = buildIntroWrappedBody(normalizedBody);

  const tocHtml = headings.length
    ? `<div class="post-toc-box"><strong class="post-toc-title">목차</strong><ul class="post-toc-list">${headings
        .map(item => `<li class="is-level-${item.level}"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`)
        .join('')}</ul></div>`
    : '';

  return {
    bodyHtml: normalizedBody,
    tocHtml,
  };
}

function makeArticleJsonLd(post, postUrl, description, thumbnail) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title || '',
      description,
      image: thumbnail,
      datePublished: normalizeDate(post.published_at || '') || undefined,
      dateModified: normalizeDate(post.updated_at || post.published_at || '') || undefined,
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
      const slug = post.slug;
      const title = escapeHtml(post.title || '');
      const summary = escapeHtml(post.summary || '');
      const category = escapeHtml(post.category || '콘텐츠');
      const tags = Array.isArray(post.tags) ? post.tags.join(', ') : '';
      const thumb = escapeHtml(post.thumbnail || DEFAULT_OG_IMAGE);
      const link = `/blog/${encodeURIComponent(slug)}/`;
      const dateLabel = escapeHtml(formatDateLabel(post.published_at || ''));

      return `
<article class="blog-card" data-category="${category}" data-title="${title}" data-summary="${summary}" data-tags="${escapeHtml(tags)}">
  <a class="blog-card-cover" href="${link}">
    <img src="${thumb}" alt="${title}" loading="lazy" />
  </a>
  <div class="blog-card-body">
    <div class="blog-card-topline">
      <span class="blog-card-category">${category}</span>
      ${dateLabel ? `<span class="blog-card-date">${dateLabel}</span>` : ''}
    </div>
    <h2 class="blog-card-title"><a href="${link}">${title}</a></h2>
    <p class="blog-card-summary">${summary}</p>
    <div class="blog-card-actions">
      <a class="blog-card-link" href="${link}">자세히 보기</a>
    </div>
  </div>
</article>`.trim();
    })
    .join('\n');
}

function buildRelatedPosts(allPosts, currentPost) {
  const currentSlug = currentPost.slug;

  const sameCategory = allPosts.filter(
    post => post.slug !== currentSlug && post.category && post.category === currentPost.category
  );

  const fallback = allPosts.filter(post => post.slug !== currentSlug);

  const related = [...sameCategory, ...fallback]
    .filter((post, index, arr) => arr.findIndex(item => item.slug === post.slug) === index)
    .slice(0, 3);

  return related
    .map(post => {
      const slug = post.slug;
      const title = escapeHtml(post.title || '');
      const summary = escapeHtml(post.summary || '');
      const category = escapeHtml(post.category || '콘텐츠');
      const thumb = escapeHtml(post.thumbnail || DEFAULT_OG_IMAGE);
      const link = `/blog/${encodeURIComponent(slug)}/`;

      return `
<a class="post-related-card" href="${link}">
  <div class="post-related-thumb">
    <img src="${thumb}" alt="${title}" loading="lazy" />
  </div>
  <span class="post-related-chip">${category}</span>
  <strong>${title}</strong>
  <p>${summary}</p>
</a>`.trim();
    })
    .join('\n');
}

function buildTagLinks(tags) {
  const list = Array.isArray(tags) ? tags : [];
  if (!list.length) return '';
  return list
    .map(tag => `<span class="post-tag">#${escapeHtml(tag)}</span>`)
    .join('');
}

function buildPagerHtml(posts, currentIndex) {
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!prev && !next) return '';

  const prevHtml = prev
    ? `<a class="post-pager-link is-prev" href="/blog/${encodeURIComponent(prev.slug)}/">
        <span class="post-pager-label">이전 글</span>
        <strong>${escapeHtml(prev.title || '')}</strong>
      </a>`
    : '<span class="post-pager-link is-empty"></span>';

  const nextHtml = next
    ? `<a class="post-pager-link is-next" href="/blog/${encodeURIComponent(next.slug)}/">
        <span class="post-pager-label">다음 글</span>
        <strong>${escapeHtml(next.title || '')}</strong>
      </a>`
    : '<span class="post-pager-link is-empty"></span>';

  return `<div class="post-pager">${prevHtml}${nextHtml}</div>`;
}

function buildSitemap(posts) {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/blog/`,
    ...posts.map(post => `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`),
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
      const link = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
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

function resolvePostMeta({ slug, rawBody, filePath, fileStat, contentLinkMap }) {
  const sheetMeta = contentLinkMap.get(slug) || {};

  const title =
    sheetMeta.title ||
    extractFirstHeading(rawBody) ||
    humanizeSlug(slug) ||
    slug;

  const summary =
    sheetMeta.summary ||
    extractSummaryFromBody(removeFirstH1(rawBody));

  const thumbnail =
    sheetMeta.thumbnail_url ||
    DEFAULT_OG_IMAGE;

  const category =
    sheetMeta.category ||
    '콘텐츠';

  const tags = splitTags(sheetMeta.tag_text);

  const publishedAt =
    normalizeDate(sheetMeta.published_at) ||
    normalizeDate(fileStat.mtime);

  const updatedAt =
    normalizeDate(sheetMeta.updated_at) ||
    normalizeDate(fileStat.mtime);

  return {
    slug,
    title,
    summary,
    thumbnail,
    category,
    tags,
    published_at: publishedAt,
    updated_at: updatedAt,
    sort_order: Number.isFinite(sheetMeta.sort_order) ? sheetMeta.sort_order : 999999,
    filePath,
    rawBody,
    link_url: sheetMeta.link_url || `${SITE_URL}/blog/${encodeURIComponent(slug)}/`,
  };
}

async function main() {
  const templateDir = pickExisting(TEMPLATE_DIR_CANDIDATES, '화면 틀');
  const postsDir = pickExisting(POSTS_DIR_CANDIDATES, '글 내용');

  const indexTemplatePath = path.join(templateDir, 'index.template.html');
  const postTemplatePath = path.join(templateDir, 'post.template.html');

  if (!exists(indexTemplatePath)) {
    throw new Error(`index.template.html 파일이 없습니다: ${indexTemplatePath}`);
  }

  if (!exists(postTemplatePath)) {
    throw new Error(`post.template.html 파일이 없습니다: ${postTemplatePath}`);
  }

  const payload = await fetchBootstrapPayload();
  const contentLinks = Array.isArray(payload.content_links) ? payload.content_links : [];
  const contentLinkMap = buildContentLinkMap(contentLinks);

  const htmlFiles = walkHtmlFiles(postsDir);
  if (!htmlFiles.length) {
    throw new Error(`글 파일이 없습니다: ${postsDir}`);
  }

  const posts = htmlFiles
    .map(filePath => {
      const rawBody = readUtf8(filePath).trim();
      const fileStat = fs.statSync(filePath);
      const relative = path.relative(postsDir, filePath);
      const slug = path.basename(relative, path.extname(relative));

      if (/<!doctype html/i.test(rawBody) || /<html[\s>]/i.test(rawBody) || /<head[\s>]/i.test(rawBody)) {
        throw new Error(`글 내용 파일에는 글 내용만 넣어주세요: ${toPosix(path.relative(ROOT, filePath))}`);
      }

      return resolvePostMeta({
        slug,
        rawBody,
        filePath,
        fileStat,
        contentLinkMap,
      });
    })
    .sort((a, b) => {
      if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
      const dateCompare = String(b.published_at || '').localeCompare(String(a.published_at || ''));
      if (dateCompare !== 0) return dateCompare;
      return String(a.title || '').localeCompare(String(b.title || ''), 'ko');
    });

  const blogRoot = path.join(ROOT, 'blog');
  ensureDir(blogRoot);
  cleanupGeneratedBlog(blogRoot);

  const indexTemplate = readUtf8(indexTemplatePath);
  const postTemplate = readUtf8(postTemplatePath);

  posts.forEach((post, postIndex) => {
    const tocAndBody = buildTableOfContentsAndBody(post.rawBody, post.slug);
    const description = (post.summary || stripHtml(tocAndBody.bodyHtml)).slice(0, 160);
    const postUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
    const relatedPostsHtml = buildRelatedPosts(posts, post);
    const pagerHtml = buildPagerHtml(posts, postIndex);
    const tagLinks = buildTagLinks(post.tags);
    const categorySlug = slugify(post.category || '콘텐츠');

    const renderedPost = renderTemplate(postTemplate, {
      '__SITE_URL__': SITE_URL,
      '__SITE_NAME__': SITE_NAME,

      '__SEO_TITLE__': escapeHtml(`${post.title || ''} | ${SITE_NAME}`),
      '__SEO_DESCRIPTION__': escapeHtml(description),
      '__POST_URL__': escapeHtml(postUrl),
      '__THUMBNAIL_URL__': escapeHtml(post.thumbnail || DEFAULT_OG_IMAGE),
      '__PUBLISHED_ISO__': escapeHtml(post.published_at || ''),
      '__UPDATED_ISO__': escapeHtml(post.updated_at || post.published_at || ''),
      '__BLOG_POSTING_JSON_LD__': makeArticleJsonLd(post, postUrl, description, post.thumbnail || DEFAULT_OG_IMAGE),

      '__TITLE__': escapeHtml(post.title || ''),
      '__SUMMARY__': escapeHtml(post.summary || ''),
      '__CATEGORY__': escapeHtml(post.category || '콘텐츠'),
      '__CATEGORY_SLUG__': escapeHtml(categorySlug),
      '__PUBLISHED_DATE__': escapeHtml(formatDateLabel(post.published_at || '')),
      '__UPDATED_DATE__': escapeHtml(formatDateLabel(post.updated_at || post.published_at || '')),
      '__TAG_COUNT__': String(post.tags.length),

      '__POST_BODY__': tocAndBody.bodyHtml,
      '__TABLE_OF_CONTENTS__': tocAndBody.tocHtml,
      '__RELATED_POSTS__': relatedPostsHtml,
      '__PAGER_HTML__': pagerHtml,
      '__TAG_LINKS__': tagLinks,

      '__CTA_PRIMARY_URL__': '/#contact',
      '__CTA_PRIMARY_LABEL__': '가격 문의하기',
      '__CTA_SECONDARY_URL__': '/blog/',
      '__CTA_SECONDARY_LABEL__': '목록 보기',
    });

    const outDir = path.join(blogRoot, post.slug);
    writeUtf8(path.join(outDir, 'index.html'), renderedPost);
  });

  const renderedIndex = renderTemplate(indexTemplate, {
    '__SITE_URL__': SITE_URL,
    '__SITE_NAME__': SITE_NAME,
    '__SEO_TITLE__': `${SITE_NAME} 콘텐츠`,
    '__SEO_DESCRIPTION__': SITE_DESCRIPTION,
    '__POST_COUNT__': String(posts.length),
    '__CATEGORY_FILTERS__': buildCategoryFilters(posts),
    '__POST_CARDS__': buildPostCards(posts),
  });

  writeUtf8(path.join(blogRoot, 'index.html'), renderedIndex);
  writeUtf8(path.join(ROOT, 'sitemap.xml'), buildSitemap(posts));
  writeUtf8(path.join(ROOT, 'feed.xml'), buildFeed(posts));

  const missingSheetRows = posts
    .filter(post => !contentLinkMap.has(post.slug))
    .map(post => post.slug);

  console.log('posts.json 없이 블로그 빌드 완료');
  console.log(`- 화면 틀: ${toPosix(path.relative(ROOT, templateDir))}`);
  console.log(`- 글 내용: ${toPosix(path.relative(ROOT, postsDir))}`);
  console.log(`- 글 수: ${posts.length}개`);

  if (missingSheetRows.length) {
    console.log('- 시트 매칭 없음(기본값 사용):');
    missingSheetRows.forEach(slug => console.log(`  * ${slug}`));
  }
}

main().catch(error => {
  console.error('[실패]');
  console.error(error?.message || error);
  process.exit(1);
});

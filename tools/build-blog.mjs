import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://cruiseplay-dyt.pages.dev';
const SITE_NAME = '크루즈플레이';
const SITE_DESCRIPTION = '크루즈 여행 정보와 추천 일정을 한눈에 확인하고 문의까지 자연스럽게 이어지는 콘텐츠 허브';

const POSTS_DATA_CANDIDATES = [
  path.join(ROOT, 'data', 'blog-posts.json'),
  path.join(ROOT, 'data', 'posts.json')
];

const TEMPLATE_DIR_CANDIDATES = [
  path.join(ROOT, 'blog', 'templates'),
  path.join(ROOT, 'blog', '_templates')
];

const POSTS_DIR_CANDIDATES = [
  path.join(ROOT, 'blog', 'posts'),
  path.join(ROOT, 'blog', '_posts')
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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
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
  return p.replace(/\\/g, '/');
}

function resolvePostSource(post, postsDir) {
  const candidates = [];

  if (post.content_file) {
    candidates.push(path.resolve(ROOT, post.content_file));
    candidates.push(path.resolve(postsDir, path.basename(post.content_file)));
  }

  if (post.slug) {
    candidates.push(path.resolve(postsDir, `${post.slug}.html`));
  }

  const found = candidates.find(exists);
  if (!found) {
    throw new Error(`본문 파일을 찾지 못했습니다: ${post.slug || post.title}`);
  }
  return found;
}

function resolveThumbnail(post) {
  if (!post.thumbnail_url) return `${SITE_URL}/img/og-default.jpg`;
  if (/^https?:\/\//i.test(post.thumbnail_url)) return post.thumbnail_url;
  return `${SITE_URL}/${String(post.thumbnail_url).replace(/^\/+/, '')}`;
}

function render(template, data) {
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => {
    return data[key] ?? '';
  });
}

function makeJsonLd(post, url, description, thumbnail) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title || '',
      description,
      image: thumbnail,
      datePublished: normalizeDate(post.published_at || post.date || '') || undefined,
      dateModified: normalizeDate(post.updated_at || post.published_at || post.date || '') || undefined,
      mainEntityOfPage: url,
      author: {
        '@type': 'Organization',
        name: SITE_NAME
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/img/logo.png`
        }
      }
    },
    null,
    2
  );
}

function buildRelatedPosts(posts, currentPost) {
  const sameCategory = posts.filter(
    p => p.slug !== currentPost.slug && p.category && p.category === currentPost.category
  );
  const fallback = posts.filter(p => p.slug !== currentPost.slug);
  const related = [...sameCategory, ...fallback].slice(0, 3);

  return related
    .map(
      p => `
      <a class="cp-related-card" href="/blog/${encodeURIComponent(p.slug)}/">
        <span class="cp-related-chip">${escapeHtml(p.category || '콘텐츠')}</span>
        <strong>${escapeHtml(p.title || '')}</strong>
        <p>${escapeHtml(p.summary || '')}</p>
      </a>`
    )
    .join('');
}

function buildPostCard(post) {
  return `
    <article class="cp-post-card">
      <a class="cp-post-card__thumb" href="/blog/${encodeURIComponent(post.slug)}/">
        <img src="${escapeHtml(resolveThumbnail(post))}" alt="${escapeHtml(post.title || '')}" loading="lazy" />
      </a>
      <div class="cp-post-card__body">
        <div class="cp-post-card__meta">
          <span class="cp-chip">${escapeHtml(post.category || '콘텐츠')}</span>
          <span class="cp-date">${escapeHtml(formatDateLabel(post.published_at || post.date || ''))}</span>
        </div>
        <h2><a href="/blog/${encodeURIComponent(post.slug)}/">${escapeHtml(post.title || '')}</a></h2>
        <p>${escapeHtml(post.summary || '')}</p>
        <a class="cp-post-card__link" href="/blog/${encodeURIComponent(post.slug)}/">자세히 보기</a>
      </div>
    </article>`;
}

function buildCategoryLinks(posts) {
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
  return categories
    .map(category => `<span class="cp-filter-chip">${escapeHtml(category)}</span>`)
    .join('');
}

function buildSitemap(posts) {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/blog/`,
    ...posts.map(post => `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`)
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
      const url = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
      const description = escapeHtml(post.summary || '');
      const title = escapeHtml(post.title || '');
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
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

function main() {
  const postsDataPath = pickExisting(POSTS_DATA_CANDIDATES, 'posts.json');
  const templateDir = pickExisting(TEMPLATE_DIR_CANDIDATES, '템플릿 폴더');
  const postsDir = pickExisting(POSTS_DIR_CANDIDATES, '본문 소스 폴더');

  const indexTemplatePath = path.join(templateDir, 'index.template.html');
  const postTemplatePath = path.join(templateDir, 'post.template.html');

  if (!exists(indexTemplatePath)) {
    throw new Error(`목록 템플릿이 없습니다: ${indexTemplatePath}`);
  }
  if (!exists(postTemplatePath)) {
    throw new Error(`상세 템플릿이 없습니다: ${postTemplatePath}`);
  }

  const raw = readUtf8(postsDataPath);
  const posts = JSON.parse(raw)
    .filter(post => {
      const active = String(post.is_active ?? post.active ?? 'Y').toUpperCase();
      return active !== 'N' && active !== 'FALSE';
    })
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));

  const indexTemplate = readUtf8(indexTemplatePath);
  const postTemplate = readUtf8(postTemplatePath);

  const blogRoot = path.join(ROOT, 'blog');
  ensureDir(blogRoot);

  for (const post of posts) {
    if (!post.slug) {
      throw new Error(`slug가 없습니다: ${post.title || post.content_id || 'unknown'}`);
    }

    const sourcePath = resolvePostSource(post, postsDir);
    const contentHtml = readUtf8(sourcePath);
    const description = (post.summary || stripHtml(contentHtml)).slice(0, 160);
    const postUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
    const thumbnail = resolveThumbnail(post);
    const relatedPostsHtml = buildRelatedPosts(posts, post);

    const rendered = render(postTemplate, {
      page_title: `${escapeHtml(post.title || '')} | ${SITE_NAME}`,
      meta_description: escapeHtml(description),
      canonical_url: escapeHtml(postUrl),
      og_title: escapeHtml(post.title || ''),
      og_description: escapeHtml(description),
      og_image: escapeHtml(thumbnail),
      post_title: escapeHtml(post.title || ''),
      post_category: escapeHtml(post.category || '콘텐츠'),
      post_date: escapeHtml(formatDateLabel(post.published_at || post.date || '')),
      post_summary: escapeHtml(post.summary || ''),
      post_body: contentHtml,
      related_posts: relatedPostsHtml,
      json_ld: makeJsonLd(post, postUrl, description, thumbnail)
    });

    const outDir = path.join(blogRoot, post.slug);
    writeUtf8(path.join(outDir, 'index.html'), rendered);
  }

  const indexRendered = render(indexTemplate, {
    page_title: `${SITE_NAME} 콘텐츠`,
    meta_description: escapeHtml(SITE_DESCRIPTION),
    canonical_url: `${SITE_URL}/blog/`,
    post_count: String(posts.length),
    category_links: buildCategoryLinks(posts),
    posts_grid: posts.map(buildPostCard).join('')
  });

  writeUtf8(path.join(blogRoot, 'index.html'), indexRendered);
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

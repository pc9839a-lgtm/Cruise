import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://cruiseplay-dyt.pages.dev';
const META_PATH = path.join(ROOT, 'content', 'blog-meta.json');
const MAX_ITEMS = 20;

function readPosts() {
  const raw = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
  const posts = Array.isArray(raw) ? raw : Array.isArray(raw.posts) ? raw.posts : [];

  return posts
    .filter((post) => post && post.slug && post.title && post.published_at)
    .sort((a, b) => {
      const orderA = Number.isFinite(Number(a.sort_order)) ? Number(a.sort_order) : 999999;
      const orderB = Number.isFinite(Number(b.sort_order)) ? Number(b.sort_order) : 999999;
      if (orderA !== orderB) return orderA - orderB;
      return String(b.published_at).localeCompare(String(a.published_at));
    })
    .slice(0, MAX_ITEMS);
}

function cdata(value) {
  return '<![CDATA[' + String(value || '').replace(/]]>/g, ']]]]><![CDATA[>') + ']]>';
}

function pubDate(value, hour = 9) {
  const date = new Date(`${value}T${String(hour).padStart(2, '0')}:00:00+09:00`);
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
}

function buildFeed(posts, fileName) {
  const latestDate = posts[0]?.published_at || new Date().toISOString().slice(0, 10);
  const items = posts.map((post, index) => {
    const link = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
    return [
      '    <item>',
      `      <title>${cdata(post.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <description>${cdata(post.summary || '')}</description>`,
      `      <category>${cdata(post.category || '콘텐츠')}</category>`,
      '      <dc:creator><![CDATA[크루즈플레이]]></dc:creator>',
      `      <pubDate>${pubDate(post.published_at, Math.max(0, 23 - index))}</pubDate>`,
      '    </item>'
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    '    <title>크루즈플레이 콘텐츠</title>',
    `    <link>${SITE_URL}/blog/</link>`,
    '    <description>처음 크루즈를 준비하는 분을 위한 비용, 선실, 준비물, 기항지 정보 가이드입니다.</description>',
    '    <language>ko-KR</language>',
    `    <lastBuildDate>${pubDate(latestDate, 23)}</lastBuildDate>`,
    '    <ttl>60</ttl>',
    `    <atom:link href="${SITE_URL}/${fileName}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    ''
  ].join('\n');
}

const posts = readPosts();
if (!posts.length) {
  throw new Error('RSS로 만들 블로그 메타데이터가 없습니다.');
}

fs.writeFileSync(path.join(ROOT, 'rss.xml'), buildFeed(posts, 'rss.xml'), 'utf8');
fs.writeFileSync(path.join(ROOT, 'feed.xml'), buildFeed(posts, 'feed.xml'), 'utf8');

console.log(`RSS 갱신 완료: 최신 ${posts.length}개 글`);

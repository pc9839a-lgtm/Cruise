import assert from 'node:assert/strict';
import fs from 'node:fs';
const slug='msc-bella-fantastica-aurea-yacht-club-comparison';
const site='https://cruiseplay-dyt.pages.dev';
const url=site+'/blog/'+slug+'/';
const read=p=>fs.readFileSync(p,'utf8');
const source=read('blog/posts/'+slug+'.html');
const page=read('blog/'+slug+'/index.html');
const hub=read('blog/index.html');
const meta=JSON.parse(read('content/blog-meta.json')).posts;
const sitemap=read('sitemap.xml');
const sitemapText=read('sitemap.txt').trim().split(/\r?\n/);
const titles=['Bella','Fantastica','Aurea','Yacht Club'];
for(const keyword of titles) {
  assert.ok(source.includes(keyword),'Missing experience: '+keyword);
  assert.ok(page.includes(keyword),'Missing published benefit: '+keyword);
}
assert.ok(source.length>13000,'Substantial original content required');
assert.equal((source.match(/<h2 id="/g)||[]).length,11);
assert.equal((page.match(/<h1\b/g)||[]).length,1);
assert.equal((page.match(/<h2 id="/g)||[]).length,11);
assert.ok((source.match(/<table class="post-table"/g)||[]).length>=3);
assert.ok((source.match(/<h3>/g)||[]).length>=9,'Situations and FAQ missing');
assert.ok(page.includes('rel="canonical" href="'+url+'"'));
assert.ok(page.includes('<meta name="robots" content="index,follow'));
assert.ok(page.includes('<meta property="article:published_time" content="2026-11-04"'));
assert.ok(!page.includes('__POST_BODY__')&&!page.includes('__SEO_TITLE__'));
const jsTag='<script type="application/ld+json">';
const start=page.indexOf(jsTag),end=page.indexOf('</script>',start);
assert.ok(start>0&&end>start,'Structured data missing');
const schema=JSON.parse(page.slice(start+jsTag.length,end));
assert.ok(schema['@graph'].some(x=>x['@type']==='BlogPosting'&&x.url===url));
assert.ok(schema['@graph'].some(x=>x['@type']==='BreadcrumbList'));
const official=[
  'https://www.msccruises.com/int/our-cruises/msc-experiences-and-cabins',
  'https://www.msccruises.com/int/faq/on-board-information',
  'https://www.msccruises.com/int/our-cruises/msc-yacht-club',
  'https://www.msccruises.com/int/our-cruises/ships/msc-bellissima',
  'https://www.msccruises.com/int/faq/cabins'
];
for(const link of official) assert.ok(page.includes(link),'Official source missing: '+link);
assert.ok(page.includes('Aurea Suites Only')&&page.includes('배달비'));
assert.ok(page.includes('My Choice Dining')&&page.includes('Premium Extra'));
assert.ok(page.includes('가격과 실제 객실 재고는 항차마다'));
for(const href of [
  '/blog/cruise-guarantee-stateroom-gty-guide/',
  '/blog/cruise-family-4-guests-one-vs-two-cabins/',
  '/blog/cruise-onboard-credit-obc-guide/',
  '/blog/cruise-deposit-final-payment-cancellation-guide/'
]) assert.ok(page.includes('href="'+href+'"'),'Related canonical internal link missing '+href);
assert.equal(meta.length,70);
const item=meta.filter(x=>x.slug===slug);
assert.equal(item.length,1);
assert.equal(meta[0].slug,slug,'New article must be top in canonical blog metadata');
assert.equal(item[0].sort_order,-53);
assert.equal((hub.match(/<article class="blog-card"/g)||[]).length,70);
assert.ok(hub.includes('id="blogResultsCount">70</strong>'));
const hubCards=hub.slice(hub.indexOf('<article class="blog-card"'));
assert.ok(hubCards.startsWith('<article class="blog-card"'));
assert.ok(hubCards.slice(0,900).includes('/blog/'+slug+'/'),'Latest article should be first card');
assert.equal((hub.match(new RegExp('/blog/'+slug+'/','g'))||[]).length,1);
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.equal(sitemapUrls.length,78);
assert.equal(new Set(sitemapUrls).size,78);
assert.ok(sitemapUrls.includes(url));
assert.deepEqual(sitemapUrls,sitemapText,'XML/TXT sitemap ordering differs');
for(const path of ['rss.xml','feed.xml']){
  const xml=read(path);
  assert.equal((xml.match(/<item>/g)||[]).length,26);
  assert.ok(xml.includes('<guid isPermaLink="true">'+url+'</guid>'));
  assert.ok(xml.includes('Wed, 04 Nov 2026'));
}
for(const old of [
  '2027-busan-departure-cruise-msc-bellissima-guide',
  'msc-vs-royal-caribbean-cruise-comparison-2026'
]){
  const p='blog/'+old+'/index.html';
  assert.ok(read(p).includes('href="/blog/'+slug+'/"'),'Incoming contextual link missing '+p);
  assert.ok(sitemap.includes('<loc>'+site+'/blog/'+old+'/</loc><lastmod>2026-11-04</lastmod>'),
    'Backlink page lastmod missing '+old);
}
console.log('PASS: 1 new MSC experience guide, 70 blog articles, 78 sitemap URLs, 26 feeds, 5 official citations, 2 backlinks, all 11 sections');

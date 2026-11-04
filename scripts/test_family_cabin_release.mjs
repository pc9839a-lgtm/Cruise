import assert from 'node:assert/strict';
import fs from 'node:fs';
import {compareCabinQuotes, formatCabinDifference} from '../assets/js/family-cabin-pricing.mjs';

const slug = 'cruise-family-4-guests-one-vs-two-cabins';
const url = 'https://cruiseplay-dyt.pages.dev/blog/' + slug + '/';
const source = fs.readFileSync('blog/posts/' + slug + '.html', 'utf8');
const page = fs.readFileSync('blog/' + slug + '/index.html', 'utf8');
const hub = fs.readFileSync('blog/index.html','utf8');
const sitemap = fs.readFileSync('sitemap.xml','utf8');
const textSitemap = fs.readFileSync('sitemap.txt','utf8');
const meta = JSON.parse(fs.readFileSync('content/blog-meta.json','utf8')).posts;

// The source is a controlled editorial fragment. Remove its one known CSS block
// by explicit delimiters, not by trying to sanitize arbitrary HTML with regex.
const cssStart = source.indexOf('<style>');
const cssEnd = source.indexOf('</style>', cssStart);
assert.ok(cssStart >= 0 && cssEnd > cssStart, 'Expected calculator stylesheet');
const editorialOnly = source.slice(0, cssStart) + source.slice(cssEnd + '</style>'.length);
const plain = editorialOnly.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
assert.ok(plain.length > 6500,'Article body must be substantial, not a thin duplicate');
assert.equal((source.match(/<h2 id="/g)||[]).length,10);
assert.equal((page.match(/<h1\b/g)||[]).length,1);
assert.equal((page.match(/<h2 id="/g)||[]).length,10);
assert.ok(page.includes('<link rel="canonical" href="'+url+'"'));
assert.ok(page.includes('application/ld+json'));
assert.ok(page.includes('2026-11-04'));
assert.ok(!/__SEO_|__POST_|__SITE_|__TITLE__/.test(page));
for (const domain of ['www.msccruises.com/int/our-cruises/ships/msc-bellissima',
                      'www.msccruises.com/int/faq/cabins',
                      'www.royalcaribbean.com/faq/questions/how-much-does-a-cruise-cost',
                      'www.royalcaribbean.com/faq/questions/qualifications-special-pricing']) {
  assert.ok(page.includes(domain), 'Primary official source missing: '+domain);
}
for (const href of ['/blog/cabin-type-comparison/','/blog/cruise-cabin-location-guide/',
                     '/blog/cruise-guarantee-stateroom-gty-guide/']) {
  assert.ok(page.includes('href="'+href+'"'), 'Relevant link missing: '+href);
}
assert.ok(page.includes('id="family-run"'), 'Live price comparison tool missing');
const article = meta.filter(x=>x.slug===slug);
assert.equal(article.length,1);
assert.ok(meta.length>=69,'Previous article and later posts must remain present');
assert.equal(article[0].sort_order,-52);
assert.equal((hub.match(/<article class="blog-card"/g)||[]).length,meta.length);
assert.ok(hub.includes('id="blogResultsCount">'+meta.length+'</strong>'));
assert.equal((hub.match(new RegExp('/blog/'+slug+'/', 'g'))||[]).length,1);
const cardsOnly=hub.slice(hub.indexOf('<article class="blog-card"'));
assert.ok(cardsOnly.indexOf('/blog/'+slug+'/')<cardsOnly.indexOf('/blog/2027-verified-sailings/'), 'Newest post must be first card');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.ok(urls.length>=77,'Published sitemap must retain previous article URLs');
assert.equal(new Set(urls).size,urls.length);
assert.deepEqual(urls,textSitemap.trim().split(/\r?\n/));
assert.ok(urls.includes(url));
for(const feed of ['rss.xml','feed.xml']){
 const xml=fs.readFileSync(feed,'utf8');
 assert.ok((xml.match(/<item>/g)||[]).length>=25);
 assert.ok(xml.includes('<guid isPermaLink="true">'+url+'</guid>'));
 assert.ok(xml.includes('<lastBuildDate>Wed, 04 Nov 2026'));
}
for (const other of ['blog/cruise-with-kids-family-guide/index.html',
                     'blog/cruise-guarantee-stateroom-gty-guide/index.html']) {
  assert.ok(fs.readFileSync(other,'utf8').includes('href="/blog/'+slug+'/"'),other+' inbound link missing');
}
const moduleScript='<script type="module" src="/assets/js/family-cabin-pricing.mjs"></script>';
assert.ok(source.includes(moduleScript),'Editorial source must load isolated pricing module');
assert.ok(page.includes(moduleScript),'Published page must load isolated pricing module');
assert.deepEqual(compareCabinQuotes('1000000','1200000','0'),{valid:true,difference:200000});
assert.ok(formatCabinDifference(compareCabinQuotes('1000000','1200000','0'),'KRW').includes('4인 1실이 ₩200,000'));
assert.deepEqual(compareCabinQuotes('1000000','800000','0'),{valid:true,difference:-200000});
assert.ok(formatCabinDifference(compareCabinQuotes('1000000','800000','0'),'KRW').includes('2인 2실이 ₩200,000'));
assert.deepEqual(compareCabinQuotes('1000000','1000000','0'),{valid:true,difference:0});
assert.ok(formatCabinDifference(compareCabinQuotes('1000000','1000000','0')).includes('같습니다'));
assert.equal(compareCabinQuotes('','1000000','0').valid,false);
assert.equal(compareCabinQuotes('-1','1000000','0').valid,false);
assert.equal(compareCabinQuotes('Infinity','1000000','0').valid,false);
assert.ok(formatCabinDifference(compareCabinQuotes('-1','10','0')).includes('0 이상의 숫자'));
assert.ok(formatCabinDifference(compareCabinQuotes('10','20','0'),'USD').includes('$10.00') ||
  formatCabinDifference(compareCabinQuotes('10','20','0'),'USD').includes('$10'));
console.log('PASS: existing family cabin guide preserved; '+meta.length+' blog cards and '+urls.length+' sitemap URLs, official sources and pricing calculator');

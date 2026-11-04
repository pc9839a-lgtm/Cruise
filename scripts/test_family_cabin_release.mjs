import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const slug = 'cruise-family-4-guests-one-vs-two-cabins';
const url = 'https://cruiseplay-dyt.pages.dev/blog/' + slug + '/';
const source = fs.readFileSync('blog/posts/' + slug + '.html', 'utf8');
const page = fs.readFileSync('blog/' + slug + '/index.html', 'utf8');
const hub = fs.readFileSync('blog/index.html','utf8');
const sitemap = fs.readFileSync('sitemap.xml','utf8');
const textSitemap = fs.readFileSync('sitemap.txt','utf8');
const meta = JSON.parse(fs.readFileSync('content/blog-meta.json','utf8')).posts;

const plain = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
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
assert.equal(meta.length,69);
assert.equal(article[0].sort_order,-52);
assert.equal((hub.match(/<article class="blog-card"/g)||[]).length,69);
assert.equal((hub.match(/id="blogResultsCount">69/g)||[]).length,1);
assert.equal((hub.match(new RegExp('/blog/'+slug+'/', 'g'))||[]).length,1);
const cardsOnly=hub.slice(hub.indexOf('<article class="blog-card"'));
assert.ok(cardsOnly.indexOf('/blog/'+slug+'/')<cardsOnly.indexOf('/blog/2027-verified-sailings/'), 'Newest post must be first card');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.equal(urls.length,77);
assert.equal(new Set(urls).size,77);
assert.deepEqual(urls,textSitemap.trim().split(/\r?\n/));
assert.ok(urls.includes(url));
for(const feed of ['rss.xml','feed.xml']){
 const xml=fs.readFileSync(feed,'utf8');
 assert.equal((xml.match(/<item>/g)||[]).length,25);
 assert.ok(xml.includes('<guid isPermaLink="true">'+url+'</guid>'));
 assert.ok(xml.includes('<lastBuildDate>Wed, 04 Nov 2026'));
}
for (const other of ['blog/cruise-with-kids-family-guide/index.html',
                     'blog/cruise-guarantee-stateroom-gty-guide/index.html']) {
  assert.ok(fs.readFileSync(other,'utf8').includes('href="/blog/'+slug+'/"'),other+' inbound link missing');
}
const script=source.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(script,'Calculator script missing');
const ids=new Map();
for(const [id,value] of [
 ['family-one','1000000'],['family-two','1200000'],['family-extra','0'],
 ['family-currency','KRW'],['family-result',''],['family-run','']
]) {
 ids.set(id,{value,textContent:'',addEventListener(name,fn){this[name]=fn}});
}
vm.runInNewContext(script[1],{document:{getElementById:id=>ids.get(id)},Intl,Number}, {timeout:1000});
const button=ids.get('family-run'),result=ids.get('family-result');
assert.equal(typeof button.click,'function');
button.click(); assert.ok(result.textContent.includes('200,000') && result.textContent.includes('4인 1실'));
ids.get('family-two').value='800000'; button.click();
assert.ok(result.textContent.includes('200,000') && result.textContent.includes('2인 2실'));
ids.get('family-two').value='1000000'; button.click();
assert.ok(result.textContent.includes('같습니다'));
ids.get('family-one').value='-1'; button.click();
assert.ok(result.textContent.includes('0 이상의 숫자'));
console.log('PASS: 1 new post, 69 intact blog cards, 77 ordered sitemap URLs, 25 RSS items, official sources and live calculator');

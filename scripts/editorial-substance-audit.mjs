import fs from 'node:fs';
import path from 'node:path';

const root = 'blog';
const files = fs.readdirSync(root, {withFileTypes:true}).filter(v=>v.isDirectory() && fs.existsSync(path.join(root,v.name,'index.html'))).map(v=>path.join(root,v.name,'index.html')).sort();
const paragraphMap = new Map();
const rows = [];
const decode = s => String(s).replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&quot;/gi,'"').replace(/&#39;|&#x27;/gi,"'").replace(/&[a-z]+;/gi,' ');
const plain = s => decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const authority = /(^|\.)((gov\.kr)|(go\.kr)|(gov\.sg)|(law\.go\.kr)|(msccruises\.[a-z.]+)|(royalcaribbean\.com)|(ncl\.com)|(carnival\.com)|(princess\.com)|(disneycruise\.disney\.go\.com)|(iata\.org)|(cdc\.gov)|(nhs\.uk)|(msccruisesusa\.com)|(travel\.state\.gov)|(noaa\.gov)|(eeas\.europa\.eu))$/i;

for (const file of files) {
 const html=fs.readFileSync(file,'utf8');
 const main=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)||[])[1] ||
     (html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)||[])[1] || html;
 const cleaned=main.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<nav\b[\s\S]*?<\/nav>/gi,' ');
 const body=plain(cleaned);
 const h1=plain((main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1] || '');
 const paragraphs=[...cleaned.matchAll(/<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)].map(m=>plain(m[1])).filter(Boolean);
 for(const para of paragraphs){if(para.length<85)continue; if(!paragraphMap.has(para))paragraphMap.set(para,[]);paragraphMap.get(para).push(file)}
 const hrefs=[...cleaned.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(m=>decode(m[1]));
 const external=hrefs.filter(v=>/^https?:\/\//i.test(v));
 const trusted=external.filter(v=>{try{return authority.test(new URL(v).hostname)}catch{return false}});
 const stock=(cleaned.match(/<img\b[^>]*src=["'][^"']*(?:unsplash|pexels|pixabay)/gi)||[]).length;
 const photo=(cleaned.match(/<img\b/gi)||[]).length;
 const hasTable=/<table\b/i.test(main);
 const cases=(body.match(/(?:사례|예시|계산\s*예|비교표|선택\s*기준|비교\s*항목)/g)||[]).length;
 const updated=(html.match(/(?:수정일|최종\s*수정)[^\d]{0,20}(\d{4})[.\/-](\d{1,2})[.\/-](\d{1,2})/)||[]).slice(1).join('-');
 const issues=[];
 if(body.length<1300)issues.push('short_main_text');
 if(trusted.length===0)issues.push('no_official_primary_source');
 if(!hasTable&&cases===0)issues.push('no_comparison_case_or_criteria');
 if(stock>0&&photo===stock)issues.push('only_stock_images');
 if(h1==='')issues.push('no_h1');
 rows.push({file,title:h1,chars:body.length,authoritative_links:trusted.length,external_links:external.length,stock_images:stock,image_count:photo,has_table:hasTable,comparative_terms:cases,issues});
}
const duplicateParagraphs=[...paragraphMap.entries()].filter(([p,files])=>new Set(files).size>1).map(([p,files])=>({sample:p.slice(0,160),files:[...new Set(files)]})).sort((a,b)=>b.files.length-a.files.length);
for(const row of rows){const n=duplicateParagraphs.filter(r=>r.files.includes(row.file)).length;if(n)row.issues.push('long_shared_paragraphs:'+n);row.signals=row.issues.length;}
rows.sort((a,b)=>b.signals-a.signals||a.chars-b.chars);
const result={disclaimer:'Prioritization only. NOT a plagiarism detector or Google AdSense quality score.',total:rows.length,flagged:rows.filter(x=>x.issues.length).length,no_official:rows.filter(x=>x.issues.includes('no_official_primary_source')).length,short_pages:rows.filter(x=>x.issues.includes('short_main_text')).length,duplicate_paragraphs:duplicateParagraphs.slice(0,35),articles:rows};
fs.writeFileSync('editorial-substance-report.json',JSON.stringify(result,null,2));
console.log('CRUISE ARTICLES '+result.total+' | flagged '+result.flagged+' | zero primary sources '+result.no_official+' | short '+result.short_pages+' | long duplicated paragraphs '+duplicateParagraphs.length);
for(const row of rows.filter(x=>x.issues.includes('no_official_primary_source'))) console.log('MISSING_PRIMARY: '+row.file);
for(const row of rows.slice(0,35))console.log([row.signals+' flags',row.chars+' chars',row.authoritative_links+' official sources',row.file,row.issues.join(', ')].join(' | '));
if(process.env.GITHUB_STEP_SUMMARY){
 const s=['## Originality and first-party evidence audit','', '**Pages:** '+result.total+' · **Flagged for human review:** '+result.flagged+' · **No official outbound citations:** '+result.no_official,'',
 '| Page | Visible text characters | Official links | Reasons |','|---|---:|---:|---|',
 ...rows.slice(0,35).map(r=>'| '+r.file+' | '+r.chars+' | '+r.authoritative_links+' | '+r.issues.join(', ')+' |'),
 '', 'No automatic judgment of factual correctness, originality, plagiarism or approval.'];
 fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,s.join('\n')+'\n');
}
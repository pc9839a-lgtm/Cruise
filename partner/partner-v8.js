(function(){
'use strict';
const menuButton=document.getElementById('partnerMenuButton');
const nav=document.getElementById('partnerNav');
const floatingCta=document.getElementById('partnerFloatingCta');
const formSection=document.getElementById('partner-form');
function setValue(id,value){const input=document.getElementById(id);if(input)input.value=value||''}
function setFormResult(message,type){const result=document.getElementById('partnerFormResult');if(!result)return;result.textContent=message||'';result.className='form-result'+(type?' is-'+type:'')}
async function initEmbeddedImages(){
 try{
  const [heroRes,galleryRes]=await Promise.all([
   fetch('/img/partner/data/hero-tiny.b64.txt',{cache:'force-cache'}),
   fetch('/img/partner/data/gallery-tiny.b64.txt',{cache:'force-cache'})
  ]);
  if(heroRes.ok){const b64=(await heroRes.text()).trim();const hero=document.querySelector('.hero-bg');if(hero&&b64)hero.src='data:image/webp;base64,'+b64}
  if(galleryRes.ok){const b64=(await galleryRes.text()).trim();if(b64)document.documentElement.style.setProperty('--partner-gallery-image','url("data:image/webp;base64,'+b64+'")')}
 }catch(error){console.warn('파트너 이미지 로딩 실패',error)}
}
function initApprovedCopy(){
 const labels=[...document.querySelectorAll('.section-label')];
 const findSection=(token)=>{const label=labels.find(el=>String(el.textContent||'').includes(token));return label?label.closest('section'):null};
 const freeSection=findSection('11 · FREE CRUISE');
 if(freeSection){
  const heading=freeSection.querySelector('h2');
  if(heading)heading.innerHTML='하지만 실제로,<br /><span class="accent-text">무료로 크루즈 여행을 하면서<br />달러 수익을 버는 사람들이 있습니다.</span>';
 }
 const togetherSection=findSection('15 · TOGETHER');
 if(togetherSection){
  const heading=togetherSection.querySelector('h2');
  if(heading)heading.innerHTML='<span class="accent-text">여행을 좋아한다면<br />누구나 시작할 수 있습니다.</span>';
  const support=togetherSection.querySelector('.support-grid');
  if(support)support.remove();
 }
 const galleryHeading=document.querySelector('#proof h2');
 if(galleryHeading)galleryHeading.innerHTML='사진으로만 보던 크루즈가<br /><span class="accent-text">내 일이 됩니다.</span>';
 const finalSection=findSection('19 · YOUR NEXT CRUISE');
 if(finalSection){
  const heading=finalSection.querySelector('h2');
  if(heading)heading.innerHTML='다음 크루즈는.<br /><span class="accent-text">내 돈으로만 가지 마세요.</span>';
  const oldCopy=finalSection.querySelector('.partner-anyone-copy');
  if(oldCopy)oldCopy.remove();
 }
}
function initTracking(){const params=new URLSearchParams(location.search);setValue('partnerAgentInput',String(params.get('agent')||'').trim()||'admin');setValue('partnerUtmSourceInput',params.get('utm_source')||'');setValue('partnerUtmMediumInput',params.get('utm_medium')||'');setValue('partnerUtmCampaignInput',params.get('utm_campaign')||'');setValue('partnerPageUrlInput',location.href);setValue('partnerReferrerInput',document.referrer||'')}
function initMenu(){if(!menuButton||!nav)return;menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('is-menu-open',open)});nav.addEventListener('click',e=>{if(!e.target.closest('a'))return;nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('is-menu-open')})}
function initReveal(){document.documentElement.classList.add('js-enabled');const groups=document.querySelectorAll('.reveal-group');const cards=document.querySelectorAll('.reveal-card,.reveal-media');if(!('IntersectionObserver'in window)){groups.forEach(el=>el.classList.add('is-visible'));cards.forEach(el=>el.classList.add('is-visible'));return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');observer.unobserve(entry.target)}),{threshold:.13,rootMargin:'0px 0px -40px 0px'});groups.forEach(el=>observer.observe(el));cards.forEach((el,index)=>{el.style.transitionDelay=(index%3)*.08+'s';observer.observe(el)})}
function formatCount(value,decimals){return Number(value).toLocaleString('ko-KR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}
function animateCounter(el){if(el.dataset.counted==='1')return;el.dataset.counted='1';const target=Number(el.dataset.count);const decimals=Number(el.dataset.decimals||0);const suffix=el.dataset.suffix||'';const duration=1700;const start=performance.now();function tick(now){const p=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-p,3);el.textContent=formatCount(target*eased,decimals)+suffix;if(p<1)requestAnimationFrame(tick);else el.textContent=formatCount(target,decimals)+suffix}requestAnimationFrame(tick)}
function initCounters(){const counters=document.querySelectorAll('.count-number');const line=document.querySelector('.growth-line');if(!('IntersectionObserver'in window)){counters.forEach(animateCounter);if(line)line.classList.add('is-animated');return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;animateCounter(entry.target);observer.unobserve(entry.target)}),{threshold:.45});counters.forEach(el=>observer.observe(el));if(line){const lineObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){line.classList.add('is-animated');lineObserver.disconnect()}}),{threshold:.45});lineObserver.observe(line)}}
function initFloatingCta(){if(!floatingCta||!formSection||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver(entries=>{floatingCta.classList.toggle('is-hidden',Boolean(entries[0]&&entries[0].isIntersecting))},{threshold:.08,rootMargin:'-10% 0px -10% 0px'});observer.observe(formSection)}
function initPartnerForm(){const form=document.getElementById('partnerInquiryForm');const interest=document.getElementById('partnerInterestInput');const message=document.getElementById('partnerMessageInput');if(!form||!interest||!message)return;form.addEventListener('submit',event=>{const chosen=String(interest.value||'').trim();if(!chosen){event.preventDefault();event.stopImmediatePropagation();setFormResult('가장 궁금한 내용을 선택해주세요.','error');interest.focus();return}const prefix='[관심내용: '+chosen+']';const current=String(message.value||'').replace(/^\[관심내용:[^\]]+\]\s*/i,'').trim();message.value=prefix+(current?'\n'+current:'')},true)}
function init(){initApprovedCopy();initEmbeddedImages();initTracking();initMenu();initReveal();initCounters();initFloatingCta();initPartnerForm()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
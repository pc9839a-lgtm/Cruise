(function(){
'use strict';

const root=document.documentElement;
function loadStyle(href,key){
 if(document.querySelector('link['+key+']'))return;
 const link=document.createElement('link');
 link.rel='stylesheet';
 link.href=href;
 link.setAttribute(key,'true');
 document.head.appendChild(link);
}
loadStyle('/partner/partner-motion-v2.css?v=20260713-varied-motion','data-partner-motion-v2');
loadStyle('/partner/partner-form-v2.css?v=20260713-centered-simple','data-partner-form-v2');

root.classList.add('js-enabled');
window.addEventListener('error',()=>root.classList.add('reveal-fallback'),{once:true});

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
  if(galleryRes.ok){const b64=(await galleryRes.text()).trim();if(b64)root.style.setProperty('--partner-gallery-image','url("data:image/webp;base64,'+b64+'")')}
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

function initSimpleForm(){
 const section=document.getElementById('partner-form');
 const form=document.getElementById('partnerInquiryForm');
 const grid=form&&form.querySelector('.partner-form-grid');
 if(!section||!form||!grid)return;
 section.classList.add('partner-form-simple');
 const layout=section.querySelector('.form-layout');
 if(layout)layout.classList.add('is-centered-form');
 grid.innerHTML='\
  <label class="partner-field partner-field-full"><span>이름 *</span><input type="text" name="name" id="partnerNameInput" placeholder="이름을 입력해주세요" autocomplete="name" required /></label>\
  <label class="partner-field partner-field-full"><span>연락처 *</span><input type="tel" name="phone" id="partnerPhoneInput" inputmode="numeric" autocomplete="tel" placeholder="숫자만 입력해주세요" required /></label>\
  <label class="partner-field partner-field-full"><span>지역 *</span><input type="text" name="region_detail" id="partnerRegionInput" placeholder="예: 서울" autocomplete="address-level1" required /></label>\
  <label class="partner-field partner-field-full"><span>나이 *</span><input type="number" name="age_group" id="partnerAgeInput" min="18" max="99" inputmode="numeric" placeholder="예: 35" required /></label>\
  <label class="partner-field partner-field-full"><span>문의사항 *</span><textarea name="partner_message" id="partnerMessageInput" rows="5" placeholder="궁금한 내용을 남겨주세요" required></textarea></label>\
  <label class="partner-consent partner-field-full"><input type="checkbox" id="partnerPrivacyInput" required /><span>개인정보 수집 및 이용에 동의합니다. <a href="/privacy/" target="_blank" rel="noopener">보기</a></span></label>';
 const ensureHidden=(name,value)=>{
  let input=form.querySelector('input[name="'+name+'"]');
  if(!input){input=document.createElement('input');input.type='hidden';input.name=name;form.appendChild(input)}
  input.value=value;
 };
 ensureHidden('partner_interest','파트너 상담 문의');
 ensureHidden('travel_ready_status','미입력');
}

function initMotionVariants(){
 const sections=[...document.querySelectorAll('main>section')];
 const cycle=['anim-slide-left','anim-slide-right','anim-clip','anim-pop','anim-fade','anim-rise'];
 let decisionIndex=0;
 sections.forEach((section,index)=>{
  section.style.setProperty('--motion-index',String(index));
  if(section.classList.contains('hero-section')){
   section.classList.add('anim-hero');
  }else if(section.classList.contains('benefit-full')){
   section.classList.add(index%2===0?'anim-slide-left':'anim-slide-right');
  }else if(section.classList.contains('stat-section')){
   section.classList.add('anim-number','anim-pop');
  }else if(section.classList.contains('gallery-section')){
   section.classList.add('anim-gallery','anim-rise');
  }else if(section.classList.contains('decision-section')){
   const decisionVariants=['anim-scale','anim-turn','anim-sweep'];
   section.classList.add(decisionVariants[decisionIndex%decisionVariants.length]);
   decisionIndex+=1;
  }else if(section.classList.contains('impact-full')){
   section.classList.add('anim-photo-zoom','anim-fade');
  }else{
   section.classList.add(cycle[index%cycle.length]);
  }
 });
 document.querySelectorAll('.flow-card').forEach((card,index)=>{card.style.transitionDelay=(index*.13)+'s'});
 document.querySelectorAll('.gallery-item').forEach((card,index)=>{card.style.transitionDelay=(index*.09)+'s'});
}

function initSectionActivation(){
 const sections=[...document.querySelectorAll('main>section')];
 if(!('IntersectionObserver'in window)){
  sections.forEach(section=>section.classList.add('section-active'));
  return;
 }
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('section-active');
   observer.unobserve(entry.target);
  });
 },{threshold:.18,rootMargin:'0px 0px -8% 0px'});
 sections.forEach(section=>observer.observe(section));
 const hero=document.querySelector('.hero-section');
 if(hero)requestAnimationFrame(()=>hero.classList.add('section-active'));
}

function initTracking(){
 const params=new URLSearchParams(location.search);
 setValue('partnerAgentInput',String(params.get('agent')||'').trim()||'admin');
 setValue('partnerUtmSourceInput',params.get('utm_source')||'');
 setValue('partnerUtmMediumInput',params.get('utm_medium')||'');
 setValue('partnerUtmCampaignInput',params.get('utm_campaign')||'');
 setValue('partnerPageUrlInput',location.href);
 setValue('partnerReferrerInput',document.referrer||'');
}

function initMenu(){
 if(!menuButton||!nav)return;
 menuButton.addEventListener('click',()=>{
  const open=nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('is-menu-open',open);
 });
 nav.addEventListener('click',event=>{
  if(!event.target.closest('a'))return;
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded','false');
  document.body.classList.remove('is-menu-open');
 });
}

function initReveal(){
 const groups=[...document.querySelectorAll('.reveal-group')];
 const cards=[...document.querySelectorAll('.reveal-card,.reveal-media')];
 if(!('IntersectionObserver'in window)){
  groups.forEach(el=>el.classList.add('is-visible'));
  cards.forEach(el=>el.classList.add('is-visible'));
  root.classList.add('reveal-fallback');
  return;
 }
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('is-visible');
   observer.unobserve(entry.target);
  });
 },{threshold:.12,rootMargin:'0px 0px -42px 0px'});
 groups.forEach(el=>observer.observe(el));
 cards.forEach(el=>observer.observe(el));
}

function formatCount(value,decimals){return Number(value).toLocaleString('ko-KR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}
function animateCounter(el){
 if(el.dataset.counted==='1')return;
 el.dataset.counted='1';
 const target=Number(el.dataset.count);
 const decimals=Number(el.dataset.decimals||0);
 const suffix=el.dataset.suffix||'';
 const duration=1650;
 const start=performance.now();
 function tick(now){
  const progress=Math.min(1,(now-start)/duration);
  const eased=1-Math.pow(1-progress,4);
  el.textContent=formatCount(target*eased,decimals)+suffix;
  if(progress<1)requestAnimationFrame(tick);else el.textContent=formatCount(target,decimals)+suffix;
 }
 requestAnimationFrame(tick);
}

function initCounters(){
 const counters=document.querySelectorAll('.count-number');
 const line=document.querySelector('.growth-line');
 if(!('IntersectionObserver'in window)){
  counters.forEach(animateCounter);
  if(line)line.classList.add('is-animated');
  return;
 }
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   animateCounter(entry.target);
   observer.unobserve(entry.target);
  });
 },{threshold:.42});
 counters.forEach(el=>observer.observe(el));
 if(line){
  const lineObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    line.classList.add('is-animated');
    lineObserver.disconnect();
   });
  },{threshold:.42});
  lineObserver.observe(line);
 }
}

function initFloatingCta(){
 if(!floatingCta||!formSection||!('IntersectionObserver'in window))return;
 const observer=new IntersectionObserver(entries=>{
  floatingCta.classList.toggle('is-hidden',Boolean(entries[0]&&entries[0].isIntersecting));
 },{threshold:.08,rootMargin:'-10% 0px -10% 0px'});
 observer.observe(formSection);
}

function initPartnerForm(){
 const form=document.getElementById('partnerInquiryForm');
 if(!form)return;
 form.addEventListener('submit',event=>{
  const name=document.getElementById('partnerNameInput');
  const phone=document.getElementById('partnerPhoneInput');
  const region=document.getElementById('partnerRegionInput');
  const age=document.getElementById('partnerAgeInput');
  const message=document.getElementById('partnerMessageInput');
  const privacy=document.getElementById('partnerPrivacyInput');
  const required=[
   [name,'이름을 입력해주세요.'],
   [phone,'연락처를 입력해주세요.'],
   [region,'지역을 입력해주세요.'],
   [age,'나이를 입력해주세요.'],
   [message,'문의사항을 입력해주세요.']
  ];
  for(const [field,errorMessage] of required){
   if(!field||!String(field.value||'').trim()){
    event.preventDefault();
    event.stopImmediatePropagation();
    setFormResult(errorMessage,'error');
    if(field)field.focus();
    return;
   }
  }
  const digits=String(phone.value||'').replace(/\D/g,'');
  if(digits.length<9){
   event.preventDefault();
   event.stopImmediatePropagation();
   setFormResult('연락처를 정확히 입력해주세요.','error');
   phone.focus();
   return;
  }
  phone.value=digits;
  if(!privacy||!privacy.checked){
   event.preventDefault();
   event.stopImmediatePropagation();
   setFormResult('개인정보 수집 및 이용에 동의해주세요.','error');
   if(privacy)privacy.focus();
   return;
  }
  setValue('partnerMessageHidden',String(message.value||'').trim());
  setFormResult('','');
 },true);
}

function init(){
 try{
  initApprovedCopy();
  initSimpleForm();
  initMotionVariants();
  initSectionActivation();
  initEmbeddedImages();
  initTracking();
  initMenu();
  initReveal();
  initCounters();
  initFloatingCta();
  initPartnerForm();
 }catch(error){
  console.error('파트너 페이지 초기화 오류',error);
  root.classList.add('reveal-fallback');
 }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
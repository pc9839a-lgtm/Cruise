(function(){
'use strict';

const root=document.documentElement;
const menuButton=document.getElementById('partnerMenuButton');
const nav=document.getElementById('partnerNav');
const floatingCta=document.getElementById('partnerFloatingCta');
const formSection=document.getElementById('partner-form');
const VERSION='20260714-original-mobile-final';

const PHOTOS=[
 '/img/1781185493801.jpg',
 '/img/1781512533557.jpg',
 '/img/1781512569745.jpg',
 '/img/20260609_161116.jpg',
 '/img/20260610_093255.jpg',
 '/img/20260610_111329.jpg',
 '/img/20260610_155050.jpg',
 '/img/20260610_191821.jpg'
];
const SLOT_MAP=[0,1,2,3,4,5,6,7,4,0];

function setValue(id,value){const input=document.getElementById(id);if(input)input.value=value||''}
function setFormResult(message,type){const result=document.getElementById('partnerFormResult');if(!result)return;result.textContent=message||'';result.className='form-result'+(type?' is-'+type:'')}

function loadMotionStyle(){
 if(document.querySelector('link[data-partner-motion-final]'))return;
 const link=document.createElement('link');
 link.rel='stylesheet';
 link.href='/partner/partner-motion-v2.css?v=20260714-original-mobile-final';
 link.setAttribute('data-partner-motion-final','true');
 document.head.appendChild(link);
}

function ensurePhotoStyle(){
 let style=document.getElementById('partner-original-photo-final-style');
 if(style)return;
 style=document.createElement('style');
 style.id='partner-original-photo-final-style';
 style.textContent=`
 .real-photo-frame{position:relative!important;display:block!important;width:100%!important;overflow:hidden!important;background:#dfe7f2!important;background-image:none!important;opacity:1!important;visibility:visible!important;border-radius:28px;box-shadow:0 24px 70px rgba(7,17,31,.14);isolation:isolate}
 .real-photo-frame>.partner-original-photo{position:absolute!important;inset:0!important;z-index:5!important;display:block!important;width:100%!important;height:100%!important;max-width:none!important;object-fit:cover!important;object-position:center!important;opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important}
 .wide-visual.real-photo-frame{width:min(980px,100%)!important;height:auto!important;aspect-ratio:16/9!important;margin:46px auto 0!important}
 .impact-full>.real-photo-frame.photo-impact{position:absolute!important;inset:0!important;z-index:0!important;width:100%!important;height:100%!important;border-radius:0!important;box-shadow:none!important}
 .flow-card>.real-photo-frame{height:230px!important;min-height:230px!important;border-radius:22px 22px 0 0!important;box-shadow:none!important}
 .gallery-item>.real-photo-frame{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:100%!important;border-radius:26px!important;box-shadow:none!important}
 .form-photo-panel.real-photo-frame{width:min(760px,100%)!important;aspect-ratio:16/8!important;margin:0 auto 34px!important;border-radius:26px!important}
 .benefit-visual{position:relative!important;overflow:hidden!important;background:#050a12!important;background-image:none!important;opacity:1!important;visibility:visible!important}
 .benefit-visual>.partner-benefit-direct{position:absolute!important;top:0!important;z-index:5!important;display:block!important;width:200%!important;height:100%!important;max-width:none!important;object-fit:fill!important;opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important}
 #benefit-credit .partner-benefit-direct{left:0!important}
 #benefit-income .partner-benefit-direct{left:-100%!important}
 @media(max-width:700px){
  .real-photo-frame{border-radius:20px!important;opacity:1!important;visibility:visible!important}
  .real-photo-frame>.partner-original-photo{display:block!important;opacity:1!important;visibility:visible!important}
  .wide-visual.real-photo-frame{width:100%!important;aspect-ratio:4/3!important;margin-top:30px!important;min-height:260px!important}
  .flow-card>.real-photo-frame{height:210px!important;min-height:210px!important;border-radius:18px 18px 0 0!important}
  .gallery-item>.real-photo-frame{height:100%!important;min-height:280px!important;border-radius:18px!important}
  .form-photo-panel.real-photo-frame{aspect-ratio:4/3!important;min-height:250px!important;margin-bottom:24px!important}
  .benefit-visual{min-height:0!important;aspect-ratio:9/16!important}
  .benefit-visual>.partner-benefit-direct{display:block!important;opacity:1!important;visibility:visible!important}
 }
 `;
 document.head.appendChild(style);
}

function getPhotoIndex(frame,index){
 const match=String(frame.className||'').match(/photo-(\d+)/);
 if(!match)return index%PHOTOS.length;
 const slot=Math.max(0,Math.min(9,Number(match[1])));
 return SLOT_MAP[slot]??(index%PHOTOS.length);
}

function renderPhoto(frame,index){
 const source=PHOTOS[getPhotoIndex(frame,index)];
 const image=document.createElement('img');
 image.className='partner-original-photo';
 image.src=source+'?v='+VERSION;
 image.alt=frame.getAttribute('aria-label')||'크루즈 여행 실제 사진';
 image.loading=index<4?'eager':'lazy';
 image.decoding='async';
 image.addEventListener('error',function(){image.src='/img/partner/hero.webp?v='+VERSION},{once:true});
 frame.replaceChildren(image);
 frame.classList.remove('actual-photo','has-real-image','image-force-visible');
 frame.classList.add('real-photo-frame','is-visible');
 frame.style.setProperty('opacity','1','important');
 frame.style.setProperty('visibility','visible','important');
 frame.style.removeProperty('background-image');
 frame.dataset.originalPhotoReady='1';
}

function renderPhotos(){
 ensurePhotoStyle();
 document.querySelectorAll('.actual-photo').forEach(renderPhoto);
 const hero=document.querySelector('.hero-bg');
 if(hero){
  hero.src='/img/partner/hero.webp?v='+VERSION;
  hero.style.setProperty('opacity','1','important');
  hero.style.setProperty('visibility','visible','important');
 }
}

function renderBenefits(){
 document.querySelectorAll('.benefit-visual').forEach(function(frame,index){
  if(frame.querySelector('.partner-benefit-direct'))return;
  const image=document.createElement('img');
  image.className='partner-benefit-direct';
  image.src='/img/partner/benefits.webp?v='+VERSION;
  image.alt=frame.getAttribute('aria-label')||'크루즈 파트너 혜택 이미지';
  image.loading=index===0?'eager':'lazy';
  image.decoding='async';
  frame.replaceChildren(image);
  frame.classList.add('is-visible');
  frame.style.setProperty('opacity','1','important');
  frame.style.setProperty('visibility','visible','important');
 });
}

function ensureFormPhoto(){
 const layout=document.querySelector('#partner-form .form-layout');
 if(!layout||layout.querySelector('.form-photo-panel'))return;
 const panel=document.createElement('div');
 panel.className='form-photo-panel real-photo-frame reveal-media is-visible';
 const image=document.createElement('img');
 image.className='partner-original-photo';
 image.src=PHOTOS[6]+'?v='+VERSION;
 image.alt='크루즈 여행 실제 단체사진';
 image.loading='lazy';
 image.decoding='async';
 panel.appendChild(image);
 const shell=layout.querySelector('.partner-form-shell');
 if(shell)layout.insertBefore(panel,shell);else layout.appendChild(panel);
}

function initApprovedCopy(){
 const labels=[...document.querySelectorAll('.section-label')];
 const findSection=token=>{const label=labels.find(el=>String(el.textContent||'').includes(token));return label?label.closest('section'):null};
 const freeSection=findSection('11 · FREE CRUISE');
 if(freeSection){const heading=freeSection.querySelector('h2');if(heading)heading.innerHTML='하지만 실제로,<br /><span class="accent-text">무료로 크루즈 여행을 하면서<br />달러 수익을 버는 사람들이 있습니다.</span>'}
 const togetherSection=findSection('15 · TOGETHER');
 if(togetherSection){const heading=togetherSection.querySelector('h2');if(heading)heading.innerHTML='<span class="accent-text">여행을 좋아한다면<br />누구나 시작할 수 있습니다.</span>';const support=togetherSection.querySelector('.support-grid');if(support)support.remove()}
 const galleryHeading=document.querySelector('#proof h2');
 if(galleryHeading)galleryHeading.innerHTML='사진으로만 보던 크루즈가<br /><span class="accent-text">내 일이 됩니다.</span>';
 const finalSection=findSection('19 · YOUR NEXT CRUISE');
 if(finalSection){const heading=finalSection.querySelector('h2');if(heading)heading.innerHTML='다음 크루즈는.<br /><span class="accent-text">내 돈으로만 가지 마세요.</span>'}
}

function initMotionVariants(){
 const sections=[...document.querySelectorAll('main>section')];
 const cycle=['anim-slide-left','anim-slide-right','anim-clip','anim-pop','anim-fade','anim-rise'];
 let decisionIndex=0;
 sections.forEach((section,index)=>{
  if(section.classList.contains('hero-section'))section.classList.add('anim-hero');
  else if(section.classList.contains('benefit-full'))section.classList.add(index%2===0?'anim-slide-left':'anim-slide-right');
  else if(section.classList.contains('stat-section'))section.classList.add('anim-number','anim-pop');
  else if(section.classList.contains('gallery-section'))section.classList.add('anim-gallery','anim-rise');
  else if(section.classList.contains('decision-section')){const variants=['anim-scale','anim-turn','anim-sweep'];section.classList.add(variants[decisionIndex%variants.length]);decisionIndex+=1}
  else if(section.classList.contains('impact-full'))section.classList.add('anim-photo-zoom','anim-fade');
  else section.classList.add(cycle[index%cycle.length]);
 });
}

function initReveal(){
 const targets=[...document.querySelectorAll('.reveal-group,.reveal-card,.reveal-media')];
 if(!('IntersectionObserver'in window)){targets.forEach(el=>el.classList.add('is-visible'));return}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');observer.unobserve(entry.target)}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
 targets.forEach(el=>observer.observe(el));
}

function formatCount(value,decimals){return Number(value).toLocaleString('ko-KR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}
function animateCounter(el){if(el.dataset.counted==='1')return;el.dataset.counted='1';const target=Number(el.dataset.count);const decimals=Number(el.dataset.decimals||0);const suffix=el.dataset.suffix||'';const start=performance.now();function tick(now){const progress=Math.min(1,(now-start)/1650);const eased=1-Math.pow(1-progress,4);el.textContent=formatCount(target*eased,decimals)+suffix;if(progress<1)requestAnimationFrame(tick);else el.textContent=formatCount(target,decimals)+suffix}requestAnimationFrame(tick)}
function initCounters(){const counters=document.querySelectorAll('.count-number');if(!('IntersectionObserver'in window)){counters.forEach(animateCounter);return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;animateCounter(entry.target);observer.unobserve(entry.target)}),{threshold:.35});counters.forEach(el=>observer.observe(el));const line=document.querySelector('.growth-line');if(line){const lineObserver=new IntersectionObserver(entries=>{if(entries[0]&&entries[0].isIntersecting){line.classList.add('is-animated');lineObserver.disconnect()}},{threshold:.35});lineObserver.observe(line)}}

function initTracking(){const params=new URLSearchParams(location.search);setValue('partnerAgentInput',String(params.get('agent')||'').trim()||'admin');setValue('partnerUtmSourceInput',params.get('utm_source')||'');setValue('partnerUtmMediumInput',params.get('utm_medium')||'');setValue('partnerUtmCampaignInput',params.get('utm_campaign')||'');setValue('partnerPageUrlInput',location.href);setValue('partnerReferrerInput',document.referrer||'')}
function initMenu(){if(!menuButton||!nav)return;menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('is-menu-open',open)});nav.addEventListener('click',event=>{if(!event.target.closest('a'))return;nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('is-menu-open')})}
function initFloatingCta(){if(!floatingCta||!formSection||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver(entries=>{floatingCta.classList.toggle('is-hidden',Boolean(entries[0]&&entries[0].isIntersecting))},{threshold:.08});observer.observe(formSection)}

function initPartnerForm(){
 const form=document.getElementById('partnerInquiryForm');if(!form)return;
 form.addEventListener('submit',event=>{
  const fields=[[document.getElementById('partnerNameInput'),'이름을 입력해주세요.'],[document.getElementById('partnerPhoneInput'),'연락처를 입력해주세요.'],[document.getElementById('partnerRegionInput'),'지역을 입력해주세요.'],[document.getElementById('partnerAgeInput'),'나이를 입력해주세요.'],[document.getElementById('partnerMessageInput'),'문의사항을 입력해주세요.']];
  for(const [field,message] of fields){if(!field||!String(field.value||'').trim()){event.preventDefault();event.stopImmediatePropagation();setFormResult(message,'error');if(field)field.focus();return}}
  const phone=document.getElementById('partnerPhoneInput');const digits=String(phone.value||'').replace(/\D/g,'');if(digits.length<9){event.preventDefault();event.stopImmediatePropagation();setFormResult('연락처를 정확히 입력해주세요.','error');phone.focus();return}phone.value=digits;
  const privacy=document.getElementById('partnerPrivacyInput');if(!privacy||!privacy.checked){event.preventDefault();event.stopImmediatePropagation();setFormResult('개인정보 수집 및 이용에 동의해주세요.','error');if(privacy)privacy.focus();return}
  setValue('partnerMessageHidden',String(document.getElementById('partnerMessageInput').value||'').trim());setFormResult('','');
 },true);
}

function forceImagesAgain(){renderPhotos();renderBenefits();ensureFormPhoto()}
function init(){
 try{
  root.classList.add('js-enabled');
  loadMotionStyle();
  ensurePhotoStyle();
  initApprovedCopy();
  renderPhotos();
  renderBenefits();
  ensureFormPhoto();
  initMotionVariants();
  initTracking();
  initMenu();
  initReveal();
  initCounters();
  initFloatingCta();
  initPartnerForm();
  setTimeout(forceImagesAgain,350);
  setTimeout(forceImagesAgain,1200);
 }catch(error){console.error('파트너 페이지 초기화 오류',error);root.classList.add('reveal-fallback');document.querySelectorAll('.reveal-group,.reveal-card,.reveal-media').forEach(el=>el.classList.add('is-visible'))}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

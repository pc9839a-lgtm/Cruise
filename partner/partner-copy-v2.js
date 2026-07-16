(function(){
'use strict';

function loadContentStyle(){
 if(document.querySelector('link[data-partner-content-v4]'))return;
 const link=document.createElement('link');
 link.rel='stylesheet';
 link.href='/partner/partner-content-v4.css?v=20260716-credit-unused-photo';
 link.setAttribute('data-partner-content-v4','true');
 document.head.appendChild(link);
}

function findSection(labelText){
 const label=[...document.querySelectorAll('.section-label')]
  .find((item)=>String(item.textContent||'').trim()===labelText);
 return label?label.closest('section'):null;
}

function renderCreditShipImage(){
 const visual=document.querySelector('#benefit-credit .benefit-visual');
 if(!visual)return;
 const current=visual.querySelector('.credit-ship-photo img');
 if(current&&String(current.getAttribute('src')||'').includes('객실및내부시설6.png'))return;
 visual.classList.add('credit-ship-visual');
 visual.replaceChildren();
 const frame=document.createElement('div');
 frame.className='credit-ship-photo';
 frame.setAttribute('role','img');
 frame.setAttribute('aria-label','크루즈 선내 수영장 실제 사진');
 const image=document.createElement('img');
 image.className='partner-direct-photo';
 image.src='/img/객실및내부시설6.png?v=20260716-credit-unused-photo';
 image.alt='크루즈 선내 수영장 실제 사진';
 image.loading='eager';
 image.decoding='async';
 frame.appendChild(image);
 visual.appendChild(frame);
}

function renderDollarExperienceImage(){
 const visual=document.querySelector('#benefit-income .benefit-visual');
 if(!visual)return;
 const current=visual.querySelector('.dollar-experience-photo img');
 if(current&&String(current.getAttribute('src')||'').includes('음식및엔터24.png'))return;

 visual.classList.add('dollar-experience-visual');
 visual.replaceChildren();
 Object.assign(visual.style,{
  position:'relative',
  overflow:'hidden',
  background:'#07111f'
 });

 const frame=document.createElement('div');
 frame.className='dollar-experience-photo';
 frame.setAttribute('role','img');
 frame.setAttribute('aria-label','크루즈 선내 엔터테인먼트 실제 사진');
 Object.assign(frame.style,{
  position:'absolute',
  inset:'0',
  width:'100%',
  height:'100%'
 });

 const image=document.createElement('img');
 image.className='partner-direct-photo';
 image.src='/img/음식및엔터24.png?v=20260716-dollar-unused-photo';
 image.alt='크루즈 선내 엔터테인먼트 실제 사진';
 image.loading='eager';
 image.decoding='async';
 Object.assign(image.style,{
  display:'block',
  width:'100%',
  height:'100%',
  objectFit:'cover',
  objectPosition:'center',
  filter:'brightness(.76) saturate(1.05) contrast(1.04)'
 });

 const overlay=document.createElement('span');
 overlay.className='dollar-experience-overlay';
 overlay.setAttribute('aria-hidden','true');
 Object.assign(overlay.style,{
  position:'absolute',
  inset:'0',
  zIndex:'2',
  background:'linear-gradient(90deg,rgba(18,31,84,.58) 0%,rgba(5,16,43,.18) 52%,rgba(3,12,30,.08) 100%)',
  pointerEvents:'none'
 });

 frame.appendChild(image);
 visual.appendChild(frame);
 visual.appendChild(overlay);
}

function renderBenefitEmphasis(){
 const credit=document.getElementById('benefit-credit');
 if(credit){
  const title=credit.querySelector('.benefit-message h2');
  const description=credit.querySelector('.benefit-message strong');
  if(title){
   title.classList.add('benefit-emphasis-title');
   title.innerHTML='<span class="benefit-emphasis-kicker">매월 들어오는 무료</span><span class="benefit-emphasis-word accent-text">크레딧</span>';
  }
  if(description)description.classList.add('benefit-emphasis-desc');
 }

 const income=document.getElementById('benefit-income');
 if(income){
  const title=income.querySelector('.benefit-message h2');
  const description=income.querySelector('.benefit-message strong');
  if(title){
   title.classList.add('benefit-emphasis-title');
   title.innerHTML='<span class="benefit-emphasis-kicker">매월 들어오는</span><span class="benefit-emphasis-word accent-text">달러</span><span class="benefit-emphasis-tail">수익</span>';
  }
  if(description)description.classList.add('benefit-emphasis-desc');
 }
}

function renderWhatWeDoCards(){
 const section=findSection('WHAT WE DO');
 const content=section&&section.querySelector('.impact-content');
 const title=content&&content.querySelector('h2');
 if(!section||!content||!title)return;

 section.classList.add('what-we-do-section');
 title.innerHTML='한두 번 소개하고<br /><span class="accent-text">끝나는 일이 아닙니다</span>';

 content.querySelectorAll('[data-what-we-do-points],.what-we-do-lead,.what-we-do-cards').forEach((element)=>element.remove());

 const lead=document.createElement('p');
 lead.className='reveal-item what-we-do-lead';
 lead.textContent='저렴하게 크루즈 여행가는 방법을 꾸준히 소개합니다';
 title.insertAdjacentElement('afterend',lead);

 const cards=document.createElement('div');
 cards.className='what-we-do-cards reveal-item';
 cards.innerHTML='\
  <article class="what-we-do-card" data-ghost="01">\
   <b>01</b><h3>실제 여행후기</h3><p>직접 다녀온 크루즈 경험을<br />사진과 후기 중심으로 공유합니다</p>\
  </article>\
  <article class="what-we-do-card" data-ghost="02">\
   <b>02</b><h3>크루즈 비용 비교</h3><p>일반 예약과 멤버십 이용 시<br />비용 차이를 쉽게 보여줍니다</p>\
  </article>\
  <article class="what-we-do-card" data-ghost="03">\
   <b>03</b><h3>멤버십 이용방법</h3><p>가입부터 포인트 사용과 예약까지<br />처음 보는 사람도 쉽게 안내합니다</p>\
  </article>';
 lead.insertAdjacentElement('afterend',cards);
}

function removePersonalPage(){
 const section=findSection('PERSONAL PAGE');
 if(section)section.remove();
}

function updateGalleryHeading(){
 const galleryHeading=document.querySelector('#proof h2');
 if(galleryHeading){
  galleryHeading.innerHTML='크루즈를 즐기는 사람에서<br /><span class="accent-text">크루즈를 알리는 사람이 됩니다</span>';
 }
}

function removeDecorativePeriods(){
 const selector=[
  '.hero-center h1',
  '.hero-center p',
  '.hero-note',
  '.benefit-message h2',
  '.benefit-message strong',
  '.impact-content h2',
  '.impact-content > p',
  '.decision-inner h2',
  '.decision-inner > p',
  '.gallery-heading h2',
  '.form-copy h2',
  '.form-copy p',
  '.flow-card h3',
  '.flow-card p',
  '.what-we-do-card h3',
  '.what-we-do-card p',
  '.quote-stack span'
 ].join(',');

 document.querySelectorAll(selector).forEach((element)=>{
  const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
  const textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  textNodes.forEach((node)=>{
   node.nodeValue=String(node.nodeValue||'').replace(/\.(\s*)$/,'$1');
  });
 });
}

function renderBenefitImages(){
 renderCreditShipImage();
 renderDollarExperienceImage();
}

function applyPartnerCopy(){
 loadContentStyle();
 renderBenefitEmphasis();
 renderBenefitImages();
 renderWhatWeDoCards();
 removePersonalPage();
 updateGalleryHeading();
 removeDecorativePeriods();
 window.setTimeout(renderBenefitImages,0);
 window.setTimeout(renderBenefitImages,250);
 window.setTimeout(renderBenefitImages,800);
}

loadContentStyle();
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',applyPartnerCopy,{once:true});
}else{
 applyPartnerCopy();
}
})();
(function(){
'use strict';

function loadContentStyle(){
 if(document.querySelector('link[data-partner-content-v4]'))return;
 const link=document.createElement('link');
 link.rel='stylesheet';
 link.href='/partner/partner-content-v4.css?v=20260716-ppt-cards';
 link.setAttribute('data-partner-content-v4','true');
 document.head.appendChild(link);
}

function findSection(labelText){
 const label=[...document.querySelectorAll('.section-label')]
  .find((item)=>String(item.textContent||'').trim()===labelText);
 return label?label.closest('section'):null;
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
 title.innerHTML='한두 번 소개하고<br /><span class="accent-text">끝나는 일이 아닙니다.</span>';

 content.querySelectorAll('[data-what-we-do-points],.what-we-do-lead,.what-we-do-cards').forEach((element)=>element.remove());

 const lead=document.createElement('p');
 lead.className='reveal-item what-we-do-lead';
 lead.textContent='저렴하게 크루즈 여행가는 방법을 꾸준히 소개합니다.';
 title.insertAdjacentElement('afterend',lead);

 const cards=document.createElement('div');
 cards.className='what-we-do-cards reveal-item';
 cards.innerHTML='\
  <article class="what-we-do-card" data-ghost="01">\
   <b>01</b><h3>실제 여행후기</h3><p>직접 다녀온 크루즈 경험을<br />사진과 후기 중심으로 공유합니다.</p>\
  </article>\
  <article class="what-we-do-card" data-ghost="02">\
   <b>02</b><h3>크루즈 비용 비교</h3><p>일반 예약과 멤버십 이용 시<br />비용 차이를 쉽게 보여줍니다.</p>\
  </article>\
  <article class="what-we-do-card" data-ghost="03">\
   <b>03</b><h3>멤버십 이용방법</h3><p>가입부터 포인트 사용과 예약까지<br />처음 보는 사람도 쉽게 안내합니다.</p>\
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
  galleryHeading.innerHTML='크루즈를 즐기는 사람에서.<br /><span class="accent-text">크루즈를 알리는 사람이 됩니다.</span>';
 }
}

function applyPartnerCopy(){
 loadContentStyle();
 renderBenefitEmphasis();
 renderWhatWeDoCards();
 removePersonalPage();
 updateGalleryHeading();
}

loadContentStyle();
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',applyPartnerCopy,{once:true});
}else{
 applyPartnerCopy();
}
})();

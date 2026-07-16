(function(){
'use strict';

function findSection(labelText){
 const label=[...document.querySelectorAll('.section-label')]
  .find((item)=>String(item.textContent||'').trim()===labelText);
 return label?label.closest('section'):null;
}

function addWhatWeDoEmphasis(){
 const section=findSection('WHAT WE DO');
 const content=section&&section.querySelector('.impact-content');
 if(!content||content.querySelector('[data-what-we-do-points]'))return;

 const points=document.createElement('div');
 points.className='support-grid reveal-item';
 points.setAttribute('data-what-we-do-points','');
 points.innerHTML='<span>실제 여행후기</span><span>크루즈 비용 비교</span><span>멤버십 이용방법</span>';
 content.appendChild(points);
}

function removePersonalPage(){
 const section=findSection('PERSONAL PAGE');
 if(section)section.remove();
}

function applyPartnerCopy(){
 const galleryHeading=document.querySelector('#proof h2');
 if(galleryHeading){
  galleryHeading.innerHTML='크루즈를 즐기는 사람에서.<br /><span class="accent-text">크루즈를 알리는 사람이 됩니다.</span>';
 }
 addWhatWeDoEmphasis();
 removePersonalPage();
}

if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',applyPartnerCopy,{once:true});
}else{
 applyPartnerCopy();
}
})();

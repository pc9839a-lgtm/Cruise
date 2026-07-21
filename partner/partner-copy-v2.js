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

function renderEligibilitySection(){
 const section=document.getElementById('partner-check');
 const content=section&&section.querySelector('.impact-content');
 if(!section||!content)return;

 if(!document.getElementById('partnerEligibilityStyle')){
  const style=document.createElement('style');
  style.id='partnerEligibilityStyle';
  style.textContent='\
#partner-check{min-height:auto;padding:112px 0;background:linear-gradient(135deg,#f6f9ff 0%,#eef3ff 52%,#f8f4ff 100%)}\
#partner-check .impact-content{max-width:980px}\
.partner-eligibility-lead{margin-top:20px!important;color:#4f6178!important;font-size:clamp(18px,2vw,23px)!important;font-weight:800!important}\
.partner-eligibility-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;width:100%;max-width:860px;margin-top:42px}\
.partner-eligibility-card{position:relative;display:flex;align-items:center;gap:18px;min-height:150px;padding:28px;border:1px solid rgba(47,115,255,.14);border-radius:24px;background:#fff;text-align:left;box-shadow:0 20px 58px rgba(24,67,145,.10)}\
.partner-eligibility-number{display:grid;place-items:center;width:58px;height:58px;flex:0 0 58px;border-radius:18px;background:linear-gradient(135deg,#2f73ff,#705cff);color:#fff;font-size:18px;font-weight:950;box-shadow:0 12px 28px rgba(47,115,255,.24)}\
.partner-eligibility-card strong{display:block;color:#0b1524;font-size:clamp(22px,2.2vw,30px);font-weight:950;letter-spacing:-.045em;line-height:1.2}\
.partner-eligibility-card p{margin:8px 0 0!important;color:#64748b!important;font-size:15px!important;font-weight:750!important;line-height:1.5!important}\
.partner-eligibility-answer{display:flex;align-items:center;justify-content:center;width:100%;max-width:860px;min-height:92px;margin-top:18px;padding:22px 28px;border-radius:24px;background:linear-gradient(135deg,#245fe8 0%,#654fe9 100%);color:#fff;font-size:clamp(24px,3vw,38px);font-weight:950;letter-spacing:-.055em;box-shadow:0 20px 48px rgba(59,72,200,.24)}\
@media(max-width:700px){#partner-check{padding:84px 0}.partner-eligibility-grid{grid-template-columns:1fr;gap:12px;margin-top:30px}.partner-eligibility-card{min-height:118px;padding:20px;border-radius:20px;gap:15px}.partner-eligibility-number{width:50px;height:50px;flex-basis:50px;border-radius:15px}.partner-eligibility-card strong{font-size:23px}.partner-eligibility-card p{font-size:14px!important}.partner-eligibility-answer{min-height:78px;margin-top:12px;padding:18px 20px;border-radius:20px;font-size:27px}}';
  document.head.appendChild(style);
 }

 section.classList.add('partner-eligibility-section');
 const label=content.querySelector('.section-label');
 const title=content.querySelector('h2');
 if(label)label.textContent='가입 조건';
 if(title)title.innerHTML='가입 조건은<br /><span class="accent-text">아주 간단합니다</span>';
 content.querySelectorAll('.partner-eligibility-lead,.partner-eligibility-grid,.partner-eligibility-answer').forEach((element)=>element.remove());

 const lead=document.createElement('p');
 lead.className='partner-eligibility-lead reveal-item';
 lead.textContent='아래 두 가지 조건만 충족하면 됩니다';

 const grid=document.createElement('div');
 grid.className='partner-eligibility-grid reveal-item';
 grid.innerHTML='\
  <article class="partner-eligibility-card">\
   <span class="partner-eligibility-number">01</span>\
   <div><strong>19세 이상 성인</strong><p>성인이면 누구나 신청할 수 있습니다</p></div>\
  </article>\
  <article class="partner-eligibility-card">\
   <span class="partner-eligibility-number">02</span>\
   <div><strong>해외여행에 결격사유가 없는 분</strong><p>해외 출국이 가능한 분이면 됩니다</p></div>\
  </article>';

 const answer=document.createElement('div');
 answer.className='partner-eligibility-answer reveal-item';
 answer.textContent='즉, 두 조건만 충족하면 누구나 가능합니다!';

 title.insertAdjacentElement('afterend',lead);
 lead.insertAdjacentElement('afterend',grid);
 grid.insertAdjacentElement('afterend',answer);
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

function renderKakaoConsultButton(){
 if(document.getElementById('partnerKakaoConsult'))return;

 if(!document.getElementById('partnerKakaoConsultStyle')){
  const style=document.createElement('style');
  style.id='partnerKakaoConsultStyle';
  style.textContent='\
.partner-kakao-consult{position:fixed;right:24px;bottom:104px;z-index:9999;display:flex;align-items:center;gap:10px;min-height:58px;padding:10px 17px 10px 11px;border:1px solid rgba(25,25,25,.08);border-radius:999px;background:#fee500;color:#191919;text-decoration:none;font-family:inherit;box-shadow:0 14px 34px rgba(7,17,31,.24);transition:transform .2s ease,box-shadow .2s ease}\
.partner-kakao-consult:hover{transform:translateY(-2px);box-shadow:0 18px 42px rgba(7,17,31,.3)}\
.partner-kakao-consult:focus-visible{outline:3px solid #fff;outline-offset:3px}\
.partner-kakao-mark{display:grid;place-items:center;width:38px;height:38px;flex:0 0 38px;border-radius:50%;background:#191919;color:#fee500;font-size:18px;font-weight:950;line-height:1}\
.partner-kakao-copy{display:flex;flex-direction:column;align-items:flex-start;gap:2px;white-space:nowrap;line-height:1.15}\
.partner-kakao-copy strong{font-size:15px;font-weight:950;letter-spacing:-.03em}\
.partner-kakao-copy small{font-size:11px;font-weight:750;opacity:.72}\
@media(max-width:700px){.partner-kakao-consult{right:12px;bottom:calc(82px + env(safe-area-inset-bottom));min-height:54px;padding:9px 14px 9px 9px;gap:9px}.partner-kakao-mark{width:36px;height:36px;flex-basis:36px;font-size:17px}.partner-kakao-copy strong{font-size:14px}.partner-kakao-copy small{font-size:10px}}';
  document.head.appendChild(style);
 }

 const button=document.createElement('a');
 button.id='partnerKakaoConsult';
 button.className='partner-kakao-consult';
 button.href='https://open.kakao.com/o/sr5Qyjph';
 button.target='_blank';
 button.rel='noopener noreferrer';
 button.setAttribute('aria-label','카카오톡 실시간 상담 열기');
 button.innerHTML='<span class="partner-kakao-mark" aria-hidden="true">K</span><span class="partner-kakao-copy"><strong>실시간 상담</strong><small>카카오톡으로 바로 문의</small></span>';
 document.body.appendChild(button);
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
 renderEligibilitySection();
 removeDecorativePeriods();
 renderKakaoConsultButton();
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
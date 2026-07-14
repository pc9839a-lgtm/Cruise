(function(){
  'use strict';

  const VERSION='20260714-balanced-v14';
  const GRAPHICS={
    income:'/img/ChatGPT%20Image%202026%EB%85%84%207%EC%9B%94%2014%EC%9D%BC%20%EC%98%A4%ED%9B%84%2004_54_04.png',
    credit:'/img/ChatGPT%20Image%202026%EB%85%84%207%EC%9B%94%2014%EC%9D%BC%20%EC%98%A4%ED%9B%84%2004_54_06.png'
  };

  function makeImage(src,alt,className){
    const image=document.createElement('img');
    image.className=className;
    image.src=src+'?v='+VERSION;
    image.alt=alt;
    image.loading='eager';
    image.decoding='async';
    return image;
  }

  function setupKoreanBenefit(sectionId,panel,alt){
    const section=document.getElementById(sectionId);
    const visual=section&&section.querySelector('.benefit-visual');
    if(!visual)return;

    const image=makeImage('/img/partner/benefits.webp',alt,'korean-benefit-sheet');
    image.dataset.panel=String(panel);
    visual.replaceChildren(image);
    visual.classList.add('korean-benefit-visual','is-visible');
    visual.dataset.balancedBenefitReady='1';
  }

  function findSection(labelText){
    return [...document.querySelectorAll('.section-label')]
      .find(label=>String(label.textContent||'').includes(labelText))
      ?.closest('section')||null;
  }

  function replaceDuplicatePhoto(labelText,src,alt,type){
    const section=findSection(labelText);
    if(!section)return;

    let visual=section.querySelector('.actual-photo,.real-photo-frame,.wide-visual');
    if(!visual){
      visual=document.createElement('div');
      const content=section.querySelector('.impact-content')||section.firstElementChild||section;
      content.appendChild(visual);
    }

    visual.className='graphic-showcase graphic-showcase-'+type+' reveal-media is-visible';
    visual.removeAttribute('role');
    visual.removeAttribute('aria-label');
    visual.replaceChildren(makeImage(src,alt,'partner-graphic-icon partner-graphic-icon-'+type));
    visual.dataset.balancedGraphicReady='1';
  }

  function applyBalancedBenefits(){
    setupKoreanBenefit('benefit-credit',0,'매월 무료 크레딧과 다음 여행비 혜택 안내');
    setupKoreanBenefit('benefit-income',1,'매월 달러 수익과 파트너 혜택 안내');

    // 반복되던 실제 사진 자리를 각각 다른 3D 아이콘으로 교체한다.
    replaceDuplicatePhoto('09 · MONTHLY USD',GRAPHICS.income,'달러 수익을 상징하는 금화와 상승 화살표 3D 아이콘','income');
    replaceDuplicatePhoto('12 · MORE TRAVEL',GRAPHICS.credit,'무료 여행 크레딧을 상징하는 여행가방 3D 아이콘','credit');

    document.documentElement.classList.add('partner-balanced-benefits-ready');
  }

  function init(){
    applyBalancedBenefits();
    window.setTimeout(applyBalancedBenefits,350);
    window.setTimeout(applyBalancedBenefits,1000);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
}());

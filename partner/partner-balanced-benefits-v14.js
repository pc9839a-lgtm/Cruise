(function(){
  'use strict';

  const VERSION='20260714-duplicates-v17';
  const GRAPHICS={
    income:'/img/ChatGPT%20Image%202026%EB%85%84%207%EC%9B%94%2014%EC%9D%BC%20%EC%98%A4%ED%9B%84%2004_54_04.png',
    credit:'/img/ChatGPT%20Image%202026%EB%85%84%207%EC%9B%94%2014%EC%9D%BC%20%EC%98%A4%ED%9B%84%2004_54_06.png'
  };
  const KOREAN_IMAGES={
    internal:'/img/객실및내부시설12-1.png',
    photozone:'/img/객실및내부시설7.png',
    lounge:'/img/객실및내부시설12-2.png',
    atrium:'/img/객실및내부시설9.png',
    performance:'/img/음식및엔터24.png',
    dance:'/img/객실및내부시설18.png',
    bar:'/img/음식및엔터23.png'
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

  function replaceFrameImage(frame,src,alt){
    if(!frame)return;
    const image=frame.querySelector('img');
    if(!image)return;
    image.src=src+'?v='+VERSION;
    image.alt=alt;
    image.loading='lazy';
    image.decoding='async';
    frame.dataset.koreanDuplicateReplacement='1';
  }

  function replaceDuplicateImages(){
    const workSection=findSection('06 · 실제 활동');
    const thirdWorkCard=workSection&&workSection.querySelector('.flow-card:nth-child(3)');
    replaceFrameImage(
      thirdWorkCard&&thirdWorkCard.querySelector('.real-photo-frame,.actual-photo'),
      KOREAN_IMAGES.internal,
      '크루즈 내부 시설'
    );

    const introduceSection=findSection('07 · INTRODUCE');
    replaceFrameImage(
      introduceSection&&introduceSection.querySelector('.real-photo-frame,.actual-photo'),
      KOREAN_IMAGES.photozone,
      '크루즈 객실 내부'
    );

    const gallery=document.querySelector('#proof .gallery-grid');
    if(!gallery)return;

    const replacements=[
      [1,KOREAN_IMAGES.lounge,'크루즈 선내 라운지','선내 라운지'],
      [2,KOREAN_IMAGES.atrium,'크루즈 선내 아트리움','선내 아트리움'],
      [4,KOREAN_IMAGES.performance,'크루즈 선내 공연','선내 공연'],
      [5,KOREAN_IMAGES.dance,'크루즈 선내 댄스 플로어','선내 댄스 플로어'],
      [6,KOREAN_IMAGES.bar,'크루즈 선내 바','선내 바']
    ];

    replacements.forEach(([position,src,alt,caption])=>{
      const item=gallery.querySelector('.gallery-item:nth-child('+position+')');
      if(!item)return;
      replaceFrameImage(item.querySelector('.real-photo-frame,.actual-photo'),src,alt);
      const figcaption=item.querySelector('figcaption');
      if(figcaption)figcaption.textContent=caption;
    });
  }

  function replaceDuplicatePhoto(labelText,src,alt,type){
    const section=findSection(labelText);
    if(!section)return;

    const selector='.graphic-showcase-'+type;
    const existing=[...section.querySelectorAll(selector)];
    existing.slice(1).forEach(element=>element.remove());

    let visual=existing[0]||section.querySelector('.actual-photo,.real-photo-frame,.wide-visual');
    if(!visual)return;

    visual.className='graphic-showcase graphic-showcase-'+type+' reveal-media is-visible';
    visual.removeAttribute('role');
    visual.removeAttribute('aria-label');
    visual.replaceChildren(makeImage(src,alt,'partner-graphic-icon partner-graphic-icon-'+type));
    visual.dataset.balancedGraphicReady='1';
  }

  function applyBalancedBenefits(){
    if(document.documentElement.dataset.partnerBalancedBenefitsV17==='1')return;
    document.documentElement.dataset.partnerBalancedBenefitsV17='1';

    setupKoreanBenefit('benefit-credit',0,'매월 무료 크레딧과 다음 여행비 혜택 안내');
    setupKoreanBenefit('benefit-income',1,'매월 달러 수익과 파트너 혜택 안내');

    replaceDuplicateImages();

    replaceDuplicatePhoto('09 · MONTHLY USD',GRAPHICS.income,'달러 수익을 상징하는 금화와 상승 화살표 3D 아이콘','income');
    replaceDuplicatePhoto('12 · MORE TRAVEL',GRAPHICS.credit,'무료 여행 크레딧을 상징하는 여행가방 3D 아이콘','credit');

    document.documentElement.classList.add('partner-balanced-benefits-ready');
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyBalancedBenefits,{once:true});
  }else{
    applyBalancedBenefits();
  }
}());
(function(){
  'use strict';

  async function loadDataImage(path){
    const response=await fetch(path+'?v=20260713-valid-webp',{cache:'no-store'});
    if(!response.ok)throw new Error('이미지 로딩 실패: '+path);
    const base64=(await response.text()).replace(/\s+/g,'');
    if(!base64)throw new Error('빈 이미지 데이터: '+path);
    return 'data:image/webp;base64,'+base64;
  }

  function renderPhoto(frame,src,index){
    frame.replaceChildren();
    frame.style.removeProperty('background-image');
    frame.style.opacity='1';
    frame.style.visibility='visible';

    const image=document.createElement('img');
    image.className='partner-real-photo';
    image.src=src;
    image.alt=frame.getAttribute('aria-label')||'크루즈 여행 실제 사진';
    image.loading=index<3?'eager':'lazy';
    image.decoding='async';
    frame.appendChild(image);
    frame.classList.add('has-direct-real-photo','is-visible');
  }

  async function initDirectPartnerImages(){
    if(!location.pathname.startsWith('/partner'))return;

    try{
      const [cruiseShip,oceanWake]=await Promise.all([
        loadDataImage('/img/partner/actual/cruise-01.webp.b64'),
        loadDataImage('/img/partner/actual/cruise-02.webp.b64')
      ]);
      const sources=[cruiseShip,oceanWake];

      const hero=document.querySelector('.hero-bg');
      if(hero){
        hero.src=cruiseShip;
        hero.style.opacity='1';
        hero.style.visibility='visible';
      }

      document.querySelectorAll('.actual-photo').forEach((frame,index)=>{
        renderPhoto(frame,sources[index%sources.length],index);
      });

      document.documentElement.classList.add('partner-images-ready');
    }catch(error){
      console.error('파트너 실제 이미지 적용 실패',error);
      document.documentElement.classList.add('reveal-fallback');
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initDirectPartnerImages,{once:true});
  }else{
    initDirectPartnerImages();
  }
})();

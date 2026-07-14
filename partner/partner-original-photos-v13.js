(function(){
  'use strict';

  const VERSION='20260714-originals-v13';
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

  function getSlot(frame,index){
    const match=String(frame.className||'').match(/photo-(\d+)/);
    if(!match)return index%PHOTOS.length;
    const slot=Math.max(0,Math.min(9,Number(match[1])));
    return SLOT_MAP[slot]??(index%PHOTOS.length);
  }

  function renderFrame(frame,index){
    if(frame.dataset.originalPhotoReady==='1')return;
    const source=PHOTOS[getSlot(frame,index)];
    const alt=frame.getAttribute('aria-label')||'크루즈 여행 실제 사진';
    const image=document.createElement('img');
    image.className='partner-original-photo';
    image.src=source+'?v='+VERSION;
    image.alt=alt;
    image.loading=index<3?'eager':'lazy';
    image.decoding='async';
    image.addEventListener('error',function(){
      image.src='/img/partner/hero.webp?v='+VERSION;
    },{once:true});

    frame.replaceChildren(image);
    frame.classList.remove('actual-photo','has-real-image','force-image-ready');
    frame.classList.add('real-photo-frame','is-visible');
    frame.dataset.originalPhotoReady='1';
    frame.style.removeProperty('background-image');
    frame.style.removeProperty('background-position');
    frame.style.opacity='1';
    frame.style.visibility='visible';
  }

  function ensureFormPhoto(){
    const layout=document.querySelector('#partner-form .form-layout');
    if(!layout)return;
    let panel=layout.querySelector('.form-photo-panel');
    if(!panel){
      panel=document.createElement('div');
      panel.className='form-photo-panel real-photo-frame reveal-media';
      panel.setAttribute('aria-label','크루즈 여행 실제 사진');
      const shell=layout.querySelector('.partner-form-shell');
      if(shell)layout.insertBefore(panel,shell);else layout.appendChild(panel);
    }
    if(!panel.querySelector('.partner-original-photo')){
      const image=document.createElement('img');
      image.className='partner-original-photo';
      image.src=PHOTOS[6]+'?v='+VERSION;
      image.alt='크루즈 여행 실제 사진';
      image.loading='lazy';
      image.decoding='async';
      panel.replaceChildren(image);
      panel.classList.remove('actual-photo');
      panel.classList.add('real-photo-frame','is-visible');
    }
  }

  function applyOriginalPhotos(){
    document.querySelectorAll('.actual-photo').forEach(renderFrame);
    ensureFormPhoto();
    document.documentElement.classList.add('partner-original-photos-ready');
  }

  function init(){
    applyOriginalPhotos();
    window.setTimeout(applyOriginalPhotos,400);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
}());

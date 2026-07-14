(function(){
'use strict';
if(!location.pathname.startsWith('/partner'))return;

function addImage(frame,src,className,alt){
  if(!frame)return;
  frame.querySelectorAll('img').forEach(function(img){img.remove()});
  var image=document.createElement('img');
  image.className=className;
  image.src=src;
  image.alt=alt||'크루즈 여행 실제 사진';
  image.loading='eager';
  image.decoding='async';
  frame.appendChild(image);
  frame.classList.add('image-force-visible','is-visible');
  frame.style.opacity='1';
  frame.style.visibility='visible';
}

function init(){
  var version='20260714-static-final';
  var hero=document.querySelector('.hero-bg');
  if(hero){
    hero.src='/img/partner/hero.webp?v='+version;
    hero.style.opacity='1';
    hero.style.visibility='visible';
  }

  document.querySelectorAll('.actual-photo').forEach(function(frame){
    addImage(frame,'/img/partner/gallery.webp?v='+version,'partner-static-photo',frame.getAttribute('aria-label'));
  });
  document.querySelectorAll('.benefit-visual').forEach(function(frame){
    addImage(frame,'/img/partner/benefits.webp?v='+version,'partner-static-benefit',frame.getAttribute('aria-label'));
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();

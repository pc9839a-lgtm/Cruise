(function(){
'use strict';
if(!location.pathname.startsWith('/partner'))return;

function ensureStyle(){
  var old=document.getElementById('partner-final-image-style');
  if(old)old.remove();
  var style=document.createElement('style');
  style.id='partner-final-image-style';
  style.textContent='\
.actual-photo,.benefit-visual{position:relative!important;overflow:hidden!important;background:#dfe7f2!important;background-image:none!important;opacity:1!important;visibility:visible!important}\
.actual-photo>.partner-final-photo{position:absolute!important;z-index:999!important;display:block!important;width:500%!important;height:200%!important;max-width:none!important;object-fit:fill!important;opacity:1!important;visibility:visible!important;filter:none!important;pointer-events:none!important}\
.actual-photo.photo-0>.partner-final-photo{left:0!important;top:0!important}\
.actual-photo.photo-1>.partner-final-photo{left:-100%!important;top:0!important}\
.actual-photo.photo-2>.partner-final-photo{left:-200%!important;top:0!important}\
.actual-photo.photo-3>.partner-final-photo{left:-300%!important;top:0!important}\
.actual-photo.photo-4>.partner-final-photo{left:-400%!important;top:0!important}\
.actual-photo.photo-5>.partner-final-photo{left:0!important;top:-100%!important}\
.actual-photo.photo-6>.partner-final-photo{left:-100%!important;top:-100%!important}\
.actual-photo.photo-7>.partner-final-photo{left:-200%!important;top:-100%!important}\
.actual-photo.photo-8>.partner-final-photo{left:-300%!important;top:-100%!important}\
.actual-photo.photo-9>.partner-final-photo{left:-400%!important;top:-100%!important}\
.benefit-visual>.partner-final-benefit{position:absolute!important;z-index:999!important;top:0!important;display:block!important;width:200%!important;height:100%!important;max-width:none!important;object-fit:fill!important;opacity:1!important;visibility:visible!important;filter:none!important;pointer-events:none!important}\
#benefit-credit .partner-final-benefit{left:0!important}\
#benefit-income .partner-final-benefit{left:-100%!important}\
.hero-bg{display:block!important;opacity:1!important;visibility:visible!important}\
@media(max-width:700px){.actual-photo{min-height:260px!important}.flow-card>.actual-photo{height:230px!important;min-height:230px!important}.gallery-item>.actual-photo{height:320px!important;min-height:320px!important}.actual-photo>.partner-final-photo,.benefit-visual>.partner-final-benefit{display:block!important;opacity:1!important;visibility:visible!important}}';
  document.head.appendChild(style);
}

function resetFrame(frame){
  Array.from(frame.children).forEach(function(child){
    if(child.tagName==='IMG')child.remove();
  });
  frame.style.setProperty('opacity','1','important');
  frame.style.setProperty('visibility','visible','important');
  frame.style.setProperty('background-image','none','important');
  frame.classList.add('is-visible','image-force-visible');
}

function render(){
  ensureStyle();
  var version='20260714-mobile-final-3';
  var hero=document.querySelector('.hero-bg');
  if(hero){
    hero.src='/img/partner/hero.webp?v='+version;
    hero.style.setProperty('opacity','1','important');
    hero.style.setProperty('visibility','visible','important');
  }

  document.querySelectorAll('.actual-photo').forEach(function(frame){
    resetFrame(frame);
    var image=document.createElement('img');
    image.className='partner-final-photo';
    image.src='/img/partner/gallery.webp?v='+version;
    image.alt=frame.getAttribute('aria-label')||'크루즈 여행 실제 사진';
    image.loading='eager';
    image.decoding='async';
    frame.appendChild(image);
  });

  document.querySelectorAll('.benefit-visual').forEach(function(frame){
    resetFrame(frame);
    var image=document.createElement('img');
    image.className='partner-final-benefit';
    image.src='/img/partner/benefits.webp?v='+version;
    image.alt=frame.getAttribute('aria-label')||'크루즈 파트너 혜택 이미지';
    image.loading='eager';
    image.decoding='async';
    frame.appendChild(image);
  });
}

function run(){
  render();
  setTimeout(render,250);
  setTimeout(render,1000);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
else run();
})();

(function(){
  'use strict';

  const body=document.body;
  if(!body.classList.contains('academy-detail-page'))return;

  const mobileQuery=window.matchMedia('(max-width:700px)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

  function addRevealItems(){
    const slides=Array.from(document.querySelectorAll('.lesson-deck-slide'));
    const selector=[
      '.lesson-back',
      '.lesson-kicker',
      '.lesson-hero h1',
      '.cover-subcopy',
      '.ppt-head>span',
      '.ppt-head h2',
      '.ppt-four-grid>article',
      '.ppt-warning-grid>article',
      '.ppt-plan-grid>article',
      '.ppt-detail-grid>article',
      '.ppt-ledger>article',
      '.ppt-formula-box>article',
      '.ppt-formula-sign',
      '.ppt-step-list>article',
      '.ppt-question-list>li',
      '.ppt-fit-columns>article',
      '.ppt-check-strip>article',
      '.ppt-note-line',
      '.ppt-end-links>a'
    ].join(',');

    slides.forEach(slide=>{
      const seen=new Set();
      const items=Array.from(slide.querySelectorAll(selector)).filter(item=>{
        if(seen.has(item))return false;
        seen.add(item);
        return true;
      });

      items.forEach((item,index)=>{
        if(!item.classList.contains('deck-reveal')){
          item.classList.add('deck-reveal');
          item.style.setProperty('--reveal-order',String(Math.min(index,9)));
        }
        if(item.matches('article,li,.ppt-note-line'))item.classList.add('deck-reveal-card');
        if(item.matches('strong'))item.classList.add('deck-reveal-number');
      });
    });
  }

  function setupMobile(){
    const deck=document.querySelector('.lesson-deck');
    const slides=Array.from(document.querySelectorAll('.lesson-deck-slide'));
    if(!deck||!slides.length)return;

    body.classList.toggle('academy-detail-native-scroll',mobileQuery.matches);

    if(!mobileQuery.matches){
      slides.forEach(slide=>slide.setAttribute('aria-hidden',String(!slide.classList.contains('is-active'))));
      return;
    }

    slides.forEach(slide=>slide.setAttribute('aria-hidden','false'));

    const stopDeckSwipe=event=>{
      if(mobileQuery.matches)event.stopImmediatePropagation();
    };

    deck.addEventListener('touchstart',stopDeckSwipe,true);
    deck.addEventListener('touchend',stopDeckSwipe,true);

    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          const slide=entry.target;
          if(entry.isIntersecting){
            if(!reducedMotion.matches){
              slide.classList.remove('is-revealing');
              void slide.offsetWidth;
            }
            slide.classList.add('is-revealing');
          }else if(!reducedMotion.matches){
            slide.classList.remove('is-revealing');
          }
        });
      },{root:deck,threshold:.32});

      slides.forEach(slide=>observer.observe(slide));
    }else{
      slides.forEach(slide=>slide.classList.add('is-revealing'));
    }
  }

  addRevealItems();
  setupMobile();

  if(typeof mobileQuery.addEventListener==='function'){
    mobileQuery.addEventListener('change',()=>window.location.reload());
  }
})();

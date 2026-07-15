(function(){
  'use strict';

  const body=document.body;
  if(!body.classList.contains('academy-detail-page'))return;

  const mobileQuery=window.matchMedia('(max-width:700px)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

  function loadContrastGuard(){
    if(document.querySelector('link[data-academy-contrast]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/academy/academy-contrast-v2.css?v=20260715-contrast2';
    link.dataset.academyContrast='true';
    document.head.appendChild(link);
  }

  function updateCourseNavigation(){
    if(!window.location.pathname.includes('/academy/09-partner-rules/'))return;
    const links=document.querySelectorAll('.ppt-end-links>a');
    const next=links[1];
    if(!next)return;
    next.href='/academy/10-first-steps/';
    const small=next.querySelector('small');
    const strong=next.querySelector('strong');
    if(small)small.textContent='10';
    if(strong)strong.textContent='가입 후 바로 해야 할 일 →';
  }

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
      '.ppt-end-links>a',
      '.destination-month',
      '.destination-copy h2',
      '.destination-copy>p',
      '.destination-tags',
      '.destination-check',
      '.destination-visual',
      '.first-steps-flow>article',
      '.first-focus-main',
      '.first-focus-side>article',
      '.passport-compare>article',
      '.first-triple>article',
      '.first-search-copy',
      '.first-search-result>article',
      '.first-warning>article',
      '.first-done',
      '.partner-two-grid>article',
      '.partner-stat-grid>article',
      '.partner-flow-line>article',
      '.partner-flow-sign',
      '.partner-final'
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
        if(item.matches('article,li,.ppt-note-line,.destination-tags,.destination-check'))item.classList.add('deck-reveal-card');
        if(item.matches('.destination-visual'))item.classList.add('deck-reveal-visual');
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

  loadContrastGuard();
  updateCourseNavigation();
  addRevealItems();
  setupMobile();

  if(typeof mobileQuery.addEventListener==='function'){
    mobileQuery.addEventListener('change',()=>window.location.reload());
  }
})();
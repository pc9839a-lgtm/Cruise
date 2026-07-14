(function(){
  'use strict';

  const header=document.querySelector('.lesson-header');
  const hero=document.querySelector('.lesson-hero');
  const main=document.querySelector('.lesson-main');
  const content=document.querySelector('.lesson-content');
  const footer=document.querySelector('.lesson-footer');

  if(!header||!hero||!main||!content)return;

  const mobileQuery=window.matchMedia('(max-width:700px)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsNativeMobile=document.body.classList.contains('industry-page');

  document.documentElement.classList.add('lesson-deck-ready');
  document.body.classList.add('lesson-deck-mode');

  const sourceNodes=[hero,...Array.from(content.children)];
  const deck=document.createElement('div');
  deck.className='lesson-deck';
  deck.setAttribute('aria-label','아카데미 슬라이드');

  const slides=sourceNodes.map((node,index)=>{
    const slide=document.createElement('section');
    slide.className='lesson-deck-slide';
    slide.dataset.page=String(index+1);
    slide.dataset.title=node.dataset.slideTitle||node.querySelector('h1,h2')?.textContent.trim()||'';

    if(node===hero){
      slide.classList.add('lesson-deck-slide-hero');
      slide.appendChild(node);
    }else{
      const frame=document.createElement('div');
      frame.className='lesson-deck-slide-frame';
      frame.appendChild(node);
      slide.appendChild(frame);
    }

    deck.appendChild(slide);
    return slide;
  });

  header.insertAdjacentElement('afterend',deck);
  main.remove();
  if(footer)footer.remove();

  const controls=document.createElement('div');
  controls.className='lesson-deck-controls';
  controls.innerHTML='\n    <button class="lesson-deck-button" type="button" data-deck-prev aria-label="이전 장">←</button>\n    <span class="lesson-deck-count"><strong data-deck-current>1</strong> / <span data-deck-total>'+slides.length+'</span></span>\n    <button class="lesson-deck-button" type="button" data-deck-next aria-label="다음 장">→</button>\n  ';

  const progress=document.createElement('div');
  progress.className='lesson-deck-progress';
  progress.innerHTML='<span></span>';

  const hint=document.createElement('div');
  hint.className='lesson-deck-hint';

  document.body.append(controls,progress,hint);

  const prevButton=controls.querySelector('[data-deck-prev]');
  const nextButton=controls.querySelector('[data-deck-next]');
  const currentLabel=controls.querySelector('[data-deck-current]');
  const progressBar=progress.querySelector('span');

  let current=0;
  let locked=false;
  let touchStartY=0;
  let touchStartX=0;
  let revealTimer=0;
  let scrollFrame=0;
  let modeFrame=0;

  function isNativeMobile(){
    return supportsNativeMobile&&mobileQuery.matches;
  }

  function clamp(value){
    return Math.max(0,Math.min(slides.length-1,value));
  }

  function getScroller(slide){
    const section=slide.querySelector('.ppt-section');
    return section&&section.scrollHeight>section.clientHeight+4?section:slide;
  }

  function canChangeByDirection(delta){
    const scroller=getScroller(slides[current]);
    const maxScroll=scroller.scrollHeight-scroller.clientHeight;
    if(maxScroll<=4)return true;
    if(delta>0)return scroller.scrollTop>=maxScroll-4;
    return scroller.scrollTop<=4;
  }

  function collectRevealItems(slide){
    const selector=[
      '.lesson-back',
      '.lesson-kicker',
      '.lesson-hero h1',
      '.cover-subcopy',
      '.slide-label',
      '.ppt-head>span',
      'h2',
      '.korea-opening-copy>p',
      '.experience-copy>p',
      '.photo-message-copy>p',
      '.homeport-simple-copy>p',
      '.partner-title>p',
      '.short-takeaway',
      '.big-stat',
      '.source-link',
      '.two-proof>article',
      '.external-photo-card',
      '.experience-meter',
      '.port-pills',
      '.simple-two>article',
      '.economy-grid>article',
      '.portrait-photo-wrap',
      '.three-points>article',
      '.partner-role-grid>article',
      '.slide-footer-message',
      '.roadmap-line>article',
      '.roadmap-line>i',
      '.roadmap-message',
      '.final-three>p',
      '.industry-end-actions>a'
    ].join(',');

    const seen=new Set();
    return Array.from(slide.querySelectorAll(selector)).filter(element=>{
      if(seen.has(element))return false;
      seen.add(element);
      return true;
    });
  }

  slides.forEach(slide=>{
    const items=collectRevealItems(slide);
    items.forEach((element,index)=>{
      element.classList.add('deck-reveal');
      element.style.setProperty('--reveal-order',String(Math.min(index,9)));
      if(element.matches('article,li,.slide-footer-message,.roadmap-message')){
        element.classList.add('deck-reveal-card');
      }
      if(element.matches('.external-photo-card,.portrait-photo-wrap,.experience-meter')){
        element.classList.add('deck-reveal-visual');
      }
      if(element.matches('.big-stat,.two-proof strong')){
        element.classList.add('deck-reveal-number');
      }
    });
  });

  function replayReveal(slide){
    window.clearTimeout(revealTimer);
    slides.forEach(item=>item.classList.remove('is-revealing'));
    if(reducedMotion.matches){
      slide.classList.add('is-revealing');
      return;
    }
    void slide.offsetWidth;
    revealTimer=window.setTimeout(()=>{
      slide.classList.add('is-revealing');
    },mobileQuery.matches?45:105);
  }

  function updateLabels(){
    currentLabel.textContent=String(current+1);
    prevButton.disabled=current===0;
    nextButton.disabled=current===slides.length-1;
    progressBar.style.width=((current+1)/slides.length*100)+'%';

    const active=slides[current];
    const anchor=active.querySelector('[id]');
    history.replaceState(null,'',anchor?'#'+anchor.id:location.pathname);
  }

  function applyActiveState(nextIndex,reveal){
    current=clamp(nextIndex);
    const native=isNativeMobile();

    slides.forEach((slide,index)=>{
      slide.classList.toggle('is-active',index===current);
      slide.classList.toggle('is-before',index<current);
      slide.setAttribute('aria-hidden',native?'false':String(index!==current));
    });

    updateLabels();
    if(reveal)replayReveal(slides[current]);
  }

  function scrollToNativeSlide(index,behavior){
    const target=slides[clamp(index)];
    deck.scrollTo({
      top:target.offsetTop,
      behavior:behavior||((reducedMotion.matches)?'auto':'smooth')
    });
  }

  function render(nextIndex,resetScroll){
    const target=clamp(nextIndex);

    if(isNativeMobile()){
      applyActiveState(target,true);
      if(resetScroll)scrollToNativeSlide(target);
      return;
    }

    current=target;
    slides.forEach((slide,index)=>{
      slide.classList.toggle('is-active',index===current);
      slide.classList.toggle('is-before',index<current);
      slide.setAttribute('aria-hidden',String(index!==current));
      if(index===current&&resetScroll){
        slide.scrollTop=0;
        const scroller=getScroller(slide);
        if(scroller!==slide)scroller.scrollTop=0;
      }
    });

    updateLabels();
    replayReveal(slides[current]);
  }

  function move(direction){
    const next=clamp(current+direction);
    if(next===current||locked)return;
    locked=true;
    render(next,true);
    window.setTimeout(()=>{locked=false;},isNativeMobile()?430:410);
  }

  function closestNativeSlide(){
    const marker=deck.scrollTop+(deck.clientHeight*.38);
    let closest=0;
    let best=Infinity;

    slides.forEach((slide,index)=>{
      const distance=Math.abs(slide.offsetTop-marker);
      if(distance<best){
        best=distance;
        closest=index;
      }
    });

    return closest;
  }

  function handleNativeScroll(){
    if(!isNativeMobile())return;
    if(scrollFrame)return;
    scrollFrame=window.requestAnimationFrame(()=>{
      scrollFrame=0;
      const next=closestNativeSlide();
      if(next!==current)applyActiveState(next,true);
    });
  }

  function syncDeviceMode(){
    const native=isNativeMobile();
    document.body.classList.toggle('lesson-deck-mobile',mobileQuery.matches);
    document.body.classList.toggle('lesson-deck-native-scroll',native);
    hint.textContent=native?'아래로 내려 다음 장':'휠 · 방향키';

    window.cancelAnimationFrame(modeFrame);
    modeFrame=window.requestAnimationFrame(()=>{
      slides.forEach((slide,index)=>{
        slide.setAttribute('aria-hidden',native?'false':String(index!==current));
      });
      if(native)scrollToNativeSlide(current,'auto');
      else render(current,false);
    });
  }

  syncDeviceMode();
  if(typeof mobileQuery.addEventListener==='function'){
    mobileQuery.addEventListener('change',syncDeviceMode);
  }else if(typeof mobileQuery.addListener==='function'){
    mobileQuery.addListener(syncDeviceMode);
  }

  prevButton.addEventListener('click',()=>move(-1));
  nextButton.addEventListener('click',()=>move(1));

  deck.addEventListener('scroll',handleNativeScroll,{passive:true});

  deck.addEventListener('wheel',event=>{
    if(isNativeMobile())return;
    if(Math.abs(event.deltaY)<18)return;
    if(!canChangeByDirection(event.deltaY))return;
    event.preventDefault();
    move(event.deltaY>0?1:-1);
  },{passive:false});

  document.addEventListener('keydown',event=>{
    if(event.target.matches('input,textarea,select,button'))return;
    if(['ArrowRight','ArrowDown','PageDown',' '].includes(event.key)){
      event.preventDefault();
      move(1);
    }
    if(['ArrowLeft','ArrowUp','PageUp'].includes(event.key)){
      event.preventDefault();
      move(-1);
    }
    if(event.key==='Home'){
      event.preventDefault();
      render(0,true);
    }
    if(event.key==='End'){
      event.preventDefault();
      render(slides.length-1,true);
    }
  });

  deck.addEventListener('touchstart',event=>{
    if(isNativeMobile())return;
    const touch=event.changedTouches[0];
    touchStartY=touch.clientY;
    touchStartX=touch.clientX;
  },{passive:true});

  deck.addEventListener('touchend',event=>{
    if(isNativeMobile())return;
    const touch=event.changedTouches[0];
    const diffY=touchStartY-touch.clientY;
    const diffX=touchStartX-touch.clientX;
    const absX=Math.abs(diffX);
    const absY=Math.abs(diffY);

    if(absY<60||absY<absX||!canChangeByDirection(diffY))return;
    move(diffY>0?1:-1);
  },{passive:true});

  deck.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(!link)return;
    const target=document.querySelector(link.getAttribute('href'));
    if(!target)return;
    const slideIndex=slides.findIndex(slide=>slide.contains(target));
    if(slideIndex<0)return;
    event.preventDefault();
    render(slideIndex,true);
  });

  let initial=0;
  if(location.hash){
    const target=document.querySelector(location.hash);
    const found=slides.findIndex(slide=>target&&slide.contains(target));
    if(found>=0)initial=found;
  }

  applyActiveState(initial,true);
  window.requestAnimationFrame(()=>{
    if(isNativeMobile())scrollToNativeSlide(initial,'auto');
  });
})();
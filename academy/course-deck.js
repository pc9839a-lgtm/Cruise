(function(){
  'use strict';

  const header=document.querySelector('.lesson-header');
  const hero=document.querySelector('.lesson-hero');
  const main=document.querySelector('.lesson-main');
  const content=document.querySelector('.lesson-content');
  const footer=document.querySelector('.lesson-footer');

  if(!header||!hero||!main||!content)return;

  document.documentElement.classList.add('lesson-deck-ready');
  document.body.classList.add('lesson-deck-mode');

  const sourceNodes=[hero,...Array.from(content.children)];
  const deck=document.createElement('div');
  deck.className='lesson-deck';
  deck.setAttribute('aria-label','아카데미 페이지 보기');

  const slides=sourceNodes.map((node,index)=>{
    const slide=document.createElement('section');
    slide.className='lesson-deck-slide';
    slide.dataset.page=String(index+1);

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
  controls.innerHTML='\n    <button class="lesson-deck-button" type="button" data-deck-prev aria-label="이전 페이지">←</button>\n    <span class="lesson-deck-count"><strong data-deck-current>1</strong> / <span data-deck-total>'+slides.length+'</span></span>\n    <button class="lesson-deck-button" type="button" data-deck-next aria-label="다음 페이지">→</button>\n  ';

  const progress=document.createElement('div');
  progress.className='lesson-deck-progress';
  progress.innerHTML='<span></span>';

  const hint=document.createElement('div');
  hint.className='lesson-deck-hint';
  hint.textContent='휠 · 방향키 · 스와이프';

  document.body.append(controls,progress,hint);

  const prevButton=controls.querySelector('[data-deck-prev]');
  const nextButton=controls.querySelector('[data-deck-next]');
  const currentLabel=controls.querySelector('[data-deck-current]');
  const progressBar=progress.querySelector('span');

  let current=0;
  let locked=false;
  let touchStartY=0;
  let touchStartX=0;

  function clamp(value){
    return Math.max(0,Math.min(slides.length-1,value));
  }

  function render(nextIndex,resetScroll){
    const target=clamp(nextIndex);
    current=target;

    slides.forEach((slide,index)=>{
      slide.classList.toggle('is-active',index===current);
      slide.classList.toggle('is-before',index<current);
      slide.setAttribute('aria-hidden',String(index!==current));
      if(index===current&&resetScroll)slide.scrollTop=0;
    });

    currentLabel.textContent=String(current+1);
    prevButton.disabled=current===0;
    nextButton.disabled=current===slides.length-1;
    progressBar.style.width=((current+1)/slides.length*100)+'%';

    const active=slides[current];
    const anchor=active.querySelector('[id]');
    history.replaceState(null,'',anchor?'#'+anchor.id:location.pathname);
  }

  function move(direction){
    const next=clamp(current+direction);
    if(next===current||locked)return;
    locked=true;
    render(next,true);
    window.setTimeout(()=>{locked=false;},430);
  }

  function canChangeByWheel(delta){
    const active=slides[current];
    const maxScroll=active.scrollHeight-active.clientHeight;
    if(maxScroll<=4)return true;
    if(delta>0)return active.scrollTop>=maxScroll-4;
    return active.scrollTop<=4;
  }

  prevButton.addEventListener('click',()=>move(-1));
  nextButton.addEventListener('click',()=>move(1));

  deck.addEventListener('wheel',event=>{
    if(Math.abs(event.deltaY)<18)return;
    if(!canChangeByWheel(event.deltaY))return;
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
    const touch=event.changedTouches[0];
    touchStartY=touch.clientY;
    touchStartX=touch.clientX;
  },{passive:true});

  deck.addEventListener('touchend',event=>{
    const touch=event.changedTouches[0];
    const diffY=touchStartY-touch.clientY;
    const diffX=touchStartX-touch.clientX;
    if(Math.abs(diffY)<60||Math.abs(diffY)<Math.abs(diffX))return;
    if(!canChangeByWheel(diffY))return;
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

  render(initial,true);
})();

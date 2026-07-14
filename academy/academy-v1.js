(function(){
  'use strict';

  const STORAGE_KEY='cruiseplay_academy_progress_v4';
  const root=document.documentElement;
  const menuButton=document.getElementById('academyMenuButton');
  const nav=document.getElementById('academyNav');
  const progressBar=document.getElementById('academyProgressBar');
  const progressPercent=document.getElementById('academyProgressPercent');
  const progressText=document.getElementById('academyProgressText');
  const resetProgress=document.getElementById('academyResetProgress');

  function readProgress(){
    try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(error){return{}}
  }

  function syncProgress(){
    const progress=readProgress();
    const cards=[...document.querySelectorAll('[data-course-id]')];
    cards.forEach(card=>{
      const done=Boolean(progress[card.dataset.courseId]);
      card.classList.toggle('is-complete',done);
      const status=card.querySelector('.academy-card-status');
      if(status)status.textContent=done?'완료':'미완료';
    });
    const complete=cards.filter(card=>progress[card.dataset.courseId]).length;
    const percent=cards.length?Math.round(complete/cards.length*100):0;
    if(progressBar)progressBar.style.width=percent+'%';
    if(progressPercent)progressPercent.textContent=percent+'%';
    if(progressText)progressText.textContent=complete?complete+' / '+cards.length+' 과정 완료':'완료한 과정이 없습니다.';
  }

  function applyFilter(filter){
    document.querySelectorAll('[data-filter]').forEach(button=>{
      const active=button.dataset.filter===filter;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-selected',String(active));
    });
    document.querySelectorAll('[data-course-id]').forEach(card=>{
      const categories=String(card.dataset.category||'').split(/\s+/);
      card.hidden=filter!=='all'&&!categories.includes(filter);
    });
  }

  function bind(){
    if(menuButton&&nav){
      menuButton.addEventListener('click',()=>{
        const open=nav.classList.toggle('is-open');
        menuButton.setAttribute('aria-expanded',String(open));
        document.body.classList.toggle('is-menu-open',open);
      });
      nav.addEventListener('click',event=>{
        if(!event.target.closest('a'))return;
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded','false');
        document.body.classList.remove('is-menu-open');
      });
    }

    document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
    if(resetProgress)resetProgress.addEventListener('click',()=>{
      try{localStorage.removeItem(STORAGE_KEY)}catch(error){}
      syncProgress();
    });
    window.addEventListener('pageshow',syncProgress);
    window.addEventListener('storage',syncProgress);
  }

  function init(){
    root.classList.add('js-enabled');
    bind();
    applyFilter('all');
    syncProgress();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
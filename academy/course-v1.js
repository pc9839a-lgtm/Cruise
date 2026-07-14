(function(){
  'use strict';

  const STORAGE_KEY='cruiseplay_academy_progress_v4';
  const courseId=document.body.dataset.courseId||'';
  const completeButton=document.querySelector('[data-complete-page]');
  const menuButton=document.getElementById('lessonMenuButton');
  const nav=document.getElementById('lessonNav');

  function readProgress(){
    try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(error){return{}}
  }

  function writeProgress(progress){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress))}catch(error){}
  }

  function syncCompleteButton(){
    if(!completeButton||!courseId)return;
    const done=Boolean(readProgress()[courseId]);
    completeButton.classList.toggle('is-complete',done);
    completeButton.textContent=done?'학습 완료됨':'학습 완료';
    completeButton.setAttribute('aria-pressed',String(done));
  }

  function toggleComplete(){
    if(!courseId)return;
    const progress=readProgress();
    progress[courseId]=!progress[courseId];
    writeProgress(progress);
    syncCompleteButton();
  }

  function bindMenu(){
    if(!menuButton||!nav)return;
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

  function init(){
    bindMenu();
    syncCompleteButton();
    if(completeButton)completeButton.addEventListener('click',toggleComplete);
    window.addEventListener('storage',syncCompleteButton);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
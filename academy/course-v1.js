(function(){
  'use strict';

  const menuButton=document.getElementById('lessonMenuButton');
  const nav=document.getElementById('lessonNav');

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

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindMenu,{once:true});else bindMenu();
})();
(function(){
  'use strict';

  const root=document.documentElement;
  const menuButton=document.getElementById('academyMenuButton');
  const nav=document.getElementById('academyNav');

  function applyFilter(filter){
    document.querySelectorAll('[data-filter]').forEach(button=>{
      const active=button.dataset.filter===filter;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-selected',String(active));
    });
    document.querySelectorAll('[data-category]').forEach(card=>{
      const categories=String(card.dataset.category||'').split(/\s+/);
      card.hidden=filter!=='all'&&!categories.includes(filter);
    });
  }

  function bindMenu(){
    if(!menuButton||!nav)return;
    menuButton.addEventListener('click',()=>{
      const open=nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded',String(open));
      document.body.classList.toggle('is-menu-open',open);
    });
    nav.addEventListener('click',event=>{
      const link=event.target.closest('a');
      if(!link)return;
      const filter=link.dataset.navFilter;
      if(filter){
        applyFilter(filter);
        document.getElementById('contents')?.scrollIntoView({behavior:'smooth',block:'start'});
      }
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded','false');
      document.body.classList.remove('is-menu-open');
    });
  }

  function init(){
    root.classList.add('js-enabled');
    bindMenu();
    document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
    applyFilter('all');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
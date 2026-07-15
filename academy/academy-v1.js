(function(){
  'use strict';

  const root=document.documentElement;
  const menuButton=document.getElementById('academyMenuButton');
  const nav=document.getElementById('academyNav');

  function updateCourseCopy(){
    const card=document.querySelector('a[href="/academy/06-partner-benefits/"]');
    if(!card)return;
    const subtitle=card.querySelector('.academy-course-subtitle');
    const description=card.querySelector('.academy-course-content>p');
    if(subtitle)subtitle.textContent='매월 여행 크레딧, 포인트 100%, 달러 카드와 달러 보상';
    if(description)description.textContent='다음 여행비, 무료 크루즈, 해외 달러 결제 카드와 파트너 보상 혜택을 확인합니다.';
  }

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
    updateCourseCopy();
    bindMenu();
    document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
    applyFilter('all');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
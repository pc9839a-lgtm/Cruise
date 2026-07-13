(function(){
  'use strict';
  const menuButton=document.getElementById('partnerMenuButton');
  const nav=document.getElementById('partnerNav');
  const floatingCta=document.getElementById('partnerFloatingCta');
  const formSection=document.getElementById('partner-form');
  const setValue=(id,value)=>{const el=document.getElementById(id);if(el)el.value=value||'';};
  const setResult=(message,type)=>{const el=document.getElementById('partnerFormResult');if(!el)return;el.textContent=message||'';el.className='form-result'+(type?' is-'+type:'');};
  function initTracking(){const p=new URLSearchParams(location.search);setValue('partnerAgentInput',(p.get('agent')||'admin').trim());setValue('partnerUtmSourceInput',p.get('utm_source')||'');setValue('partnerUtmMediumInput',p.get('utm_medium')||'');setValue('partnerUtmCampaignInput',p.get('utm_campaign')||'');setValue('partnerPageUrlInput',location.href);setValue('partnerReferrerInput',document.referrer||'');}
  function initMenu(){if(!menuButton||!nav)return;menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',open?'true':'false');document.body.classList.toggle('is-menu-open',open);});nav.addEventListener('click',e=>{if(!e.target.closest('a'))return;nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('is-menu-open');});}
  function initReveal(){const groups=[...document.querySelectorAll('.reveal-group')];const singles=[...document.querySelectorAll('.reveal-media,.reveal-card')];if(!('IntersectionObserver'in window)){groups.forEach(el=>el.classList.add('is-visible'));singles.forEach(el=>el.classList.add('is-visible'));return;}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');observer.unobserve(entry.target);}),{threshold:.12,rootMargin:'0px 0px -50px'});groups.forEach(el=>observer.observe(el));singles.forEach(el=>observer.observe(el));}
  function initFloating(){if(!floatingCta||!formSection||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver(entries=>{const entry=entries[0];floatingCta.classList.toggle('is-hidden',!!(entry&&entry.isIntersecting));},{threshold:.08,rootMargin:'-10% 0px -10%'});observer.observe(formSection);}
  function initForm(){const form=document.getElementById('partnerInquiryForm');const interest=document.getElementById('partnerInterestInput');const message=document.getElementById('partnerMessageInput');if(!form||!interest||!message)return;form.addEventListener('submit',event=>{const value=String(interest.value||'').trim();if(!value){event.preventDefault();event.stopImmediatePropagation();setResult('가장 궁금한 내용을 선택해주세요.','error');interest.focus();return;}const prefix='[관심내용: '+value+']';const current=String(message.value||'').replace(/^\[관심내용:[^\]]+\]\s*/i,'').trim();message.value=prefix+(current?'\n'+current:'');},true);}
  function init(){initTracking();initMenu();initReveal();initFloating();initForm();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();

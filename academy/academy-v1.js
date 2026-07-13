(function(){
  'use strict';

  const STORAGE_KEY='cruiseplay_academy_progress_v2';
  const AGENT_PATTERN=/^[A-Za-z0-9_-]{1,40}$/;
  const root=document.documentElement;
  const menuButton=document.getElementById('academyMenuButton');
  const nav=document.getElementById('academyNav');
  const dialog=document.getElementById('academyCourseDialog');
  const dialogClose=document.getElementById('academyDialogClose');
  const dialogKicker=document.getElementById('academyDialogKicker');
  const dialogTitle=document.getElementById('academyDialogTitle');
  const dialogBody=document.getElementById('academyDialogBody');
  const dialogActions=document.getElementById('academyDialogActions');
  const progressBar=document.getElementById('academyProgressBar');
  const progressPercent=document.getElementById('academyProgressPercent');
  const progressText=document.getElementById('academyProgressText');
  const resetProgress=document.getElementById('academyResetProgress');
  const agentInput=document.getElementById('academyAgentCode');
  const createLinksButton=document.getElementById('academyCreateLinks');
  const linkMessage=document.getElementById('academyLinkMessage');
  const generatedLinks=document.getElementById('academyGeneratedLinks');

  const lessons={
    'before-membership':{
      kicker:'01 · MEMBERSHIP',
      title:'멤버십부터 이해하기',
      intro:'크루즈플레이가 소개하는 멤버십의 기본부터 확인합니다.',
      items:[
        '무료 플랜부터 유료 플랜까지 선택할 수 있습니다.',
        '클래식은 월 $100 납부 시 200P 적립 기준입니다.',
        '포인트는 크루즈와 호텔 예약에 사용할 수 있습니다.',
        '플랜과 혜택은 가입 시점의 공식 안내를 우선합니다.'
      ],
      actions:[{label:'멤버십 전체 보기',href:'/membership/'}]
    },
    'before-booking':{
      kicker:'02 · POINT & BOOKING',
      title:'포인트와 예약 보기',
      intro:'포인트를 언제, 얼마나 사용할 수 있는지 먼저 확인합니다.',
      items:[
        '일반 예약은 포인트를 최대 50%까지 사용할 수 있습니다.',
        '나머지 금액은 카드로 결제합니다.',
        '270일 이후 출발 예약은 조건 충족 시 포인트 사용 범위가 커질 수 있습니다.',
        '실제 적용 가능 여부는 예약 시점과 상품 조건을 확인해야 합니다.'
      ],
      actions:[{label:'포인트 계산 보기',href:'/membership/#calculator'}]
    },
    'before-partner':{
      kicker:'03 · PARTNER',
      title:'파트너가 하는 일',
      intro:'모든 내용을 외우는 일이 아닙니다. 관심에 맞는 페이지를 보내는 일부터 시작합니다.',
      items:[
        '크루즈 사진이나 정보를 게시합니다.',
        '여행 혜택이 궁금한 사람에게 멤버십 페이지를 보냅니다.',
        '파트너 활동이 궁금한 사람에게 파트너 페이지를 보냅니다.',
        '남은 질문만 직접 답하거나 상담으로 연결합니다.'
      ],
      actions:[{label:'파트너 페이지 보기',href:'/partner/'}]
    },
    'before-caution':{
      kicker:'04 · BEFORE SIGNUP',
      title:'가입 전 꼭 확인하기',
      intro:'혜택만 보지 말고 비용과 유지 조건까지 확인한 뒤 결정하세요.',
      items:[
        '가입 후 14일이 지나면 환불이 제한될 수 있습니다.',
        '월 납부액은 현금처럼 출금할 수 없습니다.',
        '본인 명의 카드로만 결제할 수 있습니다.',
        '예약 후 탑승 시점까지 멤버십 유지가 필요할 수 있습니다.',
        '해지 시 추가 적립 포인트가 소멸될 수 있습니다.'
      ],
      actions:[{label:'멤버십 조건 다시 보기',href:'/membership/'}]
    },
    'after-link':{
      kicker:'01 · MY LINK',
      title:'내 추천 링크 확인',
      intro:'추천코드가 들어간 링크를 만들어야 가입자가 내 추천으로 연결됩니다.',
      items:[
        '가입 후 받은 추천코드를 확인합니다.',
        '아래 링크 만들기에 추천코드를 입력합니다.',
        '멤버십·파트너·아카데미 링크를 각각 복사합니다.',
        '보내기 전에 주소에 agent 값이 들어갔는지 확인합니다.'
      ],
      actions:[{label:'내 링크 만들기',href:'#quick-links'}]
    },
    'after-share':{
      kicker:'02 · FIRST SHARE',
      title:'첫 링크 보내기',
      intro:'상대가 궁금해하는 내용에 맞춰 하나의 링크만 보냅니다.',
      items:[
        '여행 혜택이 궁금하면 멤버십 페이지를 보냅니다.',
        '활동 방식이 궁금하면 파트너 페이지를 보냅니다.',
        '둘 다 궁금하면 아카데미 페이지를 보냅니다.',
        '처음부터 여러 링크를 한꺼번에 보내지 않습니다.'
      ],
      actions:[{label:'빠른 링크 보기',href:'#quick-links'}]
    },
    'after-reply':{
      kicker:'03 · FIRST QUESTION',
      title:'첫 문의 답하기',
      intro:'길게 설득하지 말고 사실만 짧게 답합니다.',
      items:[
        '가입비와 월 비용은 플랜에 따라 다릅니다.',
        '포인트 사용 범위는 예약 조건에 따라 다릅니다.',
        '무료 여행과 보상은 활동 및 지급 조건 충족이 필요합니다.',
        '모르는 내용은 추측하지 말고 해당 페이지나 상담으로 연결합니다.'
      ],
      actions:[{label:'상담 문의 연결',href:'/partner/#partner-form'}]
    },
    'after-followup':{
      kicker:'04 · FIRST SIGNUP',
      title:'첫 가입 연결하기',
      intro:'상대가 충분히 확인하고 본인이 결정한 뒤 가입하도록 안내합니다.',
      items:[
        '가입 전 멤버십 비용과 유의사항을 다시 확인합니다.',
        '본인 추천 링크가 맞는지 확인합니다.',
        '가입 후 앱 로그인과 결제 상태를 확인합니다.',
        '가입 직후 멤버십 사용법과 아카데미 위치를 알려줍니다.'
      ],
      actions:[{label:'멤버십 페이지 보내기',href:'/membership/'}]
    }
  };

  function sanitizeAgent(value){
    const code=String(value||'').trim();
    return AGENT_PATTERN.test(code)?code:'';
  }

  function readProgress(){
    try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(error){return{}}
  }

  function writeProgress(progress){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress))}catch(error){}
  }

  function currentTrack(){
    const active=document.querySelector('[data-track-button].is-active');
    return active?active.dataset.trackButton:'before';
  }

  function visibleCourseIds(){
    const panel=document.querySelector('[data-track-panel="'+currentTrack()+'"]');
    return panel?[...panel.querySelectorAll('[data-course-id]')].map(card=>card.dataset.courseId):[];
  }

  function syncProgress(){
    const progress=readProgress();
    document.querySelectorAll('[data-course-id]').forEach(card=>{
      const id=card.dataset.courseId;
      const done=Boolean(progress[id]);
      card.classList.toggle('is-complete',done);
      const input=card.querySelector('[data-complete-course]');
      if(input)input.checked=done;
    });
    const ids=visibleCourseIds();
    const complete=ids.filter(id=>progress[id]).length;
    const percent=ids.length?Math.round(complete/ids.length*100):0;
    if(progressBar)progressBar.style.width=percent+'%';
    if(progressPercent)progressPercent.textContent=percent+'%';
    if(progressText)progressText.textContent=complete?complete+' / '+ids.length+' 과정 완료':'완료한 과정이 없습니다.';
  }

  function switchTrack(track){
    document.querySelectorAll('[data-track-button]').forEach(button=>{
      const active=button.dataset.trackButton===track;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-selected',String(active));
    });
    document.querySelectorAll('[data-track-panel]').forEach(panel=>{
      panel.hidden=panel.dataset.trackPanel!==track;
    });
    syncProgress();
    const target=track==='after'?document.getElementById('partner-track'):document.getElementById('start');
    if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function appendAgentToHref(href,code){
    if(!code)return href;
    try{
      const url=new URL(href,location.origin);
      url.searchParams.set('agent',code);
      return url.pathname+url.search+url.hash;
    }catch(error){return href}
  }

  function propagateAgent(code){
    if(!code)return;
    document.querySelectorAll('[data-preserve-agent]').forEach(link=>{
      const href=link.getAttribute('href');
      if(href)link.setAttribute('href',appendAgentToHref(href,code));
    });
  }

  function getQueryAgent(){
    try{return sanitizeAgent(new URL(location.href).searchParams.get('agent'))}catch(error){return''}
  }

  function openLesson(id){
    const lesson=lessons[id];
    if(!lesson||!dialog)return;
    dialogKicker.textContent=lesson.kicker;
    dialogTitle.textContent=lesson.title;
    dialogBody.innerHTML='<p>'+lesson.intro+'</p><ul>'+lesson.items.map(item=>'<li>'+item+'</li>').join('')+'</ul>';
    dialogActions.replaceChildren();
    const queryAgent=sanitizeAgent(agentInput&&agentInput.value)||getQueryAgent();
    lesson.actions.forEach(action=>{
      const link=document.createElement('a');
      link.textContent=action.label;
      link.href=appendAgentToHref(action.href,queryAgent);
      if(action.href.startsWith('#'))link.addEventListener('click',()=>dialog.close());
      dialogActions.appendChild(link);
    });
    const complete=document.createElement('button');
    complete.type='button';
    complete.textContent='이 과정 완료';
    complete.addEventListener('click',()=>{
      const progress=readProgress();
      progress[id]=true;
      writeProgress(progress);
      syncProgress();
      dialog.close();
    });
    dialogActions.appendChild(complete);
    dialog.showModal();
  }

  function makeLinks(){
    const code=sanitizeAgent(agentInput&&agentInput.value);
    if(!code){
      linkMessage.textContent='추천코드를 영문, 숫자, _ 또는 -로 입력해주세요.';
      linkMessage.classList.add('is-error');
      generatedLinks.hidden=true;
      return;
    }
    linkMessage.textContent='추천코드가 적용된 링크가 만들어졌습니다.';
    linkMessage.classList.remove('is-error');
    generatedLinks.hidden=false;
    generatedLinks.dataset.membership=location.origin+'/membership/?agent='+encodeURIComponent(code);
    generatedLinks.dataset.partner=location.origin+'/partner/?agent='+encodeURIComponent(code);
    generatedLinks.dataset.academy=location.origin+'/academy/?agent='+encodeURIComponent(code);
    propagateAgent(code);
  }

  async function copyLink(type,button){
    const value=generatedLinks.dataset[type]||'';
    if(!value)return;
    try{
      await navigator.clipboard.writeText(value);
      const strong=button.querySelector('strong');
      if(strong){strong.textContent='복사됨';setTimeout(()=>strong.textContent='복사',1300)}
    }catch(error){
      window.prompt('아래 링크를 복사해주세요.',value);
    }
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

    document.querySelectorAll('[data-track-button]').forEach(button=>button.addEventListener('click',()=>switchTrack(button.dataset.trackButton)));
    document.querySelectorAll('[data-open-course]').forEach(button=>button.addEventListener('click',()=>openLesson(button.dataset.openCourse)));
    document.querySelectorAll('[data-complete-course]').forEach(input=>input.addEventListener('change',()=>{
      const progress=readProgress();
      progress[input.dataset.completeCourse]=input.checked;
      writeProgress(progress);
      syncProgress();
    }));

    if(resetProgress)resetProgress.addEventListener('click',()=>{
      try{localStorage.removeItem(STORAGE_KEY)}catch(error){}
      syncProgress();
    });
    if(dialogClose)dialogClose.addEventListener('click',()=>dialog.close());
    if(dialog)dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
    if(createLinksButton)createLinksButton.addEventListener('click',makeLinks);
    if(agentInput)agentInput.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();makeLinks()}});
    document.querySelectorAll('[data-copy-link]').forEach(button=>button.addEventListener('click',()=>copyLink(button.dataset.copyLink,button)));
  }

  function init(){
    root.classList.add('js-enabled');
    const queryAgent=getQueryAgent();
    if(queryAgent&&agentInput)agentInput.value=queryAgent;
    propagateAgent(queryAgent);
    bind();
    switchTrack('before');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

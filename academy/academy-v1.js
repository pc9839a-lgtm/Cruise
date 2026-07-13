(function(){
  'use strict';

  const STORAGE_KEY='cruiseplay_academy_progress_v3';
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

  const lessons={
    'membership-overview':{
      kicker:'01 · MEMBERSHIP',
      title:'크루즈 멤버십 한눈에',
      intro:'크루즈와 호텔을 예약할 때 사용할 수 있는 여행 멤버십입니다.',
      items:[
        '무료 플랜부터 유료 플랜까지 선택할 수 있습니다.',
        '유료 플랜은 매월 포인트가 적립됩니다.',
        '적립한 포인트는 크루즈와 호텔 예약에 사용할 수 있습니다.',
        '실제 혜택과 적용 범위는 가입 및 예약 시점의 안내를 확인해야 합니다.'
      ],
      actions:[{label:'멤버십 페이지 보기',href:'/membership/'}]
    },
    'membership-plans':{
      kicker:'02 · PLAN & COST',
      title:'플랜과 비용',
      intro:'내 여행 계획과 납부 가능한 금액에 맞춰 플랜을 선택합니다.',
      items:[
        '게스트는 월 납부 없이 먼저 둘러볼 수 있는 무료 플랜입니다.',
        '스타터는 월 $50, 클래식은 월 $100, 프리미엄은 월 $250 기준입니다.',
        '클래식과 프리미엄은 시작 비용과 가입 시 리워드가 다릅니다.',
        '원화 금액은 환율에 따라 달라질 수 있습니다.'
      ],
      actions:[{label:'플랜 비교 보기',href:'/membership/#plans'}]
    },
    'membership-points':{
      kicker:'03 · POINT',
      title:'포인트 적립',
      intro:'플랜에 따라 가입 시 혜택과 매월 적립 포인트가 달라집니다.',
      items:[
        '무료 가입 시 50P 혜택이 제공될 수 있습니다.',
        '스타터는 월 $50 납부 시 50P 적립 기준입니다.',
        '클래식은 월 $100 납부 시 200P 적립 기준입니다.',
        '프리미엄은 월 $250 납부 시 500P 적립 기준입니다.'
      ],
      actions:[{label:'포인트 내용 보기',href:'/membership/#earn-points'}]
    },
    'membership-booking':{
      kicker:'04 · BOOKING',
      title:'예약할 때 쓰는 법',
      intro:'일반 예약과 출발일이 많이 남은 예약은 포인트 사용 범위가 다릅니다.',
      items:[
        '일반 예약은 포인트를 최대 50%까지 사용할 수 있습니다.',
        '나머지 금액은 카드로 결제합니다.',
        '270일 이후 출발 예약은 조건 충족 시 포인트 사용 범위가 커질 수 있습니다.',
        '예약 상품과 시점에 따라 실제 적용 조건이 달라질 수 있습니다.'
      ],
      actions:[{label:'포인트 계산 보기',href:'/membership/#calculator'}]
    },
    'partner-role':{
      kicker:'05 · PARTNER',
      title:'파트너는 무슨 일을 하나',
      intro:'모든 내용을 외우기보다 관심 있는 사람에게 필요한 페이지를 안내합니다.',
      items:[
        '크루즈 사진이나 여행 정보를 콘텐츠로 올립니다.',
        '여행 혜택이 궁금한 사람에게 멤버십 페이지를 안내합니다.',
        '파트너 활동이 궁금한 사람에게 파트너 페이지를 안내합니다.',
        '남은 질문만 직접 답하거나 상담으로 연결합니다.'
      ],
      actions:[{label:'파트너 페이지 보기',href:'/partner/'}]
    },
    'partner-content':{
      kicker:'06 · CONTENT',
      title:'첫 콘텐츠 올리기',
      intro:'처음부터 전문적인 글을 만들 필요는 없습니다.',
      items:[
        '직접 찍은 크루즈 사진 한 장에서 시작할 수 있습니다.',
        '사진에서 좋았던 점이나 궁금했던 점을 짧게 적습니다.',
        '가격과 혜택은 확인된 내용만 사용합니다.',
        '관심을 보인 사람에게 관련 페이지를 안내합니다.'
      ],
      actions:[{label:'크루즈 콘텐츠 보기',href:'/blog/'}]
    },
    'partner-reply':{
      kicker:'07 · QUESTION',
      title:'문의가 왔을 때',
      intro:'길게 설득하지 말고 확인된 사실만 짧게 답합니다.',
      items:[
        '가입비와 월 비용은 선택한 플랜에 따라 다릅니다.',
        '포인트 사용 범위는 예약 조건에 따라 다릅니다.',
        '무료 여행과 보상은 활동 및 지급 조건 충족이 필요합니다.',
        '모르는 내용은 추측하지 말고 상담으로 연결합니다.'
      ],
      actions:[{label:'상담 문의 연결',href:'/partner/#partner-form'}]
    },
    'partner-signup':{
      kicker:'08 · SIGNUP',
      title:'가입 연결 전 확인',
      intro:'상대가 충분히 확인하고 본인이 결정한 뒤 가입하도록 안내합니다.',
      items:[
        '가입 전 플랜과 월 비용을 다시 확인합니다.',
        '포인트 사용 조건과 유의사항을 함께 확인합니다.',
        '보상이나 무료 여행을 보장하는 표현은 사용하지 않습니다.',
        '가입 후에는 로그인과 결제 상태를 먼저 확인합니다.'
      ],
      actions:[{label:'가입 전 멤버십 보기',href:'/membership/'}]
    },
    'membership-caution':{
      kicker:'09 · BEFORE SIGNUP',
      title:'가입 전 유의사항',
      intro:'혜택만 보지 말고 환불과 유지 조건까지 확인한 뒤 결정하세요.',
      items:[
        '가입 후 14일이 지나면 환불이 제한될 수 있습니다.',
        '월 납부액은 현금처럼 출금할 수 없습니다.',
        '본인 명의 카드로만 결제할 수 있습니다.',
        '예약 후 탑승 시점까지 멤버십 유지가 필요할 수 있습니다.',
        '해지 시 추가 적립 포인트가 소멸될 수 있습니다.'
      ],
      actions:[{label:'멤버십 조건 다시 보기',href:'/membership/'}]
    }
  };

  function readProgress(){
    try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(error){return{}}
  }

  function writeProgress(progress){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress))}catch(error){}
  }

  function syncProgress(){
    const progress=readProgress();
    const cards=[...document.querySelectorAll('[data-course-id]')];
    cards.forEach(card=>{
      const id=card.dataset.courseId;
      const done=Boolean(progress[id]);
      card.classList.toggle('is-complete',done);
      const input=card.querySelector('[data-complete-course]');
      if(input)input.checked=done;
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

  function openLesson(id){
    const lesson=lessons[id];
    if(!lesson||!dialog)return;
    dialogKicker.textContent=lesson.kicker;
    dialogTitle.textContent=lesson.title;
    dialogBody.innerHTML='<p>'+lesson.intro+'</p><ul>'+lesson.items.map(item=>'<li>'+item+'</li>').join('')+'</ul>';
    dialogActions.replaceChildren();

    lesson.actions.forEach(action=>{
      const link=document.createElement('a');
      link.textContent=action.label;
      link.href=action.href;
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
  }

  function init(){
    root.classList.add('js-enabled');
    bind();
    applyFilter('all');
    syncProgress();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
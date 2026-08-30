(() => {
  'use strict';

  const SESSION_KEY = 'cruiseMembershipSurveyCompletedV1';
  const RESULT_KEY = 'cruiseMembershipSurveyResultV1';
  const params = new URLSearchParams(window.location.search);
  const forceSurvey = params.get('survey') === '1';

  if (!forceSurvey) {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return;
    } catch (_) {}
  }

  const questions = [
    {
      id: 'experience',
      title: '크루즈 여행\n해보셨나요?',
      options: [
        { value: 'yes', icon: '🚢', title: '해봤어요' },
        { value: 'no', icon: '🌊', title: '처음이에요' }
      ]
    },
    {
      id: 'booking',
      title: '여행 준비는\n어떤 편이세요?',
      options: [
        { value: 'agency', icon: '🙋', title: '여행사에 맡기는 게 편해요' },
        { value: 'direct', icon: '🔎', title: '직접 비교·예약해도 괜찮아요' }
      ]
    },
    {
      id: 'priceChoice',
      title: '가이드는 없습니다.\n대신, 전세계 최저가로 갑니다.',
      priceCompare: true,
      options: [
        { value: 'comfort', icon: '🛎️', title: '그래도 편하게 맡길래요' },
        { value: 'save', icon: '💰', title: '80만원 아낄래요' }
      ]
    }
  ];

  const answers = {};
  let current = 0;
  let overlay;
  let panel;
  let previousOverflow = '';

  const style = document.createElement('style');
  style.id = 'cruise-membership-entry-survey-style';
  style.textContent = `
    :root {
      --cms-text:#0f1931;
      --cms-muted:#637393;
      --cms-blue:#2e66ff;
      --cms-blue-strong:#24519c;
      --cms-line:rgba(12,24,48,.09);
      --cms-shadow:0 22px 60px rgba(17,30,64,.10);
    }

    .cms-survey-overlay,.cms-survey-overlay *{box-sizing:border-box}
    .cms-survey-overlay{
      position:fixed;inset:0;z-index:2147483000;width:100%;min-height:100vh;min-height:100dvh;
      overflow-y:auto;color:var(--cms-text);
      background:linear-gradient(180deg,#fbfcff 0%,#f5f7fb 56%,#eef3fa 100%);
      font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      -webkit-font-smoothing:antialiased;
    }
    .cms-survey-shell{
      width:min(calc(100% - 32px),1080px);min-height:100vh;min-height:100dvh;margin:0 auto;padding:30px 0 44px;
      display:flex;flex-direction:column;
    }
    .cms-survey-top{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:20px}
    .cms-survey-brand,.cms-survey-progress-text{font-size:20px;line-height:1.2;font-weight:950}
    .cms-survey-brand{color:var(--cms-blue-strong)}
    .cms-survey-progress{width:100%;height:10px;border-radius:999px;background:#dfe8fb;overflow:hidden}
    .cms-survey-progress>span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--cms-blue),var(--cms-blue-strong));transition:width .25s ease}
    .cms-survey-panel{flex:1;display:flex;align-items:center;justify-content:center;padding:42px 0 24px}
    .cms-survey-card,.cms-result{width:100%;animation:cmsIn .22s ease both}
    @keyframes cmsIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

    .cms-survey-title{
      max-width:980px;margin:0 auto 44px;text-align:center;white-space:pre-line;
      font-size:clamp(54px,7vw,90px);line-height:1.02;letter-spacing:-.065em;font-weight:950;word-break:keep-all;
    }
    .cms-survey-options{width:min(100%,920px);margin:0 auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
    .cms-survey-option{
      appearance:none;width:100%;min-height:190px;padding:28px;border:1px solid var(--cms-line);border-radius:34px;
      background:rgba(255,255,255,.96);box-shadow:var(--cms-shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:18px;color:var(--cms-text);text-align:center;font:inherit;cursor:pointer;
      transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease,background .15s ease;
    }
    .cms-survey-option:hover,.cms-survey-option:focus-visible{outline:none;transform:translateY(-3px);border-color:rgba(46,102,255,.42);box-shadow:0 24px 64px rgba(46,102,255,.16)}
    .cms-survey-option.is-selected{border-color:var(--cms-blue);background:#f5f8ff;box-shadow:0 0 0 5px rgba(46,102,255,.10),0 24px 64px rgba(46,102,255,.16)}
    .cms-survey-option-icon{font-size:48px;line-height:1}
    .cms-survey-option-title{display:block;font-size:clamp(28px,3vw,36px);line-height:1.18;letter-spacing:-.045em;font-weight:950;word-break:keep-all}
    .cms-survey-back{display:block;margin:30px auto 0;padding:14px 20px;border:0;background:transparent;color:var(--cms-muted);font:inherit;font-size:22px;font-weight:900;cursor:pointer}

    .cms-question-price{
      width:min(100%,960px);margin:-10px auto 28px;display:grid;grid-template-columns:1fr auto 1fr;gap:18px;align-items:center;
    }
    .cms-question-price-card{
      min-height:180px;padding:24px;border:1px solid var(--cms-line);border-radius:30px;background:#fff;box-shadow:var(--cms-shadow);
      display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
    }
    .cms-question-price-card.direct{border:3px solid rgba(46,102,255,.40);background:linear-gradient(180deg,#fff,#f3f7ff)}
    .cms-question-price-label{font-size:clamp(24px,2.5vw,30px);font-weight:950;letter-spacing:-.04em}
    .cms-question-price-value{margin-top:8px;font-size:clamp(58px,8vw,98px);line-height:.95;letter-spacing:-.075em;font-weight:950;white-space:nowrap}
    .cms-question-price-card.direct .cms-question-price-value{color:var(--cms-blue)}
    .cms-question-price-badge{display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;padding:8px 14px;border-radius:999px;background:rgba(46,102,255,.10);color:var(--cms-blue-strong);font-size:20px;font-weight:950}
    .cms-question-price-vs{font-size:26px;font-weight:950;color:var(--cms-muted)}
    .cms-question-saving{margin:-6px auto 30px;text-align:center;font-size:clamp(32px,4vw,50px);font-weight:950;letter-spacing:-.055em}
    .cms-question-saving strong{color:var(--cms-blue)}

    .cms-result-kicker{display:block;margin-bottom:14px;text-align:center;color:var(--cms-blue-strong);font-size:clamp(24px,2.5vw,32px);font-weight:950;letter-spacing:-.04em}
    .cms-result-title{max-width:980px;margin:0 auto 34px;text-align:center;font-size:clamp(50px,6.8vw,82px);line-height:1.02;letter-spacing:-.065em;font-weight:950;word-break:keep-all}
    .cms-result-title strong{color:var(--cms-blue)}
    .cms-result-big{
      width:min(100%,900px);margin:0 auto;padding:36px 24px;border-radius:34px;background:var(--cms-text);color:#fff;text-align:center;
    }
    .cms-result-big span{display:block;font-size:clamp(30px,3.8vw,46px);font-weight:950;letter-spacing:-.05em}
    .cms-result-big strong{display:block;margin-top:8px;font-size:clamp(58px,8vw,102px);line-height:.95;letter-spacing:-.075em;color:#8aaaff}
    .cms-result-mini{width:min(100%,900px);margin:18px auto 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .cms-result-mini>div{min-height:150px;border-radius:28px;background:#fff;border:1px solid var(--cms-line);box-shadow:var(--cms-shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px}
    .cms-result-mini span{font-size:22px;font-weight:900}
    .cms-result-mini strong{margin-top:6px;font-size:clamp(40px,5vw,62px);font-weight:950;letter-spacing:-.06em}
    .cms-result-mini .direct strong{color:var(--cms-blue)}
    .cms-result-actions{width:min(100%,680px);margin:28px auto 0;display:grid;gap:8px}
    .cms-survey-primary,.cms-survey-secondary{appearance:none;border:0;font:inherit;font-weight:950;cursor:pointer}
    .cms-survey-primary{min-height:80px;padding:0 28px;border-radius:999px;background:linear-gradient(135deg,var(--cms-blue),var(--cms-blue-strong));color:#fff;box-shadow:0 18px 38px rgba(46,102,255,.24);font-size:clamp(24px,2.8vw,32px)}
    .cms-survey-secondary{min-height:52px;background:transparent;color:var(--cms-muted);font-size:21px}

    @media(max-width:720px){
      .cms-survey-shell{width:min(calc(100% - 24px),680px);padding:20px 0 28px}
      .cms-survey-brand,.cms-survey-progress-text{font-size:18px}
      .cms-survey-progress{height:8px}
      .cms-survey-panel{align-items:flex-start;padding:46px 0 18px}
      .cms-survey-title{margin-bottom:32px;font-size:clamp(44px,12vw,62px)}
      .cms-survey-options{grid-template-columns:1fr;gap:16px}
      .cms-survey-option{min-height:132px;border-radius:26px;padding:22px 18px;flex-direction:row;justify-content:flex-start;text-align:left}
      .cms-survey-option-icon{flex:0 0 auto;width:60px;font-size:40px;text-align:center}
      .cms-survey-option-title{font-size:27px}
      .cms-question-price{grid-template-columns:1fr 1fr;gap:10px;margin:-6px auto 18px}
      .cms-question-price-vs{display:none}
      .cms-question-price-card{min-height:150px;padding:14px 8px;border-radius:22px}
      .cms-question-price-badge{font-size:17px;padding:6px 10px;margin-bottom:7px}
      .cms-question-price-label{font-size:19px}
      .cms-question-price-value{font-size:clamp(42px,13vw,62px)}
      .cms-question-saving{margin:0 auto 24px;font-size:clamp(30px,8vw,40px)}
      .cms-result-kicker{font-size:22px}
      .cms-result-title{font-size:clamp(42px,11vw,58px);margin-bottom:26px}
      .cms-result-big{padding:28px 16px;border-radius:26px}
      .cms-result-big span{font-size:clamp(28px,7vw,36px)}
      .cms-result-big strong{font-size:clamp(56px,16vw,82px)}
      .cms-result-mini{grid-template-columns:1fr 1fr;gap:10px}
      .cms-result-mini>div{min-height:130px;border-radius:22px;padding:14px 8px}
      .cms-result-mini span{font-size:18px}
      .cms-result-mini strong{font-size:clamp(36px,11vw,52px)}
      .cms-survey-primary{min-height:74px;font-size:25px}
      .cms-survey-secondary{font-size:20px}
    }

    @media(max-width:430px){
      .cms-survey-panel{padding-top:34px}
      .cms-survey-title{font-size:43px}
      .cms-survey-option{min-height:122px}
      .cms-survey-option-title{font-size:25px}
      .cms-question-price-badge{font-size:16px}
      .cms-question-price-label{font-size:18px}
      .cms-question-price-value{font-size:42px}
      .cms-result-title{font-size:40px}
      .cms-result-mini strong{font-size:40px}
    }

    @media(prefers-reduced-motion:reduce){.cms-survey-card,.cms-result{animation:none}.cms-survey-option,.cms-survey-progress>span{transition:none}}
  `;

  document.head.appendChild(style);

  function esc(value){
    return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function buildShell(){
    overlay=document.createElement('div');
    overlay.className='cms-survey-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','크루즈 여행 설문');
    overlay.innerHTML=`
      <div class="cms-survey-shell">
        <div class="cms-survey-top">
          <div class="cms-survey-brand">나에게 맞는 크루즈 여행</div>
          <div class="cms-survey-progress-text" aria-live="polite"></div>
        </div>
        <div class="cms-survey-progress" aria-hidden="true"><span></span></div>
        <div class="cms-survey-panel"></div>
      </div>`;
    panel=overlay.querySelector('.cms-survey-panel');
    previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    document.body.appendChild(overlay);
  }

  function updateProgress(step,isResult=false){
    const text=overlay.querySelector('.cms-survey-progress-text');
    const bar=overlay.querySelector('.cms-survey-progress>span');
    if(isResult){text.textContent='결과';bar.style.width='100%';return}
    text.textContent=`${step+1} / ${questions.length}`;
    bar.style.width=`${((step+1)/questions.length)*100}%`;
  }

  function pricePreview(){
    return `
      <div class="cms-question-price" aria-label="4박 5일 아시아 크루즈 가격 예시">
        <div class="cms-question-price-card">
          <span class="cms-question-price-label">가이드 패키지 예시</span>
          <strong class="cms-question-price-value">200만원</strong>
        </div>
        <span class="cms-question-price-vs">VS</span>
        <div class="cms-question-price-card direct">
          <span class="cms-question-price-badge">전세계 최저가 보장</span>
          <span class="cms-question-price-label">직접 예약 예시</span>
          <strong class="cms-question-price-value">120만원</strong>
        </div>
      </div>
      <div class="cms-question-saving">같은 크루즈, <strong>1인 80만원 차이</strong></div>`;
  }

  function renderQuestion(){
    const q=questions[current];
    updateProgress(current);
    panel.innerHTML=`
      <div class="cms-survey-card">
        <h1 class="cms-survey-title">${esc(q.title)}</h1>
        ${q.priceCompare?pricePreview():''}
        <div class="cms-survey-options">
          ${q.options.map(option=>`
            <button type="button" class="cms-survey-option${answers[q.id]===option.value?' is-selected':''}" data-value="${esc(option.value)}">
              <span class="cms-survey-option-icon" aria-hidden="true">${esc(option.icon)}</span>
              <strong class="cms-survey-option-title">${esc(option.title)}</strong>
            </button>`).join('')}
        </div>
        ${current>0?'<button type="button" class="cms-survey-back">← 이전</button>':''}
      </div>`;

    panel.querySelectorAll('.cms-survey-option').forEach(button=>{
      button.addEventListener('click',()=>{
        answers[q.id]=button.dataset.value;
        panel.querySelectorAll('.cms-survey-option').forEach(el=>el.classList.remove('is-selected'));
        button.classList.add('is-selected');
        window.setTimeout(()=>{
          if(current<questions.length-1){current+=1;renderQuestion()}else{renderResult()}
        },120);
      });
    });

    const back=panel.querySelector('.cms-survey-back');
    if(back) back.addEventListener('click',()=>{current=Math.max(0,current-1);renderQuestion()});
  }

  function getResult(){
    const experienced=answers.experience==='yes';
    const agency=answers.booking==='agency';
    const save=answers.priceChoice==='save';

    if(agency&&!save){
      return{
        id:'agency-comfort',
        kicker:experienced?'크루즈 경험자 · 편의 우선':'크루즈 처음 · 편의 우선',
        title:'당신은\n여행사 패키지가 더 잘 맞습니다',
        type:'comfort',
        bigLabel:'가격보다 편안함이 우선',
        bigValue:'약 200만원',
        cta:'그래도 최저가 비교해보기'
      };
    }

    if(!agency&&save){
      return{
        id:'direct-saving',
        kicker:experienced?'크루즈 경험자 · 최저가 자유여행형':'크루즈 처음 · 최저가 자유여행형',
        title:'당신은\n크루즈 멤버십이 잘 맞습니다',
        type:'saving',
        bigLabel:'가이드는 없지만',
        bigValue:'전세계 최저가',
        cta:'전세계 최저가 크루즈 보기'
      };
    }

    if(agency&&save){
      return{
        id:'agency-saving',
        kicker:experienced?'크루즈 경험자 · 가격 비교형':'크루즈 처음 · 가격 비교형',
        title:'80만원 차이라면\n직접 예약도 괜찮으시네요',
        type:'saving',
        bigLabel:'1인',
        bigValue:'80만원 ↓',
        cta:'최저가 크루즈 멤버십 보기'
      };
    }

    return{
      id:'direct-comfort',
      kicker:experienced?'크루즈 경험자 · 편의 중심 자유여행형':'크루즈 처음 · 편의 중심 자유여행형',
      title:'직접 예약은 가능하지만\n편한 여행이 더 중요합니다',
      type:'comfort',
      bigLabel:'가격보다 편안함이 우선',
      bigValue:'직접 선택',
      cta:'최저가 방식도 비교해보기'
    };
  }

  function resultBody(result){
    if(result.type==='saving'){
      return `
        <div class="cms-result-big">
          <span>${esc(result.bigLabel)}</span>
          <strong>${esc(result.bigValue)}</strong>
        </div>
        <div class="cms-result-mini">
          <div><span>가이드 패키지</span><strong>200만원</strong></div>
          <div class="direct"><span>최저가 직접 예약</span><strong>120만원</strong></div>
        </div>`;
    }

    return `
      <div class="cms-result-big">
        <span>${esc(result.bigLabel)}</span>
        <strong>${esc(result.bigValue)}</strong>
      </div>`;
  }

  function renderResult(){
    updateProgress(questions.length-1,true);
    const result=getResult();
    const payload={result:result.id,answers:{...answers},completedAt:new Date().toISOString()};
    try{sessionStorage.setItem(RESULT_KEY,JSON.stringify(payload))}catch(_){}

    if(Array.isArray(window.dataLayer)){
      window.dataLayer.push({
        event:'membership_travel_survey_complete',
        survey_result:result.id,
        survey_experience:answers.experience,
        survey_booking:answers.booking,
        survey_price_choice:answers.priceChoice
      });
    }

    panel.innerHTML=`
      <div class="cms-result">
        <span class="cms-result-kicker">${esc(result.kicker)}</span>
        <h1 class="cms-result-title">${esc(result.title)}</h1>
        ${resultBody(result)}
        <div class="cms-result-actions">
          <button type="button" class="cms-survey-primary">${esc(result.cta)}</button>
          <button type="button" class="cms-survey-secondary">다시 선택</button>
        </div>
      </div>`;

    panel.querySelector('.cms-survey-primary').addEventListener('click',finishSurvey);
    panel.querySelector('.cms-survey-secondary').addEventListener('click',()=>{
      Object.keys(answers).forEach(key=>delete answers[key]);
      current=0;renderQuestion();
    });
  }

  function finishSurvey(){
    try{sessionStorage.setItem(SESSION_KEY,'1')}catch(_){}
    overlay.style.transition='opacity .2s ease';
    overlay.style.opacity='0';
    window.setTimeout(()=>{
      overlay.remove();
      document.body.style.overflow=previousOverflow;
      window.scrollTo({top:0,left:0,behavior:'auto'});
    },200);
  }

  function start(){
    if(!document.body||document.querySelector('.cms-survey-overlay'))return;
    buildShell();renderQuestion();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
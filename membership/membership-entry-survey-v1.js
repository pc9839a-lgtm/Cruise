(() => {
  'use strict';

  const SESSION_KEY = 'cruiseMembershipSurveyCompletedV1';
  const RESULT_KEY = 'cruiseMembershipSurveyResultV1';
  const forceSurvey = new URLSearchParams(location.search).get('survey') === '1';

  if (!forceSurvey) {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return;
    } catch (_) {}
  }

  const answers = {};
  let step = 0;
  let overlay;
  let panel;
  let previousOverflow = '';

  const QUESTIONS = [
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
        { value: 'direct', icon: '🔎', title: '직접 예약해도 괜찮아요' }
      ]
    }
  ];

  const style = document.createElement('style');
  style.id = 'cruise-membership-entry-survey-style';
  style.textContent = `
    :root{--cms-text:#0f1931;--cms-muted:#637393;--cms-blue:#2e66ff;--cms-blue-strong:#24519c;--cms-line:rgba(12,24,48,.09);--cms-shadow:0 22px 60px rgba(17,30,64,.10)}
    .cms-survey-overlay,.cms-survey-overlay *{box-sizing:border-box}
    .cms-survey-overlay{position:fixed;inset:0;z-index:2147483000;overflow:auto;min-height:100dvh;color:var(--cms-text);background:linear-gradient(180deg,#fbfcff,#f5f7fb 56%,#eef3fa);font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
    .cms-survey-shell{width:min(calc(100% - 32px),1080px);min-height:100dvh;margin:auto;padding:30px 0 44px;display:flex;flex-direction:column}
    .cms-survey-top{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:20px}
    .cms-survey-brand,.cms-survey-progress-text{font-size:20px;font-weight:950}.cms-survey-brand{color:var(--cms-blue-strong)}
    .cms-survey-progress{height:10px;border-radius:999px;background:#dfe8fb;overflow:hidden}.cms-survey-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--cms-blue),var(--cms-blue-strong));transition:width .2s ease}
    .cms-survey-panel{flex:1;display:flex;align-items:center;justify-content:center;padding:42px 0 24px}.cms-survey-card,.cms-result{width:100%;animation:cmsIn .2s ease both}@keyframes cmsIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .cms-survey-title,.cms-result-title{max-width:980px;margin:0 auto;text-align:center;white-space:pre-line;word-break:keep-all;letter-spacing:-.06em;font-weight:950;line-height:1.04}
    .cms-survey-title{margin-bottom:38px;font-size:clamp(54px,7vw,90px)}
    .cms-survey-options{width:min(100%,920px);margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
    .cms-survey-option{appearance:none;min-height:190px;padding:28px;border:1px solid var(--cms-line);border-radius:34px;background:#fff;box-shadow:var(--cms-shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;color:var(--cms-text);font:inherit;cursor:pointer;text-align:center}.cms-survey-option:focus-visible,.cms-survey-option:hover{outline:none;border-color:rgba(46,102,255,.45);transform:translateY(-2px)}
    .cms-survey-option-icon{font-size:48px}.cms-survey-option-title{font-size:clamp(28px,3vw,36px);line-height:1.18;letter-spacing:-.045em;font-weight:950;word-break:keep-all}
    .cms-survey-back{display:block;margin:28px auto 0;padding:12px 20px;border:0;background:transparent;color:var(--cms-muted);font:inherit;font-size:21px;font-weight:900;cursor:pointer}
    .cms-price-box{width:min(100%,880px);margin:0 auto 28px;padding:30px 24px;border-radius:32px;background:linear-gradient(135deg,#24519c,#2e66ff);color:#fff;text-align:center;box-shadow:var(--cms-shadow)}
    .cms-price-value{display:block;font-size:clamp(58px,8vw,100px);line-height:.95;letter-spacing:-.075em;font-weight:950}.cms-price-note{display:block;margin-top:10px;font-size:clamp(21px,2.4vw,27px);font-weight:900;color:rgba(255,255,255,.86)}
    .cms-result{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.cms-result-title{font-size:clamp(48px,6.4vw,78px);margin-bottom:14px}.cms-result-sub{max-width:760px;margin:0;color:var(--cms-muted);font-size:clamp(22px,2.5vw,30px);line-height:1.35;font-weight:850;word-break:keep-all}.cms-result-actions{width:min(100%,680px);margin:30px auto 0;display:grid;gap:6px}
    .cms-survey-primary,.cms-survey-secondary{appearance:none;border:0;font:inherit;font-weight:950;cursor:pointer}.cms-survey-primary{min-height:80px;padding:0 28px;border-radius:999px;background:linear-gradient(135deg,var(--cms-blue),var(--cms-blue-strong));color:#fff;box-shadow:0 18px 38px rgba(46,102,255,.24);font-size:clamp(24px,2.8vw,32px)}.cms-survey-secondary{min-height:48px;background:transparent;color:var(--cms-muted);font-size:20px}
    @media(max-width:720px){.cms-survey-shell{width:min(calc(100% - 24px),680px);padding:20px 0 28px}.cms-survey-brand,.cms-survey-progress-text{font-size:18px}.cms-survey-progress{height:8px}.cms-survey-panel{align-items:flex-start;padding-top:46px}.cms-survey-title{font-size:clamp(44px,12vw,62px);margin-bottom:30px}.cms-survey-options{grid-template-columns:1fr;gap:16px}.cms-survey-option{min-height:132px;border-radius:26px;padding:22px 18px;flex-direction:row;justify-content:flex-start;text-align:left}.cms-survey-option-icon{width:60px;font-size:40px;text-align:center}.cms-survey-option-title{font-size:27px}.cms-price-box{padding:24px 14px;border-radius:24px}.cms-price-value{font-size:clamp(54px,15vw,78px)}.cms-price-note{font-size:22px}.cms-result-title{font-size:clamp(40px,10.5vw,56px)}.cms-result-sub{font-size:21px}.cms-survey-primary{min-height:74px;font-size:25px}}
    @media(max-width:430px){.cms-survey-panel{padding-top:34px}.cms-survey-title{font-size:42px}.cms-survey-option{min-height:122px}.cms-survey-option-title{font-size:25px}.cms-result-title{font-size:39px}}
    @media(prefers-reduced-motion:reduce){.cms-survey-card,.cms-result{animation:none}.cms-survey-progress span{transition:none}}
  `;
  document.head.appendChild(style);

  const esc = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

  function buildShell(){
    overlay = document.createElement('div');
    overlay.className = 'cms-survey-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.innerHTML = `<div class="cms-survey-shell"><div class="cms-survey-top"><div class="cms-survey-brand">나에게 맞는 크루즈 여행</div><div class="cms-survey-progress-text"></div></div><div class="cms-survey-progress"><span></span></div><div class="cms-survey-panel"></div></div>`;
    panel = overlay.querySelector('.cms-survey-panel');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(overlay);
  }

  function updateProgress(result=false){
    const text = overlay.querySelector('.cms-survey-progress-text');
    const bar = overlay.querySelector('.cms-survey-progress span');
    if(result){text.textContent='결과';bar.style.width='100%';return;}
    const total = answers.booking === 'agency' || step < 1 ? 3 : 2;
    text.textContent = `${step + 1} / ${total}`;
    bar.style.width = `${((step + 1) / total) * 100}%`;
  }

  function thirdQuestion(){
    const experienced = answers.experience === 'yes';
    return {
      id:'priceChoice',
      title: experienced ? '이미 타봤다면\n가격 차이도 보시겠어요?' : '처음이라 여행사가 편하시군요.\n가격 차이가 이 정도라면?',
      options:[
        {value:'comfort',icon:'🛎️',title:'그래도 여행사에 맡길래요'},
        {value:'save',icon:'💰',title:experienced?'80만원이면 직접 예약할래요':'80만원이면 직접 해볼래요'}
      ]
    };
  }

  function renderQuestion(){
    const q = step === 2 ? thirdQuestion() : QUESTIONS[step];
    updateProgress(false);
    panel.innerHTML = `<div class="cms-survey-card"><h1 class="cms-survey-title">${esc(q.title)}</h1>${step===2?'<div class="cms-price-box"><strong class="cms-price-value">200 → 120만원</strong><span class="cms-price-note">1인 80만원 차이</span></div>':''}<div class="cms-survey-options">${q.options.map(o=>`<button type="button" class="cms-survey-option" data-value="${esc(o.value)}"><span class="cms-survey-option-icon">${esc(o.icon)}</span><strong class="cms-survey-option-title">${esc(o.title)}</strong></button>`).join('')}</div>${step>0?'<button type="button" class="cms-survey-back">← 이전</button>':''}</div>`;

    panel.querySelectorAll('.cms-survey-option').forEach(btn=>btn.addEventListener('click',()=>{
      answers[q.id] = btn.dataset.value;
      setTimeout(()=>{
        if(step===0){step=1;renderQuestion();return;}
        if(step===1){
          if(answers.booking==='direct'){renderResult();return;}
          step=2;renderQuestion();return;
        }
        renderResult();
      },100);
    }));

    const back = panel.querySelector('.cms-survey-back');
    if(back) back.addEventListener('click',()=>{step=Math.max(0,step-1);renderQuestion();});
  }

  function getResult(){
    const experienced = answers.experience === 'yes';
    const direct = answers.booking === 'direct';
    const save = answers.priceChoice === 'save';

    if(direct){
      return experienced ? {
        id:'exp-direct-ready',
        title:'이미 타봤다면? 이번에는',
        sub:'전세계 최저가로',
        cta:'80만원 아끼는 방법 보기',
        target:'#why-direct'
      } : {
        id:'new-direct-ready',
        title:'가이드 없이 최저가로',
        sub:'',
        cta:'80만원 아끼는 방법 보기',
        target:'#why-direct'
      };
    }

    if(save){
      return experienced ? {
        id:'exp-agency-save',
        title:'이미 경험이 있다면 더 간단합니다',
        sub:'',
        cta:'80만원 아끼는 방법 보기',
        target:'#why-direct'
      } : {
        id:'new-agency-save',
        title:'80만원 차이면 직접 해볼 만하죠',
        sub:'가이드 없이 더 낮은 가격으로',
        cta:'80만원 아끼는 방법 보기',
        target:'#why-direct'
      };
    }

    return experienced ? {
      id:'exp-agency-comfort',
      title:'편한 여행이 더 중요하시네요',
      sub:'그래도 같은 크루즈 최저가는 한번 확인해보세요',
      cta:'최저가 확인하기',
      target:'#why-save'
    } : {
      id:'new-agency-comfort',
      title:'처음이라면 편하게 맡기는 게 맞습니다',
      sub:'그래도 가격 차이는 한번 확인해보세요',
      cta:'최저가 확인하기',
      target:'#why-save'
    };
  }

  function renderResult(){
    updateProgress(true);
    const result = getResult();
    const payload = {result:result.id,answers:{...answers},completedAt:new Date().toISOString()};
    try{sessionStorage.setItem(RESULT_KEY,JSON.stringify(payload));}catch(_){}
    if(Array.isArray(window.dataLayer)) window.dataLayer.push({event:'membership_travel_survey_complete',survey_result:result.id,survey_experience:answers.experience,survey_booking:answers.booking,survey_price_choice:answers.priceChoice||'skipped_direct'});

    panel.innerHTML = `<div class="cms-result"><h1 class="cms-result-title">${esc(result.title)}</h1>${result.sub?`<p class="cms-result-sub">${esc(result.sub)}</p>`:''}<div class="cms-result-actions"><button type="button" class="cms-survey-primary">${esc(result.cta)}</button><button type="button" class="cms-survey-secondary">다시 선택</button></div></div>`;

    panel.querySelector('.cms-survey-primary').addEventListener('click',()=>finish(result.target));
    panel.querySelector('.cms-survey-secondary').addEventListener('click',()=>{Object.keys(answers).forEach(k=>delete answers[k]);step=0;renderQuestion();});
  }

  function finish(target){
    try{sessionStorage.setItem(SESSION_KEY,'1');}catch(_){}
    overlay.style.opacity='0';
    overlay.style.transition='opacity .2s ease';
    setTimeout(()=>{
      overlay.remove();
      document.body.style.overflow = previousOverflow;
      const section = document.querySelector(target);
      if(section) section.scrollIntoView({behavior:'smooth',block:'start'});
      else scrollTo({top:0,left:0,behavior:'auto'});
    },200);
  }

  function start(){
    if(!document.body || document.querySelector('.cms-survey-overlay')) return;
    buildShell();
    renderQuestion();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
(() => {
  'use strict';

  const OVERLAY_ID = 'cms-survey-v2';
  if (document.getElementById(OVERLAY_ID)) return;

  const answers = {};
  let step = 0;
  let overlay = null;
  let panel = null;
  let previousOverflow = '';

  const questions = [
    {
      id: 'experience',
      title: '크루즈 여행\n해보셨나요?',
      options: [
        ['yes', '🚢', '해봤어요'],
        ['no', '🌊', '처음이에요']
      ]
    },
    {
      id: 'booking',
      title: '여행 준비는\n어떤 편이세요?',
      options: [
        ['agency', '🙋', '여행사에 맡길래요'],
        ['direct', '🔎', '직접 예약해도 괜찮아요']
      ]
    }
  ];

  function addStyle() {
    if (document.getElementById('cms-survey-v2-style')) return;
    const style = document.createElement('style');
    style.id = 'cms-survey-v2-style';
    style.textContent = `
      #${OVERLAY_ID},#${OVERLAY_ID} *{box-sizing:border-box}
      #${OVERLAY_ID}{position:fixed!important;inset:0!important;z-index:2147483647!important;display:block!important;overflow:auto!important;min-height:100dvh!important;background:linear-gradient(180deg,#fbfcff 0%,#f5f8fc 55%,#edf3fa 100%)!important;color:#0b1730!important;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;pointer-events:auto!important;-webkit-font-smoothing:antialiased}
      #${OVERLAY_ID} .cms2-shell{width:min(calc(100% - 32px),980px);min-height:100dvh;margin:auto;padding:24px 0 36px;display:flex;flex-direction:column}
      #${OVERLAY_ID} .cms2-top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:14px}
      #${OVERLAY_ID} .cms2-brand{font-size:17px;font-weight:900;color:#24519c;letter-spacing:-.03em}
      #${OVERLAY_ID} .cms2-count{font-size:15px;font-weight:900;color:#50627b}
      #${OVERLAY_ID} .cms2-progress{height:6px;border-radius:999px;background:#dfe8f7;overflow:hidden}
      #${OVERLAY_ID} .cms2-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#2e66ff,#24519c);transition:width .22s ease}
      #${OVERLAY_ID} .cms2-panel{flex:1;display:flex;align-items:center;justify-content:center;padding:28px 0 18px}
      #${OVERLAY_ID} .cms2-card{width:min(100%,820px);margin:0 auto;animation:cms2in .22s cubic-bezier(.2,.8,.2,1) both}
      @keyframes cms2in{from{opacity:0;transform:translateY(10px) scale(.992)}to{opacity:1;transform:none}}
      #${OVERLAY_ID} .cms2-title{max-width:820px;margin:0 auto 28px;text-align:center;white-space:pre-line;word-break:keep-all;letter-spacing:-.055em;font-size:clamp(42px,5.5vw,68px);font-weight:900;line-height:1.05}
      #${OVERLAY_ID} .cms2-options{width:100%;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
      #${OVERLAY_ID} .cms2-option{appearance:none!important;position:relative!important;z-index:2!important;min-height:136px;padding:22px;border:1px solid #dfe6f0!important;border-radius:24px!important;background:#fff!important;box-shadow:0 12px 34px rgba(17,30,64,.07)!important;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#0b1730!important;font:inherit!important;cursor:pointer!important;text-align:center;pointer-events:auto!important;touch-action:manipulation;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
      #${OVERLAY_ID} .cms2-option:hover,#${OVERLAY_ID} .cms2-option:focus-visible{outline:none;border-color:rgba(46,102,255,.42)!important;transform:translateY(-2px);box-shadow:0 16px 36px rgba(17,30,64,.10)!important}
      #${OVERLAY_ID} .cms2-option:active{transform:scale(.985)}
      #${OVERLAY_ID} .cms2-icon{font-size:36px;line-height:1;pointer-events:none}
      #${OVERLAY_ID} .cms2-option strong{font-size:25px;line-height:1.18;letter-spacing:-.04em;font-weight:900;word-break:keep-all;pointer-events:none}
      #${OVERLAY_ID} .cms2-back{display:block;margin:18px auto 0;padding:10px 18px;border:0;background:transparent;color:#66758c;font:inherit;font-size:16px;font-weight:850;cursor:pointer}
      #${OVERLAY_ID} .cms2-price{width:100%;margin:0 auto 22px;padding:24px 20px;border-radius:24px;background:linear-gradient(135deg,#24519c,#2e66ff);color:#fff;text-align:center;box-shadow:0 16px 40px rgba(32,83,170,.18)}
      #${OVERLAY_ID} .cms2-price strong{display:block;font-size:clamp(50px,7vw,76px);line-height:.96;letter-spacing:-.07em;font-weight:900}
      #${OVERLAY_ID} .cms2-price span{display:block;margin-top:8px;font-size:20px;font-weight:850;color:rgba(255,255,255,.88)}
      #${OVERLAY_ID} .cms2-result{text-align:center;width:100%;animation:cms2in .22s cubic-bezier(.2,.8,.2,1) both}
      #${OVERLAY_ID} .cms2-result h1{max-width:760px;margin:0 auto;font-size:clamp(38px,5.4vw,60px);line-height:1.08;letter-spacing:-.055em;font-weight:900;word-break:keep-all}
      #${OVERLAY_ID} .cms2-result p{max-width:640px;margin:14px auto 0;color:#62718a;font-size:19px;line-height:1.38;font-weight:750;word-break:keep-all}
      #${OVERLAY_ID} .cms2-primary{display:block;width:min(100%,600px);min-height:64px;margin:24px auto 0;padding:0 24px;border:0;border-radius:18px;background:linear-gradient(135deg,#2e66ff,#24519c);color:#fff;font:inherit;font-size:20px;font-weight:900;cursor:pointer;pointer-events:auto;box-shadow:0 12px 28px rgba(46,102,255,.20)}
      #${OVERLAY_ID} .cms2-reset{display:block;margin:8px auto 0;padding:10px 18px;border:0;background:transparent;color:#687790;font:inherit;font-size:15px;font-weight:800;cursor:pointer}

      @media(max-width:720px){
        #${OVERLAY_ID}{background:#f6f8fc!important}
        #${OVERLAY_ID} .cms2-shell{width:calc(100% - 32px);min-height:100dvh;padding:16px 0 22px}
        #${OVERLAY_ID} .cms2-top{margin-bottom:10px}
        #${OVERLAY_ID} .cms2-brand{font-size:14px}
        #${OVERLAY_ID} .cms2-count{font-size:13px}
        #${OVERLAY_ID} .cms2-progress{height:4px}
        #${OVERLAY_ID} .cms2-panel{align-items:flex-start;padding:clamp(28px,7vh,58px) 0 10px}
        #${OVERLAY_ID} .cms2-card{width:100%;max-width:420px}
        #${OVERLAY_ID} .cms2-title{max-width:360px;font-size:34px;line-height:1.08;letter-spacing:-.05em;margin-bottom:24px}
        #${OVERLAY_ID} .cms2-options{grid-template-columns:1fr;gap:10px;max-width:none}
        #${OVERLAY_ID} .cms2-option{min-height:88px;padding:15px 18px;border-radius:18px!important;display:grid!important;grid-template-columns:42px 1fr;gap:12px;justify-items:start;text-align:left;box-shadow:none!important}
        #${OVERLAY_ID} .cms2-icon{width:42px;font-size:28px;text-align:center}
        #${OVERLAY_ID} .cms2-option strong{font-size:19px;line-height:1.2;letter-spacing:-.035em}
        #${OVERLAY_ID} .cms2-back{margin-top:12px;font-size:14px}
        #${OVERLAY_ID} .cms2-price{max-width:none;margin-bottom:14px;padding:20px 16px;border-radius:20px}
        #${OVERLAY_ID} .cms2-price strong{font-size:48px;line-height:.98}
        #${OVERLAY_ID} .cms2-price span{margin-top:6px;font-size:17px}
        #${OVERLAY_ID} .cms2-result{max-width:420px;margin:0 auto}
        #${OVERLAY_ID} .cms2-result h1{font-size:32px;line-height:1.1}
        #${OVERLAY_ID} .cms2-result p{margin-top:12px;font-size:16px;line-height:1.4}
        #${OVERLAY_ID} .cms2-primary{min-height:56px;margin-top:20px;border-radius:16px;font-size:18px}
        #${OVERLAY_ID} .cms2-reset{font-size:14px}
      }

      @media(max-width:380px){
        #${OVERLAY_ID} .cms2-shell{width:calc(100% - 24px)}
        #${OVERLAY_ID} .cms2-title{font-size:31px}
        #${OVERLAY_ID} .cms2-option{min-height:82px;padding:13px 15px}
        #${OVERLAY_ID} .cms2-option strong{font-size:18px}
        #${OVERLAY_ID} .cms2-price strong{font-size:43px}
      }
    `;
    document.head.appendChild(style);
  }

  function build() {
    addStyle();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `<div class="cms2-shell"><div class="cms2-top"><div class="cms2-brand">크루즈 여행 체크</div><div class="cms2-count"></div></div><div class="cms2-progress"><span></span></div><div class="cms2-panel"></div></div>`;
    document.body.appendChild(overlay);
    panel = overlay.querySelector('.cms2-panel');
    renderQuestion();
  }

  function setProgress(current, total) {
    overlay.querySelector('.cms2-count').textContent = `${current} / ${total}`;
    overlay.querySelector('.cms2-progress span').style.width = `${(current / total) * 100}%`;
  }

  function renderQuestion() {
    const q = questions[step];
    const total = answers.booking === 'agency' || step < 1 ? 3 : 2;
    setProgress(step + 1, total);
    panel.innerHTML = `<div class="cms2-card"><h1 class="cms2-title">${q.title}</h1><div class="cms2-options">${q.options.map(([value, icon, title]) => `<button type="button" class="cms2-option" data-value="${value}"><span class="cms2-icon">${icon}</span><strong>${title}</strong></button>`).join('')}</div>${step > 0 ? '<button type="button" class="cms2-back">← 이전</button>' : ''}</div>`;
  }

  function renderPriceQuestion() {
    setProgress(3, 3);
    panel.innerHTML = `<div class="cms2-card"><h1 class="cms2-title">둘이 가면<br>이 정도 차이</h1><div class="cms2-price"><strong>400 → 240만원</strong><span>2명 160만원 차이</span></div><div class="cms2-options"><button type="button" class="cms2-option" data-price="comfort"><span class="cms2-icon">🛎️</span><strong>그래도 여행사에 맡길래요</strong></button><button type="button" class="cms2-option" data-price="save"><span class="cms2-icon">💰</span><strong>160만원이면 직접 해볼래요</strong></button></div><button type="button" class="cms2-back">← 이전</button></div>`;
  }

  function renderResult() {
    const comfort = answers.priceChoice === 'comfort';
    setProgress(answers.booking === 'agency' ? 3 : 2, answers.booking === 'agency' ? 3 : 2);
    overlay.querySelector('.cms2-count').textContent = '결과';
    const title = comfort ? '가격 차이부터 확인' : '직접 예약 가격 확인';
    const sub = comfort ? '같은 크루즈 기준으로 얼마나 차이 나는지 먼저 보세요.' : '같은 크루즈도 예약 방식에 따라 금액이 달라집니다.';
    panel.innerHTML = `<div class="cms2-result"><h1>${title}</h1><p>${sub}</p><button type="button" class="cms2-primary">가격 비교 보기</button><button type="button" class="cms2-reset">다시 선택</button></div>`;
  }

  function closeSurvey() {
    if (!overlay) return;
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .16s ease';
    setTimeout(() => {
      overlay?.remove();
      document.body.style.overflow = previousOverflow;
      overlay = null;
      panel = null;
      (document.querySelector('#impact-price') || document.querySelector('#price-bridge') || document.querySelector('#price-pain'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 170);
  }

  function reset() {
    Object.keys(answers).forEach(k => delete answers[k]);
    step = 0;
    renderQuestion();
  }

  function handleClick(event) {
    const option = event.target.closest('.cms2-option');
    if (option) {
      if (option.dataset.price) {
        answers.priceChoice = option.dataset.price;
        renderResult();
        return;
      }
      const q = questions[step];
      answers[q.id] = option.dataset.value;
      if (step === 0) {
        step = 1;
        renderQuestion();
        return;
      }
      if (answers.booking === 'agency') renderPriceQuestion();
      else renderResult();
      return;
    }
    if (event.target.closest('.cms2-back')) {
      if (panel.querySelector('[data-price]')) {
        step = 1;
        renderQuestion();
      } else {
        step = Math.max(0, step - 1);
        renderQuestion();
      }
      return;
    }
    if (event.target.closest('.cms2-primary')) {
      closeSurvey();
      return;
    }
    if (event.target.closest('.cms2-reset')) reset();
  }

  function start() {
    if (!document.body || document.getElementById(OVERLAY_ID)) return;
    build();
    overlay.addEventListener('click', handleClick, false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

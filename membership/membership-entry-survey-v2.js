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
        ['agency', '🙋', '여행사에 맡기는 게 편해요'],
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
      #${OVERLAY_ID}{position:fixed!important;inset:0!important;z-index:2147483647!important;display:block!important;overflow:auto!important;min-height:100dvh!important;background:linear-gradient(180deg,#fbfcff,#f5f7fb 56%,#eef3fa)!important;color:#0f1931!important;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;pointer-events:auto!important;-webkit-font-smoothing:antialiased}
      #${OVERLAY_ID} .cms2-shell{width:min(calc(100% - 32px),1080px);min-height:100dvh;margin:auto;padding:30px 0 44px;display:flex;flex-direction:column}
      #${OVERLAY_ID} .cms2-top{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:20px}
      #${OVERLAY_ID} .cms2-brand,#${OVERLAY_ID} .cms2-count{font-size:20px;font-weight:950}
      #${OVERLAY_ID} .cms2-brand{color:#24519c}
      #${OVERLAY_ID} .cms2-progress{height:10px;border-radius:999px;background:#dfe8fb;overflow:hidden}
      #${OVERLAY_ID} .cms2-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#2e66ff,#24519c);transition:width .2s ease}
      #${OVERLAY_ID} .cms2-panel{flex:1;display:flex;align-items:center;justify-content:center;padding:42px 0 24px}
      #${OVERLAY_ID} .cms2-card{width:100%;animation:cms2in .18s ease both}
      @keyframes cms2in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      #${OVERLAY_ID} .cms2-title{max-width:980px;margin:0 auto 38px;text-align:center;white-space:pre-line;word-break:keep-all;letter-spacing:-.06em;font-size:clamp(54px,7vw,90px);font-weight:950;line-height:1.04}
      #${OVERLAY_ID} .cms2-options{width:min(100%,920px);margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
      #${OVERLAY_ID} .cms2-option{appearance:none!important;position:relative!important;z-index:2!important;min-height:190px;padding:28px;border:1px solid rgba(12,24,48,.09)!important;border-radius:34px!important;background:#fff!important;box-shadow:0 22px 60px rgba(17,30,64,.10)!important;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:18px;color:#0f1931!important;font:inherit!important;cursor:pointer!important;text-align:center;pointer-events:auto!important;touch-action:manipulation}
      #${OVERLAY_ID} .cms2-option:hover,#${OVERLAY_ID} .cms2-option:focus-visible{outline:none;border-color:rgba(46,102,255,.45)!important;transform:translateY(-2px)}
      #${OVERLAY_ID} .cms2-icon{font-size:48px;pointer-events:none}
      #${OVERLAY_ID} .cms2-option strong{font-size:clamp(28px,3vw,36px);line-height:1.18;letter-spacing:-.045em;font-weight:950;word-break:keep-all;pointer-events:none}
      #${OVERLAY_ID} .cms2-back{display:block;margin:28px auto 0;padding:12px 20px;border:0;background:transparent;color:#637393;font:inherit;font-size:21px;font-weight:900;cursor:pointer}
      #${OVERLAY_ID} .cms2-price{width:min(100%,880px);margin:0 auto 28px;padding:30px 24px;border-radius:32px;background:linear-gradient(135deg,#24519c,#2e66ff);color:#fff;text-align:center;box-shadow:0 22px 60px rgba(17,30,64,.10)}
      #${OVERLAY_ID} .cms2-price strong{display:block;font-size:clamp(58px,8vw,100px);line-height:.95;letter-spacing:-.075em;font-weight:950}
      #${OVERLAY_ID} .cms2-price span{display:block;margin-top:10px;font-size:clamp(21px,2.4vw,27px);font-weight:900;color:rgba(255,255,255,.86)}
      #${OVERLAY_ID} .cms2-result{text-align:center;width:100%}
      #${OVERLAY_ID} .cms2-result h1{max-width:920px;margin:0 auto;font-size:clamp(48px,6.4vw,78px);line-height:1.06;letter-spacing:-.06em;font-weight:950;word-break:keep-all}
      #${OVERLAY_ID} .cms2-result p{max-width:760px;margin:18px auto 0;color:#637393;font-size:clamp(22px,2.5vw,30px);line-height:1.35;font-weight:800;word-break:keep-all}
      #${OVERLAY_ID} .cms2-primary{display:block;width:min(100%,680px);min-height:80px;margin:30px auto 0;padding:0 28px;border:0;border-radius:999px;background:linear-gradient(135deg,#2e66ff,#24519c);color:#fff;font:inherit;font-size:clamp(24px,2.8vw,32px);font-weight:950;cursor:pointer;pointer-events:auto}
      #${OVERLAY_ID} .cms2-reset{display:block;margin:10px auto 0;padding:12px 20px;border:0;background:transparent;color:#637393;font:inherit;font-size:20px;font-weight:850;cursor:pointer}
      @media(max-width:720px){#${OVERLAY_ID} .cms2-shell{width:min(calc(100% - 24px),680px);padding:20px 0 28px}#${OVERLAY_ID} .cms2-panel{align-items:flex-start;padding-top:46px}#${OVERLAY_ID} .cms2-title{font-size:clamp(44px,12vw,62px);margin-bottom:30px}#${OVERLAY_ID} .cms2-options{grid-template-columns:1fr;gap:16px}#${OVERLAY_ID} .cms2-option{min-height:132px;border-radius:26px!important;padding:22px 18px;flex-direction:row;justify-content:flex-start;text-align:left}#${OVERLAY_ID} .cms2-icon{width:60px;font-size:40px;text-align:center}#${OVERLAY_ID} .cms2-option strong{font-size:27px}#${OVERLAY_ID} .cms2-price{padding:24px 14px;border-radius:24px}#${OVERLAY_ID} .cms2-primary{min-height:74px;font-size:25px}}
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
    overlay.innerHTML = `<div class="cms2-shell"><div class="cms2-top"><div class="cms2-brand">나에게 맞는 크루즈 여행</div><div class="cms2-count"></div></div><div class="cms2-progress"><span></span></div><div class="cms2-panel"></div></div>`;
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
    panel.innerHTML = `<div class="cms2-card"><h1 class="cms2-title">가격 차이가 이 정도라면?</h1><div class="cms2-price"><strong>200 → 120만원</strong><span>1인 80만원 차이</span></div><div class="cms2-options"><button type="button" class="cms2-option" data-price="comfort"><span class="cms2-icon">🛎️</span><strong>그래도 여행사에 맡길래요</strong></button><button type="button" class="cms2-option" data-price="save"><span class="cms2-icon">💰</span><strong>80만원이면 직접 해볼래요</strong></button></div><button type="button" class="cms2-back">← 이전</button></div>`;
  }

  function renderResult() {
    const comfort = answers.priceChoice === 'comfort';
    setProgress(answers.booking === 'agency' ? 3 : 2, answers.booking === 'agency' ? 3 : 2);
    overlay.querySelector('.cms2-count').textContent = '결과';
    const title = comfort ? '편한 여행이 더 중요하시네요' : '그럼 실제 가격 차이부터 보세요';
    const sub = comfort ? '같은 크루즈가 얼마나 차이 나는지만 먼저 확인해보세요.' : '같은 크루즈를 어떤 방식으로 예약하느냐에 따라 금액이 달라집니다.';
    panel.innerHTML = `<div class="cms2-result"><h1>${title}</h1><p>${sub}</p><button type="button" class="cms2-primary">가격 차이 확인하기</button><button type="button" class="cms2-reset">다시 선택</button></div>`;
  }

  function closeSurvey() {
    if (!overlay) return;
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .18s ease';
    setTimeout(() => {
      overlay?.remove();
      document.body.style.overflow = previousOverflow;
      overlay = null;
      panel = null;
      document.querySelector('#price-compare')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 190);
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

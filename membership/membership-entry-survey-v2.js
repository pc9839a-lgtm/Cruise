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
    /* Styles are served by membership-unified.css; do not inject style tags. */
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
    // The landing page must be visible on a normal visit.
    // The original questionnaire remains available by explicit deep link #survey.
    if (window.location.hash !== '#survey') return;
    if (!document.body || document.getElementById(OVERLAY_ID)) return;
    build();
    overlay.addEventListener('click', handleClick, false);
  }

  window.addEventListener('hashchange', start);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

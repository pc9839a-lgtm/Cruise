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
    overlay.innerHTML = `<div class="cms2-shell"><div class="cms2-top"><div class="cms2-brand">크루즈 여행 체크</div><div class="cms2-count"></div><button type="button" class="cms2-close" aria-label="설문 닫기">닫기 ×</button></div><div class="cms2-progress"><span></span></div><div class="cms2-panel"></div></div>`;
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
    const total = questions.length;
    setProgress(step + 1, total);
    panel.innerHTML = `<div class="cms2-card"><h1 class="cms2-title">${q.title}</h1><div class="cms2-options">${q.options.map(([value, icon, title]) => `<button type="button" class="cms2-option" data-value="${value}"><span class="cms2-icon">${icon}</span><strong>${title}</strong></button>`).join('')}</div>${step > 0 ? '<button type="button" class="cms2-back">← 이전</button>' : ''}</div>`;
  }

  function renderResult() {
    const prefersAgency = answers.booking === 'agency';
    setProgress(questions.length, questions.length);
    overlay.querySelector('.cms2-count').textContent = '결과';
    const title = prefersAgency ? '크루즈 비용부터 비교해보세요' : '내 여행비부터 계산해보세요';
    const sub = prefersAgency
      ? '패키지와 직접 예약은 포함 항목이 다를 수 있어 같은 조건으로 비교해야 합니다.'
      : '멤버십 납부액과 예약 시 카드 결제액을 함께 확인할 수 있습니다.';
    panel.innerHTML = `<div class="cms2-result"><h1>${title}</h1><p>${sub}</p><button type="button" class="cms2-primary">가격 비교 보기</button><button type="button" class="cms2-reset">다시 선택</button></div>`;
  }

  function closeSurvey(goToComparison = false) {
    if (!overlay) return;
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .16s ease';
    setTimeout(() => {
      overlay?.remove();
      document.body.style.overflow = previousOverflow;
      overlay = null;
      panel = null;
      if (window.location.hash === '#survey') {
        try { history.replaceState(history.state, '', window.location.pathname + window.location.search); } catch (_) {}
      }
      if (goToComparison) {
        document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
      const q = questions[step];
      answers[q.id] = option.dataset.value;
      if (step === 0) {
        step = 1;
        renderQuestion();
        return;
      }
      renderResult();
      return;
    }
    if (event.target.closest('.cms2-back')) {
      step = Math.max(0, step - 1);
      renderQuestion();
      return;
    }
    if (event.target.closest('.cms2-close')) {
      closeSurvey(false);
      return;
    }
    if (event.target.closest('.cms2-primary')) {
      closeSurvey(true);
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
    overlay.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); closeSurvey(false); }
    });
    overlay.querySelector('.cms2-close')?.focus();
  }

  window.addEventListener('hashchange', start);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

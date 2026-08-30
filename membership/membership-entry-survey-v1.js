(() => {
  'use strict';

  const SESSION_KEY = 'cruiseMembershipSurveyCompletedV1';
  const RESULT_KEY = 'cruiseMembershipSurveyResultV1';
  const params = new URLSearchParams(window.location.search);
  const forceSurvey = params.get('survey') === '1';

  if (!forceSurvey) {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return;
    } catch (_) {
      // sessionStorage가 막힌 환경에서도 설문은 정상 노출한다.
    }
  }

  const questions = [
    {
      id: 'experience',
      eyebrow: 'CRUISE EXPERIENCE',
      title: '크루즈 여행을\n해본 적이 있나요?',
      description: '현재 경험에 가장 가까운 답을 선택해주세요.',
      options: [
        { value: 'yes', icon: '🚢', title: '있다', text: '크루즈 여행 경험이 있다' },
        { value: 'no', icon: '🌊', title: '없다', text: '아직 한 번도 가보지 않았다' }
      ]
    },
    {
      id: 'guide',
      eyebrow: 'TRAVEL STYLE',
      title: '크루즈를 간다면\n어떤 방식이 더 편한가요?',
      description: '가격보다 편의가 중요한지, 직접 선택하는 자유가 중요한지 확인합니다.',
      options: [
        { value: 'guide', icon: '🧭', title: '가이드가 필요하다', text: '비싸더라도 일정과 예약을 챙겨주는 편이 좋다' },
        { value: 'self', icon: '🔎', title: '직접 선택해도 괜찮다', text: '조금 알아보더라도 내가 직접 비교하고 고르는 편이 좋다' }
      ]
    },
    {
      id: 'priority',
      eyebrow: 'TRAVEL PRIORITY',
      title: '여행에서 가장\n중요한 기준은 무엇인가요?',
      description: '한 가지만 고른다면 무엇을 가장 먼저 보시나요?',
      options: [
        { value: 'value', icon: '💰', title: '가성비', text: '좋은 여행을 가능한 합리적인 가격으로 가고 싶다' },
        { value: 'comfort', icon: '🛎️', title: '편안함', text: '조금 더 비싸더라도 준비가 편한 여행이 좋다' },
        { value: 'experience', icon: '✨', title: '특별한 경험', text: '가격보다 새로운 경험과 만족도가 더 중요하다' }
      ]
    },
    {
      id: 'payment',
      eyebrow: 'TRAVEL BUDGET',
      title: '여행 비용은\n어떻게 준비하는 게 편한가요?',
      description: '여행비를 준비하는 방식에 대한 질문입니다.',
      options: [
        { value: 'once', icon: '💳', title: '갈 때 한 번에 결제', text: '여행이 정해지면 그때 비용을 한 번에 내는 편이 좋다' },
        { value: 'monthly', icon: '🪙', title: '미리 조금씩 준비', text: '매달 준비하면서 추가 혜택까지 받을 수 있다면 좋다' }
      ]
    }
  ];

  const answers = {};
  let current = 0;
  let overlay = null;
  let panel = null;
  let previousOverflow = '';

  const style = document.createElement('style');
  style.id = 'cruise-membership-entry-survey-style';
  style.textContent = `
    :root {
      --cms-bg: #07111f;
      --cms-panel: rgba(12, 25, 43, 0.94);
      --cms-line: rgba(255,255,255,.11);
      --cms-text: #f7fbff;
      --cms-muted: #a8b5c7;
      --cms-accent: #55d7ff;
      --cms-accent-2: #78f0d1;
      --cms-shadow: 0 28px 90px rgba(0,0,0,.42);
    }

    .cms-survey-overlay,
    .cms-survey-overlay * { box-sizing: border-box; }

    .cms-survey-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
      overflow-y: auto;
      overscroll-behavior: contain;
      color: var(--cms-text);
      background:
        radial-gradient(circle at 12% 12%, rgba(85,215,255,.20), transparent 30%),
        radial-gradient(circle at 88% 88%, rgba(120,240,209,.13), transparent 32%),
        linear-gradient(145deg, #06101d 0%, #0a1728 55%, #07111f 100%);
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .cms-survey-overlay::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: .28;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 36px 36px;
      mask-image: linear-gradient(to bottom, black, transparent 90%);
    }

    .cms-survey-shell {
      position: relative;
      min-height: 100vh;
      min-height: 100dvh;
      width: min(100%, 860px);
      margin: 0 auto;
      padding: 28px 22px 34px;
      display: flex;
      flex-direction: column;
    }

    .cms-survey-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 40px;
      margin-bottom: 24px;
    }

    .cms-survey-brand {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: .08em;
      color: #dce9f6;
    }

    .cms-survey-brand-dot {
      width: 9px;
      height: 9px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--cms-accent), var(--cms-accent-2));
      box-shadow: 0 0 20px rgba(85,215,255,.7);
    }

    .cms-survey-progress-text {
      color: #d9e4ef;
      font-size: 13px;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }

    .cms-survey-progress {
      height: 4px;
      width: 100%;
      border-radius: 999px;
      background: rgba(255,255,255,.08);
      overflow: hidden;
      margin-bottom: 34px;
    }

    .cms-survey-progress > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--cms-accent), var(--cms-accent-2));
      box-shadow: 0 0 20px rgba(85,215,255,.45);
      transition: width .36s cubic-bezier(.2,.8,.2,1);
    }

    .cms-survey-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      padding: 10px 0 34px;
    }

    .cms-survey-card {
      width: 100%;
      max-width: 720px;
      margin: 0 auto;
      animation: cmsSurveyIn .34s cubic-bezier(.2,.8,.2,1) both;
    }

    @keyframes cmsSurveyIn {
      from { opacity: 0; transform: translateY(12px) scale(.992); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .cms-survey-eyebrow {
      display: block;
      margin-bottom: 13px;
      color: var(--cms-accent);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .13em;
    }

    .cms-survey-title {
      margin: 0;
      white-space: pre-line;
      font-size: clamp(32px, 6vw, 56px);
      line-height: 1.1;
      letter-spacing: -.045em;
      font-weight: 900;
      text-wrap: balance;
    }

    .cms-survey-description {
      margin: 17px 0 28px;
      color: var(--cms-muted);
      font-size: 15px;
      line-height: 1.65;
      font-weight: 550;
    }

    .cms-survey-options {
      display: grid;
      gap: 12px;
    }

    .cms-survey-option {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      min-height: 92px;
      border: 1px solid var(--cms-line);
      border-radius: 20px;
      padding: 17px 18px;
      display: grid;
      grid-template-columns: 42px minmax(0,1fr) 26px;
      align-items: center;
      gap: 14px;
      text-align: left;
      color: var(--cms-text);
      background: rgba(255,255,255,.055);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
      cursor: pointer;
      transition: border-color .18s ease, transform .18s ease, background .18s ease, box-shadow .18s ease;
      font: inherit;
    }

    .cms-survey-option:hover,
    .cms-survey-option:focus-visible {
      outline: none;
      transform: translateY(-2px);
      border-color: rgba(85,215,255,.55);
      background: rgba(85,215,255,.09);
      box-shadow: 0 12px 30px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.05);
    }

    .cms-survey-option.is-selected {
      border-color: var(--cms-accent);
      background: rgba(85,215,255,.14);
      box-shadow: 0 0 0 3px rgba(85,215,255,.09);
    }

    .cms-survey-option-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 13px;
      font-size: 21px;
      background: rgba(255,255,255,.08);
    }

    .cms-survey-option-copy { min-width: 0; }

    .cms-survey-option-copy strong {
      display: block;
      margin-bottom: 4px;
      font-size: 16px;
      line-height: 1.35;
      letter-spacing: -.02em;
    }

    .cms-survey-option-copy span {
      display: block;
      color: #aebdce;
      font-size: 13px;
      line-height: 1.5;
      word-break: keep-all;
    }

    .cms-survey-option-arrow {
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;
      border-radius: 999px;
      color: #cde8f2;
      background: rgba(255,255,255,.07);
      font-size: 14px;
    }

    .cms-survey-back {
      appearance: none;
      -webkit-appearance: none;
      border: 0;
      padding: 10px 0;
      margin-top: 18px;
      color: #91a3b7;
      background: transparent;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .cms-survey-back:hover { color: #dbe7f2; }

    .cms-survey-result-card {
      width: 100%;
      max-width: 720px;
      margin: 0 auto;
      padding: clamp(24px, 5vw, 42px);
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 28px;
      background: linear-gradient(145deg, rgba(255,255,255,.085), rgba(255,255,255,.035));
      box-shadow: var(--cms-shadow), inset 0 1px 0 rgba(255,255,255,.06);
      animation: cmsSurveyIn .42s cubic-bezier(.2,.8,.2,1) both;
    }

    .cms-survey-result-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 18px;
      color: var(--cms-accent-2);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .1em;
    }

    .cms-survey-result-type {
      margin: 0 0 12px;
      font-size: clamp(30px, 6vw, 52px);
      line-height: 1.08;
      letter-spacing: -.05em;
      font-weight: 950;
    }

    .cms-survey-result-copy {
      margin: 0;
      color: #b7c5d4;
      font-size: 15px;
      line-height: 1.7;
      word-break: keep-all;
    }

    .cms-survey-bridge {
      margin: 25px 0 0;
      padding: 20px;
      border-radius: 18px;
      border: 1px solid rgba(85,215,255,.17);
      background: rgba(85,215,255,.075);
    }

    .cms-survey-bridge span {
      display: block;
      color: #90a9bc;
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 7px;
    }

    .cms-survey-bridge strong {
      display: block;
      color: #f7fbff;
      font-size: clamp(19px, 4vw, 25px);
      line-height: 1.35;
      letter-spacing: -.025em;
      word-break: keep-all;
    }

    .cms-survey-result-actions {
      display: grid;
      grid-template-columns: minmax(0,1fr) auto;
      gap: 10px;
      margin-top: 22px;
    }

    .cms-survey-primary,
    .cms-survey-secondary {
      appearance: none;
      -webkit-appearance: none;
      min-height: 54px;
      border-radius: 16px;
      padding: 0 19px;
      border: 0;
      font: inherit;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
    }

    .cms-survey-primary {
      color: #07111f;
      background: linear-gradient(135deg, #67dcff, #78f0d1);
      box-shadow: 0 12px 28px rgba(85,215,255,.19);
    }

    .cms-survey-primary:hover { filter: brightness(1.04); }

    .cms-survey-secondary {
      color: #c2cfdd;
      background: rgba(255,255,255,.075);
      border: 1px solid rgba(255,255,255,.1);
    }

    .cms-survey-footnote {
      margin: 18px 0 0;
      color: #718398;
      font-size: 11px;
      line-height: 1.5;
      text-align: center;
    }

    @media (max-width: 640px) {
      .cms-survey-shell { padding: 20px 16px 24px; }
      .cms-survey-top { margin-bottom: 17px; }
      .cms-survey-progress { margin-bottom: 20px; }
      .cms-survey-panel { justify-content: flex-start; padding-top: 7vh; }
      .cms-survey-description { margin: 14px 0 22px; }
      .cms-survey-option { min-height: 82px; padding: 14px; border-radius: 17px; gap: 11px; }
      .cms-survey-option-icon { width: 38px; height: 38px; font-size: 19px; border-radius: 12px; }
      .cms-survey-result-card { border-radius: 22px; }
      .cms-survey-result-actions { grid-template-columns: 1fr; }
      .cms-survey-secondary { order: 2; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cms-survey-card,
      .cms-survey-result-card { animation: none; }
      .cms-survey-progress > span,
      .cms-survey-option { transition: none; }
    }
  `;

  document.head.appendChild(style);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function buildShell() {
    overlay = document.createElement('div');
    overlay.className = 'cms-survey-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '크루즈 여행 성향 설문');

    overlay.innerHTML = `
      <div class="cms-survey-shell">
        <div class="cms-survey-top">
          <div class="cms-survey-brand"><span class="cms-survey-brand-dot"></span>CRUISE TRAVEL CHECK</div>
          <div class="cms-survey-progress-text" aria-live="polite"></div>
        </div>
        <div class="cms-survey-progress" aria-hidden="true"><span></span></div>
        <div class="cms-survey-panel"></div>
      </div>
    `;

    panel = overlay.querySelector('.cms-survey-panel');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(overlay);
  }

  function updateProgress(step, isResult = false) {
    const progressText = overlay.querySelector('.cms-survey-progress-text');
    const progressBar = overlay.querySelector('.cms-survey-progress > span');

    if (isResult) {
      progressText.textContent = '완료';
      progressBar.style.width = '100%';
      return;
    }

    progressText.textContent = `${step + 1} / ${questions.length}`;
    progressBar.style.width = `${((step + 1) / questions.length) * 100}%`;
  }

  function renderQuestion() {
    const q = questions[current];
    updateProgress(current);

    panel.innerHTML = `
      <div class="cms-survey-card">
        <span class="cms-survey-eyebrow">${escapeHtml(q.eyebrow)}</span>
        <h1 class="cms-survey-title">${escapeHtml(q.title)}</h1>
        <p class="cms-survey-description">${escapeHtml(q.description)}</p>
        <div class="cms-survey-options">
          ${q.options.map((option) => `
            <button type="button" class="cms-survey-option${answers[q.id] === option.value ? ' is-selected' : ''}" data-value="${escapeHtml(option.value)}">
              <span class="cms-survey-option-icon" aria-hidden="true">${escapeHtml(option.icon)}</span>
              <span class="cms-survey-option-copy">
                <strong>${escapeHtml(option.title)}</strong>
                <span>${escapeHtml(option.text)}</span>
              </span>
              <span class="cms-survey-option-arrow" aria-hidden="true">›</span>
            </button>
          `).join('')}
        </div>
        ${current > 0 ? '<button type="button" class="cms-survey-back">← 이전 질문</button>' : ''}
      </div>
    `;

    panel.querySelectorAll('.cms-survey-option').forEach((button) => {
      button.addEventListener('click', () => {
        answers[q.id] = button.dataset.value;
        panel.querySelectorAll('.cms-survey-option').forEach((el) => el.classList.remove('is-selected'));
        button.classList.add('is-selected');

        window.setTimeout(() => {
          if (current < questions.length - 1) {
            current += 1;
            renderQuestion();
          } else {
            renderResult();
          }
        }, 170);
      });
    });

    const back = panel.querySelector('.cms-survey-back');
    if (back) {
      back.addEventListener('click', () => {
        current = Math.max(0, current - 1);
        renderQuestion();
      });
    }

    const firstOption = panel.querySelector('.cms-survey-option');
    if (firstOption) window.setTimeout(() => firstOption.focus({ preventScroll: true }), 30);
  }

  function getResult() {
    const valueSignals = [
      answers.guide === 'self',
      answers.priority === 'value',
      answers.payment === 'monthly'
    ].filter(Boolean).length;

    const comfortSignals = [
      answers.guide === 'guide',
      answers.priority === 'comfort'
    ].filter(Boolean).length;

    if (valueSignals >= 2) {
      return {
        id: 'value',
        label: '가성비 자유여행형',
        copy: '좋은 여행은 포기하고 싶지 않지만, 불필요한 비용은 줄이고 직접 비교해서 선택하는 데 거부감이 적은 여행 성향입니다.',
        bridge: '이런 여행자를 위한 크루즈 멤버십이 있습니다.'
      };
    }

    if (comfortSignals >= 2) {
      return {
        id: 'comfort',
        label: '편의 우선 여행형',
        copy: '가격 차이가 있더라도 일정과 예약을 편하게 맡기는 것을 중요하게 생각하는 여행 성향입니다.',
        bridge: '내 여행 방식과 멤버십 방식이 어떻게 다른지 먼저 비교해보세요.'
      };
    }

    if (answers.priority === 'experience') {
      return {
        id: 'experience',
        label: '경험 중심 여행형',
        copy: '가격만 보기보다 새로운 여행 경험과 만족도를 중요하게 생각하고, 선택지가 넓은 여행을 선호하는 성향입니다.',
        bridge: '더 다양한 크루즈를 선택하는 멤버십 방식을 확인해보세요.'
      };
    }

    return {
      id: 'balanced',
      label: '균형형 여행자',
      copy: '가격과 편안함을 한쪽으로 치우치지 않고, 실제 혜택과 여행 방식을 비교한 뒤 결정하는 여행 성향입니다.',
      bridge: '크루즈 멤버십이 어떤 방식인지 직접 확인하고 비교해보세요.'
    };
  }

  function renderResult() {
    updateProgress(questions.length - 1, true);
    const result = getResult();

    const payload = {
      result: result.id,
      resultLabel: result.label,
      answers: { ...answers },
      completedAt: new Date().toISOString()
    };

    try {
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload));
    } catch (_) {}

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'membership_travel_survey_complete',
        survey_result: result.id,
        survey_experience: answers.experience,
        survey_guide: answers.guide,
        survey_priority: answers.priority,
        survey_payment: answers.payment
      });
    }

    try {
      window.dispatchEvent(new CustomEvent('cruiseMembershipSurveyComplete', { detail: payload }));
    } catch (_) {}

    panel.innerHTML = `
      <div class="cms-survey-result-card">
        <span class="cms-survey-result-kicker">✓ YOUR TRAVEL STYLE</span>
        <h1 class="cms-survey-result-type">${escapeHtml(result.label)}</h1>
        <p class="cms-survey-result-copy">${escapeHtml(result.copy)}</p>

        <div class="cms-survey-bridge">
          <span>당신에게 보여드릴 다음 내용</span>
          <strong>${escapeHtml(result.bridge)}</strong>
        </div>

        <div class="cms-survey-result-actions">
          <button type="button" class="cms-survey-primary">크루즈 멤버십 확인하기</button>
          <button type="button" class="cms-survey-secondary">다시 선택</button>
        </div>
        <p class="cms-survey-footnote">응답 결과는 여행 성향을 간단히 구분하기 위한 안내용입니다.</p>
      </div>
    `;

    panel.querySelector('.cms-survey-primary').addEventListener('click', finishSurvey);
    panel.querySelector('.cms-survey-secondary').addEventListener('click', () => {
      Object.keys(answers).forEach((key) => delete answers[key]);
      current = 0;
      renderQuestion();
    });

    window.setTimeout(() => panel.querySelector('.cms-survey-primary')?.focus({ preventScroll: true }), 30);
  }

  function finishSurvey() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (_) {}

    overlay.style.transition = 'opacity .24s ease';
    overlay.style.opacity = '0';
    window.setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = previousOverflow;
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 240);
  }

  function start() {
    if (!document.body || document.querySelector('.cms-survey-overlay')) return;
    buildShell();
    renderQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

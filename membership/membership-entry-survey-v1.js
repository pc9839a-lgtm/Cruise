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
      eyebrow: '01. 크루즈 경험',
      title: '크루즈 여행을\n해본 적이 있나요?',
      description: '현재 경험에 가장 가까운 답을 선택해주세요.',
      options: [
        { value: 'yes', icon: '🚢', title: '있다', text: '크루즈 여행 경험이 있다' },
        { value: 'no', icon: '🌊', title: '없다', text: '아직 한 번도 가보지 않았다' }
      ]
    },
    {
      id: 'guide',
      eyebrow: '02. 여행 방식',
      title: '크루즈를 간다면\n어떤 방식이 더 편한가요?',
      description: '내가 여행에서 중요하게 생각하는 방식을 선택해주세요.',
      options: [
        { value: 'guide', icon: '🧭', title: '가이드가 필요하다', text: '비싸더라도 일정과 예약을 챙겨주는 편이 좋다' },
        { value: 'self', icon: '🔎', title: '직접 선택해도 괜찮다', text: '조금 알아보더라도 내가 직접 비교하고 고르는 편이 좋다' }
      ]
    },
    {
      id: 'priority',
      eyebrow: '03. 여행 기준',
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
      eyebrow: '04. 여행 비용',
      title: '여행 비용은\n어떻게 준비하는 게 편한가요?',
      description: '여행비를 준비하는 방식에 가장 가까운 답을 골라주세요.',
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
    .cms-survey-overlay,
    .cms-survey-overlay * { box-sizing: border-box; }

    .cms-survey-overlay {
      --cms-bg: #f4f7fc;
      --cms-surface: rgba(255,255,255,.90);
      --cms-surface-2: #eef3fb;
      --cms-line: rgba(12,24,48,.08);
      --cms-text: #0f1931;
      --cms-muted: #637393;
      --cms-blue: #2e66ff;
      --cms-blue-2: #4a7dff;
      --cms-blue-strong: #24519c;
      --cms-navy: #0b1730;
      --cms-shadow: 0 22px 60px rgba(17,30,64,.08);
      --cms-shadow-soft: 0 18px 40px rgba(46,102,255,.16);

      position: fixed;
      inset: 0;
      z-index: 2147483000;
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
      overflow-y: auto;
      overscroll-behavior: contain;
      color: var(--cms-text);
      background: linear-gradient(180deg,#fbfcff 0%,#f5f7fb 54%,#eef3fa 100%);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .cms-survey-overlay::before,
    .cms-survey-overlay::after {
      content: '';
      position: fixed;
      pointer-events: none;
      border-radius: 999px;
      filter: blur(4px);
      opacity: .55;
    }

    .cms-survey-overlay::before {
      width: 320px;
      height: 320px;
      left: -150px;
      top: 90px;
      background: radial-gradient(circle, rgba(74,125,255,.12), rgba(74,125,255,0) 70%);
    }

    .cms-survey-overlay::after {
      width: 420px;
      height: 420px;
      right: -210px;
      bottom: -80px;
      background: radial-gradient(circle, rgba(36,81,156,.10), rgba(36,81,156,0) 70%);
    }

    .cms-survey-shell {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      min-height: 100dvh;
      width: min(calc(100% - 40px), 1120px);
      margin: 0 auto;
      padding: 28px 0 34px;
      display: flex;
      flex-direction: column;
    }

    .cms-survey-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 48px;
      margin-bottom: 14px;
    }

    .cms-survey-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--cms-navy);
      font-size: 14px;
      font-weight: 900;
      letter-spacing: -.02em;
    }

    .cms-survey-brand-mark {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border-radius: 11px;
      color: #fff;
      background: linear-gradient(135deg,var(--cms-blue) 0%,var(--cms-blue-strong) 100%);
      box-shadow: 0 10px 24px rgba(46,102,255,.18);
      font-size: 15px;
      font-weight: 950;
    }

    .cms-survey-progress-text {
      min-width: 60px;
      min-height: 36px;
      padding: 0 13px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      border: 1px solid var(--cms-line);
      background: rgba(255,255,255,.82);
      color: var(--cms-blue-strong);
      font-size: 13px;
      font-weight: 900;
      font-variant-numeric: tabular-nums;
    }

    .cms-survey-progress {
      height: 5px;
      width: 100%;
      margin-bottom: 22px;
      border-radius: 999px;
      background: rgba(46,102,255,.09);
      overflow: hidden;
    }

    .cms-survey-progress > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg,var(--cms-blue) 0%,var(--cms-blue-2) 100%);
      transition: width .34s cubic-bezier(.2,.8,.2,1);
    }

    .cms-survey-panel {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px 0 44px;
    }

    .cms-survey-card,
    .cms-survey-result-card {
      position: relative;
      width: 100%;
      max-width: 980px;
      margin: 0 auto;
      padding: clamp(34px,5vw,64px);
      border: 1px solid rgba(12,24,48,.07);
      border-radius: 34px;
      background: rgba(255,255,255,.88);
      box-shadow: var(--cms-shadow);
      overflow: hidden;
      animation: cmsSurveyIn .34s cubic-bezier(.2,.8,.2,1) both;
    }

    .cms-survey-card::before,
    .cms-survey-result-card::before {
      content: '';
      position: absolute;
      width: 280px;
      height: 280px;
      right: -100px;
      top: -110px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(46,102,255,.12), rgba(46,102,255,0) 68%);
      pointer-events: none;
    }

    @keyframes cmsSurveyIn {
      from { opacity: 0; transform: translateY(12px) scale(.992); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .cms-survey-eyebrow,
    .cms-survey-result-kicker {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      min-height: 42px;
      padding: 0 18px;
      margin-bottom: 18px;
      border-radius: 999px;
      background: rgba(46,102,255,.10);
      color: var(--cms-blue-strong);
      font-size: 14px;
      font-weight: 900;
      letter-spacing: -.02em;
    }

    .cms-survey-title,
    .cms-survey-result-type {
      position: relative;
      margin: 0;
      color: var(--cms-text);
      white-space: pre-line;
      font-size: clamp(38px,5.4vw,70px);
      line-height: 1.02;
      letter-spacing: -.065em;
      font-weight: 950;
      word-break: keep-all;
      text-wrap: balance;
    }

    .cms-survey-title strong,
    .cms-survey-result-type strong { color: var(--cms-blue); }

    .cms-survey-description,
    .cms-survey-result-copy {
      position: relative;
      max-width: 720px;
      margin: 18px 0 30px;
      color: var(--cms-muted);
      font-size: 16px;
      line-height: 1.7;
      font-weight: 600;
      word-break: keep-all;
    }

    .cms-survey-options {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2,minmax(0,1fr));
      gap: 14px;
      margin-top: 8px;
    }

    .cms-survey-options.is-three {
      grid-template-columns: repeat(3,minmax(0,1fr));
    }

    .cms-survey-option {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      min-height: 132px;
      padding: 22px;
      display: grid;
      grid-template-columns: 48px minmax(0,1fr) 28px;
      align-items: center;
      gap: 15px;
      border: 1px solid rgba(12,24,48,.08);
      border-radius: 24px;
      text-align: left;
      color: var(--cms-navy);
      background: rgba(255,255,255,.94);
      box-shadow: 0 14px 34px rgba(15,25,49,.055);
      cursor: pointer;
      transition: border-color .18s ease,transform .18s ease,background .18s ease,box-shadow .18s ease;
      font: inherit;
    }

    .cms-survey-option:hover,
    .cms-survey-option:focus-visible {
      outline: none;
      transform: translateY(-3px);
      border-color: rgba(46,102,255,.35);
      background: #fff;
      box-shadow: 0 18px 40px rgba(46,102,255,.12);
    }

    .cms-survey-option.is-selected {
      border-color: var(--cms-blue);
      background: rgba(46,102,255,.055);
      box-shadow: 0 0 0 3px rgba(46,102,255,.07),0 18px 40px rgba(46,102,255,.12);
    }

    .cms-survey-option-icon {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border-radius: 15px;
      background: var(--cms-surface-2);
      font-size: 23px;
    }

    .cms-survey-option-copy { min-width: 0; }

    .cms-survey-option-copy strong {
      display: block;
      margin-bottom: 7px;
      color: var(--cms-navy);
      font-size: 17px;
      line-height: 1.35;
      letter-spacing: -.035em;
      font-weight: 900;
      word-break: keep-all;
    }

    .cms-survey-option-copy span {
      display: block;
      color: var(--cms-muted);
      font-size: 13px;
      line-height: 1.55;
      font-weight: 600;
      word-break: keep-all;
    }

    .cms-survey-option-arrow {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 999px;
      color: var(--cms-blue);
      background: rgba(46,102,255,.09);
      font-size: 17px;
      font-weight: 900;
    }

    .cms-survey-back {
      appearance: none;
      -webkit-appearance: none;
      position: relative;
      margin-top: 22px;
      padding: 10px 4px;
      border: 0;
      color: var(--cms-muted);
      background: transparent;
      font: inherit;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }

    .cms-survey-back:hover { color: var(--cms-blue-strong); }

    .cms-survey-result-card {
      max-width: 900px;
      text-align: center;
    }

    .cms-survey-result-kicker { margin-inline: auto; }

    .cms-survey-result-type {
      font-size: clamp(40px,5.5vw,68px);
      color: var(--cms-blue);
    }

    .cms-survey-result-copy {
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .cms-survey-bridge {
      position: relative;
      max-width: 720px;
      margin: 28px auto 0;
      padding: 25px 26px;
      border: 1px solid rgba(46,102,255,.12);
      border-radius: 24px;
      background: rgba(46,102,255,.07);
    }

    .cms-survey-bridge span {
      display: block;
      margin-bottom: 8px;
      color: var(--cms-blue-strong);
      font-size: 13px;
      font-weight: 900;
    }

    .cms-survey-bridge strong {
      display: block;
      color: var(--cms-navy);
      font-size: clamp(21px,3vw,29px);
      line-height: 1.35;
      letter-spacing: -.045em;
      font-weight: 950;
      word-break: keep-all;
    }

    .cms-survey-result-actions {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 24px;
    }

    .cms-survey-primary,
    .cms-survey-secondary {
      appearance: none;
      -webkit-appearance: none;
      position: relative;
      overflow: hidden;
      min-height: 56px;
      padding: 0 24px;
      border-radius: 999px;
      font: inherit;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
    }

    .cms-survey-primary {
      min-width: 240px;
      border: 0;
      color: #fff;
      background: linear-gradient(135deg,#2e66ff 0%,#24519c 100%);
      box-shadow: 0 14px 30px rgba(46,102,255,.22);
    }

    .cms-survey-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(110deg,transparent 0%,rgba(255,255,255,.28) 40%,transparent 70%);
      transform: translateX(-140%);
      transition: transform .9s ease;
    }

    .cms-survey-primary:hover::after { transform: translateX(140%); }

    .cms-survey-secondary {
      border: 1px solid rgba(12,24,48,.08);
      color: var(--cms-navy);
      background: rgba(255,255,255,.88);
      box-shadow: 0 12px 28px rgba(15,25,49,.06);
    }

    .cms-survey-footnote {
      position: relative;
      margin: 18px 0 0;
      color: #8794aa;
      font-size: 11px;
      line-height: 1.5;
      text-align: center;
    }

    @media (max-width: 760px) {
      .cms-survey-shell { width: min(calc(100% - 28px),1120px); padding: 18px 0 24px; }
      .cms-survey-top { min-height: 42px; margin-bottom: 11px; }
      .cms-survey-brand { font-size: 12px; }
      .cms-survey-brand-mark { width: 31px; height: 31px; border-radius: 10px; font-size: 13px; }
      .cms-survey-progress-text { min-height: 32px; min-width: 54px; font-size: 12px; }
      .cms-survey-progress { margin-bottom: 12px; }
      .cms-survey-panel { align-items: flex-start; padding: 3vh 0 24px; }
      .cms-survey-card,.cms-survey-result-card { padding: 28px 20px 24px; border-radius: 26px; }
      .cms-survey-eyebrow,.cms-survey-result-kicker { min-height: 36px; padding: 0 14px; margin-bottom: 14px; font-size: 12px; }
      .cms-survey-title,.cms-survey-result-type { font-size: clamp(34px,10.5vw,48px); line-height: 1.04; }
      .cms-survey-description,.cms-survey-result-copy { margin: 14px 0 22px; font-size: 14px; }
      .cms-survey-options,.cms-survey-options.is-three { grid-template-columns: 1fr; gap: 10px; }
      .cms-survey-option { min-height: 92px; padding: 15px; border-radius: 19px; grid-template-columns: 42px minmax(0,1fr) 24px; gap: 12px; }
      .cms-survey-option-icon { width: 42px; height: 42px; border-radius: 13px; font-size: 20px; }
      .cms-survey-option-copy strong { margin-bottom: 4px; font-size: 16px; }
      .cms-survey-option-copy span { font-size: 12px; }
      .cms-survey-option-arrow { width: 24px; height: 24px; font-size: 15px; }
      .cms-survey-back { margin-top: 14px; }
      .cms-survey-bridge { margin-top: 22px; padding: 20px 16px; border-radius: 19px; }
      .cms-survey-result-actions { flex-direction: column; }
      .cms-survey-primary,.cms-survey-secondary { width: 100%; min-height: 54px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cms-survey-card,.cms-survey-result-card { animation: none; }
      .cms-survey-progress > span,.cms-survey-option,.cms-survey-primary::after { transition: none; }
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

  function titleHtml(title) {
    const lines = String(title).split('\n').map(escapeHtml);
    if (lines.length < 2) return lines[0];
    return `${lines[0]}<br><strong>${lines.slice(1).join('<br>')}</strong>`;
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
          <div class="cms-survey-brand"><span class="cms-survey-brand-mark">C</span><span>CRUISE TRAVEL CHECK</span></div>
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
        <h1 class="cms-survey-title">${titleHtml(q.title)}</h1>
        <p class="cms-survey-description">${escapeHtml(q.description)}</p>
        <div class="cms-survey-options${q.options.length === 3 ? ' is-three' : ''}">
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
        }, 160);
      });
    });

    const back = panel.querySelector('.cms-survey-back');
    if (back) {
      back.addEventListener('click', () => {
        current = Math.max(0, current - 1);
        renderQuestion();
      });
    }
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

    try { sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload)); } catch (_) {}

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
        <span class="cms-survey-result-kicker">여행스타일 확인 완료</span>
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
  }

  function finishSurvey() {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (_) {}

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
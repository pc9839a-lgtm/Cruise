const DEFAULT_RATE = 1486.89;
const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';

const plans = [
  {
    tag: '일반',
    name: '클래식',
    monthlyUsd: 100,
    startUsd: 200,
    rewardPoint: 350,
    monthlyPoint: 200
  },
  {
    tag: '추천',
    name: '프리미엄',
    monthlyUsd: 250,
    startUsd: 500,
    rewardPoint: 800,
    monthlyPoint: 500,
    recommended: true
  }
];

const notices = [
  '가입 후 14일이 지나면 환불은 어렵습니다.',
  '월회비는 현금처럼 출금되지 않습니다.',
  '본인 명의 카드로만 결제할 수 있습니다.',
  '예약한 크루즈를 이용하려면 멤버십 유지가 필요합니다.',
  '포인트 유효기간은 없지만, 해지하면 2배 적립분은 사라지고 원금만 남습니다.'
];

const state = {
  exchangeRate: DEFAULT_RATE,
  mode: 'general',
  membershipSignupUrl: '',
  agentCode: ''
};

const AGENT_API_URL = 'https://script.google.com/macros/s/AKfycbwcgILUioi3I3ndTIrnlZ9KtdN-YxpwCQaLEcradUc1vDZfsa-jSwllYfSdOju4vj8/exec';

function formatUsd(value) {
  return `$${Number(value).toLocaleString('en-US')}`;
}

function formatKrw(value) {
  return `₩${Math.round(Number(value)).toLocaleString('ko-KR')}`;
}

function formatPoint(value) {
  return `${Number(value).toLocaleString('ko-KR')}P`;
}

function updateRangeBackground(range) {
  const min = Number(range.min);
  const max = Number(range.max);
  const value = Number(range.value);
  const percent = ((value - min) / (max - min)) * 100;
  range.style.background = `linear-gradient(90deg, #2e66ff 0%, #2e66ff ${percent}%, rgba(12,24,48,0.16) ${percent}%, rgba(12,24,48,0.16) 100%)`;
}

function syncPlanGridColumns() {
  const wrap = document.getElementById('planCards');
  if (!wrap) return;

  const isMobile = window.matchMedia('(max-width: 720px)').matches;

  wrap.style.gridTemplateColumns = isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))';
  wrap.style.maxWidth = isMobile ? '100%' : '1000px';
  wrap.style.gap = isMobile ? '14px' : '18px';
  wrap.style.margin = '0 auto';

  wrap.querySelectorAll('.plan-feature-group').forEach((group) => {
    group.style.gridTemplateColumns = isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))';
    group.style.gap = isMobile ? '10px' : '12px';
  });

  wrap.querySelectorAll('.plan-main-line').forEach((line) => {
    const name = line.querySelector('.plan-name');
    const price = line.querySelector('.plan-price');
    const unit = line.querySelector('.plan-price-unit');
    if (name) name.style.fontSize = isMobile ? '29px' : '36px';
    if (price) price.style.fontSize = isMobile ? '48px' : '58px';
    if (unit) unit.style.fontSize = isMobile ? '17px' : '20px';
  });

  wrap.querySelectorAll('.plan-feature-monthly strong').forEach((value) => {
    value.style.fontSize = isMobile ? '60px' : '72px';
  });
}

function renderPlans() {
  const wrap = document.getElementById('planCards');
  if (!wrap) return;

  const plansHeading = document.querySelector('#plans .membership-section-head h2');
  if (plansHeading) {
    plansHeading.innerHTML = '클래식부터<br class="mobile-break" />프리미엄까지!';
  }

  wrap.innerHTML = plans.map((plan) => {
    const monthlyKrw = formatKrw(plan.monthlyUsd * state.exchangeRate);
    const startKrw = formatKrw(plan.startUsd * state.exchangeRate);
    const signupHref = state.membershipSignupUrl || '#';
    const signupAttrs = state.membershipSignupUrl
      ? 'target="_blank" rel="noopener"'
      : '';

    const statBorder = plan.recommended
      ? 'rgba(255,255,255,.18)'
      : 'rgba(15,25,49,.12)';

    return `
      <article class="plan-card reveal ${plan.recommended ? 'recommended' : ''}" style="padding:30px;">
        <span class="plan-tag" style="font-size:16px;font-weight:900;">${plan.tag}</span>

        <div class="plan-main-line" style="margin:24px 0 28px;">
          <div class="plan-name" style="margin:0;line-height:1;font-weight:950;">${plan.name}</div>
          <div class="plan-price-row" style="display:flex;align-items:baseline;gap:4px;margin:14px 0 0;white-space:nowrap;">
            <div class="plan-price" style="line-height:.88;font-weight:950;">${formatUsd(plan.monthlyUsd)}</div>
            <div class="plan-price-unit" style="margin:0;font-weight:900;">/월</div>
          </div>
        </div>

        <div class="plan-mobile-summary" aria-label="모바일 멤버십 요약">
          <div class="plan-mobile-line plan-mobile-line-main">
            <strong>${plan.name}</strong>
            <span>${formatUsd(plan.monthlyUsd)}/월</span>
          </div>
          <div class="plan-mobile-line">
            <em>가입시 리워드</em>
            <strong>${formatPoint(plan.rewardPoint)}</strong>
          </div>
          <div class="plan-mobile-line">
            <em>매월 적립 포인트</em>
            <strong>${formatPoint(plan.monthlyPoint)}</strong>
          </div>
        </div>

        <div class="plan-top-stats" style="gap:0;margin-bottom:22px;border-top:1px solid ${statBorder};">
          <div class="plan-stat" style="min-height:64px;padding:15px 2px;border:0;border-bottom:1px solid ${statBorder};border-radius:0;background:transparent;">
            <span class="label" style="font-size:17px;font-weight:850;">월 비용</span>
            <div class="value" style="font-size:22px;font-weight:950;">${monthlyKrw}</div>
          </div>
          <div class="plan-stat" style="min-height:64px;padding:15px 2px;border:0;border-bottom:1px solid ${statBorder};border-radius:0;background:transparent;">
            <span class="label" style="font-size:17px;font-weight:850;">시작 비용</span>
            <div class="value" style="font-size:22px;font-weight:950;">${startKrw}</div>
          </div>
        </div>

        <div class="plan-feature-group">
          <div class="plan-feature" style="min-height:128px;padding:20px;border-radius:18px;">
            <span class="plan-mini-label" style="font-size:16px;font-weight:850;">가입 시 리워드</span>
            <strong style="margin-top:12px;font-size:44px;font-weight:950;">${formatPoint(plan.rewardPoint)}</strong>
          </div>
          <div class="plan-feature plan-feature-monthly" style="min-height:128px;padding:20px;border-radius:18px;">
            <span class="plan-mini-label" style="font-size:16px;font-weight:850;">매월 적립 포인트</span>
            <strong style="margin-top:8px;font-size:72px;font-weight:950;letter-spacing:-.065em;line-height:.95;">${formatPoint(plan.monthlyPoint)}</strong>
          </div>
        </div>

        <a href="${signupHref}" class="plan-cta" data-plan-signup-link ${signupAttrs} style="margin-top:20px;min-height:62px;font-size:20px;">멤버십 가입하기</a>
      </article>
    `;
  }).join('');

  syncPlanGridColumns();
  observeReveals();
}

function renderNotices() {
  const wrap = document.getElementById('noticeList');
  if (!wrap) return;
  wrap.innerHTML = notices.map((item) => `<li>${item}</li>`).join('');
}

function updateCalculator() {
  const range = document.getElementById('cruisePrice');
  if (!range) return;

  const price = Number(range.value);
  const rate = state.exchangeRate;
  const isEarly = state.mode === 'early';

  let requiredPoints = Math.floor(price * 0.5);
  let cash = price - requiredPoints;
  let coverageText = '일반 예약 예시';
  let description = '환율 자동 연동 완료 · 일반 예약은 포인트를 절반까지 쓰고, 나머지 금액은 카드로 결제합니다!';

  if (isEarly) {
    requiredPoints = Math.floor(price * 1.5);
    cash = 0;
    coverageText = '270일 이후 출발 예시';
    description = '환율 자동 연동 완료 · 270일 이후 출발 예시입니다. 50%는 1:1, 나머지 50%는 1:2 기준이라 전액 포인트 사용이 가능합니다.';
  }

  const actualPaidToEarnPointsUsd = requiredPoints / 2;
  const actualTotalPaidUsd = actualPaidToEarnPointsUsd + cash;
  const actualTotalPaidKrw = actualTotalPaidUsd * rate;

  document.getElementById('rangeValue').textContent = formatUsd(price);
  document.getElementById('cruiseUsd').textContent = formatUsd(price);
  document.getElementById('cruiseKrw').textContent = `약 ${formatKrw(price * rate)}`;

  document.getElementById('pointLabel').textContent = '필요 포인트 예시';
  document.getElementById('usablePoint').textContent = formatPoint(requiredPoints);
  document.getElementById('pointKrw').textContent = `클래식 2배 적립 기준 ${formatUsd(actualPaidToEarnPointsUsd)} · 약 ${formatKrw(actualPaidToEarnPointsUsd * rate)} 결제`;

  document.getElementById('cashLabel').textContent = '나머지 카드 결제';
  document.getElementById('cashUsd').textContent = formatUsd(cash);
  document.getElementById('cashKrw').textContent = `약 ${formatKrw(cash * rate)}`;

  document.getElementById('coverageRatio').textContent = formatUsd(actualTotalPaidUsd);
  document.getElementById('coverageText').textContent = `약 ${formatKrw(actualTotalPaidKrw)}`;
  document.getElementById('coverageSubtext').textContent = coverageText;
  document.getElementById('modeDescription').textContent = description;

  updateRangeBackground(range);
}

function setMode(mode) {
  state.mode = mode;
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  updateCalculator();
}

async function fetchExchangeRate() {
  const rateText = document.getElementById('exchangeRateText');
  const statusText = document.getElementById('exchangeStatus');
  const updatedText = document.getElementById('exchangeUpdated');

  if (!rateText || !statusText || !updatedText) return;

  try {
    const response = await fetch(RATE_API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data?.result !== 'success' || !data?.rates?.KRW) {
      throw new Error('Invalid exchange response');
    }

    state.exchangeRate = Number(data.rates.KRW);
    rateText.textContent = `USD 1 = ${formatKrw(state.exchangeRate)}`;
    statusText.textContent = '환율 자동 연동 완료';
    updatedText.textContent = data.time_last_update_utc || '업데이트 시각 제공 안 됨';
  } catch (error) {
    state.exchangeRate = DEFAULT_RATE;
    rateText.textContent = `USD 1 = ${formatKrw(state.exchangeRate)}`;
    statusText.textContent = '기본 환율로 표시 중';
    updatedText.textContent = 'API 연결 실패 시 기본값 사용';
  }

  renderPlans();
  bindPlanSignupLinks();
  updateCalculator();
}

function getAgentCode() {
  const params = new URLSearchParams(window.location.search);
  return String(params.get('agent') || '').trim();
}

function bindPlanSignupLinks() {
  document.querySelectorAll('[data-plan-signup-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (state.membershipSignupUrl) {
        return;
      }

      event.preventDefault();

      const goContact = window.confirm(
        '담당자가 아직 배정되지 않았습니다. 문의하기로 이동하시겠습니까?'
      );

      if (goContact) {
        window.location.href = 'https://cruiseplay-dyt.pages.dev/?openInquiry=1&inquiryType=membership';
      }
    });
  });
}

function jsonpRequest(url, params) {
  return new Promise((resolve, reject) => {
    const callbackName = '__membershipJsonp_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('jsonp timeout'));
    }, 8000);

    function cleanup() {
      window.clearTimeout(timeoutId);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      try {
        delete window[callbackName];
      } catch (error) {
        window[callbackName] = undefined;
      }
    }

    const query = new URLSearchParams();
    Object.keys(params || {}).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        query.set(key, String(params[key]));
      }
    });
    query.set('callback', callbackName);

    window[callbackName] = function (data) {
      cleanup();
      resolve(data);
    };

    script.onerror = function () {
      cleanup();
      reject(new Error('jsonp load failed'));
    };

    script.src = url + (url.includes('?') ? '&' : '?') + query.toString();
    document.body.appendChild(script);
  });
}

async function loadMembershipSignupUrl() {
  state.agentCode = getAgentCode();

  if (!AGENT_API_URL || !state.agentCode) {
    state.membershipSignupUrl = '';
    renderPlans();
    bindPlanSignupLinks();
    return;
  }

  try {
    const data = await jsonpRequest(AGENT_API_URL, {
      action: 'agent_signup',
      agent: state.agentCode
    });

    if (data && data.success && data.signup_url) {
      state.membershipSignupUrl = String(data.signup_url).trim();
    } else {
      state.membershipSignupUrl = '';
    }

    renderPlans();
    bindPlanSignupLinks();
  } catch (error) {
    state.membershipSignupUrl = '';
    renderPlans();
    bindPlanSignupLinks();
    console.error('membership signup url load failed:', error);
  }
}

function injectConversionSections() {
  if (document.getElementById('conversion-sections-style')) return;

  const style = document.createElement('style');
  style.id = 'conversion-sections-style';
  style.textContent = `
    .cv-section{position:relative;padding:92px 0;overflow:hidden}.cv-section *{box-sizing:border-box}.cv-dark{background:#0f1931;color:#fff}.cv-blue{background:linear-gradient(135deg,#1e4f98 0%,#173766 100%);color:#fff}.cv-soft{background:#f3f6fb}.cv-head{max-width:900px;margin:0 auto 40px;text-align:center}.cv-kicker{display:inline-block;margin-bottom:14px;color:#2e66ff;font-size:14px;font-weight:900;letter-spacing:-.02em}.cv-dark .cv-kicker,.cv-blue .cv-kicker{color:#91b7ff}.cv-head h2{margin:0;font-size:clamp(36px,5vw,66px);line-height:1.02;letter-spacing:-.065em;font-weight:950}.cv-head p{margin:16px 0 0;font-size:20px;line-height:1.5;font-weight:750;color:#667085}.cv-dark .cv-head p,.cv-blue .cv-head p{color:rgba(255,255,255,.76)}
    .cv-price-stage{max-width:1000px;margin:0 auto;text-align:center}.cv-price-line{display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap}.cv-old-price{font-size:clamp(44px,7vw,88px);font-weight:950;letter-spacing:-.07em;color:rgba(255,255,255,.48);text-decoration:line-through;text-decoration-thickness:5px}.cv-arrow{font-size:clamp(34px,5vw,64px);font-weight:900;color:#7aa7ff}.cv-new-price{font-size:clamp(60px,9vw,118px);line-height:.9;font-weight:950;letter-spacing:-.08em;color:#fff}.cv-diff-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;max-width:720px;margin:38px auto 0}.cv-diff{padding:24px;border:1px solid rgba(255,255,255,.13);border-radius:24px;background:rgba(255,255,255,.08)}.cv-diff span{display:block;font-size:15px;font-weight:800;color:rgba(255,255,255,.68)}.cv-diff strong{display:block;margin-top:7px;font-size:clamp(30px,4vw,46px);letter-spacing:-.055em}.cv-cta{display:inline-flex;align-items:center;justify-content:center;min-height:62px;margin-top:30px;padding:0 30px;border:0;border-radius:999px;background:#2e66ff;color:#fff;font-size:19px;font-weight:950;cursor:pointer;box-shadow:0 16px 34px rgba(46,102,255,.3)}
    .cv-identity{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px;max-width:1000px;margin:0 auto}.cv-identity-main{padding:38px;border-radius:30px;background:#0f1931;color:#fff}.cv-identity-main span{font-size:15px;font-weight:850;color:#9db8e4}.cv-identity-main strong{display:block;margin-top:14px;font-size:clamp(38px,5vw,62px);line-height:1.02;letter-spacing:-.065em}.cv-steps{display:grid;gap:12px}.cv-step{display:grid;grid-template-columns:58px 1fr;align-items:center;gap:18px;padding:22px 24px;border-radius:22px;background:#fff;border:1px solid rgba(12,24,48,.08)}.cv-step b{display:flex;width:58px;height:58px;align-items:center;justify-content:center;border-radius:18px;background:#eaf1ff;color:#2e66ff;font-size:22px}.cv-step strong{display:block;font-size:23px;letter-spacing:-.04em}.cv-step span{display:block;margin-top:4px;color:#667085;font-size:15px;font-weight:700}
    .cv-freedom-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:980px;margin:0 auto}.cv-freedom-item{padding:30px 22px;border-radius:26px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.13);text-align:center}.cv-freedom-item span{display:block;font-size:15px;font-weight:800;color:rgba(255,255,255,.65)}.cv-freedom-item strong{display:block;margin-top:9px;font-size:clamp(27px,3vw,38px);letter-spacing:-.055em}.cv-freedom-punch{margin:34px auto 0;text-align:center;font-size:clamp(32px,5vw,58px);font-weight:950;letter-spacing:-.065em}.cv-freedom-punch em{font-style:normal;color:#8db4ff}
    .cv-pay-wrap{max-width:1000px;margin:0 auto}.cv-pay-card{padding:36px;border-radius:30px;background:#fff;border:1px solid rgba(12,24,48,.08);box-shadow:0 20px 50px rgba(15,25,49,.08)}.cv-pay-label{text-align:center;color:#667085;font-size:16px;font-weight:850}.cv-pay-total{text-align:center;margin-top:8px;font-size:clamp(44px,7vw,76px);font-weight:950;letter-spacing:-.065em}.cv-pay-split{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;margin-top:30px}.cv-pay-half{padding:28px;border-radius:24px;background:#eef3fb;text-align:center}.cv-pay-half.blue{background:#1f4f96;color:#fff}.cv-pay-half span{display:block;font-size:15px;font-weight:850;color:#667085}.cv-pay-half.blue span{color:rgba(255,255,255,.7)}.cv-pay-half strong{display:block;margin-top:8px;font-size:clamp(36px,5vw,58px);letter-spacing:-.055em}.cv-plus{font-size:38px;font-weight:900;color:#9aa5b5}.cv-pay-caption{text-align:center;margin-top:20px;font-size:22px;font-weight:950;color:#1f4f96}.cv-accum-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}.cv-accum{padding:28px;border-radius:26px;background:#fff;border:1px solid rgba(12,24,48,.08)}.cv-accum h3{margin:0 0 18px;font-size:25px;letter-spacing:-.045em}.cv-accum-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-top:1px solid #e8ecf2}.cv-accum-row span{font-size:15px;font-weight:800;color:#667085}.cv-accum-row strong{font-size:24px;font-weight:950;letter-spacing:-.04em}.cv-accum-row:last-child strong{color:#2e66ff;font-size:31px}
    .cv-use-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:1000px;margin:0 auto}.cv-use-step{position:relative;padding:28px 22px;border-radius:24px;background:#fff;border:1px solid rgba(12,24,48,.08)}.cv-use-step b{display:block;color:#2e66ff;font-size:13px}.cv-use-step strong{display:block;margin-top:14px;font-size:23px;line-height:1.18;letter-spacing:-.045em}.cv-use-step span{display:block;margin-top:8px;color:#667085;font-size:15px;font-weight:700}.cv-use-step:not(:last-child)::after{content:'→';position:absolute;right:-13px;top:50%;z-index:2;transform:translateY(-50%);font-size:24px;font-weight:900;color:#2e66ff}
    .cv-final-box{max-width:1000px;margin:0 auto;padding:54px 34px;border-radius:34px;background:linear-gradient(135deg,#0f1931 0%,#214f94 100%);color:#fff;text-align:center}.cv-final-box h2{margin:0;font-size:clamp(38px,6vw,72px);line-height:1.02;letter-spacing:-.07em}.cv-final-points{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;margin-top:30px}.cv-final-points span{padding:14px 20px;border-radius:999px;background:rgba(255,255,255,.1);font-size:17px;font-weight:900}.cv-final-box .cv-cta{background:#fff;color:#1f4f96}
    @media(max-width:780px){.cv-section{padding:68px 0}.cv-head{margin-bottom:28px}.cv-head h2{font-size:38px}.cv-head p{font-size:17px}.cv-price-line{gap:12px}.cv-old-price{font-size:42px}.cv-arrow{font-size:32px}.cv-new-price{font-size:68px}.cv-diff-grid,.cv-identity,.cv-freedom-grid,.cv-accum-grid,.cv-use-flow{grid-template-columns:1fr}.cv-identity-main{padding:28px 24px}.cv-step{grid-template-columns:48px 1fr;padding:18px}.cv-step b{width:48px;height:48px}.cv-freedom-item{padding:24px 18px}.cv-pay-card{padding:26px 18px}.cv-pay-split{grid-template-columns:1fr;gap:10px}.cv-plus{transform:rotate(90deg);font-size:28px}.cv-use-step:not(:last-child)::after{content:'↓';right:auto;left:50%;top:auto;bottom:-20px;transform:translateX(-50%)}.cv-final-box{padding:40px 22px;border-radius:28px}.cv-cta{width:100%;margin-top:24px}}
  `;
  document.head.appendChild(style);

  const insertAfter = (selector, html) => {
    const anchor = document.querySelector(selector);
    if (!anchor) return;
    anchor.insertAdjacentHTML('afterend', html);
  };

  insertAfter('.review-flow-section', `
    <section id="cv-price-proof" class="cv-section cv-dark">
      <div class="container">
        <div class="cv-head reveal reveal-rise">
          <span class="cv-kicker">예약 가격 비교 예시</span>
          <h2>같은 크루즈라도<br>예약가는 달라집니다</h2>
        </div>
        <div class="cv-price-stage reveal reveal-scale">
          <div class="cv-price-line">
            <span class="cv-old-price">200만원</span>
            <span class="cv-arrow">→</span>
            <strong class="cv-new-price">120만원</strong>
          </div>
          <div class="cv-diff-grid">
            <div class="cv-diff"><span>1인 기준 차이</span><strong>80만원</strong></div>
            <div class="cv-diff"><span>2인 기준 차이</span><strong>160만원</strong></div>
          </div>
          <button type="button" class="cv-cta cv-scroll-plans">80만원 아끼는 방법 보기</button>
        </div>
      </div>
    </section>
  `);

  insertAfter('#why-direct', `
    <section id="cv-identity" class="cv-section cv-soft">
      <div class="container">
        <div class="cv-head reveal reveal-rise">
          <span class="cv-kicker">인크루즈가 뭔가요?</span>
          <h2>크루즈 예약 멤버십입니다</h2>
        </div>
        <div class="cv-identity">
          <div class="cv-identity-main reveal reveal-left">
            <span>inCruises</span>
            <strong>매달 쌓고<br>여행할 때 씁니다</strong>
          </div>
          <div class="cv-steps">
            <div class="cv-step reveal reveal-right"><b>1</b><div><strong>멤버십 결제</strong><span>클래식 $100 · 프리미엄 $250</span></div></div>
            <div class="cv-step reveal reveal-right"><b>2</b><div><strong>포인트 적립</strong><span>매월 200P · 500P</span></div></div>
            <div class="cv-step reveal reveal-right"><b>3</b><div><strong>크루즈 예약</strong><span>쌓인 포인트를 예약에 사용</span></div></div>
          </div>
        </div>
      </div>
    </section>
  `);

  insertAfter('#plans', `
    <section id="cv-no-contract" class="cv-section cv-blue">
      <div class="container">
        <div class="cv-head reveal reveal-rise">
          <span class="cv-kicker">구독 부담은 낮게</span>
          <h2>매월 구독하지만<br>묶이지 않습니다</h2>
        </div>
        <div class="cv-freedom-grid">
          <div class="cv-freedom-item reveal reveal-left"><span>의무 유지기간</span><strong>약정 없음</strong></div>
          <div class="cv-freedom-item reveal reveal-scale"><span>중도 해지 비용</span><strong>해지 위약금 없음</strong></div>
          <div class="cv-freedom-item reveal reveal-right"><span>여행이 끝난 뒤</span><strong>해지 가능</strong></div>
        </div>
        <div class="cv-freedom-punch reveal reveal-pop">여행 다녀온 뒤 <em>해지해도 됩니다</em></div>
      </div>
    </section>
  `);

  insertAfter('#earn-points', `
    <section id="cv-point-value" class="cv-section cv-soft">
      <div class="container">
        <div class="cv-head reveal reveal-rise">
          <span class="cv-kicker">포인트가 실제로 줄이는 비용</span>
          <h2>쌓일수록<br>카드로 낼 돈이 줄어듭니다</h2>
        </div>
        <div class="cv-pay-wrap">
          <div class="cv-pay-card reveal reveal-scale">
            <div class="cv-pay-label">크루즈 $2,000 예약 예시</div>
            <div class="cv-pay-total">$2,000</div>
            <div class="cv-pay-split">
              <div class="cv-pay-half blue"><span>포인트 50%</span><strong>1,000P</strong></div>
              <div class="cv-plus">+</div>
              <div class="cv-pay-half"><span>카드 50%</span><strong>$1,000</strong></div>
            </div>
            <div class="cv-pay-caption">50% 포인트 + 50% 카드 결제</div>
          </div>

          <div class="cv-accum-grid">
            <div class="cv-accum reveal reveal-left">
              <h3>클래식 · 매월 200P</h3>
              <div class="cv-accum-row"><span>1개월</span><strong>200P</strong></div>
              <div class="cv-accum-row"><span>3개월</span><strong>600P</strong></div>
              <div class="cv-accum-row"><span>6개월</span><strong>1,200P</strong></div>
              <div class="cv-accum-row"><span>12개월</span><strong>2,400P</strong></div>
            </div>
            <div class="cv-accum reveal reveal-right">
              <h3>프리미엄 · 매월 500P</h3>
              <div class="cv-accum-row"><span>1개월</span><strong>500P</strong></div>
              <div class="cv-accum-row"><span>3개월</span><strong>1,500P</strong></div>
              <div class="cv-accum-row"><span>6개월</span><strong>3,000P</strong></div>
              <div class="cv-accum-row"><span>12개월</span><strong>6,000P</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `);

  insertAfter('#calculator', `
    <section id="cv-use-flow" class="cv-section">
      <div class="container">
        <div class="cv-head reveal reveal-rise">
          <span class="cv-kicker">실제 이용 순서</span>
          <h2>원하는 크루즈를 고르고<br>포인트를 쓰면 됩니다</h2>
        </div>
        <div class="cv-use-flow">
          <div class="cv-use-step reveal"><b>STEP 1</b><strong>크루즈 선택</strong><span>날짜 · 선사 · 객실</span></div>
          <div class="cv-use-step reveal"><b>STEP 2</b><strong>포인트 적용</strong><span>쌓인 포인트 사용</span></div>
          <div class="cv-use-step reveal"><b>STEP 3</b><strong>나머지 카드 결제</strong><span>일반 예약 50%</span></div>
          <div class="cv-use-step reveal"><b>STEP 4</b><strong>여행 후 해지 가능</strong><span>약정 · 해지 위약금 없음</span></div>
        </div>
      </div>
    </section>
  `);

  insertAfter('#hotel-benefit', `
    <section id="cv-final" class="cv-section">
      <div class="container">
        <div class="cv-final-box reveal reveal-scale">
          <h2>미리 쌓을수록<br>크루즈는 더 저렴해집니다</h2>
          <div class="cv-final-points">
            <span>$100 → 매월 200P</span>
            <span>$250 → 매월 500P</span>
            <span>약정 없음</span>
            <span>여행 후 해지 가능</span>
          </div>
          <button type="button" class="cv-cta cv-scroll-plans">80만원 아끼는 방법 보기</button>
        </div>
      </div>
    </section>
  `);

  document.querySelectorAll('.cv-scroll-plans').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupPlansFloatingCtaObserver() {
  const plansSection = document.getElementById('plans');
  const floatingCta = document.querySelector('.floating-cta');

  if (!plansSection || !floatingCta) return;

  const toggleFloatingCta = (shouldHide) => {
    floatingCta.classList.toggle('is-hidden-by-plans', Boolean(shouldHide));
  };

  if (!('IntersectionObserver' in window)) {
    const syncByScroll = () => {
      const rect = plansSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const visible = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.18;
      toggleFloatingCta(visible);
    };

    window.addEventListener('scroll', syncByScroll, { passive: true });
    window.addEventListener('resize', syncByScroll);
    syncByScroll();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      toggleFloatingCta(entry.isIntersecting);
    });
  }, {
    threshold: 0.12,
    rootMargin: '-12% 0px -12% 0px'
  });

  observer.observe(plansSection);
}

function bindEvents() {
  const range = document.getElementById('cruisePrice');
  if (range) {
    range.addEventListener('input', updateCalculator);
    updateRangeBackground(range);
  }

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  document.querySelectorAll('.header-cta, .hero-main-cta, .floating-cta, .center-cta').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('resize', syncPlanGridColumns);
}

let revealObserver;

function observeReveals() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  }

  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));
}

async function init() {
  renderNotices();
  injectConversionSections();
  renderPlans();
  bindEvents();
  bindPlanSignupLinks();
  updateCalculator();
  observeReveals();
  setupPlansFloatingCtaObserver();
  await loadMembershipSignupUrl();
  fetchExchangeRate();
}

document.addEventListener('DOMContentLoaded', init);
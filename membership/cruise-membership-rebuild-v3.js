const DEFAULT_RATE = 1486.89;
const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';

const plans = [
  {
    tag: '무료',
    name: '게스트',
    monthlyUsd: 0,
    startUsd: 0,
    rewardPoint: 50,
    monthlyPoint: 0,
    caption: '부담 없이 먼저 보고 싶은 분'
  },
  {
    tag: '입문',
    name: '스타터',
    monthlyUsd: 50,
    startUsd: 50,
    rewardPoint: 100,
    monthlyPoint: 50,
    caption: '가볍게 시작하고 싶은 분'
  },
  {
    tag: '일반',
    name: '클래식',
    monthlyUsd: 100,
    startUsd: 200,
    rewardPoint: 350,
    monthlyPoint: 200,
    caption: '무난하게 꾸준히 쌓고 싶은 분'
  },
  {
    tag: '추천',
    name: '프리미엄',
    monthlyUsd: 250,
    startUsd: 500,
    rewardPoint: 800,
    monthlyPoint: 500,
    caption: '여행 계획이 분명하고 빨리 쌓고 싶은 분',
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
  mode: 'general'
};

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

function renderPlans() {
  const wrap = document.getElementById('planCards');
  if (!wrap) return;

  wrap.innerHTML = plans.map((plan) => {
    const monthlyKrw = plan.monthlyUsd === 0 ? '없음' : formatKrw(plan.monthlyUsd * state.exchangeRate);
    const startKrw = plan.startUsd === 0 ? '없음' : formatKrw(plan.startUsd * state.exchangeRate);

    return `
      <article class="plan-card reveal ${plan.recommended ? 'recommended' : ''}">
        <span class="plan-tag">${plan.tag}</span>
        <div class="plan-name">${plan.name}</div>

        <div class="plan-price-row">
          <div class="plan-price">${formatUsd(plan.monthlyUsd)}</div>
          <div class="plan-price-unit">/월</div>
        </div>

        <div class="plan-top-stats">
          <div class="plan-stat">
            <span class="label">월 비용</span>
            <div class="value">${monthlyKrw}</div>
          </div>
          <div class="plan-stat">
            <span class="label">시작 비용</span>
            <div class="value">${startKrw}</div>
          </div>
        </div>

        <div class="plan-feature-group">
          <div class="plan-feature">
            <span class="plan-mini-label">가입 시 리워드</span>
            <strong>${formatPoint(plan.rewardPoint)}</strong>
          </div>
          <div class="plan-feature">
            <span class="plan-mini-label">매월 적립 포인트</span>
            <strong>${formatPoint(plan.monthlyPoint)}</strong>
          </div>
        </div>

        <p class="plan-caption">${plan.caption}</p>
        <button type="button" class="plan-cta">멤버십 가입하기</button>
        <div class="plan-disclaimer">환율 기준 원화는 자동 계산됩니다.</div>
      </article>
    `;
  }).join('');

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
  updateCalculator();
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

function init() {
  renderNotices();
  renderPlans();
  bindEvents();
  updateCalculator();
  observeReveals();
  fetchExchangeRate();
}

document.addEventListener('DOMContentLoaded', init);

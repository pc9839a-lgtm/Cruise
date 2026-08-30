(() => {
  'use strict';

  const RESULT_KEY = 'cruiseMembershipSurveyResultV1';

  const COPY = {
    'new-direct-ready': {
      title: '처음이어도 직접 예약 괜찮다면',
      sub: '크루즈 멤버십이 잘 맞습니다',
      cta: '크루즈 멤버십 보기',
      target: '#how-it-works'
    },
    'exp-direct-ready': {
      title: '이미 타봤고 직접 예약도 괜찮다면',
      sub: '크루즈 멤버십이 가장 잘 맞습니다',
      cta: '크루즈 멤버십 보기',
      target: '#how-it-works'
    },
    'new-agency-comfort': {
      title: '처음이라면 편하게 맡기는 게 맞습니다',
      sub: '다만 가격 차이는 한번 확인해보세요',
      cta: '가격 차이 확인하기',
      target: '#why-save'
    },
    'exp-agency-comfort': {
      title: '편한 여행이 더 중요하시네요',
      sub: '멤버십 가격만 가볍게 비교해보세요',
      cta: '멤버십 가격 비교하기',
      target: '#plans'
    },
    'new-agency-save': {
      title: '80만원 차이면 직접 해볼 만하죠',
      sub: '가이드 없이 더 낮은 가격으로',
      cta: '80만원 아끼는 방법 보기',
      target: '#why-direct'
    },
    'exp-agency-save': {
      title: '80만원 차이면 직접 예약이 낫습니다',
      sub: '이미 경험이 있다면 더 간단합니다',
      cta: '크루즈 멤버십 보기',
      target: '#how-it-works'
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .cms-result-impact{display:none!important}
    .cms-result-proof{
      width:min(100%,760px)!important;
      margin:10px auto 0!important;
      padding:0!important;
      border:0!important;
      box-shadow:none!important;
      background:transparent!important;
      color:#637393!important;
      font-size:clamp(22px,2.5vw,30px)!important;
      line-height:1.35!important;
      font-weight:850!important;
    }
    .cms-result-title{margin-bottom:12px!important}
    .cms-result-actions{margin-top:26px!important}
  `;
  document.head.appendChild(style);

  function readResultId(){
    try {
      const raw = sessionStorage.getItem(RESULT_KEY);
      return raw ? JSON.parse(raw).result : '';
    } catch (_) {
      return '';
    }
  }

  function apply(){
    const result = document.querySelector('.cms-survey-overlay .cms-result');
    if (!result) return;

    const config = COPY[readResultId()];
    if (!config) return;

    const title = result.querySelector('.cms-result-title');
    const proof = result.querySelector('.cms-result-proof');
    const primary = result.querySelector('.cms-survey-primary');

    if (title && title.textContent !== config.title) title.textContent = config.title;
    if (proof && proof.textContent !== config.sub) proof.textContent = config.sub;
    if (primary) {
      if (primary.textContent !== config.cta) primary.textContent = config.cta;
      primary.dataset.cmsTarget = config.target;
    }
  }

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.cms-survey-primary');
    if (!button) return;

    const target = button.dataset.cmsTarget || COPY[readResultId()]?.target;
    if (!target) return;

    window.setTimeout(() => {
      const section = document.querySelector(target);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 260);
  }, true);

  apply();
})();
(() => {
  'use strict';

  const RESULT_KEY = 'cruiseMembershipSurveyResultV1';

  const COPY = {
    'new-direct-ready': {
      title: '처음이어도 직접 예약할 수 있다면',
      sub: '크루즈 멤버십이 잘 맞습니다',
      cta: '크루즈 멤버십 보기'
    },
    'exp-direct-ready': {
      title: '이미 타봤고 직접 예약도 가능하다면',
      sub: '크루즈 멤버십이 가장 잘 맞습니다',
      cta: '크루즈 멤버십 보기'
    },
    'new-agency-comfort': {
      title: '처음이라면 편하게 맡기는 것도 좋습니다',
      sub: '가격 차이만 가볍게 확인해보세요',
      cta: '가격 차이 확인하기'
    },
    'exp-agency-comfort': {
      title: '편하게 맡기는 여행이 더 잘 맞습니다',
      sub: '그래도 멤버십 가격은 한번 비교해보세요',
      cta: '멤버십 가격 비교하기'
    },
    'new-agency-save': {
      title: '80만원 차이면 직접 해볼 만합니다',
      sub: '가이드 없이, 더 낮은 가격으로',
      cta: '80만원 아끼는 방법 보기'
    },
    'exp-agency-save': {
      title: '80만원 차이면 직접 예약도 괜찮습니다',
      sub: '가이드 없이, 더 낮은 가격으로',
      cta: '크루즈 멤버십 보기'
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

    if (title) title.textContent = config.title;
    if (proof) proof.textContent = config.sub;
    if (primary) primary.textContent = config.cta;
  }

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  apply();
})();
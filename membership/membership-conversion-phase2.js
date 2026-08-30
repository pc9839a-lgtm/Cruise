(() => {
  const STYLE_ID = 'ingroup-conversion-phase2-style';

  const section = (id, tone, body) => `
    <section id="${id}" class="ig2-section ${tone}">
      <div class="container"><div class="ig2-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig2-section,.ig2-section *{box-sizing:border-box}
      .ig2-section{min-height:620px;display:flex;align-items:center;padding:92px 0;overflow:hidden}
      .ig2-white{background:#fff;color:#0f1931}.ig2-soft{background:#f3f6fb;color:#0f1931}.ig2-dark{background:#0f1931;color:#fff}.ig2-blue{background:linear-gradient(135deg,#1f4f96,#173766);color:#fff}
      .ig2-wrap{width:min(980px,100%);margin:0 auto;text-align:center}
      .ig2-title{margin:0;font-size:clamp(44px,5.7vw,74px);line-height:1.04;letter-spacing:-.065em;font-weight:950}
      .ig2-lead{margin:28px auto 0;max-width:880px;font-size:clamp(28px,3.4vw,40px);line-height:1.35;letter-spacing:-.04em;font-weight:900}
      .ig2-accent{color:#2e66ff}.ig2-dark .ig2-accent,.ig2-blue .ig2-accent{color:#a9c5ff}
      .ig2-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:920px;margin:46px auto 0}
      .ig2-grid.four{grid-template-columns:repeat(4,1fr)}
      .ig2-box{padding:34px 24px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#0f1931}
      .ig2-dark .ig2-box,.ig2-blue .ig2-box{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16);color:#fff}
      .ig2-box strong{display:block;font-size:clamp(30px,3.6vw,44px);line-height:1.2;letter-spacing:-.045em;font-weight:950}
      .ig2-box b{display:block;margin-top:18px;font-size:clamp(44px,5.5vw,70px);line-height:1;font-weight:950;letter-spacing:-.055em}
      .ig2-flow{max-width:860px;margin:46px auto 0;display:grid;gap:0;text-align:left}
      .ig2-flow-row{display:grid;grid-template-columns:90px 1fr;gap:24px;align-items:center;padding:30px 4px;border-top:1px solid rgba(12,24,48,.13)}
      .ig2-dark .ig2-flow-row,.ig2-blue .ig2-flow-row{border-color:rgba(255,255,255,.18)}
      .ig2-flow-row:first-child{border-top:0}
      .ig2-flow-row b{display:flex;width:70px;height:70px;align-items:center;justify-content:center;border-radius:50%;background:#eaf1ff;color:#2e66ff;font-size:28px;font-weight:950}
      .ig2-dark .ig2-flow-row b,.ig2-blue .ig2-flow-row b{background:rgba(255,255,255,.13);color:#fff}
      .ig2-flow-row strong{display:block;font-size:clamp(30px,3.7vw,46px);line-height:1.18;letter-spacing:-.045em;font-weight:950}
      .ig2-compare{display:grid;grid-template-columns:1fr 1fr;gap:22px;max-width:930px;margin:46px auto 0;text-align:left}
      .ig2-compare-col{padding:34px 30px;border-radius:30px;background:#fff;border:1px solid rgba(12,24,48,.1)}
      .ig2-compare-col.is-group{background:#1f4f96;color:#fff;border-color:#1f4f96}
      .ig2-compare-col h3{margin:0 0 24px;font-size:clamp(34px,4vw,50px);letter-spacing:-.05em}
      .ig2-compare-row{padding:22px 0;border-top:1px solid rgba(12,24,48,.12);font-size:clamp(26px,3vw,36px);line-height:1.25;font-weight:900}
      .ig2-compare-col.is-group .ig2-compare-row{border-color:rgba(255,255,255,.18)}
      .ig2-plan{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:46px auto 0}
      .ig2-plan-card{padding:38px 32px;border-radius:32px;background:#fff;border:1px solid rgba(12,24,48,.1);text-align:left;color:#0f1931}
      .ig2-plan-card.is-premium{background:#1f4f96;color:#fff;border-color:#1f4f96}
      .ig2-plan-card h3{margin:0;font-size:clamp(34px,4vw,48px)}
      .ig2-plan-card strong{display:block;margin-top:24px;font-size:clamp(54px,7vw,86px);line-height:.95;letter-spacing:-.065em;font-weight:950}
      .ig2-plan-card b{display:block;margin-top:22px;font-size:clamp(30px,3.6vw,44px);line-height:1.25;font-weight:950}
      .ig2-timing{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:900px;margin:46px auto 0}
      .ig2-time{padding:34px 20px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#0f1931}
      .ig2-time strong{display:block;font-size:clamp(32px,3.8vw,46px);font-weight:950}
      .ig2-time b{display:block;margin-top:18px;color:#2e66ff;font-size:clamp(48px,6vw,76px);line-height:1;font-weight:950}
      .ig2-check{display:grid;gap:18px;max-width:860px;margin:46px auto 0}
      .ig2-check div{padding:30px 28px;border-radius:28px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.16);font-size:clamp(30px,3.8vw,46px);line-height:1.2;font-weight:950}
      .ig2-final{max-width:940px;margin:0 auto;padding:56px 36px;border-radius:36px;background:#0f1931;color:#fff}
      .ig2-final strong{display:block;font-size:clamp(48px,6vw,78px);line-height:1.04;letter-spacing:-.065em;font-weight:950}
      .ig2-final .ig2-lead{color:#d9e6ff}
      .ig2-final-btn{display:inline-flex;align-items:center;justify-content:center;min-height:74px;margin-top:38px;padding:0 40px;border:0;border-radius:18px;background:#fff;color:#173766;font-size:clamp(26px,3vw,34px);font-weight:950;cursor:pointer}
      @media(max-width:780px){
        .ig2-section{min-height:560px;padding:72px 0}
        .ig2-title{font-size:40px}.ig2-lead{font-size:27px}
        .ig2-grid,.ig2-grid.four,.ig2-compare,.ig2-plan,.ig2-timing{grid-template-columns:1fr}
        .ig2-flow-row{grid-template-columns:74px 1fr;gap:14px}.ig2-flow-row b{width:60px;height:60px;font-size:24px}
        .ig2-box strong,.ig2-compare-row{font-size:28px}.ig2-plan-card b{font-size:30px}
        .ig2-final{padding:44px 22px;border-radius:28px}.ig2-final-btn{width:100%}
      }
    `;
    document.head.appendChild(style);
  }

  function after(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.insertAdjacentHTML('afterend', html);
  }

  function before(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.insertAdjacentHTML('beforebegin', html);
  }

  function inject() {
    if (document.getElementById('ig2-flow')) return;
    addStyles();

    after('#ig1-choice',
      section('ig2-flow','ig2-dark',`
        <h2 class="ig2-title">가입하면 실제로<br>이 순서로 이용합니다</h2>
        <div class="ig2-flow">
          <div class="ig2-flow-row"><b>1</b><strong>멤버십 가입</strong></div>
          <div class="ig2-flow-row"><b>2</b><strong>매월 2배 포인트 적립</strong></div>
          <div class="ig2-flow-row"><b>3</b><strong>원하는 크루즈 직접 선택</strong></div>
        </div>`)
    );

    after('#ig2-flow',
      section('ig2-book','ig2-white',`
        <h2 class="ig2-title">정해진 여행상품을<br>고르는 방식이 아닙니다</h2>
        <div class="ig2-grid four">
          <div class="ig2-box"><strong>지역</strong></div>
          <div class="ig2-box"><strong>출발일</strong></div>
          <div class="ig2-box"><strong>크루즈 선사</strong></div>
          <div class="ig2-box"><strong>객실</strong></div>
        </div>
        <div class="ig2-lead">내가 원하는 조건으로 직접 고릅니다</div>`)
    );

    after('#ig2-book',
      section('ig2-pay','ig2-blue',`
        <h2 class="ig2-title">고른 크루즈에서<br>쌓아둔 포인트를 씁니다</h2>
        <div class="ig2-flow">
          <div class="ig2-flow-row"><b>1</b><strong>크루즈 가격 확인</strong></div>
          <div class="ig2-flow-row"><b>2</b><strong>포인트 적용</strong></div>
          <div class="ig2-flow-row"><b>3</b><strong>나머지만 카드 결제</strong></div>
        </div>`)
    );

    after('#ig2-pay',
      section('ig2-compare','ig2-soft',`
        <h2 class="ig2-title">여행사와 인그룹은<br>역할이 다릅니다</h2>
        <div class="ig2-compare">
          <div class="ig2-compare-col">
            <h3>여행사</h3>
            <div class="ig2-compare-row">상담으로 일정 진행</div>
            <div class="ig2-compare-row">가이드 포함 가능</div>
            <div class="ig2-compare-row">패키지 중심</div>
          </div>
          <div class="ig2-compare-col is-group">
            <h3>인그룹</h3>
            <div class="ig2-compare-row">내가 직접 선택</div>
            <div class="ig2-compare-row">2배 포인트 적립</div>
            <div class="ig2-compare-row">포인트로 예약비 절감</div>
          </div>
        </div>`)
    );

    after('#plans',
      section('ig2-plan-guide','ig2-white',`
        <h2 class="ig2-title">어떤 플랜을 고르면 될까요?</h2>
        <div class="ig2-plan">
          <div class="ig2-plan-card">
            <h3>클래식</h3>
            <strong>$100 → 200P</strong>
            <b>매월 부담을 낮게 시작</b>
          </div>
          <div class="ig2-plan-card is-premium">
            <h3>프리미엄</h3>
            <strong>$250 → 500P</strong>
            <b>포인트를 더 빠르게 적립</b>
          </div>
        </div>`)
    );

    before('#calculator',
      section('ig2-timing','ig2-soft',`
        <h2 class="ig2-title">여행 직전에 가입하는 것보다<br>미리 쌓을수록 유리합니다</h2>
        <div class="ig2-timing">
          <div class="ig2-time"><strong>3개월 전</strong><b>600P</b></div>
          <div class="ig2-time"><strong>6개월 전</strong><b>1,200P</b></div>
          <div class="ig2-time"><strong>12개월 전</strong><b>2,400P</b></div>
        </div>
        <div class="ig2-lead">클래식 기준</div>`)
    );

    after('#calculator',
      section('ig2-after-trip','ig2-blue',`
        <h2 class="ig2-title">여행이 끝났다고<br>계속 낼 필요는 없습니다</h2>
        <div class="ig2-check">
          <div>약정기간 없음</div>
          <div>해지 위약금 없음</div>
          <div>여행 후 해지 가능</div>
        </div>`)
    );

    before('#membership-summary',
      section('ig2-final-check','ig2-dark',`
        <h2 class="ig2-title">가입 전에<br>이 세 가지만 기억하면 됩니다</h2>
        <div class="ig2-check">
          <div>$100 → 매월 200P</div>
          <div>$250 → 매월 500P</div>
          <div>쌓은 포인트로 크루즈 예약</div>
        </div>`)
    );

    after('#hotel-benefit',
      section('ig2-final','ig2-white',`
        <div class="ig2-final">
          <strong>월마다 내는 상품이<br>특별한 게 아닙니다</strong>
          <div class="ig2-lead">낸 금액의 <span class="ig2-accent">2배가 매월 쌓이는 것</span><br>그게 인그룹의 핵심입니다</div>
          <button type="button" class="ig2-final-btn">멤버십 플랜 보기</button>
        </div>`)
    );

    const finalButton = document.querySelector('.ig2-final-btn');
    if (finalButton) {
      finalButton.addEventListener('click', () => {
        document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once: true });
  else inject();
})();
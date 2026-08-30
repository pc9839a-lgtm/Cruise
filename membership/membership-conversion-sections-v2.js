(() => {
  const STYLE_ID = 'ingroup-conversion-v2-style';
  const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';
  const FALLBACK_RATE = 1486.89;

  const section = (id, tone, body) => `
    <section id="${id}" class="ig1-section ${tone}">
      <div class="container"><div class="ig1-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig1-section,.ig1-section *{box-sizing:border-box}
      .ig1-section{min-height:620px;display:flex;align-items:center;padding:92px 0;overflow:hidden}
      .ig1-white{background:#fff;color:#0f1931}.ig1-soft{background:#f3f6fb;color:#0f1931}.ig1-dark{background:#0f1931;color:#fff}.ig1-blue{background:linear-gradient(135deg,#1f4f96,#173766);color:#fff}
      .ig1-wrap{width:min(960px,100%);margin:0 auto;text-align:center}
      .ig1-title{margin:0;font-size:clamp(42px,5.6vw,72px);line-height:1.04;letter-spacing:-.065em;font-weight:950}
      .ig1-lead{margin:28px auto 0;max-width:850px;font-size:clamp(26px,3.1vw,36px);line-height:1.4;letter-spacing:-.035em;font-weight:900}
      .ig1-dark .ig1-lead,.ig1-blue .ig1-lead{color:rgba(255,255,255,.84)}
      .ig1-number{margin-top:42px;font-size:clamp(76px,10vw,132px);line-height:.9;letter-spacing:-.08em;font-weight:950}
      .ig1-accent{color:#2e66ff}.ig1-dark .ig1-accent,.ig1-blue .ig1-accent{color:#a9c5ff}
      .ig1-compare{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;max-width:860px;margin:46px auto 0}
      .ig1-card{padding:34px 26px;border-radius:30px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#0f1931}
      .ig1-dark .ig1-card,.ig1-blue .ig1-card{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16);color:#fff}
      .ig1-card strong{display:block;font-size:clamp(48px,6.5vw,82px);line-height:.95;letter-spacing:-.065em;font-weight:950}
      .ig1-card span{display:block;margin-top:14px;font-size:clamp(24px,2.8vw,32px);line-height:1.3;font-weight:900}
      .ig1-symbol{font-size:44px;font-weight:950;color:#7ca6ff}
      .ig1-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:900px;margin:46px auto 0}
      .ig1-step{padding:34px 24px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#0f1931}
      .ig1-step b{display:flex;width:58px;height:58px;align-items:center;justify-content:center;margin:0 auto 20px;border-radius:50%;background:#eaf1ff;color:#2e66ff;font-size:24px;font-weight:950}
      .ig1-step strong{display:block;font-size:clamp(27px,3vw,36px);line-height:1.3;letter-spacing:-.04em;font-weight:950}
      .ig1-stack{max-width:820px;margin:42px auto 0;text-align:left}
      .ig1-row{display:grid;grid-template-columns:1fr auto;gap:22px;align-items:end;padding:26px 4px;border-top:1px solid rgba(12,24,48,.13)}
      .ig1-dark .ig1-row,.ig1-blue .ig1-row{border-color:rgba(255,255,255,.18)}
      .ig1-row:first-child{border-top:0}
      .ig1-row span{font-size:clamp(26px,3vw,34px);line-height:1.3;font-weight:900}
      .ig1-row strong{font-size:clamp(40px,5vw,62px);line-height:1;font-weight:950;letter-spacing:-.05em}
      .ig1-row.total{margin-top:8px;padding-top:32px;border-top:3px solid #2e66ff}
      .ig1-row.total span,.ig1-row.total strong{color:#2e66ff}
      .ig1-dark .ig1-row.total span,.ig1-dark .ig1-row.total strong,.ig1-blue .ig1-row.total span,.ig1-blue .ig1-row.total strong{color:#a9c5ff}
      .ig1-choice{display:grid;gap:18px;max-width:800px;margin:44px auto 0}
      .ig1-choice div{padding:28px 24px;border-radius:26px;background:#fff;border:1px solid rgba(12,24,48,.1);font-size:clamp(30px,3.6vw,44px);line-height:1.25;font-weight:950;letter-spacing:-.045em;color:#0f1931}
      .ig1-badge{display:inline-block;margin-bottom:24px;padding:14px 24px;border-radius:999px;background:#eaf1ff;color:#2e66ff;font-size:clamp(24px,2.6vw,30px);font-weight:950}
      .ig1-dark .ig1-badge,.ig1-blue .ig1-badge{background:rgba(255,255,255,.12);color:#fff}
      @media(max-width:780px){
        .ig1-section{min-height:560px;padding:72px 0}
        .ig1-title{font-size:40px}.ig1-lead{font-size:25px}
        .ig1-compare{grid-template-columns:1fr;gap:12px}
        .ig1-symbol{transform:rotate(90deg);font-size:32px}
        .ig1-steps{grid-template-columns:1fr}
        .ig1-row{grid-template-columns:1fr;gap:8px;text-align:center}
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

  async function hydrateKrw() {
    let rate = FALLBACK_RATE;
    try {
      const r = await fetch(RATE_API_URL, { cache: 'no-store' });
      const d = await r.json();
      if (d?.result === 'success' && d?.rates?.KRW) rate = Number(d.rates.KRW);
    } catch (_) {}
    document.querySelectorAll('[data-krw-usd]').forEach((el) => {
      const value = Number(el.dataset.krwUsd || 0) * rate;
      el.textContent = `약 ${Math.round(value / 10000).toLocaleString('ko-KR')}만원`;
    });
  }

  function inject() {
    if (document.getElementById('ig1-price')) return;
    addStyles();

    after('.review-flow-section',
      section('ig1-price','ig1-dark',`
        <h2 class="ig1-title">같은 크루즈라도<br>예약 가격은 달라질 수 있습니다</h2>
        <div class="ig1-compare">
          <div class="ig1-card"><strong>200만원</strong><span>여행사 예약 예시</span></div>
          <div class="ig1-symbol">VS</div>
          <div class="ig1-card"><strong>120만원</strong><span>인그룹 예약 예시</span></div>
        </div>
        <div class="ig1-number ig1-accent">80만원 차이</div>`)
    );

    after('#ig1-price',
      section('ig1-couple','ig1-blue',`
        <h2 class="ig1-title">둘이 가면<br>차이는 더 크게 느껴집니다</h2>
        <div class="ig1-number">160만원</div>
        <div class="ig1-lead">1인 80만원 차이 × 2명</div>`)
    );

    after('#why-direct',
      section('ig1-difference','ig1-white',`
        <div class="ig1-badge">월납 크루즈 상품과 가장 큰 차이</div>
        <h2 class="ig1-title">월마다 내는 상품은 많습니다</h2>
        <div class="ig1-lead">하지만 <span class="ig1-accent">2배 적립은 인그룹만</span></div>`)
    );

    after('#ig1-difference',
      section('ig1-double','ig1-blue',`
        <h2 class="ig1-title">$100을 내면<br>100P가 아니라 200P</h2>
        <div class="ig1-compare">
          <div class="ig1-card"><strong>$100</strong><span>내가 매월 납부</span></div>
          <div class="ig1-symbol">→</div>
          <div class="ig1-card"><strong>200P</strong><span>인그룹 매월 적립</span></div>
        </div>
        <div class="ig1-number">2배</div>`)
    );

    after('#ig1-double',
      section('ig1-double-premium','ig1-dark',`
        <h2 class="ig1-title">$250을 내면<br>500P가 쌓입니다</h2>
        <div class="ig1-compare">
          <div class="ig1-card"><strong>$250</strong><span>내가 매월 납부</span></div>
          <div class="ig1-symbol">→</div>
          <div class="ig1-card"><strong>500P</strong><span>인그룹 매월 적립</span></div>
        </div>
        <div class="ig1-number ig1-accent">2배</div>`)
    );

    after('#how-it-works',
      section('ig1-identity','ig1-soft',`
        <h2 class="ig1-title">그래서 인그룹은<br>크루즈 예약 멤버십입니다</h2>
        <div class="ig1-steps">
          <div class="ig1-step"><b>1</b><strong>매월 멤버십 결제</strong></div>
          <div class="ig1-step"><b>2</b><strong>낸 금액의 2배 적립</strong></div>
          <div class="ig1-step"><b>3</b><strong>포인트로 크루즈 예약</strong></div>
        </div>`)
    );

    before('#plans',
      section('ig1-classic','ig1-white',`
        <h2 class="ig1-title">클래식을 5개월 이용하면?</h2>
        <div class="ig1-stack">
          <div class="ig1-row"><span>매월 내가 내는 돈</span><strong>$100</strong></div>
          <div class="ig1-row"><span>5개월 동안 실제 납부</span><strong>$500</strong></div>
          <div class="ig1-row total"><span>그동안 쌓이는 포인트</span><strong>1,000P</strong></div>
        </div>`)
      +
      section('ig1-no-point','ig1-soft',`
        <h2 class="ig1-title">포인트가 하나도 없다면?</h2>
        <div class="ig1-lead">$2,000짜리 크루즈를 예약할 때</div>
        <div class="ig1-number">카드 $2,000</div>
        <div class="ig1-lead">전액 카드로 냅니다</div>`)
      +
      section('ig1-use-point','ig1-blue',`
        <h2 class="ig1-title">그런데 1,000P가<br>쌓여 있다면?</h2>
        <div class="ig1-compare">
          <div class="ig1-card"><strong>1,000P</strong><span>쌓아둔 포인트 사용</span></div>
          <div class="ig1-symbol">+</div>
          <div class="ig1-card"><strong>$1,000</strong><span>나머지만 카드 결제</span></div>
        </div>
        <div class="ig1-lead">같은 $2,000 크루즈 예약</div>`)
      +
      section('ig1-real-spend','ig1-white',`
        <h2 class="ig1-title">그럼 실제로 내 통장에서<br>나간 돈은 얼마일까요?</h2>
        <div class="ig1-stack">
          <div class="ig1-row"><span>5개월 멤버십 비용</span><strong>$500</strong></div>
          <div class="ig1-row"><span>크루즈 예약 카드 결제</span><strong>$1,000</strong></div>
          <div class="ig1-row total"><span>실제 총지출</span><strong>$1,500</strong></div>
        </div>
        <div class="ig1-number ig1-accent">$500 적게 지출</div>`)
      +
      section('ig1-krw','ig1-dark',`
        <h2 class="ig1-title">원화로 보면<br>더 쉽게 체감됩니다</h2>
        <div class="ig1-stack">
          <div class="ig1-row"><span>$2,000 크루즈 가격</span><strong data-krw-usd="2000">계산 중</strong></div>
          <div class="ig1-row"><span>포인트가 없을 때 카드 결제</span><strong data-krw-usd="2000">계산 중</strong></div>
          <div class="ig1-row total"><span>5개월 멤버십 포함 실제 지출</span><strong data-krw-usd="1500">계산 중</strong></div>
        </div>`)
      +
      section('ig1-accum','ig1-soft',`
        <h2 class="ig1-title">여행 전에 쌓아둘수록<br>사용할 포인트가 커집니다</h2>
        <div class="ig1-stack">
          <div class="ig1-row"><span>클래식 3개월</span><strong>600P</strong></div>
          <div class="ig1-row"><span>클래식 6개월</span><strong>1,200P</strong></div>
          <div class="ig1-row total"><span>클래식 12개월</span><strong>2,400P</strong></div>
        </div>`)
      +
      section('ig1-no-contract','ig1-blue',`
        <h2 class="ig1-title">매월 결제하지만<br>장기 약정 상품은 아닙니다</h2>
        <div class="ig1-choice">
          <div>약정기간 없음</div>
          <div>해지 위약금 없음</div>
          <div>여행 후 해지 가능</div>
        </div>`)
      +
      section('ig1-choice','ig1-white',`
        <h2 class="ig1-title">정해진 패키지를<br>사는 방식도 아닙니다</h2>
        <div class="ig1-choice">
          <div>원하는 출발일 선택</div>
          <div>원하는 크루즈 선사 선택</div>
          <div>원하는 객실 선택</div>
        </div>
        <div class="ig1-lead">내가 고른 크루즈에<br><span class="ig1-accent">쌓아둔 포인트를 사용합니다</span></div>`)
    );

    hydrateKrw();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once: true });
  else inject();
})();
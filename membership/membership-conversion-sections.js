(() => {
  const STYLE_ID = 'membership-conversion-patch1-style-v2';
  const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';
  const FALLBACK_RATE = 1486.89;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .lp1-section,.lp1-section *{box-sizing:border-box}
      .lp1-section{min-height:620px;display:flex;align-items:center;padding:92px 0;overflow:hidden}
      .lp1-white{background:#fff;color:#0f1931}.lp1-soft{background:#f3f6fb;color:#0f1931}.lp1-dark{background:#0f1931;color:#fff}.lp1-blue{background:linear-gradient(135deg,#1f4f96,#173766);color:#fff}
      .lp1-wrap{width:min(960px,100%);margin:0 auto;text-align:center}.lp1-kicker{display:block;margin-bottom:16px;color:#2e66ff;font-size:14px;font-weight:900}.lp1-dark .lp1-kicker,.lp1-blue .lp1-kicker{color:#9bbcff}
      .lp1-title{margin:0;font-size:clamp(40px,5.4vw,68px);line-height:1.05;letter-spacing:-.065em;font-weight:950}.lp1-sub{margin:18px auto 0;max-width:720px;color:#667085;font-size:19px;line-height:1.5;font-weight:750}.lp1-dark .lp1-sub,.lp1-blue .lp1-sub{color:rgba(255,255,255,.72)}
      .lp1-price-grid{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:26px;max-width:830px;margin:46px auto 0}.lp1-price-side{padding:30px 24px;border-radius:28px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08)}.lp1-price-side.is-in{background:#fff;color:#173766}.lp1-price-label{display:block;margin-bottom:12px;color:rgba(255,255,255,.64);font-size:16px;font-weight:850}.lp1-price-side.is-in .lp1-price-label{color:#667085}.lp1-price-num{display:block;font-size:clamp(54px,7vw,84px);line-height:.95;letter-spacing:-.07em;font-weight:950}.lp1-vs{font-size:22px;font-weight:950;color:#8fb4ff}.lp1-difference{margin-top:34px;font-size:20px;font-weight:850}.lp1-difference strong{display:block;margin-top:6px;color:#9bbcff;font-size:clamp(44px,6vw,68px)}.lp1-couple{margin-top:8px;color:rgba(255,255,255,.74);font-size:18px;font-weight:850}
      .lp1-single-number{margin-top:38px;font-size:clamp(72px,10vw,126px);line-height:.9;font-weight:950;letter-spacing:-.08em}.lp1-single-caption{margin-top:20px;font-size:22px;font-weight:900}.lp1-dark .lp1-single-caption{color:#b8ccf4}
      .lp1-process{max-width:760px;margin:44px auto 0;text-align:left}.lp1-process-row{display:grid;grid-template-columns:72px 1fr;gap:18px;align-items:center;padding:20px 0;border-top:1px solid #e4e8ef}.lp1-process-row:first-child{border-top:0}.lp1-process-row b{display:flex;width:52px;height:52px;align-items:center;justify-content:center;border-radius:50%;background:#eef3fb;color:#2e66ff;font-size:18px}.lp1-process-row strong{display:block;font-size:24px;letter-spacing:-.04em}.lp1-process-row span{display:block;margin-top:5px;color:#667085;font-size:16px;font-weight:750}.lp1-dark .lp1-process-row{border-color:rgba(255,255,255,.14)}.lp1-dark .lp1-process-row b{background:rgba(255,255,255,.12);color:#a7c2ff}.lp1-dark .lp1-process-row span{color:rgba(255,255,255,.65)}
      .lp1-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:880px;margin:46px auto 0}.lp1-step{position:relative;padding:34px 22px;border-radius:26px;background:#fff;border:1px solid rgba(12,24,48,.08)}.lp1-step b{display:flex;width:44px;height:44px;margin:0 auto 18px;align-items:center;justify-content:center;border-radius:50%;background:#e9f0ff;color:#2e66ff}.lp1-step strong{display:block;font-size:25px}.lp1-step span{display:block;margin-top:8px;color:#667085;font-size:15px;font-weight:750}.lp1-step:not(:last-child)::after{content:'→';position:absolute;right:-19px;top:50%;z-index:2;transform:translateY(-50%);color:#2e66ff;font-size:25px;font-weight:950}
      .lp1-plan-focus{max-width:760px;margin:44px auto 0;padding:40px 34px;border-radius:32px;background:#fff;color:#0f1931;text-align:left}.lp1-plan-focus.is-premium{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.16)}.lp1-plan-name{display:block;font-size:20px;font-weight:900}.lp1-plan-pay{display:block;margin-top:12px;font-size:38px;font-weight:950}.lp1-plan-arrow{display:block;margin:24px 0 12px;color:#8fb4ff;font-size:34px}.lp1-plan-point{display:block;color:#2e66ff;font-size:clamp(78px,10vw,118px);line-height:.9;font-weight:950}.lp1-plan-focus.is-premium .lp1-plan-point{color:#fff}.lp1-plan-caption{display:block;margin-top:14px;color:#667085;font-size:18px;font-weight:850}.lp1-plan-focus.is-premium .lp1-plan-caption{color:rgba(255,255,255,.72)}
      .lp1-formula{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:14px;max-width:920px;margin:46px auto 0}.lp1-formula-box{padding:28px 16px;border-radius:26px;background:#fff;border:1px solid rgba(12,24,48,.08)}.lp1-formula-box.is-point{background:#1f4f96;color:#fff;border-color:#1f4f96}.lp1-formula-box span{display:block;color:#667085;font-size:14px;font-weight:850}.lp1-formula-box.is-point span{color:rgba(255,255,255,.7)}.lp1-formula-box strong{display:block;margin-top:9px;font-size:clamp(34px,4vw,48px);font-weight:950}.lp1-symbol{color:#8a97aa;font-size:32px;font-weight:950}.lp1-formula-result{margin-top:26px;color:#1f4f96;font-size:24px;font-weight:950}
      .lp1-cost-stack{max-width:780px;margin:44px auto 0}.lp1-cost-row{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end;padding:24px 4px;border-top:1px solid #e6eaf0;text-align:left}.lp1-cost-row:first-child{border-top:0}.lp1-cost-row span{color:#667085;font-size:17px;font-weight:800}.lp1-cost-row strong{font-size:clamp(32px,4vw,48px);font-weight:950}.lp1-cost-row.is-total{margin-top:8px;padding-top:28px;border-top:2px solid #1f4f96}.lp1-cost-row.is-total span,.lp1-cost-row.is-total strong{color:#1f4f96}.lp1-saving{margin-top:30px;font-size:20px;font-weight:850;color:#667085}.lp1-saving strong{display:block;margin-top:6px;color:#2e66ff;font-size:clamp(48px,6vw,70px)}
      .lp1-krw-main{margin-top:40px;font-size:clamp(54px,8vw,94px);line-height:.95;font-weight:950}.lp1-krw-split{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;max-width:760px;margin:34px auto 0}.lp1-krw-side{padding:26px 18px;border-radius:26px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14)}.lp1-krw-side span{display:block;color:rgba(255,255,255,.68);font-size:15px;font-weight:850}.lp1-krw-side strong{display:block;margin-top:8px;font-size:clamp(34px,4vw,48px);font-weight:950}.lp1-krw-note{margin-top:20px;color:rgba(255,255,255,.56);font-size:13px;font-weight:750}
      .lp1-accum{max-width:760px;margin:42px auto 0;text-align:left}.lp1-accum-card{padding:32px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.08)}.lp1-accum-card h3{margin:0 0 18px;font-size:27px}.lp1-accum-row{display:flex;align-items:center;justify-content:space-between;padding:15px 0;border-top:1px solid #e7ebf1}.lp1-accum-row span{color:#667085;font-size:16px;font-weight:800}.lp1-accum-row strong{font-size:25px;font-weight:950}.lp1-accum-row:last-child strong{color:#2e66ff;font-size:34px}
      .lp1-freedom{max-width:820px;margin:42px auto 0}.lp1-freedom-row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 4px;border-top:1px solid rgba(255,255,255,.18);text-align:left}.lp1-freedom-row span{color:rgba(255,255,255,.62);font-size:17px;font-weight:800}.lp1-freedom-row strong{font-size:clamp(29px,4vw,42px);font-weight:950;text-align:right}.lp1-freedom-end{margin-top:38px;font-size:clamp(30px,4.5vw,52px);font-weight:950}.lp1-freedom-end em{font-style:normal;color:#a8c5ff}
      .lp1-trip-flow{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;max-width:940px;margin:46px auto 0}.lp1-trip-step{position:relative;padding:22px 12px;border-radius:20px;background:#fff;color:#0f1931;border:1px solid rgba(12,24,48,.08)}.lp1-trip-step b{display:block;color:#2e66ff;font-size:12px}.lp1-trip-step strong{display:block;margin-top:8px;font-size:18px;line-height:1.2}.lp1-trip-step.is-end{background:#fff;color:#173766}.lp1-trip-step:not(:last-child)::after{content:'→';position:absolute;right:-13px;top:50%;z-index:2;transform:translateY(-50%);color:#a8c5ff;font-size:20px;font-weight:950}.lp1-trip-note{margin-top:24px;color:rgba(255,255,255,.7);font-size:17px;font-weight:800}
      @media(max-width:780px){.lp1-section{min-height:560px;padding:72px 0}.lp1-title{font-size:39px}.lp1-price-grid,.lp1-formula,.lp1-krw-split{grid-template-columns:1fr;gap:12px}.lp1-price-grid .lp1-vs,.lp1-symbol{transform:rotate(90deg)}.lp1-process-row{grid-template-columns:54px 1fr}.lp1-steps{grid-template-columns:1fr}.lp1-step:not(:last-child)::after{content:'↓';right:auto;left:50%;top:auto;bottom:-22px;transform:translateX(-50%)}.lp1-cost-row{grid-template-columns:1fr}.lp1-cost-row strong{margin-top:4px}.lp1-freedom-row{display:block;text-align:center}.lp1-freedom-row strong{display:block;margin-top:7px;text-align:center}.lp1-trip-flow{grid-template-columns:1fr}.lp1-trip-step:not(:last-child)::after{content:'↓';right:auto;left:50%;top:auto;bottom:-20px;transform:translateX(-50%)}}
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

  function money(value) {
    return Math.round(value).toLocaleString('ko-KR');
  }

  async function hydrateKrw() {
    let rate = FALLBACK_RATE;
    try {
      const response = await fetch(RATE_API_URL, { cache: 'no-store' });
      const data = await response.json();
      if (data?.result === 'success' && data?.rates?.KRW) rate = Number(data.rates.KRW);
    } catch (_) {}

    document.querySelectorAll('[data-krw-usd]').forEach((el) => {
      const usd = Number(el.dataset.krwUsd || 0);
      el.textContent = `약 ${money(usd * rate)}원`;
    });
    const rateEl = document.querySelector('[data-live-rate]');
    if (rateEl) rateEl.textContent = `USD 1 ≈ ${money(rate)}원 기준`;
  }

  function inject() {
    if (document.getElementById('lp1-01')) return;
    addStyles();

    after('.review-flow-section', `
      <section id="lp1-01" class="lp1-section lp1-dark"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">01. 먼저 1명 기준으로 보면</span>
        <h2 class="lp1-title">같은 크루즈를 비교해도<br>예약 가격은 달라질 수 있습니다</h2>
        <div class="lp1-price-grid">
          <div class="lp1-price-side"><span class="lp1-price-label">여행사 예약 예시</span><strong class="lp1-price-num">200만원</strong></div>
          <div class="lp1-vs">VS</div>
          <div class="lp1-price-side is-in"><span class="lp1-price-label">인그룹 예약 예시</span><strong class="lp1-price-num">120만원</strong></div>
        </div>
        <div class="lp1-difference">1명만 가도 차이<strong>80만원</strong></div>
      </div></div></section>
    `);

    after('#lp1-01', `
      <section id="lp1-01b" class="lp1-section lp1-blue"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">둘이 함께 간다면?</span>
        <h2 class="lp1-title">1인 80만원 차이는<br>2명이면 더 크게 느껴집니다</h2>
        <div class="lp1-single-number">160만원</div>
        <div class="lp1-single-caption">2인 기준 가격 차이 예시</div>
      </div></div></section>
    `);

    after('#why-direct', `
      <section id="lp1-02" class="lp1-section lp1-white"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">02. 여행사는 왜 더 비쌀 수 있나요?</span>
        <h2 class="lp1-title">여행사는 크루즈만<br>파는 게 아닙니다</h2>
        <p class="lp1-sub">처음 가는 사람에게 편한 대신 여러 서비스가 함께 구성될 수 있습니다.</p>
        <div class="lp1-process">
          <div class="lp1-process-row"><b>1</b><div><strong>크루즈 선택</strong><span>선사 · 일정 · 객실</span></div></div>
          <div class="lp1-process-row"><b>2</b><div><strong>여행상품 구성</strong><span>상담 · 일정 구성 · 패키지</span></div></div>
          <div class="lp1-process-row"><b>3</b><div><strong>가이드·부가서비스 포함 가능</strong><span>편의가 추가될수록 판매가에도 반영</span></div></div>
        </div>
      </div></div></section>
    `);

    after('#lp1-02', `
      <section id="lp1-02b" class="lp1-section lp1-soft"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">그럼 인그룹은?</span>
        <h2 class="lp1-title">내가 직접 고를 수 있다면<br>구조가 단순해집니다</h2>
        <div class="lp1-process">
          <div class="lp1-process-row"><b>1</b><div><strong>원하는 크루즈 선택</strong><span>지역 · 출발일 · 선사 · 객실</span></div></div>
          <div class="lp1-process-row"><b>2</b><div><strong>직접 예약</strong><span>정해진 패키지를 고르는 방식이 아님</span></div></div>
          <div class="lp1-process-row"><b>3</b><div><strong>쌓아둔 회원 포인트 사용</strong><span>예약 금액 일부를 포인트로 결제</span></div></div>
        </div>
      </div></div></section>
    `);

    after('#how-it-works', `
      <section id="lp1-03" class="lp1-section lp1-dark"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">03. 인그룹을 한 문장으로</span>
        <h2 class="lp1-title">인그룹은<br>크루즈 예약 멤버십입니다</h2>
        <div class="lp1-steps">
          <div class="lp1-step"><b>1</b><strong>매월 멤버십 결제</strong><span>$100 또는 $250</span></div>
          <div class="lp1-step"><b>2</b><strong>포인트 적립</strong><span>200P 또는 500P</span></div>
          <div class="lp1-step"><b>3</b><strong>크루즈 예약에 사용</strong><span>쌓은 포인트로 결제금액 절감</span></div>
        </div>
      </div></div></section>
    `);

    before('#plans', `
      <section id="lp1-04a" class="lp1-section lp1-blue"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">04. 클래식은 이렇게 쌓입니다</span>
        <h2 class="lp1-title">월 $100을 내면</h2>
        <div class="lp1-plan-focus"><span class="lp1-plan-name">클래식</span><strong class="lp1-plan-pay">월 $100</strong><span class="lp1-plan-arrow">↓</span><b class="lp1-plan-point">200P</b><span class="lp1-plan-caption">매월 적립</span></div>
      </div></div></section>

      <section id="lp1-04b" class="lp1-section lp1-dark"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">프리미엄은 더 빠르게</span>
        <h2 class="lp1-title">월 $250을 내면</h2>
        <div class="lp1-plan-focus is-premium"><span class="lp1-plan-name">프리미엄</span><strong class="lp1-plan-pay">월 $250</strong><span class="lp1-plan-arrow">↓</span><b class="lp1-plan-point">500P</b><span class="lp1-plan-caption">매월 적립</span></div>
      </div></div></section>

      <section id="lp1-05a" class="lp1-section lp1-white"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">05. 포인트는 어디에 쓰나요?</span>
        <h2 class="lp1-title">$2,000 크루즈를<br>예약한다고 가정해보겠습니다</h2>
        <div class="lp1-formula">
          <div class="lp1-formula-box"><span>크루즈 가격</span><strong>$2,000</strong></div>
          <div class="lp1-symbol">=</div>
          <div class="lp1-formula-box is-point"><span>포인트 50%</span><strong>1,000P</strong></div>
          <div class="lp1-symbol">+</div>
          <div class="lp1-formula-box"><span>카드 50%</span><strong>$1,000</strong></div>
        </div>
        <div class="lp1-formula-result">일반 예약 예시 · 50% 포인트 + 50% 카드</div>
      </div></div></section>

      <section id="lp1-05b" class="lp1-section lp1-soft"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">그럼 실제로 내가 낸 돈은?</span>
        <h2 class="lp1-title">클래식으로 5개월<br>쌓았다고 가정해보면</h2>
        <div class="lp1-cost-stack">
          <div class="lp1-cost-row"><span>5개월 멤버십 납부</span><strong>$500</strong></div>
          <div class="lp1-cost-row"><span>5개월 동안 적립</span><strong>1,000P</strong></div>
          <div class="lp1-cost-row"><span>크루즈 예약 시 카드 결제</span><strong>$1,000</strong></div>
          <div class="lp1-cost-row is-total"><span>실제로 지출한 총액</span><strong>$1,500</strong></div>
        </div>
        <div class="lp1-saving">$2,000 크루즈와 비교하면<strong>$500 절감 예시</strong></div>
      </div></div></section>

      <section id="lp1-06" class="lp1-section lp1-dark"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">06. 원화로 보면 더 체감됩니다</span>
        <h2 class="lp1-title">$2,000 크루즈라면</h2>
        <div class="lp1-krw-main" data-krw-usd="2000">계산 중...</div>
        <div class="lp1-krw-split">
          <div class="lp1-krw-side"><span>1,000P로 결제하는 부분</span><strong data-krw-usd="1000">계산 중...</strong></div>
          <div class="lp1-symbol">+</div>
          <div class="lp1-krw-side"><span>카드로 결제하는 부분</span><strong data-krw-usd="1000">계산 중...</strong></div>
        </div>
        <div class="lp1-krw-note" data-live-rate>환율 불러오는 중...</div>
      </div></div></section>

      <section id="lp1-07a" class="lp1-section lp1-white"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">07. 클래식은 얼마나 쌓일까요?</span>
        <h2 class="lp1-title">여행 전에 미리 쌓을수록<br>사용할 포인트가 커집니다</h2>
        <div class="lp1-accum"><div class="lp1-accum-card"><h3>클래식 · 매월 200P</h3><div class="lp1-accum-row"><span>1개월</span><strong>200P</strong></div><div class="lp1-accum-row"><span>3개월</span><strong>600P</strong></div><div class="lp1-accum-row"><span>6개월</span><strong>1,200P</strong></div><div class="lp1-accum-row"><span>12개월</span><strong>2,400P</strong></div></div></div>
      </div></div></section>

      <section id="lp1-07b" class="lp1-section lp1-soft"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">프리미엄은 더 빠르게 쌓입니다</span>
        <h2 class="lp1-title">같은 기간이라도<br>쌓이는 속도가 다릅니다</h2>
        <div class="lp1-accum"><div class="lp1-accum-card"><h3>프리미엄 · 매월 500P</h3><div class="lp1-accum-row"><span>1개월</span><strong>500P</strong></div><div class="lp1-accum-row"><span>3개월</span><strong>1,500P</strong></div><div class="lp1-accum-row"><span>6개월</span><strong>3,000P</strong></div><div class="lp1-accum-row"><span>12개월</span><strong>6,000P</strong></div></div></div>
      </div></div></section>

      <section id="lp1-08a" class="lp1-section lp1-blue"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">08. 매월 구독이라고 평생 내는 건 아닙니다</span>
        <h2 class="lp1-title">필요한 기간만<br>이용하면 됩니다</h2>
        <div class="lp1-freedom"><div class="lp1-freedom-row"><span>의무 유지기간</span><strong>약정 없음</strong></div><div class="lp1-freedom-row"><span>중도 해지 비용</span><strong>해지 위약금 없음</strong></div></div>
      </div></div></section>

      <section id="lp1-08b" class="lp1-section lp1-dark"><div class="container"><div class="lp1-wrap">
        <span class="lp1-kicker">여행이 끝났다면?</span>
        <h2 class="lp1-title">크루즈를 다녀온 뒤<br>해지하면 됩니다</h2>
        <div class="lp1-trip-flow"><div class="lp1-trip-step"><b>STEP 1</b><strong>가입</strong></div><div class="lp1-trip-step"><b>STEP 2</b><strong>포인트 적립</strong></div><div class="lp1-trip-step"><b>STEP 3</b><strong>크루즈 예약</strong></div><div class="lp1-trip-step"><b>STEP 4</b><strong>멤버십 유지</strong></div><div class="lp1-trip-step"><b>STEP 5</b><strong>크루즈 탑승</strong></div><div class="lp1-trip-step is-end"><b>STEP 6</b><strong>여행 후 해지 가능</strong></div></div>
        <div class="lp1-trip-note">예약한 크루즈 이용까지 멤버십을 유지하고, 여행이 끝난 뒤 해지할 수 있습니다.</div>
      </div></div></section>
    `);

    hydrateKrw();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
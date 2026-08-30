(() => {
  const STYLE_ID = 'membership-conversion-sections-style';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .sales-scene,
      .sales-scene * { box-sizing: border-box; }

      .sales-scene {
        min-height: 590px;
        display: flex;
        align-items: center;
        padding: 86px 0;
        overflow: hidden;
      }

      .sales-scene--soft { background: #f3f6fb; }
      .sales-scene--white { background: #fff; }
      .sales-scene--dark { background: #0f1931; color: #fff; }
      .sales-scene--blue { background: linear-gradient(135deg, #1f4f96 0%, #173766 100%); color: #fff; }

      .sales-wrap {
        width: min(860px, 100%);
        margin: 0 auto;
        text-align: center;
      }

      .sales-kicker {
        display: inline-block;
        margin-bottom: 18px;
        color: #2e66ff;
        font-size: 14px;
        font-weight: 900;
        letter-spacing: -0.02em;
      }

      .sales-scene--dark .sales-kicker,
      .sales-scene--blue .sales-kicker { color: #9bbcff; }

      .sales-title {
        margin: 0;
        color: inherit;
        font-size: clamp(38px, 5vw, 66px);
        line-height: 1.06;
        font-weight: 950;
        letter-spacing: -0.065em;
      }

      .sales-desc {
        margin: 18px auto 0;
        max-width: 700px;
        color: #667085;
        font-size: 19px;
        line-height: 1.55;
        font-weight: 750;
        letter-spacing: -0.025em;
      }

      .sales-scene--dark .sales-desc,
      .sales-scene--blue .sales-desc { color: rgba(255,255,255,.76); }

      .sales-price-compare {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 24px;
        margin: 46px auto 0;
        max-width: 800px;
      }

      .sales-price-block {
        padding: 28px 20px;
        border-radius: 26px;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.12);
      }

      .sales-price-block span {
        display: block;
        color: rgba(255,255,255,.66);
        font-size: 15px;
        font-weight: 800;
      }

      .sales-price-block strong {
        display: block;
        margin-top: 10px;
        font-size: clamp(46px, 7vw, 78px);
        line-height: .95;
        font-weight: 950;
        letter-spacing: -0.065em;
      }

      .sales-price-block.is-lower {
        background: #fff;
        color: #173766;
      }

      .sales-price-block.is-lower span { color: #667085; }

      .sales-arrow {
        color: #8fb4ff;
        font-size: 42px;
        font-weight: 950;
      }

      .sales-difference {
        margin-top: 30px;
        font-size: 21px;
        font-weight: 850;
      }

      .sales-difference strong {
        margin-left: 8px;
        color: #8fb4ff;
        font-size: clamp(38px, 5vw, 58px);
        letter-spacing: -0.055em;
      }

      .sales-identity {
        margin: 42px auto 0;
        padding: 34px;
        max-width: 720px;
        border-radius: 30px;
        background: #0f1931;
        color: #fff;
        text-align: left;
      }

      .sales-identity span {
        color: #9db8e4;
        font-size: 14px;
        font-weight: 850;
      }

      .sales-identity strong {
        display: block;
        margin-top: 10px;
        font-size: clamp(34px, 5vw, 56px);
        line-height: 1.05;
        font-weight: 950;
        letter-spacing: -0.06em;
      }

      .sales-formula {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 22px;
        margin: 44px auto 0;
        max-width: 760px;
      }

      .sales-formula-card {
        padding: 28px 18px;
        border-radius: 26px;
        background: #fff;
        border: 1px solid rgba(12,24,48,.08);
        box-shadow: 0 18px 44px rgba(15,25,49,.07);
      }

      .sales-formula-card span {
        display: block;
        color: #667085;
        font-size: 15px;
        font-weight: 850;
      }

      .sales-formula-card strong {
        display: block;
        margin-top: 10px;
        color: #0f1931;
        font-size: clamp(42px, 6vw, 66px);
        line-height: .95;
        font-weight: 950;
        letter-spacing: -0.065em;
      }

      .sales-formula-card.is-blue {
        background: #1f4f96;
        border-color: #1f4f96;
      }

      .sales-formula-card.is-blue span { color: rgba(255,255,255,.72); }
      .sales-formula-card.is-blue strong { color: #fff; }

      .sales-equals,
      .sales-plus {
        color: #8a97aa;
        font-size: 38px;
        font-weight: 950;
      }

      .sales-two-plan {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 16px;
        margin: 42px auto 0;
        max-width: 780px;
      }

      .sales-plan-mini {
        padding: 30px 24px;
        border-radius: 28px;
        background: #fff;
        border: 1px solid rgba(12,24,48,.08);
        text-align: left;
      }

      .sales-plan-mini.is-premium {
        background: #1f4f96;
        color: #fff;
        border-color: #1f4f96;
      }

      .sales-plan-mini span {
        display: block;
        color: #667085;
        font-size: 14px;
        font-weight: 850;
      }

      .sales-plan-mini.is-premium span { color: rgba(255,255,255,.72); }

      .sales-plan-mini strong {
        display: block;
        margin-top: 10px;
        font-size: clamp(36px, 5vw, 56px);
        line-height: 1;
        font-weight: 950;
        letter-spacing: -0.06em;
      }

      .sales-plan-mini b {
        display: block;
        margin-top: 18px;
        color: #2e66ff;
        font-size: clamp(44px, 6vw, 68px);
        line-height: .95;
        letter-spacing: -0.065em;
      }

      .sales-plan-mini.is-premium b { color: #fff; }

      .sales-contract {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 14px;
        margin: 42px auto 0;
        max-width: 760px;
      }

      .sales-contract > div {
        padding: 30px 18px;
        border-radius: 26px;
        background: rgba(255,255,255,.10);
        border: 1px solid rgba(255,255,255,.14);
      }

      .sales-contract span {
        display: block;
        color: rgba(255,255,255,.66);
        font-size: 14px;
        font-weight: 800;
      }

      .sales-contract strong {
        display: block;
        margin-top: 9px;
        font-size: clamp(30px, 4vw, 44px);
        line-height: 1.05;
        font-weight: 950;
        letter-spacing: -0.055em;
      }

      .sales-timeline {
        display: grid;
        grid-template-columns: repeat(5, minmax(0,1fr));
        gap: 10px;
        margin: 42px auto 0;
        max-width: 860px;
      }

      .sales-timeline div {
        position: relative;
        padding: 22px 12px;
        border-radius: 20px;
        background: #fff;
        border: 1px solid rgba(12,24,48,.08);
      }

      .sales-timeline div:not(:last-child)::after {
        content: '→';
        position: absolute;
        right: -14px;
        top: 50%;
        z-index: 2;
        transform: translateY(-50%);
        color: #2e66ff;
        font-size: 20px;
        font-weight: 950;
      }

      .sales-timeline span {
        color: #667085;
        font-size: 13px;
        font-weight: 800;
      }

      .sales-timeline strong {
        display: block;
        margin-top: 7px;
        color: #0f1931;
        font-size: 19px;
        font-weight: 950;
        letter-spacing: -0.04em;
      }

      .sales-timeline .is-end {
        background: #1f4f96;
        border-color: #1f4f96;
      }

      .sales-timeline .is-end span,
      .sales-timeline .is-end strong { color: #fff; }

      .sales-month-example {
        margin: 44px auto 0;
        max-width: 760px;
        padding: 34px 28px;
        border-radius: 30px;
        background: #fff;
        border: 1px solid rgba(12,24,48,.08);
        box-shadow: 0 18px 44px rgba(15,25,49,.07);
      }

      .sales-month-top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 18px;
      }

      .sales-month-top span {
        color: #667085;
        font-size: 16px;
        font-weight: 850;
      }

      .sales-month-top strong {
        color: #0f1931;
        font-size: clamp(38px, 5vw, 56px);
        font-weight: 950;
        letter-spacing: -0.055em;
      }

      .sales-month-result {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 18px;
        margin-top: 28px;
      }

      .sales-month-result div {
        padding: 22px 14px;
        border-radius: 22px;
        background: #eef3fb;
      }

      .sales-month-result span {
        display: block;
        color: #667085;
        font-size: 14px;
        font-weight: 850;
      }

      .sales-month-result strong {
        display: block;
        margin-top: 8px;
        color: #173766;
        font-size: clamp(32px, 4vw, 46px);
        font-weight: 950;
        letter-spacing: -0.05em;
      }

      .sales-month-result .is-card {
        background: #1f4f96;
      }

      .sales-month-result .is-card span,
      .sales-month-result .is-card strong { color: #fff; }

      .sales-saving-number {
        margin-top: 26px;
        color: #2e66ff;
        font-size: clamp(34px, 5vw, 58px);
        font-weight: 950;
        letter-spacing: -0.06em;
      }

      .sales-search-example {
        display: grid;
        grid-template-columns: repeat(4, minmax(0,1fr));
        gap: 12px;
        margin: 42px auto 0;
        max-width: 860px;
      }

      .sales-search-example div {
        padding: 24px 16px;
        border-radius: 22px;
        background: #fff;
        border: 1px solid rgba(12,24,48,.08);
      }

      .sales-search-example span {
        display: block;
        color: #667085;
        font-size: 13px;
        font-weight: 850;
      }

      .sales-search-example strong {
        display: block;
        margin-top: 7px;
        color: #0f1931;
        font-size: 20px;
        font-weight: 950;
        letter-spacing: -0.04em;
      }

      @media (max-width: 780px) {
        .sales-scene { min-height: 520px; padding: 68px 0; }
        .sales-wrap { width: 100%; }
        .sales-title { font-size: 39px; }
        .sales-desc { font-size: 17px; }
        .sales-price-compare,
        .sales-formula,
        .sales-month-result { grid-template-columns: 1fr; gap: 10px; }
        .sales-arrow { transform: rotate(90deg); font-size: 30px; }
        .sales-equals,
        .sales-plus { transform: rotate(90deg); font-size: 28px; }
        .sales-two-plan,
        .sales-contract { grid-template-columns: 1fr; }
        .sales-timeline { grid-template-columns: 1fr; }
        .sales-timeline div:not(:last-child)::after {
          content: '↓';
          right: auto;
          left: 50%;
          top: auto;
          bottom: -19px;
          transform: translateX(-50%);
        }
        .sales-month-example { padding: 26px 18px; }
        .sales-month-top { display: block; }
        .sales-month-top strong { display: block; margin-top: 8px; }
        .sales-search-example { grid-template-columns: repeat(2, minmax(0,1fr)); }
      }
    `;
    document.head.appendChild(style);
  }

  function after(selector, html) {
    const anchor = document.querySelector(selector);
    if (!anchor) return;
    anchor.insertAdjacentHTML('afterend', html);
  }

  function inject() {
    if (document.getElementById('sales-price-one')) return;
    addStyles();

    after('.review-flow-section', `
      <section id="sales-price-one" class="sales-scene sales-scene--dark">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">가격부터 보세요</span>
            <h2 class="sales-title">1명이 예약한다면?</h2>
            <div class="sales-price-compare">
              <div class="sales-price-block"><span>일반 예약 예시</span><strong>200만원</strong></div>
              <div class="sales-arrow">→</div>
              <div class="sales-price-block is-lower"><span>멤버십 예약 예시</span><strong>120만원</strong></div>
            </div>
            <div class="sales-difference">차이 <strong>80만원</strong></div>
          </div>
        </div>
      </section>

      <section id="sales-price-two" class="sales-scene sales-scene--blue">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">둘이 가면?</span>
            <h2 class="sales-title">가격 차이도 2배가 됩니다</h2>
            <div class="sales-price-compare">
              <div class="sales-price-block"><span>2인 일반 예약 예시</span><strong>400만원</strong></div>
              <div class="sales-arrow">→</div>
              <div class="sales-price-block is-lower"><span>2인 멤버십 예약 예시</span><strong>240만원</strong></div>
            </div>
            <div class="sales-difference">2인 차이 <strong>160만원</strong></div>
          </div>
        </div>
      </section>
    `);

    after('#why-direct', `
      <section id="sales-identity" class="sales-scene sales-scene--soft">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">그래서 인크루즈가 뭔가요?</span>
            <h2 class="sales-title">크루즈 예약을 위한<br>월 구독 멤버십입니다</h2>
            <div class="sales-identity">
              <span>inCruises</span>
              <strong>매월 포인트를 쌓고<br>크루즈 예약할 때 사용</strong>
            </div>
          </div>
        </div>
      </section>
    `);

    after('#travel-subscribe', `
      <section id="sales-points-basic" class="sales-scene sales-scene--white">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">매월 결제하면 어떻게 되나요?</span>
            <h2 class="sales-title">낸 금액보다<br>포인트가 2배로 쌓입니다</h2>
            <div class="sales-two-plan">
              <div class="sales-plan-mini">
                <span>클래식</span>
                <strong>$100 /월</strong>
                <b>200P</b>
              </div>
              <div class="sales-plan-mini is-premium">
                <span>프리미엄</span>
                <strong>$250 /월</strong>
                <b>500P</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales-points-speed" class="sales-scene sales-scene--soft">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">예: 1,000P를 모은다면</span>
            <h2 class="sales-title">플랜에 따라<br>쌓이는 속도만 다릅니다</h2>
            <div class="sales-two-plan">
              <div class="sales-plan-mini">
                <span>클래식 · 매월 200P</span>
                <strong>5개월</strong>
                <b>1,000P</b>
              </div>
              <div class="sales-plan-mini is-premium">
                <span>프리미엄 · 매월 500P</span>
                <strong>2개월</strong>
                <b>1,000P</b>
              </div>
            </div>
            <p class="sales-desc">월 적립분만 계산한 예시입니다.</p>
          </div>
        </div>
      </section>
    `);

    after('#plans', `
      <section id="sales-contract" class="sales-scene sales-scene--blue">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">매월 구독이라 부담되나요?</span>
            <h2 class="sales-title">약정으로 묶이는 구독이 아닙니다</h2>
            <div class="sales-contract">
              <div><span>의무 유지기간</span><strong>약정 없음</strong></div>
              <div><span>중도 해지 비용</span><strong>해지 위약금 없음</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales-cancel-after-trip" class="sales-scene sales-scene--soft">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">그럼 언제까지 유지하나요?</span>
            <h2 class="sales-title">여행 다녀온 뒤<br>해지하면 됩니다</h2>
            <div class="sales-timeline">
              <div><span>01</span><strong>가입</strong></div>
              <div><span>02</span><strong>포인트 적립</strong></div>
              <div><span>03</span><strong>크루즈 예약</strong></div>
              <div><span>04</span><strong>여행</strong></div>
              <div class="is-end"><span>05</span><strong>해지 가능</strong></div>
            </div>
          </div>
        </div>
      </section>
    `);

    after('#earn-points', `
      <section id="sales-fifty-fifty" class="sales-scene sales-scene--white">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">포인트는 어떻게 쓰나요?</span>
            <h2 class="sales-title">일반 예약은<br>50% 포인트 + 50% 카드</h2>
            <div class="sales-formula">
              <div class="sales-formula-card is-blue"><span>포인트</span><strong>1,000P</strong></div>
              <div class="sales-plus">+</div>
              <div class="sales-formula-card"><span>카드 결제</span><strong>$1,000</strong></div>
            </div>
            <p class="sales-desc">$2,000 크루즈 예약 예시</p>
          </div>
        </div>
      </section>

      <section id="sales-cost-logic" class="sales-scene sales-scene--dark">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">왜 쌓을수록 저렴해지나요?</span>
            <h2 class="sales-title">1,000P를 만드는 데<br>실제 납부는 $500</h2>
            <div class="sales-formula">
              <div class="sales-price-block"><span>멤버십 납부</span><strong>$500</strong></div>
              <div class="sales-plus">+</div>
              <div class="sales-price-block is-lower"><span>예약 시 카드</span><strong>$1,000</strong></div>
            </div>
            <div class="sales-difference">총 실제 지출 예시 <strong>$1,500</strong></div>
            <p class="sales-desc">클래식 월 적립 기준 · 가입 리워드 제외 예시</p>
          </div>
        </div>
      </section>

      <section id="sales-month-one" class="sales-scene sales-scene--soft">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">$2,000 크루즈 · 클래식 예시</span>
            <h2 class="sales-title">1개월 쌓았다면?</h2>
            <div class="sales-month-example">
              <div class="sales-month-top"><span>멤버십 납부 $100</span><strong>200P 보유</strong></div>
              <div class="sales-month-result">
                <div><span>포인트 사용</span><strong>200P</strong></div>
                <div class="sales-plus">+</div>
                <div class="is-card"><span>카드 결제</span><strong>$1,800</strong></div>
              </div>
              <div class="sales-saving-number">실제 총 지출 $1,900</div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales-month-three" class="sales-scene sales-scene--white">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">$2,000 크루즈 · 클래식 예시</span>
            <h2 class="sales-title">3개월 쌓았다면?</h2>
            <div class="sales-month-example">
              <div class="sales-month-top"><span>멤버십 납부 $300</span><strong>600P 보유</strong></div>
              <div class="sales-month-result">
                <div><span>포인트 사용</span><strong>600P</strong></div>
                <div class="sales-plus">+</div>
                <div class="is-card"><span>카드 결제</span><strong>$1,400</strong></div>
              </div>
              <div class="sales-saving-number">실제 총 지출 $1,700</div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales-month-five" class="sales-scene sales-scene--blue">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">$2,000 크루즈 · 클래식 예시</span>
            <h2 class="sales-title">5개월 쌓았다면?</h2>
            <div class="sales-month-example">
              <div class="sales-month-top"><span>멤버십 납부 $500</span><strong>1,000P 보유</strong></div>
              <div class="sales-month-result">
                <div><span>포인트 사용</span><strong>1,000P</strong></div>
                <div class="sales-plus">+</div>
                <div class="is-card"><span>카드 결제</span><strong>$1,000</strong></div>
              </div>
              <div class="sales-saving-number">실제 총 지출 $1,500</div>
            </div>
          </div>
        </div>
      </section>
    `);

    after('#calculator', `
      <section id="sales-early-booking" class="sales-scene sales-scene--dark">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">더 미리 계획한다면?</span>
            <h2 class="sales-title">270일 이후 출발은<br>조건에 따라 최대 전액 포인트</h2>
            <div class="sales-formula">
              <div class="sales-price-block"><span>일반 예약</span><strong>최대 50%</strong></div>
              <div class="sales-arrow">→</div>
              <div class="sales-price-block is-lower"><span>270일 이후 출발</span><strong>최대 100%</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales-search" class="sales-scene sales-scene--soft">
        <div class="container">
          <div class="sales-wrap">
            <span class="sales-kicker">예약할 때는?</span>
            <h2 class="sales-title">내가 원하는 크루즈를<br>직접 고릅니다</h2>
            <div class="sales-search-example">
              <div><span>지역</span><strong>지중해</strong></div>
              <div><span>출발</span><strong>2027년 6월</strong></div>
              <div><span>선사</span><strong>MSC</strong></div>
              <div><span>객실</span><strong>발코니</strong></div>
            </div>
          </div>
        </div>
      </section>
    `);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject, { once: true });
  } else {
    inject();
  }
})();

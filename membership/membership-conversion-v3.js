(() => {
  const STYLE_ID = 'ingroup-conversion-v3-style';
  const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';
  const FALLBACK_RATE = 1486.89;

  const section = (id, tone, body) => `
    <section id="${id}" class="ig3-section ${tone} ig3-reveal">
      <div class="container"><div class="ig3-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig3-section,.ig3-section *{box-sizing:border-box}
      .ig3-section{min-height:610px;display:flex;align-items:center;padding:92px 0;overflow:hidden}
      .ig3-white{background:#fff;color:#0f1931}.ig3-soft{background:#f3f6fb;color:#0f1931}.ig3-dark{background:#0f1931;color:#fff}.ig3-blue{background:linear-gradient(135deg,#1f4f96,#173766);color:#fff}
      .ig3-wrap{width:min(980px,100%);margin:0 auto;text-align:center}

      .ig3-title{margin:0;font-size:clamp(42px,5.5vw,70px);line-height:1.06;letter-spacing:-.06em;font-weight:820}
      .ig3-lead{margin:28px auto 0;max-width:840px;font-size:clamp(25px,3vw,36px);line-height:1.42;letter-spacing:-.035em;font-weight:520}
      .ig3-lead strong{font-weight:820}
      .ig3-accent{color:#2e66ff}.ig3-dark .ig3-accent,.ig3-blue .ig3-accent{color:#b8ceff}

      .ig3-compare{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:22px;max-width:860px;margin:48px auto 0}
      .ig3-card{padding:34px 26px;border-radius:30px;background:#fff;border:1px solid rgba(12,24,48,.10);color:#0f1931}
      .ig3-dark .ig3-card,.ig3-blue .ig3-card{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16);color:#fff}
      .ig3-card-label{display:block;font-size:clamp(22px,2.5vw,28px);line-height:1.25;font-weight:560}
      .ig3-card strong{display:block;margin-top:14px;font-size:clamp(50px,6.5vw,82px);line-height:.95;letter-spacing:-.065em;font-weight:900}
      .ig3-symbol{font-size:42px;font-weight:700;color:#84aaff}

      .ig3-number{margin-top:44px;font-size:clamp(70px,9vw,118px);line-height:.92;letter-spacing:-.075em;font-weight:900}
      .ig3-caption{margin-top:22px;font-size:clamp(24px,2.8vw,34px);line-height:1.35;font-weight:540}
      .ig3-caption strong{font-weight:820}

      .ig3-pill{display:inline-flex;align-items:center;justify-content:center;margin-bottom:28px;padding:14px 24px;border-radius:999px;background:#eaf1ff;color:#2e66ff;font-size:clamp(22px,2.4vw,28px);font-weight:720}
      .ig3-dark .ig3-pill,.ig3-blue .ig3-pill{background:rgba(255,255,255,.12);color:#fff}

      .ig3-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:900px;margin:48px auto 0}
      .ig3-step{padding:34px 24px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.10);color:#0f1931}
      .ig3-step b{display:flex;width:58px;height:58px;align-items:center;justify-content:center;margin:0 auto 22px;border-radius:50%;background:#eaf1ff;color:#2e66ff;font-size:24px;font-weight:800}
      .ig3-step strong{display:block;font-size:clamp(28px,3vw,36px);line-height:1.28;letter-spacing:-.04em;font-weight:760}
      .ig3-step em{display:block;margin-top:12px;font-style:normal;font-size:clamp(21px,2.3vw,26px);line-height:1.4;font-weight:480;color:#667085}

      .ig3-stack{max-width:820px;margin:46px auto 0;text-align:left}
      .ig3-row{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:28px 4px;border-top:1px solid rgba(12,24,48,.13)}
      .ig3-dark .ig3-row,.ig3-blue .ig3-row{border-color:rgba(255,255,255,.18)}
      .ig3-row:first-child{border-top:0}
      .ig3-row span{font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:520}
      .ig3-row strong{font-size:clamp(38px,4.8vw,58px);line-height:1;font-weight:840;letter-spacing:-.05em}
      .ig3-row.total{margin-top:8px;padding-top:32px;border-top:3px solid #2e66ff}
      .ig3-row.total span{font-weight:720}.ig3-row.total strong{color:#2e66ff;font-weight:900}
      .ig3-dark .ig3-row.total strong,.ig3-blue .ig3-row.total strong{color:#b8ceff}

      .ig3-choice{display:grid;gap:18px;max-width:820px;margin:46px auto 0}
      .ig3-choice div{padding:30px 26px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.10);color:#0f1931;font-size:clamp(28px,3.4vw,40px);line-height:1.25;font-weight:680}
      .ig3-dark .ig3-choice div,.ig3-blue .ig3-choice div{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16);color:#fff}
      .ig3-choice strong{font-weight:880}

      .ig3-plan{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:48px auto 0}
      .ig3-plan-card{padding:38px 32px;border-radius:32px;background:#fff;border:1px solid rgba(12,24,48,.10);text-align:left;color:#0f1931}
      .ig3-plan-card.is-premium{background:#1f4f96;color:#fff;border-color:#1f4f96}
      .ig3-plan-card h3{margin:0;font-size:clamp(32px,3.8vw,46px);font-weight:720}
      .ig3-plan-card strong{display:block;margin-top:24px;font-size:clamp(52px,6.6vw,82px);line-height:.95;letter-spacing:-.065em;font-weight:900}
      .ig3-plan-card p{margin:24px 0 0;font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:500}
      .ig3-plan-card p b{font-weight:780}

      .ig3-timing{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:900px;margin:48px auto 0}
      .ig3-time{padding:34px 20px;border-radius:28px;background:#fff;border:1px solid rgba(12,24,48,.10);color:#0f1931}
      .ig3-time span{display:block;font-size:clamp(24px,2.7vw,32px);font-weight:540}
      .ig3-time strong{display:block;margin-top:18px;color:#2e66ff;font-size:clamp(46px,5.8vw,72px);line-height:1;font-weight:900}

      .ig3-final{max-width:940px;margin:0 auto;padding:58px 38px;border-radius:36px;background:#0f1931;color:#fff}
      .ig3-final strong{display:block;font-size:clamp(46px,5.8vw,74px);line-height:1.05;letter-spacing:-.06em;font-weight:820}
      .ig3-final .ig3-lead{color:#dbe7ff;font-weight:500}
      .ig3-final-btn{display:inline-flex;align-items:center;justify-content:center;min-height:72px;margin-top:40px;padding:0 42px;border:0;border-radius:18px;background:#fff;color:#173766;font-size:clamp(25px,2.8vw,32px);font-weight:780;cursor:pointer}

      .ig3-reveal{opacity:0;transform:translateY(44px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1)}
      .ig3-reveal.is-visible{opacity:1;transform:none}
      .ig3-reveal .ig3-title,.ig3-reveal .ig3-lead,.ig3-reveal .ig3-pill,.ig3-reveal .ig3-number,.ig3-reveal .ig3-caption,.ig3-reveal .ig3-card,.ig3-reveal .ig3-step,.ig3-reveal .ig3-row,.ig3-reveal .ig3-choice>div,.ig3-reveal .ig3-plan-card,.ig3-reveal .ig3-time,.ig3-reveal .ig3-final-btn{opacity:0;transform:translateY(24px);transition:opacity .58s cubic-bezier(.22,1,.36,1),transform .58s cubic-bezier(.22,1,.36,1)}
      .ig3-reveal.is-visible .ig3-title,.ig3-reveal.is-visible .ig3-pill{opacity:1;transform:none;transition-delay:.08s}
      .ig3-reveal.is-visible .ig3-lead,.ig3-reveal.is-visible .ig3-number,.ig3-reveal.is-visible .ig3-caption{opacity:1;transform:none;transition-delay:.16s}
      .ig3-reveal.is-visible .ig3-card:nth-child(1),.ig3-reveal.is-visible .ig3-step:nth-child(1),.ig3-reveal.is-visible .ig3-row:nth-child(1),.ig3-reveal.is-visible .ig3-choice>div:nth-child(1),.ig3-reveal.is-visible .ig3-plan-card:nth-child(1),.ig3-reveal.is-visible .ig3-time:nth-child(1){opacity:1;transform:none;transition-delay:.18s}
      .ig3-reveal.is-visible .ig3-card:nth-child(3),.ig3-reveal.is-visible .ig3-step:nth-child(2),.ig3-reveal.is-visible .ig3-row:nth-child(2),.ig3-reveal.is-visible .ig3-choice>div:nth-child(2),.ig3-reveal.is-visible .ig3-plan-card:nth-child(2),.ig3-reveal.is-visible .ig3-time:nth-child(2){opacity:1;transform:none;transition-delay:.27s}
      .ig3-reveal.is-visible .ig3-step:nth-child(3),.ig3-reveal.is-visible .ig3-row:nth-child(3),.ig3-reveal.is-visible .ig3-choice>div:nth-child(3),.ig3-reveal.is-visible .ig3-time:nth-child(3){opacity:1;transform:none;transition-delay:.36s}
      .ig3-reveal.is-visible .ig3-row:nth-child(4){opacity:1;transform:none;transition-delay:.45s}
      .ig3-reveal.is-visible .ig3-final-btn{opacity:1;transform:none;transition-delay:.28s}

      @media(max-width:780px){
        .ig3-section{min-height:560px;padding:72px 0}.ig3-title{font-size:39px}.ig3-lead{font-size:24px}
        .ig3-compare,.ig3-steps,.ig3-plan,.ig3-timing{grid-template-columns:1fr;gap:14px}.ig3-symbol{transform:rotate(90deg);font-size:30px}
        .ig3-row{grid-template-columns:1fr;gap:8px;text-align:center}.ig3-card-label{font-size:21px}.ig3-choice div{font-size:27px}
        .ig3-final{padding:44px 22px;border-radius:28px}.ig3-final-btn{width:100%}
      }
      @media(prefers-reduced-motion:reduce){.ig3-reveal,.ig3-reveal *{opacity:1!important;transform:none!important;transition:none!important}}
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
    document.querySelectorAll('[data-ig3-krw]').forEach((el) => {
      const usd = Number(el.dataset.ig3Krw || 0);
      el.textContent = `약 ${Math.round((usd * rate) / 10000).toLocaleString('ko-KR')}만원`;
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll('.ig3-reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach((node) => io.observe(node));
  }

  function inject() {
    if (document.getElementById('ig3-price')) return;
    addStyles();

    after('.review-flow-section',
      section('ig3-price','ig3-dark',`
        <h2 class="ig3-title">같은 크루즈라도<br>예약 가격은 달라질 수 있습니다</h2>
        <div class="ig3-compare">
          <div class="ig3-card"><span class="ig3-card-label">여행사 예약 예시</span><strong>200만원</strong></div>
          <div class="ig3-symbol">VS</div>
          <div class="ig3-card"><span class="ig3-card-label">인그룹 예약 예시</span><strong>120만원</strong></div>
        </div>
        <div class="ig3-number ig3-accent">80만원 차이</div>`)
    );

    after('#ig3-price',
      section('ig3-couple','ig3-blue',`
        <h2 class="ig3-title">둘이 가면<br>차이는 더 커집니다</h2>
        <div class="ig3-number">160만원</div>
        <div class="ig3-caption">1인 80만원 차이 × 2명</div>`)
    );

    after('#why-direct',
      section('ig3-difference','ig3-white',`
        <div class="ig3-pill">인그룹의 핵심 차이</div>
        <h2 class="ig3-title">월마다 내는 크루즈 상품은<br>이미 많습니다</h2>
        <div class="ig3-lead">하지만 <strong class="ig3-accent">낸 금액의 2배를 매월 적립</strong>하는 것이<br>인그룹의 가장 강한 차별점입니다</div>`)
      +
      section('ig3-classic-double','ig3-blue',`
        <h2 class="ig3-title">클래식은 매월<br>$100을 내면 200P</h2>
        <div class="ig3-compare">
          <div class="ig3-card"><span class="ig3-card-label">매월 실제 납부</span><strong>$100</strong></div>
          <div class="ig3-symbol">→</div>
          <div class="ig3-card"><span class="ig3-card-label">매월 적립</span><strong>200P</strong></div>
        </div>
        <div class="ig3-number">2배</div>`)
      +
      section('ig3-premium-double','ig3-dark',`
        <h2 class="ig3-title">프리미엄은 매월<br>$250을 내면 500P</h2>
        <div class="ig3-compare">
          <div class="ig3-card"><span class="ig3-card-label">매월 실제 납부</span><strong>$250</strong></div>
          <div class="ig3-symbol">→</div>
          <div class="ig3-card"><span class="ig3-card-label">매월 적립</span><strong>500P</strong></div>
        </div>
        <div class="ig3-number ig3-accent">2배</div>`)
    );

    after('#how-it-works',
      section('ig3-identity','ig3-soft',`
        <h2 class="ig3-title">인그룹은 이렇게<br>여행비를 준비하는 멤버십입니다</h2>
        <div class="ig3-steps">
          <div class="ig3-step"><b>1</b><strong>매월 멤버십 결제</strong></div>
          <div class="ig3-step"><b>2</b><strong>낸 금액의 2배 적립</strong></div>
          <div class="ig3-step"><b>3</b><strong>쌓은 포인트로 예약비 절감</strong></div>
        </div>`)
      +
      section('ig3-five-months','ig3-white',`
        <h2 class="ig3-title">클래식을 5개월 이용하면<br>숫자가 이렇게 바뀝니다</h2>
        <div class="ig3-stack">
          <div class="ig3-row"><span>매월 납부</span><strong>$100</strong></div>
          <div class="ig3-row"><span>5개월 실제 납부</span><strong>$500</strong></div>
          <div class="ig3-row total"><span>5개월 동안 적립</span><strong>1,000P</strong></div>
        </div>`)
      +
      section('ig3-no-point','ig3-soft',`
        <h2 class="ig3-title">포인트가 없다면<br>$2,000 크루즈는 그대로 $2,000</h2>
        <div class="ig3-number">카드 $2,000</div>
        <div class="ig3-caption">전액 카드로 결제</div>`)
      +
      section('ig3-use-point','ig3-blue',`
        <h2 class="ig3-title">1,000P를 쌓아뒀다면<br>결제 구조가 달라집니다</h2>
        <div class="ig3-compare">
          <div class="ig3-card"><span class="ig3-card-label">포인트 사용</span><strong>1,000P</strong></div>
          <div class="ig3-symbol">+</div>
          <div class="ig3-card"><span class="ig3-card-label">카드 결제</span><strong>$1,000</strong></div>
        </div>
        <div class="ig3-caption">같은 $2,000 크루즈 예약</div>`)
      +
      section('ig3-real-spend','ig3-white',`
        <h2 class="ig3-title">결국 내 통장에서<br>실제로 나간 돈을 봐야 합니다</h2>
        <div class="ig3-stack">
          <div class="ig3-row"><span>5개월 멤버십 비용</span><strong>$500</strong></div>
          <div class="ig3-row"><span>예약할 때 카드 결제</span><strong>$1,000</strong></div>
          <div class="ig3-row total"><span>실제 총지출</span><strong>$1,500</strong></div>
        </div>
        <div class="ig3-number ig3-accent">$500 절감 예시</div>`)
      +
      section('ig3-krw','ig3-dark',`
        <h2 class="ig3-title">원화로 보면<br>차이가 더 쉽게 보입니다</h2>
        <div class="ig3-stack">
          <div class="ig3-row"><span>포인트 없이 전액 카드 결제</span><strong data-ig3-krw="2000">계산 중</strong></div>
          <div class="ig3-row total"><span>5개월 멤버십 포함 실제 지출</span><strong data-ig3-krw="1500">계산 중</strong></div>
        </div>`)
      +
      section('ig3-accum','ig3-soft',`
        <h2 class="ig3-title">여행 전에 쌓아둘수록<br>쓸 수 있는 포인트가 커집니다</h2>
        <div class="ig3-timing">
          <div class="ig3-time"><span>클래식 3개월</span><strong>600P</strong></div>
          <div class="ig3-time"><span>클래식 6개월</span><strong>1,200P</strong></div>
          <div class="ig3-time"><span>클래식 12개월</span><strong>2,400P</strong></div>
        </div>`)
      +
      section('ig3-no-contract','ig3-blue',`
        <h2 class="ig3-title">매월 결제하지만<br>장기 약정 상품은 아닙니다</h2>
        <div class="ig3-choice">
          <div>약정기간 <strong>없음</strong></div>
          <div>해지 위약금 <strong>없음</strong></div>
          <div>여행 후 <strong>해지 가능</strong></div>
        </div>`)
      +
      section('ig3-use-flow','ig3-dark',`
        <h2 class="ig3-title">실제 이용은<br>세 단계로 끝납니다</h2>
        <div class="ig3-steps">
          <div class="ig3-step"><b>1</b><strong>멤버십 가입</strong></div>
          <div class="ig3-step"><b>2</b><strong>매월 2배 적립</strong></div>
          <div class="ig3-step"><b>3</b><strong>포인트 적용 후 예약</strong></div>
        </div>`)
    );

    after('#plans',
      section('ig3-plan-guide','ig3-white',`
        <h2 class="ig3-title">내가 쌓고 싶은 속도로<br>플랜을 고르면 됩니다</h2>
        <div class="ig3-plan">
          <div class="ig3-plan-card">
            <h3>클래식</h3>
            <strong>$100 → 200P</strong>
            <p>매월 부담을 낮게 시작하면서 <b>2배 적립</b></p>
          </div>
          <div class="ig3-plan-card is-premium">
            <h3>프리미엄</h3>
            <strong>$250 → 500P</strong>
            <p>여행 계획이 빠르면 <b>더 빠르게 포인트 확보</b></p>
          </div>
        </div>`)
    );

    before('#calculator',
      section('ig3-timing-guide','ig3-soft',`
        <h2 class="ig3-title">여행 직전에 가입하는 것보다<br>미리 시작할수록 유리합니다</h2>
        <div class="ig3-timing">
          <div class="ig3-time"><span>3개월 전 시작</span><strong>600P</strong></div>
          <div class="ig3-time"><span>6개월 전 시작</span><strong>1,200P</strong></div>
          <div class="ig3-time"><span>12개월 전 시작</span><strong>2,400P</strong></div>
        </div>
        <div class="ig3-caption">클래식 기준</div>`)
      +
      section('ig3-calculator-intro','ig3-white',`
        <h2 class="ig3-title">이제 내 여행 금액으로<br>직접 계산해보면 됩니다</h2>
        <div class="ig3-lead">크루즈 가격을 움직이면<br><strong class="ig3-accent">포인트 사용액과 카드 결제액</strong>이 바로 바뀝니다</div>`)
    );

    after('#calculator',
      section('ig3-after-trip','ig3-blue',`
        <h2 class="ig3-title">여행을 다녀왔다면<br>계속 유지할 필요도 없습니다</h2>
        <div class="ig3-choice">
          <div>여행 완료</div>
          <div>필요 없으면 <strong>해지</strong></div>
          <div>해지 위약금 <strong>없음</strong></div>
        </div>`)
    );

    before('#membership-summary',
      section('ig3-final-check','ig3-dark',`
        <h2 class="ig3-title">가입 전에<br>이 네 가지만 기억하면 됩니다</h2>
        <div class="ig3-choice">
          <div>$100 → <strong>200P</strong></div>
          <div>$250 → <strong>500P</strong></div>
          <div>포인트가 쌓일수록 <strong>카드 결제액 감소</strong></div>
          <div>약정·해지 위약금 <strong>없음</strong></div>
        </div>`)
    );

    after('#hotel-benefit',
      section('ig3-final','ig3-white',`
        <div class="ig3-final">
          <strong>월납 자체가<br>인그룹의 강점은 아닙니다</strong>
          <div class="ig3-lead">매월 낸 금액보다 <strong class="ig3-accent">2배의 포인트가 쌓이고</strong><br>그 포인트로 실제 예약비를 줄이는 구조가 핵심입니다</div>
          <button type="button" class="ig3-final-btn">멤버십 플랜 보기</button>
        </div>`)
    );

    hydrateKrw();
    initReveal();

    document.querySelector('.ig3-final-btn')?.addEventListener('click', () => {
      document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once: true });
  else inject();
})();
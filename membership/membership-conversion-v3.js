(() => {
  const STYLE_ID = 'ingroup-conversion-story-v4-style';

  const section = (id, tone, body) => `
    <section id="${id}" class="ig4-section ${tone} ig4-reveal">
      <div class="container"><div class="ig4-wrap">${body}</div></div>
    </section>`;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ig4-section,.ig4-section *{box-sizing:border-box}
      .ig4-section{min-height:620px;display:flex;align-items:center;padding:96px 0;overflow:hidden}
      .ig4-white{background:#fff;color:#111a2e}.ig4-soft{background:#f4f6fa;color:#111a2e}.ig4-dark{background:#101a31;color:#fff}.ig4-blue{background:linear-gradient(135deg,#214f96,#173765);color:#fff}
      .ig4-wrap{width:min(980px,100%);margin:0 auto;text-align:center}
      .ig4-eyebrow{display:inline-block;margin-bottom:22px;font-size:clamp(22px,2.4vw,28px);font-weight:600;color:#3569bb}
      .ig4-dark .ig4-eyebrow,.ig4-blue .ig4-eyebrow{color:#b8ceff}
      .ig4-title{margin:0;font-size:clamp(44px,5.7vw,76px);line-height:1.06;letter-spacing:-.06em;font-weight:760}
      .ig4-title strong{font-weight:920}
      .ig4-lead{margin:30px auto 0;max-width:860px;font-size:clamp(27px,3.2vw,40px);line-height:1.38;letter-spacing:-.035em;font-weight:480}
      .ig4-lead strong{font-weight:820}
      .ig4-accent{color:#2e66ff}.ig4-dark .ig4-accent,.ig4-blue .ig4-accent{color:#b9ceff}
      .ig4-number{margin-top:42px;font-size:clamp(76px,10vw,132px);line-height:.92;letter-spacing:-.075em;font-weight:920}
      .ig4-number-sub{margin-top:22px;font-size:clamp(27px,3vw,38px);font-weight:520;line-height:1.35}

      .ig4-arrow{margin:34px 0;font-size:50px;font-weight:700;color:#83a6e7}
      .ig4-two{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:22px;max-width:880px;margin:48px auto 0}
      .ig4-box{padding:34px 26px;border-radius:30px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#111a2e}
      .ig4-dark .ig4-box,.ig4-blue .ig4-box{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.16);color:#fff}
      .ig4-box span{display:block;font-size:clamp(24px,2.6vw,30px);font-weight:500;line-height:1.3}
      .ig4-box strong{display:block;margin-top:14px;font-size:clamp(52px,6.6vw,86px);line-height:.95;letter-spacing:-.065em;font-weight:900}
      .ig4-symbol{font-size:44px;font-weight:700;color:#83a6e7}

      .ig4-stack{max-width:840px;margin:46px auto 0;text-align:left}
      .ig4-row{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:28px 4px;border-top:1px solid rgba(12,24,48,.13)}
      .ig4-dark .ig4-row,.ig4-blue .ig4-row{border-color:rgba(255,255,255,.18)}
      .ig4-row:first-child{border-top:0}
      .ig4-row span{font-size:clamp(25px,2.9vw,34px);line-height:1.35;font-weight:480}
      .ig4-row strong{font-size:clamp(40px,5vw,62px);line-height:1;font-weight:840;letter-spacing:-.05em}
      .ig4-row.total{margin-top:8px;padding-top:32px;border-top:3px solid #2e66ff}
      .ig4-row.total span{font-weight:680}.ig4-row.total strong{color:#2e66ff;font-weight:920}
      .ig4-dark .ig4-row.total strong,.ig4-blue .ig4-row.total strong{color:#b9ceff}

      .ig4-rule{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:48px auto 0}
      .ig4-rule-card{padding:38px 30px;border-radius:30px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#111a2e}
      .ig4-rule-card strong{display:block;font-size:clamp(42px,5vw,64px);font-weight:900;line-height:1.05}
      .ig4-rule-card span{display:block;margin-top:18px;font-size:clamp(25px,2.9vw,34px);font-weight:500;line-height:1.35}

      .ig4-example{max-width:900px;margin:48px auto 0;padding:38px 34px;border-radius:34px;background:#fff;border:1px solid rgba(12,24,48,.1);color:#111a2e;text-align:left}
      .ig4-example-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding-bottom:28px;border-bottom:1px solid rgba(12,24,48,.12)}
      .ig4-example-head h3{margin:0;font-size:clamp(36px,4.3vw,54px);font-weight:760;letter-spacing:-.05em}
      .ig4-example-head strong{font-size:clamp(46px,5.8vw,72px);font-weight:920;line-height:1}
      .ig4-example-rows{display:grid;gap:0}
      .ig4-example-row{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center;padding:24px 0;border-top:1px solid rgba(12,24,48,.1)}
      .ig4-example-row:first-child{border-top:0}
      .ig4-example-row span{font-size:clamp(25px,2.9vw,33px);font-weight:480;line-height:1.3}
      .ig4-example-row strong{font-size:clamp(34px,4.3vw,52px);font-weight:820}
      .ig4-saving{margin-top:28px;padding-top:28px;border-top:3px solid #2e66ff;text-align:center}
      .ig4-saving span{display:block;font-size:clamp(25px,2.9vw,34px);font-weight:520}
      .ig4-saving strong{display:block;margin-top:12px;color:#2e66ff;font-size:clamp(58px,7.2vw,92px);line-height:.95;font-weight:920}

      .ig4-checks{display:grid;gap:18px;max-width:840px;margin:46px auto 0}
      .ig4-check{padding:30px 26px;border-radius:28px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);font-size:clamp(30px,3.6vw,44px);line-height:1.25;font-weight:560}
      .ig4-check strong{font-weight:880}

      .ig4-final{max-width:940px;margin:0 auto;padding:58px 38px;border-radius:36px;background:#101a31;color:#fff}
      .ig4-final strong{display:block;font-size:clamp(48px,6vw,78px);line-height:1.04;letter-spacing:-.06em;font-weight:820}
      .ig4-final p{margin:28px auto 0;font-size:clamp(27px,3.2vw,38px);line-height:1.38;font-weight:480;color:#dce7ff}
      .ig4-btn{display:inline-flex;align-items:center;justify-content:center;min-height:74px;margin-top:40px;padding:0 42px;border:0;border-radius:18px;background:#fff;color:#173766;font-size:clamp(26px,2.9vw,34px);font-weight:760;cursor:pointer}

      .ig4-reveal{opacity:0;transform:translateY(42px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1)}
      .ig4-reveal.is-visible{opacity:1;transform:none}
      .ig4-reveal .ig4-eyebrow,.ig4-reveal .ig4-title,.ig4-reveal .ig4-lead,.ig4-reveal .ig4-number,.ig4-reveal .ig4-number-sub,.ig4-reveal .ig4-box,.ig4-reveal .ig4-row,.ig4-reveal .ig4-rule-card,.ig4-reveal .ig4-example,.ig4-reveal .ig4-check,.ig4-reveal .ig4-btn{opacity:0;transform:translateY(22px);transition:opacity .56s cubic-bezier(.22,1,.36,1),transform .56s cubic-bezier(.22,1,.36,1)}
      .ig4-reveal.is-visible .ig4-eyebrow,.ig4-reveal.is-visible .ig4-title{opacity:1;transform:none;transition-delay:.06s}
      .ig4-reveal.is-visible .ig4-lead,.ig4-reveal.is-visible .ig4-number,.ig4-reveal.is-visible .ig4-number-sub{opacity:1;transform:none;transition-delay:.14s}
      .ig4-reveal.is-visible .ig4-box,.ig4-reveal.is-visible .ig4-rule-card,.ig4-reveal.is-visible .ig4-example,.ig4-reveal.is-visible .ig4-check,.ig4-reveal.is-visible .ig4-btn{opacity:1;transform:none;transition-delay:.2s}
      .ig4-reveal.is-visible .ig4-row{opacity:1;transform:none;transition-delay:.18s}
      .ig4-reveal.is-visible .ig4-row:nth-child(2){transition-delay:.25s}.ig4-reveal.is-visible .ig4-row:nth-child(3){transition-delay:.32s}.ig4-reveal.is-visible .ig4-row:nth-child(4){transition-delay:.39s}

      @media(max-width:780px){
        .ig4-section{min-height:560px;padding:74px 0}.ig4-title{font-size:40px}.ig4-lead{font-size:25px}
        .ig4-two,.ig4-rule{grid-template-columns:1fr;gap:14px}.ig4-symbol{transform:rotate(90deg);font-size:30px}
        .ig4-row,.ig4-example-row{grid-template-columns:1fr;gap:8px;text-align:center}.ig4-example-head{display:block;text-align:center}.ig4-example-head strong{display:block;margin-top:16px}
        .ig4-example{padding:32px 22px}.ig4-btn{width:100%}
      }
      @media(prefers-reduced-motion:reduce){.ig4-reveal,.ig4-reveal *{opacity:1!important;transform:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function initReveal() {
    const nodes = document.querySelectorAll('.ig4-reveal');
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
    }, { threshold: 0.13, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach((node) => io.observe(node));
  }

  function buildExample(id, tone, name, cruisePrice, months, points, usedPoints, card, actual, saved, percent) {
    return section(id, tone, `
      <span class="ig4-eyebrow">${name} 예시</span>
      <h2 class="ig4-title">미리 준비했을 때<br><strong>얼마나 달라질까요?</strong></h2>
      <div class="ig4-example">
        <div class="ig4-example-head"><h3>${name}</h3><strong>$${cruisePrice.toLocaleString()}</strong></div>
        <div class="ig4-example-rows">
          <div class="ig4-example-row"><span>${months}개월 동안 납부</span><strong>$${(months * 100).toLocaleString()}</strong></div>
          <div class="ig4-example-row"><span>쌓인 포인트</span><strong>${points.toLocaleString()}P</strong></div>
          <div class="ig4-example-row"><span>예약 시 사용</span><strong>${usedPoints.toLocaleString()}P + 카드 $${card.toLocaleString()}</strong></div>
          <div class="ig4-example-row"><span>멤버십 포함 실제 지출</span><strong>$${actual.toLocaleString()}</strong></div>
        </div>
        <div class="ig4-saving"><span>그냥 $${cruisePrice.toLocaleString()} 결제할 때보다</span><strong>$${saved.toLocaleString()} 절감</strong><span>약 ${percent}% 낮아지는 예시</span></div>
      </div>`);
  }

  function inject() {
    if (document.getElementById('ig4-problem')) return;
    addStyles();

    const review = document.querySelector('.review-flow-section');
    if (!review) return;

    const html =
      section('ig4-problem','ig4-dark',`
        <span class="ig4-eyebrow">크루즈는 가고 싶은데</span>
        <h2 class="ig4-title">부담되는 럭셔리 크루즈 여행 가격<br><strong>최저가로 갈 수 있는 방법 없을까요?</strong></h2>`)
      + section('ig4-answer','ig4-blue',`
        <span class="ig4-eyebrow">방법은 단순합니다</span>
        <h2 class="ig4-title">여행 직전에 결제하지 말고<br><strong>미리 준비하세요</strong></h2>
        <div class="ig4-number">약 25%</div>
        <div class="ig4-number-sub">미리 쌓아두면 실제 지출을 크게 줄일 수 있습니다</div>`)
      + section('ig4-how','ig4-white',`
        <span class="ig4-eyebrow">어떻게?</span>
        <h2 class="ig4-title">매월 <strong>$100</strong>을 납부합니다</h2>
        <div class="ig4-two">
          <div class="ig4-box"><span>내가 납부</span><strong>$100</strong></div>
          <div class="ig4-symbol">→</div>
          <div class="ig4-box"><span>매월 적립</span><strong class="ig4-accent">200P</strong></div>
        </div>
        <div class="ig4-lead">낸 금액이 그대로 쌓이는 게 아니라<br><strong>2배 포인트로 적립됩니다</strong></div>`)
      + section('ig4-rule','ig4-soft',`
        <span class="ig4-eyebrow">포인트는 어떻게 쓰나요?</span>
        <h2 class="ig4-title">쌓인 포인트는<br><strong>크루즈 예약에 사용합니다</strong></h2>
        <div class="ig4-rule">
          <div class="ig4-rule-card"><strong>100%</strong><span>내가 보유한 포인트는 사용 가능</span></div>
          <div class="ig4-rule-card"><strong>최대 50%</strong><span>한 번 예약할 때 크루즈 가격의 절반까지 포인트 적용</span></div>
        </div>`)
      + section('ig4-eight','ig4-white',`
        <span class="ig4-eyebrow">그럼 실제로 계산해보겠습니다</span>
        <h2 class="ig4-title">$100씩 <strong>8개월</strong> 준비했다면?</h2>
        <div class="ig4-stack">
          <div class="ig4-row"><span>매월 납부</span><strong>$100</strong></div>
          <div class="ig4-row"><span>8개월 동안 납부한 금액</span><strong>$800</strong></div>
          <div class="ig4-row total"><span>쌓인 포인트</span><strong>1,600P</strong></div>
        </div>`)
      + section('ig4-3000','ig4-blue',`
        <span class="ig4-eyebrow">이제 $3,000 크루즈를 예약합니다</span>
        <h2 class="ig4-title">크루즈 가격의 50%까지<br><strong>포인트를 사용할 수 있습니다</strong></h2>
        <div class="ig4-two">
          <div class="ig4-box"><span>포인트 사용</span><strong>1,500P</strong></div>
          <div class="ig4-symbol">+</div>
          <div class="ig4-box"><span>카드 결제</span><strong>$1,500</strong></div>
        </div>
        <div class="ig4-lead">1,600P 중 1,500P 사용<br><strong>남은 100P는 그대로 보유</strong></div>`)
      + section('ig4-real','ig4-white',`
        <span class="ig4-eyebrow">그래서 실제 지출은?</span>
        <h2 class="ig4-title">$3,000을 전부 카드로 내는 대신</h2>
        <div class="ig4-stack">
          <div class="ig4-row"><span>8개월 멤버십 납부</span><strong>$800</strong></div>
          <div class="ig4-row"><span>크루즈 예약 카드 결제</span><strong>$1,500</strong></div>
          <div class="ig4-row total"><span>실제 총지출</span><strong>$2,300</strong></div>
        </div>
        <div class="ig4-number ig4-accent">$700 절감</div>
        <div class="ig4-number-sub">$3,000 → $2,300 · 약 23% 낮아지는 계산</div>`)
      + section('ig4-why25','ig4-dark',`
        <span class="ig4-eyebrow">핵심은 여기입니다</span>
        <h2 class="ig4-title">포인트를 많이 쌓는 게 목적이 아니라<br><strong>여행할 때 내 돈을 덜 쓰는 것</strong></h2>
        <div class="ig4-lead">여행 날짜가 멀수록 준비할 시간이 생기고<br>그만큼 <strong class="ig4-accent">카드로 낼 금액을 줄일 수 있습니다</strong></div>`)
      + buildExample('ig4-asia','ig4-soft','아시아 크루즈',2000,5,1000,1000,1000,1500,500,25)
      + buildExample('ig4-med','ig4-white','지중해 크루즈',3000,8,1600,1500,1500,2300,700,23)
      + buildExample('ig4-north','ig4-soft','북유럽 크루즈',4000,10,2000,2000,2000,3000,1000,25)
      + buildExample('ig4-disney','ig4-white','디즈니 크루즈',4800,12,2400,2400,2400,3600,1200,25)
      + section('ig4-freedom','ig4-blue',`
        <span class="ig4-eyebrow">매월 납부가 부담될까 걱정된다면</span>
        <h2 class="ig4-title">장기 약정으로 묶이는 상품이 아닙니다</h2>
        <div class="ig4-checks">
          <div class="ig4-check"><strong>약정기간 없음</strong></div>
          <div class="ig4-check"><strong>해지 위약금 없음</strong></div>
          <div class="ig4-check">여행 다녀온 뒤 <strong>해지 가능</strong></div>
        </div>`)
      + section('ig4-final','ig4-white',`
        <div class="ig4-final">
          <strong>크루즈를 몇 달 뒤에 갈 계획이라면<br>준비는 지금 시작하는 게 유리합니다</strong>
          <p>$100 → 200P<br>미리 쌓고, 여행할 때 카드 결제를 줄이는 방식입니다.</p>
          <button type="button" class="ig4-btn">멤버십 플랜 확인하기</button>
        </div>`);

    review.insertAdjacentHTML('afterend', html);

    const btn = document.querySelector('.ig4-btn');
    if (btn) btn.addEventListener('click', () => document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject, { once: true });
  else inject();
})();
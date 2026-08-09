// Homepage static presentation overrides.
// Public guide images and the membership introduction do not depend on Google Sheets runtime lookup.
(function () {
  var data = window.MOCK_BOOTSTRAP_DATA || {};
  var basicInfo = Array.isArray(data.basic_info) ? data.basic_info : [];
  var images = {
    cruise_easy: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=85&w=1600&h=1000&auto=format&fit=crop',
    cruise_freedom: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=85&w=1600&h=1000&auto=format&fit=crop'
  };

  basicInfo.forEach(function (item) {
    if (!item || !item.section_key) return;
    if (images[item.section_key]) item.image_url = images[item.section_key];
  });

  function injectMembershipStyles() {
    if (document.getElementById('homepageMembershipIntroStyles')) return;

    var style = document.createElement('style');
    style.id = 'homepageMembershipIntroStyles';
    style.textContent = `
      #processSection {
        background: linear-gradient(180deg, #f7f9fd 0%, #eef4fb 100%);
      }
      #processSection .sheet-extra-wrap {
        width: min(1180px, calc(100% - 32px));
      }
      #processSection .sheet-extra-head {
        text-align: center;
      }
      #processSection #processGrid.membership-intro-grid {
        display: block;
      }
      #processSection .membership-intro-shell {
        position: relative;
        overflow: hidden;
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(340px, .92fr);
        gap: 34px;
        padding: 42px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 34px;
        background:
          radial-gradient(circle at 90% 8%, rgba(78,140,255,.34), transparent 36%),
          linear-gradient(135deg, #071b3b 0%, #0b2f67 58%, #174fae 100%);
        box-shadow: 0 24px 60px rgba(11,47,103,.18);
        color: #fff;
      }
      #processSection .membership-intro-shell::after {
        content: '';
        position: absolute;
        width: 280px;
        height: 280px;
        right: -80px;
        bottom: -130px;
        border-radius: 50%;
        background: rgba(255,255,255,.06);
        pointer-events: none;
      }
      #processSection .membership-intro-copy,
      #processSection .membership-intro-side {
        position: relative;
        z-index: 1;
      }
      #processSection .membership-intro-kicker {
        display: inline-flex;
        align-items: center;
        min-height: 34px;
        padding: 0 13px;
        border-radius: 999px;
        background: rgba(255,255,255,.12);
        border: 1px solid rgba(255,255,255,.15);
        color: #dce9ff;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: .08em;
      }
      #processSection .membership-intro-copy h3 {
        margin: 18px 0 14px;
        color: #fff;
        font-size: clamp(32px, 3vw, 48px);
        line-height: 1.12;
        letter-spacing: -.045em;
        word-break: keep-all;
      }
      #processSection .membership-intro-copy > p {
        max-width: 610px;
        margin: 0;
        color: rgba(255,255,255,.78);
        font-size: 17px;
        line-height: 1.82;
        word-break: keep-all;
      }
      #processSection .membership-benefit-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-top: 28px;
      }
      #processSection .membership-benefit-card {
        min-height: 124px;
        padding: 18px;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 20px;
        background: rgba(255,255,255,.08);
        backdrop-filter: blur(10px);
      }
      #processSection .membership-benefit-card span {
        display: block;
        margin-bottom: 8px;
        color: #bcd2ff;
        font-size: 12px;
        font-weight: 800;
      }
      #processSection .membership-benefit-card strong {
        display: block;
        color: #fff;
        font-size: 23px;
        line-height: 1.2;
        letter-spacing: -.03em;
      }
      #processSection .membership-benefit-card small {
        display: block;
        margin-top: 8px;
        color: rgba(255,255,255,.66);
        font-size: 12px;
        line-height: 1.45;
      }
      #processSection .membership-intro-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 28px;
        border-radius: 26px;
        background: #fff;
        color: #10244a;
        box-shadow: 0 16px 40px rgba(0,0,0,.12);
      }
      #processSection .membership-intro-side .side-label {
        color: #2464eb;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .06em;
      }
      #processSection .membership-intro-side h4 {
        margin: 10px 0 18px;
        color: #0a2552;
        font-size: 26px;
        line-height: 1.25;
        letter-spacing: -.035em;
        word-break: keep-all;
      }
      #processSection .membership-use-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 15px 0;
        border-top: 1px solid #e7edf7;
      }
      #processSection .membership-use-row span {
        color: #667590;
        font-size: 14px;
      }
      #processSection .membership-use-row strong {
        color: #0a2552;
        font-size: 17px;
        text-align: right;
      }
      #processSection .membership-intro-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 52px;
        margin-top: 20px;
        padding: 0 22px;
        border-radius: 15px;
        background: #2464eb;
        color: #fff;
        font-size: 15px;
        font-weight: 900;
        text-decoration: none;
        transition: transform .2s ease, box-shadow .2s ease;
      }
      #processSection .membership-intro-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(36,100,235,.28);
      }
      #processSection .membership-intro-note {
        margin: 11px 0 0;
        color: #8a96aa;
        font-size: 11px;
        line-height: 1.5;
      }
      @media (max-width: 900px) {
        #processSection .membership-intro-shell {
          grid-template-columns: 1fr;
          padding: 30px;
        }
        #processSection .membership-intro-side {
          padding: 24px;
        }
      }
      @media (max-width: 640px) {
        #processSection .sheet-extra-wrap {
          width: min(100%, calc(100% - 24px));
        }
        #processSection .membership-intro-shell {
          gap: 20px;
          padding: 22px;
          border-radius: 26px;
        }
        #processSection .membership-intro-copy h3 {
          font-size: 32px;
        }
        #processSection .membership-intro-copy > p {
          font-size: 15px;
          line-height: 1.75;
        }
        #processSection .membership-benefit-grid {
          grid-template-columns: 1fr;
        }
        #processSection .membership-benefit-card {
          min-height: 0;
        }
        #processSection .membership-intro-side h4 {
          font-size: 23px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function replaceProcessWithMembershipIntro() {
    var section = document.getElementById('processSection');
    if (!section) return false;

    var label = section.querySelector('.sheet-extra-label');
    var title = section.querySelector('.sheet-extra-title');
    var grid = document.getElementById('processGrid');
    if (!grid) return false;

    if (label) label.textContent = 'CRUISE MEMBERSHIP';
    if (title) title.textContent = '크루즈 멤버십';

    grid.className = 'membership-intro-grid';
    grid.innerHTML = `
      <div class="membership-intro-shell">
        <div class="membership-intro-copy">
          <span class="membership-intro-kicker">TRAVEL SUBSCRIPTION</span>
          <h3>이제는 여행도<br>구독으로 준비하세요.</h3>
          <p>한 번에 큰 금액을 준비하는 대신 매월 포인트를 쌓고, 실제 크루즈 예약에 활용하는 여행 멤버십입니다.</p>

          <div class="membership-benefit-grid">
            <article class="membership-benefit-card">
              <span>FREE GUEST</span>
              <strong>무료 가입 50P</strong>
              <small>부담 없이 먼저 시작</small>
            </article>
            <article class="membership-benefit-card">
              <span>CLASSIC</span>
              <strong>$100 → 200P</strong>
              <small>매월 2배 포인트 적립</small>
            </article>
            <article class="membership-benefit-card">
              <span>PREMIUM</span>
              <strong>$250 → 500P</strong>
              <small>여행 계획이 분명한 분께 추천</small>
            </article>
          </div>
        </div>

        <div class="membership-intro-side">
          <span class="side-label">HOW TO USE</span>
          <h4>쌓은 포인트를<br>크루즈 예약에 사용합니다.</h4>
          <div class="membership-use-row">
            <span>일반 예약</span>
            <strong>포인트 최대 50%</strong>
          </div>
          <div class="membership-use-row">
            <span>270일 이후 출발</span>
            <strong>전액 포인트 사용 예시</strong>
          </div>
          <div class="membership-use-row">
            <span>선택 가능한 플랜</span>
            <strong>게스트 · 스타터 · 클래식 · 프리미엄</strong>
          </div>
          <a class="membership-intro-cta" href="/membership/">멤버십 자세히 보기 →</a>
          <p class="membership-intro-note">포인트 사용 범위와 조건은 예약 시점 및 멤버십 유지 상태에 따라 달라질 수 있습니다.</p>
        </div>
      </div>
    `;

    return true;
  }

  injectMembershipStyles();

  window.setTimeout(function () {
    if (replaceProcessWithMembershipIntro()) return;

    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (replaceProcessWithMembershipIntro() || attempts >= 10) {
        window.clearInterval(timer);
      }
    }, 100);
  }, 0);
})();

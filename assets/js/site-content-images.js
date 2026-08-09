// Homepage static presentation overrides.
// Public guide images and the membership teaser do not depend on Google Sheets runtime lookup.
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

  function installMembershipTeaserStyle() {
    if (document.getElementById('membershipTeaserStyle')) return;

    var style = document.createElement('style');
    style.id = 'membershipTeaserStyle';
    style.textContent = `
      #processSection .sheet-extra-head {
        display: none !important;
      }

      #processSection #processGrid.membership-visual-teaser {
        display: block !important;
      }

      #processSection .membership-teaser-card {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
        min-height: 430px;
        overflow: hidden;
        border: 1px solid #e3eaf4;
        border-radius: 32px;
        background: #ffffff;
        box-shadow: 0 20px 48px rgba(15, 23, 42, .08);
      }

      #processSection .membership-teaser-copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 54px 52px;
      }

      #processSection .membership-teaser-kicker {
        margin-bottom: 18px;
        color: #2563eb;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .12em;
      }

      #processSection .membership-teaser-title {
        margin: 0;
        color: #0f2447;
        font-size: clamp(38px, 4vw, 58px);
        line-height: 1.08;
        letter-spacing: -.055em;
        word-break: keep-all;
      }

      #processSection .membership-teaser-desc {
        max-width: 450px;
        margin: 22px 0 0;
        color: #68758b;
        font-size: 18px;
        line-height: 1.7;
        word-break: keep-all;
      }

      #processSection .membership-teaser-actions {
        margin-top: 30px;
      }

      #processSection .membership-teaser-actions .btn {
        width: auto;
        min-width: 190px;
      }

      #processSection .membership-teaser-media {
        position: relative;
        min-height: 430px;
        overflow: hidden;
        background: #dfe8f6;
      }

      #processSection .membership-teaser-media img {
        width: 100%;
        height: 100%;
        min-height: 430px;
        object-fit: cover;
        object-position: center;
        display: block;
      }

      #processSection .membership-teaser-media::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(255,255,255,.08), rgba(15,36,71,.04));
        pointer-events: none;
      }

      @media (max-width: 820px) {
        #processSection .membership-teaser-card {
          grid-template-columns: 1fr;
          min-height: 0;
        }

        #processSection .membership-teaser-media {
          order: -1;
          min-height: 0;
          aspect-ratio: 16 / 9;
        }

        #processSection .membership-teaser-media img {
          min-height: 0;
          height: 100%;
        }

        #processSection .membership-teaser-copy {
          padding: 32px 26px 34px;
        }

        #processSection .membership-teaser-title {
          font-size: 38px;
        }

        #processSection .membership-teaser-desc {
          margin-top: 16px;
          font-size: 16px;
        }

        #processSection .membership-teaser-actions {
          margin-top: 24px;
        }

        #processSection .membership-teaser-actions .btn {
          width: 100%;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function renderMembershipTeaser() {
    var section = document.getElementById('processSection');
    var grid = document.getElementById('processGrid');
    if (!section || !grid) return false;

    installMembershipTeaserStyle();

    grid.className = 'membership-visual-teaser';
    grid.innerHTML = `
      <article class="membership-teaser-card">
        <div class="membership-teaser-copy">
          <span class="membership-teaser-kicker">CRUISE MEMBERSHIP</span>
          <h2 class="membership-teaser-title">크루즈,<br>매번 제값 다 내고<br>떠나실 건가요?</h2>
          <p class="membership-teaser-desc">여행 전에 미리 쌓아두고, 떠날 때 쓰는 방법이 있습니다.</p>
          <div class="membership-teaser-actions">
            <a href="/membership/" class="btn">멤버십 방식 보기 →</a>
          </div>
        </div>
        <div class="membership-teaser-media">
          <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?q=88&w=1800&h=1200&auto=format&fit=crop" alt="바다를 항해하는 크루즈 여행" loading="lazy" decoding="async" />
        </div>
      </article>
    `;

    return true;
  }

  window.setTimeout(function () {
    if (renderMembershipTeaser()) return;

    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (renderMembershipTeaser() || attempts >= 12) {
        window.clearInterval(timer);
      }
    }, 100);
  }, 0);
})();

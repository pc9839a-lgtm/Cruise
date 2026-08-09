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

  function replaceProcessWithMembershipTeaser() {
    var section = document.getElementById('processSection');
    if (!section) return false;

    var label = section.querySelector('.sheet-extra-label');
    var title = section.querySelector('.sheet-extra-title');
    var grid = document.getElementById('processGrid');
    if (!grid) return false;

    // Keep the homepage's original section/card design. Only replace copy and destination.
    if (label) label.textContent = 'CRUISE MEMBERSHIP';
    if (title) title.textContent = '크루즈 여행비, 매번 한 번에 내야 할까요?';

    grid.className = 'sheet-extra-grid sheet-extra-grid-steps';
    grid.innerHTML = `
      <article class="sheet-extra-card sheet-extra-step-card">
        <span class="sheet-extra-step-no">MEMBERSHIP 01</span>
        <h3>여행을 떠나기 전부터<br>준비하는 방법이 있습니다.</h3>
        <p>큰 여행비를 한 번에 준비하는 방식 말고, 크루즈를 준비하는 또 다른 방법이 있습니다.</p>
        <div class="sheet-extra-highlight">여행도 구독할 수 있다면?</div>
      </article>

      <article class="sheet-extra-card sheet-extra-step-card">
        <span class="sheet-extra-step-no">MEMBERSHIP 02</span>
        <h3>같은 여행비인데<br>쌓이는 방식이 다르다면?</h3>
        <p>멤버십 이용자는 여행을 예약하기 전부터 다음 크루즈를 위한 준비를 시작합니다.</p>
        <div class="sheet-extra-highlight">왜 더 유리해지는지 확인</div>
      </article>

      <article class="sheet-extra-card sheet-extra-step-card">
        <span class="sheet-extra-step-no">MEMBERSHIP 03</span>
        <h3>크루즈를 자주 타는 사람은<br>예약 방식부터 다릅니다.</h3>
        <p>포인트가 어떻게 쌓이고 실제 크루즈 예약에 어떻게 쓰이는지 상세 페이지에서 확인해보세요.</p>
        <div class="sheet-extra-action">
          <a href="/membership/" class="btn">멤버십이 뭐길래? →</a>
        </div>
      </article>
    `;

    return true;
  }

  window.setTimeout(function () {
    if (replaceProcessWithMembershipTeaser()) return;

    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (replaceProcessWithMembershipTeaser() || attempts >= 10) {
        window.clearInterval(timer);
      }
    }, 100);
  }, 0);
})();

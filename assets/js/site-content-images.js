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

  // Keep the existing homepage process-card design and replace only the content.
  data.process_steps = [
    {
      step_id: 'MEMBERSHIP01',
      is_active: 'Y',
      sort_order: 1,
      step_title: '매달 쌓고',
      step_desc: '',
      highlight_text: '여행 전에 준비'
    },
    {
      step_id: 'MEMBERSHIP02',
      is_active: 'Y',
      sort_order: 2,
      step_title: '크루즈에 쓰고',
      step_desc: '',
      highlight_text: '모은 포인트로 예약'
    },
    {
      step_id: 'MEMBERSHIP03',
      is_active: 'Y',
      sort_order: 3,
      step_title: '왜 더 유리할까?',
      step_desc: '',
      highlight_text: '멤버십 보기 →'
    }
  ];

  var section = document.getElementById('processSection');
  if (section) {
    var label = section.querySelector('.sheet-extra-label');
    var title = section.querySelector('.sheet-extra-title');
    if (label) label.textContent = 'CRUISE MEMBERSHIP';
    if (title) title.textContent = '크루즈, 여행비를 모아서 떠난다면?';
  }

  // main.js renders the original cards. Make only the last card act as the CTA.
  window.setTimeout(function () {
    var grid = document.getElementById('processGrid');
    if (!grid) return;
    var cards = grid.querySelectorAll('.sheet-extra-step-card');
    var lastCard = cards[cards.length - 1];
    if (!lastCard) return;

    lastCard.setAttribute('role', 'link');
    lastCard.setAttribute('tabindex', '0');
    lastCard.setAttribute('aria-label', '크루즈 멤버십 소개 보기');
    lastCard.style.cursor = 'pointer';

    function openMembership() {
      window.location.href = '/membership/';
    }

    lastCard.addEventListener('click', openMembership);
    lastCard.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMembership();
      }
    });
  }, 0);
})();

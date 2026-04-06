(function () {
  const config = window.APP_CONFIG || {};
  const modal = document.getElementById('scheduleModal');
  const modalBody = document.getElementById('scheduleModalBody');
  const scheduleGrid = document.getElementById('scheduleGrid');
  const scheduleFilters = document.getElementById('scheduleFilters');
  const reviewGrid = document.getElementById('reviewGrid');
  const reviewDots = document.getElementById('reviewDots');
  const reviewViewport = document.getElementById('reviewViewport');
  const form = document.getElementById('contactForm');
  const formResult = document.getElementById('formResult');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  const phoneInput = document.getElementById('phoneInput');
  const mainContent = document.querySelector('main');

  const state = {
    bootstrap: {
      settings: {},
      schedules: [],
      schedule_days: [],
      reviews: [],
      targets: [],
      basic_info: [],
      process_steps: [],
      cabins: [],
      faqs: [],
      trust_points: [],
      content_links: []
    },
    activeRegion: 'ALL',
    reviewPage: 0
  };

  let reviewAutoTimer = null;

  init();

  async function init() {
    bindStaticEvents();
    setTrackingFields();

    const payload = config.useMockOnly
      ? normalizeData(window.MOCK_BOOTSTRAP_DATA || {})
      : await getBootstrapWithFallback();

    hydrate(payload);
  }

  function bindStaticEvents() {
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('is-open');
      });
    }

    document.addEventListener('click', function (event) {
      const filterButton = event.target.closest('[data-region]');
      if (filterButton) {
        state.activeRegion = filterButton.getAttribute('data-region') || 'ALL';
        renderFilters();
        renderSchedules();
        return;
      }

      const selectButton = event.target.closest('[data-select-schedule]');
      if (selectButton) {
        event.stopPropagation();
        const scheduleId = selectButton.getAttribute('data-select-schedule');
        const scheduleSelect = document.getElementById('interestScheduleSelect');
        if (scheduleSelect) scheduleSelect.value = scheduleId || '';
        scrollToSection('contact');
        closeModal();
        return;
      }

      const reviewNav = event.target.closest('[data-review-nav]');
      if (reviewNav) {
        moveReviews(reviewNav.getAttribute('data-review-nav'));
        return;
      }

      const reviewDot = event.target.closest('[data-review-dot]');
      if (reviewDot) {
        state.reviewPage = Number(reviewDot.getAttribute('data-review-dot') || 0);
        setupReviewSlider((state.bootstrap.reviews || []).length);
        return;
      }

      const basicInfoNav = event.target.closest('[data-basicinfo-nav]');
      if (basicInfoNav) {
        moveBasicInfoSlider_(basicInfoNav.getAttribute('data-basicinfo-nav'));
        return;
      }

      const basicInfoDot = event.target.closest('[data-basicinfo-dot]');
      if (basicInfoDot) {
        setBasicInfoSliderState_(Number(basicInfoDot.getAttribute('data-basicinfo-dot') || 0));
        setupBasicInfoSlider_();
        return;
      }

      const openCard = event.target.closest('[data-open-schedule]');
      if (openCard) {
        const scheduleId = openCard.getAttribute('data-open-schedule');
        openSchedule(scheduleId);
        return;
      }

      if (event.target.closest('[data-close-modal]')) {
        closeModal();
        return;
      }
    });

    window.addEventListener('resize', function () {
      setupReviewSlider((state.bootstrap.reviews || []).length);
      try {
        setupBasicInfoSlider_();
        alignContentButtons_();
      } catch (error) {
        console.error('resize-extended-failed:', error);
      }
    });

    if (reviewViewport) {
      reviewViewport.addEventListener('mouseenter', stopReviewAuto);
      reviewViewport.addEventListener('mouseleave', function () {
        setupReviewSlider((state.bootstrap.reviews || []).length);
      });
      reviewViewport.addEventListener('touchstart', stopReviewAuto, { passive: true });
      reviewViewport.addEventListener('touchend', function () {
        setupReviewSlider((state.bootstrap.reviews || []).length);
      }, { passive: true });
    }

    window.addEventListener('message', function (event) {
      const data = event.data || {};
      if (data.type !== 'CRUISE_FORM_RESULT') return;

      if (data.success) {
        updateFormResult(data.message || '문의가 정상 접수되었습니다.', 'success');
        form.reset();
        setTrackingFields();
      } else {
        updateFormResult(data.message || '문의 접수 중 문제가 발생했습니다. 다시 시도해주세요.', 'error');
      }
      setSubmitState(false);
    });

    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        phoneInput.value = String(phoneInput.value || '').replace(/\D+/g, '').slice(0, 11);
      });
    }

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        if (!String(formData.get('name') || '').trim()) {
          updateFormResult('성함을 입력해주세요.', 'error');
          return;
        }

        const phone = String(formData.get('phone') || '').replace(/\D+/g, '').trim();
        if (!phone) {
          updateFormResult('연락처를 입력해주세요.', 'error');
          return;
        }

        if (!String(formData.get('interest_schedule_id') || '').trim()) {
          updateFormResult('관심 일정을 선택해주세요.', 'error');
          return;
        }

        if (!String(formData.get('people_count') || '').trim()) {
          updateFormResult('인원수를 선택해주세요.', 'error');
          return;
        }

        const privacyAgreeInput = document.getElementById('privacyAgreeInput');
        if (privacyAgreeInput && !privacyAgreeInput.checked) {
          updateFormResult('개인정보 수집 및 이용 동의가 필요합니다.', 'error');
          return;
        }

        if (phoneInput) {
          phoneInput.value = phone;
        }

        const regionDetail = String(formData.get('region_detail') || '').trim();
        const travelReadyStatus = String(formData.get('travel_ready_status') || '').trim();
        const originalMessage = String(formData.get('message') || '').trim();

        const extraLines = [];
        if (regionDetail) extraLines.push('거주지역: ' + regionDetail);
        if (travelReadyStatus) extraLines.push('여권/해외결제카드 소지 여부: ' + travelReadyStatus);
        if (originalMessage) extraLines.push('문의내용: ' + originalMessage);

        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
          messageInput.value = extraLines.join('\n');
        }

        form.action = config.apiUrl;
        setSubmitState(true);
        updateFormResult('문의 내용을 접수하고 있습니다...', 'pending');
        form.submit();

        window.setTimeout(function () {
          if (formResult.classList.contains('is-pending')) {
            updateFormResult('문의 접수는 진행 중입니다. 시트 반영까지 잠시 시간이 걸릴 수 있습니다.', 'pending');
          }
        }, config.submitTimeout || 15000);
      });
    }
  }

  async function getBootstrapWithFallback() {
    try {
      const apiPayload = await loadBootstrapFromApi();
      return normalizeData(apiPayload);
    } catch (error) {
      console.error('bootstrap-fallback:', error);
      return normalizeData(window.MOCK_BOOTSTRAP_DATA || {});
    }
  }

  function loadBootstrapFromApi() {
    return new Promise(function (resolve, reject) {
      if (!config.apiUrl) {
        reject(new Error('apiUrl-missing'));
        return;
      }

      const callbackName = '__cruiseJsonpCallback_' + Date.now();
      const params = new URLSearchParams(window.location.search);
      params.set('action', 'bootstrap');
      params.set('callback', callbackName);

      const script = document.createElement('script');
      const timeoutMs = 8000;
      let finished = false;
      let timer = null;

      function cleanup() {
        if (timer) window.clearTimeout(timer);
        delete window[callbackName];
        if (script.parentNode) script.parentNode.removeChild(script);
      }

      window[callbackName] = function (payload) {
        if (finished) return;
        finished = true;
        cleanup();

        if (!payload || typeof payload !== 'object') {
          reject(new Error('bootstrap-invalid-payload'));
          return;
        }

        resolve(payload);
      };

      script.onerror = function () {
        if (finished) return;
        finished = true;
        cleanup();
        reject(new Error('bootstrap-load-failed'));
      };

      timer = window.setTimeout(function () {
        if (finished) return;
        finished = true;
        cleanup();
        reject(new Error('bootstrap-timeout'));
      }, timeoutMs);

      script.src = config.apiUrl + '?' + params.toString();
      script.async = true;
      document.body.appendChild(script);
    });
  }

  function hydrate(data) {
    state.bootstrap = normalizeData(data);

    renderSettings();
    renderFilters();
    startHeroMotion();
    renderSchedules();
    renderReviews();
    populateFormSelects();

    try {
      ensureDynamicSectionsStyle_();
      ensureDynamicSectionsScaffold_();
      renderBasicInfo_();
      renderTargets_();
      renderProcessSteps_();
      renderCabins_();
      renderFaqs_();
      renderContentLinks_();
      setupBasicInfoSlider_();
      alignContentButtons_();
      initRevealAnimations_();
    } catch (error) {
      console.error('extended-sections-failed:', error);
    }
  }

  function normalizeData(data) {
    const safe = data || {};
    const fallback = window.MOCK_BOOTSTRAP_DATA || {};

    safe.settings = safe.settings || fallback.settings || {};
    safe.schedules = Array.isArray(safe.schedules) && safe.schedules.length ? safe.schedules : (Array.isArray(fallback.schedules) ? fallback.schedules : []);
    safe.schedule_days = Array.isArray(safe.schedule_days) && safe.schedule_days.length ? safe.schedule_days : (Array.isArray(fallback.schedule_days) ? fallback.schedule_days : []);
    safe.reviews = Array.isArray(safe.reviews) && safe.reviews.length ? safe.reviews : (Array.isArray(fallback.reviews) ? fallback.reviews : []);

    safe.targets = Array.isArray(safe.targets) ? safe.targets : (Array.isArray(fallback.targets) ? fallback.targets : []);
    safe.basic_info = Array.isArray(safe.basic_info) ? safe.basic_info : (Array.isArray(fallback.basic_info) ? fallback.basic_info : []);
    safe.process_steps = Array.isArray(safe.process_steps) ? safe.process_steps : (Array.isArray(fallback.process_steps) ? fallback.process_steps : []);
    safe.cabins = Array.isArray(safe.cabins) ? safe.cabins : (Array.isArray(fallback.cabins) ? fallback.cabins : []);
    safe.faqs = Array.isArray(safe.faqs) ? safe.faqs : (Array.isArray(fallback.faqs) ? fallback.faqs : []);
    safe.content_links = Array.isArray(safe.content_links) ? safe.content_links : (Array.isArray(fallback.content_links) ? fallback.content_links : []);

    return safe;
  }

  function renderSettings() {
    const settings = state.bootstrap.settings || {};
    const siteName = settings.site_title || settings.site_name || '크루즈 플레이';
    const heroImage = settings.hero_image || settings.hero_bg || '';

    setText('siteName', siteName);
    setText('footerSiteName', 'WAYZI');
    setText('siteNameInput', siteName, 'value');

    setText('heroTag1', settings.hero_tag_1 || '최저가 보장제');
    setText('heroTag2', settings.hero_tag_2 || 'NO 쇼핑·옵션');
    setText('heroTag3', settings.hero_tag_3 || '100% 출발확정');

    setHtml(
      'heroTitle',
      convertLineBreaks(
        escapeHtml(settings.hero_title || '크루즈 여행,\n패키지 말고 직구하세요.')
      )
    );

    setText(
      'heroSubtitle',
      settings.hero_subtitle || '마음에 드는 일정이 있으면 바로 상세 항해 일정과 항해 루트를 확인하고 문의할 수 있게 구성했습니다.'
    );

    setText(
      'heroBottomText',
      settings.hero_bottom_text || '가격보다 일정이 먼저 보이도록, 한눈에 비교되는 구조로 다시 정리했습니다.'
    );

    setHtml('identityTitle', (function () {
      const text = settings.identity_title || '크루즈플레이는\n여행사가 아닙니다.';
      const parts = String(text).split('\n');

      if (parts.length > 1) {
        return escapeHtml(parts[0]) + '<br><span>' + escapeHtml(parts.slice(1).join(' ')) + '</span>';
      }

      return '<span>' + escapeHtml(text) + '</span>';
    })());

    setHtml(
      'identityDesc',
      convertLineBreaks(
        escapeHtml(
          settings.identity_desc ||
          '쇼핑과 옵션이 포함된 패키지 여행이 아닙니다.\n오직 크루즈 일정과 항해 루트를 투명하게 비교하고 선택하는\n자유여행 중심 안내 플랫폼입니다.'
        )
      )
    );

    setText(
      'footerDescription',
      '대표 김도윤 · 사업자번호 538-42-01450'
    );

    const heroBg = document.getElementById('heroBg');
    if (heroBg && heroImage) {
      heroBg.style.backgroundImage =
        'linear-gradient(180deg, rgba(7, 25, 57, 0.12), rgba(7, 25, 57, 0.4)), url("' +
        heroImage.replace(/"/g, '\\"') +
        '")';
    }
  }

  function getRegions() {
    return ['ALL'].concat(Array.from(new Set(state.bootstrap.schedules.map(function (item) {
      return item.region;
    }).filter(Boolean))));
  }

  function startHeroMotion() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;
    hero.classList.add('is-live');
  }

  function renderFilters() {
    if (!scheduleFilters) return;
    const regions = getRegions();
    scheduleFilters.innerHTML = regions.map(function (region) {
      const isActive = state.activeRegion === region ? ' is-active' : '';
      const label = region === 'ALL' ? '전체 일정' : region;
      return '<button type="button" class="filter-chip' + isActive + '" data-region="' + escapeAttribute(region) + '">' + escapeHtml(label) + '</button>';
    }).join('');
  }

  function renderSchedules() {
    if (!scheduleGrid) return;
    const schedules = state.bootstrap.schedules.filter(function (item) {
      return state.activeRegion === 'ALL' ? true : item.region === state.activeRegion;
    }).slice(0, 6);

    if (!schedules.length) {
      scheduleGrid.innerHTML = '<div class="schedule-empty">현재 준비된 일정이 없습니다. 일정 문의를 남겨주시면 가능한 항차를 안내해드립니다.</div>';
      return;
    }

    scheduleGrid.innerHTML = schedules.map(buildScheduleCard).join('');
  }

  function buildScheduleCard(schedule) {
    const imageUrl = schedule.thumbnail_url || schedule.schedule_image_url || '';
    const homePort = getHomePort(schedule.schedule_id);
    const monthLabel = getMonthLabel_(schedule.departure_date);

    return [
      '<article class="schedule-card" data-open-schedule="', escapeAttribute(schedule.schedule_id), '">',
        '<div class="schedule-visual">',
          imageUrl ? '<img src="' + escapeAttribute(imageUrl) + '" alt="' + escapeAttribute(schedule.title || '') + '" />' : '',
          '<div class="schedule-visual-inner">',
            '<div class="schedule-badges">',
              '<span class="schedule-badge schedule-badge-region">', escapeHtml(schedule.region || '크루즈'), '</span>',
              monthLabel ? '<span class="schedule-badge schedule-badge-month">' + escapeHtml(monthLabel) + '</span>' : '',
            '</div>',
            '<div class="schedule-title-row">',
              '<h3 class="schedule-title">', escapeHtml(schedule.title || '크루즈 일정'), '</h3>',
              monthLabel ? '<span class="schedule-month-emphasis">' + escapeHtml(monthLabel) + ' 출발</span>' : '',
            '</div>',
          '</div>',
        '</div>',
        '<div class="schedule-content">',
          '<div class="schedule-meta">',
            metaItem('선박', schedule.ship_name || '-'),
            metaItem('모항지', homePort || '-'),
            metaItem('출발', formatDate(schedule.departure_date)),
            metaItem('도착', formatDate(schedule.return_date)),
          '</div>',
          '<div class="schedule-actions">',
            '<a href="#contact" class="btn" data-select-schedule="', escapeAttribute(schedule.schedule_id), '">가격문의</a>',
          '</div>',
        '</div>',
      '</article>'
    ].join('');
  }

  function renderReviews() {
    if (!reviewGrid) return;
    const reviews = state.bootstrap.reviews || [];
    if (!reviews.length) {
      reviewGrid.innerHTML = '<div class="schedule-empty">준비 중인 후기가 곧 업데이트됩니다.</div>';
      if (reviewDots) reviewDots.innerHTML = '';
      return;
    }

    reviewGrid.innerHTML = reviews.map(function (review) {
      const imageUrl = review.thumbnail_url || '';
      return [
        '<article class="review-card">',
          '<div class="review-thumb">', imageUrl ? '<img src="' + escapeAttribute(imageUrl) + '" alt="' + escapeAttribute(review.title || '') + '" />' : '', '</div>',
          '<div class="review-body">',
            review.region ? '<span class="review-region">' + escapeHtml(review.region) + '</span>' : '',
            '<h3>' + escapeHtml(review.title || '크루즈 후기') + '</h3>',
            '<p>' + escapeHtml(review.summary || review.content || '') + '</p>',
          '</div>',
        '</article>'
      ].join('');
    }).join('');

    setupReviewSlider(reviews.length);
  }

  function ensureDynamicSectionsStyle_() {
    if (document.getElementById('dynamicSectionsStyle')) return;

    const style = document.createElement('style');
    style.id = 'dynamicSectionsStyle';
    style.textContent = [
      '.dynamic-section{padding:88px 0;}',
      '.dynamic-section.is-soft{background:linear-gradient(180deg,#f6f9ff 0%,#ffffff 100%);}',
      '.dynamic-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;}',
      '.dynamic-grid.is-two{grid-template-columns:repeat(2,minmax(0,1fr));}',
      '.process-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;counter-reset:processStep;}',
      '.dynamic-slider{position:relative;}',
      '.dynamic-slider-viewport{overflow:hidden;}',
      '.dynamic-slider-track{display:flex;transition:transform .55s cubic-bezier(.22,1,.36,1);will-change:transform;}',
      '.dynamic-slide{flex:0 0 100%;min-width:100%;padding:6px;}',
      '.dynamic-card{position:relative;padding:28px;border-radius:28px;background:#fff;border:1px solid rgba(11,47,108,.08);box-shadow:0 18px 44px rgba(16,36,74,.08);overflow:hidden;display:flex;flex-direction:column;min-height:100%;transition:transform .28s ease, box-shadow .28s ease;}',
      '.dynamic-card:hover{transform:translateY(-6px);box-shadow:0 24px 48px rgba(16,36,74,.12);}',
      '.dynamic-card.is-dark{background:linear-gradient(135deg,#0f2552 0%,#18396f 100%);color:#fff;border-color:rgba(255,255,255,.08);}',
      '.dynamic-card.is-accent{background:linear-gradient(135deg,#f7fbff 0%,#edf4ff 100%);}',
      '.dynamic-chip{display:inline-flex;align-items:center;padding:8px 12px;border-radius:999px;background:rgba(24,57,111,.08);color:#173865;font-size:12px;font-weight:700;letter-spacing:-.02em;}',
      '.dynamic-card.is-dark .dynamic-chip{background:rgba(255,255,255,.14);color:#fff;}',
      '.dynamic-card h3{margin:14px 0 10px;font-size:26px;line-height:1.28;letter-spacing:-.03em;}',
      '.dynamic-card h4{margin:0 0 8px;font-size:22px;line-height:1.34;letter-spacing:-.03em;}',
      '.dynamic-card p{margin:0;color:#51607a;line-height:1.75;font-size:15px;letter-spacing:-.01em;}',
      '.dynamic-card.is-dark p{color:rgba(255,255,255,.84);}',
      '.dynamic-points{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:10px;}',
      '.dynamic-points li{position:relative;padding-left:14px;font-size:14px;line-height:1.7;color:#33415a;}',
      '.dynamic-card.is-dark .dynamic-points li{color:rgba(255,255,255,.9);}',
      '.dynamic-points li:before{content:"";position:absolute;left:0;top:10px;width:6px;height:6px;border-radius:50%;background:#2e6bff;}',
      '.dynamic-media{margin-top:18px;border-radius:22px;overflow:hidden;aspect-ratio:16/10;background:#edf3fb;}',
      '.dynamic-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}',
      '.dynamic-card:hover .dynamic-media img{transform:scale(1.04);}',
      '.target-cta-row{margin-top:18px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;}',
      '.content-link-row{margin-top:auto;padding-top:20px;display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;justify-content:space-between;}',
      '.content-card .dynamic-media{aspect-ratio:16/9;}',
      '.content-card h3{font-size:22px;}',
      '.content-card .btn{min-width:136px;}',
      '.content-summary{margin-bottom:0;}',
      '.process-card{position:relative;padding:28px 24px;border-radius:26px;background:#fff;border:1px solid rgba(16,36,74,.08);box-shadow:0 16px 34px rgba(16,36,74,.08);counter-increment:processStep;display:flex;flex-direction:column;min-height:100%;transition:transform .28s ease, box-shadow .28s ease;}',
      '.process-card:hover{transform:translateY(-6px);box-shadow:0 24px 48px rgba(16,36,74,.12);}',
      '.process-card:before{content:counter(processStep, decimal-leading-zero);display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border-radius:14px;background:#173865;color:#fff;font-size:15px;font-weight:800;}',
      '.process-card h3{margin:16px 0 8px;font-size:22px;line-height:1.35;letter-spacing:-.03em;color:#14284a;}',
      '.process-card p{margin:0;color:#51607a;font-size:15px;line-height:1.75;}',
      '.process-highlight{margin-top:16px;display:inline-flex;padding:9px 12px;border-radius:999px;background:#edf4ff;color:#173865;font-size:13px;font-weight:700;}',
      '.cabin-badges{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0;}',
      '.cabin-badge{display:inline-flex;padding:7px 11px;border-radius:999px;background:#eef4ff;color:#173865;font-size:12px;font-weight:700;}',
      '.faq-list{display:grid;gap:14px;}',
      '.faq-item{border:1px solid rgba(16,36,74,.08);border-radius:24px;background:#fff;box-shadow:0 12px 30px rgba(16,36,74,.06);overflow:hidden;transition:transform .28s ease, box-shadow .28s ease;}',
      '.faq-item:hover{transform:translateY(-4px);box-shadow:0 18px 36px rgba(16,36,74,.10);}',
      '.faq-item summary{list-style:none;cursor:pointer;padding:22px 24px;font-size:18px;font-weight:700;color:#14284a;display:flex;align-items:center;justify-content:space-between;gap:16px;}',
      '.faq-item summary::-webkit-details-marker{display:none;}',
      '.faq-item summary:after{content:"+";font-size:26px;line-height:1;color:#173865;flex:none;}',
      '.faq-item[open] summary:after{content:"−";}',
      '.faq-answer{padding:0 24px 22px;color:#51607a;font-size:15px;line-height:1.8;}',
      '.content-meta{margin-top:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
      '.content-tag{display:inline-flex;padding:7px 11px;border-radius:999px;background:#eef4ff;color:#173865;font-size:12px;font-weight:700;}',
      '.basicinfo-slider-controls{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:18px;}',
      '.basicinfo-slider-nav{width:44px;height:44px;border-radius:999px;border:0;background:#10284e;color:#fff;font-size:24px;box-shadow:0 12px 24px rgba(16,36,74,.18);cursor:pointer;}',
      '.basicinfo-slider-dots{display:flex;align-items:center;justify-content:center;gap:8px;}',
      '.basicinfo-slider-dot{width:9px;height:9px;border-radius:999px;border:0;background:#cbd5e1;padding:0;cursor:pointer;}',
      '.basicinfo-slider-dot.is-active{background:#2563eb;transform:scale(1.1);}',
      '.reveal-on-scroll{opacity:0;transform:translateY(28px);transition:opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1);}',
      '.reveal-on-scroll.is-visible{opacity:1;transform:translateY(0);}',
      '@media (max-width: 1024px){.dynamic-grid,.dynamic-grid.is-two,.process-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}',
      '@media (max-width: 768px){.dynamic-section{padding:72px 0;}.dynamic-grid,.dynamic-grid.is-two,.process-grid{grid-template-columns:1fr;gap:16px;}.dynamic-card,.process-card{padding:22px;}.dynamic-card h3,.process-card h3{font-size:22px;}.faq-item summary{padding:18px 18px;font-size:16px;}.faq-answer{padding:0 18px 18px;}.basicinfo-slider-controls{margin-top:14px;}.basicinfo-slider-nav{width:40px;height:40px;font-size:22px;}}'
    ].join('');

    document.head.appendChild(style);
  }

  function buildBasicInfoSliderShell_() {
    return [
      '<div class="wrap">',
        '<div class="section-head center compact-head">',
          '<span class="section-label">CRUISE INTRO</span>',
          '<h2 class="section-title center-title">크루즈 여행이란?</h2>',
          '<p class="section-description">처음 보는 분도 부담 없이 이해할 수 있게 핵심만 정리해드립니다.</p>',
        '</div>',
        '<div class="dynamic-slider" id="basicInfoSliderWrap">',
          '<div class="dynamic-slider-viewport">',
            '<div class="dynamic-slider-track" id="basicInfoTrack"></div>',
          '</div>',
          '<div class="basicinfo-slider-controls">',
            '<button type="button" class="basicinfo-slider-nav" data-basicinfo-nav="prev" aria-label="이전">‹</button>',
            '<div class="basicinfo-slider-dots" id="basicInfoDots"></div>',
            '<button type="button" class="basicinfo-slider-nav" data-basicinfo-nav="next" aria-label="다음">›</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function buildSafeImageHtml_(url, alt) {
    if (!url) return '';
    return '<div class="dynamic-media"><img src="' + escapeAttribute(url) + '" alt="' + escapeAttribute(alt || '') + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'" /></div>';
  }

  function ensureDynamicSectionsScaffold_() {
    if (!mainContent) return;

    const identitySection = document.getElementById('identity');
    const scheduleSection = document.getElementById('schedule');
    const contactSection = document.getElementById('contact');

    ensureExtendedSection_({
      id: 'basicInfoSection',
      after: identitySection,
      className: 'dynamic-section is-soft reveal-on-scroll',
      html: buildBasicInfoSliderShell_()
    });

    ensureExtendedSection_({
      id: 'targetsSection',
      after: document.getElementById('basicInfoSection'),
      className: 'dynamic-section reveal-on-scroll',
      html: '<div class="wrap"><div class="section-head center compact-head"><span class="section-label">WHO IT\\'S FOR</span><h2 class="section-title center-title">이런 분들께 잘 맞아요</h2><p class="section-description">누구를 위한 여행인지 먼저 보면 상담이 훨씬 쉬워집니다.</p></div><div class="dynamic-grid" id="targetsGrid"></div></div>'
    });

    ensureExtendedSection_({
      id: 'processSection',
      after: document.getElementById('targetsSection'),
      className: 'dynamic-section is-soft reveal-on-scroll',
      html: '<div class="wrap"><div class="section-head center compact-head"><span class="section-label">HOW IT WORKS</span><h2 class="section-title center-title">예약 진행 과정</h2><p class="section-description">문의만 남기면 어떤 순서로 진행되는지 한눈에 볼 수 있게 정리했습니다.</p></div><div class="process-grid" id="processGrid"></div></div>'
    });

    ensureExtendedSection_({
      id: 'cabinsSection',
      before: scheduleSection,
      className: 'dynamic-section reveal-on-scroll',
      html: '<div class="wrap"><div class="section-head center compact-head"><span class="section-label">CABIN GUIDE</span><h2 class="section-title center-title">선실 타입 간단 비교</h2><p class="section-description">가성비부터 만족도까지, 어떤 객실이 내 여행 스타일에 맞는지 쉽게 비교해보세요.</p></div><div class="dynamic-grid" id="cabinsGrid"></div></div>'
    });

    const trustSection = document.getElementById('trustSection');
    if (trustSection && trustSection.parentNode) {
      trustSection.parentNode.removeChild(trustSection);
    }

    ensureExtendedSection_({
      id: 'faqSection',
      before: contactSection,
      className: 'dynamic-section reveal-on-scroll',
      html: '<div class="wrap"><div class="section-head center compact-head"><span class="section-label">FAQ</span><h2 class="section-title center-title">자주 묻는 질문</h2><p class="section-description">상담 전에 가장 많이 궁금해하는 내용을 먼저 확인해보세요.</p></div><div class="faq-list" id="faqList"></div></div>'
    });

    ensureExtendedSection_({
      id: 'contentSection',
      before: contactSection,
      className: 'dynamic-section is-soft reveal-on-scroll',
      html: '<div class="wrap"><div class="section-head center compact-head"><span class="section-label">CONTENT HUB</span><h2 class="section-title center-title">더 알아보면 좋은 콘텐츠</h2><p class="section-description">준비물, 입문 가이드, 비용 이해 같은 확장 콘텐츠를 연결할 수 있게 준비했습니다.</p></div><div class="dynamic-grid" id="contentGrid"></div></div>'
    });
  }

  function ensureExtendedSection_(options) {
    let section = document.getElementById(options.id);
    if (!section) {
      section = document.createElement('section');
      section.id = options.id;
      section.className = options.className || 'dynamic-section';
      section.innerHTML = options.html || '';

      if (options.before && options.before.parentNode) {
        options.before.parentNode.insertBefore(section, options.before);
      } else if (options.after && options.after.parentNode) {
        options.after.parentNode.insertBefore(section, options.after.nextSibling);
      } else if (mainContent) {
        mainContent.appendChild(section);
      }
    }
    return section;
  }

  function renderBasicInfo_() {
    const track = document.getElementById('basicInfoTrack');
    const section = document.getElementById('basicInfoSection');
    if (!track || !section) return;

    const items = state.bootstrap.basic_info || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    track.innerHTML = items.map(function (item, idx) {
      const points = [item.point_1, item.point_2, item.point_3].filter(Boolean);
      const titleHtml = idx === 0
        ? '<h3>' + escapeHtml(item.title || '크루즈 여행 안내') + '</h3>'
        : '<h4>' + escapeHtml(item.title || '크루즈 여행 안내') + '</h4>';

      return [
        '<div class="dynamic-slide reveal-on-scroll">',
          '<article class="dynamic-card ' + (idx === 0 ? 'is-dark' : 'is-accent') + '">',
            item.subtitle ? '<span class="dynamic-chip">' + escapeHtml(item.subtitle) + '</span>' : '',
            titleHtml,
            item.body ? '<p>' + escapeHtml(item.body) + '</p>' : '',
            points.length ? '<ul class="dynamic-points">' + points.map(function (point) { return '<li>' + escapeHtml(point) + '</li>'; }).join('') + '</ul>' : '',
            buildSafeImageHtml_(item.image_url, item.title || ''),
          '</article>',
        '</div>'
      ].join('');
    }).join('');
  }

  function renderTargets_() {
    const grid = document.getElementById('targetsGrid');
    const section = document.getElementById('targetsSection');
    if (!grid || !section) return;

    const items = state.bootstrap.targets || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      const points = [item.point_1, item.point_2].filter(Boolean);
      return [
        '<article class="dynamic-card reveal-on-scroll">',
          item.subtitle ? '<span class="dynamic-chip">' + escapeHtml(item.subtitle) + '</span>' : '',
          '<h4>' + escapeHtml(item.title || '추천 대상') + '</h4>',
          item.description ? '<p>' + escapeHtml(item.description) + '</p>' : '',
          points.length ? '<ul class="dynamic-points">' + points.map(function (point) { return '<li>' + escapeHtml(point) + '</li>'; }).join('') + '</ul>' : '',
          buildSafeImageHtml_(item.image_url, item.title || ''),
          '<div class="target-cta-row">',
            item.cta_text && item.linked_schedule_id ? '<a href="#contact" class="btn" data-select-schedule="' + escapeAttribute(item.linked_schedule_id) + '">' + escapeHtml(item.cta_text) + '</a>' : '',
            item.linked_schedule_id ? '<span class="dynamic-chip">연결 일정 ' + escapeHtml(item.linked_schedule_id) + '</span>' : '',
          '</div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderProcessSteps_() {
    const grid = document.getElementById('processGrid');
    const section = document.getElementById('processSection');
    if (!grid || !section) return;

    const items = state.bootstrap.process_steps || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      return [
        '<article class="process-card reveal-on-scroll">',
          '<h3>' + escapeHtml(item.step_title || '진행 단계') + '</h3>',
          item.step_desc ? '<p>' + escapeHtml(item.step_desc) + '</p>' : '',
          item.highlight_text ? '<span class="process-highlight">' + escapeHtml(item.highlight_text) + '</span>' : '',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderCabins_() {
    const grid = document.getElementById('cabinsGrid');
    const section = document.getElementById('cabinsSection');
    if (!grid || !section) return;

    const items = state.bootstrap.cabins || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      const points = [item.best_for, item.point_1, item.point_2].filter(Boolean);
      const badges = [item.badge_1, item.badge_2].filter(Boolean);

      return [
        '<article class="dynamic-card reveal-on-scroll">',
          item.cabin_type ? '<span class="dynamic-chip">' + escapeHtml(item.cabin_type) + '</span>' : '',
          '<h4>' + escapeHtml(item.title || '선실 안내') + '</h4>',
          item.summary ? '<p>' + escapeHtml(item.summary) + '</p>' : '',
          points.length ? '<ul class="dynamic-points">' + points.map(function (point) { return '<li>' + escapeHtml(point) + '</li>'; }).join('') + '</ul>' : '',
          badges.length ? '<div class="cabin-badges">' + badges.map(function (badge) { return '<span class="cabin-badge">' + escapeHtml(badge) + '</span>'; }).join('') + '</div>' : '',
          buildSafeImageHtml_(item.image_url, item.title || ''),
        '</article>'
      ].join('');
    }).join('');
  }

  function renderFaqs_() {
    const list = document.getElementById('faqList');
    const section = document.getElementById('faqSection');
    if (!list || !section) return;

    const items = state.bootstrap.faqs || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    list.innerHTML = items.map(function (item, idx) {
      return [
        '<details class="faq-item reveal-on-scroll" ' + (idx === 0 ? 'open' : '') + '>',
          '<summary><span>' + escapeHtml(item.question || '자주 묻는 질문') + '</span></summary>',
          '<div class="faq-answer">',
            item.category ? '<div class="content-meta"><span class="content-tag">' + escapeHtml(item.category) + '</span></div>' : '',
            '<div>' + escapeHtml(item.answer || '') + '</div>',
          '</div>',
        '</details>'
      ].join('');
    }).join('');
  }

  function renderContentLinks_() {
    const grid = document.getElementById('contentGrid');
    const section = document.getElementById('contentSection');
    if (!grid || !section) return;

    const items = state.bootstrap.content_links || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      const contentUrl = String(item.link_url || '').trim() || ('content.html?id=' + encodeURIComponent(item.content_id || ''));

      return [
        '<article class="dynamic-card content-card reveal-on-scroll">',
          item.category ? '<span class="dynamic-chip">' + escapeHtml(item.category) + '</span>' : '',
          '<h3>' + escapeHtml(item.title || '추천 콘텐츠') + '</h3>',
          item.summary ? '<p class="content-summary">' + escapeHtml(item.summary) + '</p>' : '',
          buildSafeImageHtml_(item.thumbnail_url, item.title || ''),
          '<div class="content-link-row">',
            item.tag_text ? '<span class="content-tag">' + escapeHtml(item.tag_text) + '</span>' : '<span></span>',
            contentUrl ? '<a href="' + escapeAttribute(contentUrl) + '" class="btn" target="_blank" rel="noopener">자세히 보기</a>' : '',
          '</div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function setBasicInfoSliderState_(value) {
    window.__CRUISE_BASICINFO_SLIDER__ = Number(value || 0);
  }

  function getBasicInfoSliderState_() {
    return Number(window.__CRUISE_BASICINFO_SLIDER__ || 0);
  }

  function setupBasicInfoSlider_() {
    const track = document.getElementById('basicInfoTrack');
    const dots = document.getElementById('basicInfoDots');
    const wrap = document.getElementById('basicInfoSliderWrap');
    if (!track || !dots || !wrap) return;

    const total = track.children.length || 0;
    if (!total) return;

    const maxPage = Math.max(0, total - 1);
    const current = Math.min(getBasicInfoSliderState_(), maxPage);
    setBasicInfoSliderState_(current);

    const viewport = wrap.querySelector('.dynamic-slider-viewport');
    const width = viewport ? viewport.clientWidth : 0;
    track.style.transform = 'translateX(-' + (current * width) + 'px)';

    dots.innerHTML = Array.from({ length: maxPage + 1 }).map(function (_, idx) {
      return '<button type="button" class="basicinfo-slider-dot ' + (idx === current ? 'is-active' : '') + '" data-basicinfo-dot="' + idx + '" aria-label="슬라이드 ' + (idx + 1) + '"></button>';
    }).join('');

    const prev = wrap.querySelector('[data-basicinfo-nav="prev"]');
    const next = wrap.querySelector('[data-basicinfo-nav="next"]');
    const hide = total <= 1;

    if (prev) prev.style.display = hide ? 'none' : '';
    if (next) next.style.display = hide ? 'none' : '';
    if (dots) dots.style.display = hide ? 'none' : '';

    startBasicInfoSliderAuto_();
  }

  function moveBasicInfoSlider_(direction) {
    const track = document.getElementById('basicInfoTrack');
    if (!track) return;

    const total = track.children.length || 0;
    if (!total) return;

    const maxPage = Math.max(0, total - 1);
    const current = getBasicInfoSliderState_();

    if (direction === 'prev') {
      setBasicInfoSliderState_(current <= 0 ? maxPage : current - 1);
    } else {
      setBasicInfoSliderState_(current >= maxPage ? 0 : current + 1);
    }

    setupBasicInfoSlider_();
  }

  function startBasicInfoSliderAuto_() {
    window.__CRUISE_BASICINFO_TIMER__ = window.__CRUISE_BASICINFO_TIMER__ || null;

    if (window.__CRUISE_BASICINFO_TIMER__) {
      clearInterval(window.__CRUISE_BASICINFO_TIMER__);
      window.__CRUISE_BASICINFO_TIMER__ = null;
    }

    const track = document.getElementById('basicInfoTrack');
    const total = track ? (track.children.length || 0) : 0;
    if (total <= 1) return;

    window.__CRUISE_BASICINFO_TIMER__ = setInterval(function () {
      moveBasicInfoSlider_('next');
    }, 4200);
  }

  function alignContentButtons_() {
    const cards = Array.from(document.querySelectorAll('.content-card'));
    if (!cards.length) return;

    cards.forEach(function (card) {
      const summary = card.querySelector('.content-summary');
      if (summary) summary.style.minHeight = '';
    });

    let maxSummaryHeight = 0;
    cards.forEach(function (card) {
      const summary = card.querySelector('.content-summary');
      if (summary) maxSummaryHeight = Math.max(maxSummaryHeight, summary.offsetHeight || 0);
    });

    cards.forEach(function (card) {
      const summary = card.querySelector('.content-summary');
      if (summary) summary.style.minHeight = maxSummaryHeight + 'px';
    });
  }

  function initRevealAnimations_() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!window.__CRUISE_REVEAL_OBSERVER__) {
      window.__CRUISE_REVEAL_OBSERVER__ = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            window.__CRUISE_REVEAL_OBSERVER__.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });
    }

    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      window.__CRUISE_REVEAL_OBSERVER__.observe(el);
    });
  }

  function openSchedule(scheduleId) {
    const schedule = state.bootstrap.schedules.find(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    });
    if (!schedule) return;

    const days = state.bootstrap.schedule_days.filter(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    }).sort(function (a, b) {
      return Number(a.day_no || 0) - Number(b.day_no || 0);
    });

    const routeStops = getRouteStops(scheduleId, days);
    const imageUrl = schedule.schedule_image_url || schedule.thumbnail_url || '';

    modalBody.innerHTML = [
      '<section class="modal-hero-card">',
        '<div class="modal-badge-row">',
          '<span class="modal-badge">' + escapeHtml(schedule.region || '크루즈') + '</span>',
          '<span class="modal-badge">' + escapeHtml(formatDate(schedule.departure_date)) + ' 출발</span>',
        '</div>',
        '<div class="modal-summary-grid">',
          '<div>',
            '<h3 class="modal-hero-title">' + escapeHtml(schedule.title || '크루즈 일정') + '</h3>',
            '<div class="modal-action"><a href="#contact" class="btn" data-select-schedule="' + escapeAttribute(schedule.schedule_id) + '" data-close-modal>가격문의</a></div>',
          '</div>',
          '<div class="modal-meta-grid">',
            metaBox('선박', schedule.ship_name || '-'),
            metaBox('모항지', getHomePort(schedule.schedule_id) || '-'),
            metaBox('출발', formatDate(schedule.departure_date)),
            metaBox('도착', formatDate(schedule.return_date)),
          '</div>',
        '</div>',
      '</section>',
      '<section class="modal-route-card">',
        '<div class="modal-card-head"><h4>항해 루트</h4><p>한눈에 보이는 선형 타임라인으로 정리했습니다.</p></div>',
        '<div class="route-track">' + buildRouteTrack(routeStops) + '</div>',
      '</section>',
      '<section class="modal-table-card">',
        '<div class="modal-card-head"><h4>상세 항해 일정</h4><p>일차 · 날짜 · 기항지 · 입항 · 출항을 표로 바로 확인할 수 있습니다.</p></div>',
        '<div class="table-scroll">' + buildItineraryTable(days) + '</div>',
        '<p class="modal-table-note">* 현지 사정 및 기상 상황에 의해 기항지 및 입출항 시간은 변경될 수 있습니다.</p>',
      '</section>',
      imageUrl ? '<section class="modal-image-card"><div class="modal-card-head"><h4>일정표 이미지</h4><p>시트에 등록된 일정표 이미지를 함께 보여줍니다.</p></div><div class="schedule-image-frame"><img src="' + escapeAttribute(imageUrl) + '" alt="' + escapeAttribute(schedule.title || '') + '" /></div></section>' : ''
    ].join('');

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function buildRouteTrack(stops) {
    if (!stops.length) return '<div class="schedule-empty">루트 정보가 아직 등록되지 않았습니다.</div>';
    return stops.map(function (stop, index) {
      const label = index === 0 ? 'DEPARTURE' : (index === stops.length - 1 ? 'ARRIVAL' : 'STOP ' + index);
      return '<div class="route-stop"><div class="route-pill"><small>' + label + '</small><strong>' + escapeHtml(stop) + '</strong></div>' + (index < stops.length - 1 ? '<div class="route-line">→</div>' : '') + '</div>';
    }).join('');
  }

  function buildItineraryTable(days) {
    if (!days.length) return '<div class="schedule-empty" style="margin:18px;">상세 항해일정이 아직 등록되지 않았습니다.</div>';
    return [
      '<table class="itinerary-table">',
      '<thead><tr><th>일차</th><th>날짜</th><th>기항지 (PORT)</th><th>입항</th><th>출항</th></tr></thead>',
      '<tbody>',
      days.map(buildItineraryRow).join(''),
      '</tbody></table>'
    ].join('');
  }

  function buildItineraryRow(day) {
    const dayLabel = 'Day ' + (day.day_no || '');
    const dateLabel = formatDayDate(day.date || '');
    const portName = escapeHtml(day.port_name || day.city || '-');
    const portEn = escapeHtml(day.port_name_en || day.country || '');
    const arrival = normalizeTimeCell(day.arrival_time, 'arrival');
    const departure = normalizeTimeCell(day.departure_time, 'departure');
    const highlight = isHighlightDay(day) ? ' is-highlight' : '';
    const overnight = /overnight|정박/i.test(String(day.description || '')) ? '<span class="overnight-badge">정박 (Overnight)</span>' : '';

    return [
      '<tr class="' + highlight.trim() + '">',
        '<td class="day-cell">' + dayLabel + '</td>',
        '<td class="date-cell">' + escapeHtml(dateLabel) + '</td>',
        '<td>',
          '<span class="port-name-kr">' + portName + overnight + '</span>',
          portEn ? '<span class="port-name-en">' + portEn + '</span>' : '',
        '</td>',
        arrival,
        departure,
      '</tr>'
    ].join('');
  }

  function isHighlightDay(day) {
    const text = String(day.description || '').toLowerCase();
    return text.includes('overnight') || text.includes('정박');
  }

  function normalizeTimeCell(value, kind) {
    const text = String(value || '').trim();
    if (!text || text === '-' || text === '—') return '<td class="time-cell muted">-</td>';
    if (kind === 'departure' && /(도착|arrival)/i.test(text)) return '<td class="time-cell arrival">' + escapeHtml(text) + '</td>';
    return '<td class="time-cell">' + escapeHtml(text) + '</td>';
  }

  function formatDayDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return pad(date.getMonth() + 1) + '.' + pad(date.getDate()) + ' (' + weekdays[date.getDay()] + ')';
  }

  function getReviewPerView() {
    return window.innerWidth <= 720 ? 1 : 2;
  }

  function setupReviewSlider(total) {
    if (!reviewGrid) return;
    const perView = getReviewPerView();
    const maxPage = Math.max(0, total - perView);
    state.reviewPage = Math.min(state.reviewPage, maxPage);

    const prev = document.querySelector('[data-review-nav="prev"]');
    const next = document.querySelector('[data-review-nav="next"]');

    if (total <= perView) {
      reviewGrid.style.transform = '';
      if (prev) prev.classList.add('is-hidden');
      if (next) next.classList.add('is-hidden');
      if (reviewDots) {
        reviewDots.className = 'review-dots is-hidden';
        reviewDots.innerHTML = '';
      }
      stopReviewAuto();
      return;
    }

    if (prev) prev.classList.remove('is-hidden');
    if (next) next.classList.remove('is-hidden');
    if (reviewDots) reviewDots.className = 'review-dots';

    const gap = 22;
    const viewportWidth = reviewViewport ? reviewViewport.clientWidth : 0;
    const cardWidth = (viewportWidth - gap) / perView;
    const offset = state.reviewPage * (cardWidth + gap);
    reviewGrid.style.transform = 'translateX(-' + offset + 'px)';

    if (reviewDots) {
      reviewDots.innerHTML = Array.from({ length: maxPage + 1 }).map(function (_, idx) {
        return '<button type="button" class="review-dot ' + (idx === state.reviewPage ? 'is-active' : '') + '" data-review-dot="' + idx + '" aria-label="후기 ' + (idx + 1) + '"></button>';
      }).join('');
    }

    startReviewAuto(total);
  }

  function moveReviews(direction) {
    const total = (state.bootstrap.reviews || []).length;
    const perView = getReviewPerView();
    const maxPage = Math.max(0, total - perView);

    if (direction === 'prev') {
      state.reviewPage = state.reviewPage <= 0 ? maxPage : state.reviewPage - 1;
    } else {
      state.reviewPage = state.reviewPage >= maxPage ? 0 : state.reviewPage + 1;
    }

    setupReviewSlider(total);
  }

  function startReviewAuto(total) {
    stopReviewAuto();
    const perView = getReviewPerView();
    if (total <= perView) return;

    reviewAutoTimer = window.setInterval(function () {
      moveReviews('next');
    }, 3600);
  }

  function stopReviewAuto() {
    if (reviewAutoTimer) {
      window.clearInterval(reviewAutoTimer);
      reviewAutoTimer = null;
    }
  }

  function getHomePort(scheduleId) {
    const schedule = state.bootstrap.schedules.find(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    }) || {};
    if (schedule.home_port) return String(schedule.home_port).trim();
    const stops = getRouteStops(scheduleId);
    return stops.length ? stops[0] : '';
  }

  function populateFormSelects() {
    const scheduleSelect = document.getElementById('interestScheduleSelect');
    if (!scheduleSelect) return;

    scheduleSelect.innerHTML =
      '<option value="">선택해주세요</option>' +
      state.bootstrap.schedules.map(function (schedule) {
        return '<option value="' + escapeAttribute(schedule.schedule_id) + '">' + escapeHtml(schedule.title || schedule.schedule_id) + '</option>';
      }).join('');
  }

  function getRouteStops(scheduleId, preloadedDays) {
    const schedule = state.bootstrap.schedules.find(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    }) || {};

    if (schedule.route_ports) {
      return String(schedule.route_ports).split('|').map(cleanStop).filter(Boolean);
    }

    const days = Array.isArray(preloadedDays)
      ? preloadedDays
      : state.bootstrap.schedule_days.filter(function (item) {
          return String(item.schedule_id).trim() === String(scheduleId).trim();
        });

    const stops = days.map(function (day) {
      return cleanStop(day.port_name || day.city || '');
    }).filter(Boolean).filter(function (stop) {
      const lower = stop.toLowerCase();
      return lower !== '해상일' && lower !== 'sea day' && lower !== '인천 출발' && lower !== '부산 출발';
    });

    return Array.from(new Set(stops));
  }

  function cleanStop(value) {
    return String(value || '').replace(/\s+/g, ' ').replace(/\(.*?\)/g, '').trim();
  }

  function setTrackingFields() {
    const params = new URLSearchParams(window.location.search);
    setInputValue('agentCodeInput', params.get('agent') || '');
    setInputValue('utmSourceInput', params.get('utm_source') || '');
    setInputValue('utmMediumInput', params.get('utm_medium') || '');
    setInputValue('utmCampaignInput', params.get('utm_campaign') || '');
    setInputValue('landingPageInput', window.location.href);
    setInputValue('referrerInput', document.referrer || '');
  }

  function updateFormResult(message, type) {
    if (!formResult) return;
    formResult.textContent = message;
    formResult.className = 'form-result';
    if (type) formResult.classList.add('is-' + type);
  }

  function setSubmitState(isSubmitting) {
    const button = document.getElementById('formSubmitButton');
    if (!button) return;
    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? '접수 중...' : '상담 신청하기';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function setText(id, value, mode) {
    const element = document.getElementById(id);
    if (!element || typeof value === 'undefined' || value === null) return;
    if (mode === 'value') {
      element.value = value;
    } else {
      element.textContent = value;
    }
  }

  function setHtml(id, html) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = html;
  }

  function setInputValue(id, value) {
    const input = document.getElementById(id);
    if (input) input.value = value;
  }

  function metaItem(label, value) {
    return '<div class="schedule-meta-item"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value || '-') + '</strong></div>';
  }

  function metaBox(label, value) {
    return '<div class="modal-meta-box"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value || '-') + '</strong></div>';
  }

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.getFullYear() + '.' + pad(date.getMonth() + 1) + '.' + pad(date.getDate());
  }

  function getMonthLabel_(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return String(date.getMonth() + 1) + '월';
  }

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function convertLineBreaks(value) {
    return String(value || '').replace(/\n/g, '<br>');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
})();

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

      const dynamicNav = event.target.closest('[data-dyn-nav]');
      if (dynamicNav) {
        moveDynamicSlider_(dynamicNav.getAttribute('data-dyn-slider'), dynamicNav.getAttribute('data-dyn-nav'));
        return;
      }

      const dynamicDot = event.target.closest('[data-dyn-dot]');
      if (dynamicDot) {
        const sliderKey = dynamicDot.getAttribute('data-dyn-slider') || '';
        setDynamicSliderState_(sliderKey, Number(dynamicDot.getAttribute('data-dyn-dot') || 0));
        setupDynamicSlider_(sliderKey);
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
      setupDynamicSlider_('basicInfo');
      alignContentButtons_();
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
        if (form) form.reset();
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
          if (formResult && formResult.classList.contains('is-pending')) {
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
        window[callbackName] = function () {};
        window.setTimeout(function () {
          try { delete window[callbackName]; } catch (error) {}
        }, 30000);
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
      ensureDynamicSectionsStyle();
      ensureDynamicSectionsScaffold();
      renderBasicInfo();
      renderTargets();
      renderProcessSteps();
      renderCabins();
      renderFaqs();
      renderContentLinks();
      setupDynamicSlider_('basicInfo');
      alignContentButtons_();
      initRevealAnimations_();
    } catch (error) {
      console.error('extended-sections-failed:', error);
    }
  }

  function normalizeData(data) {
    const safe = data || {};
    const fallback = window.MOCK_BOOTSTRAP_DATA || {};
    safe.settings = mergeSettings(fallback.settings, safe.settings);
    safe.schedules = ensureArray(safe.schedules, fallback.schedules);
    safe.schedule_days = ensureArray(safe.schedule_days, fallback.schedule_days);
    safe.reviews = ensureArray(safe.reviews, fallback.reviews);
    safe.targets = ensureArray(safe.targets, fallback.targets);
    safe.basic_info = ensureArray(safe.basic_info, fallback.basic_info);
    safe.process_steps = ensureArray(safe.process_steps, fallback.process_steps);
    safe.cabins = ensureArray(safe.cabins, fallback.cabins);
    safe.faqs = ensureArray(safe.faqs, fallback.faqs);
    safe.trust_points = ensureArray(safe.trust_points, fallback.trust_points);
    safe.content_links = ensureArray(safe.content_links, fallback.content_links);
    return safe;
  }

  function mergeSettings(base, override) {
    return Object.assign({}, base || {}, override || {});
  }

  function ensureArray(primary, fallback) {
    if (Array.isArray(primary) && primary.length) return primary;
    if (Array.isArray(primary)) return primary;
    if (Array.isArray(fallback)) return fallback;
    return [];
  }

  function renderSettings() {
    const settings = state.bootstrap.settings || {};
    document.title = settings.site_title || document.title;

    const heroEyebrow = document.getElementById('heroEyebrow');
    const heroTitle = document.getElementById('heroTitle');
    const heroDescription = document.getElementById('heroDescription');
    const sectionLead = document.getElementById('sectionLead');
    const badges = document.getElementById('heroBadges');
    const notice = document.getElementById('topNoticeText');
    const footerCompany = document.getElementById('footerCompanyInfo');
    const footerContact = document.getElementById('footerContactInfo');
    const footerCopyright = document.getElementById('footerCopyright');

    if (heroEyebrow) heroEyebrow.textContent = settings.hero_eyebrow || '크루즈 여행';
    if (heroTitle) heroTitle.innerHTML = emphasizeTitle(settings.hero_title || '지금 가장 빠르게 마감되는 크루즈 여행');
    if (heroDescription) heroDescription.textContent = settings.hero_description || '가격 메리트가 큰 일정만 선별해 보여드립니다.';
    if (sectionLead) sectionLead.textContent = settings.section_lead || '출발일, 기항지, 가격 포인트를 한눈에 비교해보세요.';
    if (notice) notice.textContent = settings.notice_text || '출발 일정과 요금은 수시 변동될 수 있습니다.';
    if (footerCompany) footerCompany.textContent = settings.footer_company || '';
    if (footerContact) footerContact.textContent = settings.footer_contact || '';
    if (footerCopyright) footerCopyright.textContent = settings.footer_copyright || '';

    if (badges) {
      const list = [settings.badge_1, settings.badge_2, settings.badge_3].filter(Boolean);
      badges.innerHTML = list.map(function (item) {
        return '<span class="hero-badge">' + escapeHtml(item) + '</span>';
      }).join('');
    }
  }

  function renderFilters() {
    if (!scheduleFilters) return;
    const days = state.bootstrap.schedule_days || [];
    const hasAll = days.some(function (item) { return String(item.region_code || '').toUpperCase() === 'ALL'; });
    const normalized = hasAll ? days : [{ region_code: 'ALL', region_label: '전체' }].concat(days);

    scheduleFilters.innerHTML = normalized.map(function (item) {
      const code = String(item.region_code || 'ALL').toUpperCase();
      const label = item.region_label || '전체';
      const active = code === String(state.activeRegion || 'ALL').toUpperCase();
      return '<button type="button" class="chip ' + (active ? 'is-active' : '') + '" data-region="' + escapeAttribute(code) + '">' + escapeHtml(label) + '</button>';
    }).join('');
  }

  function renderSchedules() {
    if (!scheduleGrid) return;

    const schedules = filterSchedules();
    if (!schedules.length) {
      scheduleGrid.innerHTML = '<div class="empty-state">표시할 일정이 없습니다.</div>';
      return;
    }

    scheduleGrid.innerHTML = schedules.map(buildScheduleCard).join('');
  }

  function filterSchedules() {
    const region = String(state.activeRegion || 'ALL').toUpperCase();
    const schedules = state.bootstrap.schedules || [];
    if (region === 'ALL') return schedules;
    return schedules.filter(function (item) {
      return String(item.region_code || '').toUpperCase() === region;
    });
  }

  function buildScheduleCard(item) {
    const scheduleId = item.schedule_id || '';
    const departureMonth = getMonthLabel_(item.departure_date);
    const priceLabel = item.price_summary || item.price || '문의';
    const tags = [item.region_label, item.nights_label, item.ship_name].filter(Boolean);

    return [
      '<article class="schedule-card reveal-on-scroll" data-open-schedule="' + escapeAttribute(scheduleId) + '">',
        '<div class="card-head">',
          '<div class="card-month">' + escapeHtml(departureMonth || '출발') + '</div>',
          '<div class="card-tags">' + tags.map(function (tag) {
            return '<span class="chip small">' + escapeHtml(tag) + '</span>';
          }).join('') + '</div>',
        '</div>',
        '<h3 class="card-title">' + escapeHtml(item.title || '크루즈 일정') + '</h3>',
        item.subtitle ? '<p class="card-subtitle">' + escapeHtml(item.subtitle) + '</p>' : '',
        '<div class="card-meta">',
          '<span>' + escapeHtml(item.departure_date || '') + '</span>',
          item.arrival_date ? '<span>' + escapeHtml(item.arrival_date) + '</span>' : '',
        '</div>',
        '<div class="card-price-row">',
          '<strong class="card-price">' + escapeHtml(priceLabel) + '</strong>',
          '<button type="button" class="btn ghost" data-select-schedule="' + escapeAttribute(scheduleId) + '">상담 요청</button>',
        '</div>',
      '</article>'
    ].join('');
  }

  function openSchedule(scheduleId) {
    if (!modal || !modalBody) return;

    const schedules = state.bootstrap.schedules || [];
    const schedule = schedules.find(function (item) {
      return String(item.schedule_id || '') === String(scheduleId || '');
    });

    if (!schedule) return;

    modalBody.innerHTML = buildScheduleDetail(schedule);
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  function buildScheduleDetail(item) {
    const lines = [item.point_1, item.point_2, item.point_3, item.point_4].filter(Boolean);
    return [
      '<div class="modal-card">',
        '<div class="modal-top">',
          '<div>',
            item.region_label ? '<span class="chip">' + escapeHtml(item.region_label) + '</span>' : '',
            '<h3>' + escapeHtml(item.title || '크루즈 일정') + '</h3>',
            item.subtitle ? '<p class="modal-subtitle">' + escapeHtml(item.subtitle) + '</p>' : '',
          '</div>',
          '<button type="button" class="modal-close" data-close-modal aria-label="닫기">×</button>',
        '</div>',
        '<div class="modal-grid">',
          '<div class="modal-block">',
            '<strong>출발</strong>',
            '<span>' + escapeHtml(item.departure_date || '-') + '</span>',
          '</div>',
          '<div class="modal-block">',
            '<strong>도착</strong>',
            '<span>' + escapeHtml(item.arrival_date || '-') + '</span>',
          '</div>',
          '<div class="modal-block">',
            '<strong>선박</strong>',
            '<span>' + escapeHtml(item.ship_name || '-') + '</span>',
          '</div>',
          '<div class="modal-block">',
            '<strong>가격</strong>',
            '<span>' + escapeHtml(item.price_summary || item.price || '문의') + '</span>',
          '</div>',
        '</div>',
        lines.length ? '<ul class="modal-points">' + lines.map(function (line) { return '<li>' + escapeHtml(line) + '</li>'; }).join('') + '</ul>' : '',
        '<div class="modal-actions">',
          '<button type="button" class="btn" data-select-schedule="' + escapeAttribute(item.schedule_id || '') + '">이 일정 상담받기</button>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderReviews() {
    if (!reviewGrid || !reviewDots || !reviewViewport) return;
    const items = state.bootstrap.reviews || [];

    if (!items.length) {
      reviewGrid.innerHTML = '';
      reviewDots.innerHTML = '';
      stopReviewAuto();
      return;
    }

    reviewGrid.innerHTML = items.map(function (item) {
      return [
        '<article class="review-card">',
          '<div class="review-top">',
            '<strong>' + escapeHtml(item.name || '고객 후기') + '</strong>',
            item.meta ? '<span>' + escapeHtml(item.meta) + '</span>' : '',
          '</div>',
          '<p>' + escapeHtml(item.body || '') + '</p>',
        '</article>'
      ].join('');
    }).join('');

    setupReviewSlider(items.length);
    startReviewAuto(items.length);
  }

  function setupReviewSlider(total) {
    if (!reviewViewport || !reviewGrid || !reviewDots) return;
    const pageWidth = reviewViewport.clientWidth || 1;
    const lastPage = Math.max(0, total - 1);
    state.reviewPage = Math.min(state.reviewPage, lastPage);
    reviewGrid.style.transform = 'translateX(-' + (pageWidth * state.reviewPage) + 'px)';

    reviewDots.innerHTML = Array.from({ length: total }).map(function (_, idx) {
      return '<button type="button" class="review-dot ' + (idx === state.reviewPage ? 'is-active' : '') + '" data-review-dot="' + idx + '" aria-label="후기 ' + (idx + 1) + '"></button>';
    }).join('');
  }

  function moveReviews(direction) {
    const total = (state.bootstrap.reviews || []).length;
    if (!total) return;
    if (direction === 'prev') {
      state.reviewPage = state.reviewPage <= 0 ? total - 1 : state.reviewPage - 1;
    } else {
      state.reviewPage = state.reviewPage >= total - 1 ? 0 : state.reviewPage + 1;
    }
    setupReviewSlider(total);
  }

  let reviewTimer = null;

  function startReviewAuto(total) {
    stopReviewAuto();
    if (!total || total <= 1) return;
    reviewTimer = window.setInterval(function () {
      moveReviews('next');
    }, 4500);
  }

  function stopReviewAuto() {
    if (reviewTimer) {
      window.clearInterval(reviewTimer);
      reviewTimer = null;
    }
  }

  function populateFormSelects() {
    const scheduleSelect = document.getElementById('interestScheduleSelect');
    const peopleSelect = document.getElementById('peopleCountSelect');

    if (scheduleSelect) {
      const options = ['<option value="">관심 일정을 선택해주세요</option>'].concat((state.bootstrap.schedules || []).map(function (item) {
        return '<option value="' + escapeAttribute(item.schedule_id || '') + '">' + escapeHtml(item.title || '크루즈 일정') + '</option>';
      }));
      scheduleSelect.innerHTML = options.join('');
    }

    if (peopleSelect && !peopleSelect.children.length) {
      peopleSelect.innerHTML = [
        '<option value="">인원수 선택</option>',
        '<option value="1">1명</option>',
        '<option value="2">2명</option>',
        '<option value="3">3명</option>',
        '<option value="4">4명</option>',
        '<option value="5명 이상">5명 이상</option>'
      ].join('');
    }
  }

  function setTrackingFields() {
    const search = new URLSearchParams(window.location.search);
    const mapping = {
      utm_source: 'utmSourceInput',
      utm_medium: 'utmMediumInput',
      utm_campaign: 'utmCampaignInput',
      utm_content: 'utmContentInput',
      utm_term: 'utmTermInput'
    };

    Object.keys(mapping).forEach(function (key) {
      const el = document.getElementById(mapping[key]);
      if (el) el.value = search.get(key) || '';
    });

    const pageUrlInput = document.getElementById('pageUrlInput');
    if (pageUrlInput) pageUrlInput.value = window.location.href;

    const referrerInput = document.getElementById('referrerInput');
    if (referrerInput) referrerInput.value = document.referrer || '';
  }

  function setSubmitState(isSubmitting) {
    const submitButton = document.getElementById('contactSubmitButton');
    if (!submitButton) return;
    submitButton.disabled = !!isSubmitting;
    submitButton.textContent = isSubmitting ? '접수 중...' : '간편 상담 요청';
  }

  function updateFormResult(message, type) {
    if (!formResult) return;
    formResult.textContent = message || '';
    formResult.className = 'form-result';
    if (type) formResult.classList.add('is-' + type);
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function startHeroMotion() {
    const heroVisual = document.getElementById('heroVisual');
    if (!heroVisual) return;
    heroVisual.classList.add('is-ready');
  }

  function emphasizeTitle(text) {
    const safe = String(text || '');
    const parts = safe.split(/\n+/).filter(Boolean);
    if (!parts.length) return '';
    return parts.map(function (line, idx) {
      return '<span class="hero-line ' + (idx === 0 ? 'is-primary' : '') + '">' + escapeHtml(line) + '</span>';
    }).join('');
  }

  function ensureDynamicSectionsScaffold() {
    if (!mainContent) return;

    ensureSection('basicInfoSection', 'afterbegin', buildDynamicSliderShell_('기초 안내', '크루즈는 어렵지 않아요', '처음 보는 분도 빠르게 이해할 수 있도록 핵심만 정리했습니다.', 'basicInfo'));
    ensureSection('targetsSection', 'beforeend', [
      '<section class="section section-soft" id="targetsSection">',
        '<div class="wrap">',
          '<div class="section-head center compact-head">',
            '<span class="section-label">이용 대상자</span>',
            '<h2 class="section-title center-title">이런 분들께 특히 잘 맞아요</h2>',
            '<p class="section-description">목적과 상황에 따라 맞는 이용 포인트를 빠르게 확인하세요.</p>',
          '</div>',
          '<div class="target-grid" id="targetsGrid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection('processSection', 'beforeend', [
      '<section class="section" id="processSection">',
        '<div class="wrap">',
          '<div class="section-head center compact-head">',
            '<span class="section-label">예약 과정</span>',
            '<h2 class="section-title center-title">상담부터 탑승까지 이렇게 진행돼요</h2>',
            '<p class="section-description">복잡한 설명 없이, 실제 진행 순서대로 정리했습니다.</p>',
          '</div>',
          '<div class="process-grid" id="processGrid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection('cabinsSection', 'beforeend', [
      '<section class="section section-soft" id="cabinsSection">',
        '<div class="wrap">',
          '<div class="section-head center compact-head">',
            '<span class="section-label">선실 비교</span>',
            '<h2 class="section-title center-title">예산과 스타일에 맞게 선택하세요</h2>',
            '<p class="section-description">인사이드부터 발코니까지, 선택 기준을 한 번에 볼 수 있습니다.</p>',
          '</div>',
          '<div class="cabins-grid" id="cabinsGrid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection('faqSection', 'beforeend', [
      '<section class="section" id="faqSection">',
        '<div class="wrap">',
          '<div class="section-head center compact-head">',
            '<span class="section-label">FAQ</span>',
            '<h2 class="section-title center-title">자주 묻는 질문</h2>',
            '<p class="section-description">처음 문의하시는 분들이 가장 많이 궁금해하는 내용을 정리했습니다.</p>',
          '</div>',
          '<div class="faq-list" id="faqList"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection('contentSection', 'beforeend', [
      '<section class="section section-soft" id="contentSection">',
        '<div class="wrap">',
          '<div class="section-head center compact-head">',
            '<span class="section-label">콘텐츠 연결</span>',
            '<h2 class="section-title center-title">함께 보면 좋은 추천 콘텐츠</h2>',
            '<p class="section-description">후기, 가이드, 상세 정보까지 이어서 확인할 수 있도록 연결했습니다.</p>',
          '</div>',
          '<div class="content-grid" id="contentGrid"></div>',
        '</div>',
      '</section>'
    ].join(''));
  }

  function ensureSection(sectionId, position, html) {
    if (document.getElementById(sectionId)) return;
    if (!mainContent) return;
    mainContent.insertAdjacentHTML(position, html);
  }

  function ensureDynamicSectionsStyle() {
    if (document.getElementById('dynamicSectionsStyle')) return;

    const style = document.createElement('style');
    style.id = 'dynamicSectionsStyle';
    style.textContent = [
      '.compact-head{max-width:880px;margin:0 auto 28px;text-align:center;}',
      '.center-title{text-align:center;}',
      '.dynamic-slider{position:relative;}',
      '.dynamic-slider-viewport{overflow:hidden;}',
      '.dynamic-slider-track{display:grid;grid-auto-flow:column;grid-auto-columns:100%;gap:0;transition:transform .35s ease;will-change:transform;}',
      '.dynamic-slider-controls{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:18px;}',
      '.dynamic-slider-nav{width:40px;height:40px;border:1px solid rgba(15,23,42,.12);border-radius:999px;background:#fff;color:#0f172a;font-size:24px;line-height:1;cursor:pointer;box-shadow:0 8px 20px rgba(15,23,42,.08);}',
      '.dynamic-slider-dots{display:flex;align-items:center;gap:8px;}',
      '.dynamic-slider-dot{width:10px;height:10px;border-radius:999px;border:0;background:rgba(15,23,42,.18);cursor:pointer;padding:0;}',
      '.dynamic-slider-dot.is-active{background:var(--point-color,#2563eb);width:26px;}',
      '.dynamic-card{background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:28px;padding:28px;box-shadow:0 18px 40px rgba(15,23,42,.06);height:100%;}',
      '.dynamic-card h3,.dynamic-card h4{margin:10px 0 10px;font-size:1.35rem;line-height:1.4;color:#0f172a;}',
      '.dynamic-card p{margin:0;color:#475569;line-height:1.75;}',
      '.dynamic-chip{display:inline-flex;align-items:center;justify-content:center;padding:6px 12px;border-radius:999px;background:rgba(37,99,235,.08);color:var(--point-color,#2563eb);font-weight:700;font-size:.85rem;}',
      '.dynamic-points{margin:18px 0 0;padding-left:18px;display:grid;gap:10px;color:#334155;line-height:1.7;}',
      '.dynamic-media{margin-top:18px;overflow:hidden;border-radius:22px;background:#f8fafc;}',
      '.dynamic-media img{display:block;width:100%;height:auto;object-fit:cover;}',
      '.basic-info-card{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(280px,.8fr);gap:24px;align-items:center;}',
      '.basic-info-copy{display:grid;gap:16px;}',
      '.basic-info-title{margin:0;font-size:1.45rem;line-height:1.45;color:#0f172a;}',
      '.basic-info-subtitle{margin:0;color:#475569;line-height:1.75;}',
      '.basic-info-points{display:grid;gap:10px;padding:0;margin:0;list-style:none;}',
      '.basic-info-points li{display:flex;gap:10px;align-items:flex-start;color:#334155;line-height:1.7;}',
      '.basic-info-points li::before{content:"•";color:var(--point-color,#2563eb);font-weight:700;}',
      '.target-grid,.cabins-grid,.content-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;}',
      '.process-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;}',
      '.process-card{background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:24px;padding:24px;box-shadow:0 16px 32px rgba(15,23,42,.05);display:grid;gap:12px;}',
      '.process-card h3{margin:0;font-size:1.1rem;color:#0f172a;}',
      '.process-card p{margin:0;color:#475569;line-height:1.7;}',
      '.process-highlight{display:inline-flex;align-items:center;justify-content:center;width:max-content;padding:6px 10px;border-radius:999px;background:#eff6ff;color:var(--point-color,#2563eb);font-weight:700;font-size:.82rem;}',
      '.target-cta-row,.content-link-row{margin-top:20px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;}',
      '.cabin-badges{margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;}',
      '.cabin-badge,.content-tag{display:inline-flex;align-items:center;justify-content:center;padding:7px 12px;border-radius:999px;background:#f8fafc;color:#334155;font-weight:700;font-size:.82rem;border:1px solid rgba(15,23,42,.08);}',
      '.faq-list{display:grid;gap:14px;max-width:900px;margin:0 auto;}',
      '.faq-item{border:1px solid rgba(15,23,42,.08);border-radius:22px;background:#fff;box-shadow:0 12px 28px rgba(15,23,42,.05);overflow:hidden;}',
      '.faq-item summary{list-style:none;cursor:pointer;padding:20px 24px;font-weight:800;color:#0f172a;display:flex;align-items:center;justify-content:space-between;gap:12px;}',
      '.faq-item summary::-webkit-details-marker{display:none;}',
      '.faq-answer{padding:0 24px 22px;color:#475569;line-height:1.8;display:grid;gap:12px;}',
      '.content-card .content-summary{min-height:84px;}',
      '.reveal-on-scroll{opacity:0;transform:translateY(16px);transition:opacity .45s ease,transform .45s ease;}',
      '.reveal-on-scroll.is-visible{opacity:1;transform:none;}',
      '@media (max-width:1100px){.target-grid,.cabins-grid,.content-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.process-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.basic-info-card{grid-template-columns:1fr;}}',
      '@media (max-width:767px){.dynamic-card,.process-card{padding:22px;}.target-grid,.cabins-grid,.content-grid,.process-grid{grid-template-columns:1fr;}.content-card .content-summary{min-height:0;}.dynamic-slider-controls{margin-top:14px;}}'
    ].join('');

    document.head.appendChild(style);
  }

  function renderBasicInfo() {
    const track = document.getElementById('basicInfoTrack');
    const section = document.getElementById('basicInfoSection');
    if (!track || !section) return;

    const items = state.bootstrap.basic_info || [];
    if (!items.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    track.innerHTML = items.map(function (item) {
      return [
        '<article class="dynamic-card basic-info-card">',
          '<div class="basic-info-copy">',
            item.title ? '<h3 class="basic-info-title">' + escapeHtml(item.title) + '</h3>' : '',
            item.subtitle ? '<p class="basic-info-subtitle">' + escapeHtml(item.subtitle) + '</p>' : '',
            '<ul class="basic-info-points">',
              [item.point_1, item.point_2, item.point_3].filter(Boolean).map(function (point) {
                return '<li>' + escapeHtml(point) + '</li>';
              }).join(''),
            '</ul>',
          '</div>',
          buildSafeImageHtml_(item.image_url, item.title || ''),
        '</article>'
      ].join('');
    }).join('');
  }

  function renderTargets() {
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
      const points = [item.point_1, item.point_2, item.point_3].filter(Boolean);
      return [
        '<article class="dynamic-card reveal-on-scroll">',
          item.badge ? '<span class="dynamic-chip">' + escapeHtml(item.badge) + '</span>' : '',
          '<h3>' + escapeHtml(item.title || '추천 대상') + '</h3>',
          item.subtitle ? '<p>' + escapeHtml(item.subtitle) + '</p>' : '',
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

  function renderProcessSteps() {
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
        '<article class="process-card">',
          '<h3>' + escapeHtml(item.step_title || '진행 단계') + '</h3>',
          item.step_desc ? '<p>' + escapeHtml(item.step_desc) + '</p>' : '',
          item.highlight_text ? '<span class="process-highlight">' + escapeHtml(item.highlight_text) + '</span>' : '',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderCabins() {
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
        '<article class="dynamic-card">',
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

  function renderFaqs() {
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
          '<summary>',
            '<span>' + escapeHtml(item.question || '자주 묻는 질문') + '</span>',
          '</summary>',
          '<div class="faq-answer">',
            item.category ? '<div class="content-meta"><span class="content-tag">' + escapeHtml(item.category) + '</span></div>' : '',
            '<div>' + escapeHtml(item.answer || '') + '</div>',
          '</div>',
        '</details>'
      ].join('');
    }).join('');
  }

  function renderTrustPoints() {
    return;
  }

  function renderContentLinks() {
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
        '<article class="dynamic-card content-card">',
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


  function getMonthLabel_(value) {
    if (!value) return '';

    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return (date.getMonth() + 1) + '월';
    }

    const match = String(value).match(/^(\d{4})[-/.](\d{1,2})/);
    if (match) {
      return Number(match[2]) + '월';
    }

    return '';
  }

  function buildDynamicSliderShell_(label, title, description, sliderKey) {
    return [
      '<div class="wrap">',
        '<div class="section-head center compact-head">',
          label ? '<span class="section-label">' + escapeHtml(label) + '</span>' : '',
          '<h2 class="section-title center-title">' + escapeHtml(title || '') + '</h2>',
          description ? '<p class="section-description">' + escapeHtml(description) + '</p>' : '',
        '</div>',
        '<div class="dynamic-slider" data-dyn-slider-shell="' + escapeAttribute(sliderKey) + '">',
          '<div class="dynamic-slider-viewport" id="' + escapeAttribute(sliderKey) + 'Viewport">',
            '<div class="dynamic-slider-track" id="' + escapeAttribute(sliderKey) + 'Track"></div>',
          '</div>',
          '<div class="dynamic-slider-controls" id="' + escapeAttribute(sliderKey) + 'Controls">',
            '<button type="button" class="dynamic-slider-nav" data-dyn-slider="' + escapeAttribute(sliderKey) + '" data-dyn-nav="prev" aria-label="이전">‹</button>',
            '<div class="dynamic-slider-dots" id="' + escapeAttribute(sliderKey) + 'Dots"></div>',
            '<button type="button" class="dynamic-slider-nav" data-dyn-slider="' + escapeAttribute(sliderKey) + '" data-dyn-nav="next" aria-label="다음">›</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function getDynamicSliderState_(sliderKey) {
    if (!state.dynamicSliders) state.dynamicSliders = {};
    if (!state.dynamicSliders[sliderKey]) {
      state.dynamicSliders[sliderKey] = { page: 0 };
    }
    return state.dynamicSliders[sliderKey];
  }

  function setDynamicSliderState_(sliderKey, page) {
    const sliderState = getDynamicSliderState_(sliderKey);
    sliderState.page = Math.max(0, Number(page) || 0);
  }

  function moveDynamicSlider_(sliderKey, direction) {
    const track = document.getElementById(sliderKey + 'Track');
    if (!track) return;

    const total = track.children.length;
    if (!total) return;

    const sliderState = getDynamicSliderState_(sliderKey);
    const lastPage = Math.max(0, total - 1);

    if (direction === 'prev') {
      sliderState.page = sliderState.page <= 0 ? lastPage : sliderState.page - 1;
    } else {
      sliderState.page = sliderState.page >= lastPage ? 0 : sliderState.page + 1;
    }

    setupDynamicSlider_(sliderKey);
  }

  function setupDynamicSlider_(sliderKey) {
    const viewport = document.getElementById(sliderKey + 'Viewport');
    const track = document.getElementById(sliderKey + 'Track');
    const dots = document.getElementById(sliderKey + 'Dots');
    const controls = document.getElementById(sliderKey + 'Controls');

    if (!viewport || !track) return;

    const total = track.children.length;
    const sliderState = getDynamicSliderState_(sliderKey);
    const lastPage = Math.max(0, total - 1);
    sliderState.page = Math.min(sliderState.page, lastPage);

    if (total <= 1) {
      track.style.transform = 'translateX(0px)';
      if (dots) dots.innerHTML = '';
      if (controls) controls.style.display = 'none';
      return;
    }

    if (controls) controls.style.display = '';

    const offset = sliderState.page * viewport.clientWidth;
    track.style.transform = 'translateX(-' + offset + 'px)';

    if (dots) {
      dots.innerHTML = Array.from({ length: total }).map(function (_, idx) {
        return '<button type="button" class="dynamic-slider-dot ' + (idx === sliderState.page ? 'is-active' : '') + '" data-dyn-slider="' + escapeAttribute(sliderKey) + '" data-dyn-dot="' + idx + '" aria-label="슬라이드 ' + (idx + 1) + '"></button>';
      }).join('');
    }
  }

  function buildSafeImageHtml_(imageUrl, altText) {
    const safeUrl = String(imageUrl || '').trim();
    if (!safeUrl) return '';

    return [
      '<div class="dynamic-media">',
        '<img src="' + escapeAttribute(safeUrl) + '" alt="' + escapeAttribute(altText || '') + '" loading="lazy" decoding="async" onerror="if(this.parentNode){this.parentNode.style.display=\'none\';}">',
      '</div>'
    ].join('');
  }

  function alignContentButtons_() {
    const rows = document.querySelectorAll('.content-link-row');
    if (!rows.length) return;

    rows.forEach(function (row) {
      row.style.minHeight = '';
    });
  }

  function initRevealAnimations_() {
    const nodes = Array.prototype.slice.call(document.querySelectorAll('.reveal-on-scroll'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (node) {
        node.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
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

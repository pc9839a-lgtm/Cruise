(function () {
  const config = window.APP_CONFIG || {};

  let modal = null;
  let modalBody = null;
  let scheduleGrid = null;
  let scheduleFilters = null;
  let reviewGrid = null;
  let reviewDots = null;
  let reviewViewport = null;
  let form = null;
  let formResult = null;
  let mobileMenuToggle = null;
  let mainNav = null;
  let phoneInput = null;
  let mainContent = null;

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      boot().catch(handleBootError_);
    }, { once: true });
  } else {
    boot().catch(handleBootError_);
  }

  async function boot() {
    cacheDom_();
    await init();
  }

  function cacheDom_() {
    modal = document.getElementById('scheduleModal');
    modalBody = document.getElementById('scheduleModalBody');
    scheduleGrid = document.getElementById('scheduleGrid');
    scheduleFilters = document.getElementById('scheduleFilters');
    reviewGrid = document.getElementById('reviewGrid');
    reviewDots = document.getElementById('reviewDots');
    reviewViewport = document.getElementById('reviewViewport');
    form = document.getElementById('contactForm');
    formResult = document.getElementById('formResult');
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    mainNav = document.getElementById('mainNav');
    phoneInput = document.getElementById('phoneInput');
    mainContent = document.querySelector('main');
  }

  function handleBootError_(error) {
    console.error('main-init-failed:', error);
    showBootstrapError_(error);
  }

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
      validateBootstrapPayload_(apiPayload);
      return normalizeData(apiPayload);
    } catch (error) {
      console.error('bootstrap-failed:', error);
      showBootstrapError_(error);

      if (window.MOCK_BOOTSTRAP_DATA) {
        console.warn('mock-bootstrap-used');
        return normalizeData(window.MOCK_BOOTSTRAP_DATA || {});
      }

      throw error;
    }
  }

  function validateBootstrapPayload_(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new Error('bootstrap-invalid-payload');
    }

    if (payload.success === false) {
      throw new Error(payload.message || 'bootstrap-api-error');
    }

    const hasBootstrapKeys =
      !!payload.settings ||
      Array.isArray(payload.schedules) ||
      Array.isArray(payload.schedule_days) ||
      Array.isArray(payload.reviews);

    if (!hasBootstrapKeys) {
      throw new Error('bootstrap-empty-payload');
    }
  }

  function loadBootstrapFromApi() {
    return new Promise(function (resolve, reject) {
      const baseUrl = String(config.apiUrl || '').trim();

      if (!baseUrl) {
        reject(new Error('apiUrl-missing'));
        return;
      }

      const callbackName = '__cruiseJsonpCallback_' + Date.now();
      const params = new URLSearchParams(window.location.search);

      params.set('action', 'bootstrap');
      params.set('callback', callbackName);
      params.set('_ts', String(Date.now()));

      const script = document.createElement('script');
      const timeoutMs = Number(config.bootstrapTimeout || 12000);
      let finished = false;
      let timer = null;

      function cleanup() {
        if (timer) window.clearTimeout(timer);
        try {
          delete window[callbackName];
        } catch (_) {
          window[callbackName] = undefined;
        }
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
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

      const joiner = baseUrl.indexOf('?') >= 0 ? '&' : '?';
      script.src = baseUrl + joiner + params.toString();
      script.async = true;

      const mountTarget = document.body || document.head || document.documentElement;
      mountTarget.appendChild(script);
    });
  }

  function showBootstrapError_(error) {
    const message = String(error && error.message ? error.message : error || '알 수 없는 오류');

    if (scheduleGrid) {
      scheduleGrid.innerHTML =
        '<div class="schedule-empty">일정 데이터를 불러오지 못했습니다. 원인: ' +
        escapeHtml(message) +
        '</div>';
    }

    if (reviewGrid) {
      reviewGrid.innerHTML =
        '<div class="schedule-empty">후기 데이터를 불러오지 못했습니다.</div>';
    }

    updateFormResult('데이터 로딩 실패: ' + message, 'error');
  }

  function hydrate(payload) {
    state.bootstrap = payload;

    document.body.classList.add('is-ready');

    applySeo(payload.settings || {});
    applySettings(payload.settings || {});
    renderHeroStats(payload.settings || {});
    renderJourneyIntro_(payload.settings || {});
    renderRealtimeSummary_(payload.settings || {});
    renderCabins(payload.cabins || []);
    renderTargets(payload.targets || []);
    renderBasicInfoSection_(payload.basic_info || []);
    renderProcess(payload.process_steps || []);
    renderFaqs(payload.faqs || []);
    renderTrustPoints(payload.trust_points || []);
    renderContentLinks(payload.content_links || []);
    renderFilters();
    renderSchedules();
    renderReviews(payload.reviews || []);
    renderReviewSummary_(payload.reviews || []);
    setupReviewSlider((payload.reviews || []).length);
    startReviewAuto((payload.reviews || []).length);
    fillScheduleSelect(payload.schedules || []);
    highlightExternalLinks();
    alignContentButtons_();
  }

  function normalizeData(raw) {
    const settingsSource = raw.settings || {};
    const settings = Array.isArray(settingsSource)
      ? settingsSource.reduce(function (acc, item) {
          const key = normalizeKey_(item && (item.key || item.setting_key || item.name));
          const value = item ? (item.value || item.setting_value || item.content || '') : '';
          if (key) acc[key] = value;
          return acc;
        }, {})
      : Object.keys(settingsSource || {}).reduce(function (acc, key) {
          acc[normalizeKey_(key)] = settingsSource[key];
          return acc;
        }, {});

    const schedules = arrayify(raw.schedules).map(function (item, index) {
      const id = String(item.schedule_id || item.id || item.code || index + 1);
      const cruise = item.cruise_name || item.title || item.product_name || '추천 크루즈';
      const nights = Number(item.nights || item.duration || item.night_count || 0);
      const departureDate = item.departure_date || item.start_date || item.date || '';
      const returnDate = item.return_date || item.end_date || '';
      const embarkPort = item.embark_port || item.departure_port || item.start_port || '';
      const disembarkPort = item.disembark_port || item.arrival_port || item.end_port || '';
      const boardingTime = item.boarding_time || item.departure_time || '';
      const itineraryText = item.itinerary || item.route || '';
      const routePorts = splitDelimited_(item.route_ports || item.route_port || itineraryText);
      const highlights = splitDelimited_(item.highlights || item.features || item.summary || '');
      const departures = splitDelimited_(item.departure_options || item.departures || '');
      const regions = splitDelimited_(item.region || item.category || '');
      const pricing = {
        inside: toPrice_(item.inside_price || item.price_inside || item.price1 || item.price),
        oceanview: toPrice_(item.oceanview_price || item.ocean_view_price || item.price_oceanview || item.price2),
        balcony: toPrice_(item.balcony_price || item.price_balcony || item.price3),
        suite: toPrice_(item.suite_price || item.price_suite || item.price4)
      };
      const status = String(item.status || item.badge || '').trim();
      const image = item.image || item.thumbnail || item.thumb || '';
      const details = splitDelimited_(item.details || item.description || item.note || '');
      return {
        id: id,
        cruise: cruise,
        nights: nights,
        departureDate: departureDate,
        returnDate: returnDate,
        embarkPort: embarkPort,
        disembarkPort: disembarkPort,
        boardingTime: boardingTime,
        itineraryText: itineraryText,
        routePorts: routePorts,
        highlights: highlights,
        departures: departures,
        regions: regions,
        pricing: pricing,
        status: status,
        image: image,
        details: details,
        raw: item
      };
    });

    const reviews = arrayify(raw.reviews).map(function (item, index) {
      return {
        id: String(item.review_id || item.id || index + 1),
        name: item.name || item.author || '고객 후기',
        age: item.age || item.age_group || '',
        region: item.region || item.location || '',
        title: item.title || item.headline || '',
        body: item.body || item.content || item.review || '',
        rating: Number(item.rating || item.score || 5),
        image: item.image || item.thumbnail || '',
        raw: item
      };
    });

    const targets = arrayify(raw.targets).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        title: item.title || item.name || '',
        body: item.body || item.description || item.content || '',
        icon: item.icon || '',
        raw: item
      };
    });

    const basicInfo = arrayify(raw.basic_info).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        title: item.title || item.name || '',
        body: item.body || item.description || item.content || '',
        image: item.image || item.thumbnail || '',
        raw: item
      };
    });

    const processSteps = arrayify(raw.process_steps).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        title: item.title || item.name || '',
        body: item.body || item.description || item.content || '',
        raw: item
      };
    });

    const cabins = arrayify(raw.cabins).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        title: item.title || item.name || '',
        price: toPrice_(item.price || item.amount || ''),
        body: item.body || item.description || item.content || '',
        image: item.image || item.thumbnail || '',
        raw: item
      };
    });

    const faqs = arrayify(raw.faqs).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        question: item.question || item.title || '',
        answer: item.answer || item.body || item.content || '',
        raw: item
      };
    });

    const trustPoints = arrayify(raw.trust_points).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        title: item.title || item.name || '',
        body: item.body || item.description || item.content || '',
        raw: item
      };
    });

    const contentLinks = arrayify(raw.content_links).map(function (item, index) {
      return {
        id: String(item.id || index + 1),
        title: item.title || item.name || '',
        url: item.url || item.link || '#',
        body: item.body || item.description || item.content || '',
        raw: item
      };
    });

    return {
      settings: settings,
      schedules: schedules,
      schedule_days: arrayify(raw.schedule_days),
      reviews: reviews,
      targets: targets,
      basic_info: basicInfo,
      process_steps: processSteps,
      cabins: cabins,
      faqs: faqs,
      trust_points: trustPoints,
      content_links: contentLinks
    };
  }

  function applySeo(settings) {
    const title = settings.page_title || settings.site_title || document.title || '';
    const description = settings.meta_description || settings.site_description || '';
    if (title) document.title = title;
    updateMetaByName_('description', description);
    updateMetaByProperty_('og:title', settings.og_title || title);
    updateMetaByProperty_('og:description', settings.og_description || description);
    updateMetaByProperty_('og:image', settings.og_image || settings.hero_image || '');
  }

  function applySettings(settings) {
    setTextById_('heroEyebrow', settings.hero_eyebrow || settings.hero_badge || '');
    setHtmlById_('heroTitle', lineBreakHtml_(settings.hero_title || '')); 
    setHtmlById_('heroDescription', lineBreakHtml_(settings.hero_description || ''));
    setTextById_('heroPrimaryCta', settings.hero_primary_cta || '일정 확인하기');
    setTextById_('heroSecondaryCta', settings.hero_secondary_cta || '상담 문의하기');
    setTextById_('journeyIntroTitle', settings.journey_intro_title || '크루즈 여행, 이렇게 진행됩니다');
    setHtmlById_('journeyIntroBody', lineBreakHtml_(settings.journey_intro_body || ''));
    setTextById_('cabinSectionTitle', settings.cabin_section_title || '객실 타입 안내');
    setTextById_('targetSectionTitle', settings.target_section_title || '이런 분들께 추천해요');
    setTextById_('scheduleSectionTitle', settings.schedule_section_title || '추천 일정');
    setTextById_('reviewSectionTitle', settings.review_section_title || '실제 후기');
    setTextById_('faqSectionTitle', settings.faq_section_title || '자주 묻는 질문');
    setTextById_('contactSectionTitle', settings.contact_section_title || '상담 문의');
    setTextById_('footerCompany', settings.footer_company || '');
    setTextById_('footerContact', settings.footer_contact || '');
    setTextById_('footerAddress', settings.footer_address || '');
  }

  function renderHeroStats(settings) {
    const container = document.getElementById('heroStats');
    if (!container) return;

    const items = [
      { label: settings.hero_stat1_label || '추천 일정', value: settings.hero_stat1_value || String((state.bootstrap.schedules || []).length || '-') },
      { label: settings.hero_stat2_label || '실제 후기', value: settings.hero_stat2_value || String((state.bootstrap.reviews || []).length || '-') },
      { label: settings.hero_stat3_label || '상담 진행', value: settings.hero_stat3_value || '1:1 안내' }
    ].filter(function (item) { return item.label || item.value; });

    container.innerHTML = items.map(function (item) {
      return [
        '<div class="hero-stat">',
        '  <strong>' + escapeHtml(item.value) + '</strong>',
        '  <span>' + escapeHtml(item.label) + '</span>',
        '</div>'
      ].join('');
    }).join('');
  }

  function renderJourneyIntro_(settings) {
    const container = document.getElementById('journeyIntroCards');
    if (!container) return;

    const cards = [
      { title: settings.journey_card1_title || '상담', body: settings.journey_card1_body || '희망 일정과 예산, 인원 기준으로 안내해드립니다.' },
      { title: settings.journey_card2_title || '선택', body: settings.journey_card2_body || '추천 일정 중 맞는 상품을 빠르게 비교합니다.' },
      { title: settings.journey_card3_title || '출발', body: settings.journey_card3_body || '확정 후 필요한 준비사항까지 함께 체크합니다.' }
    ];

    container.innerHTML = cards.map(function (card) {
      return [
        '<article class="journey-card">',
        '  <h3>' + escapeHtml(card.title) + '</h3>',
        '  <p>' + escapeHtml(card.body) + '</p>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderRealtimeSummary_(settings) {
    const container = document.getElementById('realtimeSummary');
    if (!container) return;

    const lines = splitDelimited_(settings.realtime_summary || settings.summary_notice || '');
    if (!lines.length) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = lines.map(function (line) {
      return '<li>' + escapeHtml(line) + '</li>';
    }).join('');
  }

  function renderCabins(cabins) {
    const container = document.getElementById('cabinGrid');
    if (!container) return;

    if (!cabins.length) {
      container.innerHTML = '<div class="schedule-empty">등록된 객실 정보가 없습니다.</div>';
      return;
    }

    container.innerHTML = cabins.map(function (item) {
      return [
        '<article class="cabin-card">',
        item.image ? '<div class="cabin-card__image"><img src="' + escapeAttribute(item.image) + '" alt="' + escapeAttribute(item.title) + '"></div>' : '',
        '  <div class="cabin-card__body">',
        '    <h3>' + escapeHtml(item.title) + '</h3>',
        item.price ? '    <strong>' + formatPrice_(item.price) + '</strong>' : '',
        item.body ? '    <p>' + escapeHtml(item.body) + '</p>' : '',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderTargets(targets) {
    const container = document.getElementById('targetGrid');
    if (!container) return;

    if (!targets.length) {
      container.innerHTML = '<div class="schedule-empty">추천 대상 정보가 없습니다.</div>';
      return;
    }

    container.innerHTML = targets.map(function (item) {
      return [
        '<article class="target-card">',
        '  <h3>' + escapeHtml(item.title) + '</h3>',
        '  <p>' + escapeHtml(item.body) + '</p>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderBasicInfoSection_(items) {
    const viewport = document.getElementById('basicInfoViewport');
    const dots = document.getElementById('basicInfoDots');
    if (!viewport || !dots) return;

    if (!items.length) {
      viewport.innerHTML = '<div class="schedule-empty">안내 정보가 없습니다.</div>';
      dots.innerHTML = '';
      return;
    }

    viewport.innerHTML = items.map(function (item) {
      return [
        '<article class="basicinfo-card">',
        item.image ? '<div class="basicinfo-card__image"><img src="' + escapeAttribute(item.image) + '" alt="' + escapeAttribute(item.title) + '"></div>' : '',
        '  <div class="basicinfo-card__body">',
        '    <h3>' + escapeHtml(item.title) + '</h3>',
        '    <p>' + escapeHtml(item.body) + '</p>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');

    dots.innerHTML = items.map(function (_, index) {
      return '<button type="button" class="slider-dot" data-basicinfo-dot="' + index + '"></button>';
    }).join('');

    setBasicInfoSliderState_(0);
    setupBasicInfoSlider_();
  }

  function renderProcess(steps) {
    const container = document.getElementById('processGrid');
    if (!container) return;

    if (!steps.length) {
      container.innerHTML = '<div class="schedule-empty">진행 단계 정보가 없습니다.</div>';
      return;
    }

    container.innerHTML = steps.map(function (item, index) {
      return [
        '<article class="process-card">',
        '  <span class="process-card__index">STEP ' + String(index + 1) + '</span>',
        '  <h3>' + escapeHtml(item.title) + '</h3>',
        '  <p>' + escapeHtml(item.body) + '</p>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderFilters() {
    if (!scheduleFilters) return;

    const allSchedules = state.bootstrap.schedules || [];
    const regions = dedupe_(allSchedules.reduce(function (acc, item) {
      return acc.concat(item.regions || []);
    }, [])).filter(Boolean);

    const buttons = [{ key: 'ALL', label: '전체' }].concat(regions.map(function (region) {
      return { key: region, label: region };
    }));

    scheduleFilters.innerHTML = buttons.map(function (item) {
      const active = item.key === state.activeRegion ? ' is-active' : '';
      return '<button type="button" class="filter-chip' + active + '" data-region="' + escapeAttribute(item.key) + '">' + escapeHtml(item.label) + '</button>';
    }).join('');
  }

  function getFilteredSchedules_() {
    const allSchedules = state.bootstrap.schedules || [];
    if (state.activeRegion === 'ALL') return allSchedules;
    return allSchedules.filter(function (item) {
      return (item.regions || []).indexOf(state.activeRegion) >= 0;
    });
  }

  function renderSchedules() {
    if (!scheduleGrid) return;

    const schedules = getFilteredSchedules_();
    if (!schedules.length) {
      scheduleGrid.innerHTML = '<div class="schedule-empty">표시할 일정이 없습니다.</div>';
      return;
    }

    scheduleGrid.innerHTML = schedules.map(function (item) {
      return buildScheduleCard_(item);
    }).join('');
  }

  function buildScheduleCard_(item) {
    const departureLabel = formatDateLabel_(item.departureDate);
    const returnLabel = formatDateLabel_(item.returnDate);
    const routeLabel = buildRouteLabel_(item);
    const priceLabel = firstAvailablePriceLabel_(item.pricing);

    return [
      '<article class="schedule-card" data-open-schedule="' + escapeAttribute(item.id) + '">',
      item.image ? '<div class="schedule-card__image"><img src="' + escapeAttribute(item.image) + '" alt="' + escapeAttribute(item.cruise) + '"></div>' : '',
      '  <div class="schedule-card__body">',
      item.status ? '    <span class="schedule-card__badge">' + escapeHtml(item.status) + '</span>' : '',
      '    <h3>' + escapeHtml(item.cruise) + '</h3>',
      departureLabel ? '    <p class="schedule-card__date">출발 ' + escapeHtml(departureLabel) + (returnLabel ? ' · 도착 ' + escapeHtml(returnLabel) : '') + '</p>' : '',
      routeLabel ? '    <p class="schedule-card__route">' + escapeHtml(routeLabel) + '</p>' : '',
      item.nights ? '    <p class="schedule-card__meta">' + escapeHtml(String(item.nights)) + '박</p>' : '',
      priceLabel ? '    <strong class="schedule-card__price">' + escapeHtml(priceLabel) + '</strong>' : '',
      '    <button type="button" class="button button--ghost" data-select-schedule="' + escapeAttribute(item.id) + '">이 일정 문의하기</button>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function openSchedule(scheduleId) {
    const schedule = (state.bootstrap.schedules || []).find(function (item) {
      return String(item.id) === String(scheduleId);
    });

    if (!schedule || !modal || !modalBody) return;

    modalBody.innerHTML = buildScheduleModal_(schedule);
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  function buildScheduleModal_(item) {
    const sections = [];
    if (item.highlights && item.highlights.length) {
      sections.push('<div class="schedule-detail__block"><h4>핵심 포인트</h4><ul>' + item.highlights.map(function (text) {
        return '<li>' + escapeHtml(text) + '</li>';
      }).join('') + '</ul></div>');
    }

    if (item.routePorts && item.routePorts.length) {
      sections.push('<div class="schedule-detail__block"><h4>일정</h4><ul>' + item.routePorts.map(function (text) {
        return '<li>' + escapeHtml(text) + '</li>';
      }).join('') + '</ul></div>');
    }

    if (item.details && item.details.length) {
      sections.push('<div class="schedule-detail__block"><h4>상세 안내</h4><ul>' + item.details.map(function (text) {
        return '<li>' + escapeHtml(text) + '</li>';
      }).join('') + '</ul></div>');
    }

    return [
      '<div class="schedule-detail">',
      '  <div class="schedule-detail__header">',
      '    <button type="button" class="modal-close" data-close-modal>닫기</button>',
      '    <h3>' + escapeHtml(item.cruise) + '</h3>',
      '    <p>' + escapeHtml(buildRouteLabel_(item)) + '</p>',
      '  </div>',
      '  <div class="schedule-detail__meta">',
      item.departureDate ? '<span>출발 ' + escapeHtml(formatDateLabel_(item.departureDate)) + '</span>' : '',
      item.returnDate ? '<span>도착 ' + escapeHtml(formatDateLabel_(item.returnDate)) + '</span>' : '',
      item.nights ? '<span>' + escapeHtml(String(item.nights)) + '박</span>' : '',
      '  </div>',
      sections.join(''),
      '  <div class="schedule-detail__footer">',
      '    <button type="button" class="button" data-select-schedule="' + escapeAttribute(item.id) + '">이 일정 바로 문의</button>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderReviews(reviews) {
    if (!reviewGrid || !reviewDots) return;

    if (!reviews.length) {
      reviewGrid.innerHTML = '<div class="schedule-empty">등록된 후기가 없습니다.</div>';
      reviewDots.innerHTML = '';
      return;
    }

    reviewGrid.innerHTML = reviews.map(function (item) {
      return [
        '<article class="review-card">',
        '  <div class="review-card__stars">' + '★'.repeat(Math.max(1, Math.min(5, Number(item.rating || 5)))) + '</div>',
        item.title ? '  <h3>' + escapeHtml(item.title) + '</h3>' : '',
        '  <p>' + escapeHtml(item.body) + '</p>',
        '  <footer>' + escapeHtml([item.name, item.age, item.region].filter(Boolean).join(' · ')) + '</footer>',
        '</article>'
      ].join('');
    }).join('');

    reviewDots.innerHTML = reviews.map(function (_, index) {
      return '<button type="button" class="slider-dot" data-review-dot="' + index + '"></button>';
    }).join('');
  }

  function renderReviewSummary_(reviews) {
    const el = document.getElementById('reviewSummary');
    if (!el) return;
    el.textContent = reviews.length ? ('실제 후기 ' + reviews.length + '건') : '';
  }

  function setupReviewSlider(total) {
    if (!reviewGrid || !reviewDots) return;
    const items = reviewGrid.querySelectorAll('.review-card');
    if (!items.length) return;

    const width = reviewViewport ? reviewViewport.clientWidth : 0;
    const perPage = width > 1024 ? 3 : width > 640 ? 2 : 1;
    const maxPage = Math.max(0, Math.ceil(total / perPage) - 1);
    state.reviewPage = Math.max(0, Math.min(state.reviewPage, maxPage));

    const offset = state.reviewPage * (100 / perPage);
    reviewGrid.style.transform = 'translateX(-' + offset + '%)';

    Array.prototype.forEach.call(reviewDots.querySelectorAll('[data-review-dot]'), function (button, index) {
      button.classList.toggle('is-active', index === state.reviewPage);
      button.hidden = index > maxPage;
    });
  }

  function moveReviews(direction) {
    const reviews = state.bootstrap.reviews || [];
    if (!reviews.length) return;

    const width = reviewViewport ? reviewViewport.clientWidth : 0;
    const perPage = width > 1024 ? 3 : width > 640 ? 2 : 1;
    const maxPage = Math.max(0, Math.ceil(reviews.length / perPage) - 1);

    if (direction === 'next') {
      state.reviewPage = state.reviewPage >= maxPage ? 0 : state.reviewPage + 1;
    } else {
      state.reviewPage = state.reviewPage <= 0 ? maxPage : state.reviewPage - 1;
    }
    setupReviewSlider(reviews.length);
  }

  function startReviewAuto(total) {
    stopReviewAuto();
    if (!total || total <= 1) return;
    reviewAutoTimer = window.setInterval(function () {
      moveReviews('next');
    }, Number(config.reviewAutoInterval || 5000));
  }

  function stopReviewAuto() {
    if (reviewAutoTimer) {
      window.clearInterval(reviewAutoTimer);
      reviewAutoTimer = null;
    }
  }

  function fillScheduleSelect(schedules) {
    const select = document.getElementById('interestScheduleSelect');
    if (!select) return;

    const current = select.value;
    const options = ['<option value="">관심 일정을 선택해주세요</option>'].concat(schedules.map(function (item) {
      const label = [item.cruise, formatDateLabel_(item.departureDate)].filter(Boolean).join(' / ');
      return '<option value="' + escapeAttribute(item.id) + '">' + escapeHtml(label) + '</option>';
    }));

    select.innerHTML = options.join('');
    if (current) select.value = current;
  }

  function renderFaqs(faqs) {
    const container = document.getElementById('faqList');
    if (!container) return;

    if (!faqs.length) {
      container.innerHTML = '<div class="schedule-empty">FAQ 정보가 없습니다.</div>';
      return;
    }

    container.innerHTML = faqs.map(function (item) {
      return [
        '<details class="faq-item">',
        '  <summary>' + escapeHtml(item.question) + '</summary>',
        '  <p>' + escapeHtml(item.answer) + '</p>',
        '</details>'
      ].join('');
    }).join('');
  }

  function renderTrustPoints(items) {
    const container = document.getElementById('trustPointGrid');
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = items.map(function (item) {
      return [
        '<article class="trust-card">',
        '  <h3>' + escapeHtml(item.title) + '</h3>',
        '  <p>' + escapeHtml(item.body) + '</p>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderContentLinks(items) {
    const container = document.getElementById('contentLinkGrid');
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = items.map(function (item) {
      return [
        '<a class="content-link-card" href="' + escapeAttribute(item.url || '#') + '" target="_blank" rel="noopener noreferrer">',
        '  <h3>' + escapeHtml(item.title) + '</h3>',
        item.body ? '  <p>' + escapeHtml(item.body) + '</p>' : '',
        '</a>'
      ].join('');
    }).join('');
  }

  function highlightExternalLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="http"]'), function (link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function setTrackingFields() {
    setHiddenInputValue_('utmSourceInput', getQueryParam_('utm_source'));
    setHiddenInputValue_('utmMediumInput', getQueryParam_('utm_medium'));
    setHiddenInputValue_('utmCampaignInput', getQueryParam_('utm_campaign'));
    setHiddenInputValue_('referrerInput', document.referrer || '');
    setHiddenInputValue_('pageUrlInput', window.location.href || '');
  }

  function setSubmitState(isSubmitting) {
    const submitButton = document.getElementById('contactSubmitButton');
    if (!submitButton) return;
    submitButton.disabled = !!isSubmitting;
    submitButton.classList.toggle('is-loading', !!isSubmitting);
  }

  function updateFormResult(message, type) {
    if (!formResult) return;
    formResult.textContent = message || '';
    formResult.className = 'form-result';
    if (type) formResult.classList.add('is-' + type);
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function moveBasicInfoSlider_(direction) {
    const items = state.bootstrap.basic_info || [];
    if (!items.length) return;
    const current = Number(document.body.getAttribute('data-basicinfo-page') || 0);
    const max = Math.max(0, items.length - 1);
    const next = direction === 'next'
      ? (current >= max ? 0 : current + 1)
      : (current <= 0 ? max : current - 1);
    setBasicInfoSliderState_(next);
    setupBasicInfoSlider_();
  }

  function setBasicInfoSliderState_(page) {
    document.body.setAttribute('data-basicinfo-page', String(page || 0));
    const dots = document.getElementById('basicInfoDots');
    if (!dots) return;
    Array.prototype.forEach.call(dots.querySelectorAll('[data-basicinfo-dot]'), function (button, index) {
      button.classList.toggle('is-active', index === Number(page || 0));
    });
  }

  function setupBasicInfoSlider_() {
    const viewport = document.getElementById('basicInfoViewport');
    if (!viewport) return;
    const page = Number(document.body.getAttribute('data-basicinfo-page') || 0);
    viewport.style.transform = 'translateX(-' + (page * 100) + '%)';
  }

  function alignContentButtons_() {
    const buttons = document.querySelectorAll('.content-link-card');
    if (!buttons.length) return;
    let maxHeight = 0;
    Array.prototype.forEach.call(buttons, function (button) {
      button.style.minHeight = '0px';
    });
    Array.prototype.forEach.call(buttons, function (button) {
      maxHeight = Math.max(maxHeight, button.offsetHeight || 0);
    });
    if (!maxHeight) return;
    Array.prototype.forEach.call(buttons, function (button) {
      button.style.minHeight = maxHeight + 'px';
    });
  }

  function firstAvailablePriceLabel_(pricing) {
    if (!pricing) return '';
    if (pricing.inside) return '인사이드 ' + formatPrice_(pricing.inside) + '부터';
    if (pricing.oceanview) return '오션뷰 ' + formatPrice_(pricing.oceanview) + '부터';
    if (pricing.balcony) return '발코니 ' + formatPrice_(pricing.balcony) + '부터';
    if (pricing.suite) return '스위트 ' + formatPrice_(pricing.suite) + '부터';
    return '';
  }

  function buildRouteLabel_(item) {
    const route = item.routePorts && item.routePorts.length
      ? item.routePorts.join(' · ')
      : item.itineraryText || [item.embarkPort, item.disembarkPort].filter(Boolean).join(' → ');
    return route;
  }

  function formatDateLabel_(value) {
    if (!value) return '';
    const str = String(value).trim();
    if (!str) return '';
    const date = new Date(str);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return year + '.' + month + '.' + day;
    }
    return str;
  }

  function toPrice_(value) {
    if (value === null || value === undefined || value === '') return 0;
    const numeric = Number(String(value).replace(/[^\d.-]/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  }

  function formatPrice_(value) {
    const number = Number(value || 0);
    if (!number) return '';
    return number.toLocaleString('ko-KR') + '원';
  }

  function lineBreakHtml_(value) {
    return escapeHtml(String(value || '')).replace(/\n/g, '<br>');
  }

  function splitDelimited_(value) {
    return String(value || '')
      .split(/\r?\n|\||,|·/)
      .map(function (item) { return String(item || '').trim(); })
      .filter(Boolean);
  }

  function dedupe_(list) {
    return Array.from(new Set(arrayify(list)));
  }

  function arrayify(value) {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    return [value];
  }

  function normalizeKey_(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');
  }

  function getQueryParam_(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || '';
  }

  function setHiddenInputValue_(id, value) {
    const input = document.getElementById(id);
    if (!input) return;
    input.value = value || '';
  }

  function setTextById_(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value || '';
  }

  function setHtmlById_(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = value || '';
  }

  function updateMetaByName_(name, content) {
    if (!content) return;
    let tag = document.querySelector('meta[name="' + name + '"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  function updateMetaByProperty_(property, content) {
    if (!content) return;
    let tag = document.querySelector('meta[property="' + property + '"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }
})();

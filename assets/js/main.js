
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
    reviewPage: 0,
    debugLogs: []
  };

  init();

  async function init() {
    bindStaticEvents();
    setTrackingFields();
    initGlobalDebugHandlers_();
    ensureAddonStyles_();
    ensureDebugPanel_();

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
        logDebug_('filter.click', { region: state.activeRegion });
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
        logDebug_('schedule.select', { scheduleId: scheduleId || '' });
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

      const openCard = event.target.closest('[data-open-schedule]');
      if (openCard) {
        const scheduleId = openCard.getAttribute('data-open-schedule');
        openSchedule(scheduleId);
        return;
      }

      const faqSummary = event.target.closest('.sheet-extra-faq summary');
      if (faqSummary) {
        return;
      }

      if (event.target.closest('[data-close-modal]')) {
        closeModal();
        return;
      }
    });

    window.addEventListener('resize', function () {
      setupReviewSlider((state.bootstrap.reviews || []).length);
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
        logDebug_('form.result.success', { message: data.message || '' });
      } else {
        updateFormResult(data.message || '문의 접수 중 문제가 발생했습니다. 다시 시도해주세요.', 'error');
        logDebug_('form.result.error', { message: data.message || '' });
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
        logDebug_('form.submit', {
          schedule_id: String(formData.get('interest_schedule_id') || ''),
          people_count: String(formData.get('people_count') || ''),
          has_region_detail: !!regionDetail,
          has_travel_ready_status: !!travelReadyStatus
        });
        form.submit();

        window.setTimeout(function () {
          if (formResult && formResult.classList.contains('is-pending')) {
            updateFormResult('문의 접수는 진행 중입니다. 잠시 시간이 걸릴 수 있습니다.', 'pending');
          }
        }, config.submitTimeout || 15000);
      });
    }
  }

  function initGlobalDebugHandlers_() {
    window.addEventListener('error', function (event) {
      logDebug_('window.error', {
        message: event && event.message ? event.message : '',
        source: event && event.filename ? event.filename : '',
        line: event && event.lineno ? event.lineno : '',
        col: event && event.colno ? event.colno : ''
      });
    });

    window.addEventListener('unhandledrejection', function (event) {
      const reason = event ? event.reason : '';
      logDebug_('window.unhandledrejection', {
        reason: reason && reason.message ? reason.message : String(reason || '')
      });
    });
  }

  async function getBootstrapWithFallback() {
    try {
      const apiPayload = await loadBootstrapFromApi();
      return normalizeData(apiPayload);
    } catch (error) {
      logDebug_('bootstrap.fallback', {
        reason: error && error.message ? error.message : String(error || '')
      });
      return normalizeData(window.MOCK_BOOTSTRAP_DATA || {});
    }
  }

  function loadBootstrapFromApi() {
    return new Promise(function (resolve, reject) {
      const callbackName = '__cruiseJsonpCallback_' + Date.now();
      const params = new URLSearchParams(window.location.search);
      params.set('action', 'bootstrap');
      params.set('callback', callbackName);

      const script = document.createElement('script');
      const requestUrl = config.apiUrl + '?' + params.toString();
      let finished = false;
      let timeoutId = null;

      logDebug_('bootstrap.request', { url: requestUrl });

      window[callbackName] = function (payload) {
        if (finished) return;
        finished = true;
        cleanup(true);
        logDebug_('bootstrap.success', getBootstrapDebugSummary_(payload));
        resolve(payload);
      };

      script.onerror = function () {
        if (finished) return;
        finished = true;
        cleanup(false);
        logDebug_('bootstrap.error', { url: requestUrl });
        reject(new Error('bootstrap-load-failed'));
      };

      timeoutId = window.setTimeout(function () {
        if (finished) return;
        finished = true;
        cleanup(false);
        logDebug_('bootstrap.timeout', { url: requestUrl });
        reject(new Error('bootstrap-timeout'));
      }, 8000);

      function cleanup(success) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        if (success) {
          window[callbackName] = function () {
            logDebug_('bootstrap.late_callback', { callback: callbackName });
          };
          setTimeout(function () {
            try { delete window[callbackName]; } catch (e) {}
          }, 30000);
        } else {
          try { delete window[callbackName]; } catch (e) {}
        }
      }

      script.src = requestUrl;
      script.async = true;
      document.body.appendChild(script);
    });
  }

  function hydrate(data) {
    state.bootstrap = normalizeData(data);
    logDebug_('hydrate.start', getBootstrapDebugSummary_(state.bootstrap));
    renderSettings();
    renderFilters();
    startHeroMotion();
    renderSchedules();
    renderReviews();
    populateFormSelects();
    renderExtraSections_();
    logDebug_('hydrate.done', { ok: true });
  }

  function normalizeData(data) {
    const safe = data || {};
    const fallback = window.MOCK_BOOTSTRAP_DATA || {};

    safe.settings = safe.settings || fallback.settings || {};
    safe.schedules = ensureArray_(safe.schedules, fallback.schedules);
    safe.schedule_days = ensureArray_(safe.schedule_days, fallback.schedule_days);
    safe.reviews = ensureArray_(safe.reviews, fallback.reviews);
    safe.targets = ensureArray_(safe.targets, fallback.targets);
    safe.basic_info = ensureArray_(safe.basic_info, fallback.basic_info);
    safe.process_steps = ensureArray_(safe.process_steps, fallback.process_steps);
    safe.cabins = ensureArray_(safe.cabins, fallback.cabins);
    safe.faqs = ensureArray_(safe.faqs, fallback.faqs);
    safe.trust_points = ensureArray_(safe.trust_points, fallback.trust_points);
    safe.content_links = ensureArray_(safe.content_links, fallback.content_links);

    return safe;
  }

  function ensureArray_(primary, fallback) {
    if (Array.isArray(primary)) return primary;
    if (Array.isArray(fallback)) return fallback;
    return [];
  }

  function getBootstrapDebugSummary_(payload) {
    const safe = payload || {};
    return {
      schedules: Array.isArray(safe.schedules) ? safe.schedules.length : 0,
      schedule_days: Array.isArray(safe.schedule_days) ? safe.schedule_days.length : 0,
      reviews: Array.isArray(safe.reviews) ? safe.reviews.length : 0,
      targets: Array.isArray(safe.targets) ? safe.targets.length : 0,
      basic_info: Array.isArray(safe.basic_info) ? safe.basic_info.length : 0,
      process_steps: Array.isArray(safe.process_steps) ? safe.process_steps.length : 0,
      cabins: Array.isArray(safe.cabins) ? safe.cabins.length : 0,
      faqs: Array.isArray(safe.faqs) ? safe.faqs.length : 0,
      trust_points: Array.isArray(safe.trust_points) ? safe.trust_points.length : 0,
      content_links: Array.isArray(safe.content_links) ? safe.content_links.length : 0
    };
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
      settings.hero_subtitle || '마음에 드는 일정이 있으면 확인 후 바로 문의해주세요.'
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

    logDebug_('renderSchedules', {
      activeRegion: state.activeRegion,
      visibleSchedules: schedules.length
    });

    if (!schedules.length) {
      scheduleGrid.innerHTML = '<div class="schedule-empty">현재 준비된 일정이 없습니다. 일정 문의를 남겨주시면 가능한 항차를 안내해드립니다.</div>';
      return;
    }

    scheduleGrid.innerHTML = schedules.map(buildScheduleCard).join('');
  }

  function buildScheduleCard(schedule) {
    const imageUrl = schedule.thumbnail_url || schedule.schedule_image_url || '';
    const homePort = getHomePort(schedule.schedule_id);
    const monthLabel = getMonthLabel(schedule.departure_date);

    return [
      '<article class="schedule-card" data-open-schedule="', escapeAttribute(schedule.schedule_id), '">',
        '<div class="schedule-visual">',
          imageUrl ? '<img src="' + escapeAttribute(imageUrl) + '" alt="' + escapeAttribute(schedule.title || '') + '" />' : '',
          '<div class="schedule-visual-inner">',
            '<div class="schedule-badges">',
              '<span class="schedule-badge">', escapeHtml(schedule.region || '크루즈'), '</span>',
              '<span class="schedule-badge schedule-badge-month">', escapeHtml(monthLabel), ' 출발</span>',
            '</div>',
            '<h3 class="schedule-title">', highlightMonthText(schedule.title || '크루즈 일정'), '</h3>',
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

  function getMonthLabel(dateValue) {
    const text = String(dateValue || '').trim();
    const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return '';
    return String(Number(match[2])) + '월';
  }

  function highlightMonthText(text) {
    return escapeHtml(String(text || '')).replace(/(\d{1,2}월)/g, '<span class="schedule-month-accent">$1</span>');
  }

  function renderReviews() {
    if (!reviewGrid) return;
    const reviews = state.bootstrap.reviews || [];
    if (!reviews.length) {
      reviewGrid.innerHTML = '<div class="schedule-empty">준비 중인 후기가 곧 업데이트됩니다.</div>';
      if (reviewDots) reviewDots.innerHTML = '';
      logDebug_('renderReviews', { reviews: 0 });
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

    logDebug_('renderReviews', { reviews: reviews.length });
    setupReviewSlider(reviews.length);
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

    logDebug_('openSchedule', {
      scheduleId: scheduleId,
      days: days.length,
      routeStops: routeStops.length
    });

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

    if (modal) modal.setAttribute('aria-hidden', 'false');
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
    const overnight = /overnight|정박/i.test(String(day.description || ''))
      ? '<span class="overnight-badge">정박 (Overnight)</span>'
      : '';

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

  let reviewAutoTimer = null;

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
    if (direction === 'prev') state.reviewPage = state.reviewPage <= 0 ? maxPage : state.reviewPage - 1;
    else state.reviewPage = state.reviewPage >= maxPage ? 0 : state.reviewPage + 1;
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
        return (
          '<option value="' +
          escapeAttribute(schedule.schedule_id) +
          '">' +
          escapeHtml(schedule.title || schedule.schedule_id) +
          '</option>'
        );
      }).join('');
  }

  function getRouteStops(scheduleId, preloadedDays) {
    const schedule = state.bootstrap.schedules.find(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    }) || {};

    if (schedule.route_ports) {
      return String(schedule.route_ports).split('|').map(cleanStop).filter(Boolean);
    }

    const days = Array.isArray(preloadedDays) ? preloadedDays : state.bootstrap.schedule_days.filter(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    });

    const stops = days.map(function (day) {
      return cleanStop(day.port_name || day.city || '');
    }).filter(Boolean).filter(function (stop) {
      const lower = String(stop).toLowerCase();
      return lower !== '해상일' && lower !== 'sea day' && lower !== '인천 출발' && lower !== '부산 출발';
    });

    return Array.from(new Set(stops));
  }

  function cleanStop(value) {
    return String(value || '').replace(/\s+/g, ' ').replace(/\(.*?\)/g, '').trim();
  }

  function renderExtraSections_() {
    ensureExtraSectionsScaffold_();
    renderBasicInfo_();
    renderTargets_();
    renderProcessSteps_();
    renderCabins_();
    renderFaqs_();
    renderTrustPoints_();
    renderContentLinks_();
  }

  function ensureExtraSectionsScaffold_() {
    if (!mainContent) return;

    ensureSection_('basicInfoSection', [
      '<section class="sheet-extra-section" id="basicInfoSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">기초안내</span>',
            '<h2 class="sheet-extra-title">크루즈는 어렵지 않아요</h2>',
          '</div>',
          '<div id="basicInfoGrid" class="sheet-extra-basic-grid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection_('targetsSection', [
      '<section class="sheet-extra-section" id="targetsSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">이용대상자</span>',
            '<h2 class="sheet-extra-title">이런 분들께 잘 맞아요</h2>',
          '</div>',
          '<div id="targetsGrid" class="sheet-extra-grid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection_('processSection', [
      '<section class="sheet-extra-section" id="processSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">예약과정</span>',
            '<h2 class="sheet-extra-title">상담부터 탑승까지</h2>',
          '</div>',
          '<div id="processGrid" class="sheet-extra-grid sheet-extra-grid-steps"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection_('cabinsSection', [
      '<section class="sheet-extra-section" id="cabinsSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">선실비교</span>',
            '<h2 class="sheet-extra-title">선실 타입 비교</h2>',
          '</div>',
          '<div id="cabinsGrid" class="sheet-extra-grid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection_('trustSection', [
      '<section class="sheet-extra-section" id="trustSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">신뢰요소</span>',
            '<h2 class="sheet-extra-title">왜 이 구조가 편한지</h2>',
          '</div>',
          '<div id="trustGrid" class="sheet-extra-grid"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection_('faqSection', [
      '<section class="sheet-extra-section" id="faqSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">FAQ</span>',
            '<h2 class="sheet-extra-title">자주 묻는 질문</h2>',
          '</div>',
          '<div id="faqList" class="sheet-extra-faq-list"></div>',
        '</div>',
      '</section>'
    ].join(''));

    ensureSection_('contentSection', [
      '<section class="sheet-extra-section" id="contentSection">',
        '<div class="sheet-extra-wrap">',
          '<div class="sheet-extra-head">',
            '<span class="sheet-extra-label">콘텐츠연결</span>',
            '<h2 class="sheet-extra-title">함께 보면 좋은 정보</h2>',
          '</div>',
          '<div id="contentGrid" class="sheet-extra-grid"></div>',
        '</div>',
      '</section>'
    ].join(''));
  }

  function ensureSection_(id, html) {
    if (!mainContent) return;
    if (document.getElementById(id)) return;
    const debugPanel = document.getElementById('sheetDebugPanel');
    if (debugPanel && debugPanel.parentNode === mainContent) {
      debugPanel.insertAdjacentHTML('beforebegin', html);
    } else {
      mainContent.insertAdjacentHTML('beforeend', html);
    }
  }

  function renderBasicInfo_() {
    const section = document.getElementById('basicInfoSection');
    const grid = document.getElementById('basicInfoGrid');
    const items = state.bootstrap.basic_info || [];
    if (!section || !grid) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderBasicInfo', { items: 0 });
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      const points = [item.point_1, item.point_2, item.point_3].filter(Boolean);
      return [
        '<article class="sheet-extra-card sheet-extra-card-basic">',
          '<div class="sheet-extra-card-copy">',
            item.title ? '<h3>' + escapeHtml(item.title) + '</h3>' : '',
            item.subtitle ? '<p class="sheet-extra-muted">' + escapeHtml(item.subtitle) + '</p>' : '',
            item.body ? '<p>' + escapeHtml(item.body) + '</p>' : '',
            points.length ? '<ul class="sheet-extra-points">' + points.map(function (point) {
              return '<li>' + escapeHtml(point) + '</li>';
            }).join('') + '</ul>' : '',
          '</div>',
          item.image_url ? '<div class="sheet-extra-media"><img src="' + escapeAttribute(item.image_url) + '" alt="' + escapeAttribute(item.title || '') + '" /></div>' : '',
        '</article>'
      ].join('');
    }).join('');

    logDebug_('renderBasicInfo', { items: items.length });
  }

  function renderTargets_() {
    const section = document.getElementById('targetsSection');
    const grid = document.getElementById('targetsGrid');
    const items = state.bootstrap.targets || [];
    if (!section || !grid) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderTargets', { items: 0 });
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      return [
        '<article class="sheet-extra-card">',
          item.image_url ? '<div class="sheet-extra-media"><img src="' + escapeAttribute(item.image_url) + '" alt="' + escapeAttribute(item.title || '') + '" /></div>' : '',
          '<h3>' + escapeHtml(item.title || '') + '</h3>',
          item.subtitle ? '<p class="sheet-extra-muted">' + escapeHtml(item.subtitle) + '</p>' : '',
          item.description ? '<p>' + escapeHtml(item.description) + '</p>' : '',
          [item.point_1, item.point_2].filter(Boolean).length ? '<ul class="sheet-extra-points">' + [item.point_1, item.point_2].filter(Boolean).map(function (point) {
            return '<li>' + escapeHtml(point) + '</li>';
          }).join('') + '</ul>' : '',
          item.linked_schedule_id ? '<div class="sheet-extra-action"><a href="#contact" class="btn" data-select-schedule="' + escapeAttribute(item.linked_schedule_id) + '">' + escapeHtml(item.cta_text || '상담 요청') + '</a></div>' : '',
        '</article>'
      ].join('');
    }).join('');

    logDebug_('renderTargets', { items: items.length });
  }

  function renderProcessSteps_() {
    const section = document.getElementById('processSection');
    const grid = document.getElementById('processGrid');
    const items = state.bootstrap.process_steps || [];
    if (!section || !grid) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderProcessSteps', { items: 0 });
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item, index) {
      return [
        '<article class="sheet-extra-card sheet-extra-step-card">',
          '<span class="sheet-extra-step-no">STEP ' + (index + 1) + '</span>',
          '<h3>' + escapeHtml(item.step_title || '') + '</h3>',
          item.step_desc ? '<p>' + escapeHtml(item.step_desc) + '</p>' : '',
          item.highlight_text ? '<div class="sheet-extra-highlight">' + escapeHtml(item.highlight_text) + '</div>' : '',
        '</article>'
      ].join('');
    }).join('');

    logDebug_('renderProcessSteps', { items: items.length });
  }

  function renderCabins_() {
    const section = document.getElementById('cabinsSection');
    const grid = document.getElementById('cabinsGrid');
    const items = state.bootstrap.cabins || [];
    if (!section || !grid) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderCabins', { items: 0 });
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      return [
        '<article class="sheet-extra-card">',
          item.image_url ? '<div class="sheet-extra-media"><img src="' + escapeAttribute(item.image_url) + '" alt="' + escapeAttribute(item.title || '') + '" /></div>' : '',
          item.cabin_type ? '<div class="sheet-extra-chip">' + escapeHtml(item.cabin_type) + '</div>' : '',
          '<h3>' + escapeHtml(item.title || '') + '</h3>',
          item.summary ? '<p>' + escapeHtml(item.summary) + '</p>' : '',
          [item.best_for, item.point_1, item.point_2].filter(Boolean).length ? '<ul class="sheet-extra-points">' + [item.best_for, item.point_1, item.point_2].filter(Boolean).map(function (point) {
            return '<li>' + escapeHtml(point) + '</li>';
          }).join('') + '</ul>' : '',
          (item.badge_1 || item.badge_2) ? '<div class="sheet-extra-tags">' + [item.badge_1, item.badge_2].filter(Boolean).map(function (badge) {
            return '<span>' + escapeHtml(badge) + '</span>';
          }).join('') + '</div>' : '',
        '</article>'
      ].join('');
    }).join('');

    logDebug_('renderCabins', { items: items.length });
  }

  function renderTrustPoints_() {
    const section = document.getElementById('trustSection');
    const grid = document.getElementById('trustGrid');
    const items = state.bootstrap.trust_points || [];
    if (!section || !grid) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderTrustPoints', { items: 0 });
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      return [
        '<article class="sheet-extra-card">',
          item.badge_text ? '<div class="sheet-extra-chip">' + escapeHtml(item.badge_text) + '</div>' : '',
          '<h3>' + escapeHtml(item.title || '') + '</h3>',
          item.description ? '<p>' + escapeHtml(item.description) + '</p>' : '',
        '</article>'
      ].join('');
    }).join('');

    logDebug_('renderTrustPoints', { items: items.length });
  }

  function renderFaqs_() {
    const section = document.getElementById('faqSection');
    const list = document.getElementById('faqList');
    const items = state.bootstrap.faqs || [];
    if (!section || !list) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderFaqs', { items: 0 });
      return;
    }

    section.style.display = '';
    list.innerHTML = items.map(function (item) {
      return [
        '<details class="sheet-extra-faq">',
          '<summary>' + escapeHtml(item.question || '') + '</summary>',
          '<div class="sheet-extra-faq-body">',
            item.category ? '<div class="sheet-extra-chip">' + escapeHtml(item.category) + '</div>' : '',
            '<p>' + escapeHtml(item.answer || '') + '</p>',
          '</div>',
        '</details>'
      ].join('');
    }).join('');

    logDebug_('renderFaqs', { items: items.length });
  }

  function renderContentLinks_() {
    const section = document.getElementById('contentSection');
    const grid = document.getElementById('contentGrid');
    const items = state.bootstrap.content_links || [];
    if (!section || !grid) return;
    if (!items.length) {
      section.style.display = 'none';
      logDebug_('renderContentLinks', { items: 0 });
      return;
    }

    section.style.display = '';
    grid.innerHTML = items.map(function (item) {
      const linkUrl = String(item.link_url || '').trim();
      return [
        '<article class="sheet-extra-card">',
          item.thumbnail_url ? '<div class="sheet-extra-media"><img src="' + escapeAttribute(item.thumbnail_url) + '" alt="' + escapeAttribute(item.title || '') + '" /></div>' : '',
          item.category ? '<div class="sheet-extra-chip">' + escapeHtml(item.category) + '</div>' : '',
          '<h3>' + escapeHtml(item.title || '') + '</h3>',
          item.summary ? '<p>' + escapeHtml(item.summary) + '</p>' : '',
          '<div class="sheet-extra-action">',
            item.tag_text ? '<span class="sheet-extra-inline-tag">' + escapeHtml(item.tag_text) + '</span>' : '<span></span>',
            linkUrl ? '<a href="' + escapeAttribute(linkUrl) + '" class="btn" target="_blank" rel="noopener">자세히 보기</a>' : '',
          '</div>',
        '</article>'
      ].join('');
    }).join('');

    logDebug_('renderContentLinks', { items: items.length });
  }

  function ensureAddonStyles_() {
    if (document.getElementById('sheetAddonStyle')) return;

    const style = document.createElement('style');
    style.id = 'sheetAddonStyle';
    style.textContent = [
      '.schedule-month-accent{color:#2f6df6;font-weight:800;}',
      '.schedule-badge-month{font-weight:800;}',
      '.sheet-extra-section{padding:40px 0 10px;}',
      '.sheet-extra-wrap{width:min(1200px,calc(100% - 40px));margin:0 auto;}',
      '.sheet-extra-head{margin:0 0 18px;}',
      '.sheet-extra-label{display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;background:#eef4ff;color:#2f6df6;font-weight:800;font-size:12px;letter-spacing:.02em;}',
      '.sheet-extra-title{margin:14px 0 0;font-size:34px;line-height:1.2;color:#0e1b39;}',
      '.sheet-extra-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;}',
      '.sheet-extra-grid-steps{grid-template-columns:repeat(4,minmax(0,1fr));}',
      '.sheet-extra-basic-grid{display:grid;grid-template-columns:1fr;gap:22px;}',
      '.sheet-extra-card{background:#fff;border:1px solid #e8edf6;border-radius:28px;padding:24px;box-shadow:0 10px 30px rgba(17,34,68,.05);}',
      '.sheet-extra-card-basic{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(240px,.8fr);gap:24px;align-items:center;}',
      '.sheet-extra-card h3{margin:0 0 10px;font-size:24px;line-height:1.35;color:#0e1b39;}',
      '.sheet-extra-card p{margin:0;color:#5a6a85;line-height:1.7;}',
      '.sheet-extra-muted{margin-bottom:10px !important;}',
      '.sheet-extra-media{overflow:hidden;border-radius:22px;background:#f4f7fb;}',
      '.sheet-extra-media img{display:block;width:100%;height:auto;}',
      '.sheet-extra-points{margin:14px 0 0;padding-left:18px;color:#2d3d58;line-height:1.7;}',
      '.sheet-extra-points li+li{margin-top:6px;}',
      '.sheet-extra-action{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px;flex-wrap:wrap;}',
      '.sheet-extra-chip{display:inline-flex;align-items:center;justify-content:center;padding:6px 12px;border-radius:999px;background:#f1f5ff;color:#2f6df6;font-weight:800;font-size:12px;margin-bottom:10px;}',
      '.sheet-extra-inline-tag{display:inline-flex;align-items:center;justify-content:center;padding:6px 12px;border-radius:999px;background:#f6f7fb;color:#55637e;font-weight:700;font-size:12px;}',
      '.sheet-extra-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}',
      '.sheet-extra-tags span{display:inline-flex;align-items:center;justify-content:center;padding:6px 12px;border-radius:999px;background:#f6f7fb;color:#55637e;font-weight:700;font-size:12px;}',
      '.sheet-extra-step-no{display:inline-flex;margin-bottom:10px;font-size:12px;font-weight:800;color:#2f6df6;}',
      '.sheet-extra-highlight{margin-top:12px;color:#2f6df6;font-weight:800;}',
      '.sheet-extra-faq-list{display:grid;gap:14px;}',
      '.sheet-extra-faq{background:#fff;border:1px solid #e8edf6;border-radius:24px;overflow:hidden;}',
      '.sheet-extra-faq summary{cursor:pointer;list-style:none;padding:20px 22px;font-size:18px;font-weight:800;color:#0e1b39;}',
      '.sheet-extra-faq summary::-webkit-details-marker{display:none;}',
      '.sheet-extra-faq-body{padding:0 22px 20px;}',
      '.sheet-debug-panel{width:min(1200px,calc(100% - 40px));margin:28px auto 40px;background:#0f172a;color:#d7e3ff;border-radius:20px;padding:18px 20px;box-sizing:border-box;}',
      '.sheet-debug-title{font-size:14px;font-weight:800;margin:0 0 10px;color:#fff;}',
      '.sheet-debug-list{display:grid;gap:8px;max-height:280px;overflow:auto;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:1.5;}',
      '.sheet-debug-item{padding:8px 10px;border-radius:12px;background:rgba(255,255,255,.06);word-break:break-word;}',
      '@media (max-width:960px){.sheet-extra-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.sheet-extra-grid-steps{grid-template-columns:repeat(2,minmax(0,1fr));}.sheet-extra-card-basic{grid-template-columns:1fr;}}',
      '@media (max-width:720px){.sheet-extra-wrap,.sheet-debug-panel{width:min(100%,calc(100% - 24px));}.sheet-extra-title{font-size:28px;}.sheet-extra-grid,.sheet-extra-grid-steps{grid-template-columns:1fr;}.sheet-extra-card{padding:20px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureDebugPanel_() {
    if (document.getElementById('sheetDebugPanel')) return;

    const panelHtml = [
      '<section class="sheet-debug-panel" id="sheetDebugPanel">',
        '<h3 class="sheet-debug-title">DEBUG</h3>',
        '<div class="sheet-debug-list" id="sheetDebugList"></div>',
      '</section>'
    ].join('');

    if (mainContent) {
      mainContent.insertAdjacentHTML('beforeend', panelHtml);
    } else {
      document.body.insertAdjacentHTML('beforeend', panelHtml);
    }
  }

  function logDebug_(label, payload) {
    const line = {
      time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
      label: label,
      payload: payload || {}
    };

    state.debugLogs.unshift(line);
    if (state.debugLogs.length > 30) {
      state.debugLogs = state.debugLogs.slice(0, 30);
    }

    try {
      console.debug('[CRUISE_DEBUG]', label, payload || {});
    } catch (e) {}

    renderDebugPanel_();
  }

  function renderDebugPanel_() {
    const list = document.getElementById('sheetDebugList');
    if (!list) return;
    list.innerHTML = state.debugLogs.map(function (item) {
      return '<div class="sheet-debug-item">[' + escapeHtml(item.time) + '] ' + escapeHtml(item.label) + ' ' + escapeHtml(JSON.stringify(item.payload || {})) + '</div>';
    }).join('');
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
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setText(id, value, mode) {
    const element = document.getElementById(id);
    if (!element || typeof value === 'undefined' || value === null) return;
    if (mode === 'value') element.value = value;
    else element.textContent = value;
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

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function convertLineBreaks(value) {
    return String(value || '').replace(/\n/g, '<br>');
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

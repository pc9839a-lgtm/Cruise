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
      settings: {}, schedules: [], schedule_days: [], reviews: [],
      targets: [], basic_info: [], process_steps: [], cabins: [],
      faqs: [], trust_points: [], content_links: []
    },
    activeRegion: 'ALL',
    reviewPage: 0,
    basicInfoPage: 0,
    debugLogs: []
  };

  let reviewAutoTimer = null;
  let basicInfoAutoTimer = null;

  init();

  async function init() {
    bindStaticEvents();
    setTrackingFields();
    initGlobalDebugHandlers();
    ensureDebugPanel();

    const payload = config.useMockOnly
      ? normalizeData(window.MOCK_BOOTSTRAP_DATA || {})
      : await getBootstrapWithFallback();

    hydrate(payload);
  }

  function bindStaticEvents() {
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', () => mainNav.classList.toggle('is-open'));
    }

    document.addEventListener('click', (event) => {
      const target = event.target;

      const filterButton = target.closest('[data-region]');
      if (filterButton) {
        state.activeRegion = filterButton.getAttribute('data-region') || 'ALL';
        logDebug('filter.click', { region: state.activeRegion });
        renderFilters();
        renderSchedules();
        return;
      }

      const selectButton = target.closest('[data-select-schedule]');
      if (selectButton) {
        event.stopPropagation();
        const scheduleId = selectButton.getAttribute('data-select-schedule');
        const scheduleSelect = document.getElementById('interestScheduleSelect');
        if (scheduleSelect) scheduleSelect.value = scheduleId || '';
        logDebug('schedule.select', { scheduleId: scheduleId || '' });
        scrollToSection('contact');
        closeModal();
        return;
      }

      const reviewNav = target.closest('[data-review-nav]');
      if (reviewNav) {
        moveReviews(reviewNav.getAttribute('data-review-nav'));
        return;
      }

      const reviewDot = target.closest('[data-review-dot]');
      if (reviewDot) {
        state.reviewPage = Number(reviewDot.getAttribute('data-review-dot') || 0);
        setupReviewSlider((state.bootstrap.reviews || []).length);
        return;
      }

      const basicNav = target.closest('[data-basic-nav]');
      if (basicNav) {
        moveBasicInfo(basicNav.getAttribute('data-basic-nav'));
        return;
      }

      const basicDot = target.closest('[data-basic-dot]');
      if (basicDot) {
        state.basicInfoPage = Number(basicDot.getAttribute('data-basic-dot') || 0);
        setupBasicInfoSlider();
        restartBasicInfoAuto();
        return;
      }

      const openCard = target.closest('[data-open-schedule]');
      if (openCard) {
        openSchedule(openCard.getAttribute('data-open-schedule'));
        return;
      }

      if (target.closest('[data-close-modal]')) {
        closeModal();
        return;
      }
    });

    window.addEventListener('resize', () => { setupReviewSlider((state.bootstrap.reviews || []).length); setupBasicInfoSlider(); });

    if (reviewViewport) {
      reviewViewport.addEventListener('mouseenter', stopReviewAuto);
      reviewViewport.addEventListener('mouseleave', () => setupReviewSlider((state.bootstrap.reviews || []).length));
      reviewViewport.addEventListener('touchstart', stopReviewAuto, { passive: true });
      reviewViewport.addEventListener('touchend', () => setupReviewSlider((state.bootstrap.reviews || []).length), { passive: true });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        phoneInput.value = String(phoneInput.value || '').replace(/\D+/g, '').slice(0, 11);
      });
    }

    // 💡 Fetch API 기반의 모던 폼 제출 (Iframe 해킹 제거)
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        if (!formData.get('name')?.trim()) return updateFormResult('성함을 입력해주세요.', 'error');
        
        const phone = formData.get('phone')?.replace(/\D+/g, '').trim();
        if (!phone) return updateFormResult('연락처를 입력해주세요.', 'error');
        if (!formData.get('interest_schedule_id')?.trim()) return updateFormResult('관심 일정을 선택해주세요.', 'error');
        if (!formData.get('people_count')?.trim()) return updateFormResult('인원수를 선택해주세요.', 'error');
        
        const privacyAgreeInput = document.getElementById('privacyAgreeInput');
        if (privacyAgreeInput && !privacyAgreeInput.checked) return updateFormResult('개인정보 수집 및 이용 동의가 필요합니다.', 'error');

        if (phoneInput) phoneInput.value = phone;

        const regionDetail = formData.get('region_detail')?.trim();
        const travelReadyStatus = formData.get('travel_ready_status')?.trim();
        const originalMessage = formData.get('message')?.trim();

        const extraLines = [];
        if (regionDetail) extraLines.push(`거주지역: ${regionDetail}`);
        if (travelReadyStatus) extraLines.push(`여권/카드 소지 여부: ${travelReadyStatus}`);
        if (originalMessage) extraLines.push(`문의내용: ${originalMessage}`);

        const messageInput = document.getElementById('messageInput');
        if (messageInput) messageInput.value = extraLines.join('\n');

        setSubmitState(true);
        updateFormResult('문의 내용을 접수하고 있습니다...', 'pending');
        logDebug('form.submit', { schedule_id: formData.get('interest_schedule_id') });

        try {
          const response = await fetch(config.apiUrl, { method: 'POST', body: formData });
          const data = await response.json();
          
          if (data.success) {
            updateFormResult(data.data || data.message || '문의가 정상 접수되었습니다.', 'success');
            form.reset();
            setTrackingFields();
          } else {
            updateFormResult(data.message || '오류가 발생했습니다.', 'error');
          }
        } catch (error) {
          updateFormResult('통신 중 문제가 발생했습니다. 다시 시도해주세요.', 'error');
          logDebug('form.result.error', { error: error.message });
        } finally {
          setSubmitState(false);
        }
      });
    }
  }

  function initGlobalDebugHandlers() {
    window.addEventListener('error', (event) => logDebug('window.error', { message: event?.message }));
    window.addEventListener('unhandledrejection', (event) => logDebug('window.unhandledrejection', { reason: event?.reason?.message || 'Unknown' }));
  }

  async function getBootstrapWithFallback() {
    try {
      // 💡 JSONP 방식 제거, 모던 Fetch API 적용
      const url = new URL(config.apiUrl);
      url.searchParams.set('action', 'bootstrap');
      logDebug('bootstrap.request', { url: url.toString() });

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('API 응답이 올바르지 않습니다.');
      
      const data = await response.json();
      const payload = data.data || data; // GAS 응답 구조 대응
      
      logDebug('bootstrap.success', getBootstrapDebugSummary(payload));
      return normalizeData(payload);
    } catch (error) {
      logDebug('bootstrap.fallback', { reason: error.message });
      return normalizeData(window.MOCK_BOOTSTRAP_DATA || {});
    }
  }

  function hydrate(data) {
    state.bootstrap = normalizeData(data);
    logDebug('hydrate.start', getBootstrapDebugSummary(state.bootstrap));
    renderSettings();
    renderFilters();
    startHeroMotion();
    renderSchedules();
    renderReviews();
    populateFormSelects();
    renderExtraSections();
    logDebug('hydrate.done', { ok: true });
  }

  function normalizeData(data) {
    const safe = data || {};
    const fb = window.MOCK_BOOTSTRAP_DATA || {};
    return {
      settings: safe.settings || fb.settings || {},
      schedules: ensureArray(safe.schedules, fb.schedules),
      schedule_days: ensureArray(safe.schedule_days, fb.schedule_days),
      reviews: ensureArray(safe.reviews, fb.reviews),
      targets: ensureArray(safe.targets, fb.targets),
      basic_info: ensureArray(safe.basic_info, fb.basic_info),
      process_steps: ensureArray(safe.process_steps, fb.process_steps),
      cabins: ensureArray(safe.cabins, fb.cabins),
      faqs: ensureArray(safe.faqs, fb.faqs),
      trust_points: ensureArray(safe.trust_points, fb.trust_points),
      content_links: ensureArray(safe.content_links, fb.content_links)
    };
  }

  function ensureArray(primary, fallback) {
    return Array.isArray(primary) ? primary : (Array.isArray(fallback) ? fallback : []);
  }

  function getBootstrapDebugSummary(payload) {
    return Object.keys(payload || {}).reduce((acc, key) => {
      acc[key] = Array.isArray(payload[key]) ? payload[key].length : 0;
      return acc;
    }, {});
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

    setHtml('heroTitle', convertLineBreaks(escapeHtml(settings.hero_title || '크루즈 여행,\n패키지 말고 직구하세요.')));
    setText('heroSubtitle', settings.hero_subtitle || '마음에 드는 일정이 있으면 확인 후 바로 문의해주세요.');
    setText('heroBottomText', settings.hero_bottom_text || '가격보다 일정이 먼저 보이도록, 한눈에 비교되는 구조로 다시 정리했습니다.');

    setHtml('identityTitle', (() => {
      const text = settings.identity_title || '크루즈플레이는\n여행사가 아닙니다.';
      const parts = text.split('\n');
      return parts.length > 1 ? `${escapeHtml(parts[0])}<br><span>${escapeHtml(parts.slice(1).join(' '))}</span>` : `<span>${escapeHtml(text)}</span>`;
    })());

    setHtml('identityDesc', convertLineBreaks(escapeHtml(settings.identity_desc || '쇼핑과 옵션이 포함된 패키지 여행이 아닙니다.\n오직 크루즈 일정과 항해 루트를 투명하게 비교하고 선택하는\n자유여행 중심 안내 플랫폼입니다.')));
    setText('footerDescription', '대표 김도윤 · 사업자번호 538-42-01450');

    const heroBg = document.getElementById('heroBg');
    if (heroBg && heroImage) {
      heroBg.style.backgroundImage = `linear-gradient(180deg, rgba(7, 25, 57, 0.12), rgba(7, 25, 57, 0.4)), url("${heroImage.replace(/"/g, '\\"')}")`;
    }
  }

  function startHeroMotion() {
    document.querySelector('.hero-content')?.classList.add('is-live');
  }

  function renderFilters() {
    if (!scheduleFilters) return;
    const regions = ['ALL', ...new Set(state.bootstrap.schedules.map(item => item.region).filter(Boolean))];
    
    // 💡 템플릿 리터럴 적용
    scheduleFilters.innerHTML = regions.map(region => {
      const isActive = state.activeRegion === region ? ' is-active' : '';
      const label = region === 'ALL' ? '전체 일정' : region;
      return `<button type="button" class="filter-chip${isActive}" data-region="${escapeAttribute(region)}">${escapeHtml(label)}</button>`;
    }).join('');
  }

  function renderSchedules() {
    if (!scheduleGrid) return;
    const schedules = state.bootstrap.schedules.filter(item => state.activeRegion === 'ALL' || item.region === state.activeRegion).slice(0, 6);

    if (!schedules.length) {
      scheduleGrid.innerHTML = `<div class="schedule-empty">현재 준비된 일정이 없습니다. 일정 문의를 남겨주시면 가능한 항차를 안내해드립니다.</div>`;
      return;
    }
    
    // 💡 템플릿 리터럴 적용으로 가독성 향상
    scheduleGrid.innerHTML = schedules.map(schedule => {
      const imageUrl = schedule.thumbnail_url || schedule.schedule_image_url || '';
      return `
        <article class="schedule-card" data-open-schedule="${escapeAttribute(schedule.schedule_id)}">
          <div class="schedule-visual">
            ${imageUrl ? `<img src="${escapeAttribute(imageUrl)}" alt="${escapeAttribute(schedule.title || '')}" />` : ''}
            <div class="schedule-visual-inner">
              <div class="schedule-badges">
                <span class="schedule-badge">${escapeHtml(schedule.region || '크루즈')}</span>
                <span class="schedule-badge schedule-badge-month">${escapeHtml(getMonthLabel(schedule.departure_date))} 출발</span>
              </div>
              <h3 class="schedule-title">${highlightMonthText(schedule.title || '크루즈 일정')}</h3>
            </div>
          </div>
          <div class="schedule-content">
            <div class="schedule-meta">
              ${metaItem('선박', schedule.ship_name)}
              ${metaItem('모항지', getHomePort(schedule.schedule_id))}
              ${metaItem('출발', formatDate(schedule.departure_date))}
              ${metaItem('도착', formatDate(schedule.return_date))}
            </div>
            <div class="schedule-actions">
              <a href="#contact" class="btn" data-select-schedule="${escapeAttribute(schedule.schedule_id)}">가격문의</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function getMonthLabel(dateValue) {
    const match = String(dateValue || '').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? `${Number(match[2])}월` : '';
  }

  function highlightMonthText(text) {
    return escapeHtml(String(text || '')).replace(/(\d{1,2}월)/g, '<span class="schedule-month-accent">$1</span>');
  }

  function renderReviews() {
    if (!reviewGrid) return;
    const reviews = state.bootstrap.reviews || [];
    if (!reviews.length) {
      reviewGrid.innerHTML = `<div class="schedule-empty">준비 중인 후기가 곧 업데이트됩니다.</div>`;
      if (reviewDots) reviewDots.innerHTML = '';
      return;
    }

    reviewGrid.innerHTML = reviews.map(review => {
      const imageUrl = review.thumbnail_url || '';
      return `
        <article class="review-card">
          <div class="review-thumb">
            ${imageUrl ? `<img src="${escapeAttribute(imageUrl)}" alt="${escapeAttribute(review.title || '')}" />` : ''}
          </div>
          <div class="review-body">
            ${review.region ? `<span class="review-region">${escapeHtml(review.region)}</span>` : ''}
            <h3>${escapeHtml(review.title || '크루즈 후기')}</h3>
            <p>${escapeHtml(review.summary || review.content || '')}</p>
          </div>
        </article>
      `;
    }).join('');

    setupReviewSlider(reviews.length);
  }

  function openSchedule(scheduleId) {
    const schedule = state.bootstrap.schedules.find(item => String(item.schedule_id).trim() === String(scheduleId).trim());
    if (!schedule) return;

    const days = state.bootstrap.schedule_days
      .filter(item => String(item.schedule_id).trim() === String(scheduleId).trim())
      .sort((a, b) => Number(a.day_no || 0) - Number(b.day_no || 0));

    const routeStops = getRouteStops(scheduleId, days);
    const imageUrl = schedule.schedule_image_url || schedule.thumbnail_url || '';

    modalBody.innerHTML = `
      <section class="modal-hero-card">
        <div class="modal-badge-row">
          <span class="modal-badge">${escapeHtml(schedule.region || '크루즈')}</span>
          <span class="modal-badge">${escapeHtml(formatDate(schedule.departure_date))} 출발</span>
        </div>
        <div class="modal-summary-grid">
          <div>
            <h3 class="modal-hero-title">${escapeHtml(schedule.title || '크루즈 일정')}</h3>
            <div class="modal-action">
              <a href="#contact" class="btn" data-select-schedule="${escapeAttribute(schedule.schedule_id)}" data-close-modal>가격문의</a>
            </div>
          </div>
          <div class="modal-meta-grid">
            ${metaBox('선박', schedule.ship_name)}
            ${metaBox('모항지', getHomePort(schedule.schedule_id))}
            ${metaBox('출발', formatDate(schedule.departure_date))}
            ${metaBox('도착', formatDate(schedule.return_date))}
          </div>
        </div>
      </section>
      <section class="modal-route-card">
        <div class="modal-card-head"><h4>항해 루트</h4><p>한눈에 보이는 선형 타임라인으로 정리했습니다.</p></div>
        <div class="route-track">${buildRouteTrack(routeStops)}</div>
      </section>
      <section class="modal-table-card">
        <div class="modal-card-head"><h4>상세 항해 일정</h4><p>일차 · 날짜 · 기항지 · 입항 · 출항을 표로 바로 확인할 수 있습니다.</p></div>
        <div class="table-scroll">${buildItineraryTable(days)}</div>
        <p class="modal-table-note">* 현지 사정 및 기상 상황에 의해 기항지 및 입출항 시간은 변경될 수 있습니다.</p>
      </section>
      ${imageUrl ? `
        <section class="modal-image-card">
          <div class="modal-card-head"><h4>일정표 이미지</h4><p>시트에 등록된 일정표 이미지를 함께 보여줍니다.</p></div>
          <div class="schedule-image-frame"><img src="${escapeAttribute(imageUrl)}" alt="${escapeAttribute(schedule.title || '')}" /></div>
        </section>` : ''}
    `;

    if (modal) modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function buildRouteTrack(stops) {
    if (!stops.length) return `<div class="schedule-empty">루트 정보가 아직 등록되지 않았습니다.</div>`;
    return stops.map((stop, index) => {
      const label = index === 0 ? 'DEPARTURE' : (index === stops.length - 1 ? 'ARRIVAL' : `STOP ${index}`);
      return `
        <div class="route-stop">
          <div class="route-pill"><small>${label}</small><strong>${escapeHtml(stop)}</strong></div>
          ${index < stops.length - 1 ? `<div class="route-line">→</div>` : ''}
        </div>`;
    }).join('');
  }

  function buildItineraryTable(days) {
    if (!days.length) return `<div class="schedule-empty" style="margin:18px;">상세 항해일정이 아직 등록되지 않았습니다.</div>`;
    return `
      <table class="itinerary-table">
        <thead><tr><th>일차</th><th>날짜</th><th>기항지 (PORT)</th><th>입항</th><th>출항</th></tr></thead>
        <tbody>
          ${days.map(buildItineraryRow).join('')}
        </tbody>
      </table>`;
  }

  function buildItineraryRow(day) {
    const overnight = /overnight|정박/i.test(String(day.description || '')) ? `<span class="overnight-badge">정박 (Overnight)</span>` : '';
    return `
      <tr class="${isHighlightDay(day) ? 'is-highlight' : ''}">
        <td class="day-cell">Day ${day.day_no || ''}</td>
        <td class="date-cell">${escapeHtml(formatDayDate(day.date))}</td>
        <td>
          <span class="port-name-kr">${escapeHtml(day.port_name || day.city || '-')}${overnight}</span>
          ${day.port_name_en || day.country ? `<span class="port-name-en">${escapeHtml(day.port_name_en || day.country)}</span>` : ''}
        </td>
        ${normalizeTimeCell(day.arrival_time, 'arrival')}
        ${normalizeTimeCell(day.departure_time, 'departure')}
      </tr>`;
  }

  function isHighlightDay(day) {
    return /overnight|정박/i.test(String(day.description || ''));
  }

  function normalizeTimeCell(value, kind) {
    const text = String(value || '').trim();
    if (!text || text === '-' || text === '—') return `<td class="time-cell muted">-</td>`;
    if (kind === 'departure' && /(도착|arrival)/i.test(text)) return `<td class="time-cell arrival">${escapeHtml(text)}</td>`;
    return `<td class="time-cell">${escapeHtml(text)}</td>`;
  }

  function formatDayDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return `${pad(date.getMonth() + 1)}.${pad(date.getDate())} (${weekdays[date.getDay()]})`;
  }

  function getReviewPerView() { return window.innerWidth <= 720 ? 1 : 2; }

  function setupReviewSlider(total) {
    if (!reviewGrid) return;
    const perView = getReviewPerView();
    const maxPage = Math.max(0, total - perView);
    state.reviewPage = Math.min(state.reviewPage, maxPage);

    const prev = document.querySelector('[data-review-nav="prev"]');
    const next = document.querySelector('[data-review-nav="next"]');

    if (total <= perView) {
      reviewGrid.style.transform = '';
      prev?.classList.add('is-hidden');
      next?.classList.add('is-hidden');
      if (reviewDots) { reviewDots.className = 'review-dots is-hidden'; reviewDots.innerHTML = ''; }
      stopReviewAuto();
      return;
    }

    prev?.classList.remove('is-hidden');
    next?.classList.remove('is-hidden');
    if (reviewDots) reviewDots.className = 'review-dots';

    const gap = 22;
    const viewportWidth = reviewViewport ? reviewViewport.clientWidth : 0;
    const cardWidth = (viewportWidth - gap) / perView;
    reviewGrid.style.transform = `translateX(-${state.reviewPage * (cardWidth + gap)}px)`;

    if (reviewDots) {
      reviewDots.innerHTML = Array.from({ length: maxPage + 1 }).map((_, idx) => 
        `<button type="button" class="review-dot ${idx === state.reviewPage ? 'is-active' : ''}" data-review-dot="${idx}" aria-label="후기 ${idx + 1}"></button>`
      ).join('');
    }

    startReviewAuto(total);
  }

  function moveReviews(direction) {
    const total = (state.bootstrap.reviews || []).length;
    const maxPage = Math.max(0, total - getReviewPerView());
    state.reviewPage = direction === 'prev' 
      ? (state.reviewPage <= 0 ? maxPage : state.reviewPage - 1) 
      : (state.reviewPage >= maxPage ? 0 : state.reviewPage + 1);
    setupReviewSlider(total);
  }

  function startReviewAuto(total) {
    stopReviewAuto();
    if (total > getReviewPerView()) reviewAutoTimer = window.setInterval(() => moveReviews('next'), 3600);
  }

  function stopReviewAuto() {
    if (reviewAutoTimer) { window.clearInterval(reviewAutoTimer); reviewAutoTimer = null; }
  }

  function getHomePort(scheduleId) {
    const schedule = state.bootstrap.schedules.find(item => String(item.schedule_id).trim() === String(scheduleId).trim()) || {};
    if (schedule.home_port) return String(schedule.home_port).trim();
    const stops = getRouteStops(scheduleId);
    return stops.length ? stops[0] : '';
  }

  function populateFormSelects() {
    const scheduleSelect = document.getElementById('interestScheduleSelect');
    if (!scheduleSelect) return;
    scheduleSelect.innerHTML = `<option value="">선택해주세요</option>` + 
      state.bootstrap.schedules.map(s => `<option value="${escapeAttribute(s.schedule_id)}">${escapeHtml(s.title || s.schedule_id)}</option>`).join('');
  }

  function getRouteStops(scheduleId, preloadedDays) {
    const schedule = state.bootstrap.schedules.find(item => String(item.schedule_id).trim() === String(scheduleId).trim()) || {};
    if (schedule.route_ports) return String(schedule.route_ports).split('|').map(cleanStop).filter(Boolean);

    const days = Array.isArray(preloadedDays) ? preloadedDays : state.bootstrap.schedule_days.filter(item => String(item.schedule_id).trim() === String(scheduleId).trim());
    const stops = days.map(day => cleanStop(day.port_name || day.city || ''))
      .filter(Boolean)
      .filter(stop => !['해상일', 'sea day', '인천 출발', '부산 출발'].includes(stop.toLowerCase()));
    
    return Array.from(new Set(stops));
  }

  function cleanStop(value) {
    return String(value || '').replace(/\s+/g, ' ').replace(/\(.*?\)/g, '').trim();
  }

  function renderExtraSections() {
    ensureExtraSectionsScaffold();
    renderBasicInfo();
    renderTargets();
    renderProcessSteps();
    renderCabins();
    renderFaqs();
    renderContentLinks();
  }

  function ensureExtraSectionsScaffold() {
    if (!mainContent) return;

    const scheduleSection = scheduleGrid ? scheduleGrid.closest('section') : null;
    const reviewSection = reviewGrid ? reviewGrid.closest('section') : null;
    const contactSection = form ? form.closest('section') : null;
    const debugPanel = document.getElementById('sheetDebugPanel');

    const createSectionHtml = (id, label, title, gridId, gridClass, narrow = false, extraClass = '') => `
      <section class="sheet-extra-section ${extraClass}" id="${id}">
        <div class="${narrow ? 'sheet-extra-wrap sheet-extra-wrap-narrow' : 'sheet-extra-wrap'}">
          <div class="section-head center compact-head">
            <span class="section-label">${label}</span>
            <h2 class="section-title">${title}</h2>
          </div>
          <div id="${gridId}" class="${gridClass}"></div>
        </div>
      </section>`;

    const createBasicHtml = () => `
      <section class="sheet-extra-section sheet-extra-section-basic" id="basicInfoSection">
        <div class="sheet-extra-wrap sheet-extra-wrap-narrow">
          <div class="section-head center compact-head">
            <span class="section-label">기초안내</span>
            <h2 class="section-title">크루즈는 어렵지 않아요</h2>
          </div>
          <div class="sheet-basic-slider" id="basicInfoSlider">
            <div class="sheet-basic-slider-viewport">
              <div id="basicInfoGrid" class="sheet-basic-slider-track"></div>
            </div>
            <div class="sheet-basic-slider-controls" id="basicInfoControls">
              <button type="button" class="sheet-basic-nav" data-basic-nav="prev" aria-label="이전">‹</button>
              <div class="sheet-basic-dots" id="basicInfoDots"></div>
              <button type="button" class="sheet-basic-nav" data-basic-nav="next" aria-label="다음">›</button>
            </div>
          </div>
        </div>
      </section>`;

    // 1) 기초안내: 추천 일정 위
    if (!document.getElementById('basicInfoSection')) {
      const html = createBasicHtml();
      if (scheduleSection) {
        scheduleSection.insertAdjacentHTML('beforebegin', html);
      } else if (debugPanel && debugPanel.parentNode === mainContent) {
        debugPanel.insertAdjacentHTML('beforebegin', html);
      } else {
        mainContent.insertAdjacentHTML('beforeend', html);
      }
    }

    // 2) 여행후기 아래: 이용대상자 → 선실비교 → 예약과정 → FAQ
    const afterReview = [
      ['targetsSection', '이용대상자', '이런 분들께 잘 맞아요', 'targetsGrid', 'sheet-extra-grid', false],
      ['cabinsSection', '선실비교', '선실 타입 비교', 'cabinsGrid', 'sheet-extra-grid', false],
      ['processSection', '예약과정', '상담부터 탑승까지', 'processGrid', 'sheet-extra-grid sheet-extra-grid-steps', false],
      ['faqSection', 'FAQ', '자주 묻는 질문', 'faqList', 'sheet-extra-faq-list', true]
    ];

    let anchor = reviewSection;
    afterReview.forEach(([id, label, title, gridId, gridClass, narrow]) => {
      if (document.getElementById(id)) {
        anchor = document.getElementById(id);
        return;
      }

      const html = createSectionHtml(id, label, title, gridId, gridClass, narrow);

      if (anchor) {
        anchor.insertAdjacentHTML('afterend', html);
        anchor = document.getElementById(id);
      } else if (contactSection) {
        contactSection.insertAdjacentHTML('beforebegin', html);
        anchor = document.getElementById(id);
      } else if (debugPanel && debugPanel.parentNode === mainContent) {
        debugPanel.insertAdjacentHTML('beforebegin', html);
        anchor = document.getElementById(id);
      } else {
        mainContent.insertAdjacentHTML('beforeend', html);
        anchor = document.getElementById(id);
      }
    });

    // 3) 콘텐츠연결: 가격 문의하기 아래
    if (!document.getElementById('contentSection')) {
      const html = createSectionHtml(
        'contentSection',
        '콘텐츠연결',
        '함께 보면 좋은 정보',
        'contentGrid',
        'sheet-extra-grid',
        false
      );

      if (contactSection) {
        contactSection.insertAdjacentHTML('afterend', html);
      } else if (debugPanel && debugPanel.parentNode === mainContent) {
        debugPanel.insertAdjacentHTML('beforebegin', html);
      } else {
        mainContent.insertAdjacentHTML('beforeend', html);
      }
    }
  }

  function renderBasicInfo() {
    const section = document.getElementById('basicInfoSection');
    const track = document.getElementById('basicInfoGrid');
    const items = state.bootstrap.basic_info || [];
    if (!section || !track) return;

    if (!items.length) {
      section.style.display = 'none';
      stopBasicInfoAuto();
      return;
    }

    section.style.display = '';
    track.innerHTML = items.map((item) => {
      const points = [item.point_1, item.point_2, item.point_3].filter(Boolean);
      return `
        <article class="sheet-basic-slide">
          <div class="sheet-basic-slide-copy">
            ${item.title ? `<h3>${escapeHtml(item.title)}</h3>` : ''}
            ${item.subtitle ? `<p class="sheet-extra-muted">${escapeHtml(item.subtitle)}</p>` : ''}
            ${item.body ? `<p>${escapeHtml(item.body)}</p>` : ''}
            ${points.length ? `<ul class="sheet-extra-points">${points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` : ''}
          </div>
          ${item.image_url ? `<div class="sheet-basic-slide-media"><img src="${escapeAttribute(item.image_url)}" alt="${escapeAttribute(item.title || '')}" /></div>` : ''}
        </article>`;
    }).join('');

    const slider = document.getElementById('basicInfoSlider');
    if (slider && !slider.dataset.bound) {
      slider.addEventListener('mouseenter', stopBasicInfoAuto);
      slider.addEventListener('mouseleave', restartBasicInfoAuto);
      slider.dataset.bound = 'true';
    }

    setupBasicInfoSlider();
    restartBasicInfoAuto();
  }

  function setupBasicInfoSlider() {
    const track = document.getElementById('basicInfoGrid');
    const viewport = document.querySelector('.sheet-basic-slider-viewport');
    const dots = document.getElementById('basicInfoDots');
    const controls = document.getElementById('basicInfoControls');

    if (!track || !viewport || !dots || !controls) return;

    const total = track.children.length;
    if (!total) return;

    const maxPage = total - 1;
    state.basicInfoPage = Math.min(state.basicInfoPage, maxPage);

    const width = viewport.clientWidth || 0;
    track.style.transform = `translateX(-${state.basicInfoPage * width}px)`;

    if (total <= 1) {
      controls.classList.add('is-hidden');
      dots.innerHTML = '';
      stopBasicInfoAuto();
      return;
    }

    controls.classList.remove('is-hidden');
    dots.innerHTML = Array.from({ length: total }).map((_, idx) =>
      `<button type="button" class="sheet-basic-dot ${idx === state.basicInfoPage ? 'is-active' : ''}" data-basic-dot="${idx}" aria-label="기초안내 ${idx + 1}"></button>`
    ).join('');
  }

  function moveBasicInfo(direction) {
    const track = document.getElementById('basicInfoGrid');
    if (!track) return;

    const total = track.children.length;
    if (!total) return;

    const maxPage = total - 1;
    state.basicInfoPage = direction === 'prev'
      ? (state.basicInfoPage <= 0 ? maxPage : state.basicInfoPage - 1)
      : (state.basicInfoPage >= maxPage ? 0 : state.basicInfoPage + 1);

    setupBasicInfoSlider();
    restartBasicInfoAuto();
  }

  function restartBasicInfoAuto() {
    stopBasicInfoAuto();

    const track = document.getElementById('basicInfoGrid');
    if (!track) return;

    const total = track.children.length;
    if (total <= 1) return;

    basicInfoAutoTimer = window.setInterval(() => {
      moveBasicInfo('next');
    }, 4200);
  }

  function stopBasicInfoAuto() {
    if (basicInfoAutoTimer) {
      window.clearInterval(basicInfoAutoTimer);
      basicInfoAutoTimer = null;
    }
  }

  function renderTargets() {
    const section = document.getElementById('targetsSection');
    const grid = document.getElementById('targetsGrid');
    const items = state.bootstrap.targets || [];
    if (!section || !grid) return;
    
    if (!items.length) return section.style.display = 'none';
    section.style.display = '';

    grid.innerHTML = items.map(item => `
      <article class="sheet-extra-card">
        ${item.image_url ? `<div class="sheet-extra-media"><img src="${escapeAttribute(item.image_url)}" alt="${escapeAttribute(item.title || '')}" /></div>` : ''}
        <h3>${escapeHtml(item.title || '')}</h3>
        ${item.subtitle ? `<p class="sheet-extra-muted">${escapeHtml(item.subtitle)}</p>` : ''}
        ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
        ${[item.point_1, item.point_2].filter(Boolean).length ? `<ul class="sheet-extra-points">${[item.point_1, item.point_2].filter(Boolean).map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` : ''}
        ${item.linked_schedule_id ? `<div class="sheet-extra-action"><a href="#contact" class="btn" data-select-schedule="${escapeAttribute(item.linked_schedule_id)}">${escapeHtml(item.cta_text || '상담 요청')}</a></div>` : ''}
      </article>
    `).join('');
  }

  function renderProcessSteps() {
    const section = document.getElementById('processSection');
    const grid = document.getElementById('processGrid');
    const items = state.bootstrap.process_steps || [];
    if (!section || !grid) return;
    
    if (!items.length) return section.style.display = 'none';
    section.style.display = '';

    grid.innerHTML = items.map((item, index) => `
      <article class="sheet-extra-card sheet-extra-step-card">
        <span class="sheet-extra-step-no">STEP ${index + 1}</span>
        <h3>${escapeHtml(item.step_title || '')}</h3>
        ${item.step_desc ? `<p>${escapeHtml(item.step_desc)}</p>` : ''}
        ${item.highlight_text ? `<div class="sheet-extra-highlight">${escapeHtml(item.highlight_text)}</div>` : ''}
      </article>
    `).join('');
  }

  function renderCabins() {
    const section = document.getElementById('cabinsSection');
    const grid = document.getElementById('cabinsGrid');
    const items = state.bootstrap.cabins || [];
    if (!section || !grid) return;
    
    if (!items.length) return section.style.display = 'none';
    section.style.display = '';

    grid.innerHTML = items.map(item => `
      <article class="sheet-extra-card">
        ${item.image_url ? `<div class="sheet-extra-media"><img src="${escapeAttribute(item.image_url)}" alt="${escapeAttribute(item.title || '')}" /></div>` : ''}
        ${item.cabin_type ? `<div class="sheet-extra-chip">${escapeHtml(item.cabin_type)}</div>` : ''}
        <h3>${escapeHtml(item.title || '')}</h3>
        ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ''}
        ${[item.best_for, item.point_1, item.point_2].filter(Boolean).length ? `<ul class="sheet-extra-points">${[item.best_for, item.point_1, item.point_2].filter(Boolean).map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` : ''}
        ${(item.badge_1 || item.badge_2) ? `<div class="sheet-extra-tags">${[item.badge_1, item.badge_2].filter(Boolean).map(b => `<span>${escapeHtml(b)}</span>`).join('')}</div>` : ''}
      </article>
    `).join('');
  }

  function renderTrustPoints() {
    const section = document.getElementById('trustSection');
    const grid = document.getElementById('trustGrid');
    const items = state.bootstrap.trust_points || [];
    if (!section || !grid) return;
    
    if (!items.length) return section.style.display = 'none';
    section.style.display = '';

    grid.innerHTML = items.map(item => `
      <article class="sheet-extra-card">
        ${item.badge_text ? `<div class="sheet-extra-chip">${escapeHtml(item.badge_text)}</div>` : ''}
        <h3>${escapeHtml(item.title || '')}</h3>
        ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
      </article>
    `).join('');
  }

  function renderFaqs() {
    const section = document.getElementById('faqSection');
    const list = document.getElementById('faqList');
    const items = state.bootstrap.faqs || [];
    if (!section || !list) return;
    
    if (!items.length) return section.style.display = 'none';
    section.style.display = '';

    list.innerHTML = items.map(item => `
      <details class="sheet-extra-faq">
        <summary>${escapeHtml(item.question || '')}</summary>
        <div class="sheet-extra-faq-body">
          ${item.category ? `<div class="sheet-extra-chip">${escapeHtml(item.category)}</div>` : ''}
          <p>${escapeHtml(item.answer || '')}</p>
        </div>
      </details>
    `).join('');
  }

  function renderContentLinks() {
    const section = document.getElementById('contentSection');
    const grid = document.getElementById('contentGrid');
    const items = state.bootstrap.content_links || [];
    if (!section || !grid) return;
    
    if (!items.length) return section.style.display = 'none';
    section.style.display = '';

    grid.innerHTML = items.map(item => `
      <article class="sheet-extra-card">
        ${item.thumbnail_url ? `<div class="sheet-extra-media"><img src="${escapeAttribute(item.thumbnail_url)}" alt="${escapeAttribute(item.title || '')}" /></div>` : ''}
        ${item.category ? `<div class="sheet-extra-chip">${escapeHtml(item.category)}</div>` : ''}
        <h3>${escapeHtml(item.title || '')}</h3>
        ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ''}
        <div class="sheet-extra-action">
          <span class="${item.tag_text ? 'sheet-extra-inline-tag' : ''}">${escapeHtml(item.tag_text || '')}</span>
          ${item.link_url ? `<a href="${escapeAttribute(item.link_url)}" class="btn" target="_blank" rel="noopener">자세히 보기</a>` : ''}
        </div>
      </article>
    `).join('');
  }

  function ensureDebugPanel() {
    if (document.getElementById('sheetDebugPanel')) return;
    const panelHtml = `<section class="sheet-debug-panel" id="sheetDebugPanel"><h3 class="sheet-debug-title">DEBUG</h3><div class="sheet-debug-list" id="sheetDebugList"></div></section>`;
    if (mainContent) mainContent.insertAdjacentHTML('beforeend', panelHtml);
    else document.body.insertAdjacentHTML('beforeend', panelHtml);
  }

  function logDebug(label, payload) {
    state.debugLogs.unshift({ time: new Date().toLocaleTimeString('ko-KR', { hour12: false }), label, payload: payload || {} });
    if (state.debugLogs.length > 30) state.debugLogs = state.debugLogs.slice(0, 30);
    try { console.log('[CRUISE_DEBUG]', label, payload || {}); } catch (e) {}
    renderDebugPanel();
  }

  function renderDebugPanel() {
    const list = document.getElementById('sheetDebugList');
    if (list) list.innerHTML = state.debugLogs.map(item => `<div class="sheet-debug-item">[${escapeHtml(item.time)}] ${escapeHtml(item.label)} ${escapeHtml(JSON.stringify(item.payload || {}))}</div>`).join('');
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
    formResult.className = `form-result${type ? ` is-${type}` : ''}`;
  }

  function setSubmitState(isSubmitting) {
    const button = document.getElementById('formSubmitButton') || document.getElementById('contactSubmitButton');
    if (!button) return;
    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? '접수 중...' : '상담 신청하기';
  }

  function closeModal() {
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setText(id, value, mode) {
    const el = document.getElementById(id);
    if (!el || value == null) return;
    mode === 'value' ? el.value = value : el.textContent = value;
  }

  function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function setInputValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function metaItem(label, value) {
    return `<div class="schedule-meta-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || '-')}</strong></div>`;
  }

  function metaBox(label, value) {
    return `<div class="modal-meta-box"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || '-')}</strong></div>`;
  }

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
  }

  function pad(num) { return String(num).padStart(2, '0'); }
  function convertLineBreaks(value) { return String(value || '').replace(/\n/g, '<br>'); }
  
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, match => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[match]);
  }
  
  function escapeAttribute(value) { return escapeHtml(value); }
})();

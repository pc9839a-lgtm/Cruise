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

  const state = {
    bootstrap: { settings: {}, schedules: [], schedule_days: [], reviews: [] },
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
            updateFormResult('문의 접수는 진행 중입니다. 잠시 시간이 걸릴 수 있습니다.', 'pending');
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

      console.debug('[main.js] bootstrap request start:', requestUrl);

      window[callbackName] = function (payload) {
        if (finished) return;
        finished = true;
        console.debug('[main.js] bootstrap success:', payload);
        cleanup(true);
        resolve(payload);
      };

      script.onerror = function (error) {
        if (finished) return;
        finished = true;
        console.debug('[main.js] bootstrap script error:', error);
        cleanup(false);
        reject(new Error('bootstrap-load-failed'));
      };

      timeoutId = window.setTimeout(function () {
        if (finished) return;
        finished = true;
        console.debug('[main.js] bootstrap timeout');
        cleanup(false);
        reject(new Error('bootstrap-timeout'));
      }, 8000);

      function cleanup(success) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (script.parentNode) script.parentNode.removeChild(script);

        if (success) {
          window[callbackName] = function () {
            console.debug('[main.js] late jsonp callback ignored:', callbackName);
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
    console.debug('[main.js] hydrate payload:', {
      hasSettings: !!(data && data.settings),
      schedules: data && Array.isArray(data.schedules) ? data.schedules.length : 0,
      schedule_days: data && Array.isArray(data.schedule_days) ? data.schedule_days.length : 0,
      reviews: data && Array.isArray(data.reviews) ? data.reviews.length : 0
    });

    state.bootstrap = normalizeData(data);
    renderSettings();
    renderFilters();
    startHeroMotion();
    renderSchedules();
    renderReviews();
    populateFormSelects();
  }

  function normalizeData(data) {
    const safe = data || {};
    const fallback = window.MOCK_BOOTSTRAP_DATA || {};
    safe.settings = safe.settings || fallback.settings || {};
    safe.schedules = Array.isArray(safe.schedules) && safe.schedules.length ? safe.schedules : (Array.isArray(fallback.schedules) ? fallback.schedules : []);
    safe.schedule_days = Array.isArray(safe.schedule_days) && safe.schedule_days.length ? safe.schedule_days : (Array.isArray(fallback.schedule_days) ? fallback.schedule_days : []);
    safe.reviews = Array.isArray(safe.reviews) && safe.reviews.length ? safe.reviews : (Array.isArray(fallback.reviews) ? fallback.reviews : []);
    return safe;
  }

   function renderSettings() {
     /* ---------------------------------------------------------
       settings 객체
       - Apps Script / mock-data 에서 내려온 설정값을 담는 객체
       - 값이 없으면 아래 기본값으로 대체됨
       --------------------------------------------------------- */
     const settings = state.bootstrap.settings || {};

     /* ---------------------------------------------------------
       사이트명 기본값
       - 원래는 시트의 site_title / site_name 값을 우선 사용
       - 여기서는 푸터만 따로 고정할 거라 siteName 계산은 유지
       --------------------------------------------------------- */
     const siteName = settings.site_title || settings.site_name || '크루즈 플레이';

     /* ---------------------------------------------------------
       히어로 배경 이미지
       - 설정에 hero_image 또는 hero_bg가 있으면 사용
       --------------------------------------------------------- */
     const heroImage = settings.hero_image || settings.hero_bg || '';

     /* ---------------------------------------------------------
       상단 로고/사이트명
       - 헤더 좌측 브랜드명
       --------------------------------------------------------- */
     setText('siteName', siteName);

     /* ---------------------------------------------------------
       푸터 사이트명
       - 기존: 시트 값(siteName)으로 자동 반영
       - 변경: 푸터에는 무조건 WAYZI 고정 출력
       --------------------------------------------------------- */
     setText('footerSiteName', 'WAYZI');

     /* ---------------------------------------------------------
       hidden input 에 들어가는 사이트명
       - 문의폼 전송 시 같이 넘어가는 값
       - 이건 기존처럼 siteName 유지
       --------------------------------------------------------- */
     setText('siteNameInput', siteName, 'value');

     /* ---------------------------------------------------------
       히어로 상단 태그 3개
       --------------------------------------------------------- */
     setText('heroTag1', settings.hero_tag_1 || '최저가 보장제');
     setText('heroTag2', settings.hero_tag_2 || 'NO 쇼핑·옵션');
     setText('heroTag3', settings.hero_tag_3 || '100% 출발확정');

     /* ---------------------------------------------------------
       히어로 메인 타이틀
       - 줄바꿈 허용
       - XSS 방지를 위해 escapeHtml 후 <br> 변환
       --------------------------------------------------------- */
     setHtml(
      'heroTitle',
      convertLineBreaks(
        escapeHtml(settings.hero_title || '크루즈 여행,\n패키지 말고 직구하세요.')
      )
     );

     /* ---------------------------------------------------------
       히어로 서브타이틀
       --------------------------------------------------------- */
     setText(
      'heroSubtitle',
      settings.hero_subtitle || '마음에 드는 일정이 있으면 확인 후 바로 문의해주세요.'
     );

     /* ---------------------------------------------------------
       히어로 하단 보조 문구
       --------------------------------------------------------- */
     setText(
      'heroBottomText',
      settings.hero_bottom_text || '가격보다 일정이 먼저 보이도록, 한눈에 비교되는 구조로 다시 정리했습니다.'
     );

     /* ---------------------------------------------------------
       브랜드 소개 타이틀
       - 줄바꿈 기준으로 2줄 처리
       - 두 번째 줄은 <span>으로 감싸서 스타일 강조
       --------------------------------------------------------- */
     setHtml('identityTitle', (function () {
      const text = settings.identity_title || '크루즈플레이는\n여행사가 아닙니다.';
      const parts = String(text).split('\n');

      if (parts.length > 1) {
        return escapeHtml(parts[0]) + '<br><span>' + escapeHtml(parts.slice(1).join(' ')) + '</span>';
      }

      return '<span>' + escapeHtml(text) + '</span>';
     })());

     /* ---------------------------------------------------------
       브랜드 소개 설명문
       - 줄바꿈 허용
       --------------------------------------------------------- */
     setHtml(
      'identityDesc',
      convertLineBreaks(
        escapeHtml(
         settings.identity_desc ||
         '쇼핑과 옵션이 포함된 패키지 여행이 아닙니다.\n오직 크루즈 일정과 항해 루트를 투명하게 비교하고 선택하는\n자유여행 중심 안내 플랫폼입니다.'
        )
      )
     );

     /* ---------------------------------------------------------
       푸터 설명문
       - 기존: settings.footer_description 값 사용
       - 변경: 사업자 정보 문구로 고정 출력
       --------------------------------------------------------- */
     setText(
      'footerDescription',
      '대표 김도윤 · 사업자번호 538-42-01450'
     );

     /* ---------------------------------------------------------
       히어로 배경 이미지 적용
       - 이미지가 있을 때만 background-image 설정
       --------------------------------------------------------- */
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
   
 
  function getMonthLabel_(dateValue) {
    console.debug('[main.js] alias getMonthLabel_ called:', dateValue);
    return getMonthLabel(dateValue);
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
    console.debug('[main.js] buildRouteTrack input:', stops);

    if (!Array.isArray(stops) || !stops.length) {
      console.debug('[main.js] buildRouteTrack empty');
      return '<div class="schedule-empty">루트 정보가 아직 등록되지 않았습니다.</div>';
    }

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
    console.debug('[main.js] getRouteStops scheduleId:', scheduleId);

    const schedule = state.bootstrap.schedules.find(function (item) {
      return String(item.schedule_id).trim() === String(scheduleId).trim();
    }) || {};

    if (schedule.route_ports) {
      const routePorts = String(schedule.route_ports).split('|').map(cleanStop).filter(Boolean);
      console.debug('[main.js] getRouteStops from route_ports:', routePorts);
      return routePorts;
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

    const uniqueStops = Array.from(new Set(stops));
    console.debug('[main.js] getRouteStops from days:', uniqueStops);

    return uniqueStops;
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

  if (typeof setupDynamicSlider_ !== 'function') {
    function setupDynamicSlider_(sliderKey) {
      console.debug('[main.js] setupDynamicSlider_ skipped:', sliderKey);
    }
  }

  if (typeof moveDynamicSlider_ !== 'function') {
    function moveDynamicSlider_(sliderKey, direction) {
      console.debug('[main.js] moveDynamicSlider_ skipped:', sliderKey, direction);
    }
  }

  if (typeof setDynamicSliderState_ !== 'function') {
    function setDynamicSliderState_(sliderKey, page) {
      console.debug('[main.js] setDynamicSliderState_ skipped:', sliderKey, page);
    }
  }

  if (typeof alignContentButtons_ !== 'function') {
    function alignContentButtons_() {
      console.debug('[main.js] alignContentButtons_ skipped');
    }
  }

  if (typeof buildSafeImageHtml_ !== 'function') {
    function buildSafeImageHtml_() {
      console.debug('[main.js] buildSafeImageHtml_ skipped');
      return '';
    }
  }

})();
